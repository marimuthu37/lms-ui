/**
 * Assignments Module
 * Task 5: Assignment Status Management
 * Task 6: Assignment Submission Simulation
 * - Store assignment data in JavaScript
 * - Display assignments dynamically
 * - Change status based on due date
 * - Handle assignment submission
 */

document.addEventListener('DOMContentLoaded', () => {
    renderAssignments();
});

/**
 * Assignment data array
 */
const assignments = [
    {
        id: 1,
        title: 'Web Development Project',
        course: 'CS301 - Web Development',
        dueDate: '2024-12-20',
        status: 'pending',
        submitted: false
    },
    {
        id: 2,
        title: 'Database Design Assignment',
        course: 'CS302 - Database Systems',
        dueDate: '2024-12-15',
        status: 'pending',
        submitted: false
    },
    {
        id: 3,
        title: 'Algorithm Analysis Report',
        course: 'CS201 - Data Structures',
        dueDate: '2024-12-10',
        status: 'late',
        submitted: false
    },
    {
        id: 4,
        title: 'Machine Learning Lab',
        course: 'CS501 - Machine Learning',
        dueDate: '2024-12-25',
        status: 'pending',
        submitted: false
    },
    {
        id: 5,
        title: 'Programming Exercise 5',
        course: 'CS101 - Introduction to CS',
        dueDate: '2024-12-05',
        status: 'submitted',
        submitted: true
    }
];

/**
 * Determine assignment status based on due date
 */
const determineStatus = (dueDate, submitted) => {
    if (submitted) {
        return 'submitted';
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return 'late';
    } else {
        return 'pending';
    }
};

/**
 * Format date for display
 */
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
};

/**
 * Render all assignments
 */
const renderAssignments = () => {
    const assignmentsList = document.getElementById('assignmentsList');
    
    if (!assignmentsList) return;
    
    // Clear existing content
    assignmentsList.innerHTML = '';
    
    // Update status for each assignment based on current date
    assignments.forEach(assignment => {
        if (!assignment.submitted) {
            assignment.status = determineStatus(assignment.dueDate, assignment.submitted);
        }
    });
    
    // Loop through assignments and create cards
    assignments.forEach(assignment => {
        const assignmentCard = createAssignmentCard(assignment);
        assignmentsList.appendChild(assignmentCard);
    });
};

/**
 * Create an assignment card element
 */
const createAssignmentCard = (assignment) => {
    const card = document.createElement('div');
    card.className = 'assignment-card';
    card.setAttribute('data-assignment-id', assignment.id);
    
    // Determine status class and text
    const statusClass = assignment.status;
    const statusText = assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);
    
    // Create assignment info section
    const infoDiv = document.createElement('div');
    infoDiv.className = 'assignment-info';
    infoDiv.innerHTML = `
        <h3>${assignment.title}</h3>
        <p><strong>Course:</strong> ${assignment.course}</p>
        <p><strong>Due Date:</strong> ${formatDate(assignment.dueDate)}</p>
        <span class="assignment-status ${statusClass}">${statusText}</span>
    `;
    
    // Create action section
    const actionDiv = document.createElement('div');
    actionDiv.className = 'assignment-actions';
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary';
    submitBtn.textContent = assignment.submitted ? 'Submitted' : 'Submit Assignment';
    submitBtn.disabled = assignment.submitted;
    
    // Add event listener for submission
    if (!assignment.submitted) {
        submitBtn.addEventListener('click', () => {
            handleAssignmentSubmission(assignment.id);
        });
    }
    
    actionDiv.appendChild(submitBtn);
    
    card.appendChild(infoDiv);
    card.appendChild(actionDiv);
    
    return card;
};

/**
 * Handle assignment submission
 * Task 6: Assignment Submission Simulation
 */
const handleAssignmentSubmission = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment || assignment.submitted) {
        return;
    }
    
    // Update assignment status
    assignment.submitted = true;
    assignment.status = 'submitted';
    
    // Update UI
    const card = document.querySelector(`[data-assignment-id="${assignmentId}"]`);
    if (card) {
        // Update status badge
        const statusBadge = card.querySelector('.assignment-status');
        if (statusBadge) {
            statusBadge.textContent = 'Submitted';
            statusBadge.className = 'assignment-status submitted';
        }
        
        // Update button
        const submitBtn = card.querySelector('.btn');
        if (submitBtn) {
            submitBtn.textContent = 'Submitted';
            submitBtn.disabled = true;
        }
    }
    
    // Show success alert
    showAlert('success', `Assignment "${assignment.title}" submitted successfully!`);
};

/**
 * Show alert notification
 */
const showAlert = (type, message) => {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: inherit; font-size: 20px; cursor: pointer; padding: 0 10px;';
    closeBtn.addEventListener('click', () => {
        alert.remove();
    });
    
    alert.appendChild(closeBtn);
    alertContainer.appendChild(alert);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
};

