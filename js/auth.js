/**
 * Authentication Module
 * Task 1: Login Validation (Client-Side)
 * - Validate username and password fields
 * - Display error messages if fields are empty
 * - Allow login only if both fields are filled
 * - Redirect to dashboard on successful validation
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
});

/**
 * Initialize login form with validation
 */
const initLoginForm = () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            
            // Reset previous errors
            clearErrors();
            
            // Validate fields
            let isValid = true;
            
            // Validate username
            if (!usernameInput.value.trim()) {
                showError(usernameError, 'Username is required');
                isValid = false;
            }
            
            // Validate password
            if (!passwordInput.value.trim()) {
                showError(passwordError, 'Password is required');
                isValid = false;
            }
            
            // If validation passes, redirect to dashboard
            if (isValid) {
                showAlert('success', 'Login successful! Redirecting...');
                
                // Simulate redirect after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        });
    }
};

/**
 * Display error message
 */
const showError = (errorElement, message) => {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
};

/**
 * Clear all error messages
 */
const clearErrors = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
};

/**
 * Show alert notification
 * Task 10: Alert & Notification System
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

