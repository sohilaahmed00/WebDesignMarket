class OrderManager {
    constructor() {
        this.ordersKey = 'foodzy_orders';
        this.init();
    }

    // Initialize with default orders if none exist
    init() {
        const orders = this.getOrders();
        if (orders.length === 0) {
            const defaultOrders = [
                { id: 1001, userEmail: 'customer1@example.com', total: 145.00, date: new Date().toISOString(), items: [{ name: 'Hazelnut Snack Pack', quantity: 1 }] },
                { id: 1002, userEmail: 'customer2@example.com', total: 145.50, date: new Date().toISOString(), items: [{ name: 'Fresh Organic Lemon', quantity: 1 }, { name: 'Sweet Strawberry Cake', quantity: 1 }] }
            ];
            this._saveOrders(defaultOrders);
        }
    }

    _saveOrders(orders) {
        localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    }

    getOrders() {
        return JSON.parse(localStorage.getItem(this.ordersKey)) || [];
    }

    deleteOrder(orderId) {
        let orders = this.getOrders();
        orders = orders.filter(o => o.id !== orderId);
        this._saveOrders(orders);
    }
}

const orderManager = new OrderManager();
