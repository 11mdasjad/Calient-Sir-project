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
