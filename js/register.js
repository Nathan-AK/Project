// Register page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Form elements
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const passwordStrength = document.getElementById('passwordStrength');

    // Form submission handler
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            terms: termsCheckbox.checked
        };
        
        // Validate form
        if (validateForm(formData)) {
            // Simulate registration success
            showSuccess('Registration successful! Redirecting to main page...');
            
            // Save user data to localStorage (demo purposes)
            localStorage.setItem('voltrixUser', JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                registeredAt: new Date().toISOString()
            }));
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
        }
    });

    // Form validation function
    function validateForm(data) {
        // Clear previous messages
        removeExistingMessages();
        
        // Name validation
        if (data.name.length < 2) {
            showError('Name must be at least 2 characters long');
            nameInput.focus();
            return false;
        }
        
        // Email validation
        if (!validateEmail(data.email)) {
            showError('Please enter a valid email address');
            emailInput.focus();
            return false;
        }
        
        // Phone validation
        if (!validatePhone(data.phone)) {
            showError('Please enter a valid phone number');
            phoneInput.focus();
            return false;
        }
        
        // Password validation
        if (data.password.length < 6) {
            showError('Password must be at least 6 characters long');
            passwordInput.focus();
            return false;
        }
        
        // Password confirmation
        if (data.password !== data.confirmPassword) {
            showError('Passwords do not match');
            confirmPasswordInput.focus();
            return false;
        }
        
        // Terms agreement
        if (!data.terms) {
            showError('You must agree to the terms and conditions');
            termsCheckbox.focus();
            return false;
        }
        
        return true;
    }

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation
    function validatePhone(phone) {
        const phoneRegex = /^\d{8,15}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        passwordStrength.className = `password-strength ${strength}`;
        
        if (password.length === 0) {
            passwordStrength.className = 'password-strength';
        }
    });

    function checkPasswordStrength(password) {
        let score = 0;
        
        // Length
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        
        // Character types
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }

    // Real-time validation feedback
    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ff4757';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ff4757';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        if (this.value && this.value !== passwordInput.value) {
            this.style.borderColor = '#ff4757';
        } else {
            this.style.borderColor = '#ddd';
        }
    });

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        registerForm.insertBefore(errorDiv, registerForm.firstChild);
        
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
        successDiv.textContent = message;
        
        registerForm.insertBefore(successDiv, registerForm.firstChild);
    }

    // Remove existing messages
    function removeExistingMessages() {
        const existingMessages = registerForm.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }

    // Social registration handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.className.includes('google') ? 'Google' : 
                           this.className.includes('apple') ? 'Apple' : 'Facebook';
            
            showError(`${platform} registration is not implemented yet. Use email registration instead.`);
        });
    });

    // Terms and privacy links
    const termsLink = document.querySelector('.terms-link');
    const privacyLink = document.querySelector('.privacy-link');
    
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terms and Conditions:\n\n1. Use of Voltrix services is subject to eligibility\n2. Users must provide accurate information\n3. Account security is user responsibility\n4. Service availability may vary by location\n5. Terms subject to change with notice');
    });
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Privacy Policy:\n\n1. We collect necessary information for service provision\n2. Personal data is protected and encrypted\n3. We do not sell personal information to third parties\n4. Cookies are used to improve user experience\n5. Users can request data deletion at any time');
    });

    // Input formatting
    nameInput.addEventListener('input', function() {
        // Capitalize first letter of each word
        this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
    });

    phoneInput.addEventListener('input', function() {
        // Remove non-numeric characters
        this.value = this.value.replace(/\D/g, '');
    });

    // Focus effects for form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Page load animation
    const container = document.querySelector('.register-container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    }, 100);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form (if not in textarea)
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON' && document.activeElement.type !== 'checkbox') {
            e.preventDefault();
            registerForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            if (confirm('Clear all form data?')) {
                registerForm.reset();
                removeExistingMessages();
                passwordStrength.className = 'password-strength';
            }
        }
    });

    // Form auto-save (draft)
    const formInputs = [nameInput, emailInput, phoneInput];
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const draftData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value
            };
            localStorage.setItem('voltrixRegisterDraft', JSON.stringify(draftData));
        });
    });

    // Load draft data
    const draftData = localStorage.getItem('voltrixRegisterDraft');
    if (draftData) {
        try {
            const draft = JSON.parse(draftData);
            if (draft.name) nameInput.value = draft.name;
            if (draft.email) emailInput.value = draft.email;
            if (draft.phone) phoneInput.value = draft.phone;
        } catch (e) {
            console.log('Could not load draft data');
        }
    }

    // Clear draft on successful registration
    registerForm.addEventListener('submit', function() {
        setTimeout(() => {
            localStorage.removeItem('voltrixRegisterDraft');
        }, 1000);
    });

    // Country code change handler
    const countryCode = document.getElementById('countryCode');
    countryCode.addEventListener('change', function() {
        const phoneInput = document.getElementById('phone');
        phoneInput.placeholder = this.value === '+62' ? 'Enter Your Phone Number' :
                                this.value === '+1' ? 'Enter US Phone Number' :
                                this.value === '+44' ? 'Enter UK Phone Number' :
                                'Enter IN Phone Number';
    });

    // Password visibility toggle (could be added to HTML)
    function addPasswordToggle(inputId) {
        const input = document.getElementById(inputId);
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '👁️';
        toggleBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
        `;
        
        input.parentElement.style.position = 'relative';
        input.style.paddingRight = '40px';
        input.parentElement.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '🙈';
            } else {
                input.type = 'password';
                this.innerHTML = '👁️';
            }
        });
    }

    // Add password toggles();
    // addPasswordToggle('password');
    // addPasswordToggle('confirmPassword');

    console.log('Voltrix Register Page Loaded Successfully!');
});