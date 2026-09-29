/* Hero: a slow, precise "breathing" aperture (a nod to a camera lens).
   One breath = 10 s: inhale 4 s, hold 0.6 s, exhale 5 s, rest 0.4 s, all eased.
   Drawn on a full-resolution canvas (device-pixel-ratio aware) so every ring and
   tick is a crisp hairline. Pauses off-screen / in hidden tabs, and draws one
   still frame when the visitor prefers reduced motion. */
window.startBreath = function (canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const TF = [10, 186, 181], DEEP = [6, 127, 123], LIGHT = [129, 216, 208];
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, x)));
  const breath = (t) => {
    const p = (t % 10);
    if (p < 4) return ease(p / 4);            // inhale
    if (p < 4.6) return 1;                    // hold
    if (p < 9.6) return 1 - ease((p - 4.6) / 5); // exhale
    return 0;                                 // rest
  };

  let W = 0, H = 0, dpr = 1;
  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    const w = Math.round(W * dpr), h = Math.round(H * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (t, b) => {
    size();
    ctx.clearRect(0, 0, W, H);
    const wide = W > 900;
    const cx = wide ? W * 0.8 : W * 0.5;
    const cy = wide ? H * 0.64 : H * 0.74;
    const R = (wide ? Math.min(W * 0.3, H * 0.5) : Math.min(W * 0.56, H * 0.3));

    // luminous disc that swells and softens with each breath
    const rd = R * (0.86 + 0.16 * b);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rd);
    g.addColorStop(0, "rgba(255,255,255,0.96)");
    g.addColorStop(0.32, rgba(LIGHT, 0.62 + 0.12 * b));
    g.addColorStop(0.72, rgba(TF, 0.2 + 0.06 * b));
    g.addColorStop(1, rgba(TF, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rd, 0, Math.PI * 2); ctx.fill();

    // hairline rings: expand a little more the further out they are
    ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      const base = R * (0.3 + i * 0.125);
      const r = base * (1 + 0.05 * b * (0.6 + i * 0.22));
      const a = 0.42 - i * 0.045;
      ctx.strokeStyle = rgba(i % 2 ? TF : DEEP, Math.max(0.08, a) * (0.7 + 0.3 * b));
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }

    // lens scale: 180 fine ticks on the outer ring, long tick every 15
    const rr = R * (1.2 + 0.06 * b);
    const rot = t * 0.004;
    for (let k = 0; k < 180; k++) {
      const ang = rot + (k / 180) * Math.PI * 2;
      const long = k % 15 === 0;
      const len = (long ? 12 : 5) * (0.75 + 0.5 * b);
      const x1 = cx + Math.cos(ang) * rr, y1 = cy + Math.sin(ang) * rr;
      const x2 = cx + Math.cos(ang) * (rr + len), y2 = cy + Math.sin(ang) * (rr + len);
      ctx.strokeStyle = rgba(DEEP, long ? 0.5 : 0.24);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }

    // core
    ctx.fillStyle = rgba(DEEP, 0.9);
    ctx.beginPath(); ctx.arc(cx, cy, 2.5 + 1.5 * b, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = rgba(DEEP, 0.35); ctx.beginPath(); ctx.arc(cx, cy, 9 + 5 * b, 0, Math.PI * 2); ctx.stroke();
  };

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  draw(0, 0.5);
  if (reduce) { addEventListener("resize", () => draw(0, 0.5)); return; }

  let raf = 0, visible = true, t0 = performance.now(), paused = 0;
  const frame = (now) => { raf = requestAnimationFrame(frame); const t = (now - t0) / 1000; draw(t, breath(t)); };
  const run = () => { if (!raf && visible && !document.hidden) { t0 += performance.now() - paused; raf = requestAnimationFrame(frame); } };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; paused = performance.now(); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? run() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  run();
};
