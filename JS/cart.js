
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');

function renderCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';

  if(cart.length === 0){
    cartItemsContainer.innerHTML = '<tr><td colspan="5" class="text-center">Cart is empty</td></tr>';
    return;
  }

  cart.forEach((item, index) => {
    let priceNum = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
    const total = (priceNum * item.quantity).toFixed(2);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" class="product-img" />
        <span>${item.name}</span>
      </td>
      <td>$${priceNum.toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-outline-secondary decrease-qty" data-index="${index}">-</button>
        <input type="text" class="qty-input" value="${item.quantity}" data-index="${index}" />
        <button class="btn btn-sm btn-outline-secondary increase-qty" data-index="${index}">+</button>
      </td>
      <td>$${total}</td>
      <td><button class="btn-remove" data-index="${index}" title="Delete">&#128465;</button></td>
    `;
    cartItemsContainer.appendChild(tr);
  });
}

renderCart();

cartItemsContainer.addEventListener('input', function(e){
  if(e.target.classList.contains('qty-input')){
    const index = e.target.dataset.index;
    let val = parseInt(e.target.value);
    if(isNaN(val) || val < 1) val = 1;
    cart[index].quantity = val;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

cartItemsContainer.addEventListener('click', function(e){
  const index = e.target.dataset.index;
  if(e.target.classList.contains('increase-qty')){
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
  if(e.target.classList.contains('decrease-qty')){
    if(cart[index].quantity > 1){
      cart[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }
  if(e.target.classList.contains('btn-remove')){
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

function checkout() {
  if(cart.length === 0){
    alert('The basket is empty');
    return;
  }
  localStorage.removeItem('cart'); 
  window.location.href = 'thank.html';
}

// Search filter
function doSearch(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();

  const rows = cartItemsContainer.querySelectorAll('tr');
  rows.forEach(row => {
    const nameCell = row.querySelector('td span');
    if(nameCell) {
      const productName = nameCell.textContent.toLowerCase();
      row.style.display = productName.includes(query) ? '' : 'none';
    }
  });
}







// Modifications to cart.js (add this to the existing cart.js file)
function checkoutCart() {
  if(cart.length === 0){
    alert('The basket is empty');
    return;
  }
  
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  if (!currentUserEmail) {
    alert('Please login to place an order');
    window.location.href = 'login.html';
    return;
  }
  
  let total = 0;
  cart.forEach(item => {
    let priceNum = parseFloat(item.price.toString().replace(/[^0-9.-]+/g,"")) || 0;
    total += priceNum * item.quantity;
  });
  
  const order = {
    id: Date.now(),
    userEmail: currentUserEmail,
    items: [...cart],
    total: total.toFixed(2),
    date: new Date().toISOString()
  };
  
  let orders = JSON.parse(localStorage.getItem('foodzy_orders')) || [];
  orders.push(order);
  localStorage.setItem('foodzy_orders', JSON.stringify(orders));
  
  localStorage.removeItem('cart'); 
  window.location.href = 'thank.html';
}