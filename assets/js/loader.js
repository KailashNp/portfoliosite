/* loader.js - Portfolio Data Loading and Initial Setup */

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
      // Fallback or error message
    });
});

function initializeApp(data) {
  const { profile, projects, leadership, certifications, skills } = data;

  // Set Page Title and Meta
  document.title = `${profile.name} — Cybersecurity & AI/ML Engineer`;

  // Populate Hero
  // (Typed.js handled in main.js)

  // Populate About
  const statNumbers = document.querySelectorAll('.stat-item .number');
  statNumbers[0].setAttribute('data-target', projects.length);
  statNumbers[1].setAttribute('data-target', certifications.length);
  statNumbers[2].setAttribute('data-target', parseFloat(profile.education.gpa));

  // Populate Projects (Operations)
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projects.forEach(project => {
      const projectCard = createProjectCard(project);
      projectsGrid.appendChild(projectCard);
    });
  }

  // Populate Skills (Arsenal)
  const skillsBento = document.getElementById('skills-bento');
  if (skillsBento) {
    createSkillsBento(skills, skillsBento);
  }
  
  // Populate Timeline (Journey)
  const timelineItems = document.getElementById('timeline-items');
  if (timelineItems) {
    // Merge leadership and education into a timeline
    const events = [
      ...leadership.map(l => ({ ...l, type: 'experience' })),
      {
        title: profile.education.degree,
        subtitle: profile.education.institution,
        period: `2023–${profile.education.expected.split(' ')[1]}`,
        description: `GPA: ${profile.education.gpa} | Expected: ${profile.education.expected}`,
        type: 'education'
      }
    ].sort((a, b) => {
      const yearA = parseInt(a.period.split('–')[0]) || 0;
      const yearB = parseInt(b.period.split('–')[0]) || 0;
      return yearB - yearA;
    });

    events.forEach(event => {
      const item = createTimelineItem(event);
      timelineItems.appendChild(item);
    });
  }

  // Populate Certifications
  const certsContainer = document.getElementById('certs-container');
  if (certsContainer) {
    certifications.forEach(cert => {
      const certCard = createCertCard(cert);
      certsContainer.appendChild(certCard);
    });
  }

  // Populate Resume Preview
  const resumeContent = document.getElementById('resume-content');
  if (resumeContent) {
    resumeContent.innerHTML = createResumeHTML(data);
  }
}

function createProjectCard(project) {
  const div = document.createElement('div');
  div.className = `project-card glass-card ${project.type.toLowerCase()}`;
  div.setAttribute('data-type', project.type.toLowerCase());
  div.innerHTML = `
    <div class="project-mission">MISSION: ${project.mission}</div>
    <div class="project-status">${project.status ? `● ${project.status}` : ''}</div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-subtitle">${project.subtitle}</p>
    <p class="project-desc">${project.description}</p>
    <div class="project-tech">
      ${project.tech.map(t => `<span>${t}</span>`).join('')}
    </div>
    <div class="project-links">
      <a href="#" class="btn-link">Details →</a>
    </div>
  `;
  return div;
}

function createTimelineItem(event) {
  const div = document.createElement('div');
  div.className = 'timeline-item';
  div.innerHTML = `
    <div class="timeline-dot"></div>
    <div class="timeline-content glass-card">
      <span class="timeline-period">${event.period}</span>
      <h4 class="timeline-title">${event.title}</h4>
      ${event.subtitle ? `<h5 class="timeline-subtitle">${event.subtitle}</h5>` : ''}
      <p class="timeline-desc">${event.description}</p>
    </div>
  `;
  return div;
}

function createCertCard(cert) {
  const div = document.createElement('div');
  div.className = 'cert-card glass-card';
  div.innerHTML = `
    <h4 class="cert-title">${cert.title}</h4>
    <p class="cert-issuer">${cert.issuer}</p>
  `;
  return div;
}

function createResumeHTML(data) {
  const { profile, projects, certifications, skills, leadership } = data;
  return `
    <div class="resume-header">
      <h2>${profile.name.toUpperCase()}</h2>
      <p>${profile.email} · ${profile.phone} · ${profile.location}</p>
    </div>
    <div class="resume-section">
      <h3>EDUCATION</h3>
      <div class="resume-item">
        <strong>${profile.education.degree} | ${profile.education.institution} | ${profile.education.expected.split(' ')[1]}</strong>
        <p>GPA: ${profile.education.gpa}</p>
      </div>
    </div>
    <div class="resume-section">
      <h3>PROJECTS</h3>
      ${projects.map(p => `
        <div class="resume-item">
          <strong>${p.title}</strong>
          <p>${p.description}</p>
        </div>
      `).join('')}
    </div>
    <div class="resume-section">
      <h3>SKILLS</h3>
      <p><strong>Languages:</strong> ${skills.languages.join(', ')}</p>
      <p><strong>Security:</strong> ${skills.security.join(', ')}</p>
    </div>
  `;
}

