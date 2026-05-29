/* loader.js - Portfolio Data Loading and Initial Setup */

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/portfolio.json')
    .then(response => response.json())
    .then(data => {
      window.portfolioData = data;
      initializeApp(data);
    })
    .catch(error => {
      console.error('Error loading portfolio data:', error);
    });
});

function initializeApp(data) {
  try {
    const { profile, projects, leadership, certifications, skills } = data;
    document.title = `${profile.name} — Cybersecurity & AI/ML Engineer`;
    const statNumbers = document.querySelectorAll('.stat-item .number');
    if (statNumbers.length >= 3) {
      statNumbers[0].setAttribute('data-target', projects.length);
      statNumbers[1].setAttribute('data-target', certifications.length);
      statNumbers[2].setAttribute('data-target', parseFloat(profile.education.gpa));
    }
  } catch (e) {
    console.error('App initialization failed:', e);
  }
}

function revealSite() {
  try {
    console.log('Loader complete: revealing site');
    const loader = document.getElementById('cinematic-loader');
    if (loader) {
      loader.style.opacity = 0;
      setTimeout(() => { if (loader.parentNode) loader.remove(); }, 500);
    }
    document.body.classList.add('loaded');
    document.body.style.overflow = 'auto';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    if (window._portfolioFailsafe) clearTimeout(window._portfolioFailsafe);
    if (window.startAnimations) window.startAnimations();
    if (window.triggerGif) window.triggerGif('onSiteReveal');
    if (window.initFloatingTerminal) window.initFloatingTerminal();
  } catch (e) {
    console.error('revealSite failed:', e);
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.overflow = 'auto';
  }
}

