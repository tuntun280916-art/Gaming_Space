/* ============================================
   CONFIGURACIÓN DE PRODUCTOS
   ============================================ */

const PRODUCTS = [
    {
        id: 1,
        name: 'GPU NVIDIA RTX 4070',
        category: 'componentes',
        price: 899.99,
        emoji: '🎮',
        description: 'Tarjeta gráfica de última generación',
        stock: 15
    },
    {
        id: 2,
        name: 'CPU Intel Core i9-13900K',
        category: 'componentes',
        price: 699.99,
        emoji: '⚙️',
        description: 'Procesador de alto rendimiento',
        stock: 8
    },
    {
        id: 3,
        name: 'RAM Corsair 32GB DDR5',
        category: 'componentes',
        price: 189.99,
        emoji: '💾',
        description: 'Memoria RAM ultra rápida',
        stock: 25
    },
    {
        id: 4,
        name: 'SSD Samsung 980 Pro 2TB',
        category: 'componentes',
        price: 249.99,
        emoji: '💿',
        description: 'Almacenamiento ultra rápido',
        stock: 20
    },
    {
        id: 5,
        name: 'Fuente ASUS ROG 1000W',
        category: 'componentes',
        price: 299.99,
        emoji: '⚡',
        description: 'Fuente de poder certificada',
        stock: 12
    },
    {
        id: 6,
        name: 'Teclado Mecánico Razer',
        category: 'perifericos',
        price: 179.99,
        emoji: '⌨️',
        description: 'Teclado mecánico RGB',
        stock: 18
    },
    {
        id: 7,
        name: 'Mouse Gaming Logitech G502',
        category: 'perifericos',
        price: 79.99,
        emoji: '🖱️',
        description: 'Mouse de alto rendimiento',
        stock: 30
    },
    {
        id: 8,
        name: 'Audífonos HyperX Cloud',
        category: 'perifericos',
        price: 329.99,
        emoji: '🎧',
        description: 'Audífonos gaming profesional',
        stock: 10
    },
    {
        id: 9,
        name: 'Monitor ASUS ProArt 4K',
        category: 'perifericos',
        price: 799.99,
        emoji: '🖥️',
        description: 'Monitor 4K profesional',
        stock: 5
    },
    {
        id: 10,
        name: 'Cyberpunk 2077',
        category: 'videojuegos',
        price: 59.99,
        emoji: '👾',
        description: 'RPG futurista acción',
        stock: 100
    },
    {
        id: 11,
        name: 'Elden Ring',
        category: 'videojuegos',
        price: 59.99,
        emoji: '⚔️',
        description: 'RPG aventura épico',
        stock: 85
    },
    {
        id: 12,
        name: 'Star Wars Outlaws',
        category: 'videojuegos',
        price: 69.99,
        emoji: '🚀',
        description: 'Aventura de acción',
        stock: 50
    }
];

const STORE_CONFIG = {
    taxRate: 0.10,
    currency: '$',
    localStorageKey: 'gamingspace_cart'
};

function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
    if (!category) return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
    return PRODUCTS.slice(0, 3);
}

function validateStock(productId, quantity) {
    const product = getProductById(productId);
    return product && product.stock >= quantity;
}