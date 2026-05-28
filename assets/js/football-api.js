/* football-api.js - Barça Fixtures & Stats */

document.addEventListener('DOMContentLoaded', () => {
  const apiKey = window.portfolioData?.config?.football_api_key;
  if (!apiKey || apiKey === 'skip') {
    renderStaticFootball();
    return;
  }

  // Fetch from football-data.org (requires proxy for CORS usually)
  // For now, render static as fallback
  renderStaticFootball();
});

function renderStaticFootball() {
  const container = document.querySelector('.interests-grid');
  if (!container) return;

  const card = document.createElement('div');
  card.className = 'interest-card glass-card';
  card.innerHTML = `
    <div class="card-badge">Since Always</div>
    <h3 class="card-title">FC Barcelona</h3>
    <p>Football taught me systems thinking. Tiki-taka isn't just football — it's distributed architecture.</p>
    <div class="football-status">Proud supporter since day one.</div>
  `;
  container.appendChild(card);
}
