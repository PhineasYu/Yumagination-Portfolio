/* Hero background, "light rails" (after Yunfei's light-rails preset, 2026-10-01): a grid of small cells on
   the page's light grey. A band of checkered cells runs along a zigzag rail (the preset's four path points);
   around it, slow soft regions are drawn as sparse dots, dense dots, large dots and short bars. Every 3.6 s
   the pattern grows in from the top right, holds while the colours drift through the Tiffany range, and
   shrinks away cell by cell. Quiet behind the name. The pointer carries a ring of cells, and sweeping it
   across the hero leaves a short trail of dots that fades within a second. Pauses off-screen and when the tab is hidden; one still
   frame (fully shown) for reduced motion. Falls back to the CSS background if WebGL is missing.
   (The function keeps its old name, startSilk, so app.js does not change.) */
window.startSilk = function (canvas) {
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return;
  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `precision mediump float;
uniform vec2 r; uniform float t; uniform float cs; uniform float still; uniform vec3 m[12]; uniform vec3 mp;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
const vec3 BG=vec3(.957,.957,.957);                       // the page background (#f4f4f4), so the hero runs into the page
vec3 pal(float k){                                        // the Tiffany range, looping, from full Tiffany to its deep shade
  vec3 c0=vec3(.506,.847,.816), c1=vec3(.247,.690,.655), c2=vec3(.039,.522,.502), c3=vec3(.357,.776,.741);
  k=fract(k)*4.;
  return k<1.?mix(c0,c1,k):k<2.?mix(c1,c2,k-1.):k<3.?mix(c2,c3,k-2.):mix(c3,c0,k-3.);
}
void main(){
  vec2 cell=floor(gl_FragCoord.xy/cs), lc=fract(gl_FragCoord.xy/cs)-.5;
  vec2 n=(cell+.5)*cs/r;                                  // 0..1, y up, at the cell's centre
  float a=r.x/r.y; vec2 q=vec2(n.x*a,n.y);
  float P=3.6, ph=still>.5?.4:fract(t/P), cyc=still>.5?0.:floor(t/P);
  // the rail: a smooth curve through the preset's four path points (x, y from the top), gently breathing
  float x0=.06*a,x1=.34*a,x2=.66*a,x3=.95*a, y0=.15,y1=.78,y2=.22,y3=.85, xa,xb,ya,yb;
  if(q.x<x1){xa=x0;xb=x1;ya=y0;yb=y1;} else if(q.x<x2){xa=x1;xb=x2;ya=y1;yb=y2;} else {xa=x2;xb=x3;ya=y2;yb=y3;}
  float u=clamp((q.x-xa)/(xb-xa),0.,1.), Y=mix(ya,yb,.5-.5*cos(3.14159*u)), dY=(yb-ya)*1.5708*sin(3.14159*u)/(xb-xa);
  float d=abs(q.y-Y)/sqrt(1.+dY*dY)+.012*sin(q.x*7.+t*.5);
  // soft regions around it
  float f=.5+.22*sin(q.x*2.3+1.7*sin(q.y*1.9+t*.11)+t*.07)+.2*sin(q.y*3.1-q.x*1.2+1.3*sin(q.x*1.4-t*.09))+.08*sin((q.x+q.y)*5.+t*.2);
  // timing: every cell grows in (wipe from the top right), holds, and shrinks away in its own moment
  float s=((1.-n.x)+(1.-n.y))*.5, h=hash(cell);
  float thr=s*.85+h*.15, g=smoothstep(thr-.07,thr+.03,smoothstep(0.,.16,ph)*1.1);
  g*=1.-smoothstep(h*.55,h*.55+.45,smoothstep(.64,.88,ph));
  // the pointer: a ring of cells around it, and a fading trail behind it
  vec2 cp=(cell+.5)*cs; float hov=0.;
  for(int i=0;i<12;i++){ float age=t-m[i].z; if(age<0.||age>1.) continue; float dd=distance(cp,m[i].xy)/(cs*4.5); hov=max(hov,(1.-age)*(1.-age)*exp(-dd*dd)); }
  float dm=distance(cp,mp.xy)/cs;
  hov=max(hov,mp.z*(exp(-pow((dm-5.5)/1.1,2.))+.55*exp(-dm*dm/6.)));
  hov=clamp(hov,0.,1.);
  float px=1.4/cs, cover=0., lvl;
  if(d<.06){ lvl=4.; cover=step(.5,mod(cell.x+cell.y,2.))*step(max(abs(lc.x),abs(lc.y)),.5*g); }             // checkered rail
  else if(d<.085){ lvl=-1.; }                                                                                 // a gap along it
  else if(f<.4){ lvl=0.; cover=(mod(cell.x,2.)+mod(cell.y,2.)<.5)?smoothstep(.2*g+px,.2*g-px,length(lc)):0.; } // sparse dots
  else if(f<.55){ lvl=1.; cover=smoothstep(.26*g+px,.26*g-px,length(lc)); }                                  // dense small dots
  else if(f<.7){ lvl=2.; cover=smoothstep(.4*g+px,.4*g-px,length(lc)); }                                     // large dots
  else { lvl=3.; cover=step(abs(lc.x),.19*g)*step(abs(lc.y),.42*g); }                                         // short bars
  vec3 col=pal(lvl*.17+f*.35+cyc*.29+ph*.18);
  if(lvl<.5) col=mix(BG,col,.55);
  // keep it quiet behind the name and the two lines (bottom left), and under the menu bar
  float zone=(1.-smoothstep(.2,.72,n.y))*(1.-smoothstep(.45,1.,n.x/max(a*.55,1.)));
  float top=smoothstep(r.y-cs*9.,r.y-cs*3.,(cell.y+.5)*cs);
  float k=cover*(1.-.9*zone)*(1.-.75*top);
  // where the pointer is, every cell shows a dot in a deeper Tiffany, whatever the moment
  float hd=smoothstep(.36*hov+px,.36*hov-px,length(lc))*smoothstep(0.,.3,hov);
  float kh=hd*(1.-.55*zone);
  col=mix(col,vec3(.039,.522,.502),smoothstep(.04,.35,hov)*.9);
  k=max(k*(1.-.5*smoothstep(.1,.6,hov)),kh);
  vec3 c=mix(BG,col,k)+(hash(gl_FragCoord.xy+fract(t)*91.)-.5)*.02;   // a trace of grain
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
  const ur = gl.getUniformLocation(pr, "r"), ut = gl.getUniformLocation(pr, "t"), uc = gl.getUniformLocation(pr, "cs"), us = gl.getUniformLocation(pr, "still"), um = gl.getUniformLocation(pr, "m"), ump = gl.getUniformLocation(pr, "mp");
  const scale = Math.min(devicePixelRatio || 1, 2);     // round dots need the full resolution
  const CELL = 14;                                      // one cell, in CSS pixels
  const size = () => { const w = Math.max(2, Math.floor(canvas.clientWidth * scale)), h = Math.max(2, Math.floor(canvas.clientHeight * scale)); if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); } };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // the pointer: its position (canvas pixels, y up) and a trail of the last 12 positions with the time they were left
  const trail = new Float32Array(36).fill(-1e4), ptr = { x: -1e4, y: -1e4, on: 0, want: 0 }; let head = 0, lastT = 0, lx = -1e4, ly = -1e4;
  const draw = (ms) => {
    size(); const sec = ms / 1000;
    ptr.on += (ptr.want - ptr.on) * .12;
    gl.uniform2f(ur, canvas.width, canvas.height); gl.uniform1f(ut, sec); gl.uniform1f(uc, CELL * scale); gl.uniform1f(us, reduce ? 1 : 0);
    gl.uniform3fv(um, trail); gl.uniform3f(ump, ptr.x, ptr.y, ptr.on);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  canvas.classList.add("on");
  draw(0);
  if (reduce) { addEventListener("resize", () => draw(0)); return; }
  const hero = canvas.parentElement;
  hero.addEventListener("pointermove", (e) => {
    const b = canvas.getBoundingClientRect(); ptr.x = (e.clientX - b.left) * scale; ptr.y = (b.bottom - e.clientY) * scale; ptr.want = 1;
    const now = performance.now() / 1000;
    if (now - lastT > .045 && Math.hypot(ptr.x - lx, ptr.y - ly) > CELL * scale) { trail.set([ptr.x, ptr.y, now], head * 3); head = (head + 1) % 12; lastT = now; lx = ptr.x; ly = ptr.y; }
  });
  hero.addEventListener("pointerleave", () => { ptr.want = 0; });
  let raf = 0, visible = true;
  const loop = (ms) => { raf = requestAnimationFrame(loop); draw(ms); };   // every frame, so the growing and shrinking stays smooth
  const run = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? run() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : run()));
  addEventListener("resize", () => draw(performance.now()));
  run();
};
