class ProductManager {
    constructor() {
        this.productsKey = 'foodzy_products';
        // The init method is no longer needed as data is seeded from index.html
    }

    _saveProducts(products) {
        localStorage.setItem(this.productsKey, JSON.stringify(products));
    }

    getProducts() {
        return JSON.parse(localStorage.getItem(this.productsKey)) || [];
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id === id);
    }

    addProduct(productData) {
        const products = this.getProducts();
        const newProduct = {
            id: Date.now(),
            ...productData
        };
        products.push(newProduct);
        this._saveProducts(products);
        return newProduct;
    }

    updateProduct(productId, updatedData) {
        let products = this.getProducts();
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            products[productIndex] = { ...products[productIndex], ...updatedData };
            this._saveProducts(products);
            return products[productIndex];
        }
        return null;
    }

    deleteProduct(productId) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== productId);
        this._saveProducts(products);
    }
}

const productManager = new ProductManager();
