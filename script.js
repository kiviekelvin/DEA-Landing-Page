// Countdown Timer

document.addEventListener("DOMContentLoaded", function() {
  // Set the sale end date
  const saleEnd = new Date('2025-10-15T23:59:00'); // use ISO format!

  const daysEl = document.getElementById('dayss');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date();
    const diff = saleEnd - now; // ms difference

    if (diff <= 0) {
      clearInterval(interval);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial update
  updateTimer();
  // Update every second
  const interval = setInterval(updateTimer, 1000);
});




// Smooth Scrolling
function scrollToSignup() {
    const signupSection = document.getElementById('signup');
    if (signupSection) {
        signupSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Video Modal
function openVideo() {
    const modal = document.getElementById('videoModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = button.classList.contains('active');

    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.parentElement.querySelector('.faq-answer').classList.remove('active');
    });

    // Toggle current FAQ
    if (!isActive) {
        button.classList.add('active');
        answer.classList.add('active');
    }
}

// Form Submission
function initForm() {
    const form = document.getElementById('signupForm');
    const submitButton = form.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const buttonArrow = submitButton.querySelector('.button-arrow');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonArrow.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            country: document.getElementById('country').value,
            source: document.getElementById('source').value
        };

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real application, you would send this data to your server
        console.log('Form submitted:', formData);

        // Redirect to checkout (in real app, this would be your payment processor)
        alert('Thank you! Redirecting to secure checkout...');
        
        // Reset form state
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonArrow.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        
        // In a real app, redirect to payment page
        // window.location.href = '/checkout';
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.value-item, .why-item, .feature-item, .testimonial-card, .trust-badge'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Sticky Header Effect
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'none';
            header.style.backgroundColor = '#ffffff';
        }

        lastScrollY = currentScrollY;
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const amplitude = 10 + (index * 5);
        
        let start = Date.now();
        
        function animate() {
            const elapsed = Date.now() - start;
            const y = Math.sin(elapsed * 0.001 * speed) * amplitude;
            element.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Testimonial Carousel (if needed)
function initTestimonialEffects() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    testimonials.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = '1';
        });
    });
}

// Social Proof Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes video modal
        if (e.key === 'Escape') {
            closeVideo();
        }
        
        // Enter key on CTA buttons
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });
}

// Performance Optimization
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // In production, you might want to send this to an error tracking service
    });
    
    // Handle form validation errors
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.target.style.borderColor = '#dc2626';
            e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
        });
        
        input.addEventListener('input', (e) => {
            if (e.target.validity.valid) {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
            }
        });
    });
}

// Analytics Tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, you would send this to your analytics service
    console.log('Event tracked:', eventName, properties);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
}

// Track important user interactions
function initAnalytics() {
    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', {
                button_text: button.textContent.trim(),
                page_section: button.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track form submission
    document.getElementById('signupForm').addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_type: 'signup'
        });
    });
    
    // Track video play
    document.querySelector('[onclick="openVideo()"]').addEventListener('click', () => {
        trackEvent('video_play', {
            video_type: 'how_it_works'
        });
    });
    
    // Track FAQ interactions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            trackEvent('faq_click', {
                question: question.textContent.trim()
            });
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initForm();
    initAnimations();
    initStickyHeader();
    initFloatingElements();
    initTestimonialEffects();
    initKeyboardNavigation();
    initLazyLoading();
    initErrorHandling();
    initAnalytics();
    
    // Add smooth scrolling to all anchor links
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
    
    console.log('Digital Entrepreneur Academy landing page initialized successfully!');
});

// Handle page visibility changes (for pausing animations when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use in other scripts
window.DigitalEntrepreneurAcademy = {
    scrollToSignup,
    openVideo,
    closeVideo,
    toggleFAQ,
    trackEvent
};