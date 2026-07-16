import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js";

const lab = document.getElementById("lab");
const fallback = document.getElementById("fallback");
const projectTabs = document.getElementById("project-tabs");
const modeTabs = document.getElementById("mode-tabs");
const projectEyebrow = document.getElementById("project-eyebrow");
const projectTitle = document.getElementById("project-title");
const projectSummary = document.getElementById("project-summary");
const metrics = document.getElementById("metrics");
const caseLink = document.getElementById("case-link");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const palette = {
  dark: 0x071013,
  panel: 0x0d1a1d,
  line: 0x355a59,
  white: 0xf2f8f6,
  muted: 0x78918c,
  sentinel: 0x59d7cb,
  signkit: 0xd69c59,
  meta: 0x89d6a3,
  echo: 0x8eb7df,
  alert: 0xef7663,
  amber: 0xe6b56c,
};

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(palette.dark, 0.055);

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
camera.position.set(5.6, 3.5, 7.2);

let renderer;
let labelRenderer;
let controls;

try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
} catch {
  fallback.style.display = "grid";
  throw new Error("WebGL unavailable");
}

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.setClearColor(0x000000, 0);
renderer.domElement.setAttribute("aria-hidden", "true");
lab.prepend(renderer.domElement);

labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = "label-layer";
labelRenderer.domElement.setAttribute("aria-hidden", "true");
lab.appendChild(labelRenderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.minDistance = 5.5;
controls.maxDistance = 10;
controls.minPolarAngle = Math.PI * 0.22;
controls.maxPolarAngle = Math.PI * 0.7;
controls.target.set(0, -0.15, 0);

scene.add(new THREE.HemisphereLight(0xd7fff7, 0x102124, 1.45));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.25);
keyLight.position.set(5, 7, 7);
scene.add(keyLight);
const cyanLight = new THREE.PointLight(palette.sentinel, 16, 13, 2);
cyanLight.position.set(-4, 1, 4);
scene.add(cyanLight);
const warmLight = new THREE.PointLight(palette.signkit, 12, 11, 2);
warmLight.position.set(4, 3, 2);
scene.add(warmLight);

const clock = new THREE.Clock();
const cameraGoal = new THREE.Vector3();
const targetGoal = new THREE.Vector3();
const groups = [];
let activeProject = 0;
let activeMode = 0;
let frameId;
let running = true;

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: options.metalness ?? 0.25,
    roughness: options.roughness ?? 0.55,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
    side: options.side ?? THREE.FrontSide,
  });
}

function box(size, color, position, options = {}) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size[0], size[1], size[2]),
    material(color, options),
  );
  mesh.position.set(position[0], position[1], position[2]);
  if (options.rotation) {
    mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  }
  return mesh;
}

function line(points, color, opacity = 1) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
  });
  return new THREE.Line(geometry, lineMaterial);
}

function curveLine(points, color, opacity = 1, segments = 72) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(segments));
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
  });
  const object = new THREE.Line(geometry, lineMaterial);
  object.userData.curve = curve;
  return object;
}

function tube(points, color, radius = 0.025, opacity = 1) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 72, radius, 8, false);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color,
      transparent: opacity < 1,
      opacity,
    }),
  );
  mesh.userData.curve = curve;
  return mesh;
}

function anchoredLabel(text, position, tone = "default") {
  const element = document.createElement("span");
  element.className = "object-label";
  element.dataset.tone = tone;
  element.textContent = text;
  const label = new CSS2DObject(element);
  label.position.set(position[0], position[1], position[2]);
  return label;
}

function edges(mesh, color, opacity = 0.6) {
  const object = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
  object.position.copy(mesh.position);
  object.rotation.copy(mesh.rotation);
  object.scale.copy(mesh.scale);
  return object;
}

function makeCameraNode(color) {
  const group = new THREE.Group();
  const body = box([0.42, 0.26, 0.3], 0x233638, [0, 0, 0], {
    metalness: 0.55,
    roughness: 0.34,
  });
  group.add(body);
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.095, 0.095, 0.13, 24),
    material(color, {
      metalness: 0.35,
      roughness: 0.22,
      emissive: color,
      emissiveIntensity: 0.55,
    }),
  );
  lens.rotation.z = Math.PI / 2;
  lens.position.x = 0.25;
  group.add(lens);
  const arm = box([0.08, 0.45, 0.08], 0x526462, [0, 0.31, 0]);
  group.add(arm);
  group.userData.lens = lens;
  return group;
}

