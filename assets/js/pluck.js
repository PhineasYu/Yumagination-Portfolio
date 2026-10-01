/* Inside a story, the two neighbouring threads are lines you can pluck. Hover and the line leans toward you;
   press and drag and it bends wherever you hold it; let go and it springs back with a little wobble.
   A click (or a pull of more than 90 px toward the photographs) opens that thread. */
(function () {
  const story = document.getElementById("story"); if (!story) return;
  const N = 64, PULL = 90, MAXB = 170;
  story.querySelectorAll(".story-side").forEach((btn) => {
    const ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg"), path = document.createElementNS(ns, "path");
    const gid = "pl-" + (btn.classList.contains("prev") ? "p" : "n");
    svg.innerHTML = `<defs><linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-opacity="0"/><stop offset=".2" stop-opacity="1"/><stop offset=".8" stop-opacity="1"/><stop offset="1" stop-opacity="0"/></linearGradient></defs>`;
    svg.appendChild(path); btn.appendChild(svg);
    const inward = btn.classList.contains("prev") ? 1 : -1;     // toward the photographs
    let H = 0, dx = 0, v = 0, target = 0, py = 0.5, held = null, moved = 0, raf = 0, hover = false;
    const size = () => { H = btn.clientHeight || innerHeight; svg.setAttribute("width", 2); svg.setAttribute("height", H); svg.style.marginLeft = "-1px"; svg.querySelector("linearGradient").setAttribute("y2", H); };   // user-space gradient: a straight line has no width for a bounding-box one
    const colour = () => { const c = getComputedStyle(btn).getPropertyValue("--c").trim() || "125 140 255"; svg.querySelectorAll("stop").forEach((s) => s.setAttribute("stop-color", `rgb(${c})`)); path.setAttribute("stroke", `url(#${gid})`); };
    const draw = () => {
      const sig = H * (0.14 + Math.min(1, Math.abs(dx) / MAXB) * 0.12), y0 = py * H; let d = "";
      for (let k = 0; k <= N; k++) { const y = (k / N) * H, x = 1 + dx * Math.exp(-(((y - y0) / sig) ** 2)); d += (k ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(1); }
      path.setAttribute("d", d);
      path.setAttribute("stroke-opacity", held || hover ? 0.9 : 0.3);
    };
    const tick = () => {
      if (held) { dx += (target - dx) * 0.35; v = 0; }
      else { v += (target - dx) * 0.16; v *= 0.8; dx += v; }        // a damped spring: the wobble on release
      draw();
      raf = Math.abs(target - dx) + Math.abs(v) > 0.05 || held ? requestAnimationFrame(tick) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const local = (e) => { const r = btn.getBoundingClientRect(); return { x: e.clientX - (r.left + r.width / 2), y: (e.clientY - r.top) / (r.height || 1) }; };
    btn.addEventListener("pointerenter", () => { hover = true; colour(); go(); });
    btn.addEventListener("pointermove", (e) => {
      const p = local(e);
      if (held) { moved = Math.max(moved, Math.abs(p.x)); target = Math.max(-MAXB, Math.min(MAXB, p.x)); py = p.y; }
      else { py = p.y; target = Math.max(-18, Math.min(18, p.x * 0.6)); }
      go();
    });
    btn.addEventListener("pointerleave", () => { hover = false; if (!held) target = 0; go(); });
    btn.addEventListener("pointerdown", (e) => { held = true; moved = 0; colour(); btn.classList.add("held"); try { btn.setPointerCapture(e.pointerId); } catch (err) {} const p = local(e); py = p.y; go(); });
    const release = (e) => {
      if (!held) return; held = null; btn.classList.remove("held");
      const pulled = dx * inward > PULL;
      btn.dataset.dragged = moved > 6 && !pulled ? "1" : "";
      target = 0; go();
      if (pulled) { btn.dataset.dragged = ""; btn.click(); }
    };
    btn.addEventListener("pointerup", release); btn.addEventListener("pointercancel", release);
    // a drag that did not pull far enough is not a click
    story.addEventListener("click", (e) => { if (e.target.closest(".story-side") === btn && btn.dataset.dragged === "1") { btn.dataset.dragged = ""; e.stopPropagation(); e.preventDefault(); } }, true);
    addEventListener("resize", () => { size(); draw(); });
    new MutationObserver(() => { colour(); }).observe(btn, { attributes: true, attributeFilter: ["style"] });
    size(); colour(); draw();
  });
})();
