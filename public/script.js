// ========================================
// PARTICLE BACKGROUND ANIMATION
// ========================================

class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.resizeCanvas();
        this.initParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
    }
    
    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: ['#6366F1', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 3)]
            });
        }
    }
    
    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw lines between nearby particles
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index < otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        this.ctx.strokeStyle = particle.color;
                        this.ctx.globalAlpha = (1 - distance / 150) * 0.2;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(this.animate);
    }
}

// Initialize particles on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleBackground('particleCanvas');
    });
} else {
    new ParticleBackground('particleCanvas');
}
// ========================================
// DARK MODE / LIGHT MODE THEME TOGGLE
// ========================================

class ThemeToggle {
    constructor() {
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.html = document.documentElement;
        this.body = document.body;
        
        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(initialTheme);
        
        // Event listener
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            this.body.classList.add('light-mode');
            this.html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            this.body.classList.remove('light-mode');
            this.html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    getCurrentTheme() {
        return this.body.classList.contains('light-mode') ? 'light' : 'dark';
    }
    
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Initialize theme toggle
const themeToggle = new ThemeToggle();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeToggle;
}
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
// ========================================
// FINTECH WEBSITE - MAIN SCRIPT
// ========================================

// ========================================
// COPY TO CLIPBOARD FUNCTION
// ========================================

function copyToClipboard(text) {
    // Create a temporary textarea element
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.opacity = '0';
    
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    
    try {
        // Copy the text
        document.execCommand('copy');
        
        // Show success notification
        showNotification('Email copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for modern browsers
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy email', 'error');
            });
        } else {
            showNotification('Failed to copy email', 'error');
        }
    }
    
    document.body.removeChild(tempTextarea);
}

// ========================================
// NOTIFICATION FUNCTION
// ========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22C55E, #16A34A)' : type === 'error' ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #3B82F6, #2563EB)'};
        color: white;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

const Utils = {
    // DOM Helpers
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    // Element creation
    createElement(tag, className = '', id = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (id) element.id = id;
        return element;
    },
    
    // Add event listeners
    on(element, event, handler) {
        if (element) element.addEventListener(event, handler);
    },
    
    // Add class
    addClass(element, className) {
        if (element) element.classList.add(className);
    },
    
    // Remove class
    removeClass(element, className) {
        if (element) element.classList.remove(className);
    },
    
    // Toggle class
    toggleClass(element, className) {
        if (element) element.classList.toggle(className);
    },
    
    // Has class
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    },
    
    // Store data
    setData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    // Get data
    getData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // Remove data
    removeData(key) {
        localStorage.removeItem(key);
    }
};

// ========================================
// API MOCK FUNCTIONS
// ========================================

const API = {
    // Mock login
    async login(email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Login successful',
                    token: 'mock_' + Date.now()
                });
            }, 1000);
        });
    },
    
    // Mock registration
    async register(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Registration successful',
                    userId: 'user_' + Date.now()
                });
            }, 1000);
        });
    },
    
    // Mock contact form submission
    async submitContact(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Message sent successfully'
                });
            }, 1500);
        });
    },
    
    // Mock get dashboard data
    async getDashboard() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    balance: 45320,
                    todayEarnings: 2450,
                    transactions: 128,
                    weeklyData: [45, 60, 50, 75, 65, 90, 80]
                });
            }, 500);
        });
    }
};

// ========================================
// ANALYTICS TRACKING
// ========================================

class Analytics {
    constructor() {
        this.sessionId = this.generateId();
        this.sessionStart = Date.now();
        this.pageViews = 1;
        
        this.trackPageView();
        this.setupEventTracking();
    }
    
    generateId() {
        return 'session_' + Math.random().toString(36).substr(2, 9);
    }
    
    trackPageView() {
        const data = {
            sessionId: this.sessionId,
            page: window.location.pathname,
            timestamp: Date.now(),
            referrer: document.referrer,
            screenSize: `${window.innerWidth}x${window.innerHeight}`
        };
        
        // Log to console (in production, send to analytics server)
        console.log('Page View:', data);
    }
    
