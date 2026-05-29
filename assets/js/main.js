/* main.js - Core UI Coordination and Small Components */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNavigation();
  initTyped();
  initLenis();
  initAmbientShapes();
});

// Ambient Geometric Shapes
function initAmbientShapes() {
  const sections = document.querySelectorAll('section');
  const colors = ['#A50044', '#004D98'];
  
  sections.forEach(sec => {
    // Add 2-3 shapes per section
    const numShapes = Math.floor(Math.random() * 2) + 2;
    for (let i=0; i<numShapes; i++) {
      const size = 200 + Math.random() * 200;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      svg.setAttribute('viewBox', '0 0 200 200');
      svg.style.position = 'absolute';
      svg.style.width = size + 'px';
      svg.style.height = size + 'px';
      svg.style.top = Math.random() * 80 + 10 + '%';
      svg.style.left = Math.random() * 80 + 10 + '%';
      svg.style.opacity = '0.04';
      svg.style.zIndex = '-1';
      svg.style.pointerEvents = 'none';
      svg.style.animation = `floatShape ${8 + Math.random() * 4}s ease-in-out infinite alternate`;
      svg.style.animationDelay = `${Math.random() * -5}s`;
      
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', '100,5 190,52.5 190,147.5 100,195 10,147.5 10,52.5');
      polygon.setAttribute('fill', 'none');
      polygon.setAttribute('stroke', color);
      polygon.setAttribute('stroke-width', '2');
      
      svg.appendChild(polygon);
      sec.appendChild(svg);
    }
  });

  // Inject keyframes if not exists
  if (!document.getElementById('ambient-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ambient-keyframes';
    style.textContent = `
      @keyframes floatShape {
        0% { transform: translateY(-20px) rotate(0deg); }
        100% { transform: translateY(20px) rotate(15deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

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
      "Cybersecurity Engineer.",
      "AI & ML Researcher.",
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
  // Split text for hero title
  if (window.Splitting) {
    Splitting({ target: '.hero-title', by: 'chars' });
    gsap.from(".hero-title .char", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.out"
    });
  } else {
    gsap.from(".hero-title", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  }

  gsap.from(".hero-content > *:not(.hero-title)", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from(".hero-visual", {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: "elastic.out(1, 0.75)"
  });

  // CTA buttons sliding up
  gsap.from(".hero-actions .btn", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.8,
    ease: "back.out(1.5, 0.7)"
  });
};
