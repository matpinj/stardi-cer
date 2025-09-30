// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle menu (open/close)
    menuToggle.addEventListener('click', function() {
        if (menuToggle.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        menuToggle.classList.add('active');
        navOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', function(e) {
        if (e.target === navOverlay) {
            closeMenu();
        }
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    function closeMenu() {
        menuToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Logo click to return home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Close menu if it's open
            if (navOverlay.classList.contains('active')) {
                closeMenu();
            }
        });
        // Add cursor pointer style to logo
        logo.style.cursor = 'pointer';
    }

    // Language Toggle Functionality
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';

    // Set initial language
    setLanguage(currentLang);

    // Add click event listeners to language buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    });

    function setLanguage(lang) {
        currentLang = lang;
        
        // Update button states
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-hr]');
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Check if this is a navigation link with animation structure
                if (element.classList.contains('nav-text-inner') || element.classList.contains('nav-text-clone')) {
                    element.textContent = translation;
                } else if (element.classList.contains('cta-text-inner') || element.classList.contains('cta-text-clone')) {
                    element.textContent = translation;
                } else if (element.classList.contains('nav-link')) {
                    // Update both inner and clone text for nav links
                    const innerText = element.querySelector('.nav-text-inner');
                    const cloneText = element.querySelector('.nav-text-clone');
                    if (innerText) innerText.textContent = translation;
                    if (cloneText) cloneText.textContent = translation;
                } else if (element.classList.contains('cta-button')) {
                    // Update both inner and clone text for CTA buttons
                    const innerText = element.querySelector('.cta-text-inner');
                    const cloneText = element.querySelector('.cta-text-clone');
                    if (innerText) innerText.textContent = translation;
                    if (cloneText) cloneText.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update page language attribute
        document.documentElement.lang = lang === 'hr' ? 'hr' : 'en';
    }

    // Get all navigation links for smooth scrolling
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listeners for smooth scrolling
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update local time
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    
    // Initialize scroll-based animations
    initScrollAnimations();
    
    // Add scroll event listener for header behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        const currentScrollY = window.scrollY;
        
        // At the top (home section) - transparent header
        if (currentScrollY <= 100) {
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
            // Keep white text/symbols for home
            header.querySelector('.logo h1').style.color = '#f8f8f8';
            header.querySelectorAll('.menu-line').forEach(line => {
                line.style.backgroundColor = '#f8f8f8';
            });
        }
        // Scrolling down - hide header
        else if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        }
        // Scrolling up - show header with white background and black text
        else {
            header.style.transform = 'translateY(0)';
            header.style.backgroundColor = 'rgba(248, 248, 248, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            // Change to black text/symbols when header has background
            header.querySelector('.logo h1').style.color = '#2c2c2c';
            header.querySelectorAll('.menu-line').forEach(line => {
                line.style.backgroundColor = '#2c2c2c';
            });
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add active navigation highlighting
    highlightActiveNavigation();
});

// Update local time function
function updateLocalTime() {
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        const now = new Date();
        const formattedTime = now.getFullYear() + '-' + 
            String(now.getMonth() + 1).padStart(2, '0') + '-' + 
            String(now.getDate()).padStart(2, '0') + ' ' + 
            String(now.getHours()).padStart(2, '0') + ':' + 
            String(now.getMinutes()).padStart(2, '0') + ':' + 
            String(now.getSeconds()).padStart(2, '0');
        
        timeElement.textContent = formattedTime;
    }
}

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation to elements
    const animatedElements = document.querySelectorAll('.philosophy-content, .way-content, .category, .dialogue-content, .waiting-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Highlight active navigation
function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once to set initial state
}

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active,
    .footer-link.active {
        color: #666;
    }
    
    .nav-link.active::after,
    .footer-link.active::after {
        width: 100%;
    }
    
    /* Hover effects for images */
    .category-image img {
        transition: transform 0.3s ease, filter 0.3s ease;
    }
    
    .category-image:hover img {
        transform: scale(1.02);
        filter: brightness(1.1);
    }
    
    /* Loading animation */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    /* Scroll indicator animation */
    .scroll-indicator {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
    }
`;
document.head.appendChild(style);

// Add loading states
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
});

// Mobile menu functionality (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-open');
}

// Contact form handling (if form is added later)
function handleContactForm(formData) {
    // This would handle form submission
    console.log('Contact form submitted:', formData);
}

// Image lazy loading for better performance
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background-color: #2c2c2c;
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(function() {
    highlightActiveNavigation();
}, 10);

window.removeEventListener('scroll', highlightActiveNavigation);
window.addEventListener('scroll', debouncedScrollHandler);