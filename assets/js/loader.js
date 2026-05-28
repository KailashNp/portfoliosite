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
  const bootText = document.getElementById('boot-text');
  const lines = [
    "> SYSTEM BOOT v2.0.27 ................................ [OK]",
    "> Initializing neural interface ..................... [OK]",
    "> Loading threat signature database ................ [OK]",
    "> Profile identified: KAILASH NARAYANA PRASAD ...... [OK]",
    "> Clearance level: AUTHORIZED ...................... [OK]",
    "> Establishing connection .......................... [OK]",
    "> Welcome, visitor. ................................ [OK]"
  ];

  let currentLine = 0;
  function typeLine() {
    if (currentLine < lines.length) {
      const p = document.createElement('p');
      bootText.appendChild(p);
      
      let charIndex = 0;
      const line = lines[currentLine];
      
      const interval = setInterval(() => {
        p.textContent += line[charIndex];
        charIndex++;
        if (charIndex === line.length) {
          clearInterval(interval);
          currentLine++;
          setTimeout(typeLine, 100);
        }
      }, 10);
    } else {
      setTimeout(revealSite, 500);
    }
  }

  typeLine();
}

function createSkillsBento(skills, container) {
  // Mapping categories to bento layout
  const categories = [
    { name: 'SECURITY', data: skills.security, size: 'span-4' },
    { name: 'LANGUAGES', data: skills.languages, size: 'span-8' },
    { name: 'AI/ML/NLP', data: skills.soft_skills, size: 'span-6' }, // Reusing soft skills as placeholder for NLP/ML if not separated
    { name: 'TOOLS', data: skills.tools, size: 'span-6' }
  ];

  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = `bento-card glass-card ${cat.size}`;
    card.innerHTML = `
      <h4 class="cat-name">${cat.name}</h4>
      <ul class="cat-list">
        ${cat.data.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    container.appendChild(card);
  });
}

function revealSite() {
  const loader = document.getElementById('loader');
  
  gsap.to(loader, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
      loader.style.display = 'none';
      document.body.classList.add('loaded');
      // Trigger animations
      if (window.startAnimations) window.startAnimations();
      // Trigger GIPHY reaction
      if (window.triggerGif) window.triggerGif('onSiteReveal');
    }
  });
}
