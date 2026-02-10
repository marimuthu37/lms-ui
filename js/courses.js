/**
 * Courses Module
 * Task 4: Course List Rendering
 * - Store course details in JavaScript array
 * - Dynamically generate course cards
 * - Display course status (Active / Completed)
 */

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPageName();
    
    if (currentPage === 'courses') {
        renderCourses();
    } else if (currentPage === 'course-detail') {
        renderCourseDetail();
    }
});

/**
 * Get current page name
 */
const getCurrentPageName = () => {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
};

/**
 * Course data array
 */
const courses = [
    {
        id: 1,
        name: 'Introduction to Computer Science',
        code: 'CS101',
        instructor: 'Dr. Smith',
        status: 'active',
        credits: 3,
        description: 'Fundamental concepts of computer science and programming.'
    },
    {
        id: 2,
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        instructor: 'Dr. Johnson',
        status: 'active',
        credits: 4,
        description: 'Study of data structures and algorithm design.'
    },
    {
        id: 3,
        name: 'Web Development',
        code: 'CS301',
        instructor: 'Dr. Williams',
        status: 'active',
        credits: 3,
        description: 'Modern web development technologies and frameworks.'
    },
    {
        id: 4,
        name: 'Database Systems',
        code: 'CS302',
        instructor: 'Dr. Brown',
        status: 'active',
        credits: 3,
        description: 'Database design, SQL, and database management systems.'
    },
    {
        id: 5,
        name: 'Software Engineering',
        code: 'CS401',
        instructor: 'Dr. Davis',
        status: 'completed',
        credits: 4,
        description: 'Software development lifecycle and methodologies.'
    },
    {
        id: 6,
        name: 'Machine Learning',
        code: 'CS501',
        instructor: 'Dr. Miller',
        status: 'active',
        credits: 3,
        description: 'Introduction to machine learning algorithms and applications.'
    }
];

/**
 * Render all courses
 */
const renderCourses = () => {
    const coursesGrid = document.getElementById('coursesGrid');
    
    if (!coursesGrid) return;
    
    // Clear existing content
    coursesGrid.innerHTML = '';
    
    // Loop through courses and create cards
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
};

/**
 * Create a course card element
 */
const createCourseCard = (course) => {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    // Add click event to navigate to course detail
    card.addEventListener('click', () => {
        window.location.href = `course-detail.html?id=${course.id}`;
    });
    
    // Determine status class and text
    const statusClass = course.status === 'active' ? 'active' : 'completed';
    const statusText = course.status === 'active' ? 'Active' : 'Completed';
    
    card.innerHTML = `
        <h3>${course.name}</h3>
        <div class="course-info">
            <p><strong>Code:</strong> ${course.code}</p>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        </div>
        <span class="course-status ${statusClass}">${statusText}</span>
    `;
    
    return card;
};

/**
 * Render course detail page
 */
const renderCourseDetail = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    if (!courseId) {
        window.location.href = 'courses.html';
        return;
    }
    
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
        window.location.href = 'courses.html';
        return;
    }
    
    const courseTitle = document.getElementById('courseTitle');
    const courseDetailContent = document.getElementById('courseDetailContent');
    
    if (courseTitle) {
        courseTitle.textContent = course.name;
    }
    
    if (courseDetailContent) {
        const statusClass = course.status === 'active' ? 'active' : 'completed';
        const statusText = course.status === 'active' ? 'Active' : 'Completed';
        
        courseDetailContent.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3>Course Information</h3>
                <p><strong>Course Code:</strong> ${course.code}</p>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Status:</strong> <span class="course-status ${statusClass}">${statusText}</span></p>
            </div>
            <div>
                <h3>Description</h3>
                <p>${course.description}</p>
            </div>
        `;
    }
};

