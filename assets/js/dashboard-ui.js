/**
 * Dashboard UI — navegación y datos del usuario
 */

import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { loadProducts } from './dashboard.js';

const navLinks = document.querySelectorAll('.dash-nav__link');
const sections = document.querySelectorAll('.dash-section');

function closeMobileSidebar() {
    document.querySelector('.dash-sidebar')?.classList.remove('dash-sidebar--open');
    document.getElementById('sidebar-overlay')?.classList.remove('active');
}

document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.dash-sidebar')?.classList.toggle('dash-sidebar--open');
    document.getElementById('sidebar-overlay')?.classList.toggle('active');
});

document.getElementById('sidebar-overlay')?.addEventListener('click', closeMobileSidebar);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('dash-nav__link--active'));
        link.classList.add('dash-nav__link--active');

        sections.forEach(s => s.classList.add('hidden'));
        const section = document.getElementById(link.dataset.section + '-section');
        section?.classList.remove('hidden');

        if (link.dataset.section === 'products') {
            loadProducts();
        }

        if (window.innerWidth <= 768) closeMobileSidebar();
    });
});

onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const initial = user.email ? user.email.charAt(0).toUpperCase() : 'A';
    const avatar = document.getElementById('user-avatar');
    const email = document.getElementById('user-email');
    if (avatar) avatar.textContent = initial;
    if (email) email.textContent = user.email || '';

    loadProducts();
});
