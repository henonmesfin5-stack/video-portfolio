const $ = (s) => document.querySelector(s);

/* 1. LIGHT / DARK MODE (remembers the visitor's choice) */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
const paintThemeIcon = () => (themeBtn.textContent = root.dataset.theme === "dark" ? "\u2600" : "\u263E");
paintThemeIcon();
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
  paintThemeIcon();
});

/* 2. MOBILE MENU */
$("#menuBtn").addEventListener("click", () => $("#menu").classList.toggle("open"));
document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", () => $("#menu").classList.remove("open")));

/* 3. VIDEO CARDS + CATEGORY FILTERS (built from js/videos.js) */
const grid = $("#videoGrid");
const cards = videos.map((v, i) => {
  const card = document.createElement("button");
  card.className = `card reveal ${i === 0 ? "featured" : "portrait"}`;
  card.dataset.category = v.category;
  card.innerHTML = `
    <div class="thumb"><img src="https://img.youtube.com/vi/${v.id}/maxresdefault.jpg" data-fallback="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title} video thumbnail" width="1280" height="720" loading="${i === 0 ? "eager" : "lazy"}" decoding="async"${i === 0 ? ' fetchpriority="high"' : ""}><span class="play">&#9654;</span></div>
    <div class="meta"><h3>${v.title}</h3><span>${v.category}</span></div>`;
  const thumbnail = card.querySelector(".thumb img");
  thumbnail.addEventListener("error", () => {
    if (thumbnail.dataset.fallback) {
      thumbnail.src = thumbnail.dataset.fallback;
      delete thumbnail.dataset.fallback;
      return;
    }
    thumbnail.hidden = true;
    console.error(`Unable to load a thumbnail for video ${v.id}.`);
  });
  card.addEventListener("click", () => openVideo(v.id));
  grid.appendChild(card);
  return card;
});
const filters = $("#filters");
["All", ...new Set(videos.map((v) => v.category))].forEach((cat, i) => {
  const b = document.createElement("button");
  b.textContent = cat;
  if (i === 0) b.classList.add("active");
  b.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    cards.forEach((c) => (c.hidden = cat !== "All" && c.dataset.category !== cat));
  });
  filters.appendChild(b);
});

/* 4. VIDEO POPUP (YouTube embed) */
const modal = $("#modal"), player = $("#player");
function openVideo(id) {
  player.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Video player" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeVideo() { modal.hidden = true; player.innerHTML = ""; document.body.style.overflow = ""; }
$("#closeBtn").addEventListener("click", closeVideo);
modal.addEventListener("click", (e) => { if (e.target === modal) closeVideo(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });

/* 5. TIMELINE PLAYHEAD + TIMECODE */
const pad = (n) => String(n).padStart(2, "0");
function updateTimeline() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  $("#playhead").style.left = p * 100 + "%";
  const fr = Math.floor(p * 180 * 24);
  $("#timecode").textContent = `00:${pad(Math.floor(fr / 1440))}:${pad(Math.floor(fr / 24) % 60)}:${pad(fr % 24)}`;
}
addEventListener("scroll", updateTimeline, { passive: true });
updateTimeline();

/* 6. SCROLL ANIMATIONS: fade-in, word-by-word text, counting numbers */
document.querySelectorAll(".words").forEach((el) => {
  el.innerHTML = el.textContent.trim().split(" ").map((w, i) => `<span style="--i:${i}">${w}</span>`).join(" ");
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    const n = e.target.querySelector("[data-count]");
    if (n) countUp(n);
    io.unobserve(e.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll(".reveal, .words").forEach((el) => io.observe(el));
function countUp(el) {
  const end = +el.dataset.count, t0 = performance.now();
  (function tick(t) {
    const k = Math.min((t - t0) / 1400, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + "+";
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}

/* 7. BACKGROUND: drifting dust/stars that lean toward the mouse */
const cv = $("#bg"), ctx = cv.getContext("2d");
let W, H, mx = 0, my = 0, dots = [];
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  dots = Array.from({ length: Math.min(110, Math.floor(W / 14)) }, () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3, z: Math.random() * 0.8 + 0.2
  }));
}
addEventListener("resize", resize); resize();
addEventListener("mousemove", (e) => { mx = e.clientX / W - 0.5; my = e.clientY / H - 0.5; });
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
(function draw() {
  ctx.clearRect(0, 0, W, H);
  const rgb = root.dataset.theme === "dark" ? "255,255,255" : "21,23,28";
  dots.forEach((d) => {
    if (!still) { d.y -= 0.12 * d.z; if (d.y < -5) { d.y = H + 5; d.x = Math.random() * W; } }
    ctx.beginPath();
    ctx.arc(d.x + mx * 40 * d.z, d.y + my * 40 * d.z, d.r, 0, 6.3);
    ctx.fillStyle = `rgba(${rgb},${0.15 + d.z * 0.35})`;
    ctx.fill();
  });
  if (!still) requestAnimationFrame(draw);
})();

$("#year").textContent = "2025";
