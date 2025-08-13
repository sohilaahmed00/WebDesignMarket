// This file manages all the JavaScript functionality for the main page (index.html)

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. SETUP & VALIDATION ---
    // Check if the productManager object (from product-manager.js) is loaded.
    if (typeof productManager === 'undefined') {
        console.error("Product Manager is not loaded. Check script order in index.html.");
        return;
    }

    // Get all products from the central manager. This is the ONLY source of truth.
    const allProducts = productManager.getProducts();
    let currentPage = 1;
    const itemsPerPage = 6;

    // --- 2. EVENT LISTENERS ---
    // Main navigation and hero section animations
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    if (searchBtn && searchInput) {
        const performSearch = () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filtered = allProducts.filter(p => 
                (p.nameproduct || '').toLowerCase().includes(searchTerm) ||
                (p.categoryproduct || '').toLowerCase().includes(searchTerm)
            );
            displayPage(filtered, 1);
            setupPagination(filtered);
        };
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Category filter links in the sidebar
    document.querySelectorAll('.sidebar .list-group-item').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.sidebar .list-group-item').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            filterAndDisplay(); // Re-filter and display products
        });
    });
    
    // Mouse parallax effect for decorations (Restored from your original code)
    document.addEventListener('mousemove', function(e) {
        const decorations = document.querySelectorAll('.decoration');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        decorations.forEach((decoration, index) => {
            const speed = (index + 1) * 0.5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            decoration.style.transform = `translate(${x}px, ${y}px)`;
        });
    });


    // --- 3. RENDERING FUNCTIONS ---
    /**
     * Renders star icons based on a rating number.
     * @param {number} rating - The rating number (e.g., 4.5).
     * @returns {string} - The HTML string for the stars.
     */
    function renderStars(rating) {
        const numRating = parseFloat(rating) || 0;
        const fullStars = Math.floor(numRating);
        const halfStar = numRating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fas fa-star"></i>';
        if (halfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star"></i>';
        return `<div class="rating-stars">${starsHTML} <span>(${numRating.toFixed(1)})</span></div>`;
    }

    /**
     * Displays a specific page of products in the grid.
     * @param {Array} products - The array of products to display.
     * @param {number} page - The page number to display.
     */
    function displayPage(products, page) {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = products.slice(startIndex, startIndex + itemsPerPage);

        if (paginatedItems.length === 0) {
            productGrid.innerHTML = '<div class="col-12"><p class="text-center">No products found.</p></div>';
            return;
        }

        paginatedItems.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-lg-4 col-md-6';
            // === تم إصلاح الخطأ هنا ===
            productCard.innerHTML = `
                <div class="product-card">
                    <img src="${product.magproducturl}" alt="${product.nameproduct}">
                    <div class="product-category">${product.categoryproduct}</div>
                    <h3 class="product-title">${product.nameproduct}</h3>
                    ${renderStars(product.rating)} 
                    <p class="product-description">${(product.p || '').replace(/  /g, ' ')}</p>
                    <div class="product-price-container">
                        <span class="product-price">${product.salary}</span>
                        ${product.old_salary ? `<span class="old-price">${product.old_salary}</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn" onclick="goToDetails(${product.id})">View Details</button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    /**
     * Creates and manages the pagination buttons.
     * @param {Array} products - The array of products to paginate.
     */
    function setupPagination(products) {
        const paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) return;
        
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(products.length / itemsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            btn.className = 'pagination-btn';
            if (i === currentPage) btn.classList.add('active');
            
            btn.addEventListener('click', () => {
                currentPage = i;
                displayPage(products, currentPage);
                document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            paginationContainer.appendChild(btn);
        }
    }

    /**
     * Filters products based on the selected category and then displays them.
     */
    function filterAndDisplay() {
        const activeCategoryElement = document.querySelector('.sidebar .list-group-item.active');
        const category = activeCategoryElement.getAttribute('data-category');
        
        let filteredProducts = allProducts;
        if (category !== 'All') {
            filteredProducts = allProducts.filter(p => p.categoryproduct.toLowerCase() === category.toLowerCase());
        }
        
        currentPage = 1; // Reset to first page on filter change
        displayPage(filteredProducts, currentPage);
        setupPagination(filteredProducts);
    }

    // --- 4. INITIALIZATION ---
    // Initial display of products when the page loads.
    filterAndDisplay();
    animateHeroElements(); // Restored from your original code
});

/**
 * Navigates to the product details page.
 * This function is global so it can be called from the onclick attribute.
 * @param {number} productId - The ID of the product to view.
 */
function goToDetails(productId) {
    localStorage.setItem('selectedProductId', productId);
    window.location.href = './productdetails.html';
}

/**
 * Animates hero section elements on page load.
 * (Restored from your original code)
 */
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const orderButton = document.querySelector('.order-btn');
    const discountBadge = document.querySelector('.discount-badge');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 0.8s ease';
        setTimeout(() => { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'translateY(0)'; }, 300);
    }
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'all 0.8s ease';
        setTimeout(() => { heroSubtitle.style.opacity = '1'; heroSubtitle.style.transform = 'translateY(0)'; }, 400);
    }
    if (orderButton) {
        orderButton.style.opacity = '0';
        orderButton.style.transform = 'translateY(20px)';
        orderButton.style.transition = 'all 0.8s ease';
        setTimeout(() => { orderButton.style.opacity = '1'; orderButton.style.transform = 'translateY(0)'; }, 500);
    }
    if (discountBadge) {
        discountBadge.style.opacity = '0';
        discountBadge.style.transform = 'scale(0.5) rotate(-10deg)';
        discountBadge.style.transition = 'all 1s ease';
        setTimeout(() => { discountBadge.style.opacity = '1'; discountBadge.style.transform = 'scale(1) rotate(0deg)'; }, 700);
    }
}
