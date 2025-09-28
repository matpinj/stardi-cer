// Shopping Cart Functionality
let cart = [];
let currentLanguage = 'hr'; // Croatian as default
let currentTheme = 'option1'; // Default theme

// Video Entrance Functionality
function enterSite() {
    const videoEntrance = document.getElementById('video-entrance');
    const mainContent = document.getElementById('main-content');
    const header = document.querySelector('header');
    const themeSwitcher = document.querySelector('.theme-switcher');
    
    // Cancel auto-enter timeout and progress tracking
    cancelAutoEnter();
    
    if (videoEntrance) {
        // Start fade out animation
        videoEntrance.style.transition = 'opacity 1s ease, transform 1s ease';
        videoEntrance.style.opacity = '0';
        videoEntrance.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            // Remove video entrance
            videoEntrance.classList.add('hidden');
            
            // Show main content
            if (mainContent) {
                mainContent.classList.remove('hidden');
                mainContent.style.opacity = '0';
                mainContent.style.transition = 'opacity 1s ease';
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 100);
            }
            
            // Show header
            if (header) {
                header.style.display = 'block';
            }
            
            // Show theme switcher
            if (themeSwitcher) {
                setTimeout(() => {
                    themeSwitcher.classList.add('visible');
                }, 800);
            }
        }, 1000);
    }
}

// Video progress tracking and auto-enter functionality
let autoEnterTimeout;
let progressInterval;
let videoProgressInterval;

function startVideoTracking() {
    const video = document.getElementById('entrance-video');
    const progressFill = document.querySelector('.video-progress-fill');
    const skipBtn = document.querySelector('.skip-intro-btn');
    
    if (!video) return;
    
    // Track video progress
    const updateProgress = () => {
        if (video.duration > 0) {
            const progress = (video.currentTime / video.duration) * 100;
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }
    };
    
    // Update progress every 100ms
    videoProgressInterval = setInterval(updateProgress, 100);
    
    // Auto-enter when video ends
    video.addEventListener('ended', () => {
        console.log('Video ended, entering site...');
        enterSite();
    });
    
    // Handle video events
    video.addEventListener('loadstart', () => {
        console.log('Video loading started...');
    });
    
    video.addEventListener('canplay', () => {
        console.log('Video can start playing...');
    });
    
    video.addEventListener('play', () => {
        console.log('Video started playing...');
    });
    
    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // If video fails, show fallback and set 5-second auto-enter
        startFallbackTimer();
    });
    
    // Add hover effects to skip button
    if (skipBtn) {
        skipBtn.addEventListener('mouseenter', () => {
            if (progressFill) {
                progressFill.style.background = 'linear-gradient(90deg, #6F5340, #263713)';
            }
        });
        
        skipBtn.addEventListener('mouseleave', () => {
            if (progressFill) {
                progressFill.style.background = 'linear-gradient(90deg, #B29D87, #6F5340, #263713)';
            }
        });
    }
}

function startFallbackTimer() {
    console.log('Starting fallback timer (5 seconds)...');
    const debugInfo = document.getElementById('debug-info');
    
    // Show fallback image and set shorter timer
    const fallback = document.querySelector('.video-fallback');
    const video = document.getElementById('entrance-video');
    
    if (debugInfo) {
        debugInfo.textContent = 'Video failed - showing fallback image';
    }
    
    if (fallback && video) {
        video.style.display = 'none';
        fallback.style.display = 'flex';
    }
    
    // 5-second timer for fallback
    autoEnterTimeout = setTimeout(() => {
        console.log('Fallback timer completed, entering site...');
        if (debugInfo) {
            debugInfo.textContent = 'Entering site...';
        }
        enterSite();
    }, 5000);
}

function cancelAutoEnter() {
    if (autoEnterTimeout) {
        clearTimeout(autoEnterTimeout);
        autoEnterTimeout = null;
    }
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    if (videoProgressInterval) {
        clearInterval(videoProgressInterval);
        videoProgressInterval = null;
    }
}

