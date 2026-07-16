/* Hero 3D — avatar em wireframe holográfico (three.js), rotação lenta,
   partículas de dissolução voando até a borda esquerda do site, reveal
   de textura no hover (scan de preenchimento em sincronia com a rotação),
   vento global de partículas e wireframes decorativos nas áreas vazias.
   Fallback: img/avatar.jpg. */

import * as THREE from 'three';
import { GLTFLoader } from '../vendor/loaders/GLTFLoader.js';
import { MeshoptDecoder } from '../vendor/meshopt_decoder.module.js';

var MODEL_URL = './models/avatar.glb';
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var canHover = window.matchMedia('(hover: hover)').matches;

/* Direção do vento (compartilhada pelo site todo): esquerda, leve subida. */
var WIND = { x: -1, y: -0.18 };

var THEMES = {
  dark: {
    wire: 0x6ef3ff,
    wireOpacity: 0.34,
    dissolve: 0x8ef6ff,
    windColors: ['rgba(104, 239, 249, alpha)', 'rgba(151, 136, 224, alpha)'],
    glow: 'drop-shadow(0 0 18px rgba(110, 243, 255, .22))',
    /* Com a textura revelada, a sombra vira o roxo do site (--color-accent). */
    texGlow: 'drop-shadow(0 0 24px rgba(145, 132, 217, .38))'
  },
  light: {
    wire: 0x0e7490,
    wireOpacity: 0.4,
    dissolve: 0x0e7490,
    windColors: ['rgba(14, 116, 144, alpha)', 'rgba(108, 94, 201, alpha)'],
    glow: 'drop-shadow(0 0 14px rgba(14, 116, 144, .16))',
    texGlow: 'drop-shadow(0 0 20px rgba(108, 94, 201, .3))'
  }
};

function currentTheme() {
  return document.body.dataset.theme === 'light' ? 'light' : 'dark';
}

function bgColor() {
  var raw = getComputedStyle(document.body).getPropertyValue('--color-bg').trim();
  return new THREE.Color(raw || (currentTheme() === 'light' ? '#f2f3f9' : '#161826'));
}

/* GPU por software (SwiftShader/llvmpipe) não dá conta do loop de render:
   nesses ambientes o modelo é renderizado de forma estática. */
var softwareGL = (function () {
  try {
    var probe = document.createElement('canvas').getContext('webgl', { failIfMajorPerformanceCaveat: false });
    if (!probe) return true;
    var info = probe.getExtension('WEBGL_debug_renderer_info');
    var name = info ? probe.getParameter(info.UNMASKED_RENDERER_WEBGL) : '';
    var lose = probe.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(String(name));
  } catch (e) {
    return true;
  }
})();

/* ── Vento global: partículas driftando pelo site inteiro ────────────── */
function createGlobalWind() {
  var canvas = document.createElement('canvas');
  canvas.className = 'wind-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var width = 0, height = 0, particles = [], last = performance.now();

  function count() {
    var area = window.innerWidth * window.innerHeight;
    return Math.round(Math.min(110, Math.max(36, area / 16000)));
  }

  function reset(p, initial) {
    p.x = initial ? Math.random() * width : width + 10 + Math.random() * 80;
    p.y = Math.random() * height;
    p.size = 1 + Math.random() * 3.4;
    p.speed = 14 + Math.random() * 40;
    p.alpha = 0.1 + Math.random() * 0.34;
    p.phase = Math.random() * Math.PI * 2;
    p.spin = (Math.random() - 0.5) * 1.4;
    p.angle = Math.random() * Math.PI;
    p.shape = Math.random() > 0.62 ? 1 : 0;
    p.color = Math.random() > 0.3 ? 0 : 1;
  }

  function rebuild() {
    particles.length = 0;
    var total = count();
    for (var i = 0; i < total; i++) {
      var p = {};
      reset(p, true);
      particles.push(p);
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rebuild();
  }

  function draw(p, time) {
    var flicker = 0.7 + Math.sin(time * 0.002 + p.phase) * 0.3;
    var alpha = (p.alpha * flicker).toFixed(3);
    var colors = THEMES[currentTheme()].windColors;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    var color = colors[p.color].replace('alpha', alpha);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.7;
    if (p.shape === 1) {
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size * 0.85, p.size);
      ctx.lineTo(-p.size * 0.85, p.size * 0.55);
      ctx.closePath();
      if (p.size > 2.6) ctx.stroke(); else ctx.fill();
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    }
    ctx.restore();
  }

  function frame(time) {
    if (document.hidden) {
      last = time;
      requestAnimationFrame(frame);
      return;
    }
    var dt = Math.min((time - last) / 1000, 0.05);
    last = time;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += WIND.x * p.speed * dt;
      p.y += WIND.y * p.speed * dt + Math.sin(time * 0.0014 + p.phase) * 6 * dt;
      p.angle += p.spin * dt;
      if (p.x < -16 || p.y < -20 || p.y > height + 20) {
        reset(p, false);
      }
      draw(p, time);
    }
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (reducedMotion) {
    for (var i = 0; i < Math.min(26, particles.length); i++) draw(particles[i], 0);
    return;
  }
  requestAnimationFrame(frame);
}

