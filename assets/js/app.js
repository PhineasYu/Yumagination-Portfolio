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
    recog: { en: "Recognition", zh: "获奖与认可" }, tools: { en: "Working with", zh: "常用工具" },
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
      const cls = m.frame === "browser" ? "frame-browser" : m.frame === "phone" ? "frame-phone" : "";
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
      const el = document.createElement("div"); el.className = "brow"; el.append(...row);
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
    const P = D.projects, pos = D.person.tagline[lang] || D.person.tagline.en;
    const zoneNames = (p) => `<span class="zn">${ic(ZONE_IC[p.zones[0]])}<span>${p.zones.map((z) => esc(t(D.cats.find((c) => c.id === z)))).join(" · ")}</span></span>`;
    const award = D.tags.find((x) => x.id === "award");
    return `
    <section class="hero" id="top">
      <canvas class="silk" aria-hidden="true"></canvas>
      <div class="hero-in">
        <h1 class="name">${esc(D.person.name)}</h1>
        <p class="pos"><span class="p1">${esc(pos[0])}</span><span class="p2">${esc(pos[1])}</span></p>
      </div>
    </section>

    <section class="section" id="work">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("work"))}</h2><p class="sec-lede">${esc(s("workLede"))}</p></div>
      <div class="filters" role="group" aria-label="${esc(s("zoneLbl"))}"><span class="flabel mono">${esc(s("zoneLbl"))}</span>${D.cats.map((c) => `<button class="chip" type="button" data-zone="${c.id}" aria-pressed="${c.id === filt.zone}">${ic(ZONE_IC[c.id])}${esc(t(c))}</button>`).join("")}</div>
      <div class="work-grid">
        ${P.map((p) => `
          <a class="proj rv ${p.shape || "wide"}" href="#/work/${p.id}" data-id="${p.id}" data-shape="${p.shape || "wide"}" data-zones="${p.zones.join(" ")}">
            ${tile(p)}
            <span class="proj-cap">
              <span class="proj-title">${esc(p.title)}</span>
              <span class="proj-line">${esc(t(p.cap))}</span>
              <span class="proj-tags">${zoneNames(p)}${award && p.tags.includes("award") ? `<span class="pill accent">${esc(t(award))}</span>` : ""}</span>
            </span>
          </a>`).join("")}
      </div>
      <p class="empty" hidden>${esc(s("empty"))}</p>
    </section>

    <section class="section" id="recognition">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("recog"))}</h2></div>
      <div class="awards">${D.awards.map((a) => `<div class="award rv"><div class="award-top"><span class="mono dim">${a.year}</span>${a.logo ? logoImg(a.logo, "sm") : ""}</div><b>${esc(t(a.title))}</b><p>${esc(t(a.note))}</p>${DRAFT && a.verify ? `<p class="draft mono">${esc(s("draft"))}</p>` : ""}</div>`).join("")}</div>
    </section>

    ${methodBlock()}
    ${galleryTeaser()}

    <div class="tools" aria-label="${esc(t(D.ui.logosLbl))}"><div class="tools-track">${[...D.logoStrip, ...D.logoStrip].map((id) => `<span>${logoImg(id)}</span>`).join("")}</div></div>

    ${aboutBlock()}
    ${contactBlock()}`;
  }

  function galleryTeaser() {
    const G = window.GALLERY, ph = G && G.series ? G.series.flatMap((r) => r.photos) : [];
    if (ph.length < 3) return "";
    const pick = ph.slice(0, 4);
    return `
    <section class="section" id="gallery">
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(G.title))}</h2><p class="sec-lede">${esc(t(G.statement))}</p></div>
      <a class="teaser rv" href="gallery.html" aria-label="${esc(t(G.title))}">
        ${pick.map((p) => `<span class="tz"><img src="${esc(p.thumb || p.file)}" alt="" loading="lazy"></span>`).join("")}
      </a>
      <p class="teaser-go"><a class="btn-text" href="gallery.html"><span class="arrow">↳</span> ${esc(t(D.person.role) && (lang === "zh" ? "进入摄影展厅" : "Enter the gallery"))}</a></p>
    </section>`;
  }

  function methodBlock() {
    const M = D.method, last = M.steps.length - 1;
    return `
    <section class="section method" id="method">
      <div class="m-side">
        <div class="m-stick">
          <h2 class="sec-title rv">${esc(t(M.title))}</h2>
          <p class="lede-lg rv">${esc(t(M.lede))}</p>
        </div>
      </div>
      <div class="m-main">
        <ol class="m-steps">${M.steps.map((x, i) => `<li class="m-step rv${i === last ? " key" : ""}"><span class="n" aria-hidden="true">${x.n}</span><div><h3>${esc(t(x.h))}</h3><p>${esc(t(x.p))}</p></div></li>`).join("")}</ol>
        <div class="m-ideas">${M.principles.map((x, i) => `<div class="m-idea rv i${i + 1}"><h4>${esc(t(x.h))}</h4><p>${esc(t(x.p))}</p></div>`).join("")}</div>
        <p class="disclosure rv">${esc(t(M.disclosure))}</p>
      </div>
    </section>`;
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
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(A.title))}</h2></div>
      <div class="about rv">
        <div>
          <p class="status"><span class="avail"><span class="dot"></span>${esc(s("available"))}</span><span class="tz-info">${ic("map-pin")}${esc(s("tz"))}</span></p>
          ${arr(A.body).map((x) => `<p>${esc(x)}</p>`).join("")}
          <div class="reach"><a class="btn-pill" href="mailto:${p.email}">${ic("mail")}${esc(s("email"))} <span aria-hidden="true">→</span></a><a class="btn-ghost" href="${p.linkedin}" target="_blank" rel="noopener">${ic("linkedin")}LinkedIn ↗</a><a class="btn-ghost" href="${p.github}" target="_blank" rel="noopener">${ic("github")}GitHub ↗</a></div>
        </div>
        <div><ul class="tl">${A.timeline.map((r) => `<li><span class="mono dim">${r.when}</span><span>${esc(t(r.what))}</span>${r.logo ? logoImg(r.logo, "sm") : ""}</li>`).join("")}</ul><p class="langline mono">${ic("globe")}${esc(t(A.languages))}</p></div>
      </div>
    </section>`;
  }

  /* one row: email (primary) · LinkedIn · GitHub */
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
    const P = D.projects, i = P.findIndex((p) => p.id === id);
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
          <section class="blk rv">
            <h2>${heading(sec.h)}</h2>
            ${arr(sec.p).map((x) => `<p>${x}</p>`).join("")}
            ${sec.media ? `<div class="shot">${media(sec.media)}${sec.cap ? `<p class="cap">${esc(t(sec.cap))}</p>` : ""}</div>` : ""}
          </section>`).join("")}
      </div>
      <nav class="pager rv" aria-label="More work">
        <a href="#/work/${prev.id}"><span class="mono dim">← ${esc(s("prev"))}</span><b>${esc(prev.title)}</b>${prev.sub ? `<span class="mono dim">${esc(t(prev.sub))}</span>` : ""}</a>
        <a href="#/work/${next.id}"><span class="mono dim">${esc(s("next"))} →</span><b>${esc(next.title)}</b>${next.sub ? `<span class="mono dim">${esc(t(next.sub))}</span>` : ""}</a>
      </nav>
      <section class="bigfoot" id="contact-end" style="padding-top:clamp(48px,7vw,96px)">
        <h2>${t(STR.talkTitle)}</h2>
        ${reachRow()}
        <div class="foot mono"><span>© ${new Date().getFullYear()} ${D.person.name}</span></div>
      </section>
    </article>`;
  }

  /* ---------- render + routing ---------- */
  const route = () => { const [a, b] = location.hash.replace(/^#\/?/, "").split("/"); return { a: a || "", b }; };

  function render(keepScroll) {
    const { a, b } = route();
    const isCase = a === "work" && b;
    $("#view").innerHTML = isCase ? project(b) : home();
    $$("[data-t]").forEach((el) => (el.textContent = s(el.dataset.t)));
    $("#lang").textContent = lang === "zh" ? "EN" : "中文";
    document.title = isCase ? `${(D.projects.find((p) => p.id === (ALIAS[b] || b)) || {}).title || ""} — Yunfei Yu` : "Yunfei Yu — Yumagination";
    wire();
    if (!keepScroll) {
      const el = !isCase && a ? document.getElementById(a) : null;
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
