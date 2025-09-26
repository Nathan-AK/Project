// About Us page JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            if (!this.href.includes('http')) {
                this.classList.add('active');
            }
        });
    });

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000) {
        let startTime = null;
        const startValue = 0;
        
        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                entry.target.classList.add('animate-in');
                
                // Handle stat counters
                if (entry.target.classList.contains('stats-section')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        setTimeout(() => {
                            animateCounter(stat, target);
                        }, index * 200);
                    });
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .mission-card, .values-section, .stats-section');
    animateElements.forEach(el => observer.observe(el));

    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .value-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .values-section.animate-in .value-card {
            opacity: 1;
            transform: translateY(0);
        }
        
        .values-section.animate-in .value-card:nth-child(1) { transition-delay: 0.1s; }
        .values-section.animate-in .value-card:nth-child(2) { transition-delay: 0.2s; }
        .values-section.animate-in .value-card:nth-child(3) { transition-delay: 0.3s; }
        .values-section.animate-in .value-card:nth-child(4) { transition-delay: 0.4s; }
        
        .stat-item {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.6s ease;
        }
        
        .stats-section.animate-in .stat-item {
            opacity: 1;
            transform: scale(1);
        }
        
        .stats-section.animate-in .stat-item:nth-child(1) { transition-delay: 0.1s; }
        .stats-section.animate-in .stat-item:nth-child(2) { transition-delay: 0.2s; }
        .stats-section.animate-in .stat-item:nth-child(3) { transition-delay: 0.3s; }
        .stats-section.animate-in .stat-item:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);

    // Enhanced value card interactions
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(94, 234, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Parallax effect for background circles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.bg-circle');
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Smooth scrolling for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Page load animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.transition = 'opacity 1s ease';
        container.style.opacity = '1';
        
        // Animate navigation
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.transform = 'translateY(-20px)';
        navMenu.style.opacity = '0';
        
        setTimeout(() => {
            navMenu.style.transition = 'all 0.6s ease';
            navMenu.style.transform = 'translateY(0)';
            navMenu.style.opacity = '1';
        }, 300);
    }, 100);

    // Interactive brand container
    const brandContainer = document.querySelector('.brand-container');
    if (brandContainer) {
        brandContainer.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = 'rgba(94, 234, 255, 0.2)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'rgba(94, 234, 255, 0.1)';
            }, 200);
        });
    }

    // Dynamic text effects
    const titles = document.querySelectorAll('.section-title, .mission-title, .values-title, .stats-title');
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(94, 234, 255, 0.8)';
            this.style.transform = 'scale(1.02)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });

    // Mobile touch interactions
    if ('ontouchstart' in window) {
        valueCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px) scale(1.01)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                }, 100);
            });
        });
    }

    // Add loading states and error handling
    function showLoadingState(element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }

    function hideLoadingState(element) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }

    // Performance optimization for scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.bg-circle');
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.15;
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Accessibility improvements
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #5eeaff';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add resize handler for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate animations if needed
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                if (stat.textContent !== '0') {
                    const target = parseInt(stat.getAttribute('data-target'));
                    stat.textContent = target.toLocaleString();
                }
            });
        }, 250);
    });

    // Debug mode for development
    if (window.location.search.includes('debug=true')) {
        console.log('About Us page debug mode enabled');
        
        // Add visual indicators for animation triggers
        const debugStyle = document.createElement('style');
        debugStyle.textContent = `
            .about-card, .mission-card, .values-section, .stats-section {
                border: 2px dashed rgba(255, 255, 0, 0.5) !important;
            }
        `;
        document.head.appendChild(debugStyle);
    }

    console.log('Voltrix About Us Page Loaded Successfully!');
});