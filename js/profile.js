/**
 * Profile Module
 * Task 7: Profile Page Edit Mode
 * - Add "Edit Profile" button
 * - Enable input fields on click
 * - Save changes and switch back to view mode
 */

document.addEventListener('DOMContentLoaded', () => {
    initProfileEdit();
});

/**
 * Initialize profile edit functionality
 */
const initProfileEdit = () => {
    const editBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    const formActions = document.getElementById('formActions');
    const formInputs = profileForm.querySelectorAll('input');
    
    let isEditMode = false;
    let originalValues = {};
    
    // Store original values
    formInputs.forEach(input => {
        originalValues[input.id] = input.value;
    });
    
    // Edit button click handler
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (!isEditMode) {
                enableEditMode(formInputs, formActions, editBtn);
                isEditMode = true;
            }
        });
    }
    
    // Cancel button click handler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (isEditMode) {
                // Restore original values
                formInputs.forEach(input => {
                    input.value = originalValues[input.id];
                });
                
                disableEditMode(formInputs, formActions, editBtn);
                isEditMode = false;
            }
        });
    }
    
    // Form submit handler
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (isEditMode) {
                // Save new values
                formInputs.forEach(input => {
                    originalValues[input.id] = input.value;
                });
                
                disableEditMode(formInputs, formActions, editBtn);
                isEditMode = false;
                
                // Show success alert
                showAlert('success', 'Profile updated successfully!');
            }
        });
    }
};

/**
 * Enable edit mode
 */
const enableEditMode = (inputs, formActions, editBtn) => {
    // Enable all input fields except studentId (read-only)
    inputs.forEach(input => {
        if (input.id !== 'studentId') {
            input.disabled = false;
        }
    });
    
    // Show form actions
    if (formActions) {
        formActions.style.display = 'flex';
    }
    
    // Hide edit button
    if (editBtn) {
        editBtn.style.display = 'none';
    }
};

/**
 * Disable edit mode
 */
const disableEditMode = (inputs, formActions, editBtn) => {
    // Disable all input fields
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    // Hide form actions
    if (formActions) {
        formActions.style.display = 'none';
    }
    
    // Show edit button
    if (editBtn) {
        editBtn.style.display = 'inline-block';
    }
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

