/* gif-system.js - Contextual Cinema Reactions Engine */

const GIF_MOMENTS = {
  onSiteReveal: {
    query: "suits harvey specter impressive",
    caption: '"Impressive." — Harvey Specter',
    show: "Suits",
    trigger: "loading-complete",
    position: "bottom-right",
    duration: 3500
  },
  onTypingComplete: {
    query: "sherlock benedict cumberbatch brilliant",
    caption: '"Oh, this is brilliant." — Sherlock',
    show: "Sherlock BBC",
    trigger: "typing-complete",
    position: "bottom-right",
    duration: 3000
  },
  onContactSuccess: {
    query: "brooklyn nine nine cool cool cool",
    caption: '"Cool cool cool cool cool." — Jake Peralta',
    show: "Brooklyn Nine-Nine",
    trigger: "form-success",
    position: "bottom-right",
    duration: 4000
  },
  onMenuOpen: {
    query: "better call saul door open",
    caption: '"After you." — Saul Goodman',
    show: "Better Call Saul",
    trigger: "menu-open",
    once: true,
    position: "top-right",
    duration: 2500
  },
  onTerminalOpen: {
    query: "sherlock deducing fast",
    caption: '"Elementary." — Sherlock Holmes',
    show: "Sherlock BBC",
    trigger: "terminal-open",
    position: "bottom-left",
    duration: 3000
  }
};

const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY_HERE'; // Will be replaced by loader data

window.triggerGif = function(momentKey) {
  const moment = GIF_MOMENTS[momentKey];
  if (!moment) return;
  if (moment.once && moment.triggered) return;

  const apiKey = window.portfolioData?.config?.giphy_api_key || 'dc6zaTOxFJmzC'; // Fallback to public beta key
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(moment.query)}&limit=1&rating=g`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        showGifCard(data.data[0].images.fixed_width.url, moment);
        moment.triggered = true;
      }
    })
    .catch(error => console.error('Giphy error:', error));
};

function showGifCard(gifUrl, moment) {
  const card = document.createElement('div');
  card.className = `gif-reaction-card ${moment.position}`;
  card.innerHTML = `
    <div class="gif-badge show-${moment.show.replace(/\s+/g, '-').toLowerCase()}">${moment.show}</div>
    <img src="${gifUrl}" alt="Reaction">
    <div class="gif-caption">${moment.caption}</div>
    <button class="gif-close">×</button>
  `;
  
  document.body.appendChild(card);

  // Animate in
  gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

  const closeBtn = card.querySelector('.gif-close');
  closeBtn.onclick = () => dismissCard(card);

  if (moment.duration > 0) {
    setTimeout(() => dismissCard(card), moment.duration);
  }
}

function dismissCard(card) {
  gsap.to(card, { y: 50, opacity: 0, duration: 0.5, ease: "power2.in", onComplete: () => card.remove() });
}
