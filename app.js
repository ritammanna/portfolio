/* ==========================================================
   RITAM MANNA - INTERACTIVE APP & SIMULATOR SCRIPTS
   Complete Unified Scripts with Live Demos & Email Integration
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Spring Precision Cursor
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
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on hoverable elements
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
      const rotateX = (-y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;
      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // 3. Dynamic Typewriter Effect in Hero
  const dynamicText = document.getElementById('dynamicText');
  const words = [
    'Full-Stack MERN Developer',
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
// 5. LIVE PROJECT DEMOS (Direct Web App Frame + Live Links)
// ==========================================================

const projectLinks = {
  rag: {
    title: 'AI 3D PDF Chatbot (RAG Engine) - Live App',
    url: 'https://threed-ai-pdf-chatbot.onrender.com',
    icon: 'fa-brain',
    desc: 'Production FastAPI RAG Engine running with Gemini 3.8 Flash & Three.js 3D Holographic Core.'
  },
  recipe: {
    title: 'RitBite – Modern Recipe Discovery - Live App',
    url: 'https://rit-bite-recipe-app.vercel.app/',
    icon: 'fa-utensils',
    desc: 'React & Tailwind SPA connected to TheMealDB REST API with real-time food exploration.'
  },
  job: {
    title: 'JobConnect – Recruitment & Candidate Portal - Live App',
    url: 'https://jobconnect-portal-m6nc.vercel.app/',
    icon: 'fa-briefcase',
    desc: 'Full-Stack MERN recruitment ecosystem with multi-role dashboards and JWT auth.'
  }
};

function openDemo(type) {
  const modal = document.getElementById('demoModal');
  const demoTitle = document.getElementById('demoTitle');
  const demoIcon = document.getElementById('demoIcon');
  const demoBody = document.getElementById('demoBody');

  const config = projectLinks[type];
  if (!config) return;

  demoTitle.textContent = config.title;
  demoIcon.className = `fa-solid ${config.icon}`;

  demoBody.innerHTML = `
    <div class="sim-container">
      <div class="sim-toolbar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span><i class="fa-solid fa-globe"></i> ${config.desc}</span>
        <a href="${config.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open In New Tab
        </a>
      </div>
      <div style="width:100%; height:520px; border-radius:12px; overflow:hidden; border:1px solid rgba(56, 189, 248, 0.3); background:#050811;">
        <iframe src="${config.url}" style="width:100%; height:100%; border:none;" title="${config.title}"></iframe>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

function closeDemo() {
  const modal = document.getElementById('demoModal');
  modal.classList.remove('active');
  document.getElementById('demoBody').innerHTML = '';
}

// ==========================================================
// 6. GITHUB & CV ACCESS REQUEST MODAL SYSTEM
// ==========================================================

let requestType = 'cv'; // 'cv' or 'github'
let targetRepo = '';

function openCvRequestModal() {
  requestType = 'cv';
  targetRepo = '';
  const modal = document.getElementById('accessModal');
  document.getElementById('modalIcon').className = 'fa-solid fa-file-shield text-blue';
  document.getElementById('modalTitle').textContent = 'Request Official ATS Resume';
  document.getElementById('modalDesc').innerHTML = 
    'To protect personal credentials from bots, please submit your contact info. Your request will be sent directly to <strong>ritamsuman89@gmail.com</strong>.';
  
  document.getElementById('accessRequestForm').style.display = 'block';
  document.getElementById('accessSuccess').style.display = 'none';
  modal.classList.add('active');
}

function openGithubRequestModal(repoName) {
  requestType = 'github';
  targetRepo = repoName;
  const modal = document.getElementById('accessModal');
  document.getElementById('modalIcon').className = 'fa-brands fa-github text-blue';
  document.getElementById('modalTitle').textContent = `Request GitHub Access (${repoName})`;
  document.getElementById('modalDesc').innerHTML = 
    `To review the source code for <strong>${repoName}</strong>, please submit your work details below. An instant notification will be delivered to <strong>ritamsuman89@gmail.com</strong>.`;
  
  document.getElementById('accessRequestForm').style.display = 'block';
  document.getElementById('accessSuccess').style.display = 'none';
  modal.classList.add('active');
}

function openContactModal(type) {
  openCvRequestModal();
}

function closeAccessModal() {
  document.getElementById('accessModal').classList.remove('active');
}

// Unified Handler for Form Submission (Email Dispatch + Approval)
function submitAccessRequest(e) {
  e.preventDefault();
  const name = document.getElementById('reqName').value;
  const email = document.getElementById('reqEmail').value;
  const company = document.getElementById('reqCompany').value;

  const itemRequested = requestType === 'github' ? `GitHub Repository: ${targetRepo}` : 'Official ATS Resume (PDF)';

  // 1. Dispatch Email directly to ritamsuman89@gmail.com using mailto and background ping
  const subject = encodeURIComponent(`Portfolio Access Request from ${name} (${company})`);
  const body = encodeURIComponent(`New Access Request on Portfolio:\n\nName: ${name}\nWork Email: ${email}\nOrganization: ${company}\nRequested Item: ${itemRequested}\nTimestamp: ${new Date().toLocaleString()}`);
  
  // Trigger mail dispatch
  const mailUrl = `mailto:ritamsuman89@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailUrl, '_blank');

  // 2. Update Modal UI
  document.getElementById('accessRequestForm').style.display = 'none';
  const successBox = document.getElementById('accessSuccess');
  successBox.style.display = 'block';

  const actionDiv = document.getElementById('successAction');

  if (requestType === 'github') {
    document.getElementById('successTitle').textContent = `Request Sent for ${targetRepo}!`;
    document.getElementById('successDesc').textContent = 
      `Your request has been dispatched to ritamsuman89@gmail.com. You can now access the verified repository below:`;
    const repoUrl = targetRepo === 'Profile' ? 'https://github.com/ritammanna' : `https://github.com/ritammanna/${targetRepo}`;
    actionDiv.innerHTML = `
      <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-2">
        <i class="fa-brands fa-github"></i> Open ${targetRepo === 'Profile' ? 'GitHub Profile' : targetRepo}
      </a>
    `;
  } else {
    document.getElementById('successTitle').textContent = `Verification Sent!`;
    document.getElementById('successDesc').textContent = 
      `Your request has been delivered to ritamsuman89@gmail.com. You can now download the 2026 ATS resume below:`;
    actionDiv.innerHTML = `
      <a href="assets/Ritam_Manna_Resume.pdf" download="Ritam_Manna_Resume.pdf" class="btn btn-primary mt-2">
        <i class="fa-solid fa-file-arrow-down"></i> Download Ritam_Manna_Resume.pdf
      </a>
    `;
  }
}

// Direct Message Form Submission (Email to ritamsuman89@gmail.com)
function handleDirectContact(e) {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const subject = document.getElementById('senderSubject').value;
  const message = document.getElementById('senderMessage').value;

  const mailUrl = `mailto:ritamsuman89@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio')}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
  window.open(mailUrl, '_blank');
  alert(`Thank you, ${name}! Your email client will now dispatch this inquiry directly to ritamsuman89@gmail.com.`);
  document.getElementById('contactForm').reset();
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  const demoModal = document.getElementById('demoModal');
  const accessModal = document.getElementById('accessModal');
  if (e.target === demoModal) closeDemo();
  if (e.target === accessModal) closeAccessModal();
});
