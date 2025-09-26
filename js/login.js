// Login page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Form validation and submission
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Demo credentials for testing
    const validCredentials = {
        email: 'user@voltrix.com',
        password: 'voltrix123'
    };

    // Alternative credentials
    const altCredentials = {
        email: 'admin@voltrix.com',
        password: 'admin123'
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate inputs
        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            return;
        }
        
        // Check credentials
        if ((email === validCredentials.email && password === validCredentials.password) ||
            (email === altCredentials.email && password === altCredentials.password) ||
            (email === 'user@example.com' && password === 'password123')) {
            
            // Save login state if remember me is checked
            if (rememberCheckbox.checked) {
                localStorage.setItem('voltrixRememberUser', email);
            }
            
            showSuccess('Login successful! Redirecting...');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'map.html';
            }, 1500);
            
        } else {
            showError('Invalid email or password.');
        }
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(message) {
        removeExistingMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background-color: #ff4757;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        `;
        
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Show success message
    function showSuccess(message) {
        removeExistingMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            background-color: #2ed573;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        `;
        
        loginForm.insertBefore(successDiv, loginForm.firstChild);
    }

    // Remove existing error/success messages
    function removeExistingMessages() {
        const existingMessages = loginForm.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Social login handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.className.includes('google') ? 'Google' : 
                           this.className.includes('apple') ? 'Apple' : 'Facebook';
            
            showError(`${platform} login is not implemented yet. Use email login instead.`);
        });
    });

    // Forgot password handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = prompt('Enter your email address for password reset:');
        if (email && validateEmail(email)) {
            showSuccess('Password reset link sent to your email!');
        } else if (email) {
            showError('Please enter a valid email address');
        }
    });

    // Check for remembered user
    const rememberedUser = localStorage.getItem('voltrixRememberUser');
    if (rememberedUser) {
        emailInput.value = rememberedUser;
        rememberCheckbox.checked = true;
        passwordInput.focus();
    }

    // Add loading animation on page load
    const container = document.querySelector('.login-container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    }, 100);

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            emailInput.value = '';
            passwordInput.value = '';
            rememberCheckbox.checked = false;
            removeExistingMessages();
        }
    });

    // Demo credentials helper
    // const helpText = document.createElement('div');
    // helpText.innerHTML = `
    //     <small style="color: #999; font-size: 12px; text-align: center; display: block; margin-top: 10px;">
    //         Demo: user@voltrix.com / voltrix123
    //     </small>
    // `;
    // document.querySelector('.register-link').appendChild(helpText);

    // console.log('Voltrix Login Page Loaded Successfully!');
});