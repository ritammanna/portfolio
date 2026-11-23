/* ==========================================================
   THREE.JS 3D INTERACTIVE NEURAL MESH BACKGROUND
   Responds to mouse movement, scroll, and subtle oscillations
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
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to rotate with mouse
  const sceneGroup = new THREE.Group();
  scene.add(sceneGroup);

  // 1. Particle Constellation
  const particleCount = 220;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00d2ff); // Cyan
  const color2 = new THREE.Color(0x8b5cf6); // Purple
  const color3 = new THREE.Color(0x3b82f6); // Blue

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 160;
    const z = (Math.random() - 0.5) * 120;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const mixedColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, pMaterial);
  sceneGroup.add(particles);

  // 2. 3D Wireframe Icosahedron Core (AI Neural Nexus)
  const icosaGeometry = new THREE.IcosahedronGeometry(22, 1);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const icosaMesh = new THREE.Mesh(icosaGeometry, wireMaterial);
  icosaMesh.position.set(35, 10, -20);
  sceneGroup.add(icosaMesh);

  // Inner floating core
  const coreGeo = new THREE.OctahedronGeometry(10, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.copy(icosaMesh.position);
  sceneGroup.add(coreMesh);

  // 3. Floating Orbital Torus
  const torusGeo = new THREE.TorusGeometry(32, 0.4, 8, 50);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.12
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.copy(icosaMesh.position);
  torus.rotation.x = Math.PI / 3;
  sceneGroup.add(torus);

  // Mouse Interaction coordinates
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
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

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    sceneGroup.rotation.y = targetX * 0.008 + elapsedTime * 0.03;
    sceneGroup.rotation.x = targetY * 0.008;
    sceneGroup.position.y = -scrollY * 0.02;

    // Internal object rotations
    icosaMesh.rotation.x = elapsedTime * 0.1;
    icosaMesh.rotation.y = elapsedTime * 0.15;

    coreMesh.rotation.x = -elapsedTime * 0.2;
    coreMesh.rotation.z = elapsedTime * 0.25;

    torus.rotation.z = elapsedTime * 0.08;

    // Gentle particle pulse
    pMaterial.size = 2.0 + Math.sin(elapsedTime * 2) * 0.5;

    renderer.render(scene, camera);
  }

  animate();
})();
