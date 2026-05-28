/* stick-figures.js - anime.js Powered SVG Stick Figure Animations */

document.addEventListener('DOMContentLoaded', () => {
  initStickFigures();
});

function initStickFigures() {
  // Developer Figure
  createDeveloperFigure();
  
  // NCC Figure (Triggered on about section)
  ScrollTrigger.create({
    trigger: "#about",
    onEnter: () => animateNCCFigure()
  });
}

function createDeveloperFigure() {
  const container = document.querySelector('.hero-footer');
  if (!container) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "dev-figure");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.style.width = "80px";
  svg.style.position = "absolute";
  svg.style.bottom = "10px";
  svg.style.right = "20px";
  svg.style.opacity = "0.3";

  svg.innerHTML = `
    <path id="dev-body" d="M50,40 L50,70" stroke="var(--text-3)" stroke-width="2" fill="none" />
    <circle id="dev-head" cx="50" cy="30" r="5" stroke="var(--text-3)" stroke-width="2" fill="none" />
    <path id="dev-arms" d="M30,50 L50,45 L70,50" stroke="var(--text-3)" stroke-width="2" fill="none" />
    <path id="dev-legs" d="M40,90 L50,70 L60,90" stroke="var(--text-3)" stroke-width="2" fill="none" />
    <rect x="30" y="55" width="40" height="5" stroke="var(--text-3)" stroke-width="1" fill="none" />
  `;

  container.appendChild(svg);

  anime({
    targets: '#dev-arms',
    d: [
      { value: 'M30,52 L50,45 L70,52' },
      { value: 'M30,48 L50,45 L70,48' }
    ],
    duration: 300,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });
}

function animateNCCFigure() {
  // Similar logic for other figures...
}