// Handle video loading and setup
function setupVideoEntrance() {
    // Check if we're using Option 5 - if so, skip video entrance
    const themeLink = document.getElementById('theme-css');
    const currentThemeHref = themeLink ? themeLink.href : '';
    
    if (currentThemeHref.includes('option5.css')) {
        // For Option 5, immediately show the site without video entrance
        const videoEntrance = document.getElementById('video-entrance');
        const mainContent = document.getElementById('main-content');
        const header = document.querySelector('header');
        const themeSwitcher = document.querySelector('.theme-switcher');
        
        if (videoEntrance) {
            videoEntrance.classList.add('hidden');
        }
        
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '1';
        }
        
        if (header) {
            header.style.display = 'block';
        }
        
        if (themeSwitcher) {
            themeSwitcher.classList.add('visible');
        }
        
        // Setup hero video background for Option 5
        setupHeroVideoBackground();
        
        return; // Exit early for Option 5
    }
    
    // Original video entrance logic for other themes
    const video = document.getElementById('entrance-video');
    const fallback = document.querySelector('.video-fallback');
    const debugInfo = document.getElementById('debug-info');
    
    function updateDebug(message) {
        console.log(message);
        if (debugInfo) {
            debugInfo.textContent = message;
        }
    }
    
    updateDebug('Setting up video entrance...');
    
    if (video) {
        // Force video to be visible initially
        video.style.display = 'block';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        
        updateDebug('Video element found, setting up events...');
        
        // Try to play the video immediately
        video.addEventListener('loadstart', () => {
            updateDebug('Video loading started...');
        });
        
        video.addEventListener('loadeddata', () => {
            updateDebug('Video data loaded successfully');
            video.style.display = 'block';
            if (fallback) fallback.style.display = 'none';
            startVideoTracking();
        });
        
        video.addEventListener('loadedmetadata', () => {
            updateDebug(`Video metadata loaded, duration: ${video.duration} seconds`);
        });
        
        video.addEventListener('canplay', () => {
            updateDebug('Video can play');
        });
        
        video.addEventListener('play', () => {
            updateDebug('Video started playing');
        });
        
        video.addEventListener('playing', () => {
            updateDebug('Video is playing');
            // Hide debug info after video starts playing
            setTimeout(() => {
                if (debugInfo) debugInfo.style.display = 'none';
            }, 2000);
        });
        
        // Handle video load errors
        video.addEventListener('error', (e) => {
            updateDebug(`Video error: ${e.message || 'Unknown error'}`);
            console.error('Video error details:', e);
            startFallbackTimer();
        });
        
        // Check each source for errors
        const sources = video.querySelectorAll('source');
        sources.forEach((source, index) => {
            source.addEventListener('error', (e) => {
                updateDebug(`Source ${index + 1} failed: ${source.src}`);
            });
        });
        
        // Try to start playing
        setTimeout(() => {
            updateDebug('Attempting to play video...');
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    updateDebug('Video playing successfully');
                }).catch(error => {
                    updateDebug(`Autoplay prevented: ${error.message}`);
                    // Video autoplay was prevented, still track it
                    startVideoTracking();
                });
            }
        }, 100);
        
        // If video doesn't load within 5 seconds, show fallback
        setTimeout(() => {
            if (video.readyState === 0 || video.error) {
                updateDebug('Video timeout - showing fallback');
                startFallbackTimer();
            } else if (video.paused) {
                updateDebug('Video loaded but paused - user interaction required');
            }
        }, 5000);
        
    } else {
        updateDebug('No video element found - showing fallback');
        startFallbackTimer();
    }
}

// Start video entrance setup on page load
document.addEventListener('DOMContentLoaded', setupVideoEntrance);

