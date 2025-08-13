// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Tab functionality for accommodation section
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Change showcase image based on tab
            const showcaseImg = document.getElementById('showcase-img');
            if (showcaseImg) {
                const images = {
                    'bedrooms': 'https://oakhamptonpark.co.uk/uploads/four-posted-bed.jpg',
                    'living': 'https://oakhamptonpark.co.uk/uploads/hearth.jpg',
                    'dining': 'https://oakhamptonpark.co.uk/uploads/hearth.jpg'
                };
                if (images[tabId]) {
                    showcaseImg.src = images[tabId];
                }
            }
        });
    });

    // Hero gallery functionality
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.gallery-item').forEach(gallery => gallery.classList.remove('active'));
            this.classList.add('active');
            
            // Change hero background based on selected image
            const hero = document.querySelector('.hero');
            const images = {
                'main-lounge': 'https://oakhamptonpark.co.uk/uploads/hearth.jpg',
                'pool': 'https://oakhamptonpark.co.uk/uploads/pool-splash-resize.jpg',
                'snooker': 'https://oakhamptonpark.co.uk/uploads/snooker.jpg',
                'bedroom': 'https://oakhamptonpark.co.uk/uploads/four-posted-bed.jpg'
            };
            const imageType = this.getAttribute('data-image');
            if (images[imageType] && hero) {
                hero.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${images[imageType]}')`;
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }
        });
    });

    // Form submission
    const bookingForm = document.getElementById('booking-enquiry');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Simple validation
            if (!data.name || !data.email || !data.checkin || !data.checkout || !data.guests) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Check if checkout is after checkin
            const checkinDate = new Date(data.checkin);
            const checkoutDate = new Date(data.checkout);
            
            if (checkoutDate <= checkinDate) {
                alert('Check-out date must be after check-in date.');
                return;
            }
            
            // Success message
            alert('Thank you for your enquiry! We will contact you shortly to discuss your requirements and confirm availability.');
            
            // Reset form
            this.reset();
        });
    }

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Lazy loading for images with intersection observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading state to form button
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        
        document.getElementById('booking-enquiry')?.addEventListener('submit', function() {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Reset after 2 seconds (in real implementation, this would be after actual submission)
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.amenity-card, .location-item, .highlight-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Play tour function
function playTour() {
    // In a real implementation, this would open a 360° tour or video
    alert('Virtual tour would open here. This would typically integrate with a 360° tour provider like Matterport, Kuula, or similar service.');
}

// Set minimum date for booking form to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) {
        checkinInput.setAttribute('min', today);
        
        // Set checkout minimum to checkin date + 1 day when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            
            if (checkoutInput) {
                checkoutInput.setAttribute('min', minCheckout);
                
                // Clear checkout if it's before the new minimum
                if (checkoutInput.value && checkoutInput.value <= this.value) {
                    checkoutInput.value = '';
                }
            }
        });
    }
    
    if (checkoutInput) {
        checkoutInput.setAttribute('min', today);
    }
});

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img:not(.loaded) {
        opacity: 0;
    }
`;
document.head.appendChild(style);