(function () {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DRAFT = /[?&]draft\b/.test(location.search);

  /* ---------- language ---------- */
  let lang = "en";
  try {
    lang = localStorage.getItem("lang") === "zh" ? "zh" : "en"; // English by default; Chinese only if chosen
  } catch (e) {}
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] || o.en || "");
  const arr = (o) => (o && (o[lang] || o.en)) || [];
  const STR = {
    letsTalk: { en: "Let's talk", zh: "聊一聊" }, viewWork: { en: "View work", zh: "看作品" },
    work: { en: "Work", zh: "作品" }, gallery: { en: "Gallery", zh: "摄影" }, workLede: { en: "Five areas: UX & UI, service design and research, AI products, building and automating, and games. A project sits under every area it belongs to, so it can show up in more than one. Most of them actually run: watch them in motion, or open them yourself.", zh: "五个方向：用户体验与界面、服务设计与研究、AI 产品、开发与自动化、游戏。一个作品会出现在它涉及的每个方向里。大多数作品都是能运行的：看它们动起来，或者直接打开。" },
    zoneLbl: { en: "Area", zh: "方向" }, tagLbl: { en: "Tag", zh: "标签" }, zone: { en: "Areas", zh: "方向" },
    empty: { en: "Nothing here yet.", zh: "这个方向暂时还没有作品。" },
    method: { en: "Method", zh: "方法" }, about: { en: "About", zh: "关于" }, contact: { en: "Contact", zh: "联系" },
    recog: { en: "Awards & wins", zh: "获奖" }, tools: { en: "Working with", zh: "常用工具" },
    all: { en: "All", zh: "全部" },
    back: { en: "← All work", zh: "← 全部作品" }, next: { en: "Next", zh: "下一个" }, prev: { en: "Previous", zh: "上一个" },
    role: { en: "Role", zh: "角色" }, when: { en: "Timeline", zh: "时间" }, status: { en: "Status", zh: "状态" }, skills: { en: "Skills & stack", zh: "技能与技术栈" }, links: { en: "Links", zh: "链接" },
    rec: { en: "Recorded from the running app", zh: "录自正在运行的应用" }, ill: { en: "Illustration", zh: "示意图" }, live: { en: "Live", zh: "在线可玩" },
    open: { en: "Open ↗", zh: "新窗口打开 ↗" },
    draft: { en: "To confirm before sharing", zh: "分享前待确认" },
    footer: { en: "Designed and built with Claude Code.", zh: "由 Claude Code 协助设计与搭建。" },
    talkTitle: { en: "Let's build <em>something.</em>", zh: "一起做<em>点什么。</em>" },
    talkLede: { en: "Open to junior roles. The fastest way to reach me is email.", zh: "正在寻找 junior 岗位。最快的联系方式是邮件。" },
    kicker: { en: "Case study", zh: "案例" },
    read: { en: "Read case study", zh: "阅读案例" }, smaller: { en: "Smaller builds, lighter notes.", zh: "更小的作品，更轻的记录。" },
    available: { en: "Available for work", zh: "正在找工作" }, tz: { en: "Stockholm · CET", zh: "斯德哥尔摩 · CET" }, email: { en: "Email", zh: "邮件" }
  };
  const s = (k) => t(STR[k]);
  const setLang = (l) => {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = l === "zh" ? "zh" : "en";
    render(true);
  };

  /* ---------- helpers ---------- */
  const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (u) => /^https?:/.test(u);
  const link = (l) => `<a href="${esc(l.url)}"${ext(l.url) ? ' target="_blank" rel="noopener"' : ""}>${/github\.com/.test(l.url) ? ic("github") : ""}${esc(t(l.label))} ↗</a>`;
  const heading = (h) => esc(t(h)).replace(" — ", ' <span class="dash">—</span> ');
  const badge = (kind) => `<span class="badge ${kind}">${esc(s(kind))}</span>`;

  /* icons (assets/js/icons.js): one per area, so chips and labels are not just words */
  const ZONE_IC = { all: "layers", ux: "layout-dashboard", service: "users", ai: "bot", build: "hammer", games: "gamepad-2" };
  const ic = (n, c) => (window.ic ? window.ic(n, c) : "");

  /* company logos: real files in assets/logos, sized by D.logos[id].h */
  const logoImg = (id, cls = "") => { const l = D.logos && D.logos[id]; return l ? `<img class="logo ${cls}" src="assets/logos/${esc(l.file)}" alt="${esc(l.name)}" title="${esc(l.name)}" style="--h:${l.h}px${l.th ? `;--th:${l.th}px` : ""}" decoding="async">` : ""; };

  /* ---------- media ---------- */
  function videoTag(m, extra = "") {
    return `<video src="${esc(m.src)}" poster="${esc(m.poster || "")}" autoplay muted loop playsinline preload="metadata" ${extra}></video>`;
  }
  /* phones: a drawn iPhone (bezel, Dynamic Island, status bar) around the screen; sb = status-bar colour */
  const phone = (inner, sb) => `<span class="iphone"${sb ? ` style="--sb:${esc(sb)}"` : ""}><span class="iphone-screen">${inner}</span></span>`;
  function media(m) {
    if (!m) return "";
    const bg = m.bg ? ` style="--bg:${m.bg}"` : "";
    const wrap = (inner, kind, extra = "") => {
      const cls = (m.frame === "browser" ? "frame-browser" : m.frame === "phone" ? "frame-phone" : "") + (m.narrow ? " narrow" : "");
      return `<div class="media ${cls}"${bg}>${kind ? badge(kind) : ""}${m.frame === "phone" ? phone(inner, m.sb) : inner}${extra}</div>`;
    };
    switch (m.type) {
      case "video": return wrap(videoTag(m), m.tag);
      case "img": return wrap(`<img src="${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy" class="${m.fit === "contain" ? "contain" : ""}">`, m.tag);
      case "embed": {
        const r = m.ratio ? ` style="--r:${m.ratio}"` : "";
        const inner = `<div class="embed embed-ratio"${r}><iframe src="${esc(m.src)}" title="Live demo" loading="lazy" allow="clipboard-write; fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe></div>`;
        const open = m.open ? `<a class="open" href="${esc(m.open)}" target="_blank" rel="noopener">${esc(s("open"))}</a>` : "";
        return wrap(inner, "live", open);
      }
      case "motion": return `<div class="mo-wrap">${window.motion(m.id)}${badge("ill")}</div>`;
      case "stats": return `<div class="stats">${m.items.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(t(l))}</span></div>`).join("")}</div>`;
      case "steps": return `<div class="stepl">${m.items.map(([k, l, c]) => `<div><span class="k"${c ? ` style="background:${esc(c)};color:${/^#(F0AB3C|8DB44B)$/i.test(c) ? "var(--ink)" : "#fff"}"` : ""}>${esc(t(k))}</span><p>${esc(t(l))}</p></div>`).join("")}</div>`;
    }
    return "";
  }

  function tile(p) {
    const tl = p.tile || {}, go = `<span class="go">${esc(s("read"))} <span class="arrow">→</span></span>`;
    if (tl.video) {
      const bg = p.hero && p.hero.bg ? ` style="background:${p.hero.bg}"` : "";
      const v = videoTag({ src: `assets/media/${tl.video}.mp4`, poster: `assets/media/${tl.poster}.jpg` });
      return p.shape === "tall" ? `<span class="tile is-phone"${bg}>${phone(v, tl.sb)}${go}</span>` : `<span class="tile"${bg}>${v}${go}</span>`;
    }
    if (tl.img) return `<span class="tile${tl.fill ? " fill" : ""}"><img src="${esc(tl.img)}" alt="" loading="lazy">${tl.emoji ? `<span class="tile-emoji" aria-hidden="true" style="left:${(tl.emojiAt || [50, 50])[0]}%;top:${(tl.emojiAt || [50, 50])[1]}%;--rot:${tl.emojiRot == null ? 45 : tl.emojiRot}deg">${tl.emoji}</span>` : ""}${go}</span>`;
    if (tl.motion) return `<span class="tile">${window.motion(tl.motion)}${go}</span>`;
    if (tl.text) return `<span class="tile tile-text">${glyph(p.id)}<span class="tt-big">${esc(t(tl.text))}</span>${tl.sub ? `<span class="tt-sub mono">${esc(t(tl.sub))}</span>` : ""}${go}</span>`;
    return `<span class="tile">${go}</span>`;
  }

  /* small drawn glyphs for text tiles: flat shapes, slow ambient motion */
  function glyph(id) {
    const G = {
      "let-me-die": `<circle class="g-thin" cx="100" cy="100" r="78"/><circle class="g-line g-spin" cx="100" cy="100" r="52" stroke-dasharray="18 14"/><path class="g-thin" d="M100 6v48M100 146v48M6 100h48M146 100h48"/><circle class="g-deep g-blink" cx="100" cy="100" r="9"/>`,
      "disco-fever": [0, 1, 2, 3, 4].map((i) => `<rect class="${i === 2 ? "g-deep" : "g-fill"} g-beat" style="animation-delay:${i * 0.18}s" x="${14 + i * 38}" y="30" width="24" height="160" rx="3"/>`).join(""),
      "community-viewfinder": `<path class="g-line" d="M10 50V10h40M150 10h40v40M190 150v40h-40M50 190H10v-40"/><rect class="g-fill g-slide" x="48" y="54" width="70" height="56" rx="2"/>`,
      "notchbreak": `<rect class="g-thin" x="8" y="36" width="184" height="128" rx="12"/><rect class="g-ink" x="70" y="36" width="60" height="16" rx="6"/><circle class="g-fill g-blink" cx="100" cy="112" r="22"/>`,
      "revive-automation": [0, 1, 2, 3].map((i) => `<rect class="g-thin" x="10" y="${18 + i * 44}" width="30" height="30" rx="3"/><rect class="g-fill g-blink" style="animation-delay:${i * 0.6}s" x="16" y="${24 + i * 44}" width="18" height="18" rx="2"/><rect class="g-deep" x="56" y="${28 + i * 44}" width="${130 - i * 22}" height="10" rx="2"/>`).join(""),
      "longevity-3d": `<path class="g-thin" d="M8 172H192"/><path class="g-line" d="M8 44C48 44 56 138 96 138H112C152 138 160 44 192 44"/><circle class="g-fill g-blink" cx="104" cy="138" r="12"/><circle class="g-ink" cx="8" cy="44" r="5"/><circle class="g-ink" cx="192" cy="44" r="5"/>`,
      "microhack": `<path class="g-thin" d="M40 150L100 50L160 150Z"/>` + [[40, 150], [100, 50], [160, 150]].map(([x, y], i) => `<circle class="${i === 1 ? "g-deep" : "g-fill"} g-blink" style="animation-delay:${i * 0.8}s" cx="${x}" cy="${y}" r="20"/>`).join("")
    };
    const inner = G[id] || `<circle class="g-fill g-drift" cx="80" cy="90" r="56"/><rect class="g-deep" x="110" y="100" width="70" height="70" rx="2"/>`;
    return `<svg class="glyph" viewBox="0 0 200 200" aria-hidden="true">${inner}</svg>`;
  }

  /* bento: justified rows. Each card declares its media shape (projects.js
     `shape`); a card's width in its row is proportional to that aspect ratio,
     so every row fills the width exactly, media share one height per row, and
     nothing is cropped. Rows are chosen (order kept) to sit as close as
     possible to a target width, so filtering never leaves holes. */
  const RATIO = { wide: 1.6, tall: 0.8, square: 1 };
  let CARDS = [];
  function pack() {
    const grid = $(".work-grid"); if (!grid) return;
    const cards = CARDS.filter((c) => !c.hidden), n = cards.length;
    const w = grid.clientWidth, one = w < 600;
    const target = w > 1100 ? 3.2 : 2.3;
    const r = cards.map((c) => RATIO[c.dataset.shape] || 1.6);
    // best[i] = lowest cost of laying out the first i cards; rows of 1–4 cards
    const best = [0], cut = [0];
    for (let i = 1; i <= n; i++) {
      best[i] = Infinity;
      for (let k = 1; k <= (one ? 1 : Math.min(4, i)); k++) {
        let sum = 0; for (let j = i - k; j < i; j++) sum += r[j];
        const c = best[i - k] + (one ? 0 : (sum - target) ** 2 + (k === 1 && n > 1 ? 0.6 : 0));
        if (c < best[i]) { best[i] = c; cut[i] = i - k; }
      }
    }
    const rows = [];
    for (let i = n; i > 0; i = cut[i]) rows.unshift(cards.slice(cut[i], i));
    grid.replaceChildren(...rows.map((row) => {
      const el = document.createElement("div"); el.className = "brow"; el.append(...row); row.forEach((c, k) => c.style.setProperty("--k", k));
      // a lone short row (only when very few cards match) keeps its size instead of blowing up
      const sum = row.reduce((a, c) => a + (RATIO[c.dataset.shape] || 1.6), 0);
      if (!one && sum < target * 0.6) { const sp = document.createElement("span"); sp.className = "spacer"; sp.style.setProperty("--r", (target * 0.6 - sum).toFixed(2)); el.append(sp); }
      return el;
    }));
    watchVideos();
  }
  let packW = 0, packT;
  addEventListener("resize", () => { clearTimeout(packT); packT = setTimeout(() => { const g = $(".work-grid"); if (g && g.clientWidth !== packW) { packW = g.clientWidth; pack(); } }, 150); });

  /* ---------- home ---------- */
  function home() {
    const P = D.projects.filter((p) => !p.hidden), pos = D.person.tagline[lang] || D.person.tagline.en;
    const zoneNames = (p) => `<span class="zn">${ic(ZONE_IC[p.zones[0]])}<span>${p.zones.map((z) => esc(t(D.cats.find((c) => c.id === z)))).join(" · ")}</span></span>`;
    const award = D.tags.find((x) => x.id === "award"), intern = D.tags.find((x) => x.id === "internship");
    return `
    <section class="hero" id="top">
      <canvas class="silk" aria-hidden="true"></canvas>
      <div class="hero-in">
        <h1 class="name">${esc(D.person.name)}</h1>
        <div class="hero-sub"><p class="pos"><span class="p1">${esc(pos[0])}</span><span class="p2">${esc(pos[1])}</span></p></div>
      </div>
    </section>

    <section class="section" id="work">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("work"))}</h2></div>
      <div class="filters" role="group" aria-label="${esc(s("zoneLbl"))}"><span class="flabel mono">${esc(s("zoneLbl"))}</span>${D.cats.map((c) => `<button class="chip" type="button" data-zone="${c.id}" aria-pressed="${c.id === filt.zone}">${ic(ZONE_IC[c.id])}${esc(t(c))}</button>`).join("")}</div>
      <div class="work-grid">
        ${P.map((p) => `
          <a class="proj rv ${p.shape || "wide"}" href="#/work/${p.id}" data-id="${p.id}" data-shape="${p.shape || "wide"}" data-zones="${p.zones.join(" ")}">
            ${tile(p)}
            <span class="proj-cap">
              <span class="proj-title">${esc(p.title)}</span>
              <span class="proj-line">${esc(t(p.cap))}</span>
              <span class="proj-tags">${zoneNames(p)}${award && p.tags.includes("award") ? `<span class="pill accent"><span aria-hidden="true">🏆</span>${esc(t(award))}</span>` : ""}${intern && p.tags.includes("internship") ? `<span class="pill lilac"><span aria-hidden="true">💼</span>${esc(t(intern))}</span>` : ""}</span>
            </span>
          </a>`).join("")}
      </div>
      <p class="empty" hidden>${esc(s("empty"))}</p>
    </section>

    <section class="section" id="recognition">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("recog"))}</h2></div>
      <div class="awards">${D.awards.map((a, i) => `<div class="award rv" style="--i:${i}"><div class="award-top"><span class="mono dim">${a.year}</span>${a.logo ? logoImg(a.logo, "sm") : ""}</div><b>${esc(t(a.title))}</b><p>${esc(t(a.note))}</p>${DRAFT && a.verify ? `<p class="draft mono">${esc(s("draft"))}</p>` : ""}</div>`).join("")}</div>
    </section>

    ${galleryPixel()}

    <div class="tools" aria-label="${esc(t(D.ui.logosLbl))}"><div class="tools-track">${[...D.logoStrip, ...D.logoStrip].map((id) => `<span>${logoImg(id)}</span>`).join("")}</div></div>

    ${aboutBlock()}
    ${contactBlock()}`;
  }

  /* home: a short, loud window onto the photography page. Colours are taken from the real photographs
     (when there are any) and redrawn as pixels; with none yet it uses a vivid stand-in palette. */
  function galleryPixel() {
    return `
    <section class="section" id="gallery">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("gallery"))}</h2></div>
      <a class="gpix rv" href="gallery.html" aria-label="${esc(lang === "zh" ? "进入摄影" : "Enter the photography gallery")}">
        <canvas class="gpix-cv" aria-hidden="true"></canvas>
        <span class="gpix-t"><b><span>${esc(lang === "zh" ? "摄影" : "Photography")}</span></b><b><span>${esc(lang === "zh" ? "欢迎来到我的摄影世界" : "Welcome to my photography world")}</span></b></span>
        <span class="gpix-go">${esc(lang === "zh" ? "进入光之瀑布" : "Enter the waterfall")} <span class="arrow">→</span></span>
      </a>
    </section>`;
  }
  let eggStop = null;
  function startEggPix() {
    eggStop && eggStop(); eggStop = null;
    const cv = $(".egg-cv"); if (!cv) return;
    const G = window.GALLERY, photos = (G && G.series ? G.series.flatMap((r) => r.photos) : []).filter((p) => p.px);
    if (!photos.length) return;
    const ctx = cv.getContext("2d"), TW = 12, TH = 8, COLS = 2, ROWS = 3, N = 24;
    const unpack = (b64) => { const d = atob(b64), out = []; for (let i = 0; i + 2 < d.length; i += 3) out.push([d.charCodeAt(i), d.charCodeAt(i + 1), d.charCodeAt(i + 2)]); return out; };
    const pool = photos.map((p) => unpack(p.px));
    let seed = Math.floor(Math.random() * pool.length);
    const tiles = Array.from({ length: COLS * ROWS }, (_, k) => ({ a: pool[(seed + k * 7) % pool.length], b: null, born: 0 }));
    let px = 7, raf = 0, dead = false, next = 0, turn = 0;
    const size = () => { const w = cv.clientWidth, dpr = Math.min(2, devicePixelRatio || 1); px = w / N; cv.width = Math.round(w * dpr); cv.height = Math.round(w * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const draw = (now) => {
      ctx.fillStyle = "#111"; ctx.fillRect(0, 0, N * px, N * px);
      tiles.forEach((tl, k) => {
        const tx = (k % COLS) * TW, ty = Math.floor(k / COLS) * TH, f = tl.b ? Math.min(1, (now - tl.born) / 700) : 0;
        for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++) {
          const i = y * TW + x, c0 = tl.a[i], c1 = tl.b ? tl.b[i] : c0;
          // pixels switch one by one in a diagonal wave, like the home page window
          const g = f >= (x + y) / (TW + TH) ? 1 : 0, c = g ? c1 : c0;
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.fillRect((tx + x) * px + 0.5, (ty + y) * px + 0.5, px - 1, px - 1);
        }
        if (tl.b && f >= 1) { tl.a = tl.b; tl.b = null; }
      });
    };
    const loop = (now) => {
      if (dead) return;
      if (now > next) { const k = turn++ % tiles.length; seed = (seed + 11) % pool.length; tiles[(k * 5) % tiles.length].b = pool[seed]; tiles[(k * 5) % tiles.length].born = now; next = now + 1100; }
      draw(now); raf = requestAnimationFrame(loop);
    };
    size(); draw(0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vis = new IntersectionObserver((es) => { if (es[0].isIntersecting && !raf && !dead) raf = requestAnimationFrame(loop); else if (!es[0].isIntersecting) { cancelAnimationFrame(raf); raf = 0; } });
    vis.observe(cv);
    const onR = () => { size(); draw(performance.now()); }; addEventListener("resize", onR);
    // the foil card: tilts toward the pointer; with no pointer (phones, or resting) it sways by itself, so the foil always catches the light
    const egg = cv.closest(".egg"), card = cv.closest(".egg-card");
    let tx = 0, ty = 0, rx = 0, ry = 0, hovering = false, t0 = performance.now(), tiltRaf = 0;
    egg.addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse") return; const r = card.getBoundingClientRect(); tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)); ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)); hovering = true; });
    egg.addEventListener("pointerleave", () => { hovering = false; });
    addEventListener("deviceorientation", (e) => { if (e.gamma == null) return; hovering = true; tx = Math.max(-1, Math.min(1, e.gamma / 25)); ty = Math.max(-1, Math.min(1, (e.beta - 45) / 25)); });   // Android gives this without asking
    const tilt = (now) => {
      if (dead) return;
      if (!hovering) { const k = (now - t0) / 1000; tx = Math.sin(k * 0.9) * 0.55; ty = Math.sin(k * 0.63 + 1) * 0.4; }
      rx += (tx - rx) * 0.12; ry += (ty - ry) * 0.12;
      card.style.setProperty("--ry", (rx * 16).toFixed(2) + "deg"); card.style.setProperty("--rx", (-ry * 16).toFixed(2) + "deg");
      card.style.setProperty("--mx", (50 + rx * 50).toFixed(1) + "%"); card.style.setProperty("--my", (50 + ry * 50).toFixed(1) + "%");
      card.style.setProperty("--hyp", Math.min(1, Math.hypot(rx, ry)).toFixed(3));
      tiltRaf = requestAnimationFrame(tilt);
    };
    tiltRaf = requestAnimationFrame(tilt);
    eggStop = () => { dead = true; cancelAnimationFrame(raf); cancelAnimationFrame(tiltRaf); vis.disconnect(); removeEventListener("resize", onR); };
  }
  let gpixStop = null;
  function startGpix() {
    gpixStop && gpixStop(); gpixStop = null;
    const cv = $(".gpix-cv"); if (!cv) return;
    const box = cv.parentElement, ctx = cv.getContext("2d"), G = window.GALLERY, photos = G && G.series ? G.series.flatMap((r) => r.photos) : [];
    const PAL = ["#81D8D0", "#ff9a8b", "#ffe07a", "#3d6dff", "#ff5fa2", "#7be06a", "#ff8a1f", "#8a5cff", "#111111", "#ffffff"];
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const TW = 12, TH = 8;                                  // a tile is 12 x 8 pixels
    let cell = 18, cols = 0, rows = 0, tiles = [], raf = 0, dead = false, last = 0;
    const boost = (c) => { const m = (c[0] + c[1] + c[2]) / 3; return c.map((v) => Math.max(0, Math.min(255, m + (v - m) * 1.55 + (v - 128) * .1))); };
    const fake = (i) => { // a stand-in: a little pixel "landscape" in three palette colours
      const r = (n) => { const x = Math.sin(i * 91.7 + n * 12.9898) * 43758.5453; return x - Math.floor(x); };
      const a = hex(PAL[Math.floor(r(1) * 7)]), b = hex(PAL[Math.floor(r(2) * 7)]), c = hex(PAL[Math.floor(r(3) * 9)]);
      const out = []; for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++) { const k = y / TH + (r(x * 7 + y) - .5) * .35; out.push(k < .5 ? a : k < .78 ? b : c); }
      return out;
    };
    const sample = (img) => { const o = document.createElement("canvas"); o.width = TW; o.height = TH; const c = o.getContext("2d"); c.drawImage(img, 0, 0, TW, TH); const d = c.getImageData(0, 0, TW, TH).data, out = []; for (let i = 0; i < d.length; i += 4) out.push(boost([d[i], d[i + 1], d[i + 2]])); return out; };
    const pool = []; let ready = 0;
    // colours are sampled ahead of time by scripts/add-photos.mjs (p.px: 12 x 8 RGB), so the home page downloads no photographs
    const unpack = (b64) => { const d = atob(b64), out = []; for (let i = 0; i + 2 < d.length; i += 3) out.push(boost([d.charCodeAt(i), d.charCodeAt(i + 1), d.charCodeAt(i + 2)])); return out; };
    photos.slice(0, 60).forEach((p) => { if (p.px) { pool.push(unpack(p.px)); return; } const im = new Image(); im.onload = () => { try { pool.push(sample(im)); } catch (e) {} if (++ready) fill(); }; im.src = p.tiny || p.small || p.file; });
    function getTile(i) { return pool.length ? pool[(i * 7 + Math.floor(i / 3)) % pool.length] : fake(i); }
    function layout() {
      const w = box.clientWidth, h = box.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
      cell = w > 900 ? 20 : w > 560 ? 16 : 12;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell); rows = Math.ceil(h / cell); fill(); draw(0);
    }
    function fill() { const tc = Math.ceil(cols / TW), tr = Math.ceil(rows / TH); tiles = []; for (let j = 0; j < tr; j++) for (let i = 0; i < tc; i++) tiles.push({ i, j, k: j * tc + i, t: getTile(j * tc + i), a: null, born: 0 }); }
    function draw(now) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      tiles.forEach((tl) => {
        const fade = tl.a ? Math.min(1, (now - tl.born) / 900) : 1;
        for (let y = 0; y < TH; y++) for (let x = 0; x < TW; x++) {
          const px = tl.i * TW + x, py = tl.j * TH + y; if (px >= cols || py >= rows) continue;
          const n = y * TW + x, c = tl.t[n], o = tl.a ? tl.a[n] : c, tw = (Math.sin(now / 900 + px * .9 + py * 1.7) + 1) * .04;
          // each pixel turns from the old colour to the new one at its own moment
          const u = tl.a ? Math.max(0, Math.min(1, fade * 1.6 - ((x * 3 + y * 5) % 9) / 9 * .6)) : 1;
          const r = o[0] + (c[0] - o[0]) * u, g = o[1] + (c[1] - o[1]) * u, b = o[2] + (c[2] - o[2]) * u, k = 1 + tw;
          ctx.fillStyle = `rgb(${Math.min(255, r * k) | 0},${Math.min(255, g * k) | 0},${Math.min(255, b * k) | 0})`;
          ctx.fillRect(px * cell, py * cell, px === cols - 1 ? cell + 2 : cell - 1, py === rows - 1 ? cell + 2 : cell - 1);
        }
        if (tl.a && fade >= 1) tl.a = null;
      });
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function loop(now) {
      if (dead) return; raf = requestAnimationFrame(loop);
      if (now - last < 66) return; last = now;
      if (!reduce && tiles.length && now - (loop.swap || 0) > 1400) { loop.swap = now; const tl = tiles[Math.floor(Math.random() * tiles.length)]; tl.a = tl.t; tl.t = getTile(tl.k + Math.floor(Math.random() * 97)); tl.born = now; }
      draw(now);
    }
    layout();
    const ro = new ResizeObserver(() => layout()); ro.observe(box);
    const vis = new IntersectionObserver((es) => { const on = es[0].isIntersecting; if (on && !raf && !dead) raf = requestAnimationFrame(loop); if (!on) { cancelAnimationFrame(raf); raf = 0; } }, { threshold: 0 }); vis.observe(box);
    gpixStop = () => { dead = true; cancelAnimationFrame(raf); ro.disconnect(); vis.disconnect(); };
  }

  function methodBlock(M = D.method, id = "method") {
    const last = M.steps.length - 1;
    return `
    <section class="section method" id="${id}">
      <div class="m-side">
        <div class="m-stick">
          <h2 class="sec-title rv">${esc(t(M.title))}</h2>
          <p class="lede-lg rv">${esc(t(M.lede))}</p>
          ${M.lede2 ? `<p class="sec-lede rv m-lede2">${esc(t(M.lede2))}</p>` : ""}
        </div>
      </div>
      <div class="m-main">
        <ol class="m-steps">${M.steps.map((x, i) => `<li class="m-step rv${i === last ? " key" : ""}"><span class="n" aria-hidden="true">${x.n}</span><div><h3>${esc(t(x.h))}</h3><p>${esc(t(x.p))}</p></div></li>`).join("")}</ol>
        <div class="m-ideas">${M.principles.map((x, i) => `<div class="m-idea rv i${i + 1}"><h4>${esc(t(x.h))}</h4><p>${esc(t(x.p))}</p></div>`).join("")}</div>
        ${M.links ? `<p class="m-links rv">${M.links.map((l) => `<a class="btn-ghost" href="${esc(l.url)}">${esc(t(l.label))} <span aria-hidden="true">→</span></a>`).join("")}</p>` : ""}
        <p class="disclosure rv">${esc(t(M.disclosure))}</p>
      </div>
    </section>
    ${M.figure ? `<section class="section m-figure"><div class="shot rv">${media({ type: "embed", src: M.figure.src, frame: "browser", ratio: "1/1", open: M.figure.src })}<p class="cap">${esc(t(M.figure.cap))}</p></div></section>` : ""}`;
  }

  function methodPage() {
    return `<article class="case method-page">${methodBlock(D.method, "method")}${methodBlock(D.design, "design")}<section class="bigfoot" id="contact-end" style="padding-top:clamp(48px,7vw,96px)">${talkHead()}${reachRow()}<div class="foot mono"><span>© ${new Date().getFullYear()} ${D.person.name}</span></div></section></article>`;
  }

  function moreBlock() {
    const m = D.more;
    return `
    <section class="section" id="more">
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(m.title))}</h2><p class="sec-lede">${esc(s("smaller"))}</p></div>
      <div class="feed">${m.items.map((i) => {
        const inner = `<span class="top mono"><span>${i.year}</span>${i.url ? '<span class="arr" aria-hidden="true">↗</span>' : ""}</span><b>${esc(i.name)}</b><p>${esc(t(i.note))}</p>${DRAFT && i.verify ? `<p class="draft mono">${esc(s("draft"))}: ${esc(t(i.verify))}</p>` : ""}`;
        return i.url ? `<a class="feed-item rv" href="${esc(i.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="feed-item rv">${inner}</div>`;
      }).join("")}</div>
    </section>`;
  }

  function aboutBlock() {
    const A = D.about, p = D.person;
    return `
    <section class="section" id="about">
      <div class="sec-head about-head rv"><h2 class="sec-title">${esc(t(A.title))}</h2><img class="about-mark" src="assets/logo.svg" alt="" aria-hidden="true"></div>
      <div class="about rv">
        <div>
          <p class="status"><span class="avail"><span class="dot"></span>${esc(s("available"))}</span><span class="tz-info">${ic("map-pin")}${esc(s("tz"))}</span></p>
          ${A.photo ? `<figure class="portrait"><img src="${esc(A.photo.src)}" alt="${esc(t(A.photo.alt))}" width="800" height="1200" loading="lazy"></figure>` : ""}
          ${arr(A.body).map((x) => `<p>${esc(x)}</p>`).join("")}
        </div>
        <div><ul class="tl">${A.timeline.map((r) => `<li><span class="mono dim">${r.when}</span><span class="tl-what"><b>${esc(t(r.role))}</b><span>${esc(t(r.org))}</span></span>${r.logo ? logoImg(r.logo, "sm") : ""}</li>`).join("")}</ul><a class="btn-pill cv-btn" href="${esc(A.cv.file)}" download>${ic("download")}${esc(t(A.cv.label))}</a></div>
      </div>
    </section>`;
  }

  /* one row: email (primary) · LinkedIn · GitHub */
  // "Let's build something." with the mark at the right edge of the page
  const talkHead = () => `<div class="talk-head"><h2>${t(STR.talkTitle)}</h2><img class="foot-mark" src="assets/logo.svg" alt="" aria-hidden="true"></div>`;
  const reachRow = () => { const p = D.person; return `<div class="reach-row"><a class="btn-pill mail-pill" href="mailto:${p.email}">${ic("mail")}${esc(p.email)}</a><a class="btn-ghost" href="${p.linkedin}" target="_blank" rel="noopener">${ic("linkedin")}LinkedIn ↗</a><a class="btn-ghost" href="${p.github}" target="_blank" rel="noopener">${ic("github")}GitHub ↗</a></div>`; };

  function contactBlock() {
    const p = D.person;
    return `
    <section class="bigfoot" id="contact">
      <h2>${t(STR.talkTitle)}</h2>
      <p>${esc(s("talkLede"))}</p>
      ${reachRow()}
      <div class="foot mono"><span>© ${new Date().getFullYear()} ${p.name}</span></div>
    </section>`;
  }

  /* ---------- case study ---------- */
  const ALIAS = { meanwhile: "beside" };
  const zoneLine = (p) => p.zones.map((z) => t(D.cats.find((c) => c.id === z))).join(" · ");
  function project(id) {
    id = ALIAS[id] || id;
    const P = D.projects.filter((p) => !p.hidden), i = P.findIndex((p) => p.id === id);
    if (i < 0) return `<div class="case-head" style="padding-top:120px"><p>Not found. <a href="#/">Home</a></p></div>`;
    const p = P[i], prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    return `
    <article class="case">
      <div class="case-head">
        <a class="back mono" href="#/work">${esc(s("back"))}</a>
        <p class="kicker mono">${esc(p.sub ? `${p.title} — ${t(p.sub)}` : p.meta)}</p>
        <h1>${esc(t(p.h1))}</h1>
        <p class="lead">${esc(t(p.lead))}</p>
      </div>
      ${p.hero ? `<div class="hero-shot">${media(p.hero)}` : ""}${p.hero && p.hero.cap ? `<p class="cap">${esc(t(p.hero.cap))}</p>` : ""}${p.hero ? "</div>" : ""}
      <dl class="meta rv">
        <div><dt>${ic("user")}${esc(s("role"))}</dt><dd>${esc(t(p.role))}</dd></div>
        <div><dt>${ic("calendar")}${esc(s("when"))}</dt><dd>${esc(p.when)}</dd></div>
        <div><dt>${ic("flag")}${esc(s("status"))}</dt><dd>${esc(t(p.status))}</dd></div>
        <div><dt>${ic("layers")}${esc(s("zone"))}</dt><dd>${esc(zoneLine(p))}</dd></div>
        ${p.orgs && p.orgs.length ? `<div><dt>${ic("building-2")}${esc(t(D.ui.orgs))}</dt><dd class="orgs">${p.orgs.map((id) => logoImg(id, "sm")).join("")}</dd></div>` : ""}
        <div><dt>${ic("hammer")}${esc(s("skills"))}</dt><dd>${esc(p.stack.join(" · "))}</dd></div>
        ${p.links && p.links.length ? `<div><dt>${ic("link")}${esc(s("links"))}</dt><dd class="lk">${p.links.map(link).join("")}</dd></div>` : ""}
      </dl>
      ${DRAFT && p.verify ? `<p class="draft mono">${esc(s("draft"))}: ${esc(t(p.verify))}</p>` : ""}
      <div class="body">
        ${p.sections.map((sec) => `
          <section class="blk rv${sec.split && sec.media ? " split" : ""}">
            <h2>${heading(sec.h)}</h2>
            ${sec.split && sec.media ? `<div class="split-t">${arr(sec.p).map((x) => `<p>${x}</p>`).join("")}</div>` : arr(sec.p).map((x) => `<p>${x}</p>`).join("")}
            ${sec.media ? `<div class="shot">${media(sec.media)}${sec.cap ? `<p class="cap">${esc(t(sec.cap))}</p>` : ""}</div>` : ""}
          </section>`).join("")}
      </div>
      ${p.egg ? `<a class="egg rv" href="${esc(p.egg.url)}"><span class="egg-badge"><span class="egg-card"><canvas class="egg-cv" aria-hidden="true"></canvas><span class="egg-holo" aria-hidden="true"></span><span class="egg-glare" aria-hidden="true"></span></span><span class="egg-c c1"></span><span class="egg-c c2"></span><span class="egg-c c3"></span><span class="egg-c c4"></span></span><span class="egg-t"><b>${esc(t(p.egg.title))}</b><span>${esc(t(p.egg.sub))}</span><span class="egg-go">${esc(t(p.egg.go))} <span class="arrow">→</span></span></span></a>` : ""}
      <nav class="pager rv" aria-label="More work">
        <a href="#/work/${prev.id}"><span class="mono dim">← ${esc(s("prev"))}</span><b>${esc(prev.title)}</b>${prev.sub ? `<span class="mono dim">${esc(t(prev.sub))}</span>` : ""}</a>
        <a href="#/work/${next.id}"><span class="mono dim">${esc(s("next"))} →</span><b>${esc(next.title)}</b>${next.sub ? `<span class="mono dim">${esc(t(next.sub))}</span>` : ""}</a>
      </nav>
      <section class="bigfoot" id="contact-end" style="padding-top:clamp(48px,7vw,96px)">
        ${talkHead()}
        ${reachRow()}
        <div class="foot mono"><span>© ${new Date().getFullYear()} ${D.person.name}</span></div>
      </section>
    </article>`;
  }

  /* ---------- render + routing ---------- */
  const route = () => { const [a, b] = location.hash.replace(/^#\/?/, "").split("/"); return { a: a || "", b }; };

  function render(keepScroll) {
    const { a, b } = route();
    const isCase = a === "work" && b, isMethod = a === "method";
    $("#view").innerHTML = isCase ? project(b) : isMethod ? methodPage() : home();
    $$("[data-t]").forEach((el) => (el.textContent = s(el.dataset.t)));
    $("#lang").textContent = lang === "zh" ? "EN" : "中文";
    document.title = isCase ? `${(D.projects.filter((p) => !p.hidden).find((p) => p.id === (ALIAS[b] || b)) || {}).title || ""} — Yunfei Yu` : "Yunfei Yu — Yumagination";
    wire();
    startGpix();
    startEggPix();
    if (!keepScroll) {
      const el = !isCase && !isMethod && a ? document.getElementById(a) : null;
      if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }

  const filt = { zone: "all" };
  let io, vio;
  // autoplay muted loops only while at least a quarter is on screen; pause when it leaves
  function watchVideos() {
    if (!("IntersectionObserver" in window)) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    vio && vio.disconnect();
    vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.25 });
    $$("video").forEach((v) => { if (reduce) { v.pause(); v.controls = true; } else vio.observe(v); });
  }
  function wire() {
    CARDS = $$(".proj");
    // area: pick one (All = none); a project shows under every area it lists
    const applyFilter = () => {
      $$(".chip[data-zone]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.zone === filt.zone));
      let n = 0;
      CARDS.forEach((r) => {
        const ok = filt.zone === "all" || r.dataset.zones.split(" ").includes(filt.zone);
        r.hidden = !ok; if (ok) n++;
      });
      const e = $(".empty"); if (e) e.hidden = n > 0;
      pack();
    };
    $$(".chip[data-zone]").forEach((c) => c.addEventListener("click", () => { filt.zone = c.dataset.zone; applyFilter(); }));
    if ($(".work-grid")) { packW = $(".work-grid").clientWidth; applyFilter(); }
    if (window.startSilk) window.startSilk($("canvas.silk"));

    // reveal on scroll
    io && io.disconnect();
    const els = $$(".rv");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) els.forEach((e) => e.classList.add("in"));
    else { io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 }); els.forEach((e) => io.observe(e)); }

    watchVideos();
  }

  /* ---------- boot ---------- */
  const onScroll = () => $("#bar").classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  document.documentElement.lang = lang === "zh" ? "zh" : "en";
  $("#lang").addEventListener("click", () => setLang(lang === "zh" ? "en" : "zh"));
  addEventListener("hashchange", () => render());
  render();
  onScroll();
})();
