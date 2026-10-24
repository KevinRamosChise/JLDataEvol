const STATIC_PRODUCTS = [
    {
        id: 'laptop-hp-15',
        name: 'Laptop HP 15" Core i5',
        description: 'Intel Core i5 12va Gen, 8GB RAM, 512GB SSD, pantalla Full HD 15.6". Ideal para trabajo y estudio.',
        category: 'laptops',
        categoryLabel: 'Laptop',
        price: 1899,
        badge: 'Popular',
        icon: 'laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80'
    },
    {
        id: 'laptop-lenovo-ideapad',
        name: 'Lenovo IdeaPad 3',
        description: 'AMD Ryzen 5, 16GB RAM, 256GB SSD. Rendimiento excelente para multitarea y productividad.',
        category: 'laptops',
        categoryLabel: 'Laptop',
        price: 1699,
        icon: 'laptop',
        image: 'https://images.unsplash.com/photo-1525547719575-a162d0504aab?w=600&q=80'
    },
    {
        id: 'laptop-asus-vivo',
        name: 'ASUS VivoBook 14',
        description: 'Intel Core i3, 8GB RAM, 256GB SSD. Compacta y ligera, perfecta para llevar a todas partes.',
        category: 'laptops',
        categoryLabel: 'Laptop',
        price: 1299,
        badge: 'Oferta',
        icon: 'laptop',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80'
    },
    {
        id: 'laptop-gaming',
        name: 'Laptop Gaming RTX 4050',
        description: 'Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA RTX 4050 6GB. Para gaming y diseño profesional.',
        category: 'laptops',
        categoryLabel: 'Laptop',
        price: 3499,
        icon: 'laptop',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80'
    },
    {
        id: 'pc-gamer',
        name: 'PC Gamer Armada',
        description: 'Ryzen 5 5600, 16GB RAM, 512GB SSD, GTX 1660 Super. Lista para jugar en 1080p.',
        category: 'computadoras',
        categoryLabel: 'Computadora',
        price: 2799,
        badge: 'Nuevo',
        icon: 'desktop',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9ae?w=600&q=80'
    },
    {
        id: 'pc-oficina',
        name: 'PC de Escritorio Oficina',
        description: 'Intel Core i3, 8GB RAM, 256GB SSD, monitor 22". Kit completo para oficina o negocio.',
        category: 'computadoras',
        categoryLabel: 'Computadora',
        price: 1499,
        icon: 'desktop',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&q=80'
    },
    {
        id: 'pc-workstation',
        name: 'Workstation Profesional',
        description: 'Intel Core i7, 32GB RAM, 1TB SSD, tarjeta gráfica dedicada. Para diseño, edición y CAD.',
        category: 'computadoras',
        categoryLabel: 'Computadora',
        price: 4299,
        icon: 'desktop',
        image: 'https://images.unsplash.com/photo-1547082292-de-86eb95255de?w=600&q=80'
    },
    {
        id: 'monitor-24',
        name: 'Monitor 24" Full HD',
        description: 'Pantalla IPS 1920x1080, 75Hz, bordes delgados. Colores precisos para trabajo y entretenimiento.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 399,
        icon: 'monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'
    },
    {
        id: 'teclado-mecanico',
        name: 'Teclado Mecánico RGB',
        description: 'Switches red, retroiluminación RGB, diseño compacto TKL. Ideal para gaming y programación.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 189,
        icon: 'keyboard',
        image: 'https://images.unsplash.com/photo-1618384883390-aea2589f0a38?w=600&q=80'
    },
    {
        id: 'mouse-logitech',
        name: 'Mouse Logitech MX Master',
        description: 'Ergonómico, sensor de alta precisión, conexión inalámbrica y Bluetooth. Productividad premium.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 279,
        badge: 'Top',
        icon: 'mouse',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80'
    },
    {
        id: 'audifonos-gamer',
        name: 'Audífonos Gamer 7.1',
        description: 'Sonido surround 7.1, micrófono retráctil, almohadillas memory foam. Comodidad para largas sesiones.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 149,
        icon: 'headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
    },
    {
        id: 'webcam-hd',
        name: 'Webcam Full HD 1080p',
        description: 'Cámara web 1080p 30fps, micrófono integrado, enfoque automático. Perfecta para videollamadas.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 99,
        icon: 'webcam',
        image: 'https://images.unsplash.com/photo-1614624532985-2aa6da1d4d45?w=600&q=80'
    },
    {
        id: 'ssd-500gb',
        name: 'Disco SSD 500GB',
        description: 'SSD SATA III 500GB, velocidad de lectura 550MB/s. Mejora instantánea del rendimiento de tu PC.',
        category: 'accesorios',
        categoryLabel: 'Accesorio',
        price: 159,
        icon: 'storage',
        image: 'https://images.unsplash.com/photo-1597872200919-50f78603ea9a?w=600&q=80'
    },
    {
        id: 'servicio-pantalla',
        name: 'Cambio de Pantalla Laptop',
        description: 'Reemplazo de display LCD/LED. Incluye diagnóstico, mano de obra y garantía de 3 meses.',
        category: 'servicio',
        categoryLabel: 'Servicio Técnico',
        price: 250,
        priceNote: 'desde',
        badge: 'Servicio',
        icon: 'service',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    },
    {
        id: 'servicio-bateria',
        name: 'Cambio de Batería Laptop',
        description: 'Batería nueva compatible premium. Recupera la autonomía original de tu equipo portátil.',
        category: 'servicio',
        categoryLabel: 'Servicio Técnico',
        price: 120,
        priceNote: 'desde',
        badge: 'Servicio',
        icon: 'service',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08c78895?w=600&q=80'
    },
    {
        id: 'servicio-ssd',
        name: 'Upgrade SSD + Clonación',
        description: 'Instalación de SSD nuevo con clonación de datos. Tu laptop hasta 10x más rápida.',
        category: 'servicio',
        categoryLabel: 'Servicio Técnico',
        price: 80,
        priceNote: 'desde',
        badge: 'Servicio',
        icon: 'service',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80'
    },
    {
        id: 'servicio-mantenimiento',
        name: 'Mantenimiento Preventivo',
        description: 'Limpieza interna, cambio de pasta térmica, optimización de sistema operativo y antivirus.',
        category: 'servicio',
        categoryLabel: 'Servicio Técnico',
        price: 60,
        priceNote: 'desde',
        badge: 'Servicio',
        icon: 'service',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd378a?w=600&q=80'
    },
    {
        id: 'servicio-placa',
        name: 'Reparación de Placa Madre',
        description: 'Microsoldadura y reparación de componentes a nivel de placa. Diagnóstico gratuito.',
        category: 'servicio',
        categoryLabel: 'Servicio Técnico',
        price: 150,
        priceNote: 'desde',
        badge: 'Servicio',
        icon: 'service',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'
    }
];

