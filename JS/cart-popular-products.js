// Popular Products for Cart Page
document.addEventListener('DOMContentLoaded', function() {
    // Sample popular products data
    const popularProducts = [
        {
            id: 'popular-1',
            image: './Images/13.jpg.png',
            category: 'Snacks',
            name: 'Best snakes with hazel nut mix pack 200gm',
            price: '$120.25',
            oldPrice: '$125.25',
            rating: 4.5
        },
        {
            id: 'popular-2',
            image: './Images/10.jpg.png',
            category: 'Snacks',
            name: 'Sweet snakes crunchy nut mix 250gm pack',
            price: '$100.00',
            oldPrice: '$110.00',
            rating: 4.0
        },
        {
            id: 'popular-3',
            image: './Images/1.jpg.png',
            category: 'Snacks',
            name: 'Best snakes with hazel nut mix pack 200gm',
            price: '$120.25',
            oldPrice: '$125.25',
            rating: 4.5
        },
        {
            id: 'popular-4',
            image: './Images/2.jpg.png',
            category: 'Snacks',
            name: 'Sweet snakes crunchy nut mix 250gm pack',
            price: '$100.00',
            oldPrice: '$110.00',
            rating: 4.0
        }
    ];

    // Function to render stars
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

    // Function to display popular products
    function displayPopularProducts() {
        const popularProductsContainer = document.getElementById('popular-products');
        
        if (!popularProductsContainer) {
            return;
        }

        let productsHTML = '';

        popularProducts.forEach(product => {
            productsHTML += `
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" />
                        <div class="product-category">${product.category}</div>
                        <div class="rating-stars">${renderStars(product.rating)}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price-container">
                            <span class="product-price">${product.price}</span>
                            ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ''}
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart({
                            id: '${product.id}',
                            name: '${product.name}',
                            price: '${product.price}',
                            image: '${product.image}'
                        })">Add to Cart</button>
                    </div>
                </div>
            `;
        });

        popularProductsContainer.innerHTML = productsHTML;
    }

    // Initialize popular products
    displayPopularProducts();
});