function makeCoverage(color, opacity = 0.2) {
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 3.1, 36, 1, true),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  cone.rotation.z = -Math.PI / 2;
  cone.position.x = 1.58;
  return cone;
}

function createSentinelTwin() {
  const group = new THREE.Group();
  group.rotation.y = -0.12;

  const floor = box([5.4, 0.12, 3.6], 0x102124, [0, -1.2, 0], {
    metalness: 0.18,
    roughness: 0.82,
  });
  group.add(floor);

  const grid = new THREE.GridHelper(5.2, 16, 0x4d8580, 0x254541);
  grid.position.y = -1.125;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  group.add(grid);

  group.add(box([5.4, 1.8, 0.12], 0x1b2c2e, [0, -0.3, -1.75]));
  group.add(box([0.12, 1.8, 3.6], 0x1b2c2e, [-2.65, -0.3, 0]));
  group.add(box([0.85, 0.86, 1.05], 0x344849, [1.65, -0.72, 0.78]));
  group.add(box([0.62, 1.18, 2.1], 0x2a3a3b, [-0.15, -0.57, -0.15]));
  group.add(box([0.55, 0.72, 0.5], 0x6e5a40, [1.3, -0.82, -1.35]));

  const cameraA = makeCameraNode(palette.sentinel);
  cameraA.position.set(-1.95, 0.42, 1.35);
  cameraA.rotation.y = -0.18;
  const coverageA = makeCoverage(palette.sentinel, 0.2);
  cameraA.add(coverageA);
  group.add(cameraA);

  const cameraB = makeCameraNode(palette.sentinel);
  cameraB.position.set(1.95, 0.28, -1.35);
  cameraB.rotation.y = Math.PI * 0.78;
  const coverageB = makeCoverage(palette.sentinel, 0.18);
  cameraB.add(coverageB);
  group.add(cameraB);

  const blindZone = new THREE.Mesh(
    new THREE.CircleGeometry(0.56, 40),
    new THREE.MeshBasicMaterial({
      color: palette.alert,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  blindZone.rotation.x = -Math.PI / 2;
  blindZone.position.set(0.28, -1.1, 0.55);
  group.add(blindZone);

  const routePoints = [
    new THREE.Vector3(-2.2, -1.05, 1.22),
    new THREE.Vector3(-1.2, -1.04, 0.78),
    new THREE.Vector3(-0.15, -1.04, 0.52),
    new THREE.Vector3(0.95, -1.04, 0.42),
    new THREE.Vector3(1.65, -1.04, 0.76),
  ];
  const route = curveLine(routePoints, palette.amber, 0.82);
  route.visible = false;
  group.add(route);
  const routeMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 20, 20),
    new THREE.MeshBasicMaterial({ color: palette.amber }),
  );
  routeMarker.visible = false;
  group.add(routeMarker);

  const fixedCamera = makeCameraNode(palette.meta);
  fixedCamera.position.set(-0.55, 0.48, 1.45);
  fixedCamera.rotation.y = -0.42;
  fixedCamera.visible = false;
  const fixedCoverage = makeCoverage(palette.meta, 0.22);
  fixedCamera.add(fixedCoverage);
  group.add(fixedCamera);

  group.add(anchoredLabel("Camera 01", [-1.95, 1.05, 1.35], "good"));
  const blindLabel = anchoredLabel("Blind zone", [0.28, -0.46, 0.55], "alert");
  group.add(blindLabel);
  const routeLabel = anchoredLabel("Incident path", [0.65, -0.48, 0.42]);
  routeLabel.visible = false;
  group.add(routeLabel);
  const fixLabel = anchoredLabel("Counterfactual camera", [-0.55, 1.15, 1.45], "good");
  fixLabel.visible = false;
  group.add(fixLabel);

  function setMode(mode) {
    coverageA.visible = true;
    coverageB.visible = true;
    blindZone.visible = mode === 0;
    blindLabel.visible = mode === 0;
    route.visible = mode === 1;
    routeMarker.visible = mode === 1;
    routeLabel.visible = mode === 1;
    fixedCamera.visible = mode === 2;
    fixLabel.visible = mode === 2;
    cameraB.visible = mode !== 2;
    coverageA.material.opacity = mode === 1 ? 0.09 : 0.2;
  }

  function update(elapsed, mode) {
    cameraA.userData.lens.material.emissiveIntensity = 0.5 + Math.sin(elapsed * 2.1) * 0.14;
    if (mode === 1) {
      routeMarker.position.copy(route.userData.curve.getPoint((elapsed * 0.12) % 1));
    }
    if (mode === 2) {
      fixedCamera.rotation.y = -0.42 + Math.sin(elapsed * 0.5) * 0.04;
    }
  }

  setMode(0);
  group.userData = { setMode, update };
  return group;
}

function signaturePoints(z = 0) {
  return [
    new THREE.Vector3(-1.35, -0.18, z),
    new THREE.Vector3(-1.05, 0.2, z),
    new THREE.Vector3(-0.72, -0.32, z),
    new THREE.Vector3(-0.34, 0.3, z),
    new THREE.Vector3(0.08, -0.22, z),
    new THREE.Vector3(0.45, 0.16, z),
    new THREE.Vector3(0.84, -0.09, z),
    new THREE.Vector3(1.28, 0.2, z),
  ];
}

function createSignKit() {
  const group = new THREE.Group();
  group.rotation.y = -0.18;

  const page = box([3.35, 4.25, 0.08], 0xe8e4d9, [-0.55, 0, 0], {
    roughness: 0.9,
  });
  page.rotation.y = 0.08;
  group.add(page);
  group.add(edges(page, 0x596765, 0.38));

  for (let index = 0; index < 6; index += 1) {
    const textLine = box(
      [2.25 - (index % 2) * 0.38, 0.055, 0.025],
      0x98a09b,
      [-0.7 + (index % 2) * 0.12, 1.35 - index * 0.34, 0.08],
      { opacity: 0.5, transparent: true },
    );
    textLine.rotation.y = 0.08;
    group.add(textLine);
  }

  const rawSignature = tube(signaturePoints(0.11), 0x36383a, 0.034, 0.9);
  rawSignature.position.set(-0.56, -0.78, 0);
  rawSignature.rotation.y = 0.08;
  group.add(rawSignature);

  const cleanSignature = tube(signaturePoints(0.14), palette.signkit, 0.042, 1);
  cleanSignature.position.set(-0.56, -0.78, 0.03);
  cleanSignature.rotation.y = 0.08;
  cleanSignature.visible = false;
  group.add(cleanSignature);

  const noise = new THREE.Group();
  for (let index = 0; index < 18; index += 1) {
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.018 + (index % 3) * 0.006, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x55585a, transparent: true, opacity: 0.55 }),
    );
    dot.position.set(
      -1.75 + ((index * 0.31) % 2.75),
      -1.5 + ((index * 0.17) % 1.15),
      0.15,
    );
    noise.add(dot);
  }
  group.add(noise);

  const extractionBoxMesh = box([2.95, 1.25, 0.05], palette.signkit, [-0.56, -0.76, 0.18], {
    transparent: true,
    opacity: 0.03,
  });
  extractionBoxMesh.visible = false;
  group.add(extractionBoxMesh);
  const extractionBox = edges(extractionBoxMesh, palette.signkit, 0.85);
  extractionBox.visible = false;
  group.add(extractionBox);

  const output = new THREE.Group();
  output.position.set(2.25, -0.1, -0.25);
  for (let index = 0; index < 3; index += 1) {
    const sheet = box([2.1, 2.72, 0.08], 0xf0ede3, [index * 0.11, index * 0.12, -index * 0.12], {
      roughness: 0.9,
    });
    sheet.rotation.y = -0.16;
    output.add(sheet);
  }
  const outputSignature = tube(signaturePoints(0.18), palette.signkit, 0.034, 1);
  outputSignature.scale.setScalar(0.62);
  outputSignature.position.set(0.05, -0.62, 0.18);
  outputSignature.rotation.y = -0.16;
  output.add(outputSignature);
  output.visible = false;
  group.add(output);

  const transfer = curveLine(
    [
      new THREE.Vector3(0.8, -0.75, 0.3),
      new THREE.Vector3(1.25, -0.2, 0.55),
      new THREE.Vector3(1.7, -0.2, 0.25),
    ],
    palette.signkit,
    0.8,
  );
  transfer.visible = false;
  group.add(transfer);

  const sourceLabel = anchoredLabel("Source document", [-0.55, 2.45, 0.15]);
  group.add(sourceLabel);
  const extractLabel = anchoredLabel("Clean signature layer", [-0.55, 0.12, 0.4], "good");
  extractLabel.visible = false;
  group.add(extractLabel);
  const outputLabel = anchoredLabel("Signed PDF", [2.3, 1.62, 0.2], "good");
  outputLabel.visible = false;
  group.add(outputLabel);

  function setMode(mode) {
    rawSignature.material.opacity = mode === 0 ? 0.9 : 0.18;
    noise.visible = mode === 0;
    cleanSignature.visible = mode >= 1;
    extractionBox.visible = mode === 1;
    extractionBoxMesh.visible = mode === 1;
    extractLabel.visible = mode === 1;
    output.visible = mode === 2;
    outputLabel.visible = mode === 2;
    transfer.visible = mode === 2;
  }

  function update(elapsed, mode) {
    group.position.y = Math.sin(elapsed * 0.45) * 0.035;
    if (mode >= 1) {
      cleanSignature.material.opacity = 0.84 + Math.sin(elapsed * 2.2) * 0.14;
    }
  }

  setMode(0);
  group.userData = { setMode, update };
  return group;
}

