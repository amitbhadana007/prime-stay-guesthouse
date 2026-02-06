// ================================================
// MOONSTONE LUXURY GUESTHOUSE
// JavaScript Interactions
// ================================================

// ========== MOBILE NAVIGATION ==========

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== NAVBAR SCROLL EFFECT ==========

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== ACTIVE NAVIGATION LINK ==========

const sections = document.querySelectorAll('section[id]');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== FADE IN ELEMENTS ON SCROLL ==========

const fadeElements = document.querySelectorAll(
    '.room-card, .amenity-card, .gallery-item, .stat-item, .contact-card'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ========== IMAGE LOADING OPTIMIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
});

// ========== GALLERY RESPONSIVE BEHAVIOR ==========

function updateGalleryLayout() {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;
    
    const width = window.innerWidth;
    
    if (width < 480) {
        gallery.style.gridTemplateColumns = '1fr';
    } else if (width < 768) {
        gallery.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        gallery.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    }
}

window.addEventListener('resize', updateGalleryLayout);
window.addEventListener('load', updateGalleryLayout);
updateGalleryLayout();

// ========== PAGE LOAD ANIMATION ==========

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});