/* ==========================================================
   THREE.JS 3D INTERACTIVE DEVELOPER NEXUS BACKGROUND
   Professional, Subtle, High-Performance 3D Ambient Canvas
   ========================================================== */

(function initProfessional3D() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 70;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Particle Constellation Grid
  const count = 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const c1 = new THREE.Color(0x00d2ff); // Cyan
  const c2 = new THREE.Color(0x3b82f6); // Royal Blue
  const c3 = new THREE.Color(0x8b5cf6); // Soft Purple

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 150;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const chosen = i % 3 === 0 ? c1 : (i % 3 === 1 ? c2 : c3);
    colors[i * 3] = chosen.r;
    colors[i * 3 + 1] = chosen.g;
    colors[i * 3 + 2] = chosen.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 2.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleMesh = new THREE.Points(geometry, pMaterial);
  mainGroup.add(particleMesh);

  // 2. Elegant Geometric Developer Nodes (Wireframe Dodecahedron & Rings)
  const nodeGroup = new THREE.Group();
  nodeGroup.position.set(30, 8, -15);

  const nodeGeo = new THREE.DodecahedronGeometry(18, 1);
  const nodeMat = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.16
  });
  const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
  nodeGroup.add(nodeMesh);

  const innerGeo = new THREE.OctahedronGeometry(8, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  nodeGroup.add(innerMesh);

  const ringGeo = new THREE.TorusGeometry(26, 0.3, 8, 50);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    transparent: true,
    opacity: 0.2
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  nodeGroup.add(ringMesh);

  mainGroup.add(nodeGroup);

  // Mouse & Scroll Parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let scrollY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = targetX * 0.006 + elapsed * 0.025;
    mainGroup.rotation.x = targetY * 0.006;
    mainGroup.position.y = -scrollY * 0.015;

    nodeMesh.rotation.x = elapsed * 0.08;
    nodeMesh.rotation.y = elapsed * 0.12;

    innerMesh.rotation.x = -elapsed * 0.15;
    innerMesh.rotation.z = elapsed * 0.2;

    ringMesh.rotation.z = elapsed * 0.06;

    renderer.render(scene, camera);
  }

  animate();
})();
