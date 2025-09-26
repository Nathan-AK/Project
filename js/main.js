// Main page JavaScript functionality

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

    // Learn More button functionality
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Smooth scroll to about section or redirect to about page
            window.location.href = 'aboutus.html';
        });
    }

    // Charging image hover effects
    const chargingImage = document.querySelector('.charging-image');
    if (chargingImage) {
        chargingImage.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        chargingImage.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    }

    // Login button functionality
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    // Background animation enhancement
    const circles = document.querySelectorAll('.bg-circle');
    circles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 2}s`;
    });

    // Smooth scrolling for internal links
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

    // Add loading animation
    const container = document.querySelector('.container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.3;
            circle.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Responsive navigation for mobile
    function handleResponsiveNav() {
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (window.innerWidth <= 600) {
            navMenu.style.flexDirection = 'column';
            navMenu.style.gap = '0.5rem';
            navLinks.forEach(link => {
                link.style.padding = '0.5rem 1rem';
                link.style.textAlign = 'center';
            });
        } else {
            navMenu.style.flexDirection = 'row';
            navMenu.style.gap = '3rem';
            navLinks.forEach(link => {
                link.style.padding = '0.5rem 1rem';
                link.style.textAlign = 'left';
            });
        }
    }

    // Initial check and event listener for responsive nav
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);

    // Add interactive hover effects to buttons
    const buttons = document.querySelectorAll('button, .learn-more-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('Voltrix Main Page Loaded Successfully!');
});