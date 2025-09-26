// Add Funds Page JavaScript - Indonesian Rupiah Version
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    const addFundsBtn = document.getElementById('addFundsBtn');
    const selectedAmountSpan = document.getElementById('selectedAmount');
    const processingFeeSpan = document.getElementById('processingFee');
    const totalAmountSpan = document.getElementById('totalAmount');
    const currentBalanceSpan = document.getElementById('currentBalance');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const addedAmountSpan = document.getElementById('addedAmount');
    
    // Card input elements
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');
    
    // State variables
    let selectedAmount = 0;
    let currentBalance = 0;
    const processingFeeRate = 0.029; // 2.9% processing fee
    
    // Initialize
    loadCurrentBalance();
    
    // Format number to IDR currency
    function formatIDR(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Format number with thousand separators (no currency symbol)
    function formatNumber(amount) {
        return new Intl.NumberFormat('id-ID').format(amount);
    }
    
    // Load current balance (simulate from localStorage or API)
    function loadCurrentBalance() {
        // Simulate loading balance - in real app, this would come from API
        const savedBalance = localStorage.getItem('voltrixBalance');
        currentBalance = savedBalance ? parseFloat(savedBalance) : 0;
        updateBalanceDisplay();
    }
    
    function updateBalanceDisplay() {
        currentBalanceSpan.textContent = formatIDR(currentBalance);
    }
    
    // Amount button selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('selected'));
            // Add active class to clicked button
            this.classList.add('selected');
            // Clear custom amount
            customAmountInput.value = '';
            // Set selected amount
            selectedAmount = parseFloat(this.dataset.amount);
            updateTotals();
            validateForm();
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        // Remove selection from amount buttons
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        // Set selected amount
        selectedAmount = parseFloat(this.value) || 0;
        updateTotals();
        validateForm();
    });
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
            validateForm();
        });
    });
    
    // Card number formatting
    cardNumber.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
        this.value = formattedValue;
        validateForm();
    });
    
    // Expiry date formatting
    expiryDate.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value;
        validateForm();
    });
    
    // CVV validation
    cvv.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        validateForm();
    });
    
    // Card name validation
    cardName.addEventListener('input', function() {
        validateForm();
    });
    
    // Update totals
    function updateTotals() {
        const processingFee = selectedAmount * processingFeeRate;
        const total = selectedAmount + processingFee;
        
        selectedAmountSpan.textContent = formatIDR(selectedAmount);
        processingFeeSpan.textContent = formatIDR(processingFee);
        totalAmountSpan.textContent = formatIDR(total);
    }
    
    // Form validation
    function validateForm() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        let isValid = selectedAmount >= 10000; // Minimum Rp 10,000
        
        if (selectedPayment === 'card') {
            const cardNumberValid = cardNumber.value.replace(/\s/g, '').length >= 13;
            const expiryValid = expiryDate.value.length === 5;
            const cvvValid = cvv.value.length >= 3;
            const nameValid = cardName.value.trim().length >= 2;
            
            isValid = isValid && cardNumberValid && expiryValid && cvvValid && nameValid;
        }
        
        addFundsBtn.disabled = !isValid;
    }
    
    // Add funds button click
    addFundsBtn.addEventListener('click', function() {
        if (!this.disabled) {
            processPayment();
        }
    });
    
    // Process payment
    function processPayment() {
        // Show loading state
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        addFundsBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            // Update balance
            currentBalance += selectedAmount;
            localStorage.setItem('voltrixBalance', currentBalance.toString());
            updateBalanceDisplay();
            
            // Show success modal
            addedAmountSpan.textContent = formatIDR(selectedAmount);
            successModal.style.display = 'flex';
            
            // Reset form
            resetForm();
            
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            addFundsBtn.disabled = false;
        }, 2000);
    }
    
    // Reset form
    function resetForm() {
        // Clear amount selection
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        customAmountInput.value = '';
        selectedAmount = 0;
        
        // Reset payment method to card
        document.querySelector('input[value="card"]').checked = true;
        cardDetails.style.display = 'block';
        
        // Clear card details
        cardNumber.value = '';
        expiryDate.value = '';
        cvv.value = '';
        cardName.value = '';
        
        // Update totals
        updateTotals();
        validateForm();
    }
    
    // Close modal
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Keyboard support for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'flex') {
            successModal.style.display = 'none';
        }
    });
    
    // Input field animations and interactions
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Custom amount input restrictions - adjusted for IDR
    customAmountInput.addEventListener('input', function() {
        let value = parseFloat(this.value);
        if (value > 100000000) { // Max Rp 100,000,000
            this.value = '100000000';
            selectedAmount = 100000000;
        } else if (value < 0) {
            this.value = '';
            selectedAmount = 0;
        }
        updateTotals();
        validateForm();
    });
    
    // Add visual feedback for successful operations
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(74, 222, 128, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 3000;
            backdrop-filter: blur(10px);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Enhanced payment processing with different payment methods
    function processPaymentMethod(method) {
        switch(method) {
            case 'card':
                return simulateCardPayment();
            case 'dana':
                return simulateDanaPayment();
            case 'gopay':
                return simulateGopayPayment();
            case 'ovo':
                return simulateOvoPayment();
            case 'shopeepay':
                return simulateShopeePayPayment();
            case 'bank':
                return simulateBankTransferPayment();
            default:
                return Promise.resolve(true);
        }
    }
    
    function simulateCardPayment() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate card validation
                const cardNum = cardNumber.value.replace(/\s/g, '');
                if (cardNum.startsWith('4111')) {
                    resolve(false); // Simulate declined card
                } else {
                    resolve(true);
                }
            }, 1500);
        });
    }
    
    function simulateDanaPayment() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
        });
    }
    
    function simulateGopayPayment() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 800);
        });
    }
    
    function simulateOvoPayment() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 800);
        });
    }
    
    function simulateShopeePayPayment() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 900);
        });
    }
    
    function simulateBankTransferPayment() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 2000);
        });
    }
    
    // Enhanced process payment with error handling
    async function processPayment() {
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        addFundsBtn.disabled = true;
        
        try {
            const success = await processPaymentMethod(selectedPayment);
            
            if (success) {
                currentBalance += selectedAmount;
                localStorage.setItem('voltrixBalance', currentBalance.toString());
                updateBalanceDisplay();
                
                addedAmountSpan.textContent = formatIDR(selectedAmount);
                successModal.style.display = 'flex';
                resetForm();
                showNotification('Saldo berhasil ditambahkan!', 'success');
            } else {
                showNotification('Pembayaran gagal. Silakan coba lagi.', 'error');
            }
        } catch (error) {
            showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            addFundsBtn.disabled = false;
        }
    }
    
    // Format input amount with thousands separator as user types
    customAmountInput.addEventListener('input', function() {
        let value = this.value.replace(/[^\d]/g, ''); // Remove non-digits
        if (value) {
            // Format with thousands separator
            let formatted = new Intl.NumberFormat('id-ID').format(parseInt(value));
            this.value = formatted;
            selectedAmount = parseInt(value);
        } else {
            selectedAmount = 0;
        }
        
        // Remove selection from amount buttons
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        updateTotals();
        validateForm();
    });
    
    // Initialize form validation on page load
    validateForm();
});