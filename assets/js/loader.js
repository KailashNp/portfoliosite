/* loader.js - Portfolio Data Loading and Initial Setup */

sessionStorage.removeItem('portfolioLoaded');
sessionStorage.removeItem('loaderShown');

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/portfolio.json')
    .then(response => response.json())
    .then(data => {
      window.portfolioData = data;
      initializeApp(data);
      startLoadingSequence();
    })
    .catch(error => {
      console.error('Error loading portfolio data:', error);
      startLoadingSequence();
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

function startLoadingSequence() {
  console.log('Loader start: Checking state');
  try {
    const hasVisited = sessionStorage.getItem('knp_visited');
    const loader = document.getElementById('loader');
    const skipBtn = document.getElementById('loader-skip');
    
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        console.log('Loader: skip clicked');
        revealSite();
      });
      // Show skip after 3s
      setTimeout(() => skipBtn.style.opacity = '0.4', 3000);
    }

    if (hasVisited === '1') {
      console.log('Loader: skipping cinematic (returning visitor)');
      if (loader) {
        loader.style.transition = 'opacity 0.3s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
          loader.remove();
        }, 300);
      }
      document.body.classList.add('loaded');
      document.body.style.overflow = 'auto';
      if (window.startAnimations) window.startAnimations();
      return;
    }
    
    sessionStorage.setItem('knp_visited', '1');
    console.log('Loader phase 1: Spanish Phrase');
    
    const phase1 = document.getElementById('phase1');
    const phase3 = document.getElementById('phase3');
    const phase4 = document.getElementById('phase4');
    const shardsContainer = document.getElementById('loader-shards-container');
    const innerContent = document.getElementById('loader-content-inner');
    const canvas = document.getElementById('universe-canvas');
    
    let ctx, oscillator, gainNode;

    // Optional Audio
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = 60;
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
      }
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
    
    // Optional Canvas
    let particles = [];
    let animationFrame;
    let isImploding = false;

    if (canvas) {
      try {
        ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const colors = ['#A50044', '#004D98', '#FFFFFF', '#CCCCCC'];
          for (let i = 0; i < 300; i++) {
            particles.push({
              x: canvas.width / 2,
              y: canvas.height / 2,
              radius: Math.random() * 2 + 0.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              velocity: { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 },
              alpha: 1
            });
          }
        }
      } catch (e) { console.error('Canvas setup failed:', e); }
    }

    function drawParticles() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        if (!isImploding) {
          p.x += p.velocity.x; p.y += p.velocity.y;
          p.velocity.x *= 0.98; p.velocity.y *= 0.98;
          const dx = p.x - canvas.width / 2;
          const dy = p.y - canvas.height / 2;
          p.x += dy * 0.02; p.y -= dx * 0.02;
        } else {
          p.x += (canvas.width / 2 - p.x) * 0.1;
          p.y += (canvas.height / 2 - p.y) * 0.1;
          p.alpha -= 0.05;
        }
      });
      animationFrame = requestAnimationFrame(drawParticles);
    }

    // PHASE 1: Spanish Phrase (0s - 4s)
    if (phase1) {
      phase1.classList.remove('hidden');
      gsap.fromTo(phase1.querySelector('h2'), {opacity: 0}, {opacity: 0.5, duration: 1.2});
      gsap.fromTo(phase1.querySelector('p'), {opacity: 0}, {opacity: 0.3, duration: 1.2, delay: 0.4});
      // Fade out phase 1 at 3.7s
      gsap.to(phase1, {opacity: 0, duration: 0.3, delay: 3.7, onComplete: () => phase1.classList.add('hidden')});
    }
    
    // PHASE 2: Particles (Starts at 4s, Duration 3.5s)
    setTimeout(() => {
      console.log('Loader phase 2: particles');
      if (ctx) drawParticles();
      if (gainNode) { try { gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1); } catch(e){} }
      if (loader) gsap.to(loader, {scale: 1.02, duration: 0.8, yoyo: true, repeat: 1, ease: 'power1.inOut'});
    }, 4000);
    
    // PHASE 3: Quote (Starts at 6s, Duration 11s)
    setTimeout(() => {
      console.log('Loader phase 3: quote');
      if (phase3) {
        phase3.classList.remove('hidden');
        const l1 = phase3.querySelector('.loader-quote');
        const l2 = phase3.querySelector('.loader-quote-line2');
        const attr = phase3.querySelector('.loader-attrib');
        
        gsap.fromTo(l1, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 1});
        gsap.fromTo(l2, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 1, delay: 2.5}); // 1.5s hold + 1s fade
        gsap.fromTo(attr, {opacity: 0}, {opacity: 1, duration: 1, delay: 3.0});
        
        // Fade out everything at 10s (of this phase)
        gsap.to(phase3, {opacity: 0, duration: 1, delay: 10, onComplete: () => phase3.classList.add('hidden')});
      }
    }, 6000);
    
    // PHASE 4: Identity (Starts at 17s, Duration 2s)
    setTimeout(() => {
      console.log('Loader phase 4: identity');
      isImploding = true;
      if (gainNode) { try { gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1); } catch(e){} }
      
      setTimeout(() => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (phase4) {
          phase4.classList.remove('hidden');
          const polygon = document.getElementById('knp-loader-svg').querySelector('polygon');
          const length = polygon.getTotalLength();
          polygon.style.strokeDasharray = length;
          polygon.style.strokeDashoffset = length;
          gsap.to(polygon, {strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut'});
          
          const nameEl = document.querySelector('.loader-name');
          const text = "KAILASH NARAYANA PRASAD";
          nameEl.textContent = '';
          let charIdx = 0;
          const typeInt = setInterval(() => {
            nameEl.textContent += text[charIdx++];
            if (charIdx >= text.length) {
              clearInterval(typeInt);
              const scan = document.querySelector('.scanline');
              if (scan) { scan.style.width = '100%'; scan.style.opacity = '1'; }
            }
          }, 30);
        }
      }, 300);
    }, 17000);
    
    // PHASE 5: Shatter (Starts at 19s)
    setTimeout(() => {
      console.log('Loader phase 5: shatter');
      if (phase4) phase4.classList.add('hidden');
      if (innerContent) innerContent.style.display = 'none';
      if (shardsContainer) {
        for (let i = 0; i < 12; i++) {
          const shard = document.createElement('div');
          shard.className = 'loader-shard';
          shard.style.clipPath = `polygon(${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%, ${Math.random()*100}% ${Math.random()*100}%)`;
          shard.style.backgroundColor = '#0a0a0a';
          shardsContainer.appendChild(shard);
          const angle = (Math.PI * 2 * i) / 12;
          const dist = 500 + Math.random() * 500;
          gsap.to(shard, {
            x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 360, opacity: 0,
            duration: 1.2, delay: i * 0.03, ease: 'power3.out'
          });
        }
      }
      setTimeout(revealSite, 800);
    }, 19000);

  } catch (e) {
    console.error('Loader crashed:', e);
    revealSite();
  }
}

function revealSite() {
  try {
    console.log('Loader complete: revealing site');
    const loader = document.getElementById('loader');
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
