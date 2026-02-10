document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initSidebarToggle();
    initNavigationActiveState();
});

const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
};

const initThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
};

const updateThemeToggleIcon = (theme) => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌓';
    }
};

const initSidebarToggle = () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
        
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
};

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

const getCurrentPage = () => {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename === 'index.html' || filename === '') {
        return 'login';
    }
    
    return filename.replace('.html', '');
};