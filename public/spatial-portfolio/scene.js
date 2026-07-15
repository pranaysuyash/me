import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";

const container = document.getElementById("scene");
const unsupported = document.getElementById("unsupported");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projects = [
  {
    title: "SentinelTwin",
    eyebrow: "Spatial intelligence",
    proof: "Simulation, editors, governance, and evidence-backed decisions.",
    href: "/work/sentineltwin",
    color: 0x59d7cb,
    position: new THREE.Vector3(-2.25, 1.2, -0.55),
    geometry: () => new THREE.OctahedronGeometry(0.43, 0),
  },
  {
    title: "SignKit",
    eyebrow: "Paid desktop product",
    proof: "Computer vision, packaging, billing, and local file workflows.",
    href: "/work/sig-ext-fastapi",
    color: 0xd69c59,
    position: new THREE.Vector3(2.1, 1.0, -0.35),
    geometry: () => new THREE.BoxGeometry(0.66, 0.66, 0.66),
  },
  {
    title: "MetaExtract",
    eyebrow: "Document intelligence",
    proof: "Extraction, normalization, confidence, and review states.",
    href: "/work/metaextract",
    color: 0x8ed7a5,
    position: new THREE.Vector3(-1.82, -1.05, 0.42),
    geometry: () => new THREE.IcosahedronGeometry(0.45, 0),
  },
  {
    title: "EchoPanel",
    eyebrow: "Local-first audio AI",
    proof: "Native capture, private inference, storage, and retrieval.",
    href: "/work/echopanel",
    color: 0x8eb7df,
    position: new THREE.Vector3(2.0, -1.16, 0.5),
    geometry: () => new THREE.TorusKnotGeometry(0.31, 0.11, 64, 10),
  },
];

let renderer;
let labelRenderer;
let controls;
let scene;
let camera;
let frameId;
let active = true;
let hoveredIndex = -1;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(9, 9);
const interactiveMeshes = [];
const nodeGroups = [];
const clock = new THREE.Clock();

function showFallback() {
  unsupported.style.display = "grid";
}

function createLabel(project, index) {
  const anchor = document.createElement("a");
  anchor.className = "system-label";
  anchor.href = project.href;
  anchor.target = "_parent";
  anchor.setAttribute("aria-label", `Open ${project.title} case study`);
  anchor.innerHTML = `
    <span class="system-label__inner">
      <span class="system-label__eyebrow">${project.eyebrow}</span>
      <span class="system-label__title">${project.title}</span>
      <span class="system-label__proof">${project.proof}</span>
    </span>
  `;
  anchor.addEventListener("mouseenter", () => setHovered(index));
  anchor.addEventListener("mouseleave", () => setHovered(-1));
  anchor.addEventListener("focus", () => setHovered(index));
  anchor.addEventListener("blur", () => setHovered(-1));
  return anchor;
}

function setHovered(index) {
  hoveredIndex = index;
  nodeGroups.forEach((group, groupIndex) => {
    const mesh = group.userData.mesh;
    const ring = group.userData.ring;
    const label = group.userData.label;
    const isFocused = groupIndex === index;
    mesh.material.emissiveIntensity = isFocused ? 0.82 : 0.24;
    mesh.scale.setScalar(isFocused ? 1.16 : 1);
    ring.material.opacity = isFocused ? 0.8 : 0.22;
    label.element.dataset.active = String(isFocused);
  });
  document.body.style.cursor = index >= 0 ? "pointer" : "default";
}

function makeConnection(start, end, color) {
  const midpoint = start.clone().lerp(end, 0.5);
  midpoint.y += 0.26;
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
  const geometry = new THREE.TubeGeometry(curve, 32, 0.012, 6, false);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.28,
  });
  return new THREE.Mesh(geometry, material);
}

function makePulse(start, end, color, phase) {
  const midpoint = start.clone().lerp(end, 0.5);
  midpoint.y += 0.26;
  const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 14), material);
  mesh.userData.curve = curve;
  mesh.userData.phase = phase;
  return mesh;
}

function createCoreLabel() {
  const element = document.createElement("div");
  element.className = "system-label core-label";
  element.innerHTML = `
    <span class="system-label__inner">
      <span class="system-label__eyebrow">Operating discipline</span>
      <span class="system-label__title">Evidence-linked systems</span>
      <span class="system-label__proof">Workflow → product → proof</span>
    </span>
  `;
  return new CSS2DObject(element);
}

