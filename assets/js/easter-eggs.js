/* easter-eggs.js - Interactive Secrets & Hidden Features */

const EASTER_EGGS = {
  'EE-01': {
    name: "Konami Code",
    trigger: "konami",
    action: triggerKonami
  },
  'EE-03': {
    name: "Fibonacci Click",
    trigger: "fibonacci",
    action: triggerFibonacci
  },
  'EE-11': {
    name: "Blaugrana Skin",
    trigger: "blaugrana-input",
    action: triggerBlaugranaSkin
  }
};

window.triggerEasterEgg = function(id) {
  if (EASTER_EGGS[id]) {
    EASTER_EGGS[id].action();
  }
};

// EE-01: Konami Code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiCode.length) {
      triggerKonami();
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }
});

function triggerKonami() {
  // CAPTAIN KAILASH MODE
  createConfetti();
  const alert = document.createElement('div');
  alert.className = 'konami-alert';
  alert.textContent = "Reporting for Duty, Sir!";
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.background = Math.random() > 0.5 ? 'var(--crimson)' : 'var(--royal)';
    confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// EE-03: Fibonacci Click
let fibCounter = 0;
const fibSequence = [1, 1, 2, 3, 5];
let fibIdx = 0;

// This would be attached to a specific element, e.g., the GPA number
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('number') && e.target.textContent === '8.82') {
    fibIdx++;
    if (fibIdx === fibSequence.length) {
      triggerFibonacci();
      fibIdx = 0;
    }
  }
});

function triggerFibonacci() {
  console.log("Pattern Detected: Fibonacci sequence confirmed.");
  // Trigger neural network visualization effect
}

// EE-11: Blaugrana Skin
function triggerBlaugranaSkin() {
  document.documentElement.style.setProperty('--border-default', 'rgba(165, 0, 68, 0.6)');
  document.documentElement.style.setProperty('--crimson-glow', 'rgba(165, 0, 68, 0.8)');
  document.documentElement.style.setProperty('--royal-glow', 'rgba(0, 77, 152, 0.8)');
}
