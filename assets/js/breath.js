/* Hero: a slow, precise "breathing" aperture (a nod to a camera lens).
   One breath = 10 s: inhale 4 s, hold 0.6 s, exhale 5 s, rest 0.4 s, all eased.
   Flat colour only (no gradients): one pale disc, hairline rings, a lens scale.
   The aperture leans a few pixels toward the pointer and the scale turns a
   little with it, eased so it never jumps. Drawn on a full-resolution canvas
   (device-pixel-ratio aware). Pauses off-screen / in hidden tabs, and draws one
   still frame when the visitor prefers reduced motion. */
window.startBreath = function (canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const TF = [10, 186, 181], DEEP = [6, 127, 123];
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

  // pointer, eased: target (tx, ty) in -1..1, current (px, py)
  let tx = 0, ty = 0, px = 0, py = 0;

  const draw = (t, b) => {
    size();
    ctx.clearRect(0, 0, W, H);
    const wide = W > 900;
    const k = wide ? 1 : 0.55;                  // quieter on small screens, so text stays clear
    const cx = (wide ? W * 0.78 : W * 0.5) + px * 14;
    const cy = (wide ? H * 0.58 : H * 0.8) + py * 10;
    const R = (wide ? Math.min(W * 0.26, H * 0.42) : Math.min(W * 0.5, H * 0.26));

    // one flat, pale disc that swells with each breath
    ctx.fillStyle = rgba(TF, 0.07 * k);
    ctx.beginPath(); ctx.arc(cx, cy, R * (0.9 + 0.12 * b), 0, Math.PI * 2); ctx.fill();

    // hairline rings: expand a little more the further out they are
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const base = R * (0.3 + i * 0.14);
      const r = base * (1 + 0.05 * b * (0.6 + i * 0.22));
      const a = (0.36 - i * 0.045) * (0.7 + 0.3 * b) * k;
      ctx.strokeStyle = rgba(i % 2 ? TF : DEEP, Math.max(0.06, a));
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    }

    // lens scale: 120 fine ticks on the outer ring, a long tick every 10
    const rr = R * (1.2 + 0.05 * b);
    const rot = t * 0.004 + px * 0.12;
    for (let j = 0; j < 120; j++) {
      const ang = rot + (j / 120) * Math.PI * 2;
      const long = j % 10 === 0;
      const len = (long ? 12 : 5) * (0.75 + 0.5 * b);
      ctx.strokeStyle = rgba(DEEP, (long ? 0.42 : 0.18) * k);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr);
      ctx.lineTo(cx + Math.cos(ang) * (rr + len), cy + Math.sin(ang) * (rr + len));
      ctx.stroke();
    }

    // core
    ctx.fillStyle = rgba(DEEP, 0.85);
    ctx.beginPath(); ctx.arc(cx, cy, 2.5 + 1.5 * b, 0, Math.PI * 2); ctx.fill();
  };

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  draw(0, 0.5);
  if (reduce) { addEventListener("resize", () => draw(0, 0.5)); return; }

  if (matchMedia("(pointer: fine)").matches) {
    addEventListener("pointermove", (e) => { tx = (e.clientX / innerWidth) * 2 - 1; ty = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
  }

  let raf = 0, visible = true, t0 = performance.now(), paused = t0;
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    px += (tx - px) * 0.04; py += (ty - py) * 0.04;
    const t = (now - t0) / 1000; draw(t, breath(t));
  };
  const run = () => { if (!raf && visible && !document.hidden) { t0 += performance.now() - paused; raf = requestAnimationFrame(frame); } };
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; paused = performance.now(); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? run() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  run();
};