function init() {
  if (!container || !window.WebGLRenderingContext) {
    showFallback();
    return;
  }

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x071012, 0.082);

  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
  camera.position.set(0, 0.15, 7.7);

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    showFallback();
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.prepend(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = "label-layer";
  labelRenderer.domElement.setAttribute("aria-label", "Project labels");
  container.appendChild(labelRenderer.domElement);

  controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 6.4;
  controls.maxDistance = 9.2;
  controls.minPolarAngle = Math.PI * 0.36;
  controls.maxPolarAngle = Math.PI * 0.64;
  controls.minAzimuthAngle = -0.44;
  controls.maxAzimuthAngle = 0.44;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.34;
  controls.target.set(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xc9fff5, 0x102426, 1.4));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(3, 5, 6);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x59d7cb, 18, 9, 2);
  rimLight.position.set(-3.5, -0.5, 2.8);
  scene.add(rimLight);
  const warmLight = new THREE.PointLight(0xd69c59, 12, 8, 2);
  warmLight.position.set(3.4, 1.8, 1.5);
  scene.add(warmLight);

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(3.55, 3.9, 0.12, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0b1517,
      metalness: 0.35,
      roughness: 0.72,
      transparent: true,
      opacity: 0.82,
    }),
  );
  platform.position.y = -1.86;
  scene.add(platform);

  const grid = new THREE.GridHelper(8, 18, 0x3c8c84, 0x21423f);
  grid.position.y = -1.79;
  grid.material.transparent = true;
  grid.material.opacity = 0.24;
  scene.add(grid);

  const core = new THREE.Group();
  const coreMesh = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.72, 0),
    new THREE.MeshStandardMaterial({
      color: 0x163336,
      emissive: 0x0e605a,
      emissiveIntensity: 0.62,
      metalness: 0.58,
      roughness: 0.28,
    }),
  );
  core.add(coreMesh);
  const coreWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreMesh.geometry),
    new THREE.LineBasicMaterial({ color: 0xd4a663, transparent: true, opacity: 0.72 }),
  );
  coreWire.scale.setScalar(1.02);
  core.add(coreWire);
  const coreLabel = createCoreLabel();
  coreLabel.position.set(0, -1.08, 0);
  core.add(coreLabel);
  scene.add(core);

  const pulses = [];

  projects.forEach((project, index) => {
    const group = new THREE.Group();
    group.position.copy(project.position);

    const material = new THREE.MeshStandardMaterial({
      color: project.color,
      emissive: project.color,
      emissiveIntensity: 0.24,
      metalness: 0.48,
      roughness: 0.28,
    });
    const mesh = new THREE.Mesh(project.geometry(), material);
    mesh.userData.projectIndex = index;
    group.add(mesh);
    interactiveMeshes.push(mesh);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.015, 8, 64),
      new THREE.MeshBasicMaterial({
        color: project.color,
        transparent: true,
        opacity: 0.22,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const label = new CSS2DObject(createLabel(project, index));
    label.position.set(0, project.position.y > 0 ? 0.9 : -0.9, 0);
    group.add(label);

    group.userData = { mesh, ring, label, phase: index * 0.9 };
    nodeGroups.push(group);
    scene.add(group);

    const line = makeConnection(new THREE.Vector3(0, 0, 0), project.position, project.color);
    scene.add(line);
    const pulse = makePulse(new THREE.Vector3(0, 0, 0), project.position, project.color, index / projects.length);
    pulses.push(pulse);
    scene.add(pulse);
  });

  const starGeometry = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 180; i += 1) {
    positions.push(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 7,
      -1.5 - Math.random() * 5,
    );
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0xbbeee7,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
    }),
  );
  scene.add(stars);

  function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onPointerLeave() {
    pointer.set(9, 9);
    setHovered(-1);
  }

  function onPointerClick() {
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactiveMeshes, false)[0];
    if (hit) {
      const project = projects[hit.object.userData.projectIndex];
      window.parent.location.assign(project.href);
    }
  }

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerleave", onPointerLeave);
  renderer.domElement.addEventListener("click", onPointerClick);

  function resize() {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    labelRenderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  document.addEventListener("visibilitychange", () => {
    active = !document.hidden;
    if (active && !frameId) animate();
  });

  function animate() {
    if (!active) {
      frameId = undefined;
      return;
    }

    frameId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (!reducedMotion) {
      core.rotation.y = elapsed * 0.14;
      core.rotation.x = Math.sin(elapsed * 0.3) * 0.05;
    }

    nodeGroups.forEach((group, index) => {
      if (!reducedMotion) {
        group.rotation.y = elapsed * (0.13 + index * 0.018);
        group.position.y = projects[index].position.y + Math.sin(elapsed * 0.72 + group.userData.phase) * 0.055;
        group.userData.ring.rotation.z = elapsed * (index % 2 === 0 ? 0.2 : -0.18);
      }
    });

    pulses.forEach((pulse) => {
      const t = reducedMotion ? pulse.userData.phase : (elapsed * 0.12 + pulse.userData.phase) % 1;
      pulse.position.copy(pulse.userData.curve.getPoint(t));
      pulse.material.opacity = 0.45 + Math.sin(t * Math.PI) * 0.55;
      pulse.scale.setScalar(0.72 + Math.sin(t * Math.PI) * 0.45);
    });

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(interactiveMeshes, false)[0];
    const nextHovered = hit ? hit.object.userData.projectIndex : -1;
    if (nextHovered !== hoveredIndex) setHovered(nextHovered);

    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  animate();
}

init();