function createMetaExtract() {
  const group = new THREE.Group();
  group.rotation.y = -0.05;

  const documents = new THREE.Group();
  documents.position.x = -2.5;
  for (let index = 0; index < 4; index += 1) {
    const page = box([1.45, 1.9, 0.07], 0xe7e3da, [index * 0.13, index * 0.12, -index * 0.14], {
      roughness: 0.9,
    });
    page.rotation.y = 0.12;
    documents.add(page);
    for (let row = 0; row < 4; row += 1) {
      const stripe = box([0.85 - row * 0.08, 0.035, 0.02], 0x8b9692, [index * 0.13, 0.48 - row * 0.23 + index * 0.12, 0.05 - index * 0.14], {
        transparent: true,
        opacity: 0.45,
      });
      stripe.rotation.y = 0.12;
      documents.add(stripe);
    }
  }
  group.add(documents);

  const pipeline = new THREE.Group();
  const nodeColors = [0x34565a, 0x3d625b, 0x506a4f, 0x6a583e];
  const nodeNames = ["OCR", "Structure", "Fields", "Review"];
  const nodes = [];
  for (let index = 0; index < 4; index += 1) {
    const node = box([0.86, 0.62, 0.86], nodeColors[index], [-0.95 + index * 0.78, 0.15, 0], {
      metalness: 0.32,
      roughness: 0.38,
      emissive: nodeColors[index],
      emissiveIntensity: 0.15,
    });
    pipeline.add(node);
    nodes.push(node);
    pipeline.add(anchoredLabel(nodeNames[index], [-0.95 + index * 0.78, 0.72, 0]));
  }
  group.add(pipeline);

  const packetCurves = [];
  const packets = [];
  for (let index = 0; index < 3; index += 1) {
    const start = new THREE.Vector3(-1.75 + index * 0.78, 0.15, 0);
    const end = new THREE.Vector3(-0.95 + index * 0.78, 0.15, 0);
    const path = curveLine([start, start.clone().add(new THREE.Vector3(0.4, 0.22, 0.12)), end], palette.meta, 0.36);
    group.add(path);
    packetCurves.push(path.userData.curve);
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: palette.meta }),
    );
    packets.push(packet);
    group.add(packet);
  }

  const fields = new THREE.Group();
  fields.position.set(2.45, 0.05, 0.05);
  const fieldNames = ["pnr", "origin", "date", "status"];
  fieldNames.forEach((name, index) => {
    const chip = box([1.0, 0.34, 0.18], index === 3 ? 0x67563f : 0x29494a, [0, 0.62 - index * 0.43, 0], {
      emissive: index === 3 ? palette.amber : palette.meta,
      emissiveIntensity: 0.12,
      roughness: 0.45,
    });
    fields.add(chip);
    fields.add(anchoredLabel(name, [0, 0.62 - index * 0.43, 0.2], index === 3 ? "alert" : "good"));
  });
  fields.visible = false;
  group.add(fields);

  const evidenceLines = new THREE.Group();
  fieldNames.slice(0, 3).forEach((_, index) => {
    const evidence = line(
      [
        new THREE.Vector3(-2.15, 0.45 - index * 0.26, 0.18),
        new THREE.Vector3(2.05, 0.62 - index * 0.43, 0.18),
      ],
      palette.meta,
      0.38,
    );
    evidenceLines.add(evidence);
  });
  evidenceLines.visible = false;
  group.add(evidenceLines);

  const reviewPanel = new THREE.Group();
  reviewPanel.position.set(2.55, -0.05, 0);
  const reviewBase = box([1.55, 2.2, 0.16], 0x172629, [0, 0, 0], {
    metalness: 0.15,
    roughness: 0.75,
  });
  reviewPanel.add(reviewBase);
  reviewPanel.add(box([1.05, 0.22, 0.08], 0x3f5c58, [0, 0.68, 0.14]));
  reviewPanel.add(box([1.05, 0.22, 0.08], 0x685238, [0, 0.24, 0.14], {
    emissive: palette.amber,
    emissiveIntensity: 0.2,
  }));
  reviewPanel.add(box([1.05, 0.22, 0.08], 0x3c5c47, [0, -0.2, 0.14]));
  reviewPanel.add(anchoredLabel("Human review gate", [0, 1.35, 0.1], "alert"));
  reviewPanel.visible = false;
  group.add(reviewPanel);

  group.add(anchoredLabel("Variable source files", [-2.45, 1.52, 0.05]));

  function setMode(mode) {
    documents.visible = true;
    pipeline.visible = true;
    fields.visible = mode === 1;
    evidenceLines.visible = mode === 1;
    reviewPanel.visible = mode === 2;
    nodes.forEach((node, index) => {
      node.visible = mode !== 2 || index < 3;
    });
  }

  function update(elapsed, mode) {
    packets.forEach((packet, index) => {
      const progress = (elapsed * 0.18 + index * 0.3) % 1;
      packet.position.copy(packetCurves[index].getPoint(progress));
      packet.visible = mode === 0;
    });
    if (mode === 1) {
      fields.position.y = Math.sin(elapsed * 0.7) * 0.035;
    }
  }

  setMode(0);
  group.userData = { setMode, update };
  return group;
}

