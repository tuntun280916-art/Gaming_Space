/* ============================================
   PÁGINA PRODUCTOS
   ============================================ */

function displayProducts(category = '') {
    const container = document.getElementById('products-container');
    const noMsg = document.getElementById('no-products-message');

    if (!container) return;

    const products = category ? getProductsByCategory(category) : PRODUCTS;

    if (products.length === 0) {
        container.classList.add('hidden');
        noMsg.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    noMsg.classList.add('hidden');
    container.innerHTML = '';

    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const stockClass = product.stock > 0 ? 'stock-available' : 'stock-out';
    const stockText = product.stock > 0 ? `${product.stock} en stock` : 'Agotado';

    card.innerHTML = `
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">$${product.price}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-stock"><span class="${stockClass}">${stockText}</span></div>
            <div class="product-actions">
                <button class="btn btn-primary btn-add" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                    Agregar
                </button>
            </div>
        </div>
    `;

    card.querySelector('.btn-add').addEventListener('click', () => {
        const prod = getProductById(product.id);
        if (cart.add(prod, 1)) {
            showNotification(`${prod.name} agregado al carrito`, 'success');
        } else {
            showNotification('Stock insuficiente', 'error');
        }
    });

    return card;
}

document.addEventListener('siteReady', () => {
    displayProducts();

    const filter = document.getElementById('category-filter');
    if (filter) {
        filter.addEventListener('change', (e) => displayProducts(e.target.value));
    }
});