// Theme switching functionality
function switchTheme(themeName) {
    console.log('Switching to theme:', themeName); // Debug log
    
    // Show loading animation
    const loadingOverlay = document.querySelector('.theme-switching');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }

    setTimeout(() => {
        // Update the existing theme CSS link
        const themeLink = document.getElementById('theme-css');
        if (themeLink) {
            themeLink.href = `css/themes/${themeName}.css`;
        } else {
            // Fallback: create new link if doesn't exist
            const newThemeLink = document.createElement('link');
            newThemeLink.id = 'theme-css';
            newThemeLink.rel = 'stylesheet';
            newThemeLink.href = `css/themes/${themeName}.css`;
            document.head.appendChild(newThemeLink);
        }

        console.log('Theme CSS updated:', `css/themes/${themeName}.css`); // Debug log

        // Update active theme button
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find the button that was clicked and make it active
        const clickedButton = event ? event.target : document.querySelector(`button[onclick*="${themeName}"]`);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        // Save theme preference
        localStorage.setItem('selectedTheme', themeName);
        currentTheme = themeName;

        // Handle video entrance based on theme
        setTimeout(() => {
            if (themeName === 'option5') {
                // For Option 5, ensure video entrance is hidden and main content is visible
                const videoEntrance = document.getElementById('video-entrance');
                const mainContent = document.getElementById('main-content');
                const header = document.querySelector('header');
                
                if (videoEntrance) {
                    videoEntrance.classList.add('hidden');
                }
                
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    mainContent.style.opacity = '1';
                }
                
                if (header) {
                    header.style.display = 'block';
                }
                
                // Setup hero video background for Option 5
                setupHeroVideoBackground();
            } else {
                // For other themes, setup video entrance if coming from Option 5
                const videoEntrance = document.getElementById('video-entrance');
                const mainContent = document.getElementById('main-content');
                
                if (videoEntrance && !videoEntrance.classList.contains('hidden')) {
                    // Video entrance already active, do nothing
                } else {
                    // Reset to show video entrance for other themes
                    setupVideoEntrance();
                }
            }
        }, 100);

        // Hide loading animation
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
        }, 300);
    }, 200);
}

