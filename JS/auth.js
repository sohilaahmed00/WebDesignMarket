class FoodzyAuth {
    constructor() {
        this.usersKey = 'foodzy_users';
        this.currentUserKey = 'foodzy_currentUser';
        this.adminEmail = 'admin@foodzy.com';
        this.init();
    }

    init() {
        const users = this.getUsers();
        const adminExists = users.some(user => user.email === this.adminEmail);
        if (!adminExists) {
            users.push({
                id: 0,
                firstName: 'Admin',
                lastName: 'User',
                email: this.adminEmail,
                password: 'adminpassword',
                isAdmin: true
            });
            this._saveUsers(users);
        }
    }

    _saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey)) || [];
    }

    getUserById(userId) {
        return this.getUsers().find(u => u.id === userId);
    }

    register(userData) {
        const users = this.getUsers();
        if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
            return { success: false, message: 'This email is already registered.' };
        }
        const newUser = { id: Date.now(), ...userData, isAdmin: false };
        users.push(newUser);
        this._saveUsers(users);
        return { success: true, message: 'Registration successful! You can now log in.' };
    }

    login(email, password) {
        const user = this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            return { success: false, message: 'Email not found.', user: null };
        }
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password.', user: null };
        }
        localStorage.setItem(this.currentUserKey, user.email);
        return { success: true, message: `Welcome back, ${user.firstName}!`, user: user };
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    getCurrentUser() {
        const userEmail = localStorage.getItem(this.currentUserKey);
        if (!userEmail) return null;
        return this.getUsers().find(u => u.email === userEmail) || null;
    }

    isAdmin() {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.isAdmin === true : false;
    }

    updateUser(userId, updatedData) {
        let users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex > -1) {
            users[userIndex] = { ...users[userIndex], ...updatedData };
            this._saveUsers(users);
            return users[userIndex];
        }
        return null;
    }

    deleteUser(userId) {
        let users = this.getUsers();
        if (users.find(u => u.id === userId)?.isAdmin) {
            ui.showAlert('The admin account cannot be deleted.', 'danger');
            return;
        }
        users = users.filter(user => user.id !== userId);
        this._saveUsers(users);
    }
}

const auth = new FoodzyAuth();