function createEchoPanel() {
  const group = new THREE.Group();
  group.rotation.y = -0.12;

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(3.05, 3.3, 0.12, 64),
    material(0x101e22, { metalness: 0.4, roughness: 0.62 }),
  );
  platform.position.y = -1.35;
  group.add(platform);

  const mic = new THREE.Group();
  mic.position.set(-2.05, -0.1, 0);
  const micBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.32, 0.78, 8, 18),
    material(0x253b42, {
      metalness: 0.55,
      roughness: 0.32,
      emissive: palette.echo,
      emissiveIntensity: 0.16,
    }),
  );
  mic.add(micBody);
  mic.add(box([0.1, 0.62, 0.1], 0x7d8e91, [0, -0.8, 0]));
  mic.add(box([0.75, 0.08, 0.45], 0x4c5d60, [0, -1.1, 0]));
  group.add(mic);

  const waveform = new THREE.Group();
  const bars = [];
  for (let index = 0; index < 42; index += 1) {
    const bar = box([0.055, 0.48, 0.08], palette.echo, [-1.15 + index * 0.075, 0, 0], {
      emissive: palette.echo,
      emissiveIntensity: 0.35,
      roughness: 0.28,
    });
    waveform.add(bar);
    bars.push(bar);
  }
  group.add(waveform);

  const transcripts = new THREE.Group();
  transcripts.position.set(2.05, 0.05, 0);
  const transcriptCards = [];
  for (let index = 0; index < 3; index += 1) {
    const card = box([1.6, 0.72, 0.16], 0x1b2b30, [0, 0.72 - index * 0.88, 0], {
      metalness: 0.12,
      roughness: 0.72,
    });
    transcripts.add(card);
    transcripts.add(box([1.02, 0.055, 0.04], 0x789093, [-0.12, 0.85 - index * 0.88, 0.12], {
      transparent: true,
      opacity: 0.65,
    }));
    transcripts.add(box([0.72, 0.045, 0.04], 0x607579, [-0.27, 0.62 - index * 0.88, 0.12], {
      transparent: true,
      opacity: 0.48,
    }));
    transcriptCards.push(card);
  }
  transcripts.visible = false;
  group.add(transcripts);

  const searchBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.22, 3.2, 24, 1, true),
    new THREE.MeshBasicMaterial({
      color: palette.echo,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  searchBeam.rotation.z = Math.PI / 2;
  searchBeam.position.set(0.85, -0.15, 0.15);
  searchBeam.visible = false;
  group.add(searchBeam);

  const resultRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.035, 10, 64),
    new THREE.MeshBasicMaterial({ color: palette.echo }),
  );
  resultRing.position.set(2.05, -0.83, 0.22);
  resultRing.visible = false;
  group.add(resultRing);

  const captureLabel = anchoredLabel("Local audio capture", [-2.05, 1.18, 0], "good");
  group.add(captureLabel);
  const transcriptLabel = anchoredLabel("Transcript timeline", [2.05, 1.46, 0]);
  transcriptLabel.visible = false;
  group.add(transcriptLabel);
  const retrievalLabel = anchoredLabel("Search hit", [2.05, 0.05, 0.38], "good");
  retrievalLabel.visible = false;
  group.add(retrievalLabel);

  function setMode(mode) {
    waveform.visible = true;
    transcripts.visible = mode >= 1;
    transcriptLabel.visible = mode >= 1;
    searchBeam.visible = mode === 2;
    resultRing.visible = mode === 2;
    retrievalLabel.visible = mode === 2;
  }

  function update(elapsed, mode) {
    bars.forEach((bar, index) => {
      const amplitude = 0.32 + Math.abs(Math.sin(elapsed * 2.4 + index * 0.47)) * 1.15;
      bar.scale.y = amplitude * (mode === 0 ? 1 : 0.55);
      bar.material.emissiveIntensity = mode === 0 ? 0.38 : 0.16;
    });
    if (mode === 2) {
      resultRing.rotation.z = elapsed * 0.55;
      searchBeam.material.opacity = 0.14 + Math.sin(elapsed * 2) * 0.05;
    }
  }

  setMode(0);
  group.userData = { setMode, update };
  return group;
}

