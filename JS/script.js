// Fixed product data array (fallback if localStorage is empty)
// let defaultProducts = [
//     {magproducturl:'./Images/1.jpg.png', categoryproduct:'vegetables', p:'Fresh organic villa farm lemon 500gm pack', salary:'$120', old_salary:'$123.25', rating:4.5, nameproduct:'Fresh Organic Lemon'},
//     {magproducturl:'./Images/2.jpg.png', categoryproduct:'snacks', p:'Best snacks with hazel nut pack 200gm', salary:'$145', old_salary:'$150', rating:5.0, nameproduct:'fresh apple'},
//     {magproducturl:'./Images/3.jpg.png', categoryproduct:'fruits', p:'Fresh organic apple 1kg simla marming', salary:'$120', old_salary:'$123.26', rating:4.5, nameproduct:'sweet cake'},
//     {magproducturl:'./Images/9.jpg.png', categoryproduct:'fruits', p:'Organic fresh vanilla farm watermelon 5kg', salary:'$50.30', old_salary:'$72.60', rating:3.2, nameproduct:'chocolate'},
//     {magproducturl:'./Images/10.jpg.png', categoryproduct:'snacks', p:'Sweet crunchy nut mix 250gm pack', salary:'$120.30', old_salary:'$123.25', rating:5.0, nameproduct:'crunchy nut'},
//     {magproducturl:'./Images/17.jpg.png', categoryproduct:'bakery', p:'Delicious white baked fresh bread and toast', salary:'$20', old_salary:'$22.10', rating:5.0, nameproduct:'toast'},
//     {magproducturl:'./Images/13.jpg.png', categoryproduct:'bakery', p:'Premium mixed nuts organic blend', salary:'$25', old_salary:'$28.10', rating:4.8, nameproduct:'premium nut'},
//     {magproducturl:'./Images/11.jpg.png', categoryproduct:'snacks', p:'Healthy trail mix energy boost', salary:'$18', old_salary:'$20.10', rating:4.3, nameproduct:'trail mix'},
//     {magproducturl:'./Images/12.jpg.png', categoryproduct:'bakery', p:'Whole grain bread nutritious choice', salary:'$22', old_salary:'$25.10', rating:4.7, nameproduct:'whole grain'}
// ];

// Get products from localStorage with fallback
let arrproduct;
try {
    arrproduct = JSON.parse(localStorage.getItem("productsArr")) || defaultProducts;
} catch (error) {
    console.log('localStorage not available, using default products');
    arrproduct = defaultProducts;
}

console.log('arrproduct', arrproduct);

// Pagination variables
let currentPage = 1;
let itemsPerPage = 6;
let currentProducts = arrproduct;

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                performSearch(searchTerm);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Order button functionality
    const orderBtn = document.querySelector('.order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Navigation links active state
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinksItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        navbar.style.transition = 'transform 0.3s ease-in-out';
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Hero section animations
    animateHeroElements();

    // Action items hover effects
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize products display
    initializeProducts();
});

// Hero section animation function
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const orderButton = document.querySelector('.order-btn');
    const discountBadge = document.querySelector('.discount-badge');

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 400);
    }

    if (orderButton) {
        orderButton.style.opacity = '0';
        orderButton.style.transform = 'translateY(20px)';
        orderButton.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            orderButton.style.opacity = '1';
            orderButton.style.transform = 'translateY(0)';
        }, 500);
    }

    if (discountBadge) {
        discountBadge.style.opacity = '0';
        discountBadge.style.transform = 'scale(0.5) rotate(-10deg)';
        discountBadge.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            discountBadge.style.opacity = '1';
            discountBadge.style.transform = 'scale(1) rotate(0deg)';
        }, 700);
    }
}

// Mouse parallax effect for decorations
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

// Fixed renderStars function
function renderStars(rating) {
    const numRating = typeof rating === 'number' ? rating : parseFloat(rating) || 0;
    
    let stars = '';
    const fullStars = Math.floor(numRating);
    const halfStar = numRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) { 
        stars += '<i class="fas fa-star"></i>'; 
    }
    
    if (halfStar) { 
        stars += '<i class="fas fa-star-half-alt"></i>'; 
    }
    
    for (let i = 0; i < emptyStars; i++) { 
        stars += '<i class="far fa-star"></i>'; 
    }
    
    return `${stars} <span>(${numRating.toFixed(1)})</span>`;
}