    trackEvent(eventName, eventData = {}) {
        const data = {
            sessionId: this.sessionId,
            event: eventName,
            timestamp: Date.now(),
            ...eventData
        };
        
        console.log('Event Tracked:', data);
    }
    
    setupEventTracking() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button')) {
                this.trackEvent('button_click', {
                    buttonText: e.target.textContent,
                    buttonClass: e.target.className
                });
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            this.trackEvent('form_submit', {
                formName: e.target.name || 'unnamed'
            });
        });
        
        // Track link clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a')) {
                this.trackEvent('link_click', {
                    href: e.target.href,
                    text: e.target.textContent
                });
            }
        });
    }
}

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================

if ('serviceWorker' in navigator && 'caches' in window) {
    window.addEventListener('load', () => {
        // Offline capability
        if (navigator.onLine) {
            console.log('Application is online');
        } else {
            console.log('Application is offline - limited functionality');
        }
    });
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

class PerformanceMonitor {
    constructor() {
        this.monitorLoadTime();
        this.monitorCoreWebVitals();
    }
    
    monitorLoadTime() {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });
    }
    
    monitorCoreWebVitals() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                const paintObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log('LCP (Largest Contentful Paint):', Math.round(entry.startTime) + 'ms');
                    }
                });
                
                paintObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.log('LCP observer not supported');
            }
        }
    }
}

// ========================================
// INIT ON LOAD
// ========================================

function initializeApp() {
    // Initialize analytics
    const analytics = new Analytics();
    
    // Initialize performance monitoring
    const performance = new PerformanceMonitor();
    
    // Make Utils and API globally available
    window.Utils = Utils;
    window.API = API;
    window.Analytics = analytics;
    
    // Setup PWA
    setupPWA();
    
    // Setup offline notification
    setupOfflineNotification();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// ========================================
// PWA SETUP
// ========================================

function setupPWA() {
    // Check if app is in standalone mode
    if (window.navigator.standalone === true) {
        console.log('PWA is running in standalone mode');
    }
    
    // Handle app installation
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button
        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install App';
        installBtn.className = 'btn btn-primary';
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('App installed');
                    }
                    deferredPrompt = null;
                });
            }
        });
    });
}

// ========================================
// OFFLINE NOTIFICATION
// ========================================

function setupOfflineNotification() {
    window.addEventListener('online', () => {
        showNotification('You are back online!', 'success');
        console.log('Application is back online');
    });
    
    window.addEventListener('offline', () => {
        showNotification('You are offline - limited functionality', 'warning');
        console.log('Application is offline');
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function setupKeyboardShortcuts() {
    const shortcuts = {
        // Ctrl+K or Cmd+K for search/login
        'login': () => {
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) loginBtn.click();
        },
        
        // Ctrl+/ for help
        'help': () => {
            console.log('Keyboard Shortcuts:');
            console.log('Ctrl+K: Open Login/Register');
            console.log('Ctrl+/: Show Help');
            console.log('ESC: Close Modal');
        }
    };
    
    document.addEventListener('keydown', (e) => {
        // Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            shortcuts.login();
        }
        
        // Ctrl+/
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            shortcuts.help();
        }
    });
}

// ========================================
// EXPORT UTILS FOR CONSOLE
// ========================================

window.showNotification = showNotification;
window.Utils = Utils;
window.API = API;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Send to error tracking service
    // reportError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    // Send to error tracking service
    // reportError(event.reason);
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

const welcomeMessage = `
%c╔═══════════════════════════════════╗
║   FinTech Platform               ║
║   Welcome to Developer Console   ║
╚═══════════════════════════════════╝

%cAvailable globals:
- Utils: Utility functions
- API: Mock API functions
- Analytics: Analytics tracking

Try: Utils.setData('test', 'value')
`;

console.log(welcomeMessage, 'color: #6366F1; font-weight: bold; font-size: 14px;', 'color: #06B6D4; font-size: 12px;');