const projects = [
  {
    name: "SentinelTwin",
    eyebrow: "Spatial intelligence",
    accent: "#59d7cb",
    summary:
      "Plan camera coverage, expose blind zones, replay paths, and compare counterfactual fixes inside an inspectable security twin.",
    href: "/work/sentineltwin",
    modes: ["Coverage", "Incident path", "Counterfactual"],
    metrics: [
      ["2 cameras", "coverage model"],
      ["1 blind zone", "visible risk"],
      ["What-if", "verified fix"],
    ],
    camera: new THREE.Vector3(5.7, 3.8, 7.4),
    target: new THREE.Vector3(0, -0.2, 0),
    build: createSentinelTwin,
  },
  {
    name: "SignKit",
    eyebrow: "Paid local-first desktop product",
    accent: "#d69c59",
    summary:
      "Move from a noisy source document to an extracted signature layer and a finished signed PDF without sending sensitive files to a server.",
    href: "/work/sig-ext-fastapi",
    modes: ["Source", "Extract", "Insert into PDF"],
    metrics: [
      ["Local", "file handling"],
      ["CV cleanup", "usable output"],
      ["Paid", "commercial proof"],
    ],
    camera: new THREE.Vector3(5.2, 3.2, 7.5),
    target: new THREE.Vector3(0.25, -0.05, 0),
    build: createSignKit,
  },
  {
    name: "MetaExtract",
    eyebrow: "Document intelligence workflow",
    accent: "#89d6a3",
    summary:
      "Turn variable documents into normalized fields while preserving evidence, confidence states, and a route to human review.",
    href: "/work/metaextract",
    modes: ["Parse", "Evidence links", "Review gate"],
    metrics: [
      ["Variable docs", "one workflow"],
      ["Evidence", "field provenance"],
      ["Review", "uncertainty path"],
    ],
    camera: new THREE.Vector3(6.2, 3.25, 7.7),
    target: new THREE.Vector3(0.05, -0.05, 0),
    build: createMetaExtract,
  },
  {
    name: "EchoPanel",
    eyebrow: "Native local-first audio AI",
    accent: "#8eb7df",
    summary:
      "Capture a conversation locally, turn it into a navigable transcript, and retrieve the exact moment later.",
    href: "/work/echopanel",
    modes: ["Capture", "Transcript", "Retrieve"],
    metrics: [
      ["Native", "macOS surface"],
      ["Local", "private inference"],
      ["Search", "conversation memory"],
    ],
    camera: new THREE.Vector3(5.8, 3.25, 7.2),
    target: new THREE.Vector3(0.1, -0.1, 0),
    build: createEchoPanel,
  },
];

