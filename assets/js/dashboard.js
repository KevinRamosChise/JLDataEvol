/**
 * Dashboard — CRUD de productos en Firestore
 */

import { db } from './firebase-config.js';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    writeBatch
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { CATEGORIES_CONFIG, getDefaultImage, parseMoney as toMoney, escapeHtml } from './utils.js';

const productsGrid = document.getElementById('products-grid');
const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = productForm?.querySelector('button[type="submit"]');

let editingProductId = null;

const CATEGORIES = Object.entries(CATEGORIES_CONFIG).map(([value, conf]) => ({
    value,
    label: conf.label
}));

function openAddProductModal() {
    editingProductId = null;
    modalTitle.textContent = 'Añadir producto';
    productForm.reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-stock').value = '0';
    document.getElementById('product-sale-price').value = '';
    productModal.classList.add('show');
    document.getElementById('product-name')?.focus();
}

addProductBtn?.addEventListener('click', openAddProductModal);
modalClose?.addEventListener('click', closeModal);
cancelBtn?.addEventListener('click', closeModal);

productModal?.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal?.classList.contains('show')) closeModal();
});

function closeModal() {
    productModal?.classList.remove('show');
    productForm?.reset();
    editingProductId = null;
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Guardar';
    }
}

async function syncMissingImages() {
    const catalog = window.JLProducts?.STATIC_PRODUCTS;
    if (!Array.isArray(catalog) || catalog.length === 0) return;

    const imagesByName = new Map(catalog.map(p => [p.name, p.image]));
    const snapshot = await getDocs(collection(db, 'products'));
    const batch = writeBatch(db);
    let pending = 0;

    snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const image = imagesByName.get(data.name);
        if (image && !data.image) {
            batch.update(docSnap.ref, {
                image,
                updatedAt: new Date().toISOString()
            });
            pending++;
        }
    });

    if (pending > 0) await batch.commit();
}

productForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const basePrice = toMoney(document.getElementById('product-price').value);
    let salePrice = toMoney(document.getElementById('product-sale-price').value);
    if (!salePrice || salePrice >= basePrice) salePrice = null;

    const category = document.getElementById('product-category').value;
    let image = document.getElementById('product-image').value.trim();
    if (!image) image = getDefaultImage(category);

    const productData = {
        name: document.getElementById('product-name').value.trim(),
        price: basePrice,
        salePrice,
        stock: Math.max(0, parseInt(document.getElementById('product-stock').value, 10) || 0),
        image,
        description: document.getElementById('product-description').value.trim(),
        category,
        badge: document.getElementById('product-badge').value.trim(),
        updatedAt: new Date().toISOString()
    };

    if (!productData.name || !productData.category) return;

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Guardando...';
    }

    try {
        if (editingProductId) {
            await updateDoc(doc(db, 'products', editingProductId), productData);
        } else {
            productData.createdAt = new Date().toISOString();
            await addDoc(collection(db, 'products'), productData);
        }
        closeModal();
        await loadProducts();
    } catch (error) {
        console.error(error);
        alert('Error al guardar: ' + error.message);
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Guardar';
        }
    }
});

export async function loadProducts() {
    if (!productsGrid) return;

    try {
        productsGrid.innerHTML = '<p class="dash-empty">Cargando productos...</p>';

        await syncMissingImages();

        let snapshot;
        try {
            snapshot = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
        } catch {
            snapshot = await getDocs(collection(db, 'products'));
        }

        productsGrid.innerHTML = '';

        if (snapshot.empty) {
            productsGrid.innerHTML = '<p class="dash-empty">No hay productos. Añade el primero con el botón de arriba.</p>';
            updateStats(0, []);
            return;
        }

        const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        products.forEach(p => renderAdminProduct(p));
        updateStats(products.length, products);
    } catch (error) {
        console.error(error);
        productsGrid.innerHTML = '<p class="dash-empty dash-empty--error">Error al cargar productos. Verifica Firebase.</p>';
    }
}

function updateStats(total, products) {
    const totalEl = document.getElementById('total-products');
    const stockEl = document.getElementById('total-stock');
    if (totalEl) totalEl.textContent = total;

    const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
    if (stockEl) stockEl.textContent = totalStock;

    const valueEl = document.getElementById('inventory-value');
    if (valueEl) {
        const value = products.reduce((sum, p) => {
            const price = p.salePrice && p.salePrice < p.price ? p.salePrice : (p.price || 0);
            return sum + price * (Number(p.stock) || 0);
        }, 0);
        valueEl.textContent = `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
    }
}


function renderAdminProduct(product) {
    const card = document.createElement('article');
    card.className = 'dash-product-card';
    const catLabel = CATEGORIES.find(c => c.value === product.category)?.label || product.category;
    const price = product.salePrice && product.salePrice < product.price
        ? `<span class="dash-price-sale">S/ ${product.salePrice.toFixed(2)}</span> <s>S/ ${product.price.toFixed(2)}</s>`
        : `S/ ${(product.price || 0).toFixed(2)}`;
    const img = product.image || getDefaultImage(product.category);

    card.innerHTML = `
        <img src="${escapeHtml(img)}" alt="" class="dash-product-card__img"
             onerror="this.src='assets/images/logo.png?v=2'">
        <div class="dash-product-card__body">
            <span class="dash-product-card__cat">${escapeHtml(catLabel)}</span>
            <h3 class="dash-product-card__name">${escapeHtml(product.name)}</h3>
            <p class="dash-product-card__price">${price}</p>
            <p class="dash-product-card__stock">Stock: ${product.stock ?? 0}</p>
            <div class="dash-product-card__actions">
                <button type="button" class="dash-btn dash-btn--edit" data-id="${product.id}">Editar</button>
                <button type="button" class="dash-btn dash-btn--delete" data-id="${product.id}">Eliminar</button>
            </div>
        </div>
    `;

    card.querySelector('.dash-btn--edit').addEventListener('click', () => editProduct(product.id));
    card.querySelector('.dash-btn--delete').addEventListener('click', () => deleteProduct(product.id));
    productsGrid.appendChild(card);
}

async function editProduct(id) {
    try {
        const snap = await getDoc(doc(db, 'products', id));
        if (!snap.exists()) return;

        const p = snap.data();
        editingProductId = id;
        modalTitle.textContent = 'Editar producto';
        document.getElementById('product-id').value = id;
        document.getElementById('product-name').value = p.name || '';
        document.getElementById('product-price').value = p.price ?? '';
        document.getElementById('product-sale-price').value = p.salePrice ?? '';
        document.getElementById('product-stock').value = p.stock ?? 0;
        document.getElementById('product-image').value = p.image || '';
        document.getElementById('product-description').value = p.description || '';
        document.getElementById('product-category').value = p.category || 'laptops';
        document.getElementById('product-badge').value = p.badge || '';
        productModal.classList.add('show');
    } catch (error) {
        alert('No se pudo cargar el producto.');
    }
}

async function deleteProduct(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
        await deleteDoc(doc(db, 'products', id));
        await loadProducts();
    } catch (error) {
        alert('Error al eliminar.');
    }
}
