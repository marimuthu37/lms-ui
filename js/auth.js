document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
});

const initLoginForm = () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            clearErrors();
            
            let isValid = true;
            
            if (!usernameInput.value.trim()) {
                showError(usernameError, 'Username is required');
                isValid = false;
            }
            
            if (!passwordInput.value.trim()) {
                showError(passwordError, 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                showAlert('success', 'Login successful! Redirecting...');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        });
    }
};

const showError = (errorElement, message) => {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
};

const clearErrors = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
};

const showAlert = (type, message) => {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background: none; border: none; color: inherit; font-size: 20px; cursor: pointer; padding: 0 10px;';
    closeBtn.addEventListener('click', () => {
        alert.remove();
    });
    
    alert.appendChild(closeBtn);
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
};
