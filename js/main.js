/* ═══════════════════════════════════════════════════════════════════════════════
   APOLLO AgriGuard - Premium JavaScript Interactions
   Smooth scrolling, animations, analytics, and dynamic elements
═════════════════════════════════════════════════════════════════════════════════ */

// Smooth Scroll to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Trigger animation class
      if (entry.target.classList.contains('fade-in-on-scroll')) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section, .feature-card, .tech-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
  let current = '';
  
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(current) && current) {
      link.classList.add('active');
    }
  });
});

// Navbar Sticky Effect with Backdrop Blur
let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
  const current = parseInt(element.innerText);
  const increment = (target - current) / (duration / 16);
  let count = current;

  const updateCount = () => {
    count += increment;
    if (count >= target) {
      element.innerText = target;
    } else {
      element.innerText = Math.floor(count);
      requestAnimationFrame(updateCount);
    }
  };

  updateCount();
}

// Trigger Counter Animation When Stats Come Into View
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector('.number');
      if (numberElement && !numberElement.dataset.animated) {
        const targetNumber = parseInt(numberElement.innerText);
        animateCounter(numberElement, targetNumber);
        numberElement.dataset.animated = 'true';
      }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.success-stat').forEach(stat => {
  statObserver.observe(stat);
});

// Mobile Menu Toggle (if implemented)
const createMobileMenu = () => {
  const nav = document.querySelector('nav');
  if (nav && window.innerWidth <= 768) {
    // Add mobile menu functionality here
  }
};

window.addEventListener('resize', createMobileMenu);
window.addEventListener('load', createMobileMenu);

// Parallax Scroll Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (hero) {
    const scrollY = window.scrollY;
    const heroElements = hero.querySelectorAll('.hero::before, .hero::after');
    hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
  }
});

// Form Validation (for future contact forms)
const validateForm = (formElement) => {
  const inputs = formElement.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#d9534f';
      isValid = false;
    } else {
      input.style.borderColor = 'var(--neutral-bg)';
    }
  });

  return isValid;
};

// Smooth Page Transitions
window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0.8';
  document.body.style.transition = 'opacity 0.3s ease';
});

// Loading Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or menus
    const modals = document.querySelectorAll('[data-modal="open"]');
    modals.forEach(modal => {
      modal.dataset.modal = 'closed';
    });
  }
});

// Analytics Tracking (for future integration)
const trackEvent = (eventName, data = {}) => {
  // Integration point for Google Analytics or similar
  console.log(`Event: ${eventName}`, data);
};

// Track Button Clicks
document.querySelectorAll('[class*="btn"]').forEach(button => {
  button.addEventListener('click', () => {
    trackEvent('button_click', {
      text: button.innerText,
      class: button.className
    });
  });
});

// Track Navigation Clicks
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('nav_click', {
      href: link.getAttribute('href')
    });
  });
});

// Lazy Load Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Accessibility: Improve Focus Styles
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';

// Performance: Use RequestAnimationFrame for Smooth Animations
const createSmoothScroll = (target, duration = 1000) => {
  const startPosition = window.scrollY;
  const targetPosition = target.offsetTop;
  const distance = targetPosition - startPosition;
  let start = null;

  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

// Export utility functions for global use
window.ApolloUtils = {
  validateForm,
  trackEvent,
  createSmoothScroll,
  animateCounter
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Apollo AgriGuard - Premium Site Loaded');
  
  // Add loading complete class
  document.body.classList.add('loaded');
  
  // Initialize any components
  initializeComponents();
});

// Component Initialization
function initializeComponents() {
  // Initialize tooltips
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = el.dataset.tooltip;
      document.body.appendChild(tooltip);
      
      const rect = el.getBoundingClientRect();
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      
      el.addEventListener('mouseleave', () => {
        tooltip.remove();
      });
    });
  });
}

// Window Resize Handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
  }, 250);
});

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to register service worker
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Scroll to Top Button (if needed)
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: var(--primary-green);
    color: white;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: var(--shadow-lg);
  `;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    } else {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Uncomment to show scroll to top button
  // document.body.appendChild(button);
};

createScrollToTopButton();

// Debug Mode (for development)
if (window.location.hash === '#debug') {
  window.DEBUG = true;
  console.log('%cApollo AgriGuard Debug Mode Enabled', 'color: #F5A842; font-weight: bold; font-size: 14px;');
}

// Log performance metrics
if (window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page Load Time: ${pageLoadTime}ms`);
  });
}