projects.forEach((project) => {
  const group = project.build();
  group.visible = false;
  groups.push(group);
  scene.add(group);
});

function renderProjectTabs() {
  projectTabs.innerHTML = "";
  projects.forEach((project, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-tab";
    button.setAttribute("aria-pressed", String(index === activeProject));
    button.innerHTML = `
      <span class="project-tab__number">0${index + 1}</span>
      <span class="project-tab__name">${project.name}</span>
    `;
    button.addEventListener("click", () => selectProject(index));
    projectTabs.appendChild(button);
  });
}

function renderModeTabs() {
  modeTabs.innerHTML = "";
  projects[activeProject].modes.forEach((mode, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-tab";
    button.setAttribute("aria-pressed", String(index === activeMode));
    button.textContent = mode;
    button.addEventListener("click", () => selectMode(index));
    modeTabs.appendChild(button);
  });
}

function renderProjectCopy() {
  const project = projects[activeProject];
  document.documentElement.style.setProperty("--accent", project.accent);
  projectEyebrow.textContent = project.eyebrow;
  projectTitle.textContent = project.name;
  projectSummary.textContent = project.summary;
  caseLink.href = project.href;
  metrics.innerHTML = project.metrics
    .map(
      ([value, label]) => `
        <div class="metric">
          <strong>${value}</strong>
          <span>${label}</span>
        </div>
      `,
    )
    .join("");
}

