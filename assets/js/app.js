(function () {
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DRAFT = /[?&]draft\b/.test(location.search);

  /* ---------- language ---------- */
  let lang = "en";
  try {
    const saved = localStorage.getItem("lang");
    lang = saved || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en");
  } catch (e) {}
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? o.en ?? "");
  const setLang = (l) => {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.documentElement.lang = l === "zh" ? "zh" : "en";
    render(true);
  };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = (u) => /^https?:/.test(u);
  const link = (l) => `<a href="${esc(l.url)}"${ext(l.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(t(l.label))} ↗</a>`;

  function cover(p) {
    const svg = window.coverSVG(p.cover);
    const img = p.shot
      ? `<img src="${esc(p.shot)}" alt="${esc(p.title)} screenshot" loading="lazy" onerror="this.remove()">`
      : "";
    return `<div class="cover${p.mobile ? " is-mobile" : ""}">${svg}${img}</div>`;
  }

  /* ---------- views ---------- */
  function home() {
    const P = D.projects;
    const featured = P.filter((p) => p.featured).slice(0, 3);
    const repos = P.reduce((n, p) => n + (p.links || []).filter((l) => /github\.com/.test(l.url)).length, 0);
    const live = P.filter((p) => p.cats.includes("real")).length;
    const h = D.person.headline[lang];
    const ticker = [...D.tools, ...D.tools].map((x) => `<span>${esc(x)}</span>`).join("");

    return `
    <div class="wrap">
      <section class="hero">
        <p class="kicker mono"><span>${esc(t(D.person.role))}</span><span>${esc(t(D.person.location))}</span><span>Portfolio 2026</span></p>
        <h1 class="display">${esc(h[0])}<br><em>${esc(h[1])}</em><br>${esc(h[2])}</h1>
        <div class="hero-foot">
          <p class="intro">${esc(t(D.person.intro))}</p>
          <div class="stats">
            <div class="stat"><b>${P.length}</b><span class="mono">${lang === "zh" ? "个项目" : "Projects"}</span></div>
            <div class="stat"><b>${repos}</b><span class="mono">${lang === "zh" ? "个开源仓库" : "Open repos"}</span></div>
            <div class="stat"><b>${D.awards.length}</b><span class="mono">${lang === "zh" ? "项认可" : "Recognitions"}</span></div>
            <div class="stat"><b>${live}</b><span class="mono">${lang === "zh" ? "个真实上线" : "Live, real"}</span></div>
          </div>
        </div>
        <div class="ticker mono" aria-label="${esc(t(D.ui.ticker))}"><div class="ticker-track">${ticker}</div></div>
      </section>

      <section class="section" id="work">
        <div class="sec-head"><h2>${esc(t(D.ui.selected))}</h2><span class="mono dim">${featured.length} / ${P.length}</span></div>
        <div class="feature">
          ${featured.map((p) => `
            <a class="card rv" href="#/work/${p.id}">
              ${cover(p)}
              <div class="card-body">
                <div class="meta-line mono"><span>${p.num}</span><span>${esc(t(p.status))}</span></div>
                <h3>${esc(p.title)}</h3>
                <p>${esc(t(p.tag))}</p>
                <span class="go mono">${esc(t(D.ui.view))} →</span>
              </div>
            </a>`).join("")}
        </div>
      </section>

      <section class="section" id="index">
        <div class="sec-head"><h2>${esc(t(D.ui.all))}</h2></div>
        <div class="filters" role="group">
          ${D.cats.map((c, i) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${i === 0}">${esc(t(c))}</button>`).join("")}
        </div>
        <div class="index" id="index-list">
          ${P.map((p) => `
            <a class="row" href="#/work/${p.id}" data-cats="${p.cats.join(" ")}" data-id="${p.id}">
              <span class="mono dim">${p.num}</span>
              <span class="row-title">${esc(p.title)}</span>
              <span class="row-tag">${esc(t(p.tag))}</span>
              <span class="mono dim row-year">${p.year}</span>
              <span class="arrow">↗</span>
            </a>`).join("")}
        </div>
      </section>

      <section class="section" id="recognition">
        <div class="sec-head"><h2>${esc(t(D.ui.recognition))}</h2></div>
        <div class="awards">
          ${D.awards.map((a) => `
            <div class="award rv"><span class="mono dim">${a.year}</span><b>${esc(t(a.title))}</b><p>${esc(t(a.note))}</p>${DRAFT && a.verify ? `<p class="draft mono">${esc(t(D.ui.draftNote))}</p>` : ""}</div>`).join("")}
        </div>
      </section>

      ${methodBlock()}
      ${moreBlock()}
      ${aboutBlock()}
      ${contactBlock()}
    </div>`;
  }

  function methodBlock() {
    const M = D.method;
    return `
      <section class="section" id="method">
        <div class="sec-head"><h2>${esc(t(M.title))}</h2></div>
        <p class="lede">${esc(t(M.lede))}</p>
        <div class="steps">
          ${M.steps.map((s) => `<div class="step rv"><span class="mono n">${s.n}</span><h3>${esc(t(s.h))}</h3><p>${esc(t(s.p))}</p></div>`).join("")}
        </div>
        <div class="sec-head" style="margin-top:clamp(40px,6vw,88px);border-bottom:0;padding-bottom:0"><h2 style="font-size:clamp(24px,2.6vw,36px)">${esc(t(M.principlesTitle))}</h2></div>
        <div class="principles">
          ${M.principles.map((p) => `<div class="principle rv"><h4>${esc(t(p.h))}</h4><p>${esc(t(p.p))}</p></div>`).join("")}
        </div>
        <p class="disclosure">${esc(t(M.disclosure))}</p>
      </section>`;
  }

  function moreBlock() {
    const m = D.more;
    return `
      <section class="section" id="more">
        <div class="sec-head"><h2>${esc(t(m.title))}</h2></div>
        <div class="more-list">
          ${m.items.map((i) => {
            const inner = `<span class="mono dim">${i.year}</span><b>${esc(i.name)}</b><p>${esc(t(i.note))}</p>${i.url ? '<span class="mono">↗</span>' : ""}`;
            return i.url ? `<a class="more-item" href="${esc(i.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="more-item">${inner}</div>`;
          }).join("")}
        </div>
      </section>`;
  }

  function aboutBlock() {
    const A = D.about;
    return `
      <section class="section" id="about">
        <div class="sec-head"><h2>${esc(t(A.title))}</h2></div>
        <div class="about-grid">
          <div>${A.body[lang].map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          <div>
            <ul class="tl">${A.timeline.map((r) => `<li><span class="mono dim">${r.when}</span><span>${esc(t(r.what))}</span></li>`).join("")}</ul>
            <p class="langline mono">${esc(t(A.languages))}</p>
          </div>
        </div>
      </section>`;
  }

  function contactBlock() {
    const p = D.person;
    return `
      <section class="contact" id="contact">
        <h2>${lang === "zh" ? "一起做<em>点什么。</em>" : "Let's build <em>something.</em>"}</h2>
        <p>${esc(t(D.ui.contactLede))}</p>
        <a class="mail" href="mailto:${p.email}">${p.email}</a>
        <div class="links mono">
          <a href="${p.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </section>`;
  }

  function project(id) {
    const P = D.projects;
    const i = P.findIndex((p) => p.id === id);
    if (i < 0) return `<div class="wrap"><p style="padding:80px 0">Not found. <a href="#/">Home</a></p></div>`;
    const p = P[i], prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    const list = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    return `
    <article class="case wrap">
      <a class="back mono" href="#/work">${esc(t(D.ui.back))}</a>
      <p class="mono dim">${p.num} — ${p.year}</p>
      <h1>${esc(p.title)}</h1>
      <p class="tagline">${esc(t(p.tag))}</p>
      <div class="case-cover">${cover(p)}</div>
      <div class="case-grid">
        <aside class="meta">
          <dl style="margin:0;display:contents">
            <div><dt class="mono">${esc(t(D.ui.role))}</dt><dd>${esc(t(p.role))}</dd></div>
            <div><dt class="mono">${esc(t(D.ui.status))}</dt><dd>${esc(t(p.status))}</dd></div>
            <div><dt class="mono">${esc(t(D.ui.stack))}</dt><dd class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</dd></div>
            ${p.links && p.links.length ? `<div><dt class="mono">${esc(t(D.ui.links))}</dt><dd class="lk">${p.links.map(link).join("")}</dd></div>` : ""}
          </dl>
        </aside>
        <div class="body">
          ${DRAFT && p.verify ? `<p class="draft mono">${esc(t(D.ui.draftNote))}: ${esc(t(p.verify))}</p>` : ""}
          ${p.facts && p.facts.length ? `<div class="facts">${p.facts.map(([n, l]) => `<div class="fact"><b>${esc(n)}</b><span class="mono">${esc(t(l))}</span></div>`).join("")}</div>` : ""}
          <section><h2>${esc(t(D.ui.problem))}</h2><p>${esc(t(p.problem))}</p></section>
          <section><h2>${esc(t(D.ui.built))}</h2>${list(p.built[lang] || p.built.en)}</section>
          <section><h2>${esc(t(D.ui.decisions))}</h2>${list(p.decisions[lang] || p.decisions.en)}</section>
          <section><h2>${esc(t(D.ui.ai))}</h2><div class="aibox"><p>${esc(t(p.ai))}</p></div></section>
        </div>
      </div>
      <nav class="pager" aria-label="More work">
        <a href="#/work/${prev.id}"><span class="mono dim">← ${esc(t(D.ui.prev))}</span><b>${esc(prev.title)}</b></a>
        <a href="#/work/${next.id}"><span class="mono dim">${esc(t(D.ui.next))} →</span><b>${esc(next.title)}</b></a>
      </nav>
    </article>`;
  }

  /* ---------- render + routing ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [a, b] = h.split("/");
    return { a: a || "", b };
  }

  function render(keepScroll) {
    const { a, b } = route();
    const view = $("#view");
    view.innerHTML = a === "work" && b ? project(b) : home();

    $$("[data-nav]").forEach((el) => {
      el.textContent = t(D.ui.nav[el.dataset.nav]);
      el.removeAttribute("aria-current");
    });
    $("#lang").textContent = lang === "zh" ? "EN" : "中文";
    $("#foot").innerHTML = `<span>© ${new Date().getFullYear()} ${D.person.name}</span><span>${esc(t(D.ui.footer))}</span>`;
    document.title = a === "work" && b ? `${(D.projects.find((p) => p.id === b) || {}).title || ""} — Yunfei Yu` : "Yunfei Yu — Yumagination";

    wire();
    reveal();

    if (!keepScroll) {
      const el = a && a !== "work" || (a === "work" && !b) ? document.getElementById(a) : null;
      if (el) el.scrollIntoView(); else window.scrollTo(0, 0);
    }
  }

  function wire() {
    // filters
    $$(".chip").forEach((c) =>
      c.addEventListener("click", () => {
        $$(".chip").forEach((x) => x.setAttribute("aria-pressed", x === c));
        const cat = c.dataset.cat;
        $$(".row").forEach((r) => (r.hidden = !(cat === "all" || r.dataset.cats.split(" ").includes(cat))));
      })
    );
    // hover preview
    const peek = $("#peek");
    $$(".row").forEach((r) => {
      r.addEventListener("mouseenter", () => {
        const p = D.projects.find((x) => x.id === r.dataset.id);
        peek.innerHTML = cover(p);
        peek.classList.add("on");
      });
      r.addEventListener("mousemove", (e) => {
        peek.style.left = Math.min(e.clientX, innerWidth - 380) + "px";
        peek.style.top = e.clientY + "px";
      });
      r.addEventListener("mouseleave", () => peek.classList.remove("on"));
    });
  }

  let io;
  function reveal() {
    if (io) io.disconnect();
    const els = $$(".rv");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- boot ---------- */
  document.documentElement.lang = lang === "zh" ? "zh" : "en";
  $("#lang").addEventListener("click", () => setLang(lang === "zh" ? "en" : "zh"));
  addEventListener("hashchange", () => render());
  render();
})();