function startLoadingSequence() {
  const hasVisited = sessionStorage.getItem('knp_visited');
  const loader = document.getElementById('loader');
  
  if (hasVisited) {
    // Skip to hero with quick fade
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.add('loaded');
      if (window.startAnimations) window.startAnimations();
      initFloatingTerminal();
    }, 200);
    return;
  }
  
  sessionStorage.setItem('knp_visited', 'true');
  
  // PHASE 1: Darkness + Spanish Phrase (0s - 1.2s)
  const phase1 = document.getElementById('phase1');
  const phase3 = document.getElementById('phase3');
  const phase4 = document.getElementById('phase4');
  const shardsContainer = document.getElementById('loader-shards-container');
  const innerContent = document.getElementById('loader-content-inner');
  const canvas = document.getElementById('universe-canvas');
  const ctx = canvas.getContext('2d');
  
  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Ambient Sound (Sine wave, 60Hz)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 60;
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  
  // Particles setup
  const particles = [];
  const numParticles = 300;
  const colors = ['#A50044', '#004D98', '#FFFFFF', '#CCCCCC'];
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * (Math.random() * 10),
        y: (Math.random() - 0.5) * (Math.random() * 10)
      },
      alpha: 1
    });
  }

  let animationFrame;
  let isImploding = false;

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      
      if (!isImploding) {
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.velocity.x *= 0.98; // friction
        p.velocity.y *= 0.98;
        
        // Circular orbit logic (constellation)
        const dx = p.x - canvas.width / 2;
        const dy = p.y - canvas.height / 2;
        p.x += dy * 0.02;
        p.y -= dx * 0.02;
      } else {
        // Implode towards center
        p.x += (canvas.width / 2 - p.x) * 0.1;
        p.y += (canvas.height / 2 - p.y) * 0.1;
        p.alpha -= 0.05;
      }
    });
    
    animationFrame = requestAnimationFrame(drawParticles);
  }

  // Sequence Timeline
  // 0s: Fade in Phase 1
  phase1.classList.remove('hidden');
  gsap.fromTo(phase1.querySelector('h2'), {opacity: 0}, {opacity: 0.5, duration: 1});
  gsap.fromTo(phase1.querySelector('p'), {opacity: 0}, {opacity: 0.3, duration: 1, delay: 0.4});
  
  // 1.2s: Particle Universe Forms
  setTimeout(() => {
    phase1.classList.add('hidden');
    drawParticles();
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1);
    
    // Page pulse
    gsap.to(loader, {scale: 1.02, duration: 0.8, yoyo: true, repeat: 1, ease: 'power1.inOut'});
  }, 1200);
  
  // 2.2s: The Quote
  setTimeout(() => {
    phase3.classList.remove('hidden');
    gsap.fromTo(phase3.querySelector('.loader-quote'), {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8});
    gsap.fromTo(phase3.querySelector('.loader-quote-line2'), {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8, delay: 0.5});
    gsap.fromTo(phase3.querySelector('.loader-attrib'), {opacity: 0}, {opacity: 1, duration: 0.8, delay: 1});
  }, 2200);
  
  // 3.5s: Identity Reveal
  setTimeout(() => {
    gsap.to(phase3, {opacity: 0, duration: 0.5, onComplete: () => phase3.classList.add('hidden')});
    isImploding = true;
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
    
    setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      phase4.classList.remove('hidden');
      const logoSvg = document.getElementById('knp-loader-svg');
      const polygon = logoSvg.querySelector('polygon');
      const length = polygon.getTotalLength();
      polygon.style.strokeDasharray = length;
      polygon.style.strokeDashoffset = length;
      
      // Draw SVG
      gsap.to(polygon, {strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut'});
      
      // Type name
      const nameEl = document.querySelector('.loader-name');
      const text = "KAILASH NARAYANA PRASAD";
      nameEl.textContent = '';
      let charIdx = 0;
      const typeInt = setInterval(() => {
        nameEl.textContent += text[charIdx];
        charIdx++;
        if (charIdx >= text.length) {
          clearInterval(typeInt);
          document.querySelector('.scanline').style.width = '100%';
          document.querySelector('.scanline').style.opacity = '1';
        }
      }, 30);
    }, 300);
  }, 3500);
  
  // 4.5s: Shatter Reveal
  setTimeout(() => {
    phase4.classList.add('hidden');
    innerContent.style.display = 'none';
    
    // Create 12 shards
    for (let i = 0; i < 12; i++) {
      const shard = document.createElement('div');
      shard.className = 'loader-shard';
      // Random polygons
      const p1 = `${Math.random()*100}% ${Math.random()*100}%`;
      const p2 = `${Math.random()*100}% ${Math.random()*100}%`;
      const p3 = `${Math.random()*100}% ${Math.random()*100}%`;
      shard.style.clipPath = `polygon(${p1}, ${p2}, ${p3})`;
      shard.style.backgroundColor = '#0a0a0a';
      shardsContainer.appendChild(shard);
      
      const angle = (Math.PI * 2 * i) / 12;
      const dist = 500 + Math.random() * 500;
      
      gsap.to(shard, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rotation: (Math.random() - 0.5) * 360,
        opacity: 0,
        duration: 1.2,
        delay: i * 0.03,
        ease: 'power3.out'
      });
    }
    
    setTimeout(revealSite, 800);
  }, 4500);
}

function revealSite() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
  document.body.classList.add('loaded');
  
  if (window.startAnimations) window.startAnimations();
  if (window.triggerGif) window.triggerGif('onSiteReveal');
  initFloatingTerminal();
}

function initFloatingTerminal() {
  setTimeout(() => {
    const toast = document.getElementById('terminal-toast');
    if (toast) {
      toast.classList.remove('hidden');
      toast.classList.add('slide-up');
      setTimeout(() => {
        toast.classList.remove('slide-up');
        toast.classList.add('fade-out');
        setTimeout(() => toast.style.display = 'none', 500);
      }, 5000);
    }
  }, 3000);
}

