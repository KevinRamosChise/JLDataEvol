(function () {
    'use strict';

    const track = document.getElementById('hero-carousel-track');
    const dotsContainer = document.getElementById('hero-carousel-dots');
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.hero__slide'));
    if (slides.length <= 1) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 3000;

    slides.forEach((_, i) => {
        if (!dotsContainer) return;
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero__carousel-dot' + (i === 0 ? ' hero__carousel-dot--active' : '');
        dot.setAttribute('aria-label', `Imagen ${i + 1}`);
        dot.addEventListener('click', () => goTo(i, true));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.hero__carousel-dot')) : [];

    function goTo(index, userAction) {
        slides[current].classList.remove('hero__slide--active');
        if (dots[current]) dots[current].classList.remove('hero__carousel-dot--active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('hero__slide--active');
        if (dots[current]) dots[current].classList.add('hero__carousel-dot--active');

        if (userAction) restartTimer();
    }

    function next() {
        goTo(current + 1, false);
    }

    function startTimer() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = setInterval(next, INTERVAL);
    }

    function restartTimer() {
        clearInterval(timer);
        startTimer();
    }

    startTimer();

    const heroSection = document.querySelector('.hero');
    heroSection?.addEventListener('mouseenter', () => clearInterval(timer));
    heroSection?.addEventListener('mouseleave', () => {
        clearInterval(timer);
        startTimer();
    });
})();
