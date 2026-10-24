(function () {
    'use strict';

    const grid = document.getElementById('products-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryCards = document.querySelectorAll('.category-card[data-filter]');
    const contactForm = document.getElementById('contact-form');

    let currentCategory = 'all';

    function renderCurrentProducts() {
        if (!grid || !window.JLProducts) return;
        const products = window.JLProducts.filterProducts(currentCategory);
        window.JLProducts.renderProducts(products, grid);
    }

    function initFilters() {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategory = btn.dataset.category;

                filterBtns.forEach(b => {
                    const isActive = b === btn;
                    b.classList.toggle('filter-btn--active', isActive);
                    b.setAttribute('aria-selected', isActive);
                });

                const searchInput = document.getElementById('search-input');
                if (searchInput) searchInput.value = '';

                renderCurrentProducts();
            });
        });

        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const filter = card.dataset.filter;
                if (!filter) return;

                e.preventDefault();
                currentCategory = filter;

                filterBtns.forEach(b => {
                    const isActive = b.dataset.category === filter;
                    b.classList.toggle('filter-btn--active', isActive);
                    b.setAttribute('aria-selected', isActive);
                });

                renderCurrentProducts();
                document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            const text = encodeURIComponent(
                `Hola, soy ${name}.\nTeléfono: ${phone}\n\n${message}`
            );

            window.open(
                `https://api.whatsapp.com/send/?phone=51976330703&text=${text}`,
                '_blank',
                'noopener,noreferrer'
            );

            contactForm.reset();
        });
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.feature, .service-card, .category-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    function boot() {
        renderCurrentProducts();
        initFilters();
        initContactForm();
        initScrollAnimations();
    }

    window.addEventListener('products-ready', renderCurrentProducts);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
