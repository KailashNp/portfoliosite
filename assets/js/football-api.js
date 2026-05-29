/* football-api.js - Barça Fixtures & Stats */

document.addEventListener('DOMContentLoaded', () => {
  const apiKey = window.portfolioData?.apis?.football;
  if (!apiKey || apiKey === 'skip') {
    renderStaticFootball();
    return;
  }

  // Attempt fetch if API key exists
  fetch('https://api.football-data.org/v4/teams/81', {
      headers: { 'X-Auth-Token': apiKey }
  })
  .then(res => res.json())
  .then(data => renderDynamicFootball(data))
  .catch(err => {
      console.warn("Football API failed:", err);
      renderStaticFootball();
  });
});

function getBarcaCardHTML(widgetHTML = '') {
  return `
    <div class="interest-card glass-card blaugrana-tint-card" style="position: relative; overflow: hidden;">
      <div style="position: absolute; top: -20px; right: -20px; opacity: 0.1;">
        <svg viewBox="0 0 100 100" width="120" height="120">
          <path d="M10,20 Q50,0 90,20 L90,60 Q50,100 10,60 Z" fill="none" stroke="currentColor" stroke-width="4" />
          <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" stroke-width="8" stroke-dasharray="10 10" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="8" stroke-dasharray="10 10" />
          <line x1="80" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="8" stroke-dasharray="10 10" />
        </svg>
      </div>
      <h3 class="card-title">FC BARCELONA</h3>
      <p style="font-family: var(--font-display); font-size: 1.2rem; margin: 10px 0 5px 0;">"Un culer para siempre."</p>
      <p style="font-size: 0.85rem; color: var(--text-3); font-style: italic;">(A Barça fan, forever.)</p>
      ${widgetHTML}
    </div>
  `;
}

function renderStaticFootball() {
  const container = document.querySelector('.interests-grid');
  if (!container) return;

  const card = document.createElement('div');
  card.innerHTML = getBarcaCardHTML();
  container.appendChild(card.firstElementChild);
}

function renderDynamicFootball(data) {
  const container = document.querySelector('.interests-grid');
  if (!container) return;
  
  // Note: this assumes we fetched the team info or matches. 
  // If we fetched team info (id 81), we might just show basic info or last match.
  // Assuming a generic widget string for now if data is valid
  const widget = `
    <div class="football-widget" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
      <div class="mono terminal-green" style="font-size: 0.8rem;">> Connected to FCB Data</div>
    </div>
  `;
  
  const card = document.createElement('div');
  card.innerHTML = getBarcaCardHTML(widget);
  container.appendChild(card.firstElementChild);
}
