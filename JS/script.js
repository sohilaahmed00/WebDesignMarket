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
                // Here you would typically send the search to your backend
                alert(`البحث عن: ${searchTerm}`);
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
            // Add some animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            alert('تم إضافة الطلب إلى السلة!');
        });
    }

    // Smooth scrolling for navigation links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinksItems.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out';

    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const orderButton = document.querySelector('.order-btn');
    const discountBadge = document.querySelector('.discount-badge');

    // Add animation classes
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
        }, 100);
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

    // Add hover effects to action items
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add some interactive effects
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

// Product data
const arrproduct = [
    { 
        magproducturl: './Images/1.jpg.png', 
        h6: 'Vegetables', 
        p: 'Fresh organic villa farm lemon 500gm pack', 
        salary: '$120.25', 
        old_salary: '$123.25', 
        rating: 4.5 
    },
    { 
        magproducturl: './Images/9.jpg.png', 
        h6: 'Snacks', 
        p: 'Best snakes with hazel nut pack 200gm', 
        salary: '$145', 
        old_salary: '$150', 
        rating: 5.0 
    },
    { 
        magproducturl: './Images/2.jpg.png', 
        h6: 'Fruits', 
        p: 'Fresh organic apple 1kg simla marming', 
        salary: '$120.25', 
        old_salary: '$123.26', 
        rating: 4.5 
    },
    { 
        magproducturl: './Images/3 .jpg.png', 
        h6: 'Fruits', 
        p: 'Organic fresh venila farm watermelon 5kg', 
        salary: '$50.30', 
        old_salary: '$72.60', 
        rating: 3.2 
    },
    { 
        magproducturl: './Images/10.jpg.png', 
        h6: 'Snacks', 
        p: 'Sweet crunchy nut mix 250gm pack', 
        salary: '$120.25', 
        old_salary: '$123.25', 
        rating: 5.0 
    },
    { 
        magproducturl: './Images/17.jpg.png', 
        h6: 'Bakery', 
        p: 'Delicious white baked fresh bread and toast', 
        salary: '$20', 
        old_salary: '$22.10', 
        rating: 5.0 
    }
];

// Render stars function
function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
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
    return `${stars} <span>(${rating.toFixed(1)})</span>`;
}

// Display products function
function displayProducts(productsArray = arrproduct) {
    const productGrid = document.getElementById('product-grid');
    let productHTML = '';

    if (productsArray.length === 0) {
        productHTML = '<div class="col-12"><p class="text-center">No products found.</p></div>';
    } else {
        productsArray.forEach(product => {
            productHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="product-card">
                        <img src="${product.magproducturl}" alt="${product.p}" loading="lazy">
                        <div class="product-category">${product.h6}</div>
                        <div class="rating-stars">${renderStars(product.rating)}</div>
                        <h3 class="product-title">${product.p}</h3>
                        <div class="product-price-container">
                            <span class="product-price">${product.salary}</span>
                            <span class="old-price">${product.old_salary}</span>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }
    productGrid.innerHTML = productHTML;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initial display of all products
    displayProducts();

    // Category filtering logic
    const categoryLinks = document.querySelectorAll('.sidebar .list-group-item');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Manage active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');
            let filteredProducts;

            if (selectedCategory === 'All') {
                filteredProducts = arrproduct;
            } else {
                filteredProducts = arrproduct.filter(product => product.h6 === selectedCategory);
            }
            displayProducts(filteredProducts);
        });
    });

    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.preventDefault();
            // Add your cart logic here
            alert('Product added to cart!');
        }
    });
});