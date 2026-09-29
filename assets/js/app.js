(function () {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DRAFT = /[?&]draft\b/.test(location.search);

  /* ---------- language ---------- */
  let lang = "en";
  try {
    lang = localStorage.getItem("lang") || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");
  } catch (e) {}
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? o.en ?? "");
  const arr = (o) => (o && (o[lang] || o.en)) || [];
  const STR = {
    letsTalk: { en: "Let's talk", zh: "聊一聊" }, viewWork: { en: "View work", zh: "看作品" },
    work: { en: "Work", zh: "作品" }, workLede: { en: "A selection of work across AI-native products, hackathon prototypes, and research-led design. Most of them run: watch them move, or open them.", zh: "AI 原生产品、黑客松原型和研究型设计的精选。大多数作品都是能运行的：看它们动起来，或者直接打开。" },
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
    return `<span class="tile"></span>`;
  }

  /* ---------- home ---------- */
  function home() {
    const P = D.projects, h = D.person.headline[lang];
    return `
    <section class="hero" id="top">
      <canvas class="silk" aria-hidden="true"></canvas>
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
      <div class="sec-head"><h2 class="sec-title">${esc(s("work"))}</h2><p class="sec-lede">${esc(s("workLede"))}</p></div>
      <div class="filters" role="group">${D.cats.map((c, i) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${i === 0}">${esc(t(c))}</button>`).join("")}</div>
      <div class="work-grid">
        ${P.map((p) => `
          <a class="proj rv" href="#/work/${p.id}" data-cats="${p.cats.join(" ")}">
            ${tile(p)}
            <span class="proj-cap"><span class="proj-title">${esc(t(p.cap))}</span><span class="proj-meta">${esc(p.meta)}</span></span>
          </a>`).join("")}
      </div>
    </section>

    <div class="tools mono" aria-label="${esc(s("tools"))}"><div class="tools-track">${[...D.tools, ...D.tools].map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>

    <section class="section" id="recognition">
      <div class="sec-head"><h2 class="sec-title">${esc(s("recog"))}</h2></div>
      <div class="awards">${D.awards.map((a) => `<div class="award rv"><span class="mono dim">${a.year}</span><b>${esc(t(a.title))}</b><p>${esc(t(a.note))}</p>${DRAFT && a.verify ? `<p class="draft mono">${esc(s("draft"))}</p>` : ""}</div>`).join("")}</div>
    </section>

    ${methodBlock()}
    ${moreBlock()}
    ${aboutBlock()}
    ${contactBlock()}`;
  }

  function methodBlock() {
    const M = D.method;
    return `
    <section class="section" id="method">
      <div class="sec-head"><h2 class="sec-title">${esc(t(M.title))}</h2></div>
      <p class="lede-lg">${esc(t(M.lede))}</p>
      <div class="steps">${M.steps.map((x) => `<div class="step rv"><span class="mono n">${x.n}</span><h3>${esc(t(x.h))}</h3><p>${esc(t(x.p))}</p></div>`).join("")}</div>
      <div class="principles">${M.principles.map((x) => `<div class="principle rv"><h4>${esc(t(x.h))}</h4><p>${esc(t(x.p))}</p></div>`).join("")}</div>
      <p class="disclosure">${esc(t(M.disclosure))}</p>
    </section>`;
  }

  function moreBlock() {
    const m = D.more;
    return `
    <section class="section" id="more">
      <div class="sec-head"><h2 class="sec-title">${esc(t(m.title))}</h2></div>
      <div class="more">${m.items.map((i) => {
        const inner = `<span class="mono dim">${i.year}</span><b>${esc(i.name)}</b><p>${esc(t(i.note))}</p>${i.url ? '<span class="go mono">↗</span>' : ""}`;
        return i.url ? `<a class="more-item" href="${esc(i.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="more-item">${inner}</div>`;
      }).join("")}</div>
    </section>`;
  }

  function aboutBlock() {
    const A = D.about;
    return `
    <section class="section" id="about">
      <div class="sec-head"><h2 class="sec-title">${esc(t(A.title))}</h2></div>
      <div class="about">
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
  function project(id) {
    const P = D.projects, i = P.findIndex((p) => p.id === id);
    if (i < 0) return `<div class="case-head" style="padding-top:120px"><p>Not found. <a href="#/">Home</a></p></div>`;
    const p = P[i], prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    return `
    <article class="case">
      <div class="case-head">
        <a class="back mono" href="#/work">${esc(s("back"))}</a>
        <p class="kicker mono">${esc(p.meta)}</p>
        <h1>${esc(t(p.h1))}</h1>
        <p class="lead">${esc(t(p.lead))}</p>
      </div>
      <div class="hero-shot">${media(p.hero)}${p.hero && p.hero.cap ? `<p class="cap">${esc(t(p.hero.cap))}</p>` : ""}</div>
      <dl class="meta">
        <div><dt>${esc(s("role"))}</dt><dd>${esc(t(p.role))}</dd></div>
        <div><dt>${esc(s("when"))}</dt><dd>${esc(p.when)}</dd></div>
        <div><dt>${esc(s("status"))}</dt><dd>${esc(t(p.status))}</dd></div>
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
      <nav class="pager" aria-label="More work">
        <a href="#/work/${prev.id}"><span class="mono dim">← ${esc(s("prev"))}</span><b>${esc(prev.title)}</b></a>
        <a href="#/work/${next.id}"><span class="mono dim">${esc(s("next"))} →</span><b>${esc(next.title)}</b></a>
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
    document.title = isCase ? `${(D.projects.find((p) => p.id === b) || {}).title || ""} — Yunfei Yu` : "Yunfei Yu — Yumagination";
    wire();
    if (!keepScroll) {
      const el = !isCase && a ? document.getElementById(a) : null;
      if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }

  let io, vio;
  function wire() {
    $$(".chip").forEach((c) => c.addEventListener("click", () => {
      $$(".chip").forEach((x) => x.setAttribute("aria-pressed", x === c));
      $$(".proj").forEach((r) => (r.hidden = !(c.dataset.cat === "all" || r.dataset.cats.split(" ").includes(c.dataset.cat))));
    }));
    if (window.startSilk) window.startSilk($("canvas.silk"));

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
