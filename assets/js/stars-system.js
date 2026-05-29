/* stars-system.js - Historical Moments Scattered Across the Portfolio */

class StarsSystem {
  constructor(stars) {
    this.stars = stars;
    this.activeTooltip = null;
    this.init();
  }

  init() {
    // Filter stars for mobile if screen is small
    const isMobile = window.innerWidth <= 768;
    const starsToRender = isMobile ? this.stars.filter((_, i) => [0, 1, 3, 5, 7, 8, 9, 11].includes(i)) : this.stars;

    starsToRender.forEach((star, index) => {
      const el = this.createStar(star, index);
      document.body.appendChild(el);
    });

    window.addEventListener('resize', () => {
      // Simple debounce or just let it be for now as stars are fixed %
    });
  }

  createStar(star, index) {
    const div = document.createElement('div');
    div.className = 'floating-star';
    div.innerHTML = star.shape || '✦';
    
    const color = this.getColor(star.color);
    
    div.style.cssText = `
      position: fixed;
      top: ${star.position.top || 'auto'};
      left: ${star.position.left || 'auto'};
      right: ${star.position.right || 'auto'};
      bottom: ${star.position.bottom || 'auto'};
      font-size: ${10 + Math.random() * 6}px;
      color: ${color};
      cursor: pointer;
      z-index: 50;
      animation: star-pulse ${2.5 + index * 0.3}s ease-in-out infinite;
      transition: all 0.2s ease;
      text-shadow: 0 0 8px ${color};
      user-select: none;
    `;

    div.addEventListener('mouseenter', () => this.showTooltip(star, div));
    div.addEventListener('mouseleave', () => this.hideTooltip());
    
    div.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.showTooltip(star, div);
      setTimeout(() => this.hideTooltip(), 4000);
    }, { passive: false });

    return div;
  }

  showTooltip(star, anchor) {
    this.hideTooltip();

    const rect = anchor.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.className = 'star-tooltip';
    
    tooltip.innerHTML = `
      <div class="tooltip-badge-row">
        <span class="tooltip-badge">${star.date}</span>
        <span class="tooltip-badge">${star.competition}</span>
      </div>
      <div class="tooltip-title">${star.title}</div>
      <div class="tooltip-desc">${star.description}</div>
      <div class="tooltip-stat">${star.stat}</div>
      <div class="star-arrow"></div>
    `;

    document.body.appendChild(tooltip);
    this.activeTooltip = tooltip;

    // Position
    let left = rect.left + rect.width / 2 - 120;
    let top = rect.top - tooltip.offsetHeight - 15;

    // Viewport safety
    if (left < 10) left = 10;
    if (left + 240 > window.innerWidth) left = window.innerWidth - 250;
    
    if (top < 10) {
      top = rect.bottom + 15;
      tooltip.querySelector('.star-arrow').style.display = 'none'; // simple fix for flipped
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  hideTooltip() {
    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
    }
  }

  getColor(name) {
    const map = {
      crimson: '#A50044', royal: '#004D98',
      gold: '#FFD700', yellow: '#FFCC00', orange: '#FF6600'
    };
    return map[name] || '#FFD700';
  }
}

const portfolioStars = [
  {
    date: "8 March 2017",
    competition: "UEFA Champions League",
    title: "La Remontada",
    description: "Sergio Roberto. 95th minute. Camp Nou erupts. 6–1.",
    stat: "6 — 1",
    color: "crimson",
    position: { top: "18%", left: "88%" }
  },
  {
    date: "17 April 2021",
    competition: "Copa del Rey Final",
    title: "Ankara Messi",
    description: "He picked it up near halfway. Nobody stopped him. Nobody could.",
    stat: "Goal № 672",
    color: "gold",
    position: { top: "35%", left: "6%" }
  },
  {
    date: "6 May 2015",
    competition: "Champions League",
    title: "The Touch",
    description: "Busquets. One touch. Nutmeg. Messi through on goal. That's it.",
    stat: "Barça 3 — 0 Bayern",
    color: "royal",
    position: { top: "52%", right: "7%" }
  },
  {
    date: "23 April 2017",
    competition: "El Clásico",
    title: "That Celebration",
    description: "93rd minute. Real Madrid. He stood still. Shirt off. The number 10.",
    stat: "93' ⚽",
    color: "gold",
    position: { top: "67%", left: "5%" }
  },
  {
    date: "19 July 2022",
    competition: "FC Barcelona",
    title: "Lewandowski Blaugrana",
    description: "Robert Lewandowski signed for FC Barcelona. A new era begins.",
    stat: "№ 9",
    color: "crimson",
    position: { top: "78%", right: "9%" }
  },
  {
    date: "27 May 2009",
    competition: "Champions League Final",
    title: "El Triplete",
    description: "La Liga. Copa del Rey. Champions League. Pep's first season. Historic.",
    stat: "Treble 2009",
    color: "gold",
    position: { top: "25%", right: "5%" }
  },
  {
    date: "19 December 2009",
    competition: "Club World Cup",
    title: "El Sextete",
    description: "Six trophies in a single calendar year. Never done before. Never since.",
    stat: "6 Trophies",
    color: "royal",
    position: { top: "88%", left: "15%" }
  },
  {
    date: "11 July 2010",
    competition: "FIFA World Cup Final",
    title: "93:20",
    description: "Gràcies, Andrés. Some moments belong to everyone.",
    stat: "93' 20\"",
    color: "crimson",
    position: { top: "44%", left: "91%" }
  },
  {
    shape: "★",
    date: "2 April 2011",
    competition: "ICC World Cup Final",
    title: "The Helicopter Six",
    description: "India needed 4 off 1. Dhoni walked in. You know what happened.",
    stat: "SIX ✦",
    color: "yellow",
    position: { top: "15%", left: "12%" }
  },
  {
    shape: "★",
    date: "26 May 2023",
    competition: "IPL Final",
    title: "Five-Time Champions",
    description: "Back from the brink. Dhoni lifts another one. CSK forever.",
    stat: "5 Titles",
    color: "yellow",
    position: { top: "60%", left: "88%" }
  },
  {
    shape: "★",
    date: "24 September 2007",
    competition: "ICC T20 World Cup Final",
    title: "Joginder's Last Over",
    description: "Dhoni gave the last over to Joginder Sharma. Ice in his veins.",
    stat: "India WC 2007",
    color: "orange",
    position: { top: "72%", left: "78%" }
  },
  {
    shape: "★",
    date: "Various",
    competition: "International Cricket",
    title: "The Fastest Hands",
    description: "0.08 seconds. Bails off before anyone sees them move. Captain Cool.",
    stat: "0.08 sec",
    color: "yellow",
    position: { top: "30%", left: "3%" }
  },
  {
    shape: "★",
    date: "2018",
    competition: "IPL",
    title: "Whistle Podu",
    description: "Two years away. First game back. Sold-out stadium. Yellow everywhere.",
    stat: "IPL 2018 Return",
    color: "yellow",
    position: { top: "82%", right: "20%" }
  },
  {
    shape: "★",
    date: "11 April 2023",
    competition: "IPL 2023",
    title: "Thala Finishes It",
    description: "Last ball needed. Dhoni hit it into the stands. Turned 41. Didn't matter.",
    stat: "Last Ball ⚡",
    color: "orange",
    position: { top: "55%", left: "14%" }
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Delay star system slightly to not interfere with loader
  setTimeout(() => {
    new StarsSystem(portfolioStars);
  }, 5000);
});
