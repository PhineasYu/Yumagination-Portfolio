(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DEMO = /[?&]demo\b/.test(location.search);
  let G = window.GALLERY;

  /* ?demo: generate sample frames in the browser so the layout can be previewed with no photos */
  if (DEMO) {
    const tones = [["#0abab5", "#e3f6f3"], ["#81d8d0", "#0d1f1f"], ["#f28b7d", "#fbe9e4"], ["#067f7b", "#d2f0ec"], ["#d9b06a", "#f6fcfb"], ["#0d1f1f", "#81d8d0"]];
    const sizes = [[1600, 1067], [1067, 1600], [1600, 1067], [1200, 1200], [1067, 1600], [1600, 900], [1067, 1600], [1600, 1067]];
    const mk = (i) => { const [w, h] = sizes[i % sizes.length], [a, b] = tones[i % tones.length]; const c = document.createElement("canvas"); c.width = 800; c.height = Math.round(800 * h / w); const x = c.getContext("2d"); const g = x.createLinearGradient(0, 0, c.width, c.height); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, c.width, c.height); return { file: c.toDataURL("image/jpeg", .8), thumb: c.toDataURL("image/jpeg", .8), w, h, title: { en: "Sample frame " + (i + 1), zh: "示例画面 " + (i + 1) }, place: "Stockholm", year: "2026" }; };
    G = Object.assign({}, G, { series: [{ id: "a", title: { en: "First room", zh: "第一展厅" }, note: { en: "Sample frames to preview the layout.", zh: "用来预览版式的示例画面。" }, photos: [0, 1, 2, 3, 4, 5].map(mk) }, { id: "b", title: { en: "Second room", zh: "第二展厅" }, note: { en: "", zh: "" }, photos: [6, 7, 8, 9].map(mk) }] });
  }

  let lang = "en";
  try { lang = localStorage.getItem("lang") || ((navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en"); } catch (e) {}
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? o.en ?? "");
  const esc = (x) => String(x == null ? "" : x).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const N = { work: { en: "Work", zh: "作品" }, gallery: { en: "Gallery", zh: "摄影" }, method: { en: "Method", zh: "方法" }, about: { en: "About", zh: "关于" }, contact: { en: "Contact", zh: "联系" } };
  const S = {
    room: { en: "Room", zh: "展厅" }, photos: { en: "photographs", zh: "张照片" },
    soon: { en: "The walls are being hung. Photographs arrive here soon.", zh: "展墙正在布置，照片很快会挂上来。" },
    talk: { en: "Let's talk.", zh: "聊一聊。" }, footer: { en: "Designed and built with Claude Code.", zh: "由 Claude Code 协助设计与搭建。" }
  };
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const flat = () => G.series.flatMap((s) => s.photos.map((p) => ({ ...p, room: s })));
  let all = [], cur = 0;

  function render() {
    $$("[data-t]").forEach((el) => (el.textContent = t(N[el.dataset.t])));
    $("#lang").textContent = lang === "zh" ? "EN" : "中文";
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
    all = flat();
    let n = 0;
    const rooms = G.series.map((s, si) => `
      <section class="room" aria-label="${esc(t(s.title))}">
        <div class="room-head"><span class="mono">${esc(t(S.room))} ${roman[si] || si + 1}</span><h2>${esc(t(s.title))}</h2>${t(s.note) ? `<p>${esc(t(s.note))}</p>` : ""}</div>
        <div class="plates">${s.photos.map((p) => { const i = n++; return `
          <figure class="plate" tabindex="0" data-i="${i}" role="button" aria-label="${esc(t(p.title) || "Photograph " + (i + 1))}">
            <div class="frame" style="--ar:${p.w && p.h ? p.w + "/" + p.h : "3/2"}"><img src="${esc(p.thumb || p.file)}" alt="${esc(t(p.title))}" loading="lazy" decoding="async"></div>
            <figcaption><span class="no mono">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(t(p.title))}</span><span class="m">${esc([p.place, p.year].filter(Boolean).join(" · "))}</span></figcaption>
          </figure>`; }).join("")}</div>
      </section>`).join("");
    const empty = `
      <section class="empty"><div class="empty-walls" aria-hidden="true"><div class="ghost"></div><div class="ghost"></div><div class="ghost"></div></div><p class="empty-note">${esc(t(S.soon))}</p></section>`;
    $("#view").innerHTML = `
      <section class="g-hero"><canvas class="breath" aria-hidden="true"></canvas>
        <div class="g-hero-in"><p class="g-kicker mono">${esc(t(G.kicker))}</p><h1 class="g-title">${esc(t(G.title))}</h1><p class="g-statement">${esc(t(G.statement))}</p>${all.length ? `<p class="g-count mono">${all.length} ${esc(t(S.photos))} · ${G.series.length} ${esc(t(S.room)).toLowerCase()}${lang === "zh" ? "" : G.series.length > 1 ? "s" : ""}</p>` : ""}</div>
      </section>
      <div id="wall">${all.length ? rooms : empty}</div>
      <section class="g-foot"><h2>${esc(t(S.talk))}</h2><a class="mail" href="mailto:phineasyu0812@gmail.com">phineasyu0812@gmail.com</a>
        <div class="foot mono"><span>© ${new Date().getFullYear()} Yunfei Yu</span><span>${esc(t(S.footer))}</span></div></section>`;
    if (window.startBreath) window.startBreath($("canvas.breath"));
    // photographs fade in as they load (slowly, like an exposure)
    $$(".plate img").forEach((im) => { const ok = () => im.classList.add("ready"); im.complete ? ok() : im.addEventListener("load", ok, { once: true }); });
    layout();
    $$(".plate").forEach((f) => { f.addEventListener("click", () => open(+f.dataset.i)); f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(+f.dataset.i); } }); });
  }

  /* masonry that keeps left-to-right reading order: each photo goes into the shortest column */
  let lastCols = 0;
  function layout(force) {
    const cols = innerWidth > 1000 ? 3 : innerWidth > 720 ? 2 : 1;
    if (!force && cols === lastCols) return;
    lastCols = cols;
    $$(".plates").forEach((wrap) => {
      const figs = $$(".plate", wrap);
      wrap.innerHTML = "";
      wrap.style.cssText = "display:grid;gap:0 clamp(20px,3vw,44px);grid-template-columns:repeat(" + cols + ",1fr);align-items:start";
      const colEls = Array.from({ length: cols }, () => { const d = document.createElement("div"); wrap.appendChild(d); return d; });
      const heights = new Array(cols).fill(0);
      figs.forEach((f) => {
        const ar = f.querySelector(".frame").style.getPropertyValue("--ar").split("/").map(Number);
        const h = ar[1] && ar[0] ? ar[1] / ar[0] : 0.67;
        const k = heights.indexOf(Math.min(...heights));
        colEls[k].appendChild(f); heights[k] += h + 0.16;
      });
    });
  }
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => layout(), 150); });

  /* lightbox */
  const lb = $("#lb"), img = $("#lb-img"), cap = $("#lb-cap"), cnt = $("#lb-count");
  let lastFocus = null;
  function show(i) {
    cur = (i + all.length) % all.length;
    const p = all[cur];
    img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
    img.src = p.file || p.thumb; img.alt = t(p.title);
    cap.innerHTML = `<b>${esc(t(p.title))}</b>${esc([p.place, p.year].filter(Boolean).join(" · "))}`;
    cnt.textContent = `${String(cur + 1).padStart(2, "0")} / ${String(all.length).padStart(2, "0")}`;
    [cur + 1, cur - 1].forEach((k) => { const q = all[(k + all.length) % all.length]; if (q) new Image().src = q.file || q.thumb; });
  }
  function open(i) { lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add("lb-open"); show(i); $("#lb-close").focus(); }
  function close() { lb.hidden = true; document.body.classList.remove("lb-open"); img.src = ""; if (lastFocus) lastFocus.focus(); }
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(cur - 1));
  $("#lb-next").addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  addEventListener("keydown", (e) => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(cur - 1); else if (e.key === "ArrowRight") show(cur + 1); });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); tx = null; }, { passive: true });

  $("#lang").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; try { localStorage.setItem("lang", lang); } catch (e) {} render(); });
  addEventListener("scroll", () => $("#bar").classList.toggle("scrolled", scrollY > 24), { passive: true });
  render();
})();
