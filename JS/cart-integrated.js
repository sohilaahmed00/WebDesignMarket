// Integrated Cart and Checkout JavaScript
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderCart();
  setupCheckoutFunctionality();
  
  // Update cart count in navigation if cart manager is available
  if (typeof cartManager !== 'undefined') {
    cartManager.updateCartDisplay();
  }
});

// Cart Functions
function renderCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';

  if(cart.length === 0){
    cartItemsContainer.innerHTML = `
      <tr>
        <td colspan="5" class="text-center" style="padding: 40px;">
          <div style="color: #666; font-size: 18px;">
            <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i>
            <p>Your cart is empty</p>
            <a href="index.html" style="color: #ff4b3e; text-decoration: none;">Continue Shopping</a>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  cart.forEach((item, index) => {
    let priceNum = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
    const total = (priceNum * item.quantity).toFixed(2);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="product-info">
          <img src="${item.image}" alt="${item.name}" class="product-img" />
          <div>
            <h6 class="product-name">${item.name}</h6>
          </div>
        </div>
      </td>
      <td style="font-weight: 600; color: #ff4b3e;">$${priceNum.toFixed(2)}</td>
      <td>
        <div class="quantity-controls">
          <button class="qty-btn decrease-qty" data-index="${index}">-</button>
          <input type="text" class="qty-input" value="${item.quantity}" data-index="${index}" readonly />
          <button class="qty-btn increase-qty" data-index="${index}">+</button>
        </div>
      </td>
      <td style="font-weight: 600; color: #333;">$${total}</td>
      <td>
        <button class="btn-remove" data-index="${index}" title="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
    cartItemsContainer.appendChild(tr);
  });

  // Update cart total display
  updateCartTotal();
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
    return sum + (price * item.quantity);
  }, 0);

  console.log('Cart Total:', total.toFixed(2));
}

// Event listeners for cart interactions
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('input', function(e){
    if(e.target.classList.contains('qty-input')){
      const index = e.target.dataset.index;
      let val = parseInt(e.target.value);
      if(isNaN(val) || val < 1) val = 1;
      cart[index].quantity = val;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      
      // Update cart count in navigation
      if (typeof cartManager !== 'undefined') {
        cartManager.updateCartDisplay();
      }
    }
  });

  cartItemsContainer.addEventListener('click', function(e){
    const index = e.target.closest('[data-index]')?.dataset.index;
    
    if(e.target.classList.contains('increase-qty') || e.target.closest('.increase-qty')){
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      
      // Update cart count in navigation
      if (typeof cartManager !== 'undefined') {
        cartManager.updateCartDisplay();
      }
    }
    
    if(e.target.classList.contains('decrease-qty') || e.target.closest('.decrease-qty')){
      if(cart[index].quantity > 1){
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        
        // Update cart count in navigation
        if (typeof cartManager !== 'undefined') {
          cartManager.updateCartDisplay();
        }
      }
    }
    
    if(e.target.classList.contains('btn-remove') || e.target.closest('.btn-remove')){
      // Show confirmation before removing
      if(confirm('Are you sure you want to remove this item from your cart?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        
        // Update cart count in navigation
        if (typeof cartManager !== 'undefined') {
          cartManager.updateCartDisplay();
        }
        
        // Show removal message
        showMessage('Item removed from cart', 'success');
      }
    }
  });
}

// Section Navigation Functions
function showCheckout() {
  if(cart.length === 0){
    showMessage('Your cart is empty', 'error');
    return;
  }
  
  // Hide cart section and show checkout section
  document.getElementById('cart-section').style.display = 'none';
  document.getElementById('checkout-section').classList.add('active');
  
  // Load checkout summary
  loadCheckoutSummary();
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function showCart() {
  // Hide checkout section and show cart section
  document.getElementById('checkout-section').classList.remove('active');
  document.getElementById('cart-section').style.display = 'block';
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Checkout Functions
function loadCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const summaryProducts = document.getElementById('checkout-summary-products');
  const subtotalElement = document.getElementById('checkout-subtotal');
  const deliveryElement = document.getElementById('checkout-delivery');
  const totalElement = document.getElementById('checkout-total');
  
  if (cart.length === 0) {
    if (summaryProducts) {
      summaryProducts.innerHTML = '<p class="text-muted">No items in cart</p>';
    }
    return;
  }

  let subtotal = 0;
  let productsHTML = '';

  cart.forEach(item => {
    const itemPrice = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;
    
    productsHTML += `
      <div class="product-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50'">
        <div class="product-info">
          <h6>${item.name}</h6>
          <div class="rating">★★★★★ (4.5)</div>
          <div class="price">$${itemPrice.toFixed(2)} x ${item.quantity}</div>
        </div>
      </div>
    `;
  });

  if (summaryProducts) {
    summaryProducts.innerHTML = productsHTML;
  }

  const deliveryCharge = subtotal > 50 ? 0 : 5;
  const total = subtotal + deliveryCharge;

  if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2);
  if (deliveryElement) deliveryElement.textContent = deliveryCharge.toFixed(2);
  if (totalElement) totalElement.textContent = total.toFixed(2);
}

function setupCheckoutFunctionality() {
  // Handle checkout options
  const checkoutOptions = document.querySelectorAll('input[name="checkoutOptions"]');
  checkoutOptions.forEach(option => {
    option.addEventListener('change', function() {
      if (this.value === 'register') {
        console.log('Register account selected');
      } else {
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
        const billingSection = document.querySelector('.checkout-card h5');
        if (billingSection) {
          billingSection.scrollIntoView({ behavior: 'smooth' });
        }
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
          showMessage('Login successful!', 'success');
        }, 2000);
      } else {
        showMessage('Please enter both email and password', 'error');
      }
    });
  }

  // Handle shipping method changes
  document.addEventListener('change', function(e) {
    if (e.target.name === 'shippingMethod') {
      const deliveryElement = document.getElementById('checkout-delivery');
      const totalElement = document.getElementById('checkout-total');
      const subtotalElement = document.getElementById('checkout-subtotal');
      
      if (deliveryElement && totalElement && subtotalElement) {
        const subtotal = parseFloat(subtotalElement.textContent);
        const deliveryCharge = e.target.value === 'free' ? 0 : 5;
        const total = subtotal + deliveryCharge;
        
        deliveryElement.textContent = deliveryCharge.toFixed(2);
        totalElement.textContent = total.toFixed(2);
      }
    }
  });

  // Handle address checkbox
  document.addEventListener('change', function(e) {
    if (e.target.id === 'useExistingAddress') {
      const billingFields = document.querySelectorAll('#firstName, #lastName, #address, #city, #postCode');
      
      if (e.target.checked) {
        // Pre-fill with existing address
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
}

function placeOrder() {
  if (validateCheckoutForm()) {
    const placeOrderBtn = document.querySelector('.place-order-btn');
    placeOrderBtn.classList.add('btn-loading');
    
    setTimeout(() => {
      placeOrderBtn.classList.remove('btn-loading');
      // Clear cart
      localStorage.removeItem('cart');
      // Redirect to thank you page
      window.location.href = 'thank.html';
    }, 2000);
  }
}

function validateCheckoutForm() {
  const requiredFields = document.querySelectorAll('#firstName, #lastName, #address, #city, #postCode');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });
  
  if (!isValid) {
    showMessage('Please fill in all required fields correctly.', 'error');
    // Scroll to first invalid field
    const firstInvalid = document.querySelector('.is-invalid');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
    }
  }
  
  return isValid;
}

// Utility Functions
function showMessage(message, type = 'info') {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 9999;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

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

