/* ==========================================================
   THREE.JS 3D INTERACTIVE ARCHITECTURAL NEURAL FIELD
   Professional, Elegant, and Immersive 3D Space Background
   ========================================================== */

(function initThreeBackground() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 85;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Constellation Starfield with Subtle Depth
  const particleCount = 280;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const cyan = new THREE.Color(0x00d2ff);
  const violet = new THREE.Color(0x8b5cf6);
  const deepBlue = new THREE.Color(0x3b82f6);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 190;
    const y = (Math.random() - 0.5) * 190;
    const z = (Math.random() - 0.5) * 140;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const chosenColor = i % 3 === 0 ? cyan : (i % 3 === 1 ? violet : deepBlue);
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 2.0,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, pMaterial);
  mainGroup.add(particles);

  // 2. Sophisticated Polyhedral Nexus (AI Architectural Core)
  const icosaGeometry = new THREE.IcosahedronGeometry(24, 1);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.16
  });
  const icosaMesh = new THREE.Mesh(icosaGeometry, wireMaterial);
  icosaMesh.position.set(36, 8, -25);
  mainGroup.add(icosaMesh);

  // Floating Quantum Core (Octahedron)
  const coreGeo = new THREE.OctahedronGeometry(11, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.32
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.copy(icosaMesh.position);
  mainGroup.add(coreMesh);

  // Dual Orbital Rings (Planetary Gyroscope Feel)
  const ring1Geo = new THREE.TorusGeometry(36, 0.35, 12, 60);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.18
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.position.copy(icosaMesh.position);
  ring1.rotation.x = Math.PI / 3;
  mainGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(44, 0.3, 12, 60);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    transparent: true,
    opacity: 0.12
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.position.copy(icosaMesh.position);
  ring2.rotation.y = Math.PI / 4;
  mainGroup.add(ring2);

  // Mouse Interaction coordinates
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  // Scroll Parallax
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth subtle camera drift with mouse
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    mainGroup.rotation.y = targetX * 0.006 + elapsedTime * 0.025;
    mainGroup.rotation.x = targetY * 0.006;
    mainGroup.position.y = -scrollY * 0.015;

    // Architectural core rotation
    icosaMesh.rotation.x = elapsedTime * 0.08;
    icosaMesh.rotation.y = elapsedTime * 0.12;

    coreMesh.rotation.x = -elapsedTime * 0.15;
    coreMesh.rotation.z = elapsedTime * 0.18;

    ring1.rotation.z = elapsedTime * 0.07;
    ring2.rotation.x = -elapsedTime * 0.05;

    // Soft celestial breathing pulse
    pMaterial.size = 1.9 + Math.sin(elapsedTime * 1.5) * 0.35;

    renderer.render(scene, camera);
  }

  animate();
})();
