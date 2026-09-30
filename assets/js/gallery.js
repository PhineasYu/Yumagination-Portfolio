/* Gallery: an endless canvas. Photographs are scattered across a plane that has no edge;
   drag (or scroll, or use the arrow keys) to move across it. The plane is built from cells,
   and only the cells near the screen exist in the page, so 100 photographs or 1,000 cost the same.
   Each cell is laid out from its own coordinates, so the scatter is random-looking but never changes. */
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
    hint: { en: "Drag to wander. Scroll works too. Click a photograph to look closer.", zh: "拖动来闲逛，滚轮也可以。点一张照片看大图。" },
    count: { en: "photographs", zh: "张照片" }, home: { en: "Back to the start", zh: "回到起点" },
    soon: { en: "The walls are being hung. Photographs arrive here soon.", zh: "展墙正在布置，照片很快会挂上来。" }
  };
  const all = G.series.flatMap((s) => s.photos);
  const NP = all.length;

  /* ---------- the plane ---------- */
  const CW = 960, CH = 720;                 // one cell
  const SLOTS = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]; // 3 x 2 sub-slots per cell
  const PER = 3;                            // photographs per cell (of 6 slots)
  function rng(a, b) { let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263)) | 0; return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; }; }
  /* spiral index of a cell: 0 at the start, then outwards, so neighbouring cells take consecutive photographs */
  function spiral(x, y) {
    const k = Math.max(Math.abs(x), Math.abs(y)); if (!k) return 0;
    const m = (2 * k - 1) ** 2;
    if (x === k && y > -k) return m + y + k - 1;
    if (y === k) return m + 2 * k - 1 + (k - x);
    if (x === -k) return m + 4 * k - 1 + (k - y);
    return m + 6 * k - 1 + (x + k);
  }
  // a fixed shuffle, so the order is not the order of the files
  const perm = Array.from({ length: NP }, (_, i) => i);
  { const r = rng(7, 11); for (let i = NP - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; } }

  const cv = $("#cv"), world = $("#world");
  let ox = 0, oy = 0;                       // world position of the screen's top-left corner
  const cells = new Map();
  function buildCell(cx, cy) {
    const el = document.createElement("div"); el.className = "cell"; el.style.transform = `translate(${cx * CW}px,${cy * CH}px)`;
    if (NP && !(cx === 0 && cy === 0)) {
      const r = rng(cx + 1000, cy + 1000), s = spiral(cx, cy);
      const order = SLOTS.map((_, i) => i).sort(() => r() - .5).slice(0, PER);
      order.forEach((si, j) => {
        const pi = perm[(s * PER + j) % NP], p = all[pi], [sx, sy] = SLOTS[si];
        const ar = p.w && p.h ? p.w / p.h : 1.5;
        const box = 230 + r() * 100;                       // long side in px
        const w = ar >= 1 ? box : box * ar, h = ar >= 1 ? box / ar : box;
        const x = sx * (CW / 3) + (CW / 3 - w) / 2 + (r() - .5) * 60, y = sy * (CH / 2) + (CH / 2 - h) / 2 + (r() - .5) * 50;
        const a = document.createElement("a"); a.className = "ph"; a.href = "#"; a.dataset.i = pi; a.setAttribute("aria-label", t(p.title) || "Photograph " + (pi + 1));
        a.style.cssText = `left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;width:${w.toFixed(0)}px;height:${h.toFixed(0)}px;--rot:${((r() - .5) * 5).toFixed(2)}deg;--d:${(r() * 0.4).toFixed(2)}s`;
        const im = new Image(); im.decoding = "async"; im.alt = t(p.title); im.src = p.small || p.thumb || p.file; im.draggable = false;
        im.onload = () => im.classList.add("ready"); if (im.complete) im.classList.add("ready");
        a.appendChild(im);
        a.insertAdjacentHTML("beforeend", `<span class="cap">${esc(t(p.title))}<small>${esc([p.place, p.year].filter(Boolean).join(" · "))}</small></span>`);
        el.appendChild(a);
      });
    }
    return el;
  }
  let raf = 0;
  function sync() {
    raf = 0;
    const W = innerWidth, H = innerHeight, m = 1;
    const x0 = Math.floor(ox / CW) - m, x1 = Math.floor((ox + W) / CW) + m, y0 = Math.floor(oy / CH) - m, y1 = Math.floor((oy + H) / CH) + m;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const k = x + "," + y; if (!cells.has(k)) { const c = buildCell(x, y); cells.set(k, c); world.appendChild(c); } }
    for (const [k, c] of cells) { const [x, y] = k.split(",").map(Number); if (x < x0 - 1 || x > x1 + 1 || y < y0 - 1 || y > y1 + 1) { c.remove(); cells.delete(k); } }
    world.style.transform = `translate3d(${-ox}px,${-oy}px,0)`;
    cv.style.backgroundPosition = `${-ox}px ${-oy}px`;
  }
  const queue = () => { if (!raf) raf = requestAnimationFrame(sync); };

  /* ---------- moving ---------- */
  let vx = 0, vy = 0, drag = null, moved = 0, glide = 0;
  const stop = () => { cancelAnimationFrame(glide); glide = 0; vx = vy = 0; };
  const go = () => { glide = requestAnimationFrame(() => { ox -= vx; oy -= vy; vx *= .94; vy *= .94; queue(); if (Math.abs(vx) + Math.abs(vy) > .15) go(); else glide = 0; }); };
  cv.addEventListener("pointerdown", (e) => { if (e.button > 0) return; stop(); drag = { x: e.clientX, y: e.clientY, t: performance.now() }; moved = 0; cv.setPointerCapture(e.pointerId); cv.classList.add("grab"); hideHint(); });
  cv.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t);
    ox -= dx; oy -= dy; moved += Math.abs(dx) + Math.abs(dy);
    vx = vx * .6 + (dx / dt * 16) * .4; vy = vy * .6 + (dy / dt * 16) * .4;
    drag = { x: e.clientX, y: e.clientY, t: now }; queue();
  });
  const up = () => { if (!drag) return; drag = null; cv.classList.remove("grab"); if (moved > 6 && Math.abs(vx) + Math.abs(vy) > 1) go(); };
  cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
  cv.addEventListener("wheel", (e) => { e.preventDefault(); if (e.ctrlKey) return; stop(); ox += e.deltaX; oy += e.deltaY; hideHint(); queue(); }, { passive: false });
  addEventListener("keydown", (e) => { if (!lb.hidden) return; const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key]; if (k) { e.preventDefault(); stop(); ox += k[0] * 220; oy += k[1] * 220; hideHint(); queue(); } });
  cv.addEventListener("click", (e) => { const el = document.elementFromPoint(e.clientX, e.clientY), a = el && el.closest(".ph"); e.preventDefault(); if (a && moved < 6) open(+a.dataset.i); });
  addEventListener("resize", () => { ox += 0; queue(); });

  /* ---------- page furniture ---------- */
  let hintOn = true;
  function hideHint() { if (hintOn) { hintOn = false; $("#hint").classList.add("off"); } }
  function recentre() { stop(); ox = -innerWidth / 2 + CW / 2; oy = -innerHeight / 2 + CH / 2; queue(); }
  function furniture() {
    $("#title").innerHTML = `<p class="g-kicker mono">${esc(t(G.kicker))}</p><h1>${esc(t(G.title))}</h1><p>${esc(t(G.statement))}</p>`;
    $("#hint").firstElementChild.textContent = NP ? t(S.hint) : t(S.soon);
    $("#count").textContent = NP ? `${NP} ${t(S.count)}` : "";
    $("#home").setAttribute("aria-label", t(S.home)); $("#home").title = t(S.home);
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
    img.src = p.file || p.thumb; img.alt = t(p.title);
    cap.innerHTML = `<b>${esc(t(p.title))}</b>${esc([p.place, p.year].filter(Boolean).join(" · "))}`;
    cnt.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(NP).padStart(2, "0")}`;
    [cur + 1, cur - 1].forEach((k) => { const q = all[(k + NP) % NP]; if (q) new Image().src = q.file || q.thumb; });
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
  furniture(); recentre();
})();
