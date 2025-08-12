// Enhanced Login and Registration System
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = null;
        this.init();
    }

    // Initialize the system
    init() {
        this.setupEventListeners();
        this.addSampleData();
    }

    // Load users from localStorage
    loadUsers() {
        try {
            return JSON.parse(localStorage.getItem('foodzy_users')) || [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }

    // Save users to localStorage
    saveUsers() {
        try {
            localStorage.setItem('foodzy_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById("registerForm");
        if (registerForm) {
            registerForm.addEventListener("submit", (e) => this.handleRegister(e));
        }

        // Real-time validation
        this.setupRealTimeValidation();
    }

    // Setup real-time validation
    setupRealTimeValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        const phoneInputs = document.querySelectorAll('input[type="tel"]');

        emailInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateEmail(input));
        });

        passwordInputs.forEach(input => {
            input.addEventListener('input', () => this.validatePassword(input));
        });

        phoneInputs.forEach(input => {
            input.addEventListener('blur', () => this.validatePhone(input));
        });
    }

    // Handle login
    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("rememberMe").checked;
        
        // Validate inputs
        if (!this.validateLoginInputs(email, password)) {
            return;
        }
        
        // Find user
        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!user) {
            this.showAlert("Email not found. Please register first.", "danger");
            return;
        }
        
        if (user.password !== password) {
            this.showAlert("Incorrect password. Please try again.", "danger");
            return;
        }
        
        // Successful login
        this.currentUser = user;
        
        if (rememberMe) {
            localStorage.setItem('foodzy_remember_user', user.email);
        }
        
        this.showAlert(`Welcome back, ${user.firstName}! Login successful.`, "success");
        
        // Clear form
        document.getElementById("loginForm").reset();
        
        // Simulate redirect after delay
        setTimeout(() => {
            console.log("User logged in:", user);
            // window.location.href = "dashboard.html"; // Uncomment to redirect
        }, 2000);
    }

    // Handle registration
    handleRegister(event) {
        event.preventDefault();
        
        const formData = this.getRegisterFormData();
        
        // Validate all inputs
        if (!this.validateRegisterInputs(formData)) {
            return;
        }
        
        // Check if user already exists
        const existingUser = this.users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
        if (existingUser) {
            this.showAlert("Email already registered. Please use a different email.", "danger");
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            ...formData,
            email: formData.email.toLowerCase(),
            registrationDate: new Date().toISOString(),
            isActive: true
        };
        
        // Add user to array and save
        this.users.push(newUser);
        this.saveUsers();
        
        // Success message
        this.showAlert(`Registration successful! Welcome ${formData.firstName} ${formData.lastName}. You can now login.`, "success");
        
        // Clear form
        document.getElementById("registerForm").reset();
        
        // Redirect to login page after delay
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }

    // Get registration form data
    getRegisterFormData() {
        return {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            email: document.getElementById("registerEmail").value.trim(),
            phoneNumber: document.getElementById("phoneNumber").value.trim(),
            address: document.getElementById("address").value.trim(),
            city: document.getElementById("city").value.trim(),
            postCode: document.getElementById("postCode").value.trim(),
            country: document.getElementById("country").value.trim(),
            regionState: document.getElementById("regionState").value.trim(),
            password: document.getElementById("registerPassword").value
        };
    }

    // Validate login inputs
    validateLoginInputs(email, password) {
        if (!email) {
            this.showAlert("Please enter your email address", "danger");
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showAlert("Please enter a valid email address", "danger");
            return false;
        }
        
        if (!password) {
            this.showAlert("Please enter your password", "danger");
            return false;
        }
        
        if (password.length < 6) {
            this.showAlert("Password must be at least 6 characters long", "danger");
            return false;
        }
        
        return true;
    }

    // Validate registration inputs
    validateRegisterInputs(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'city', 'country', 'regionState', 'password'];
        
        for (let field of requiredFields) {
            if (!data[field]) {
                this.showAlert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`, "danger");
                return false;
            }
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showAlert("Please enter a valid email address", "danger");
            return false;
        }
        
        if (!this.isValidPhone(data.phoneNumber)) {
            this.showAlert("Please enter a valid phone number", "danger");
            return false;
        }
        
        if (data.password.length < 6) {
            this.showAlert("Password must be at least 6 characters long", "danger");
            return false;
        }
        
        return true;
    }

    // Email validation
    validateEmail(input) {
        const isValid = this.isValidEmail(input.value);
        this.toggleInputValidation(input, isValid);
        return isValid;
    }

    // Password validation
    validatePassword(input) {
        const isValid = input.value.length >= 6;
        this.toggleInputValidation(input, isValid);
        return isValid;
    }

    // Phone validation
    validatePhone(input) {
        const isValid = this.isValidPhone(input.value);
        this.toggleInputValidation(input, isValid);
        return isValid;
    }

    // Toggle input validation styling
    toggleInputValidation(input, isValid) {
        if (input.value.length === 0) {
            input.classList.remove('is-valid', 'is-invalid');
            return;
        }
        
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    // Email validation helper
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation helper
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
    }

    // Display alert messages
    showAlert(message, type) {
        const alertContainer = document.getElementById("alertContainer");
        
        // Remove previous alerts
        alertContainer.innerHTML = "";
        
        // Create new alert
        const alert = document.createElement("div");
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 500px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        `;
        
        alert.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        alertContainer.appendChild(alert);
        
        // Remove alert automatically after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    // Helper methods for data management
    getAllUsers() {
        return this.users;
    }

    getUserByEmail(email) {
        return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('foodzy_remember_user');
        this.showAlert("Logged out successfully", "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }

    // Add sample data for testing
    addSampleData() {
        if (this.users.length === 0) {
            const sampleUser = {
                id: 1,
                firstName: "Ahmed",
                lastName: "Mohamed",
                email: "ahmed@example.com",
                phoneNumber: "+201234567890",
                address: "123 Nile St",
                city: "Cairo",
                postCode: "12345",
                country: "Egypt",
                regionState: "Cairo",
                password: "123456",
                registrationDate: new Date().toISOString(),
                isActive: true
            };
            
            this.users.push(sampleUser);
            this.saveUsers();
            console.log("Sample user added for testing:", sampleUser.email, "password:", sampleUser.password);
        }
    }

    // Check for remembered user on page load
    checkRememberedUser() {
        const rememberedEmail = localStorage.getItem('foodzy_remember_user');
        if (rememberedEmail) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = rememberedEmail;
                document.getElementById('rememberMe').checked = true;
            }
        }
    }
}

// Initialize the authentication system when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    window.authSystem = new AuthSystem();
    
    // Check for remembered user
    if (document.getElementById('email')) {
        window.authSystem.checkRememberedUser();
    }
});

// Add CSS for validation states
const validationStyles = `
    .form-control.is-valid {
        border-color: #28a745;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    }
    
    .form-control.is-invalid {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .alert {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Inject validation styles
const styleSheet = document.createElement("style");
styleSheet.textContent = validationStyles;
document.head.appendChild(styleSheet);

