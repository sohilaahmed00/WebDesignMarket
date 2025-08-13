document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const result = auth.login(email, password);
            
            ui.showAlert(result.message, result.success ? 'success' : 'danger');

            if (result.success) {
                setTimeout(() => {
                    if (result.user.isAdmin) {
                        window.location.href = 'Admin/admin.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('registerEmail').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                password: document.getElementById('registerPassword').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postCode: document.getElementById('postCode').value,
                country: document.getElementById('country').value,
                regionState: document.getElementById('regionState').value,
            };
            const result = auth.register(userData);
            
            ui.showAlert(result.message, result.success ? 'success' : 'danger');

            if (result.success) {
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }
});
