/**
 * Form Handler Component
 * Handles contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

/**
 * Initialize contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 * @param {Event} event - Submit event
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Simple client-side validation
    if (!validateForm(form)) {
        return;
    }
    
    // Disable submit button and show loading state
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    }
    
    try {
        // Simulate form submission with a delay
        // In a real implementation, this would be an actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        form.innerHTML = `
            <div class="form-success">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
        `;
        
        // Style the success message
        const successMessage = form.querySelector('.form-success');
        if (successMessage) {
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '2rem';
            
            const icon = successMessage.querySelector('i');
            if (icon) {
                icon.style.fontSize = '3rem';
                icon.style.color = 'var(--accent-color)';
                icon.style.marginBottom = '1rem';
            }
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = `
            <p><i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again later.</p>
        `;
        
        // Style the error message
        errorMessage.style.color = '#f44336';
        errorMessage.style.padding = '1rem';
        errorMessage.style.marginTop = '1rem';
        errorMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        errorMessage.style.borderRadius = 'var(--border-radius-sm)';
        
        // Insert error message after form
        form.insertAdjacentElement('afterend', errorMessage);
        
        // Re-enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    }
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.field-error');
    existingErrors.forEach(error => error.remove());
    
    // Reset field styles
    requiredFields.forEach(field => {
        field.style.borderColor = '';
    });
    
    // Check each required field
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            
            // Style the invalid field
            field.style.borderColor = '#f44336';
            
            // Create and style error message
            const errorSpan = document.createElement('span');
            errorSpan.className = 'field-error';
            errorSpan.textContent = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`;
            errorSpan.style.color = '#f44336';
            errorSpan.style.fontSize = '0.8rem';
            errorSpan.style.marginTop = '0.25rem';
            errorSpan.style.display = 'block';
            
            // Insert error message after field
            field.insertAdjacentElement('afterend', errorSpan);
        }
    });
    
    // Validate email format if there's an email field
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(emailField.value)) {
            isValid = false;
            
            // Style the invalid field
            emailField.style.borderColor = '#f44336';
            
            // Create and style error message
            const errorSpan = document.createElement('span');
            errorSpan.className = 'field-error';
            errorSpan.textContent = 'Please enter a valid email address';
            errorSpan.style.color = '#f44336';
            errorSpan.style.fontSize = '0.8rem';
            errorSpan.style.marginTop = '0.25rem';
            errorSpan.style.display = 'block';
            
            // Insert error message after field
            emailField.insertAdjacentElement('afterend', errorSpan);
        }
    }
    
    return isValid;
}
