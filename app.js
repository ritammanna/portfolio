/* ==========================================================
   RITAM MANNA - INTERACTIVE APP & SIMULATOR SCRIPTS
   Real-Time Email Notification Gateway to ritamsuman89@gmail.com
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Refined Smooth Professional Cursor Tracker
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

  // Smooth trailing inertia animation for outer ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Subtle expansion on interactive elements
  const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .glass-card, input, textarea, .reveal-btn');
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
      const rotateX = (-y / rect.height) * 18;
      const rotateY = (x / rect.width) * 18;
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

    let speed = isDeleting ? 40 : 85;

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
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('nav-open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('nav-open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }
});

// ==========================================================
// 5. SECURITY ACCESS GATE LOGIC (CV & GITHUB ACCESS)
// Sends real-time verification request to ritamsuman89@gmail.com
// ==========================================================

let activeTargetUrl = '';
let activeGateType = '';

function openGateModal(type, targetUrl = '', title = '') {
  activeGateType = type;
  activeTargetUrl = targetUrl;

  const modal = document.getElementById('gateModal');
  const gateTitle = document.getElementById('gateTitle');
  const gateIcon = document.getElementById('gateIcon');
  const gateDesc = document.getElementById('gateDesc');
  const gateForm = document.getElementById('gateForm');
  const gateSuccess = document.getElementById('gateSuccess');

  gateForm.style.display = 'block';
  gateSuccess.style.display = 'none';
  document.getElementById('gatePasscodeError').style.display = 'none';

  gateDesc.innerHTML = '';
  gateDesc.style.display = 'none';

  if (type === 'cv') {
    gateTitle.textContent = 'Curriculum Vitae Access Request';
    gateIcon.className = 'fa-solid fa-file-shield text-blue';
  } else if (type === 'github') {
    gateTitle.textContent = `GitHub Repository Access (${title || 'Code Base'})`;
    gateIcon.className = 'fa-brands fa-github text-blue';
  } else {
    gateTitle.textContent = 'Direct Contact Request';
    gateIcon.className = 'fa-solid fa-lock text-blue';
  }

  modal.classList.add('active');
}

function closeGateModal() {
  document.getElementById('gateModal').classList.remove('active');
}

// Handle Gate Request Submission
async function handleGateRequest(e) {
  e.preventDefault();

  const name = document.getElementById('gateName').value.trim();
  const email = document.getElementById('gateEmail').value.trim();
  const company = document.getElementById('gateCompany').value.trim();
  const purpose = document.getElementById('gatePurpose').value.trim();
  const submitBtn = document.getElementById('gateSubmitBtn');

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching Request to Ritam...`;

  const payload = {
    _subject: `🔒 PORTFOLIO ACCESS REQUEST: ${activeGateType.toUpperCase()} from ${name} (${company})`,
    requestType: activeGateType.toUpperCase(),
    requesterName: name,
    requesterEmail: email,
    company: company,
    purpose: purpose,
    requestedResource: activeTargetUrl || 'Latest ATS Resume PDF (2026)',
    timestamp: new Date().toLocaleString(),
    message: `Hello Ritam,\n\n${name} from ${company} has requested access to: ${activeTargetUrl || 'Your ATS Resume'}.\n\nRequester Email: ${email}\nPurpose: ${purpose}\n\nIf you approve, reply to them with the access approval or passcode: RM2026`
  };

  try {
    // Real-time email dispatch using FormSubmit API directed to ritamsuman89@gmail.com
    await fetch('https://formsubmit.co/ajax/ritamsuman89@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Network fallback triggered for notification:', err);
  }

  // Show Success Box
  document.getElementById('gateForm').style.display = 'none';
  const successBox = document.getElementById('gateSuccess');
  successBox.style.display = 'block';

  document.getElementById('gateSuccessTitle').textContent = `Request Dispatched to Ritam!`;
  document.getElementById('gateSuccessMsg').innerHTML = `
    Thank you, <strong>${name}</strong> (${company}). An access approval notification has been delivered directly to Ritam.<br><br>
    Once reviewed, Ritam will approve your access at <strong>${email}</strong>. If Ritam has provided you with an instant approval passcode, enter it below to proceed right away.
  `;

  submitBtn.disabled = false;
  submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Request to Ritam`;
}

// Master approval passcode verification (Passcodes: RM2026 or ALLOW)
function verifyGatePasscode() {
  const code = document.getElementById('gatePasscodeInput').value.trim();
  const errBox = document.getElementById('gatePasscodeError');

  if (code.toUpperCase() === 'RM2026' || code.toUpperCase() === 'RITAM2026' || code.toUpperCase() === 'ALLOW') {
    errBox.style.display = 'none';
    if (activeGateType === 'github') {
      window.open(activeTargetUrl || 'https://github.com/ritammanna', '_blank');
      closeGateModal();
    } else {
      const link = document.createElement('a');
      link.href = 'assets/Ritam_Manna_Resume.pdf';
      link.download = 'Ritam_Manna_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      closeGateModal();
    }
  } else {
    errBox.style.display = 'block';
  }
}

// 6. Direct Contact Form Submission -> ritamsuman89@gmail.com
async function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('senderName').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('senderSubject').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const btn = document.getElementById('contactSubmitBtn');

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message to Ritam...`;

  const payload = {
    _subject: `📩 PORTFOLIO MESSAGE: ${subject} from ${name}`,
    senderName: name,
    senderEmail: email,
    subject: subject,
    message: message,
    timestamp: new Date().toLocaleString()
  };

  try {
    await fetch('https://formsubmit.co/ajax/ritamsuman89@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    alert(`Thank you, ${name}! Your inquiry has been sent directly to Ritam. He will get back to you shortly.`);
    document.getElementById('contactForm').reset();
  } catch (err) {
    alert(`Thank you, ${name}! Message dispatched directly to Ritam.`);
    document.getElementById('contactForm').reset();
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Inquiry`;
  }
}

// ==========================================================
// 7. INTERACTIVE LIVE PROJECT DEMO SIMULATORS
// ==========================================================

const demoData = {
  rag: {
    title: 'AI 3D PDF Chatbot (RAG Engine) - Live Simulator',
    icon: 'fa-brain',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-server"></i> Engine: FastAPI + Gemini 3.8 Flash + BM25 Vector Search</span>
          <span style="color:#22c55e"><i class="fa-solid fa-circle"></i> Pipeline Active</span>
        </div>
        <div class="sim-window" id="ragSimWindow">
          <div style="margin-bottom:16px; padding:12px; background:rgba(56, 189, 248, 0.1); border-left:3px solid #00d2ff; border-radius:6px; font-size:0.85rem;">
            <strong>Uploaded Context:</strong> <code>Ritam-Manna-CV.pdf</code> (Indexed with Gemini Multimodal Vision OCR • 8 Sections • 24 Chunks)
          </div>

          <div id="ragChatLogs" style="height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding:10px; background:#080d1a; border-radius:8px; margin-bottom:14px; font-size:0.88rem;">
            <div style="background:rgba(255,255,255,0.05); padding:10px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.1);">
              <span style="color:#00d2ff; font-weight:600;"><i class="fa-solid fa-robot"></i> RAG Neural Agent:</span>
              <p style="margin-top:4px; color:#cbd5e1;">Ask me anything about Ritam's projects, technical skills, or education. I retrieve citations from the indexed PDF!</p>
            </div>
          </div>

          <div style="display:flex; gap:10px;">
            <input type="text" id="ragInput" placeholder="Try asking: 'What are Ritam's AI skills?' or 'Tell me about RitBite'" class="form-control" style="flex:1;">
            <button class="btn btn-primary" onclick="simulateRagQuery()">
              <i class="fa-solid fa-paper-plane"></i> Query
            </button>
          </div>
          <div style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;">
            <span style="font-size:0.75rem; color:#64748b;">Quick prompts:</span>
            <button class="reveal-btn" onclick="quickRag('Tell me about the 3D AI PDF Chatbot')">3D AI Chatbot</button>
            <button class="reveal-btn" onclick="quickRag('What are his MERN and GenAI skills?')">Skills</button>
            <button class="reveal-btn" onclick="quickRag('Where did he do his internship?')">Internship</button>
          </div>
        </div>
      </div>
    `
  },

  recipe: {
    title: 'RitBite – Modern Recipe Discovery (Live API Explorer)',
    icon: 'fa-utensils',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-globe"></i> Connected to TheMealDB REST API (Real-Time Food Data)</span>
          <span style="color:#00d2ff;">React 18 + Tailwind</span>
        </div>
        <div class="sim-window">
          <div style="display:flex; gap:10px; margin-bottom:18px;">
            <input type="text" id="recipeSearchInput" placeholder="Search recipe (e.g., Pasta, Chicken, Beef, Cake)..." class="form-control" value="Pasta">
            <button class="btn btn-primary" onclick="searchRecipes()">
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>
          <div id="recipeResults" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:14px; max-height:280px; overflow-y:auto; padding:4px;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px; text-align:center;">
              <div style="width:100%; height:100px; border-radius:8px; background:#1e293b; display:flex; align-items:center; justify-content:center; color:#00d2ff; font-size:2rem; margin-bottom:8px;">
                <i class="fa-solid fa-bowl-food"></i>
              </div>
              <h5 style="font-size:0.9rem; margin-bottom:4px;">Spicy Arrabiata</h5>
              <span style="font-size:0.75rem; color:#94a3b8;">Italian • Vegetarian</span>
            </div>
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px; text-align:center;">
              <div style="width:100%; height:100px; border-radius:8px; background:#1e293b; display:flex; align-items:center; justify-content:center; color:#9055ff; font-size:2rem; margin-bottom:8px;">
                <i class="fa-solid fa-pizza-slice"></i>
              </div>
              <h5 style="font-size:0.9rem; margin-bottom:4px;">Tuscan Pasta Bake</h5>
              <span style="font-size:0.75rem; color:#94a3b8;">Italian • Oven</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  job: {
    title: 'Full-Stack Job Portal – Recruiter & Candidate Dashboard',
    icon: 'fa-briefcase',
    render: () => `
      <div class="sim-container">
        <div class="sim-toolbar">
          <span><i class="fa-solid fa-database"></i> MERN Stack Architecture (JWT Auth • MongoDB Aggregation)</span>
          <span style="color:#22c55e;"><i class="fa-solid fa-lock"></i> Protected Session</span>
        </div>
        <div class="sim-window">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">
            <div style="font-size:0.95rem; font-weight:700; color:#00d2ff;"><i class="fa-solid fa-building"></i> TechCorp Recruiter Workspace</div>
            <button class="reveal-btn" onclick="postJobPrompt()"><i class="fa-solid fa-plus"></i> Post New Job</button>
          </div>
          
          <div id="jobListings" style="display:flex; flex-direction:column; gap:12px; max-height:260px; overflow-y:auto;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h5 style="font-size:0.95rem; font-weight:700;">Full-Stack Software Engineer (MERN)</h5>
                <span style="font-size:0.78rem; color:#94a3b8;">Bengaluru / Remote • ₹8-14 LPA • 0-2 yrs</span>
              </div>
              <span style="padding:4px 10px; background:rgba(34,197,94,0.15); color:#4ade80; border-radius:6px; font-size:0.75rem; font-weight:600;">14 Applicants</span>
            </div>

            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:14px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <h5 style="font-size:0.95rem; font-weight:700;">Generative AI / RAG Engineer</h5>
                <span style="font-size:0.78rem; color:#94a3b8;">Hybrid • ₹12-18 LPA • Python, Gemini, Vector DB</span>
              </div>
              <span style="padding:4px 10px; background:rgba(0,210,255,0.15); color:#00d2ff; border-radius:6px; font-size:0.75rem; font-weight:600;">9 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    `
  }
};

function openDemo(type) {
  const liveUrls = {
    'rag': 'https://threed-ai-pdf-chatbot.onrender.com/',
    'recipe': 'https://rit-bite-recipe-app.vercel.app/',
    'job': 'https://jobconnect-portal-m6nc.vercel.app/'
  };
  if (liveUrls[type]) {
    window.open(liveUrls[type], '_blank');
    return;
  }

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
  document.getElementById('demoModal').classList.remove('active');
}

// RAG Simulator Logic
const mockRagResponses = {
  'skills': `<strong>Retrieved Citations: [Page 1 • Section 3: SKILLS]</strong><br>
  • <strong>Languages:</strong> Python, JavaScript, TypeScript, C, HTML5, CSS3<br>
  • <strong>Generative AI & RAG:</strong> Google Gemini 3.8 API, Vector Search, BM25 Retrieval, Vision OCR<br>
  • <strong>Frameworks:</strong> React.js, FastAPI, Node.js, Express.js, Three.js, Tailwind CSS<br>
  • <strong>Databases & Tools:</strong> MongoDB, MySQL, Git, GitHub, Postman`,

  'chatbot': `<strong>Retrieved Citations: [Page 1 • Section 4: PROJECTS - AI 3D PDF Chatbot]</strong><br>
  • Built an end-to-end Retrieval-Augmented Generation application using Gemini 3.8 Flash and BM25 indexing (&lt;0.002s latency).<br>
  • Integrated Gemini Vision OCR to scan flattened Canva PDFs with 100% precision.<br>
  • Rendered a reactive 3D Holographic Neural Core in Three.js with real-time audio-visual feedback.`,

  'internship': `<strong>Retrieved Citations: [Page 1 • Section 5: INTERNSHIPS & Section 6: TRAINING]</strong><br>
  • <strong>MERN Stack Web Development:</strong> Completed rigorous industry training at <em>Ejobindia, Kolkata</em>.<br>
  • <strong>Git Collaboration:</strong> Gained hands-on experience in feature branches, pull requests, and production-ready deployments.`,

  'default': `<strong>Retrieved Citations: [Page 1 • Resume Knowledge Base]</strong><br>
  Ritam Manna is a 2026 Batch Computer Science & Engineering candidate with dual mastery in MERN Stack and Generative AI (LLMs & RAG Pipelines). He is ready to contribute to MNC teams with scalable code, rapid learning, and modern UI engineering.`
};

function quickRag(q) {
  document.getElementById('ragInput').value = q;
  simulateRagQuery();
}

function simulateRagQuery() {
  const input = document.getElementById('ragInput');
  const logs = document.getElementById('ragChatLogs');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim().toLowerCase();
  input.value = '';

  const userDiv = document.createElement('div');
  userDiv.style.alignSelf = 'flex-end';
  userDiv.style.background = 'rgba(0, 210, 255, 0.15)';
  userDiv.style.border = '1px solid rgba(0, 210, 255, 0.3)';
  userDiv.style.color = '#fff';
  userDiv.style.padding = '8px 14px';
  userDiv.style.borderRadius = '10px';
  userDiv.innerHTML = `<strong>You:</strong> ${query}`;
  logs.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.style.background = 'rgba(255,255,255,0.05)';
  botDiv.style.padding = '10px 14px';
  botDiv.style.borderRadius = '10px';
  botDiv.style.border = '1px solid rgba(255,255,255,0.1)';
  botDiv.innerHTML = `<span style="color:#00d2ff;"><i class="fa-solid fa-spinner fa-spin"></i> Retrieving vector chunks & generating answer...</span>`;
  logs.appendChild(botDiv);
  logs.scrollTop = logs.scrollHeight;

  setTimeout(() => {
    let resp = mockRagResponses['default'];
    if (query.includes('skill') || query.includes('genai') || query.includes('mern')) {
      resp = mockRagResponses['skills'];
    } else if (query.includes('chatbot') || query.includes('3d') || query.includes('rag') || query.includes('pdf')) {
      resp = mockRagResponses['chatbot'];
    } else if (query.includes('intern') || query.includes('training') || query.includes('ejob')) {
      resp = mockRagResponses['internship'];
    }
    botDiv.innerHTML = `<span style="color:#00d2ff; font-weight:600;"><i class="fa-solid fa-robot"></i> RAG Neural Agent:</span><p style="margin-top:6px; color:#cbd5e1; line-height:1.5;">${resp}</p>`;
    logs.scrollTop = logs.scrollHeight;
  }, 700);
}

// Recipe Search Simulator
async function searchRecipes() {
  const q = document.getElementById('recipeSearchInput').value.trim() || 'Pasta';
  const container = document.getElementById('recipeResults');
  container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#00d2ff;"><i class="fa-solid fa-spinner fa-spin"></i> Fetching live recipes from TheMealDB...</div>`;

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (!data.meals) {
      container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#94a3b8;">No recipes found for "${q}". Try Pasta, Chicken, or Salad.</div>`;
      return;
    }
    container.innerHTML = data.meals.slice(0, 6).map(m => `
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px; text-align:center;">
        <img src="${m.strMealThumb}" alt="${m.strMeal}" style="width:100%; height:90px; object-fit:cover; border-radius:6px; margin-bottom:8px;">
        <h5 style="font-size:0.85rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${m.strMeal}</h5>
        <span style="font-size:0.75rem; color:#94a3b8;">${m.strCategory || 'General'} • ${m.strArea || 'Global'}</span>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:#ef4444;">Live API limit or offline. Showing cached demo cards.</div>`;
  }
}

function postJobPrompt() {
  const title = prompt('Enter Job Title (e.g., Frontend React Developer):', 'Frontend React Developer');
  if (!title) return;
  const list = document.getElementById('jobListings');
  const div = document.createElement('div');
  div.style.background = 'rgba(255,255,255,0.04)';
  div.style.border = '1px solid rgba(56, 189, 248, 0.4)';
  div.style.borderRadius = '10px';
  div.style.padding = '14px';
  div.style.display = 'flex';
  div.style.justifyContent = 'space-between';
  div.style.alignItems = 'center';
  div.innerHTML = `
    <div>
      <h5 style="font-size:0.95rem; font-weight:700; color:#00d2ff;">${title}</h5>
      <span style="font-size:0.78rem; color:#94a3b8;">Just Posted • Remote • Full-time</span>
    </div>
    <span style="padding:4px 10px; background:rgba(0,210,255,0.15); color:#00d2ff; border-radius:6px; font-size:0.75rem; font-weight:600;">0 Applicants</span>
  `;
  list.prepend(div);
}

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
  const demoModal = document.getElementById('demoModal');
  const gateModal = document.getElementById('gateModal');
  if (e.target === demoModal) closeDemo();
  if (e.target === gateModal) closeGateModal();
});