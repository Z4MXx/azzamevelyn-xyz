// Typewriter
function typewriter(text, elId, speed = 80) {
  const el = document.getElementById(elId);
  let i = 0;
  const interval = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    if (i >= text.length) clearInterval(interval);
  }, speed);
}
typewriter(profile.name, "typewriter");
document.getElementById("tagline").textContent = profile.tagline;
document.getElementById("bio").textContent = profile.bio;

// Skills
const skillsContainer = document.getElementById("skills");
Object.entries(skills).forEach(([group, items]) => {
  const groupEl = document.createElement("div");
  groupEl.className = "skill-group";
  groupEl.innerHTML = `<p>${group}</p><div class="skill-badges">${items.map(i => `<span class="badge">${i}</span>`).join("")}</div>`;
  skillsContainer.appendChild(groupEl);
});

// Project
document.getElementById("project-card").href = featuredProject.url;
document.getElementById("project-name").textContent = featuredProject.name;
document.getElementById("project-desc").textContent = featuredProject.description;

// Certificates
const certContainer = document.getElementById("certificates");
const modal = document.getElementById("modal");
certificates.forEach(cert => {
  const el = document.createElement("div");
  el.className = "cert-item";
  el.innerHTML = `<img src="${cert.image}" alt="${cert.issuer}"><p class="issuer">${cert.issuer}</p><p class="title">${cert.title}</p>`;
  el.addEventListener("click", () => {
    document.getElementById("modal-image").src = cert.image;
    document.getElementById("modal-issuer").textContent = cert.issuer;
    document.getElementById("modal-title").textContent = cert.title;
    modal.classList.add("open");
  });
  certContainer.appendChild(el);
});

document.getElementById("modal-close").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.remove("open"); });

// 3D particle background
const canvas = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particleCount = 300;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 10;
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.02, transparent: true, opacity: 0.8 });
const points = new THREE.Points(geometry, material);
scene.add(points);

let mouseX = 0, mouseY = 0;
window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  points.rotation.x += (mouseY * 0.3 - points.rotation.x) * 0.02;
  points.rotation.y += 0.0005 + (mouseX * 0.3 - points.rotation.y) * 0.02;
  renderer.render(scene, camera);
}
animate();