document.addEventListener('DOMContentLoaded', () => {
    renderDashboardCards();
});

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

const renderDashboardCards = () => {
    const dashboardCardsContainer = document.getElementById('dashboardCards');
    
    if (!dashboardCardsContainer) return;
    
    dashboardCardsContainer.innerHTML = '';
    
    dashboardStats.forEach(stat => {
        const card = createDashboardCard(stat);
        dashboardCardsContainer.appendChild(card);
    });
};

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