// Enhanced Checkout JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout functionality
    initializeCheckout();
    loadCartSummary();
    setupFormValidation();
    setupPaymentMethods();
});

function initializeCheckout() {
    // Handle checkout options
    const checkoutOptions = document.querySelectorAll('input[name="checkoutOptions"]');
    checkoutOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'register') {
                // Show additional registration fields if needed
                console.log('Register account selected');
            } else {
                // Guest checkout
                console.log('Guest account selected');
            }
        });
    });

    // Handle continue button
    const continueBtn = document.querySelector('.continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="checkoutOptions"]:checked');
            if (selectedOption) {
                // Scroll to billing details
                document.querySelector('.checkout-card h5').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // Handle login button
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const email = document.getElementById('inputEmail').value;
            const password = document.getElementById('inputPassword').value;
            
            if (email && password) {
                // Simulate login process
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                    alert('Login successful!');
                }, 2000);
            } else {
                alert('Please enter both email and password');
            }
        });
    }

    // Handle place order button
    const placeOrderBtn = document.querySelector('.place-order-btn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            if (validateCheckoutForm()) {
                this.classList.add('btn-loading');
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                    window.location.href = 'thank.html';
                }, 2000);
            }
        });
    }
}

function loadCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryProducts = document.getElementById('summary-products');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryElement = document.getElementById('delivery');
    const totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        if (summaryProducts) {
            summaryProducts.innerHTML = '<p class="text-muted">No items in cart</p>';
        }
        if (subtotalElement) subtotalElement.textContent = '0.00';
        if (deliveryElement) deliveryElement.textContent = '0.00';
        if (totalElement) totalElement.textContent = '0.00';
        return;
    }

    let subtotal = 0;
    let productsHTML = '';

    cart.forEach(item => {
        // Extract numeric value from price string (remove $ and other characters)
        const priceValue = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
        const itemTotal = priceValue * item.quantity;
        subtotal += itemTotal;
        
        productsHTML += `
            <div class="product-item d-flex align-items-center mb-3 p-2 border rounded">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" onerror="this.src='https://via.placeholder.com/50'">
                <div class="product-info ms-3 flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    <div class="text-warning mb-1">★★★★★ (4.5)</div>
                    <div class="text-muted">${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</div>
                </div>
            </div>
        `;
    });

    if (summaryProducts) {
        summaryProducts.innerHTML = productsHTML;
    }

    // Calculate delivery charge based on shipping method
    const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked');
    const deliveryCharge = (shippingMethod && shippingMethod.value === 'flat') ? 5 : 0;
    const total = subtotal + deliveryCharge;

    if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2);
    if (deliveryElement) deliveryElement.textContent = deliveryCharge.toFixed(2);
    if (totalElement) totalElement.textContent = total.toFixed(2);
}

function setupFormValidation() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = value !== '';
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(value);
        field.classList.toggle('is-invalid', !isValidEmail);
        return isValidEmail;
    }
    
    field.classList.toggle('is-invalid', !isValid);
    return isValid;
}

function validateCheckoutForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
        // Scroll to first invalid field
        const firstInvalid = document.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid.focus();
        }
    }
    
    return isValid;
}

function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Handle different payment methods
            const selectedMethod = this.value;
            console.log('Payment method selected:', selectedMethod);
            
            // You can add specific logic for different payment methods here
            if (selectedMethod === 'cod') {
                // Cash on delivery selected
            } else if (selectedMethod === 'upi') {
                // UPI selected
            } else if (selectedMethod === 'bank') {
                // Bank transfer selected
            }
        });
    });
}

// Shipping method handling
document.addEventListener('change', function(e) {
    if (e.target.name === 'shippingMethod') {
        const deliveryElement = document.getElementById('delivery');
        const totalElement = document.getElementById('total');
        const subtotalElement = document.getElementById('subtotal');
        
        if (deliveryElement && totalElement && subtotalElement) {
            const subtotal = parseFloat(subtotalElement.textContent);
            const deliveryCharge = e.target.value === 'free' ? 0 : 5;
            const total = subtotal + deliveryCharge;
            
            deliveryElement.textContent = deliveryCharge.toFixed(2);
            totalElement.textContent = total.toFixed(2);
        }
    }
});

// Address checkbox handling
document.addEventListener('change', function(e) {
    if (e.target.id === 'useExistingAddress') {
        const billingFields = document.querySelectorAll('#firstName, #lastName, #address, #city, #postCode');
        
        if (e.target.checked) {
            // Pre-fill with existing address (you can customize this)
            billingFields.forEach(field => {
                field.value = 'Sample ' + field.placeholder;
            });
        } else {
            // Clear fields
            billingFields.forEach(field => {
                field.value = '';
            });
        }
    }
});

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Initialize cart count on page load
updateCartCount();

