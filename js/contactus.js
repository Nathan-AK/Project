// Contact Us page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (!this.href.includes('http')) {
                this.classList.add('active');
            }
        });
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            email: emailInput.value.trim(),
            name: nameInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        if (validateForm(formData)) {
            submitForm(formData);
        }
    });
    
    // Form validation
    function validateForm(data) {
        removeExistingMessages();
        
        if (!data.name || data.name.length < 2) {
            showError('Please enter a valid name (at least 2 characters)');
            nameInput.focus();
            return false;
        }
        
        if (!validateEmail(data.email)) {
            showError('Please enter a valid email address');
            emailInput.focus();
            return false;
        }
        
        if (!data.subject || data.subject.length < 5) {
            showError('Please enter a subject (at least 5 characters)');
            subjectInput.focus();
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            showError('Please enter a message (at least 10 characters)');
            messageInput.focus();
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Submit form with loading state
    function submitForm(data) {
        setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            try {
                // Store message in memory (demo purposes - localStorage not supported)
                const messages = window.voltrixMessages || [];
                messages.push({
                    ...data,
                    timestamp: new Date().toISOString(),
                    id: Date.now()
                });
                window.voltrixMessages = messages;
                
                showSuccess('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                contactForm.reset();
                
            } catch (error) {
                showError('Sorry, there was an error sending your message. Please try again.');
            } finally {
                setLoadingState(false);
            }
        }, 2000);
    }
    
    // Loading state management
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            submitBtn.style.opacity = '1';
        }
    }
    
    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
            border: 1px solid #fcc;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
        `;
        errorDiv.textContent = message;
        
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #efe;
            color: #363;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 16px;
            border: 1px solid #cfc;
            font-size: 14px;
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.textContent = message;
        
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }
    
    // Remove existing messages
    function removeExistingMessages() {
        const existingMessages = contactForm.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }
    
    // Real-time validation feedback
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Validate individual field
    function validateSingleField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (field.id) {
            case 'name':
                if (!value || value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value || value.length < 5) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 5 characters';
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }
        
        return isValid;
    }
    
    // Show field-specific error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.style.cssText = `
            color: #c33;
            font-size: 12px;
            display: block;
            margin-top: 4px;
        `;
        errorSpan.textContent = message;
        
        field.style.borderColor = '#c33';
        field.parentNode.appendChild(errorSpan);
    }
    
    // Clear field error
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }
    
    // Character counter for message field
    if (messageInput) {
        const maxLength = messageInput.getAttribute('maxlength') || 500;
        const counterDiv = document.createElement('div');
        counterDiv.className = 'char-counter';
        counterDiv.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-top: 4px;
        `;
        
        messageInput.parentNode.appendChild(counterDiv);
        
        messageInput.addEventListener('input', function() {
            const remaining = maxLength - this.value.length;
            counterDiv.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counterDiv.style.color = '#c33';
            } else {
                counterDiv.style.color = '#666';
            }
        });
        
        // Initialize counter
        const remaining = maxLength - messageInput.value.length;
        counterDiv.textContent = `${remaining} characters remaining`;
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .submit-btn {
            transition: all 0.3s ease;
        }
        
        .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        input, textarea {
            transition: border-color 0.3s ease;
        }
        
        input:focus, textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
        }
    `;
    document.head.appendChild(style);
});