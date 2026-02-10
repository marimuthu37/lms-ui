/**
 * Dashboard Module
 * Task 3: Dynamic Dashboard Cards
 * - Display dashboard statistics using JavaScript arrays/objects
 * - Inject content dynamically into HTML
 * - Use loops to render cards
 */

document.addEventListener('DOMContentLoaded', () => {
    renderDashboardCards();
});

/**
 * Dashboard statistics data
 */
const dashboardStats = [
    {
        title: 'Total Courses',
        value: '8',
        icon: '📚',
        color: 'var(--primary-color)'
    },
    {
        title: 'Assignments Due',
        value: '5',
        icon: '📝',
        color: 'var(--warning-color)'
    },
    {
        title: 'Attendance',
        value: '92%',
        icon: '✅',
        color: 'var(--success-color)'
    },
    {
        title: 'GPA',
        value: '3.8',
        icon: '⭐',
        color: 'var(--info-color)'
    }
];

/**
 * Render dashboard cards dynamically
 */
const renderDashboardCards = () => {
    const dashboardCardsContainer = document.getElementById('dashboardCards');
    
    if (!dashboardCardsContainer) return;
    
    // Clear existing content
    dashboardCardsContainer.innerHTML = '';
    
    // Loop through stats and create cards
    dashboardStats.forEach(stat => {
        const card = createDashboardCard(stat);
        dashboardCardsContainer.appendChild(card);
    });
};

/**
 * Create a dashboard card element
 */
const createDashboardCard = (stat) => {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    
    card.innerHTML = `
        <div class="icon" style="color: ${stat.color}">${stat.icon}</div>
        <h3>${stat.title}</h3>
        <div class="value" style="color: ${stat.color}">${stat.value}</div>
    `;
    
    return card;
};

