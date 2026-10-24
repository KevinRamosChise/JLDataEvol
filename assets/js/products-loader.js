/**
 * Carga productos desde Firestore.
 * Si Firebase no está configurado o no hay productos, usa el catálogo estático.
 */

import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { CATEGORIES_CONFIG } from './utils.js';

function mapFirestoreProduct(doc) {
    const data = doc.data();
    const category = data.category || 'accesorios';
    return {
        id: doc.id,
        name: data.name || 'Producto',
        description: data.description || '',
        category,
        categoryLabel: CATEGORIES_CONFIG[category]?.label || window.JLProducts?.CATEGORY_LABELS?.[category] || category,
        price: Number(data.price) || 0,
        salePrice: data.salePrice ? Number(data.salePrice) : null,
        priceNote: category === 'servicio' ? 'desde' : '',
        badge: data.badge || (category === 'servicio' ? 'Servicio' : ''),
        icon: CATEGORIES_CONFIG[category]?.icon || window.JLProducts?.CATEGORY_ICONS?.[category] || 'laptop',
        image: data.image || '',
        stock: data.stock ?? 0
    };
}

function notifyReady(source) {
    window.dispatchEvent(new CustomEvent('products-ready', { detail: { source } }));
}

async function loadProductsFromFirestore() {
    if (!window.JLProducts) {
        notifyReady('static');
        return;
    }

    try {
        let snapshot;
        try {
            snapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
        } catch {
            snapshot = await getDocs(collection(db, 'products'));
        }

        if (!snapshot.empty) {
            const products = snapshot.docs.map(mapFirestoreProduct);
            window.JLProducts.setProducts(products);
            notifyReady('firestore');
            return;
        }
    } catch (error) {
        console.warn('Firestore no disponible, usando catálogo estático:', error.message);
    }

    notifyReady('static');
}

loadProductsFromFirestore();
