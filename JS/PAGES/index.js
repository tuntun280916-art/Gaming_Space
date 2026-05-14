/* ============================================
   PÁGINA INICIO
   ============================================ */

function displayFeaturedProducts() {
    const container = document.getElementById('featured');
    if (!container) return;

    getFeaturedProducts().forEach(product => {
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
        }
    });

    return card;
}

document.addEventListener('siteReady', displayFeaturedProducts);