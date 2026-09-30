/* Gallery: an open canvas. Every photograph appears exactly once, scattered evenly outwards from the title on a
   sunflower spiral; new photographs simply take the next places on the outside, so the canvas grows with the collection.
   You can wander as far as the photographs go. Only photographs near the screen exist in the page, and each one loads
   a tiny copy first and a sharper one only when you zoom in; the full-size file loads only when a photograph is opened. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const DEMO = /[?&]demo\b/.test(location.search);
  let G = window.GALLERY;

  /* ?demo: generate sample frames so the canvas can be previewed with no photographs */
  if (DEMO) {
    const tones = [["#81d8d0", "#e8f7f5"], ["#81d8d0", "#141414"], ["#6b6b6b", "#f4f4f4"], ["#141414", "#c0ebe7"], ["#ff9a8b", "#ffffff"], ["#2b2b2b", "#81d8d0"], ["#ffe07a", "#ffffff"]];
    const sizes = [[3, 2], [2, 3], [3, 2], [1, 1], [2, 3], [16, 9], [4, 5], [3, 2]];
    const mk = (i) => { const [a, b] = sizes[i % sizes.length], [fg, bg] = tones[i % tones.length]; const c = document.createElement("canvas"); c.width = 640; c.height = Math.round(640 * b / a); const x = c.getContext("2d"); x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); x.fillStyle = fg; x.fillRect(c.width * .16, c.height * .2, c.width * .46, c.height * .58); x.fillStyle = "rgba(17,17,17,.5)"; x.font = "600 40px sans-serif"; x.fillText(String(i + 1), 24, 56); const u = c.toDataURL("image/jpeg", .8); return { file: u, thumb: u, small: u, w: a * 100, h: b * 100, title: { en: "Sample frame " + (i + 1), zh: "示例画面 " + (i + 1) }, place: "Stockholm", year: "2026" }; };
    G = Object.assign({}, G, { series: [{ id: "demo", title: { en: "Sample", zh: "示例" }, photos: Array.from({ length: 48 }, (_, i) => mk(i)) }] });
  }

  let lang = "en";
  try { lang = localStorage.getItem("lang") === "zh" ? "zh" : "en"; } catch (e) {}
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] || o.en || "");
  const esc = (x) => String(x == null ? "" : x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const N = { work: { en: "Work", zh: "作品" }, gallery: { en: "Gallery", zh: "摄影" }, method: { en: "Method", zh: "方法" }, about: { en: "About", zh: "关于" }, contact: { en: "Contact", zh: "联系" } };
  const S = {
    hint: { en: "Drag, scroll or pinch to wander and zoom. Click a photograph to look closer.", zh: "拖动、滚动或双指捏合，来闲逛和缩放。点一张照片看大图。" },
    count: { en: "photographs", zh: "张照片" }, zin: { en: "Zoom in", zh: "放大" }, zout: { en: "Zoom out", zh: "缩小" }, home: { en: "Back to the start", zh: "回到起点" },
    soon: { en: "The walls are being hung. Photographs arrive here soon.", zh: "展墙正在布置，照片很快会挂上来。" }
  };
  const all = G.series.flatMap((s) => s.photos);
  const NP = all.length;

  /* ---------- the layout: each photograph once, on a sunflower spiral from the title outwards ---------- */
  const CW = 480, CH = 360;                 // the page only builds the cells (buckets of the plane) near the screen
  function rng(a, b) { let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263)) | 0; return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; };
  // a fixed order that is not the order of the files, and stays put when photographs are added
  const order = all.map((_, i) => i).sort((i, j) => hash(all[i].file) - hash(all[j].file));
  const GOLD = Math.PI * (3 - Math.sqrt(5)), SP = 250, HOLE = 3, SX = 1.2;   // spacing, room for the title, a little wider than tall
  const X0 = 480, Y0 = 360;                 // the title's centre on the plane (.g-title-card in gallery.css)
  const spots = new Array(NP), buckets = new Map();
  let minX = X0, maxX = X0, minY = Y0, maxY = Y0;
  order.forEach((pi, k) => {
    const p = all[pi], r = rng(k + 17, 29), ar = p.w && p.h ? p.w / p.h : 1.5;
    const box = 230 + r() * 80;                                  // long side in px
    const w = ar >= 1 ? box : box * ar, h = ar >= 1 ? box / ar : box;
    const rad = SP * Math.sqrt(k + HOLE), th = k * GOLD;
    const cx = X0 + Math.cos(th) * rad * SX + (r() - .5) * 40, cy = Y0 + Math.sin(th) * rad / SX + (r() - .5) * 40;
    const s = { pi, x: cx - w / 2, y: cy - h / 2, w, h, rot: (r() - .5) * 5, d: r() * .4 };
    spots[pi] = s;
    minX = Math.min(minX, cx); maxX = Math.max(maxX, cx); minY = Math.min(minY, cy); maxY = Math.max(maxY, cy);
    const key = Math.floor(cx / CW) + "," + Math.floor(cy / CH);
    if (!buckets.has(key)) buckets.set(key, []); buckets.get(key).push(s);
  });

  const cv = $("#cv"), world = $("#world");
  let ox = 0, oy = 0, Z = 1;                // world position of the screen's top-left corner, and the zoom
  const cells = new Map();
  const DPR = Math.min(2, devicePixelRatio || 1);
  const sharp = (s) => s.w * Z * DPR > 380;  // on screen larger than the tiny copy can show
  const srcFor = (p, s) => (sharp(s) ? p.small || p.file : p.tiny || p.small || p.file);
  function buildCell(cx, cy) {
    const el = document.createElement("div"); el.className = "cell"; el.style.transform = `translate(${cx * CW}px,${cy * CH}px)`;
    (buckets.get(cx + "," + cy) || []).forEach((s) => {
      const p = all[s.pi];
      const a = document.createElement("a"); a.className = "ph"; a.href = "#"; a.dataset.i = s.pi; a.setAttribute("aria-label", t(p.title) || "Photograph " + (s.pi + 1));
      a.style.cssText = `left:${(s.x - cx * CW).toFixed(0)}px;top:${(s.y - cy * CH).toFixed(0)}px;width:${s.w.toFixed(0)}px;height:${s.h.toFixed(0)}px;--rot:${s.rot.toFixed(2)}deg;--d:${s.d.toFixed(2)}s`;
      const im = new Image(); im.decoding = "async"; im.alt = t(p.title); im.src = srcFor(p, s); im.draggable = false;
      im.onload = () => im.classList.add("ready"); if (im.complete) im.classList.add("ready");
      a.appendChild(im);
      a.insertAdjacentHTML("beforeend", `<span class="cap">${esc(t(p.title))}<small>${esc([p.place, p.year].filter(Boolean).join(" · "))}</small></span>`);
      el.appendChild(a);
    });
    return el;
  }
  // zooming in swaps the tiny copies on screen for the sharper ones (never back: what is loaded stays)
  let lastZ = 0;
  function sharpen() {
    if (Z <= lastZ) return; lastZ = Z;
    world.querySelectorAll(".ph img").forEach((im) => { const s = spots[+im.parentElement.dataset.i], p = all[s.pi]; if (sharp(s) && p.small && !im.src.endsWith(p.small)) { const n = new Image(); n.onload = () => (im.src = p.small); n.src = p.small; } });
  }
  // how far you can wander: the photographs plus a margin, so the edge is never lost
  const M = 420;
  const clamp = () => { const W = innerWidth / Z, H = innerHeight / Z; ox = Math.max(minX - M - W / 2, Math.min(maxX + M - W / 2, ox)); oy = Math.max(minY - M - H / 2, Math.min(maxY + M - H / 2, oy)); };
  let raf = 0;
  function sync() {
    raf = 0; clamp(); sharpen();
    const W = innerWidth / Z, H = innerHeight / Z, m = 1;
    const x0 = Math.floor(ox / CW) - m, x1 = Math.floor((ox + W) / CW) + m, y0 = Math.floor(oy / CH) - m, y1 = Math.floor((oy + H) / CH) + m;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const k = x + "," + y; if (!cells.has(k)) { const c = buildCell(x, y); cells.set(k, c); world.appendChild(c); } }
    for (const [k, c] of cells) { const [x, y] = k.split(",").map(Number); if (x < x0 - 1 || x > x1 + 1 || y < y0 - 1 || y > y1 + 1) { c.remove(); cells.delete(k); } }
    world.style.transform = `scale(${Z}) translate(${-ox}px,${-oy}px)`;
    cv.style.backgroundSize = `${48 * Z}px ${48 * Z}px`;
    cv.style.backgroundPosition = `${-ox * Z}px ${-oy * Z}px`;
  }
  const queue = () => { if (!raf) raf = requestAnimationFrame(sync); };

  /* ---------- moving and zooming: drag, two-finger scroll, pinch, arrow keys, + and - ---------- */
  const MAXZ = 2.4;
  let MINZ = .3;                             // or less, so the whole collection fits on the screen
  const fitZ = () => { MINZ = Math.max(.08, Math.min(.3, innerWidth / (maxX - minX + 2 * M), innerHeight / (maxY - minY + 2 * M))); };
  let vx = 0, vy = 0, moved = 0, glide = 0;
  const pts = new Map();                     // active pointers, for pinch
  let drag = null, pinch = null;
  const stop = () => { cancelAnimationFrame(glide); glide = 0; vx = vy = 0; };
  const zoomAt = (f, cx, cy) => { const nz = Math.max(MINZ, Math.min(MAXZ, Z * f)); if (nz === Z) return; const wx = ox + cx / Z, wy = oy + cy / Z; Z = nz; ox = wx - cx / Z; oy = wy - cy / Z; queue(); };
  const go = () => { glide = requestAnimationFrame(() => { ox -= vx / Z; oy -= vy / Z; vx *= .94; vy *= .94; queue(); if (Math.abs(vx) + Math.abs(vy) > .15) go(); else glide = 0; }); };
  const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  const mid = () => { const [a, b] = [...pts.values()]; return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };
  cv.addEventListener("pointerdown", (e) => {
    if (e.button > 0) return; stop(); hideHint();
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); cv.setPointerCapture(e.pointerId);
    if (pts.size === 2) { drag = null; pinch = { d: dist(), m: mid() }; moved = 99; }
    else { drag = { x: e.clientX, y: e.clientY, t: performance.now() }; moved = 0; cv.classList.add("grab"); }
  });
  cv.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pts.size >= 2) {
      const d = dist(), m = mid();
      ox -= (m.x - pinch.m.x) / Z; oy -= (m.y - pinch.m.y) / Z; zoomAt(d / pinch.d, m.x, m.y); pinch = { d, m }; queue(); return;
    }
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t);
    ox -= dx / Z; oy -= dy / Z; moved += Math.abs(dx) + Math.abs(dy);
    vx = vx * .6 + (dx / dt * 16) * .4; vy = vy * .6 + (dy / dt * 16) * .4;
    drag = { x: e.clientX, y: e.clientY, t: now }; queue();
  });
  const up = (e) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { const was = drag; drag = null; cv.classList.remove("grab"); if (was && moved > 6 && Math.abs(vx) + Math.abs(vy) > 1) go(); } };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  // trackpad: two-finger scroll pans; pinch (which arrives as ctrl + wheel) and ctrl + wheel zoom around the pointer
  cv.addEventListener("wheel", (e) => {
    e.preventDefault(); stop(); hideHint();
    if (e.ctrlKey) zoomAt(Math.exp(-e.deltaY * (e.deltaMode ? .05 : .01)), e.clientX, e.clientY);
    else { ox += e.deltaX / Z; oy += e.deltaY / Z; queue(); }
  }, { passive: false });
  // Safari pinch on a trackpad
  let gz = 1; addEventListener("gesturestart", (e) => { e.preventDefault(); gz = 1; }); addEventListener("gesturechange", (e) => { e.preventDefault(); zoomAt(e.scale / gz, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2); gz = e.scale; }); addEventListener("gestureend", (e) => e.preventDefault());
  cv.addEventListener("dblclick", (e) => { if (e.target.closest(".ph")) return; zoomAt(Z < 1.2 ? 1.8 : 1 / Z, e.clientX, e.clientY); });
  const step = (k) => { stop(); ox += k[0] * 220 / Z; oy += k[1] * 220 / Z; hideHint(); queue(); };
  addEventListener("keydown", (e) => {
    if (!lb.hidden) return;
    const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (k) { e.preventDefault(); step(k); }
    else if (e.key === "+" || e.key === "=") zoomAt(1.25, innerWidth / 2, innerHeight / 2);
    else if (e.key === "-" || e.key === "_") zoomAt(.8, innerWidth / 2, innerHeight / 2);
    else if (e.key === "0") { Z = 1; recentre(); }
  });
  cv.addEventListener("click", (e) => { const el = document.elementFromPoint(e.clientX, e.clientY), a = el && el.closest(".ph"); e.preventDefault(); if (a && moved < 6) open(+a.dataset.i); });
  addEventListener("resize", () => { fitZ(); queue(); });

  /* ---------- page furniture ---------- */
  let hintOn = true;
  function hideHint() { if (hintOn) { hintOn = false; $("#hint").classList.add("off"); } }
  function recentre() { stop(); Z = 1; ox = -innerWidth / 2 + X0; oy = -innerHeight / 2 + Y0; queue(); }
  function furniture() {
    $("#title").innerHTML = `<p class="g-kicker mono">${esc(t(G.kicker))}</p><h1>${esc(t(G.title))}</h1><p>${esc(t(G.statement))}</p>`;
    $("#hint").firstElementChild.textContent = NP ? t(S.hint) : t(S.soon);
    $("#count").textContent = NP ? `${NP} ${t(S.count)}` : "";
    $("#home").setAttribute("aria-label", t(S.home)); $("#home").title = t(S.home); $("#zin").title = t(S.zin); $("#zout").title = t(S.zout);
    document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(N[el.dataset.t])));
    $("#lang").textContent = lang === "zh" ? "EN" : "中文";
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
  }
  function relang() { furniture(); for (const c of cells.values()) c.remove(); cells.clear(); queue(); }

  /* ---------- lightbox (same photographs, in a fixed order) ---------- */
  const lb = $("#lb"), img = $("#lb-img"), cap = $("#lb-cap"), cnt = $("#lb-count");
  let cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + NP) % NP; const p = all[cur];
    img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    img.src = p.file || p.small; img.alt = t(p.title);
    cap.innerHTML = `<b>${esc(t(p.title))}</b>${esc([p.place, p.year].filter(Boolean).join(" · "))}`;
    cnt.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(NP).padStart(2, "0")}`;
    [cur + 1, cur - 1].forEach((k) => { const q = all[(k + NP) % NP]; if (q) new Image().src = q.file || q.small; });
  }
  function open(i) { if (!NP) return; lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add("lb-open"); show(i); $("#lb-close").focus(); }
  function close() { lb.hidden = true; document.body.classList.remove("lb-open"); img.src = ""; if (lastFocus) lastFocus.focus(); }
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(cur - 1));
  $("#lb-next").addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(cur - 1); else if (e.key === "ArrowRight") show(cur + 1); });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); tx = null; }, { passive: true });

  $("#lang").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; try { localStorage.setItem("lang", lang); } catch (e) {} relang(); });
  $("#home").addEventListener("click", recentre);
  $("#zin").addEventListener("click", () => zoomAt(1.3, innerWidth / 2, innerHeight / 2)); $("#zout").addEventListener("click", () => zoomAt(1 / 1.3, innerWidth / 2, innerHeight / 2));
  fitZ(); furniture(); recentre();
})();
