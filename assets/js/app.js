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
    work: { en: "Work", zh: "作品" }, gallery: { en: "Gallery", zh: "摄影" }, workLede: { en: "Five areas: UX & UI, service design and research, AI products, building and automating, and games. Filter by area or by tag. Most of them actually run: watch them in motion, or open them yourself.", zh: "五个方向：用户体验与界面、服务设计与研究、AI 产品、开发与自动化、游戏。可以按方向或标签筛选。大多数作品都是能运行的：看它们动起来，或者直接打开。" },
    zoneLbl: { en: "Area", zh: "方向" }, tagLbl: { en: "Tag", zh: "标签" }, zone: { en: "Area & tags", zh: "方向与标签" },
    empty: { en: "Nothing matches both filters yet.", zh: "暂时没有同时符合这两个条件的作品。" },
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
    talkLede: { en: "Open to junior roles in Sweden and China. The fastest way to reach me is email.", zh: "接受瑞典与中国的 junior 岗位机会。最快的联系方式是邮件。" },
    kicker: { en: "Case study", zh: "案例" }
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
  const link = (l) => `<a href="${esc(l.url)}"${ext(l.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(t(l.label))} ↗</a>`;
  const heading = (h) => esc(t(h)).replace(" — ", ' <span class="dash">—</span> ');
  const badge = (kind) => `<span class="badge ${kind}">${esc(s(kind))}</span>`;

  /* ---------- media ---------- */
  function videoTag(m, extra = "") {
    return `<video src="${esc(m.src)}" poster="${esc(m.poster || "")}" autoplay muted loop playsinline preload="metadata" ${extra}></video>`;
  }
  function media(m) {
    if (!m) return "";
    const bg = m.bg ? ` style="--bg:${m.bg}"` : "";
    const wrap = (inner, kind) => {
      const cls = m.frame === "browser" ? "frame-browser" : m.frame === "phone" ? "frame-phone" : "";
      return `<div class="media ${cls}"${bg}>${kind ? badge(kind) : ""}${inner}</div>`;
    };
    switch (m.type) {
      case "video": return wrap(videoTag(m), m.tag);
      case "img": return wrap(`<img src="${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy" class="${m.fit === "contain" ? "contain" : ""}">`, m.tag);
      case "embed": {
        const r = m.ratio ? ` style="--r:${m.ratio}"` : "";
        const inner = `<div class="embed embed-ratio"${r}><iframe src="${esc(m.src)}" title="Live demo" loading="lazy" allow="clipboard-write; fullscreen" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"></iframe></div>`;
        const open = m.open ? `<a class="open" href="${esc(m.open)}" target="_blank" rel="noopener">${esc(s("open"))}</a>` : "";
        return wrap(inner + open, "live");
      }
      case "motion": return `<div class="mo-wrap">${window.motion(m.id)}${badge("ill")}</div>`;
      case "stats": return `<div class="stats">${m.items.map(([n, l]) => `<div class="stat"><b>${esc(n)}</b><span>${esc(t(l))}</span></div>`).join("")}</div>`;
      case "steps": return `<div class="stepl">${m.items.map(([k, l]) => `<div><span class="k">${esc(k)}</span><p>${esc(t(l))}</p></div>`).join("")}</div>`;
    }
    return "";
  }

  function tile(p) {
    const tl = p.tile || {};
    if (tl.video) {
      const bg = p.hero && p.hero.bg ? ` style="background:${p.hero.bg}"` : "";
      return `<span class="tile${tl.phone ? " is-phone" : ""}"${bg}>${videoTag({ src: `assets/media/${tl.video}.mp4`, poster: `assets/media/${tl.poster}.jpg` })}</span>`;
    }
    if (tl.motion) return `<span class="tile">${window.motion(tl.motion)}</span>`;
    if (tl.text) return `<span class="tile tile-text">${glyph(p.id)}<span class="tt-big">${esc(t(tl.text))}</span>${tl.sub ? `<span class="tt-sub mono">${esc(t(tl.sub))}</span>` : ""}</span>`;
    return `<span class="tile"></span>`;
  }

  /* small drawn glyphs for text tiles: flat shapes, slow ambient motion */
  function glyph(id) {
    const G = {
      "let-me-die": `<circle class="g-thin" cx="100" cy="100" r="78"/><circle class="g-line g-spin" cx="100" cy="100" r="52" stroke-dasharray="18 14"/><path class="g-thin" d="M100 6v48M100 146v48M6 100h48M146 100h48"/><circle class="g-deep g-blink" cx="100" cy="100" r="9"/>`,
      "disco-fever": [0, 1, 2, 3, 4].map((i) => `<rect class="${i === 2 ? "g-deep" : "g-fill"} g-beat" style="animation-delay:${i * 0.18}s" x="${14 + i * 38}" y="30" width="24" height="160" rx="3"/>`).join(""),
      "community-viewfinder": `<path class="g-line" d="M10 50V10h40M150 10h40v40M190 150v40h-40M50 190H10v-40"/><rect class="g-fill g-slide" x="48" y="54" width="70" height="56" rx="2"/>`,
      "notchbreak": `<rect class="g-thin" x="8" y="36" width="184" height="128" rx="12"/><rect class="g-ink" x="70" y="36" width="60" height="16" rx="6"/><circle class="g-fill g-blink" cx="100" cy="112" r="22"/>`,
      "revive-automation": [0, 1, 2, 3].map((i) => `<rect class="g-thin" x="10" y="${18 + i * 44}" width="30" height="30" rx="3"/><rect class="g-fill g-blink" style="animation-delay:${i * 0.6}s" x="16" y="${24 + i * 44}" width="18" height="18" rx="2"/><rect class="g-deep" x="56" y="${28 + i * 44}" width="${130 - i * 22}" height="10" rx="2"/>`).join(""),
      "microhack": `<path class="g-thin" d="M40 150L100 50L160 150Z"/>` + [[40, 150], [100, 50], [160, 150]].map(([x, y], i) => `<circle class="${i === 1 ? "g-deep" : "g-fill"} g-blink" style="animation-delay:${i * 0.8}s" cx="${x}" cy="${y}" r="20"/>`).join("")
    };
    const inner = G[id] || `<circle class="g-fill g-drift" cx="80" cy="90" r="56"/><rect class="g-deep" x="110" y="100" width="70" height="70" rx="2"/>`;
    return `<svg class="glyph" viewBox="0 0 200 200" aria-hidden="true">${inner}</svg>`;
  }

  /* bento: pack the visible cards into rows that always fill the grid.
     Wide (6 cols): featured cards take 4 of 6 beside a 2, two featured side by side
     take 3+3, the rest alternate 2+2+2 and 3+3; a single leftover spans the row.
     Tablet (2 cols): featured cards span both; the rest go in pairs. */
  const FEATURED = new Set(["let-me-die", "disco-fever", "teamdex", "dossier", "sushi-jerash"]);
  const SIZES = ["s3", "s4", "s6", "w2", "hm", "hl"];
  function pack() {
    const cards = $$(".proj").filter((c) => !c.hidden);
    const two = matchMedia("(max-width: 900px)").matches;
    const f = (c) => c && FEATURED.has(c.dataset.id);
    const set = (c, ...cls) => { c.classList.remove(...SIZES); c.classList.add(...cls.filter(Boolean)); };
    let i = 0, small = true;
    while (i < cards.length) {
      const [a, b, c] = cards.slice(i, i + 3), rem = cards.length - i;
      if (two) {
        if (f(a) || !b || f(b)) { set(a, "w2", f(a) ? "hl" : "hm"); i += 1; }
        else { set(a, "hm"); set(b, "hm"); i += 2; }
      } else if (rem === 1) { set(a, "s6", "hm"); i += 1; }
      else if (f(a) && f(b)) { set(a, "s3", "hl"); set(b, "s3", "hl"); i += 2; }
      else if (f(a) || f(b)) { set(a, f(a) ? "s4" : "", "hl"); set(b, f(b) ? "s4" : "", "hl"); i += 2; }
      else if (small && rem >= 3 && rem !== 4 && !f(c)) { [a, b, c].forEach((x) => set(x)); i += 3; small = false; }
      else { set(a, "s3", "hm"); set(b, "s3", "hm"); i += 2; small = true; }
    }
  }
  matchMedia("(max-width: 900px)").addEventListener("change", () => { if ($(".work-grid")) pack(); });

  /* ---------- home ---------- */
  function home() {
    const P = D.projects, h = D.person.headline[lang] || D.person.headline.en;
    return `
    <section class="hero" id="top">
      <canvas class="breath" aria-hidden="true"></canvas>
      <div class="hero-grid">
        <p class="kick mono"><span>${esc(t(D.person.role))}</span><span>${esc(t(D.person.location))}</span><span>Portfolio 2026</span></p>
        <h1><span class="l1">${esc(h[0])}</span><span class="l2">${esc(h[1])}</span></h1>
        <div class="hero-intro">
          <p>${esc(t(D.person.intro))}</p>
          <div class="ctas"><a class="btn-text" href="mailto:${D.person.email}"><span class="arrow">↳</span> ${esc(s("letsTalk"))}</a><a class="btn-pill" href="#/work">${esc(s("viewWork"))}</a></div>
        </div>
      </div>
    </section>

    <section class="section" id="work">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("work"))}</h2><p class="sec-lede">${esc(s("workLede"))}</p></div>
      <div class="filters" role="group" aria-label="${esc(s("zoneLbl"))}"><span class="flabel mono">${esc(s("zoneLbl"))}</span>${D.cats.map((c) => `<button class="chip" type="button" data-zone="${c.id}" aria-pressed="${c.id === filt.zone}">${esc(t(c))}</button>`).join("")}</div>
      <div class="filters tags" role="group" aria-label="${esc(s("tagLbl"))}"><span class="flabel mono">${esc(s("tagLbl"))}</span>${D.tags.map((c) => `<button class="chip" type="button" data-tag="${c.id}" aria-pressed="${c.id === filt.tag}">${esc(t(c))}</button>`).join("")}</div>
      <div class="work-grid">
        ${P.map((p) => `
          <a class="proj rv" href="#/work/${p.id}" data-id="${p.id}" data-zone="${p.zone}" data-tags="${p.tags.join(" ")}">
            ${tile(p)}
            <span class="proj-cap"><span class="proj-title">${esc(t(p.cap))}</span><span class="proj-meta">${esc(p.meta)}</span></span>
          </a>`).join("")}
      </div>
      <p class="empty" hidden>${esc(s("empty"))}</p>
    </section>

    ${galleryTeaser()}

    <div class="tools mono" aria-label="${esc(s("tools"))}"><div class="tools-track">${[...D.tools, ...D.tools].map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>

    <section class="section" id="recognition">
      <div class="sec-head rv"><h2 class="sec-title">${esc(s("recog"))}</h2></div>
      <div class="awards">${D.awards.map((a) => `<div class="award rv"><span class="mono dim">${a.year}</span><b>${esc(t(a.title))}</b><p>${esc(t(a.note))}</p>${DRAFT && a.verify ? `<p class="draft mono">${esc(s("draft"))}</p>` : ""}</div>`).join("")}</div>
    </section>

    ${methodBlock()}
    ${moreBlock()}
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
    const M = D.method;
    return `
    <section class="section" id="method">
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(M.title))}</h2></div>
      <p class="lede-lg rv">${esc(t(M.lede))}</p>
      <div class="steps">${M.steps.map((x) => `<div class="step rv"><span class="mono n">${x.n}</span><h3>${esc(t(x.h))}</h3><p>${esc(t(x.p))}</p></div>`).join("")}</div>
      <div class="principles">${M.principles.map((x) => `<div class="principle rv"><h4>${esc(t(x.h))}</h4><p>${esc(t(x.p))}</p></div>`).join("")}</div>
      <p class="disclosure rv">${esc(t(M.disclosure))}</p>
    </section>`;
  }

  function moreBlock() {
    const m = D.more;
    return `
    <section class="section" id="more">
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(m.title))}</h2></div>
      <div class="more">${m.items.map((i) => {
        const inner = `<span class="mono dim">${i.year}</span><b>${esc(i.name)}</b><p>${esc(t(i.note))}</p>${DRAFT && i.verify ? `<p class="draft mono">${esc(s("draft"))}: ${esc(t(i.verify))}</p>` : ""}${i.url ? '<span class="go mono">↗</span>' : ""}`;
        return i.url ? `<a class="more-item" href="${esc(i.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="more-item">${inner}</div>`;
      }).join("")}</div>
    </section>`;
  }

  function aboutBlock() {
    const A = D.about;
    return `
    <section class="section" id="about">
      <div class="sec-head rv"><h2 class="sec-title">${esc(t(A.title))}</h2></div>
      <div class="about rv">
        <div>${arr(A.body).map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <div><ul class="tl">${A.timeline.map((r) => `<li><span class="mono dim">${r.when}</span><span>${esc(t(r.what))}</span></li>`).join("")}</ul><p class="langline mono">${esc(t(A.languages))}</p></div>
      </div>
    </section>`;
  }

  function contactBlock() {
    const p = D.person;
    return `
    <section class="bigfoot" id="contact">
      <h2>${t(STR.talkTitle)}</h2>
      <p>${esc(s("talkLede"))}</p>
      <a class="mail" href="mailto:${p.email}">${p.email}</a>
      <div class="socials mono"><a href="${p.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a></div>
      <div class="foot mono"><span>© ${new Date().getFullYear()} ${p.name}</span><span>${esc(s("footer"))}</span></div>
    </section>`;
  }

  /* ---------- case study ---------- */
  const ALIAS = { meanwhile: "beside" };
  const zoneLine = (p) => [D.cats.find((c) => c.id === p.zone), ...p.tags.map((x) => D.tags.find((c) => c.id === x))].filter(Boolean).map(t).join(" · ");
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
        <div><dt>${esc(s("role"))}</dt><dd>${esc(t(p.role))}</dd></div>
        <div><dt>${esc(s("when"))}</dt><dd>${esc(p.when)}</dd></div>
        <div><dt>${esc(s("status"))}</dt><dd>${esc(t(p.status))}</dd></div>
        <div><dt>${esc(s("zone"))}</dt><dd>${esc(zoneLine(p))}</dd></div>
        <div><dt>${esc(s("skills"))}</dt><dd>${esc(p.stack.join(" · "))}</dd></div>
        ${p.links && p.links.length ? `<div><dt>${esc(s("links"))}</dt><dd class="lk">${p.links.map(link).join("")}</dd></div>` : ""}
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
        <a class="mail" href="mailto:${D.person.email}">${D.person.email}</a>
        <div class="foot mono"><span>© ${new Date().getFullYear()} ${D.person.name}</span><span>${esc(s("footer"))}</span></div>
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

  const filt = { zone: "all", tag: "" };
  let io, vio;
  function wire() {
    // zone: pick one (All = none); tag: optional, click again to clear
    const applyFilter = () => {
      $$(".chip[data-zone]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.zone === filt.zone));
      $$(".chip[data-tag]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.tag === filt.tag));
      let n = 0;
      $$(".proj").forEach((r) => {
        const ok = (filt.zone === "all" || r.dataset.zone === filt.zone) && (!filt.tag || r.dataset.tags.split(" ").includes(filt.tag));
        r.hidden = !ok; if (ok) n++;
      });
      const e = $(".empty"); if (e) e.hidden = n > 0;
      pack();
    };
    $$(".chip[data-zone]").forEach((c) => c.addEventListener("click", () => { filt.zone = c.dataset.zone; applyFilter(); }));
    $$(".chip[data-tag]").forEach((c) => c.addEventListener("click", () => { filt.tag = filt.tag === c.dataset.tag ? "" : c.dataset.tag; applyFilter(); }));
    if ($(".work-grid")) applyFilter();
    if (window.startBreath) window.startBreath($("canvas.breath"));

    // reveal on scroll
    io && io.disconnect(); vio && vio.disconnect();
    const els = $$(".rv");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) els.forEach((e) => e.classList.add("in"));
    else { io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 }); els.forEach((e) => io.observe(e)); }

    // play videos only while visible (saves battery and bandwidth)
    const vids = $$("video");
    if ("IntersectionObserver" in window) {
      vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: 0.25 });
      vids.forEach((v) => { v.pause(); vio.observe(v); });
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) vids.forEach((v) => { vio.unobserve(v); v.pause(); v.controls = true; });
    }
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
