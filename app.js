/* ==========================================================
   RITAM MANNA - INTERACTIVE APP & SIMULATOR SCRIPTS
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Spring Sci-Fi Cursor Follower
  const mouseGlow = document.getElementById('mouseGlow');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
    if (mouseGlow) {
      mouseGlow.style.left = `${mouseX}px`;
      mouseGlow.style.top = `${mouseY}px`;
    }
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .glass-card, input, textarea');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) cursorRing.classList.add('hover-active');
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) cursorRing.classList.remove('hover-active');
    });
  });

  // 2. 3D Card Tilt for Profile Hologram
  const tiltCard = document.getElementById('profileTilt');
  if (tiltCard) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 22;
      const rotateY = (x / rect.width) * 22;
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 3. Dynamic Typewriter Effect in Hero
  const dynamicText = document.getElementById('dynamicText');
  const words = [
    'MERN Stack Developer',
    'Generative AI Specialist',
    'RAG Pipeline Architect',
    'FastAPI & 3D WebGL Creator'
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeWriter() {
    if (!dynamicText) return;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      dynamicText.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      dynamicText.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === currentWord.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 300;
    }

    setTimeout(typeWriter, speed);
  }
  typeWriter();

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 8, 17, 0.95)';
        navLinks.style.borderRadius = '20px';
        navLinks.style.padding = '20px';
      }
    });
  }
});

// ==========================================================
// 5. LIVE INTERACTIVE PROJECT IFRAMES & DEMOS
// ==========================================================

const demoData = {
  rag: {
    title: 'AI 3D PDF Chatbot (RAG Engine) - Live App Demo',
    icon: 'fa-brain',
    liveUrl: 'https://threed-ai-pdf-chatbot.onrender.com',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-server"></i> Hosted on Render (FastAPI + Gemini 3.8 + Three.js)</span>
          <div style="display:flex; gap:10px; align-items:center;">
            <span style="color:#22c55e"><i class="fa-solid fa-circle"></i> Live Instance</span>
            <a href="https://threed-ai-pdf-chatbot.onrender.com" target="_blank" rel="noopener noreferrer" class="reveal-btn" style="text-decoration:none;">
              <i class="fa-solid fa-up-right-from-square"></i> Open Full Window
            </a>
          </div>
        </div>
        <div style="position:relative; width:100%; height:540px; background:#050811; border-radius:12px; overflow:hidden; border:1px solid rgba(56,189,248,0.3);">
          <iframe src="https://threed-ai-pdf-chatbot.onrender.com" style="width:100%; height:100%; border:none;" title="AI 3D PDF Chatbot"></iframe>
        </div>
      </div>
    `
  },

  recipe: {
    title: 'RitBite – Modern Recipe Discovery (Live React App)',
    icon: 'fa-utensils',
    liveUrl: 'https://rit-bite-recipe-app.vercel.app/',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-globe"></i> Hosted on Vercel (React 18 + Tailwind + TheMealDB API)</span>
          <div style="display:flex; gap:10px; align-items:center;">
            <span style="color:#00d2ff"><i class="fa-solid fa-circle"></i> Live Vercel App</span>
            <a href="https://rit-bite-recipe-app.vercel.app/" target="_blank" rel="noopener noreferrer" class="reveal-btn" style="text-decoration:none;">
              <i class="fa-solid fa-up-right-from-square"></i> Open Full Window
            </a>
          </div>
        </div>
        <div style="position:relative; width:100%; height:540px; background:#050811; border-radius:12px; overflow:hidden; border:1px solid rgba(236,72,153,0.3);">
          <iframe src="https://rit-bite-recipe-app.vercel.app/" style="width:100%; height:100%; border:none;" title="RitBite Recipe App"></iframe>
        </div>
      </div>
    `
  },

  job: {
    title: 'JobConnect – Recruitment & Candidate Portal (Live App)',
    icon: 'fa-briefcase',
    liveUrl: 'https://jobconnect-portal-m6nc.vercel.app/',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-database"></i> Hosted on Vercel (Full-Stack MERN Architecture)</span>
          <div style="display:flex; gap:10px; align-items:center;">
            <span style="color:#22c55e"><i class="fa-solid fa-circle"></i> Live Platform</span>
            <a href="https://jobconnect-portal-m6nc.vercel.app/" target="_blank" rel="noopener noreferrer" class="reveal-btn" style="text-decoration:none;">
              <i class="fa-solid fa-up-right-from-square"></i> Open Full Window
            </a>
          </div>
        </div>
        <div style="position:relative; width:100%; height:540px; background:#050811; border-radius:12px; overflow:hidden; border:1px solid rgba(56,189,248,0.3);">
          <iframe src="https://jobconnect-portal-m6nc.vercel.app/" style="width:100%; height:100%; border:none;" title="JobConnect Portal"></iframe>
        </div>
      </div>
    `
  }
};

function openDemo(type) {
  const modal = document.getElementById('demoModal');
  const demoTitle = document.getElementById('demoTitle');
  const demoIcon = document.getElementById('demoIcon');
  const demoBody = document.getElementById('demoBody');

  const config = demoData[type];
  if (!config) return;

  demoTitle.textContent = config.title;
  demoIcon.className = `fa-solid ${config.icon}`;
  demoBody.innerHTML = config.render();
  modal.classList.add('active');
}

function closeDemo() {
  const modal = document.getElementById('demoModal');
  const demoBody = document.getElementById('demoBody');
  if (demoBody) demoBody.innerHTML = '';
  modal.classList.remove('active');
}

// ==========================================================
// 6. CV DOWNLOAD & REVEAL MODAL LOGIC
// ==========================================================

function openResumeModal() {
  document.getElementById('resumeModal').classList.add('active');
}

function closeResumeModal() {
  document.getElementById('resumeModal').classList.remove('active');
}

function handleCvDownload(e) {
  e.preventDefault();
  const name = document.getElementById('reqName').value;
  const company = document.getElementById('reqCompany').value;
  document.getElementById('cvRequestForm').style.display = 'none';
  const successBox = document.getElementById('cvSuccess');
  successBox.style.display = 'block';
  successBox.querySelector('h4').textContent = `Welcome, ${name} (${company})!`;
}

// ==========================================================
// 7. GATED GITHUB REQUEST MODAL LOGIC
// ==========================================================

let pendingGithubUrl = 'https://github.com/ritammanna';

function openGithubRequest(targetUrl) {
  if (targetUrl) pendingGithubUrl = targetUrl;
  const modal = document.getElementById('githubModal');
  if (modal) modal.classList.add('active');
}

function closeGithubModal() {
  const modal = document.getElementById('githubModal');
  if (modal) modal.classList.remove('active');
}

function handleGithubUnlock(e) {
  e.preventDefault();
  const name = document.getElementById('ghReqName').value;
  const email = document.getElementById('ghReqEmail').value;
  
  // Submit request info to Formspree silently in background
  try {
    fetch('https://formspree.io/f/xvgqkjjn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: `GitHub Access Request from ${name}`,
        name: name,
        email: email,
        requested_repo: pendingGithubUrl
      })
    });
  } catch (err) {}

  document.getElementById('githubRequestForm').style.display = 'none';
  const successBox = document.getElementById('ghSuccess');
  successBox.style.display = 'block';
  successBox.querySelector('a').href = pendingGithubUrl;
}

// ==========================================================
// 8. DIRECT CONTACT FORM WITH REAL EMAIL DELIVERY (FORMSPREE)
// ==========================================================

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = form.querySelector('button[type="submit"]');
  const originalBtnText = btn.innerHTML;
  
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;
  btn.disabled = true;

  const data = {
    name: document.getElementById('senderName').value,
    email: document.getElementById('senderEmail').value,
    subject: document.getElementById('senderSubject').value,
    message: document.getElementById('senderMessage').value
  };

  try {
    const res = await fetch('https://formspree.io/f/xvgqkjjn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert(`Thank you, ${data.name}! Your message has been sent directly to Ritam Manna's inbox. He will reply to you shortly.`);
      form.reset();
    } else {
      // Fallback mailto
      window.location.href = `mailto:ritammanna@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent('From: ' + data.name + ' (' + data.email + ')\n\n' + data.message)}`;
    }
  } catch (err) {
    window.location.href = `mailto:ritammanna@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent('From: ' + data.name + ' (' + data.email + ')\n\n' + data.message)}`;
  } finally {
    btn.innerHTML = originalBtnText;
    btn.disabled = false;
  }
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  const demoModal = document.getElementById('demoModal');
  const resumeModal = document.getElementById('resumeModal');
  const githubModal = document.getElementById('githubModal');
  if (e.target === demoModal) closeDemo();
  if (e.target === resumeModal) closeResumeModal();
  if (e.target === githubModal) closeGithubModal();
});
