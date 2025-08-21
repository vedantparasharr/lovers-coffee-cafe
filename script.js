// ===== Enhanced JavaScript for Lovers Coffee Cafe - Bug Free Version ===== //

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        // ===== Initialize all features ===== //
        initLoadingAnimation();
        initScrollToTop();
        initFormHandling();
        initMenuInteractions();
        initCoffeeFacts();
        initTimeDisplay();
        
        // Clean up loading after everything is initialized
        setTimeout(() => {
            hideLoadingAnimation();
        }, 150);
    });
    
    // ===== Loading Animation ===== //
    function initLoadingAnimation() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="coffee-spinner"></div>';
        document.body.appendChild(loadingOverlay);
        
        // Store reference for later removal
        window.loadingOverlay = loadingOverlay;
    }
    
    function hideLoadingAnimation() {
        if (window.loadingOverlay) {
            window.loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (window.loadingOverlay && window.loadingOverlay.parentNode) {
                    window.loadingOverlay.parentNode.removeChild(window.loadingOverlay);
                }
                window.loadingOverlay = null;
            }, 200);
        }
    }
    
    // ===== Scroll to Top Button ===== //
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        let isVisible = false;
        
        // Throttled scroll handler for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(function() {
                const shouldShow = window.pageYOffset > 300;
                
                if (shouldShow && !isVisible) {
                    scrollBtn.classList.add('visible');
                    isVisible = true;
                } else if (!shouldShow && isVisible) {
                    scrollBtn.classList.remove('visible');
                    isVisible = false;
                }
            }, 10);
        });
        
        // Smooth scroll to top
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== Form Handling ===== //
    function initFormHandling() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });

    form.addEventListener('submit', function handler(e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(function(input) {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        // Show sending message
        showMessage('✅ Sending your message...', 'success');

        // Remove this event listener to avoid re-trigger
        form.removeEventListener('submit', handler);

        // Submit the form normally (trigger actual submit)
        form.submit();
    } else {
        showMessage('❌ Please fix the errors and try again.', 'error');
        form.classList.add('shake');
        setTimeout(function() {
            form.classList.remove('shake');
        }, 300);
    }
});

}

    
    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
        }
        
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    // Message display function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-popup');
        existingMessages.forEach(function(msg) {
            msg.remove();
        });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Trigger animation
        setTimeout(function() {
            messageDiv.classList.add('show');
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(function() {
            messageDiv.classList.remove('show');
            setTimeout(function() {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 4000);
    }
    
    // ===== Menu Interactions ===== //
    function initMenuInteractions() {
        const menuRows = document.querySelectorAll('table tbody tr');
        menuRows.forEach(function(row) {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // ===== Coffee Facts Carousel ===== //
    function initCoffeeFacts() {
        // Only run on index page
        if (!document.getElementById('about')) return;
        
        const coffeeFacts = [
            "☕ Coffee is the world's second most traded commodity after oil!",
            "🌍 Finland consumes the most coffee per capita in the world.",
            "🍒 Coffee beans are actually seeds from coffee cherries.",
            "📈 The average coffee drinker consumes 3 cups per day.",
            "🐐 Coffee was discovered by an Ethiopian goat herder named Kaldi.",
            "💘 Coffee houses were called 'Schools of the Wise' in the Ottoman Empire.",
            "⚡ Instant coffee was invented in 1901 by Japanese scientist Kato Satori."
        ];
        
        const factsContainer = document.createElement('div');
        factsContainer.className = 'coffee-facts';
        
        const factText = document.createElement('p');
        factsContainer.appendChild(factText);
        
        const aboutSection = document.getElementById('about');
        aboutSection.appendChild(factsContainer);
        
        let currentFactIndex = 0;
        
        function updateFact() {
            factText.style.opacity = '0';
            setTimeout(function() {
                factText.textContent = coffeeFacts[currentFactIndex];
                factText.style.opacity = '1';
                currentFactIndex = (currentFactIndex + 1) % coffeeFacts.length;
            }, 300);
        }
        
        // Initialize first fact
        updateFact();
        
        // Update fact every 5 seconds
        setInterval(updateFact, 5000);
    }
    
    // ===== Time Display for Hours Page ===== //
    function initTimeDisplay() {
        // Only run on hours page
        const hoursContainer = document.querySelector('dl');
        if (!hoursContainer) return;
        
        const timeDiv = document.createElement('div');
        timeDiv.style.cssText = `
            background: linear-gradient(135deg, #6f4e37, #8d6e63);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 4px 15px rgba(111, 78, 55, 0.2);
            font-size: 1.1rem;
        `;
        
        function updateTime() {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Kolkata'
            };
            
            timeDiv.innerHTML = `
                <strong>🕐 Current Time (IST):</strong><br>
                ${now.toLocaleDateString('en-IN', options)}
            `;
        }
        
        hoursContainer.parentNode.insertBefore(timeDiv, hoursContainer);
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // ===== Utility Functions ===== //
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add error handling for any uncaught errors
    window.addEventListener('error', function(e) {
        console.log('An error occurred:', e.error);
        // Gracefully handle errors without breaking the site
    });
    
})();
