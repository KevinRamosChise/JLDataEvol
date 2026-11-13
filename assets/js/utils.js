/**
 * JL DATA PRO — Módulo de Utilidades Centralizadas y Constantes (Refactorización DRY)
 * Centraliza configuraciones, formateadores y valores por defecto para evitar duplicidad de código.
 */

export const APP_CONFIG = Object.freeze({
    WHATSAPP_NUMBER: '51976330703',
    DEFAULT_CURRENCY: 'PEN',
    LOCALE: 'es-PE'
});

export const CATEGORIES_CONFIG = Object.freeze({
    laptops: {
        label: 'Laptops',
        icon: 'laptop',
        defaultImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80'
    },
    computadoras: {
        label: 'Computadoras',
        icon: 'desktop',
        defaultImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9ae?w=600&q=80'
    },
    accesorios: {
        label: 'Accesorios',
        icon: 'mouse',
        defaultImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'
    },
    servicio: {
        label: 'Servicio Técnico',
        icon: 'service',
        defaultImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd378a?w=600&q=80'
    }
});

/**
 * Formatea un valor numérico a moneda peruana (S/ XX.XX)
 * @param {number|string} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    const numeric = Number(amount) || 0;
    return `S/ ${numeric.toLocaleString(APP_CONFIG.LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Parsea y sanea una entrada a número decimal válido no negativo
 * @param {any} val
 * @returns {number}
 */
export function parseMoney(val) {
    const n = Number.parseFloat(val);
    return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : 0;
}

/**
 * Obtiene la imagen por defecto para una categoría
 * @param {string} category
 * @returns {string}
 */
export function getDefaultImage(category) {
    return CATEGORIES_CONFIG[category]?.defaultImage || 'assets/images/logo.png?v=2';
}

/**
 * Sanea texto para evitar inyecciones HTML en el renderizado
 * @param {string} text
 * @returns {string}
 */
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text ?? '';
    return div.innerHTML;
}
