// --- GLOBAL VARIABLES ---
let userModal;
let productModal;

// --- UI INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Bootstrap Modals
    userModal = new bootstrap.Modal(document.getElementById('userModal'));
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    
    // Show the default section on page load
    showSection('users', document.querySelector('.sidebar a[onclick*="users"]'));

    // Logout functionality
    document.getElementById('logout-button').addEventListener('click', (e) => {
        e.preventDefault();
        ui.showConfirm('Are you sure you want to log out?', () => {
            auth.logout();
            ui.showAlert('You have been logged out successfully.', 'success');
            setTimeout(() => { window.location.href = '../login.html'; }, 1500);
        });
    });
});

// --- NAVIGATION ---
function showSection(sectionId, navLink) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('d-none'));
    document.getElementById(`${sectionId}-section`).classList.remove('d-none');
    document.querySelectorAll('.sidebar .nav-link').forEach(link => link.classList.remove('active'));
    if (navLink) navLink.classList.add('active');

    switch (sectionId) {
        case 'users': loadUsers(); break;
        case 'products': loadProducts(); break;
        case 'orders': loadOrders(); break;
    }
}

// --- USER MANAGEMENT ---
function loadUsers() {
    const users = auth.getUsers();
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        const adminBadge = user.isAdmin ? '<span class="badge bg-primary">Admin</span>' : '';
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.firstName} ${user.lastName} ${adminBadge}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber || 'N/A'}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="openUserModal(${user.id})" ${user.isAdmin ? 'disabled' : ''}><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})" ${user.isAdmin ? 'disabled' : ''}><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openUserModal(userId = null) {
    const form = document.getElementById('userForm');
    form.reset();
    document.getElementById('userId').value = '';
    const modalTitle = document.getElementById('userModalTitle');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('password');

    if (userId !== null) {
        modalTitle.textContent = 'Edit User';
        const user = auth.getUserById(userId);
        if (user) {
            document.getElementById('userId').value = user.id;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('phoneNumber').value = user.phoneNumber || '';
            passwordGroup.style.display = 'none';
            passwordInput.required = false;
        }
    } else {
        modalTitle.textContent = 'Add New User';
        passwordGroup.style.display = 'block';
        passwordInput.required = true;
    }
    userModal.show();
}

function saveUser() {
    const userId = document.getElementById('userId').value ? parseInt(document.getElementById('userId').value) : null;
    
    if (userId !== null) {
        const updatedData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
        };
        auth.updateUser(userId, updatedData);
        ui.showAlert('User updated successfully!', 'success');
    } else {
        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            password: document.getElementById('password').value,
        };
        if (!userData.password) {
            ui.showAlert('Password is required for new users.', 'danger');
            return;
        }
        const result = auth.register(userData);
        ui.showAlert(result.message, result.success ? 'success' : 'danger');
    }

    userModal.hide();
    loadUsers();
}

function deleteUser(userId) {
    ui.showConfirm('Are you sure you want to delete this user?', () => {
        auth.deleteUser(userId);
        loadUsers();
    });
}

// --- PRODUCT MANAGEMENT ---
function loadProducts() {
    const products = productManager.getProducts();
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        
        // === تم تصحيح المسار هنا ===
        // The path now correctly points from the Admin folder back to the root, then into Images.
        const imageUrl = product.magproducturl.replace('./', '../');

        tr.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${imageUrl}" alt="${product.nameproduct}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"></td>
            <td>${product.nameproduct}</td>
            <td>${product.categoryproduct}</td>
            <td>${product.salary}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="openProductModal(${product.id})"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openProductModal(productId = null) {
    const form = document.getElementById('productForm');
    form.reset();
    document.getElementById('productId').value = '';
    const modalTitle = document.getElementById('productModalTitle');
    if (productId) {
        modalTitle.textContent = 'Edit Product';
        const product = productManager.getProductById(productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('nameproduct').value = product.nameproduct;
            document.getElementById('categoryproduct').value = product.categoryproduct;
            document.getElementById('p').value = product.p;
            document.getElementById('salary').value = product.salary;
            document.getElementById('old_salary').value = product.old_salary || '';
            document.getElementById('magproducturl').value = product.magproducturl;
            document.getElementById('rating').value = product.rating || 0;
        }
    } else {
        modalTitle.textContent = 'Add New Product';
    }
    productModal.show();
}

function saveProduct() {
    const productId = document.getElementById('productId').value ? parseInt(document.getElementById('productId').value) : null;
    const productData = {
        nameproduct: document.getElementById('nameproduct').value,
        categoryproduct: document.getElementById('categoryproduct').value,
        p: document.getElementById('p').value,
        salary: document.getElementById('salary').value,
        old_salary: document.getElementById('old_salary').value,
        magproducturl: document.getElementById('magproducturl').value,
        rating: parseFloat(document.getElementById('rating').value) || 0,
    };
    if (productId) {
        productManager.updateProduct(productId, productData);
        ui.showAlert('Product updated successfully!', 'success');
    } else {
        productManager.addProduct(productData);
        ui.showAlert('Product added successfully!', 'success');
    }
    productModal.hide();
    loadProducts();
}

function deleteProduct(productId) {
    ui.showConfirm('Are you sure you want to delete this product?', () => {
        productManager.deleteProduct(productId);
        ui.showAlert('Product deleted successfully.', 'success');
        loadProducts();
    });
}

// --- ORDER MANAGEMENT ---
function loadOrders() {
    const orders = orderManager.getOrders();
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = '';
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.userEmail}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.length} items</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteOrder(${order.id})"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteOrder(orderId) {
    ui.showConfirm('Are you sure you want to delete this order?', () => {
        orderManager.deleteOrder(orderId);
        ui.showAlert('Order deleted successfully.', 'success');
        loadOrders();
    });
}
