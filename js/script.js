// Shopping Cart Functionality
let cart = [];
let currentLanguage = 'hr'; // Croatian as default

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
    imageCounter.textContent = `€{index + 1} / ${galleryImages.length}`;
    
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