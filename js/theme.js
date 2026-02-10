/**
 * Theme Switcher Module
 * Task 8: Theme Switcher (Light / Dark Mode)
 * - Toggle between light and dark themes
 * - Persist theme using localStorage
 * - Restore theme on page load
 */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initSidebarToggle();
    initNavigationActiveState();
});

/**
 * Initialize theme from localStorage or default to light
 */
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
};

/**
 * Initialize theme toggle button
 */
const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
};

/**
 * Toggle between light and dark theme
 */
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
};

/**
 * Update theme toggle icon based on current theme
 */
const updateThemeToggleIcon = (theme) => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌓';
    }
};

/**
 * Initialize sidebar toggle for mobile view
 * Task 2: Sidebar Toggle (Responsive UI)
 */
const initSidebarToggle = () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
};

/**
 * Initialize navigation active state
 * Task 9: Navigation Active State
 */
const initNavigationActiveState = () => {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const currentPage = getCurrentPage();
    
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (page === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

/**
 * Get current page name from URL
 */
const getCurrentPage = () => {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename === 'index.html' || filename === '') {
        return 'login';
    }
    
    return filename.replace('.html', '');
};