function selectProject(index) {
  activeProject = index;
  activeMode = 0;
  groups.forEach((group, groupIndex) => {
    group.visible = groupIndex === index;
  });
  const project = projects[index];
  project.group = groups[index];
  groups[index].userData.setMode(0);
  cameraGoal.copy(project.camera);
  targetGoal.copy(project.target);
  controls.enabled = true;
  renderProjectTabs();
  renderModeTabs();
  renderProjectCopy();
}

function selectMode(index) {
  activeMode = index;
  groups[activeProject].userData.setMode(index);
  renderModeTabs();
}

function resize() {
  const width = Math.max(lab.clientWidth, 1);
  const height = Math.max(lab.clientHeight, 1);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height);
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(lab);
resize();

cameraGoal.copy(projects[0].camera);
targetGoal.copy(projects[0].target);
selectProject(0);
camera.position.copy(cameraGoal);
controls.target.copy(targetGoal);

function animate() {
  if (!running) {
    frameId = undefined;
    return;
  }

  frameId = requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  if (!reducedMotion) {
    camera.position.lerp(cameraGoal, 0.055);
    controls.target.lerp(targetGoal, 0.07);
  } else {
    camera.position.copy(cameraGoal);
    controls.target.copy(targetGoal);
  }

  const current = groups[activeProject];
  current.userData.update(elapsed, activeMode);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();

document.addEventListener("visibilitychange", () => {
  running = !document.hidden;
  if (running && !frameId) animate();
});
