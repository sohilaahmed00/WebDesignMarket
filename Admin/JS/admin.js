let users = JSON.parse(localStorage.getItem('foodzy_users')) || [];
let products = JSON.parse(localStorage.getItem('productsArr')) || [];
let orders = JSON.parse(localStorage.getItem('foodzy_orders')) || [];

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('d-none'));
    document.getElementById(`${section}-section`).classList.remove('d-none');
    if (section === 'users') loadUsers();
    if (section === 'products') loadProducts();
    if (section === 'orders') loadOrders();
}

function loadUsers() {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editUser(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editUser(index) {
    const user = users[index];
    document.getElementById('userId').value = index;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('phoneNumber').value = user.phoneNumber;
    document.getElementById('password').value = user.password;
    document.getElementById('address').value = user.address;
    document.getElementById('city').value = user.city;
    document.getElementById('postCode').value = user.postCode;
    document.getElementById('country').value = user.country;
    document.getElementById('regionState').value = user.regionState;
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function saveUser() {
    const index = document.getElementById('userId').value;
    const userData = {
        id: index ? users[index].id : Date.now(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value.toLowerCase(),
        phoneNumber: document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postCode: document.getElementById('postCode').value,
        country: document.getElementById('country').value,
        regionState: document.getElementById('regionState').value,
        registrationDate: index ? users[index].registrationDate : new Date().toISOString(),
        isActive: true
    };

    if (index !== '') {
        users[index] = userData;
    } else {
        users.push(userData);
    }

    localStorage.setItem('foodzy_users', JSON.stringify(users));
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
    loadUsers();
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        localStorage.setItem('foodzy_users', JSON.stringify(users));
        loadUsers();
    }
}

function loadProducts() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.nameproduct}</td>
            <td>${product.categoryproduct}</td>
            <td>${product.salary}</td>
            <td>${product.magproducturl}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editProduct(index) {
    const product = products[index];
    document.getElementById('productId').value = index;
    document.getElementById('nameproduct').value = product.nameproduct;
    document.getElementById('categoryproduct').value = product.categoryproduct;
    document.getElementById('p').value = product.p;
    document.getElementById('salary').value = product.salary;
    document.getElementById('old_salary').value = product.old_salary || '';
    document.getElementById('magproducturl').value = product.magproducturl;
    document.getElementById('rating').value = product.rating || 0;
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

function saveProduct() {
    const index = document.getElementById('productId').value;
    const productData = {
        magproducturl: document.getElementById('magproducturl').value,
        categoryproduct: document.getElementById('categoryproduct').value,
        p: document.getElementById('p').value,
        salary: document.getElementById('salary').value,
        old_salary: document.getElementById('old_salary').value,
        rating: parseFloat(document.getElementById('rating').value) || 0,
        nameproduct: document.getElementById('nameproduct').value
    };

    if (index !== '') {
        products[index] = productData;
    } else {
        products.push(productData);
    }

    localStorage.setItem('productsArr', JSON.stringify(products));
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    loadProducts();
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        localStorage.setItem('productsArr', JSON.stringify(products));
        loadProducts();
    }
}

function loadOrders() {
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';
    orders.forEach((order, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.userEmail}</td>
            <td>$${order.total}</td>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${order.items.length} items</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteOrder(index) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders.splice(index, 1);
        localStorage.setItem('foodzy_orders', JSON.stringify(orders));
        loadOrders();
    }
}

// Initial load
showSection('users');

// Clear modal forms on close
document.getElementById('userModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
});

document.getElementById('productModal').addEventListener('hidden.bs.modal', () => {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
});