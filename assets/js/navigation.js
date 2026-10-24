(function () {
    'use strict';

    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTopBtn = document.getElementById('scroll-top');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchToggle = document.getElementById('search-toggle');

    let searchOverlay = null;
    let menuOpen = false;

    function isMobileNav() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function setMobileMenuOpen(open) {
        if (!navMenu || !navToggle || !isMobileNav()) return;

        menuOpen = open;

        navMenu.classList.toggle('nav__menu--open', open);
        navMenu.setAttribute('aria-hidden', String(!open));
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        document.body.classList.toggle('menu-open', open);

        if (navOverlay) {
            navOverlay.classList.toggle('nav__overlay--visible', open);
            navOverlay.hidden = !open;
            navOverlay.setAttribute('aria-hidden', String(!open));
        }
    }

    function closeMobileMenu() {
        if (menuOpen) setMobileMenuOpen(false);
    }

    function toggleMobileMenu() {
        if (!isMobileNav()) return;
        setMobileMenuOpen(!menuOpen);
    }

    function initMobileMenu() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        navClose?.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
        });

        navOverlay?.addEventListener('click', closeMobileMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.querySelector('.nav__menu-cta')?.addEventListener('click', closeMobileMenu);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
                searchOverlay?.classList.remove('search-overlay--active');
            }
        });

        window.addEventListener('resize', () => {
            if (!isMobileNav()) closeMobileMenu();
        });
    }

    function initScrollEffects() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    if (header) {
                        header.classList.toggle('header--scrolled', scrollY > 10);
                    }

                    if (scrollTopBtn) {
                        scrollTopBtn.hidden = scrollY < 400;
                    }

                    updateActiveNavLink();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }

    function createSearchOverlay() {
        searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-overlay__box">
                <input type="search" class="search-overlay__input" placeholder="Buscar productos..." autocomplete="off" enterkeyhint="search">
                <button type="button" class="search-overlay__close" aria-label="Cerrar buscador">
                    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(searchOverlay);

        const overlayInput = searchOverlay.querySelector('.search-overlay__input');
        const closeBtn = searchOverlay.querySelector('.search-overlay__close');

        searchToggle?.addEventListener('click', () => {
            closeMobileMenu();
            searchOverlay.classList.add('search-overlay--active');
            overlayInput.focus();
        });

        closeBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('search-overlay--active');
        });

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('search-overlay--active');
            }
        });

        overlayInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });

        overlayInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchOverlay.classList.remove('search-overlay--active');
            }
        });
    }

    function handleSearch(query) {
        const grid = document.getElementById('products-grid');
        if (!grid || !window.JLProducts) return;

        const results = window.JLProducts.searchProducts(query);
        window.JLProducts.renderProducts(results, grid);

        const productsSection = document.getElementById('productos');
        if (query && productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function initSearch() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
            searchBtn?.addEventListener('click', () => handleSearch(searchInput.value));
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleSearch(searchInput.value);
            });
        }

        if (searchToggle) {
            createSearchOverlay();
        }
    }

    initMobileMenu();
    initScrollEffects();
    initSearch();
})();
