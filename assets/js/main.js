/* main.js - Core UI Coordination and Small Components */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNavigation();
  initTyped();
  initLenis();
});

// IST Clock
function initClock() {
  const clockElement = document.getElementById('ist-clock');
  function updateClock() {
    const now = new Date();
    // Convert to IST
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    
    const hours = String(istTime.getHours()).padStart(2, '0');
    const minutes = String(istTime.getMinutes()).padStart(2, '0');
    const seconds = String(istTime.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds} IST`;
  }
  setInterval(updateClock, 1000);
  updateClock();
}

// Navigation behavior
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksList = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    menuToggle.classList.toggle('open');
    if (navLinksList.classList.contains('active')) {
      if (window.triggerGif) window.triggerGif('onMenuOpen');
    }
  });
}

// Hero Text Animation
function initTyped() {
  const options = {
    strings: [
      "Fraud Interception Engineer.",
      "NLP Researcher.",
      "Blockchain Developer.",
      "NCC Troop Captain.",
      "Future CISO."
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    onComplete: () => {
      if (window.triggerGif) window.triggerGif('onTypingComplete');
    }
  };

  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', options);
  }
}

// Smooth Scrolling
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Export startAnimations for loader.js
window.startAnimations = function() {
  // GSAP animations for entry
  gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
  });

  gsap.from(".hero-content > *", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.5,
    ease: "power3.out"
  });

  gsap.from(".hero-visual", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.8,
    ease: "elastic.out(1, 0.75)"
  });
};