// Load saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'option1';
    
    // Update the existing theme CSS link
    const themeLink = document.getElementById('theme-css');
    if (themeLink) {
        themeLink.href = `css/themes/${savedTheme}.css`;
    }
    
    currentTheme = savedTheme;

    // Update active button after a short delay to ensure DOM is loaded
    setTimeout(() => {
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`button[onclick*="${savedTheme}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }, 100);
}

// Gallery lightbox functionality
let currentImageIndex = 0;
const galleryImages = [
    { 
        src: 'images/pottery1.jpeg', 
        nameEn: 'Ceramic Bowl',
        nameHr: 'Kolekcija sviječnjaka'
    },
    { 
        src: 'images/pottery2.jpeg', 
        nameEn: 'Ceramic Vase',
        nameHr: 'Keramička vaza'
    },
    { 
        src: 'images/pottery3.jpeg', 
        nameEn: 'Ceramic Mug',
        nameHr: 'Keramička šalica'
    },
    { 
        src: 'images/pottery4.jpeg', 
        nameEn: 'Ceramic Piece',
        nameHr: 'Keramički komad'
    },
    { 
        src: 'images/pottery5.jpeg', 
        nameEn: 'Ceramic Art',
        nameHr: 'Keramička umjetnost'
    },
    { 
        src: 'images/pottery6.jpeg', 
        nameEn: 'Handmade Pottery',
        nameHr: 'Ručno izrađena keramika'
    }
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const imageCounter = document.getElementById('image-counter');
    
    const currentImage = galleryImages[index];
    const currentName = currentLanguage === 'hr' ? currentImage.nameHr : currentImage.nameEn;
    
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentName;
    lightboxCaption.textContent = currentName;
    imageCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at beginning or end
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    openLightbox(currentImageIndex);
}

// Close lightbox with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeLightboxImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeLightboxImage(1);
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Language switching functionality
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-en][data-hr]');
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            if (element.innerHTML.includes('<')) {
                // For elements with HTML content, be more careful
                const parser = new DOMParser();
                const doc = parser.parseFromString(translation, 'text/html');
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update cart items with new language
    updateCartLanguage(lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'hr' ? 'hr' : 'en';
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update category counts with new language
    updateCategoryCount();
}

// Update cart items language
function updateCartLanguage(lang) {
    const productTranslations = {
        'Handmade Bowl': { en: 'Handmade Bowl', hr: 'Ručno izrađena zdjela' },
        'Ceramic Vase': { en: 'Ceramic Vase', hr: 'Keramička vaza' },
        'Coffee Mug': { en: 'Coffee Mug', hr: 'Šalica za kavu' },
        'Decorative Plate': { en: 'Decorative Plate', hr: 'Ukrasni tanjur' },
        'Ceramic Pitcher': { en: 'Ceramic Pitcher', hr: 'Keramički vrč' },
        'Tea Cup Set': { en: 'Tea Cup Set', hr: 'Set šalica za čaj' },
        'Large Serving Bowl': { en: 'Large Serving Bowl', hr: 'Velika zdjela za posluživanje' },
        'Dinner Plate Set': { en: 'Dinner Plate Set', hr: 'Set tanjura za večeru' },
        'Cereal Bowl Set': { en: 'Cereal Bowl Set', hr: 'Set zdjela za žitarice' }
    };
    
    // Update cart items display names
    cart.forEach(item => {
        if (item.nameEn && productTranslations[item.nameEn]) {
            item.name = productTranslations[item.nameEn][lang];
        }
    });
    
    // Save updated cart and refresh display
    saveCart();
    updateCartDisplay();
}

// Load saved language on page load
function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'hr';
    const langBtn = document.querySelector(`.lang-btn[onclick*="${savedLang}"]`);
    if (langBtn) {
        // Simulate click to change language
        langBtn.click();
    }
}

// Product filtering functionality
function filterProducts(category) {
    const shopItems = document.querySelectorAll('.shop-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter products with smooth animation
    shopItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Count items in each category for display
function updateCategoryCount() {
    const categories = ['plates', 'cups', 'bowls', 'vases'];
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Get category names in current language
    const categoryNames = {
        'hr': { 'plates': 'Tanjuri', 'cups': 'Šalice', 'bowls': 'Zdjele', 'vases': 'Vaze', 'all': 'Sve' },
        'en': { 'plates': 'Plates', 'cups': 'Cups', 'bowls': 'Bowls', 'vases': 'Vases', 'all': 'All' }
    };
    
    categories.forEach((cat, index) => {
        const count = document.querySelectorAll(`[data-category="${cat}"]`).length;
        const btn = filterBtns[index + 1]; // +1 because "All" is first
        if (btn) {
            const categoryName = categoryNames[currentLanguage][cat];
            btn.innerHTML = `${categoryName} (${count})`;
            // Preserve data attributes
            btn.setAttribute('data-en', `${categoryNames.en[cat]} (${count})`);
            btn.setAttribute('data-hr', `${categoryNames.hr[cat]} (${count})`);
        }
    });
    
    // Update "All" button with total count
    const totalCount = document.querySelectorAll('.shop-item').length;
    const allBtn = filterBtns[0];
    if (allBtn) {
        const allName = categoryNames[currentLanguage]['all'];
        allBtn.innerHTML = `${allName} (${totalCount})`;
        allBtn.setAttribute('data-en', `${categoryNames.en.all} (${totalCount})`);
        allBtn.setAttribute('data-hr', `${categoryNames.hr.all} (${totalCount})`);
    }
}

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('ceramicsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    // Load saved language
    loadLanguage();
    
    // Load saved theme
    loadSavedTheme();
    
    // Update category counts on page load
    updateCategoryCount();
    
    // Existing smooth scrolling code
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add item to cart
function addToCart(nameEn, price, image) {
    // Get the current translated name based on the language
    const productTranslations = {
        'Handmade Bowl': { en: 'Handmade Bowl', hr: 'Ručno izrađena zdjela' },
        'Ceramic Vase': { en: 'Ceramic Vase', hr: 'Keramička vaza' },
        'Coffee Mug': { en: 'Coffee Mug', hr: 'Šalica za kavu' },
        'Decorative Plate': { en: 'Decorative Plate', hr: 'Ukrasni tanjur' },
        'Ceramic Pitcher': { en: 'Ceramic Pitcher', hr: 'Keramički vrč' },
        'Tea Cup Set': { en: 'Tea Cup Set', hr: 'Set šalica za čaj' },
        'Large Serving Bowl': { en: 'Large Serving Bowl', hr: 'Velika zdjela za posluživanje' },
        'Dinner Plate Set': { en: 'Dinner Plate Set', hr: 'Set tanjura za večeru' },
        'Cereal Bowl Set': { en: 'Cereal Bowl Set', hr: 'Set zdjela za žitarice' }
    };
    
    const currentName = productTranslations[nameEn] ? productTranslations[nameEn][currentLanguage] : nameEn;
    
    const existingItem = cart.find(item => item.nameEn === nameEn);
    
    if (existingItem) {
        existingItem.quantity += 1;
        // Update the display name to current language
        existingItem.name = currentName;
    } else {
        cart.push({
            name: currentName,
            nameEn: nameEn, // Keep English name as identifier
            price: price,
            image: image,
            quantity: 1,
            id: Date.now()
        });
    }
    
    saveCart();
    updateCartDisplay();
    showCartNotification(currentName);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('ceramicsCart', JSON.stringify(cart));
}

// Show notification when item added
function showCartNotification(itemName) {
    // Simple alert for now - you could make this fancier
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #8B4513;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = `${itemName} added to cart!`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Checkout function (mock)
function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} x ${item.quantity}`).join('\n');
    
    alert(`Mock Checkout!\n\nItems:\n${itemsList}\n\nTotal: $${total.toFixed(2)}\n\nIn a real shop, this would process payment and send order confirmation.`);
    
    // Clear cart after "purchase"
    cart = [];
    saveCart();
    updateCartDisplay();
    toggleCart();
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Simple image placeholder for gallery items
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            this.src = 'https://via.placeholder.com/300x250/D2B48C/8B4513?text=Ceramic+Piece';
        });
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Video background function for Option 5
function setupHeroVideoBackground() {
    const videoElement = document.getElementById('hero-bg-video');
    const fallbackImage = document.querySelector('.hero-fallback-image');
    
    console.log('=== HERO VIDEO DEBUG ===');
    console.log('Video element:', videoElement);
    console.log('Video sources:', videoElement ? videoElement.querySelectorAll('source') : null);
    console.log('Fallback image:', fallbackImage);
    
    if (!videoElement) {
        console.log('❌ No video element found with ID: hero-bg-video');
        return;
    }
    
    // Check if video can be played
    videoElement.addEventListener('canplay', function() {
        console.log('✅ Video can play');
        videoElement.style.opacity = '1';
        videoElement.style.border = '3px solid lime'; // Temporary debug border
        videoElement.play().then(() => {
            console.log('✅ Video started playing');
        }).catch(e => {
            console.log('❌ Video play failed:', e);
        });
    });
    
    videoElement.addEventListener('loadeddata', function() {
        console.log('✅ Video data loaded');
        if (fallbackImage) {
            fallbackImage.style.opacity = '0';
        }
    });
    
    videoElement.addEventListener('error', function(e) {
        console.log('❌ Video error:', e);
        console.log('❌ Error details:', videoElement.error);
        if (fallbackImage) {
            fallbackImage.style.opacity = '1';
        }
    });
    
    videoElement.addEventListener('loadstart', function() {
        console.log('🔄 Video load started');
    });
    
    // Try to load the video
    console.log('🔄 Loading video...');
    videoElement.load();
}