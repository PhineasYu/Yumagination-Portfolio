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
    soon: { en: "The walls are being hung. Photographs arrive here soon.", zh: "展墙正在布置，照片很快会挂上来。" },
    all: { en: "All", zh: "全部" }, spec: { en: "Drag along the colours to see the photographs of one colour", zh: "沿着色带拖动，查看同一种颜色的照片" },
    bw: { en: "Black & white", zh: "黑白" }, hint2: { en: "Drag, scroll or pinch to wander. Drag the colour bar to see one colour.", zh: "拖动、滚动或双指捏合来闲逛。拖动下方色带，只看一种颜色。" }
  };
  const all = G.series.flatMap((s) => s.photos);
  const NP = all.length;

  /* ---------- the layout: each photograph once, on a sunflower spiral from the title outwards ---------- */
  const CW = 480, CH = 360;                 // the page only builds the cells (buckets of the plane) near the screen
  function rng(a, b) { let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263)) | 0; return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; };
  // a fixed order that is not the order of the files, and stays put when photographs are added
  const order = all.map((_, i) => i).sort((i, j) => hash(all[i].file) - hash(all[j].file));
  const GOLD = Math.PI * (3 - Math.sqrt(5)), SP = 300, HOLE = 2, SX = 1.2;   // spacing, room for the title, a little wider than tall
  const X0 = 480, Y0 = 360;                 // the title's centre on the plane (.g-title-card in gallery.css)
  const spots = new Array(NP), buckets = new Map();
  let minX = X0, maxX = X0, minY = Y0, maxY = Y0;
  // nothing may overlap: not the title, not another photograph (GAP covers the white frame, the tilt and some air)
  const GAP = 36, placed = [{ x: X0 - 250, y: Y0 - 130, w: 500, h: 260 }];
  const hits = (x, y, w, h) => placed.some((q) => x < q.x + q.w + GAP && x + w + GAP > q.x && y < q.y + q.h + GAP && y + h + GAP > q.y);
  order.forEach((pi, k) => {
    const p = all[pi], r = rng(k + 17, 29), ar = p.w && p.h ? p.w / p.h : 1.5;
    const box = 300 + r() * 80;                                  // long side in px
    const w = ar >= 1 ? box : box * ar, h = ar >= 1 ? box / ar : box;
    const th = k * GOLD, jx = (r() - .5) * 40, jy = (r() - .5) * 40;
    let rad = SP * Math.sqrt(k + HOLE), cx, cy;
    for (;;) { cx = X0 + Math.cos(th) * rad * SX + jx; cy = Y0 + Math.sin(th) * rad / SX + jy; if (!hits(cx - w / 2, cy - h / 2, w, h)) break; rad += 10; }   // step outwards until free
    placed.push({ x: cx - w / 2, y: cy - h / 2, w, h });
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
      const a = document.createElement("a"); a.className = "ph" + (matches(s.pi) ? "" : " dim"); a.href = "#"; a.dataset.i = s.pi; a.setAttribute("aria-label", t(p.title) || "Photograph " + (s.pi + 1));
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
  const COARSE = matchMedia("(pointer: coarse)").matches;   // phones and tablets: a floor on zooming out, so the page never has to paint the whole plane at once
  const fitZ = () => { MINZ = Math.max(COARSE ? .3 : .08, Math.min(.3, innerWidth / (maxX - minX + 2 * M), innerHeight / (maxY - minY + 2 * M))); };
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
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); try { cv.setPointerCapture(e.pointerId); } catch (err) {}
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
  // (on iPhone and iPad the same pinch also arrives as two pointers, handled above; zooming twice sent the zoom flying and crashed the page)
  let gz = 1; addEventListener("gesturestart", (e) => { e.preventDefault(); gz = 1; }); addEventListener("gesturechange", (e) => { e.preventDefault(); if (!pinch && pts.size < 2 && !COARSE) zoomAt(e.scale / gz, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2); gz = e.scale; }); addEventListener("gestureend", (e) => e.preventDefault());
  cv.addEventListener("dblclick", (e) => { if (e.target.closest(".ph")) return; zoomAt(Z < 1.2 ? 1.8 : 1 / Z, e.clientX, e.clientY); });
  const step = (k) => { stop(); ox += k[0] * 220 / Z; oy += k[1] * 220 / Z; hideHint(); queue(); };
  addEventListener("keydown", (e) => {
    if (!lb.hidden || document.activeElement === track) return;
    const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (k) { e.preventDefault(); step(k); }
    else if (e.key === "+" || e.key === "=") zoomAt(1.25, innerWidth / 2, innerHeight / 2);
    else if (e.key === "-" || e.key === "_") zoomAt(.8, innerWidth / 2, innerHeight / 2);
    else if (e.key === "0") { Z = 1; recentre(); }
  });
  cv.addEventListener("click", (e) => { const el = document.elementFromPoint(e.clientX, e.clientY), a = el && el.closest(".ph"); e.preventDefault(); if (a && moved < 6) open(+a.dataset.i); });
  addEventListener("resize", () => { fitZ(); queue(); });

  /* ---------- the colour bar: each photograph has a main colour (p.hue, or null for black-and-white) ---------- */
  const track = $("#spec-track"), knob = $("#spec-knob"), spec = $("#spec");
  const HUES = all.some((p) => "hue" in p);
  const G0 = .075, H0 = .08;                 // the grey part of the bar, then the spectrum from red round to red
  let pick = null;                           // null: everything; "bw"; or a hue in degrees
  const near = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d) <= 24; };
  function matches(pi) { if (pick == null) return true; const h = all[pi].hue; return pick === "bw" ? h == null : h != null && near(h, pick); }
  const posOf = (v) => (v === "bw" ? G0 / 2 : H0 + (v / 360) * (1 - H0));
  function paint() {
    const n = all.filter((_, i) => matches(i)).length;
    $("#spec-n").textContent = pick == null ? `${NP} ${t(S.count)}` : `${n} / ${NP}${pick === "bw" ? " · " + t(S.bw) : ""}`;
    spec.classList.toggle("on", pick != null);
    if (pick != null) { knob.style.left = (posOf(pick) * 100).toFixed(2) + "%"; knob.style.setProperty("--k", pick === "bw" ? "#bdbdbd" : `hsl(${pick} 75% 55%)`); }
    track.setAttribute("aria-valuenow", pick === "bw" ? 0 : pick == null ? "" : pick);
    track.setAttribute("aria-valuetext", pick == null ? t(S.all) : pick === "bw" ? t(S.bw) : `${Math.round(pick)}°, ${n}`);
  }
  function choose(v) {
    pick = v; paint();
    world.querySelectorAll(".ph").forEach((a) => a.classList.toggle("dim", !matches(+a.dataset.i)));
  }
  const fromX = (x) => { const b = track.getBoundingClientRect(), f = Math.max(0, Math.min(1, (x - b.left) / b.width)); return f < (G0 + H0) / 2 ? "bw" : ((f - H0) / (1 - H0)) * 360; };
  // after choosing, if none of those photographs is on screen, glide to the nearest one
  function findOne() {
    if (pick == null) return;
    const W = innerWidth / Z, H = innerHeight / Z, cx = ox + W / 2, cy = oy + H / 2;
    const hits = spots.filter((s) => matches(s.pi)); if (!hits.length) return;
    if (hits.some((s) => s.x + s.w > ox && s.x < ox + W && s.y + s.h > oy + 60 / Z && s.y < oy + H - 90 / Z)) return;
    const s = hits.reduce((a, b) => (Math.hypot(a.x - cx, a.y - cy) < Math.hypot(b.x - cx, b.y - cy) ? a : b));
    const fx = ox, fy = oy, tx = s.x + s.w / 2 - W / 2, ty = s.y + s.h / 2 - H / 2, t0 = performance.now(); stop();
    const run = (now) => { const k = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - k, 3); ox = fx + (tx - fx) * e; oy = fy + (ty - fy) * e; queue(); if (k < 1) glide = requestAnimationFrame(run); else glide = 0; };
    glide = requestAnimationFrame(run);
  }
  if (HUES && NP) {
    spec.hidden = false;
    $("#spec-ticks").innerHTML = all.map((p) => `<i style="left:${(posOf(p.hue == null ? "bw" : p.hue) * 100).toFixed(2)}%;background:${p.tone || "#9a9a9a"}"></i>`).join("");
    let sliding = false;
    track.addEventListener("pointerdown", (e) => { sliding = true; track.setPointerCapture(e.pointerId); hideHint(); choose(fromX(e.clientX)); });
    track.addEventListener("pointermove", (e) => { if (sliding) choose(fromX(e.clientX)); });
    const end = () => { if (sliding) { sliding = false; findOne(); } };
    track.addEventListener("pointerup", end); track.addEventListener("pointercancel", end);
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); const d = e.key === "ArrowRight" ? 1 : -1; choose(pick == null ? (d > 0 ? "bw" : 350) : pick === "bw" ? (d > 0 ? 0 : "bw") : pick + d * 15 < 0 ? "bw" : (pick + d * 15) % 360); findOne(); }
      else if (e.key === "Escape") choose(null);
    });
    $("#spec-all").addEventListener("click", () => choose(null));
  }

  /* ---------- page furniture ---------- */
  let hintOn = true;
  function hideHint() { if (hintOn) { hintOn = false; $("#hint").classList.add("off"); } }
  function recentre() { stop(); Z = 1; ox = -innerWidth / 2 + X0; oy = -innerHeight / 2 + Y0; queue(); }
  function furniture() {
    $("#title").innerHTML = `<p class="g-kicker mono">${esc(t(G.kicker))}</p><h1>${esc(t(G.title))}</h1><p>${esc(t(G.statement))}</p>`;
    $("#hint").firstElementChild.textContent = NP ? t(HUES ? S.hint2 : S.hint) : t(S.soon);
    $("#spec-all").textContent = t(S.all); track.setAttribute("aria-label", t(S.spec)); paint();
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
  const list = () => { const l = all.map((_, i) => i).filter(matches); return l.length ? l : all.map((_, i) => i); };
  const step1 = (dir) => { const l = list(), k = l.indexOf(cur); show(l[((k < 0 ? 0 : k + dir) + l.length) % l.length]); };
  function show(i) {
    cur = (i + NP) % NP; const p = all[cur];
    img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    img.src = p.file || p.small; img.alt = t(p.title);
    cap.innerHTML = `<b>${esc(t(p.title))}</b>${esc([p.place, p.year].filter(Boolean).join(" · "))}`;
    const l = list(), k = l.indexOf(cur);
    cnt.textContent = `${String(k + 1).padStart(2, "0")} / ${String(l.length).padStart(2, "0")}`;
    [l[(k + 1) % l.length], l[(k - 1 + l.length) % l.length]].forEach((j) => { const q = all[j]; if (q) new Image().src = q.file || q.small; });
  }
  function open(i) { if (!NP) return; lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add("lb-open"); show(i); $("#lb-close").focus(); }
  function close() { lb.hidden = true; document.body.classList.remove("lb-open"); img.src = ""; if (lastFocus) lastFocus.focus(); }
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => step1(-1));
  $("#lb-next").addEventListener("click", () => step1(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") step1(-1); else if (e.key === "ArrowRight") step1(1); });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step1(dx < 0 ? 1 : -1); tx = null; }, { passive: true });

  $("#lang").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; try { localStorage.setItem("lang", lang); } catch (e) {} relang(); });
  $("#home").addEventListener("click", recentre);
  $("#zin").addEventListener("click", () => zoomAt(1.3, innerWidth / 2, innerHeight / 2)); $("#zout").addEventListener("click", () => zoomAt(1 / 1.3, innerWidth / 2, innerHeight / 2));
  fitZ(); furniture(); recentre();
})();
