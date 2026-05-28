/* animations.js - GSAP and ScrollTrigger Sequences */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  
  initScrollAnimations();
});

function initScrollAnimations() {
  // Reveal sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    gsap.from(section.querySelectorAll('.section-header > *'), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  });

  // Stat counters
  const numbers = document.querySelectorAll('.stat-item .number');
  numbers.forEach(num => {
    const target = parseFloat(num.getAttribute('data-target'));
    const isDecimal = num.getAttribute('data-target').includes('.');
    
    gsap.to(num, {
      scrollTrigger: {
        trigger: num,
        start: "top 90%",
      },
      innerText: target,
      duration: 2,
      snap: { innerText: isDecimal ? 0.01 : 1 },
      ease: "power2.out"
    });
  });

  // Project cards stagger
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: "#operations",
      start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Timeline circuit drawing (simulation)
  gsap.from(".timeline-dot", {
    scrollTrigger: {
      trigger: "#journey",
      start: "top 50%",
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.3,
    ease: "back.out(1.7)"
  });
}
