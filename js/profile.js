document.addEventListener('DOMContentLoaded', () => {
    initProfileEdit();
});

const initProfileEdit = () => {
    const editBtn = document.getElementById('editProfileBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const profileForm = document.getElementById('profileForm');
    const formActions = document.getElementById('formActions');
    const formInputs = profileForm.querySelectorAll('input');
    
    let isEditMode = false;
    let originalValues = {};
    
    formInputs.forEach(input => {
        originalValues[input.id] = input.value;
    });
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (!isEditMode) {
                enableEditMode(formInputs, formActions, editBtn);
                isEditMode = true;
            }
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (isEditMode) {
                formInputs.forEach(input => {
                    input.value = originalValues[input.id];
                });
                
                disableEditMode(formInputs, formActions, editBtn);
                isEditMode = false;
            }
        });
    }
    
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (isEditMode) {
                formInputs.forEach(input => {
                    originalValues[input.id] = input.value;
                });
                
                disableEditMode(formInputs, formActions, editBtn);
                isEditMode = false;
                
                showAlert('success', 'Profile updated successfully!');
            }
        });
    }
};

const enableEditMode = (inputs, formActions, editBtn) => {
    inputs.forEach(input => {
        if (input.id !== 'studentId') {
            input.disabled = false;
        }
    });
    
    if (formActions) {
        formActions.style.display = 'flex';
    }
    
    if (editBtn) {
        editBtn.style.display = 'none';
    }
};

const disableEditMode = (inputs, formActions, editBtn) => {
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    if (formActions) {
        formActions.style.display = 'none';
    }
    
    if (editBtn) {
        editBtn.style.display = 'inline-block';
    }
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