// Pagination functions
function getPaginatedProducts(products, page, itemsPerPage) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
}

function createPagination(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return '';
    
    let paginationHTML = '<nav class="pagination-nav"><ul class="pagination-list">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<li><button class="pagination-btn" data-page="${currentPage - 1}">Previous</button></li>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationHTML += `<li><button class="pagination-btn ${activeClass}" data-page="${i}">${i}</button></li>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<li><button class="pagination-btn" data-page="${currentPage + 1}">Next</button></li>`;
    }
    
    paginationHTML += '</ul></nav>';
    return paginationHTML;
}

// Display products with pagination
function displayProducts(productsArray = arrproduct) {
    console.log('Displaying products:', productsArray);
    const productGrid = document.getElementById('product-grid');
    
    if (!productGrid) {
        console.error('Product grid element not found');
        return;
    }

    currentProducts = productsArray;
    const paginatedProducts = getPaginatedProducts(productsArray, currentPage, itemsPerPage);

    let productHTML = '';

    if (!paginatedProducts || paginatedProducts.length === 0) {
        productHTML = '<div class="col-12"><p class="text-center">No products found.</p></div>';
    } else {
        paginatedProducts.forEach(product => {
            const imageUrl = product.magproducturl || './Images/placeholder.jpg';
            const category = product.categoryproduct || 'Unknown';
            const title = product.nameproduct || product.p || 'Unknown Product';
            const description = product.p || '';
            const price = product.salary || '$0';
            const oldPrice = product.old_salary || '';
            const rating = product.rating || 0;

            productHTML += `
                <div class="col-lg-4 col-md-6 ">
                    <div class="product-card">
                        <img src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.src='./Images/placeholder.jpg'">
                        <div class="product-category">${category}</div>
                        <div class="rating-stars">${renderStars(rating)}</div>
                        <h3 class="product-title">${title}</h3>
                        <p class="product-description">${description.replace(/<br>/g, ' ')}</p>
                        <div class="product-price-container">
                            <span class="product-price">${price}</span>
                            ${oldPrice ? `<span class="old-price">${oldPrice}</span>` : ''}
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }
    
    productGrid.innerHTML = productHTML;
    
    // Add pagination
    const paginationContainer = document.getElementById('pagination-container') || createPaginationContainer();
    paginationContainer.innerHTML = createPagination(productsArray.length, currentPage, itemsPerPage);
    
    // Add pagination event listeners
    const paginationBtns = paginationContainer.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentPage = parseInt(this.getAttribute('data-page'));
            displayProducts(currentProducts);
        });
    });
}

// Create pagination container if it doesn't exist
function createPaginationContainer() {
    const productGrid = document.getElementById('product-grid');
    if (productGrid && productGrid.parentNode) {
        let paginationContainer = document.getElementById('pagination-container');
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'pagination-container';
            paginationContainer.className = 'mt-4 d-flex justify-content-center';
            productGrid.parentNode.insertBefore(paginationContainer, productGrid.nextSibling);
        }
        return paginationContainer;
    }
    return null;
}

// Search function
function performSearch(searchTerm) {
    currentPage = 1; // Reset to first page
    const filteredProducts = arrproduct.filter(product => {
        const productName = (product.nameproduct || '').toLowerCase();
        const productDesc = (product.p || '').toLowerCase();
        const category = (product.categoryproduct || '').toLowerCase();
        
        return productName.includes(searchTerm.toLowerCase()) || 
               productDesc.includes(searchTerm.toLowerCase()) || 
               category.includes(searchTerm.toLowerCase());
    });
    
    displayProducts(filteredProducts);
}

// Initialize products functionality
function initializeProducts() {
    displayProducts();

    // Category filtering logic
    const categoryLinks = document.querySelectorAll('.sidebar .list-group-item');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            currentPage = 1; // Reset to first page
            
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');
            let filteredProducts;

            if (selectedCategory === 'All' || selectedCategory === 'all') {
                filteredProducts = arrproduct;
            } else {
                filteredProducts = arrproduct.filter(product => 
                    product.categoryproduct.toLowerCase() === selectedCategory.toLowerCase()
                );
            }
            displayProducts(filteredProducts);
        });
    });

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Product added to cart');
        }
    });
}