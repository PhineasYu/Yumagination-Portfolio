/* Flowing silk background for the hero: a small WebGL fragment shader in
   Tiffany Blue. The original silk, made finer and regular: evenly spaced
   folds travel at one constant speed under a slow periodic swell, with fine
   threads riding on them (no noise, no turbulence). The cloth fades out
   behind the text. Pauses off-screen and when the tab is hidden, and draws
   one still frame when the visitor prefers reduced motion. Falls back to the
   CSS background if WebGL is missing. */
window.startSilk = function (canvas) {
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return;
  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
uniform vec2 r; uniform float t;
void main(){
  vec2 n=gl_FragCoord.xy/r;               // 0..1, y up
  vec2 uv=gl_FragCoord.xy/r.y;
  float a=r.x/r.y;
  // slow, periodic swell of the whole cloth: fixed frequencies, fixed speeds
  float sw=.10*sin(uv.x*1.5+t*.26)+.05*sin(uv.x*2.7-t*.19+1.3);
  float y=uv.y+sw+.32*uv.x;
  // evenly spaced folds travelling at one constant speed
  float ph=y*6.2-t*.36+.55*sin(uv.x*1.1+t*.14);
  float fold=.5+.5*sin(ph);
  // fine threads that ride on the folds
  float thread=.5+.5*sin(ph*23.);
  vec3 base=vec3(.949,.957,.957), mist=vec3(.86,.945,.937), lt=vec3(.506,.847,.816), tf=vec3(.039,.729,.71), dp=vec3(.024,.498,.482);
  vec3 c=mix(mist,lt,smoothstep(.05,.95,fold));
  c=mix(c,tf,pow(fold,3.)*.6);
  c=mix(c,dp,pow(fold,9.)*.28);
  c+=.07*smoothstep(.2,.02,abs(fold-.72))*(1.-fold);   // soft sheen on each fold's shoulder
  c*=1.-.035*thread*smoothstep(.15,.8,fold);
  // keep the text side quiet: wide screens fade toward the left, narrow ones toward the bottom (where the text sits)
  float mw=smoothstep(.18,.95,n.x*.95+(1.-n.y)*.35);
  float mn=smoothstep(.35,.95,n.y*1.1);
  float m=mix(mn,mw,step(1.,a));
  gl_FragColor=vec4(mix(base,c,m),1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return;
  const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const ur = gl.getUniformLocation(pr, "r"), ut = gl.getUniformLocation(pr, "t");
  const scale = Math.min(devicePixelRatio || 1, 1.5);   // fine threads need close to full resolution
  const size = () => { const w = Math.max(2, Math.floor(canvas.clientWidth * scale)), h = Math.max(2, Math.floor(canvas.clientHeight * scale)); if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); } };
  const draw = (ms) => { size(); gl.uniform2f(ur, canvas.width, canvas.height); gl.uniform1f(ut, ms / 1000 + 12); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  canvas.classList.add("on");
  draw(0);
  if (reduce) { addEventListener("resize", () => draw(0)); return; }
  let raf = 0, visible = true, last = 0;
  const loop = (ms) => { raf = requestAnimationFrame(loop); if (ms - last < 33) return; last = ms; draw(ms); };
  const run = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? run() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  addEventListener("resize", () => draw(performance.now()));
  run();
};
