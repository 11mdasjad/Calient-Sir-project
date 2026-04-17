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