const PRODUCT_ICONS = {
    laptop: '<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="48" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M4 52h56" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    desktop: '<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="8" width="40" height="28" rx="3" stroke="currentColor" stroke-width="2"/><path d="M24 40h16v8H24z" stroke="currentColor" stroke-width="2"/><path d="M20 52h24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    monitor: '<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="12" width="48" height="32" rx="2" stroke="currentColor" stroke-width="2"/><path d="M32 44v8M24 52h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    keyboard: '<svg viewBox="0 0 64 64" fill="none"><rect x="6" y="24" width="52" height="20" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 32h4M22 32h4M30 32h4M38 32h4M46 32h4M18 38h28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    mouse: '<svg viewBox="0 0 64 64" fill="none"><rect x="22" y="8" width="20" height="36" rx="10" stroke="currentColor" stroke-width="2"/><path d="M32 16v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    headphones: '<svg viewBox="0 0 64 64" fill="none"><path d="M16 32v12a8 8 0 008 8h0a8 8 0 008-8V28a16 16 0 00-32 0v4z" stroke="currentColor" stroke-width="2"/><path d="M48 32v12a8 8 0 008 8h0a8 8 0 008-8V28" stroke="currentColor" stroke-width="2"/></svg>',
    webcam: '<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="16" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="32" r="6" stroke="currentColor" stroke-width="2"/><path d="M48 28l12-6v20l-12-6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    storage: '<svg viewBox="0 0 64 64" fill="none"><rect x="12" y="16" width="40" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M20 28h24M20 36h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    service: '<svg viewBox="0 0 64 64" fill="none"><path d="M32 8l6 12h14l-11 9 4 13-13-8-13 8 4-13-11-9h14l6-12z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="48" r="6" stroke="currentColor" stroke-width="2"/></svg>'
};

