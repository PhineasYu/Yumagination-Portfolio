#!/usr/bin/env node
/**
 * Turn folders of photographs into the Gallery page.
 *
 *   assets/gallery/originals/<room-name>/*.jpg|png|webp      <- put your photos here
 *   assets/gallery/originals/<room-name>/room.json           <- optional: {"title":{"en":"…","zh":"…"},"note":{"en":"…","zh":"…"}}
 *   assets/gallery/originals/<room-name>/captions.json       <- optional: {"file-name.jpg":{"title":{"en":"…","zh":"…"},"place":"Stockholm","year":"2024"}}
 *
 *   npm i -D sharp      (once)
 *   node scripts/add-photos.mjs
 *
 * Writes WebP copies, small so the site stays light: tiny/ (360px, the canvas when zoomed out), small/ (720px, the canvas
 * up close) and full/ (1800px, only loaded when a photograph is opened), plus a 12 x 8 colour sample per photograph
 * for the pixel window on the home page (so the home page downloads no photographs at all). Regenerates
 * assets/js/gallery-data.js (keeps your hand-edited kicker/title/statement). Photographs already processed are skipped,
 * so adding a few more later is quick; delete assets/gallery/{tiny,small,full} to redo everything.
 * Photos sort by file name inside a room; rooms sort by folder name (prefix with 01-, 02- to order).
 * iPhone HEIC files: export as JPG first. Strips GPS/EXIF: only the resized copies are published.
 */
import { readdirSync, statSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = "assets/gallery", SRC = join(ROOT, "originals"), FULL = join(ROOT, "full"), SMALL = join(ROOT, "small"), TINY = join(ROOT, "tiny");
if (!existsSync(SRC)) { console.error(`Put photos in ${SRC}/<room-name>/ first.`); process.exit(1); }
mkdirSync(FULL, { recursive: true }); mkdirSync(SMALL, { recursive: true }); mkdirSync(TINY, { recursive: true });
const fresh = (out, src) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
const webp = (img, px, q, out) => img.clone().resize({ width: px, height: px, fit: "inside", withoutEnlargement: true }).webp({ quality: q, effort: 6 }).toFile(out);

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "") || "photo";
const readJson = (p, d) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return d; } };
const CAMERA = /^(IMG|DSC|DSCF|DSCN|PXL|_MG|P\d{3}|KAPI_FUJI)[_ -]?\w*\d+/i;   // camera file names (IMG_5368) get no title
const pretty = (name) => ({ en: name.replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim(), zh: name.replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim() });

/* the main colour of a photograph: the strongest saturated hue (24 bins of 15°), or null for black-and-white and greys */
async function mainColour(file) {
  const d = await sharp(file).resize(48, 48, { fit: "fill" }).removeAlpha().raw().toBuffer();
  const bins = new Array(24).fill(0), rgb = Array.from({ length: 24 }, () => [0, 0, 0, 0]); let total = 0;
  for (let i = 0; i < d.length; i += 3) {
    const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), c = mx - mn;
    if (mx < .12 || c < .045) continue;
    const h = (c === 0 ? 0 : mx === r ? ((g - b) / c) % 6 : mx === g ? (b - r) / c + 2 : (r - g) / c + 4) * 60, k = Math.floor(((h + 360) % 360) / 15);
    const w = Math.sqrt(c); bins[k] += w; total += w; const q = rgb[k]; q[0] += d[i] * w; q[1] += d[i + 1] * w; q[2] += d[i + 2] * w; q[3] += w;
  }
  if (total / (d.length / 3) < .14) return { hue: null, tone: null };
  let best = 0; for (let k = 1; k < 24; k++) if (bins[(k + 23) % 24] + bins[k] * 2 + bins[(k + 1) % 24] > bins[(best + 23) % 24] + bins[best] * 2 + bins[(best + 1) % 24]) best = k;
  let sx = 0, sy = 0; for (const k of [best + 23, best, best + 1]) { const w = bins[k % 24], a = ((k % 24) * 15 + 7.5) * Math.PI / 180; sx += Math.cos(a) * w; sy += Math.sin(a) * w; }
  const q = rgb[best], hex = "#" + [0, 1, 2].map((j) => Math.round(q[j] / q[3]).toString(16).padStart(2, "0")).join("");
  return { hue: Math.round(((Math.atan2(sy, sx) * 180 / Math.PI) + 360) % 360), tone: hex };
}

const series = [];
for (const room of readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory()).sort()) {
  const dir = join(SRC, room);
  const meta = readJson(join(dir, "room.json"), {});
  const caps = readJson(join(dir, "captions.json"), {});
  const photos = [];
  for (const f of readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
    const id = slug(room + "-" + basename(f, extname(f)));
    const src = join(dir, f), out = (d) => join(d, id + ".webp");
    if (![FULL, SMALL, TINY].every((d) => fresh(out(d), src))) {
      const img = sharp(src).rotate();                   // honour EXIF orientation; metadata (GPS, camera) is not copied
      await webp(img, 1800, 80, out(FULL)); await webp(img, 720, 74, out(SMALL)); await webp(img, 360, 68, out(TINY));
      console.log("  +", room, f);
    }
    const { width: w, height: h } = await sharp(out(FULL)).metadata();
    const px = (await sharp(out(TINY)).resize(12, 8, { fit: "fill" }).removeAlpha().raw().toBuffer()).toString("base64");
    const { hue, tone } = await mainColour(out(TINY));
    const c = caps[f] || {};
    photos.push({ file: `assets/gallery/full/${id}.webp`, small: `assets/gallery/small/${id}.webp`, tiny: `assets/gallery/tiny/${id}.webp`, w, h, px, hue, tone, title: c.title || (CAMERA.test(f) ? { en: "", zh: "" } : pretty(basename(f, extname(f)))), place: c.place || "", year: c.year || "" });
  }
  if (photos.length) series.push({ id: slug(room), title: meta.title || pretty(room), note: meta.note || { en: "", zh: "" }, photos });
}

// keep hand-edited header fields from the existing data file
let head = { kicker: { en: "Side project", zh: "个人项目" }, title: { en: "Gallery", zh: "摄影" }, statement: { en: "", zh: "" } };
try { const w = {}; new Function("window", readFileSync("assets/js/gallery-data.js", "utf8"))(w); head = { kicker: w.GALLERY.kicker, title: w.GALLERY.title, statement: w.GALLERY.statement }; } catch {}
const out = `/* GENERATED by scripts/add-photos.mjs — edit kicker/title/statement freely; the rest is rewritten on each run. */\nwindow.GALLERY = ${JSON.stringify({ ...head, series }, null, 2)};\n`;
writeFileSync("assets/js/gallery-data.js", out);
console.log(`Done: ${series.length} rooms, ${series.reduce((n, s) => n + s.photos.length, 0)} photographs.`);
