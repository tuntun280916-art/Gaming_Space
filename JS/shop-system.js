/* ============================================
   CARRITO DE COMPRAS
   ============================================ */

class ShoppingCart {
    constructor(storageKey = 'cart', taxRate = 0.1) {
        this.storageKey = storageKey;
        this.taxRate = taxRate;
        this.items = [];
        this.load();
    }

    load() {
        try {
            this.items = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch {
            this.items = [];
        }
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        this.notify();
    }

    add(product, quantity = 1) {
        if (!product || quantity < 1) return false;
        if (!validateStock(product.id, quantity)) return false;

        const existing = this.items.find(item => item.id === product.id);
        
        if (existing) {
            if (!validateStock(product.id, existing.quantity + quantity)) return false;
            existing.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                quantity: quantity
            });
        }

        this.save();
        return true;
    }

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    updateQuantity(productId, quantity) {
        if (quantity < 1) {
            this.remove(productId);
            return true;
        }

        if (!validateStock(productId, quantity)) return false;

        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.save();
            return true;
        }
        return false;
    }

    getItems() {
        return [...this.items];
    }

    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTax() {
        return this.getSubtotal() * this.taxRate;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
        this.save();
    }

    notify() {
        document.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { count: this.getCount() }
        }));
    }
}

const cart = new ShoppingCart(STORE_CONFIG.localStorageKey, STORE_CONFIG.taxRate);