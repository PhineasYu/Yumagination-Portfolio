/* Flowing silk background for the hero: a small WebGL fragment shader in the
   site's violet / wash / amber palette. Renders at reduced resolution, pauses
   off-screen and when the tab is hidden, and draws one still frame when the
   visitor prefers reduced motion. Falls back to the CSS gradient if WebGL is missing. */
window.startSilk = function (canvas) {
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return;
  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
uniform vec2 r; uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+vec2(3.1,1.7);a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r.y;
  vec2 q=vec2(fbm(uv*1.1+t*.045),fbm(uv*1.1+vec2(5.2,1.3)-t*.035));
  vec2 w=vec2(fbm(uv*1.3+2.*q+vec2(1.7,9.2)+t*.05),fbm(uv*1.3+2.*q+vec2(8.3,2.8)-t*.04));
  float f=fbm(uv*1.2+2.4*w);
  float fold=.5+.5*sin(f*8.+uv.y*2.2+t*.12);
  vec3 wash=vec3(.94,.93,1.), lav=vec3(.72,.67,1.), vio=vec3(.43,.36,.85), deep=vec3(.29,.25,.73), sun=vec3(.96,.77,.42);
  vec3 c=mix(wash,lav,smoothstep(.15,.85,f));
  c=mix(c,vio,smoothstep(.55,.98,fold)*.42);
  c=mix(c,deep,smoothstep(.85,1.,fold)*.25);
  c=mix(c,sun,smoothstep(.72,.95,fbm(uv*1.8+w*2.-t*.03))*.34);
  c+=.06*smoothstep(.9,1.,fold);
  gl_FragColor=vec4(c,1.);
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
  const scale = 0.5;
  const size = () => { const w = Math.max(2, Math.floor(canvas.clientWidth * scale)), h = Math.max(2, Math.floor(canvas.clientHeight * scale)); if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); } };
  const draw = (ms) => { size(); gl.uniform2f(ur, canvas.width, canvas.height); gl.uniform1f(ut, ms / 1000 + 12); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  draw(0);
  if (reduce) return;
  let raf = 0, visible = true, last = 0;
  const loop = (ms) => { raf = requestAnimationFrame(loop); if (ms - last < 33) return; last = ms; draw(ms); };
  const run = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? run() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  addEventListener("resize", () => draw(performance.now()));
  run();
};
