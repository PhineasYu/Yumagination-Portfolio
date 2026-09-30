/**
 * Records short, looping demo videos of your real running apps for the portfolio.
 *   npm i -D playwright && npx playwright install chromium   (once)
 *   start the app(s) locally, edit `jobs` below (url, viewport, steps), then:
 *   node scripts/record-demos.mjs <jobName> [...]
 * Needs ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg). Output: assets/media/<name>.mp4 + <name>-poster.jpg
 * Reference it from assets/js/projects.js with: V("<name>", { frame: "browser" | "phone", tag: "rec" })
 * The steps below are the ones used for the current videos (ports were local dev servers).
 */
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync, renameSync, rmSync, readdirSync } from 'node:fs';
const S=process.env.TMPDIR||'/tmp', OUT='assets/media/'; const FFMPEG=process.env.FFMPEG||'ffmpeg';
const only = process.argv.slice(2);
const wait = (p,ms)=>p.waitForTimeout(ms);
const CURSOR = `(()=>{const d=document.createElement('div');d.style.cssText='position:fixed;z-index:2147483647;width:22px;height:22px;border-radius:50%;background:rgba(10,186,181,.35);border:2px solid #81d8d0;pointer-events:none;transform:translate(-50%,-50%);transition:width .12s,height .12s,background .12s;left:-50px;top:-50px';const add=()=>document.documentElement.appendChild(d);document.readyState==='loading'?document.addEventListener('DOMContentLoaded',add):add();addEventListener('mousemove',e=>{d.style.left=e.clientX+'px';d.style.top=e.clientY+'px'},true);addEventListener('mousedown',()=>{d.style.width='34px';d.style.height='34px';d.style.background='rgba(242,139,125,.5)'},true);addEventListener('mouseup',()=>{d.style.width='22px';d.style.height='22px';d.style.background='rgba(10,186,181,.35)'},true);addEventListener('touchstart',e=>{const t=e.touches[0];d.style.left=t.clientX+'px';d.style.top=t.clientY+'px'},true)})()`;
const move = async (p, el, opts={}) => { const b = await el.boundingBox(); if(!b) return; await p.mouse.move(b.x+b.width/2, b.y+b.height/2, {steps: 18}); };
const click = async (p, loc, pause=900) => { await move(p, loc); await wait(p,150); await loc.click(); await wait(p,pause); };
const jobs = {
  fcc: { url:'http://127.0.0.1:8099/demos/full-context-canvas/index.html#tour', vp:[1280,800], run: async p => {
    await wait(p,2500); for (let i=0;i<11;i++){ await p.keyboard.press('ArrowRight'); await wait(p,2600);} await wait(p,800); } },
  chroma: { url:'http://127.0.0.1:5405/', vp:[1280,800], run: async p => {
    await wait(p,1200); await click(p, p.getByText('Why Studying Feels Easier Than It Is').first(), 2200);
    // sentences in the reader
    const spans = p.locator('main span, article span').filter({hasText:/\./});
    const n = await spans.count(); console.log('sentences',n);
    for (const [i,key] of [[2,'3'],[3,'1'],[4,'4'],[5,'2'],[6,'1'],[7,'5'],[8,'3'],[9,'1']]) { const s = spans.nth(i); await move(p,s); await s.click().catch(()=>{}); await wait(p,250); await p.keyboard.press(key); await wait(p,650); }
    await wait(p,1500); } },
  teamdex: { url:'http://127.0.0.1:5401/', vp:[390,844], mobile:true, run: async p => {
    await wait(p,1500); await p.getByPlaceholder('Team code').tap(); await p.keyboard.type('FIKA24',{delay:120}); await wait(p,500);
    await p.getByRole('button',{name:/Join/}).tap(); await wait(p,1600);
    await p.getByText('Yunfei').first().tap(); await wait(p,2200);
    await p.mouse.wheel(0,500); await wait(p,1200); await p.mouse.wheel(0,-500); await wait(p,600);
    await p.locator('a[href*="/quest/card/"]').first().tap(); await wait(p,2800);
    await p.goBack(); await wait(p,1000); await p.getByRole('link',{name:'Quiz'}).first().tap().catch(()=>{}); await wait(p,2600); } },
  kikaren: { url:'http://127.0.0.1:5404/', vp:[1280,800], run: async p => {
    await wait(p,2000);
    const card = p.getByText('MODERATERNA').first(); const cb = await card.boundingBox(); console.log('card',cb);
    const lens = { x: 640, y: 300 };
    await p.mouse.move(cb.x+30, cb.y-40, {steps:12}); await p.mouse.down(); await p.mouse.move(lens.x, lens.y, {steps:40}); await wait(p,600); await p.mouse.up(); await wait(p,6000); } },
  legacychain: { url:'http://127.0.0.1:5407/', vp:[1280,800], run: async p => {
    await wait(p,2000); await click(p, p.getByRole('link',{name:'Open the vault'}).first(), 2200);
    await p.mouse.wheel(0,450); await wait(p,1200);
    await click(p, p.locator('a[href*="/certificate/"]').nth(2), 2600);
    await p.mouse.wheel(0,600); await wait(p,1600); await p.mouse.wheel(0,700); await wait(p,1800);
    await click(p, p.getByRole('link',{name:'Provenance'}).first(), 2600); } },
  meanwhile: { url:'http://127.0.0.1:5402/', vp:[390,844], mobile:true, run: async p => {
    await wait(p,1600); await p.mouse.wheel(0,500); await wait(p,1300); await p.mouse.wheel(0,-500); await wait(p,700);
    await p.getByRole('button',{name:'Mei',exact:true}).tap(); await wait(p,1500);
    await p.getByRole('button',{name:'Add your moment'}).first().tap(); await wait(p,1200);
    await p.getByText('Send an emoji').tap(); await wait(p,1200);
    await p.evaluate(()=>{const bs=[...document.querySelectorAll('button')].filter(b=>b.innerText.trim()==='🫶');bs[bs.length-1].click()}); await wait(p,4500); } },
  clock: { url:'http://127.0.0.1:5403/', vp:[1280,800], run: async p => {
    await wait(p,1500); await click(p, p.getByRole('button',{name:'Start'}), 7000); await p.keyboard.press('Space'); await wait(p,1400); await p.keyboard.press('r'); await wait(p,1500); } },
};
const b = await chromium.launch({ ...(process.env.CHROME?{executablePath:process.env.CHROME}:{}) });
for (const [name, j] of Object.entries(jobs)) {
  if (only.length && !only.includes(name)) continue;
  const dir = S+'/vid-'+name; rmSync(dir,{recursive:true,force:true}); mkdirSync(dir,{recursive:true});
  const [w,h]=j.vp; const scale = 1;
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor: j.mobile?2:1, isMobile:!!j.mobile, hasTouch:!!j.mobile, recordVideo:{dir,size:{width:w*scale,height:h*scale}} });
  await ctx.addInitScript(CURSOR);
  await ctx.addInitScript("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='[data-sonner-toaster],[data-sonner-toast],section[aria-label*=\"otification\"]{display:none!important}';document.head.appendChild(s)})");
  const p = await ctx.newPage();
  try { await p.goto(j.url,{waitUntil:'load',timeout:90000}); await j.run(p); } catch(e){ console.log('ERR',name,String(e).slice(0,160)); }
  await ctx.close();
  const webm = dir+'/'+readdirSync(dir).find(f=>f.endsWith('.webm'));
  const mp4 = OUT+name+'.mp4';
  execFileSync(FFMPEG,['-y','-loglevel','error','-ss','1.0','-i',webm,'-an','-c:v','libx264','-preset','slow','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart','-vf', j.mobile?'scale=390:-2':'scale=1280:-2', mp4]);
  execFileSync(FFMPEG,['-y','-loglevel','error','-ss','1.2','-i',mp4,'-frames:v','1','-q:v','4',OUT+name+'-poster.jpg']);
  console.log('ok',name);
}
await b.close();