/* ── Hero 3D: wireframe holográfico + reveal de textura no hover ─────── */
function createHero3D(gltfScene) {
  var hero = document.getElementById('home');
  var wrap = hero && hero.querySelector('.hero-photo-wrap');
  if (!hero || !wrap) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'hero-model-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  hero.appendChild(canvas);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !softwareGL, powerPreference: 'high-performance' });
  renderer.setPixelRatio(softwareGL ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.localClippingEnabled = true;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.01, 10);
  camera.position.set(0, 0, 2.4);
  camera.lookAt(0, 0, 0);
  var VISIBLE_H = 2 * 2.4 * Math.tan(THREE.MathUtils.degToRad(15)); /* altura do mundo visível em z=0 */

  /* Luzes — só afetam o passe texturizado (imagem 2: key neutra + rim azul). */
  scene.add(new THREE.HemisphereLight(0xcfd8ff, 0x35306b, 1.4));
  var key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(0.8, 1, 1.4);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0x4e8cff, 3);
  rim.position.set(-1.4, 0.5, -1.2);
  scene.add(rim);

  /* Normaliza o modelo: centraliza e escala para altura 1. */
  var group = new THREE.Group();
  var source = gltfScene.clone(true);
  var box = new THREE.Box3().setFromObject(source);
  var size = box.getSize(new THREE.Vector3());
  var center = box.getCenter(new THREE.Vector3());
  source.position.sub(center);
  source.scale.setScalar(1 / size.y);
  source.position.multiplyScalar(1 / size.y);
  group.add(source);
  scene.add(group);

  /* Planos de recorte do reveal (scan de baixo para cima, espaço-mundo):
     abaixo do scan mostra a textura; acima, o holograma wireframe. */
  var planeTex = new THREE.Plane(new THREE.Vector3(0, -1, 0), -10);   /* mostra y < s */
  var planeOcc = new THREE.Plane(new THREE.Vector3(0, 1, 0), 10);     /* mostra y > s */
  var planeWire = new THREE.Plane(new THREE.Vector3(0, 1, 0), 10);    /* mostra y > s - faixa */

  var theme = THEMES[currentTheme()];
  var occluderMat = new THREE.MeshBasicMaterial({
    color: bgColor(),
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    clippingPlanes: [planeOcc]
  });
  var wireMat = new THREE.MeshBasicMaterial({
    color: theme.wire,
    wireframe: true,
    transparent: true,
    opacity: theme.wireOpacity,
    depthWrite: false,
    clippingPlanes: [planeWire]
  });

  var meshes = [];
  var wireMeshes = [];
  var texMeshes = [];
  source.traverse(function (node) {
    if (node.isMesh) meshes.push(node);
  });
  meshes.forEach(function (mesh) {
    var texMat = mesh.material;
    texMat.clippingPlanes = [planeTex];
    mesh.material = occluderMat;
    var wire = new THREE.Mesh(mesh.geometry, wireMat);
    var tex = new THREE.Mesh(mesh.geometry, texMat);
    tex.visible = false; /* o passe texturizado (caro) só liga durante o reveal */
    mesh.add(wire);
    mesh.add(tex);
    wireMeshes.push(wire);
    texMeshes.push(tex);
  });

  /* Estado do reveal (0 = wireframe puro, 1 = personagem texturizado). */
  var reveal = 0;
  var revealTarget = 0;
  var modelScale = 0.7;
  var groupY = 0;
  var leftEdgeWorldX = -1.2;
  var worldPerPx = VISIBLE_H / 720;

  function syncPlanes() {
    var pad = modelScale * 0.04;
    var bottom = groupY - modelScale / 2 - pad;
    var s = bottom + reveal * (modelScale + pad * 2);
    planeTex.constant = s;
    planeOcc.constant = -s;
    planeWire.constant = -(s - modelScale * 0.05);
  }

  /* Retorna true quando a animação do reveal terminou. */
  function updateReveal(dt) {
    var k = revealTarget > reveal ? 2.1 : 2.6;
    reveal += (revealTarget - reveal) * Math.min(1, dt * k);
    if (Math.abs(revealTarget - reveal) < 0.003) reveal = revealTarget;
    syncPlanes();
    /* Passes fora da janela do scan não são desenhados. */
    var showTex = reveal > 0.002;
    var showWire = reveal < 0.998;
    for (var i = 0; i < texMeshes.length; i++) texMeshes[i].visible = showTex;
    for (var j = 0; j < wireMeshes.length; j++) wireMeshes[j].visible = showWire;
    return reveal === revealTarget;
  }

  /* Partículas de dissolução: fragmentos soltam da malha e voam com o
     vento até desaparecer na borda esquerda do site — mesma velocidade
     e comportamento das partículas do fundo. */
  var dissolve = null;
  var mainGeometry = meshes.length ? meshes[0].geometry : null;
  if (mainGeometry && !reducedMotion && !softwareGL) {
    var positions = mainGeometry.attributes.position;
    var COUNT = 140;
    var pos = new Float32Array(COUNT * 3);
    var col = new Float32Array(COUNT * 3);
    var data = [];
    var baseColor = new THREE.Color(theme.dissolve);

    for (var i = 0; i < COUNT; i++) {
      data.push({ t: 2, dist: 1, life: 4, idx: 0, wob: Math.random() * Math.PI * 2, origin: new THREE.Vector3() });
      data[i].t = Math.random(); /* espalha o ciclo inicial */
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var pMat = new THREE.PointsMaterial({
      size: 0.007,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    dissolve = { points: new THREE.Points(geo, pMat), data: data, geo: geo, pos: pos, col: col, srcPositions: positions, baseColor: baseColor };
    dissolve.points.frustumCulled = false;
    scene.add(dissolve.points);
  }

  var tmpVec = new THREE.Vector3();

  function respawn(item, mesh) {
    item.idx = (Math.random() * dissolve.srcPositions.count) | 0;
    tmpVec.fromBufferAttribute(dissolve.srcPositions, item.idx);
    mesh.localToWorld(item.origin.copy(tmpVec));
    /* Distância até a borda esquerda (com pequena variação); a velocidade
       espelha a faixa das partículas do fundo (14–54 px/s). */
    item.dist = Math.max(0.3, (item.origin.x - leftEdgeWorldX) * (0.92 + Math.random() * 0.16));
    var speed = (14 + Math.random() * 40) * worldPerPx;
    item.life = item.dist / speed;
    item.t = 0;
  }

  function updateDissolve(dt, time) {
    if (!dissolve || !meshes.length) return;
    var mesh = meshes[0];
    for (var i = 0; i < dissolve.data.length; i++) {
      var item = dissolve.data[i];
      item.t += dt / item.life;
      if (item.t >= 1 || item.origin.lengthSq() === 0) respawn(item, mesh);
      var t = item.t;
      var travelled = item.dist * t;
      var x = item.origin.x - travelled;
      var y = item.origin.y + travelled * 0.14 + Math.sin(time * 0.0011 + item.wob) * 0.03 * t;
      var z = item.origin.z + Math.cos(time * 0.0012 + item.wob) * 0.025 * t;
      dissolve.pos[i * 3] = x;
      dissolve.pos[i * 3 + 1] = y;
      dissolve.pos[i * 3 + 2] = z;
      /* Mesmo fade + cintilação das partículas do fundo. */
      var flicker = 0.7 + Math.sin(time * 0.002 + item.wob) * 0.3;
      var fade = Math.sin(Math.min(t, 1) * Math.PI) * flicker;
      dissolve.col[i * 3] = dissolve.baseColor.r * fade;
      dissolve.col[i * 3 + 1] = dissolve.baseColor.g * fade;
      dissolve.col[i * 3 + 2] = dissolve.baseColor.b * fade;
    }
    dissolve.geo.attributes.position.needsUpdate = true;
    dissolve.geo.attributes.color.needsUpdate = true;
  }

  /* O canvas cobre o hero inteiro; o modelo é projetado sobre a moldura
     da foto e as partículas ganham espaço até a borda esquerda. */
  function layout() {
    var heroRect = hero.getBoundingClientRect();
    var wrapRect = wrap.getBoundingClientRect();
    if (heroRect.width < 2 || heroRect.height < 2) return;
    renderer.setSize(heroRect.width, heroRect.height, false);
    camera.aspect = heroRect.width / heroRect.height;
    camera.updateProjectionMatrix();

    worldPerPx = VISIBLE_H / heroRect.height;
    var cx = wrapRect.left - heroRect.left + wrapRect.width / 2;
    var cy = wrapRect.top - heroRect.top + wrapRect.height / 2;
    group.position.x = (cx - heroRect.width / 2) * worldPerPx;
    group.position.y = (heroRect.height / 2 - cy) * worldPerPx;
    modelScale = wrapRect.height * worldPerPx;
    group.scale.setScalar(modelScale);
    groupY = group.position.y;
    leftEdgeWorldX = -(heroRect.width / 2) * worldPerPx;
    syncPlanes();
  }

  /* Sombra do modelo: ciano no wireframe; roxa do site com a textura. */
  function syncGlow() {
    var th = THEMES[currentTheme()];
    canvas.style.filter = revealTarget === 1 ? th.texGlow : th.glow;
  }

  function applyTheme() {
    var th = THEMES[currentTheme()];
    occluderMat.color.copy(bgColor());
    wireMat.color.setHex(th.wire);
    wireMat.opacity = th.wireOpacity;
    if (dissolve) dissolve.baseColor.setHex(th.dissolve);
    syncGlow();
  }

  var visible = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0] ? entries[0].isIntersecting : true;
    }, { threshold: 0.02 }).observe(hero);
  }

  var isStatic = reducedMotion || softwareGL;
  var last = performance.now();
  var lastRender = 0;

  function frame(time) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = time; return; }
    if (time - lastRender < 32) return; /* teto de ~30fps */
    var dt = Math.min((time - last) / 1000, 0.08);
    last = time;
    lastRender = time;
    group.rotation.y += dt * 0.28; /* ~16°/s — rotação lenta e contínua */
    updateReveal(dt);
    updateDissolve(dt, time);
    renderer.render(scene, camera);
  }

  function renderOnce() {
    renderer.render(scene, camera);
  }

  /* No modo estático o reveal roda em um mini-loop próprio. */
  var staticAnim = false;
  function kickStaticReveal() {
    if (!isStatic || staticAnim) return;
    staticAnim = true;
    var lastT = performance.now();
    function step(t) {
      var dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      var done = updateReveal(dt * 2); /* transição mais ágil no estático */
      renderOnce();
      if (!done) requestAnimationFrame(step);
      else staticAnim = false;
    }
    requestAnimationFrame(step);
  }

  /* Hover (desktop) / toque (mobile) controla o preenchimento. */
  if (canHover) {
    wrap.addEventListener('pointerenter', function () { revealTarget = 1; syncGlow(); kickStaticReveal(); });
    wrap.addEventListener('pointerleave', function () { revealTarget = 0; syncGlow(); kickStaticReveal(); });
  } else {
    wrap.addEventListener('click', function () {
      revealTarget = revealTarget === 1 ? 0 : 1;
      syncGlow();
      kickStaticReveal();
    });
  }

  layout();
  applyTheme();
  syncPlanes();

  if (window.ResizeObserver) {
    new ResizeObserver(function () {
      layout();
      if (isStatic) renderOnce();
    }).observe(hero);
  } else {
    window.addEventListener('resize', function () {
      layout();
      if (isStatic) renderOnce();
    }, { passive: true });
  }

  new MutationObserver(function () {
    applyTheme();
    if (isStatic) renderOnce();
  }).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

  if (isStatic) {
    group.rotation.y = -0.35;
    renderOnce();
  } else {
    requestAnimationFrame(frame);
  }

  wrap.classList.add('is-3d-ready');
  canvas.classList.add('is-on');
}

