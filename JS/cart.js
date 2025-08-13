let cart = [];
const cartItemsContainer = document.getElementById('cart-items');

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

  // You can add a total display section if needed
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

function checkout() {
  if(cart.length === 0){
    showMessage('Your cart is empty', 'error');
    return;
  }
  
  // Navigate to checkout without clearing cart
  window.location.href = 'checkout.html';
}

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

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
  renderCart();
  
  // Update cart count in navigation if cart manager is available
  if (typeof cartManager !== 'undefined') {
    cartManager.updateCartDisplay();
  }
});

