/* cursor.js - Custom Crosshair Cursor */

document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth ring follow
  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animate);
  }
  animate();

  // Interaction states
  const interactables = document.querySelectorAll('a, button, .project-card, .glass-card, select, input, textarea');
  
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'var(--cyan)';
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'var(--crimson)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
});