const CATEGORY_LABELS = {
    laptops: 'Laptop',
    computadoras: 'Computadora',
    accesorios: 'Accesorio',
    servicio: 'Servicio Técnico'
};

const CATEGORY_ICONS = {
    laptops: 'laptop',
    computadoras: 'desktop',
    accesorios: 'mouse',
    servicio: 'service'
};

const DEFAULT_IMAGES = {
    laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    computadoras: 'https://images.unsplash.com/photo-1587202372775-e229f172b9ae?w=600&q=80',
    accesorios: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    servicio: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd378a?w=600&q=80'
};

let catalog = [...STATIC_PRODUCTS];

const WHATSAPP_NUMBER = '51976330703';

function setProducts(products) {
    if (Array.isArray(products) && products.length > 0) {
        catalog = products;
    }
}

function getProducts() {
    return catalog;
}

function formatPrice(price) {
    return `S/ ${price.toLocaleString('es-PE')}`;
}

function getWhatsAppLink(product) {
    const message = encodeURIComponent(`Hola, me interesa: ${product.name} (${formatPrice(product.price)})`);
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${message}`;
}

function renderProductCard(product) {
    const icon = PRODUCT_ICONS[product.icon] || PRODUCT_ICONS.laptop;
    const badgeClass = product.category === 'servicio' ? 'product-card__badge--service' : '';
    const badge = product.badge ? `<span class="product-card__badge ${badgeClass}">${product.badge}</span>` : '';
    const priceNote = product.priceNote ? `<span class="product-card__price-note">${product.priceNote} </span>` : '';
    const displayPrice = product.salePrice && product.salePrice < product.price
        ? product.salePrice
        : product.price;

    const photoUrl = product.image || DEFAULT_IMAGES[product.category] || '';
    const imageContent = photoUrl
        ? `<img src="${photoUrl}" alt="" class="product-card__img" loading="lazy" onerror="this.remove()">${icon}`
        : icon;

    return `
        <article class="product-card fade-in" data-category="${product.category}" data-id="${product.id}">
            <div class="product-card__image${photoUrl ? ' product-card__image--photo' : ''}">
                ${badge}
                ${imageContent}
            </div>
            <div class="product-card__body">
                <span class="product-card__category">${product.categoryLabel || CATEGORY_LABELS[product.category] || ''}</span>
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__desc">${product.description || ''}</p>
                <div class="product-card__footer">
                    <div class="product-card__price">${priceNote}${formatPrice(displayPrice)}</div>
                    <a href="${getWhatsAppLink({ ...product, price: displayPrice })}" class="product-card__btn" target="_blank" rel="noopener noreferrer">Cotizar</a>
                </div>
            </div>
        </article>
    `;
}

function renderProducts(products, container) {
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '';
        const empty = document.getElementById('products-empty');
        if (empty) empty.hidden = false;
        return;
    }

    const empty = document.getElementById('products-empty');
    if (empty) empty.hidden = true;

    container.innerHTML = products.map(renderProductCard).join('');

    requestAnimationFrame(() => {
        container.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 60);
        });
    });
}

function filterProducts(category) {
    if (category === 'all') return catalog;
    return catalog.filter(p => p.category === category);
}

function searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return catalog;
    return catalog.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
        (CATEGORY_LABELS[p.category] && CATEGORY_LABELS[p.category].toLowerCase().includes(q))
    );
}

window.JLProducts = {
    STATIC_PRODUCTS,
    CATEGORY_LABELS,
    CATEGORY_ICONS,
    setProducts,
    getProducts,
    renderProducts,
    filterProducts,
    searchProducts,
    formatPrice,
    getWhatsAppLink
};