/* ── Decorações: metade do rosto em wireframe nas áreas vazias ───────── */
var decorState = { gltf: null, targets: [] };

function buildDecors() {
  if (!decorState.gltf) return;

  var sizePx = 480;
  var heightPx = Math.round(sizePx * 1.28);
  var canvas = document.createElement('canvas');
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !softwareGL });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(1);
  renderer.setSize(sizePx, heightPx, false);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, sizePx / heightPx, 0.01, 10);
  camera.position.set(0, 0.04, 2.05);
  camera.lookAt(0, 0.02, 0);

  var group = new THREE.Group();
  var source = decorState.gltf.clone(true);
  var box = new THREE.Box3().setFromObject(source);
  var size = box.getSize(new THREE.Vector3());
  var center = box.getCenter(new THREE.Vector3());
  source.position.sub(center);
  group.add(source);
  group.scale.setScalar(1 / size.y);
  scene.add(group);

  var wireMat = new THREE.MeshBasicMaterial({
    color: THEMES[currentTheme()].wire,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false
  });
  source.traverse(function (node) {
    if (node.isMesh) node.material = wireMat;
  });

  /* Cada alvo: seção, lado e ângulo do rosto. */
  var specs = [
    { selector: '#experiencia', side: 'right', yaw: -Math.PI / 2.4, top: '18%' },
    { selector: '#formacao', side: 'left', yaw: Math.PI / 2.4, top: '12%' },
    { selector: '#contato', side: 'right', yaw: Math.PI, top: '8%' }
  ];

  decorState.targets.forEach(function (el) { el.remove(); });
  decorState.targets = [];

  specs.forEach(function (spec) {
    var section = document.querySelector(spec.selector);
    if (!section) return;
    group.rotation.y = spec.yaw;
    renderer.render(scene, camera);
    var decor = document.createElement('div');
    decor.className = 'wire-decor wire-decor-' + spec.side;
    decor.setAttribute('aria-hidden', 'true');
    decor.style.top = spec.top;
    var img = document.createElement('img');
    img.alt = '';
    img.src = canvas.toDataURL('image/png');
    decor.appendChild(img);
    section.appendChild(decor);
    decorState.targets.push(decor);
  });

  renderer.dispose();
}

/* ── Inicialização ───────────────────────────────────────────────────── */
function start() {
  createGlobalWind();

  var loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(MODEL_URL, function (gltf) {
    try {
      createHero3D(gltf.scene);
      decorState.gltf = gltf.scene;
      buildDecors();
      new MutationObserver(buildDecors).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    } catch (err) {
      /* Mantém a foto estática como fallback. */
    }
  }, undefined, function () {
    /* Falha de rede/decodificação: a foto estática permanece. */
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
