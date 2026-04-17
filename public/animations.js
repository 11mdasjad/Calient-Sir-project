// ========================================
// SCROLL REVEAL ANIMATIONS (AOS - Animate On Scroll)
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.elements.forEach(el => observer.observe(el));
    }
    
    animateElement(element) {
        // Get delay if specified
        const delay = element.getAttribute('data-aos-delay');
        
        if (delay) {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, parseInt(delay));
        } else {
            element.classList.add('aos-animate');
        }
    }
}

// ========================================
// NAVIGATION & SCROLL BEHAVIORS
// ========================================

class Navigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.header = document.getElementById('header');
        
        this.setupEventListeners();
        this.setupSmoothScroll();
        this.setupStickyHeader();
    }
    
    setupEventListeners() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }
    
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
    
    setupStickyHeader() {
        let lastScrollTop = 0;
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                this.header.classList.add('sticky');
            } else {
                this.header.classList.remove('sticky');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

class AuthModal {
    constructor() {
        this.modal = document.getElementById('authModal');
        this.loginBtn = document.getElementById('loginBtn');
        this.modalClose = document.getElementById('modalClose');
        this.authToggleBtns = document.querySelectorAll('.auth-toggle-btn');
        this.authForms = document.querySelectorAll('.auth-form');
        this.authSwitches = document.querySelectorAll('.auth-switch');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        if (this.loginBtn) {
            this.loginBtn.addEventListener('click', () => this.openModal());
        }
        
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Auth toggle buttons
        this.authToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });
        
        // Auth switch links
        this.authSwitches.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = link.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    switchTab(tab) {
        // Hide all forms
        this.authForms.forEach(form => {
            form.classList.remove('active');
        });
        
        // Remove active class from all buttons
        this.authToggleBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected form
        const form = document.getElementById(tab + 'Form');
        if (form) {
            form.classList.add('active');
        }
        
        // Add active class to clicked button
        const btn = document.querySelector(`[data-tab="${tab}"]`);
        if (btn) {
            btn.classList.add('active');
        }
    }
}

// ========================================
// FORM HANDLING
// ========================================

class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!this.validateForm(data)) {
            this.showNotification('Please fill all required fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            this.contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    validateForm(data) {
        return data.name && data.email && data.message;
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

class ScrollToTop {
    constructor() {
        this.button = this.createButton();
        document.body.appendChild(this.button);
        
        window.addEventListener('scroll', () => this.toggleButton(), { passive: true });
        this.button.addEventListener('click', () => this.scrollToTop());
    }
    
    createButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = '↑';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366F1, #8B5CF6);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            z-index: 999;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;
        return button;
    }
    
    toggleButton() {
        if (window.pageYOffset > 300) {
            this.button.style.display = 'flex';
        } else {
            this.button.style.display = 'none';
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ========================================
// HOVER EFFECTS FOR CARDS
// ========================================

class CardHoverEffect {
    constructor() {
        this.cards = document.querySelectorAll('.service-card, .earning-card, .testimonial-card');
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
}

// ========================================
// COUNTER ANIMATION
// ========================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-value');
        this.setupCounters();
    }
    
    setupCounters() {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const finalValue = element.textContent;
        let currentValue = 0;
        const duration = 2000;
        const startTime = Date.now();
        
        // Extract number from text (e.g., "50K+" -> 50)
        const numericValue = parseInt(finalValue) || 0;
        const increment = numericValue / (duration / 16);
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            currentValue = Math.floor(numericValue * progress);
            
            // Preserve the format (K+, etc)
            const formatEnding = finalValue.replace(/[0-9]/g, '');
            element.textContent = currentValue + formatEnding;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}

// ========================================
// PAGE LOAD EVENT
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    new ScrollReveal();
    new Navigation();
    new AuthModal();
    new FormHandler();
    new ScrollToTop();
    new CardHoverEffect();
    new CounterAnimation();
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('authModal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Ctrl+K or Cmd+K to open modal
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.click();
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
