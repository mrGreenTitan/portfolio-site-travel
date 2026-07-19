const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const pageBlocks = document.querySelectorAll('header[id], main section[id]');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const year = document.querySelector('#year');

function closeMenu() {
    navLinks.classList.remove('mobile-menu');
    menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    navbar.classList.remove('menu-visible');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle('mobile-menu');
    menuButton.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    navbar.classList.toggle('menu-visible', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
}

function updateNavbarState() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}

function setActiveLink(id) {
    navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
}

menuButton.addEventListener('click', toggleMenu);
window.addEventListener('scroll', updateNavbarState);
updateNavbarState();

navItems.forEach((link) => {
    link.addEventListener('click', () => {
        setActiveLink(link.getAttribute('href').slice(1));
        closeMenu();
    });
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
        }
    });
}, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
});

pageBlocks.forEach((block) => sectionObserver.observe(block));

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = 'Дякуємо! Заявку підготовлено, менеджер зв\'яжеться з вами найближчим часом.';
    contactForm.reset();
});

if (year) {
    year.textContent = new Date().getFullYear();
}
