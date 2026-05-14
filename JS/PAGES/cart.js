/* ============================================
   PÁGINA CARRITO
   ============================================ */

function displayCart() {
    const emptyMsg = document.getElementById('empty-cart-message');
    const container = document.getElementById('cart-container');
    const tbody = document.getElementById('cart-items-body');

    if (cart.isEmpty()) {
        emptyMsg.classList.remove('hidden');
        container.classList.add('hidden');
        return;
    }

    emptyMsg.classList.add('hidden');
    container.classList.remove('hidden');
    tbody.innerHTML = '';

    cart.getItems().forEach(item => {
        const row = document.createElement('tr');
        const subtotal = item.price * item.quantity;

        row.innerHTML = `
            <td>
                <span style="font-size: 1.5rem;">${item.emoji}</span>
                <span>${item.name}</span>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQty(${item.id})">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="updateQty(${item.id}, this.value)" min="1">
                    <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-remove" onclick="removeItem(${item.id})">Eliminar</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    updateSummary();
}

function updateSummary() {
    const subtotal = cart.getSubtotal();
    const tax = cart.getTax();
    const total = cart.getTotal();

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function increaseQty(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item) cart.updateQuantity(productId, item.quantity + 1);
    displayCart();
}

function decreaseQty(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item && item.quantity > 1) cart.updateQuantity(productId, item.quantity - 1);
    else cart.remove(productId);
    displayCart();
}

function updateQty(productId, value) {
    const qty = parseInt(value);
    if (qty < 1) {
        removeItem(productId);
        return;
    }
    if (!cart.updateQuantity(productId, qty)) {
        showNotification('Stock insuficiente', 'error');
    }
    displayCart();
}

function removeItem(productId) {
    cart.remove(productId);
    displayCart();
    showNotification('Producto eliminado', 'success');
}

document.addEventListener('siteReady', () => {
    displayCart();

    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('¿Vaciar carrito?')) {
                cart.clear();
                displayCart();
            }
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (!cart.isEmpty()) {
                const total = cart.getTotal();
                alert(`✓ Compra exitosa!\n\nTotal: $${total.toFixed(2)}`);
                cart.clear();
                displayCart();
            }
        });
    }
});