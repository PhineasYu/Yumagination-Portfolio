/* Generative cover art, one motif per project, drawn from that project's own
   design language. Used when a project has no real screenshot yet. */
(function () {
  const S = (inner, bg) =>
    `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><rect width="400" height="250" fill="${bg}"/>${inner}</svg>`;

  const C = {
    canvas: () => {
      const n = [[70,60],[150,110],[110,180],[240,70],[290,150],[330,80],[200,200],[60,130],[350,200]];
      const lines = [[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[2,6],[0,7],[7,2],[5,8],[4,8]]
        .map(([a,b]) => `<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}" stroke="#7a86ff" stroke-opacity=".5"/>`).join("");
      const dots = n.map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="${i%3===0?9:5}" fill="${['#4b8bf5','#7b5cf0','#1fb8b0','#3fbf6a'][i%4]}"/>`).join("");
      return S(lines + dots, "#f4f6fb");
    },
    dossier: () => S(
      `<line x1="200" y1="20" x2="200" y2="230" stroke="#f7f7f5" stroke-width="2"/>` +
      [40,95,150,200].map((y,i)=>{const l=i%2===0;const x=l?60:210;return `<rect x="${x}" y="${y-18}" width="130" height="38" fill="#fbfbfa" stroke="#1d2a36"/><rect x="${x+10}" y="${y-8}" width="${60+i*10}" height="5" fill="#1d2a36"/><rect x="${x+10}" y="${y+4}" width="${90-i*8}" height="4" fill="#9fb0c0"/><circle cx="200" cy="${y}" r="4" fill="#1d2a36"/>`}).join(""),
      "#a9b9c8"),
    sushi: () => S(
      `<text x="200" y="145" text-anchor="middle" direction="rtl" font-family="Tajawal, 'Noto Naskh Arabic', serif" font-weight="800" font-size="54" fill="#8b1d1d">سوشي جرش</text>` +
      `<circle cx="200" cy="190" r="6" fill="#8b1d1d"/><rect x="24" y="24" width="352" height="202" fill="none" stroke="#8b1d1d" stroke-width="1.5"/>`, "#f1e4cc"),
    seven: () => {
      const cells = [[30,30,110,80],[150,30,110,80],[270,30,100,80],[30,120,80,100],[120,120,80,100],[210,120,80,100],[300,120,70,100]];
      return S(cells.map(([x,y,w,h],i)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${i===3?'#6e5bd8':'none'}" stroke="#4a3fba" stroke-width="1.5"/><text x="${x+8}" y="${y+18}" font-family="monospace" font-size="10" fill="${i===3?'#f0edff':'#4a3fba'}">0${i+1}</text>`).join(""), "#f0edff");
    },
    cards: () => S(
      `<g transform="rotate(-8 150 130)"><rect x="70" y="50" width="130" height="160" rx="10" fill="#e8ecef"/></g>` +
      `<g transform="rotate(6 250 130)"><rect x="200" y="40" width="130" height="170" rx="10" fill="#c8f135" stroke="#1a2026" stroke-width="2"/><rect x="220" y="60" width="40" height="40" fill="#1a2026"/><rect x="220" y="120" width="90" height="6" fill="#1a2026"/><rect x="220" y="136" width="70" height="6" fill="#1a2026"/><rect x="220" y="172" width="90" height="16" fill="#1a2026"/></g>`, "#4f5b64"),
    chain: () => S(
      [40,140,240].map((x,i)=>`<rect x="${x}" y="${95}" width="110" height="60" fill="none" stroke="#f2efe8" stroke-width="1.5"/><text x="${x+10}" y="${120}" font-family="monospace" font-size="10" fill="#ff8a5c">${['ORIGINAL','DERIVED','DERIVED'][i]}</text><text x="${x+10}" y="${142}" font-family="monospace" font-size="9" fill="#a9a59b">${['9f3a…c1e0','b27d…44aa','e01c…7f52'][i]}</text>${i<2?`<line x1="${x+110}" y1="125" x2="${x+130}" y2="125" stroke="#ff4f1f" stroke-width="2"/>`:''}`).join(""), "#141414"),
    scope: () => S(
      `<g stroke="#f2efe8" fill="none"><circle cx="200" cy="125" r="100"/><circle cx="200" cy="125" r="70" stroke-opacity=".7"/><circle cx="200" cy="125" r="40" stroke-opacity=".5"/></g><circle cx="200" cy="125" r="9" fill="#ff5c1a"/><line x1="200" y1="10" x2="200" y2="240" stroke="#f2efe8" stroke-opacity=".25"/><line x1="70" y1="125" x2="330" y2="125" stroke="#f2efe8" stroke-opacity=".25"/>`, "#0a0a0a"),
    bars: () => S(
      [40,90,140,190,240,290].map((x,i)=>{const h=[80,120,60,150,100,170][i];return `<rect x="${x}" y="${220-h}" width="36" height="${h}" fill="${i===3?'#0a6ed1':'#c9d3de'}"/>`}).join("") +
      `<line x1="30" y1="220" x2="370" y2="220" stroke="#111"/><text x="30" y="30" font-family="monospace" font-size="11" fill="#111">SUPPLY CHAIN CONTROL TOWER</text>`, "#f5f7fa"),
    squares: () => S(
      `<rect x="70" y="75" width="260" height="130" fill="#fff" stroke="#000" stroke-width="3"/><rect x="70" y="75" width="130" height="130" fill="#000"/><line x1="200" y1="75" x2="200" y2="205" stroke="#000" stroke-width="3"/>`, "#fff"),
    chroma: () => {
      const cols = ["#bfe8c4","#ffe2a3","#ffb7b0","#b9d6ff","#dcdad3"];
      let out = "";
      for (let r = 0; r < 7; r++) {
        let x = 50;
        while (x < 340) {
          const w = 40 + ((r * 37 + x * 13) % 70);
          const c = cols[(r * 3 + Math.floor(x / 50)) % 5];
          out += `<rect x="${x}" y="${34 + r * 26}" width="${Math.min(w, 350 - x)}" height="20" rx="3" fill="${c}"/><rect x="${x + 3}" y="${41 + r * 26}" width="${Math.min(w, 350 - x) - 6}" height="5" fill="#26241f"/>`;
          x += w + 6;
        }
      }
      return S(out, "#fbf8f1");
    },
    flow: () => S(
      [50,140,230,320].map((x,i)=>`<circle cx="${x}" cy="125" r="24" fill="${i===2?'#111':'none'}" stroke="#111" stroke-width="2"/><text x="${x}" y="129" text-anchor="middle" font-family="monospace" font-size="11" fill="${i===2?'#fff':'#111'}">${i+1}</text>${i<3?`<line x1="${x+24}" y1="125" x2="${x+66}" y2="125" stroke="#111" stroke-width="2"/>`:''}`).join("") +
      `<text x="200" y="200" text-anchor="middle" font-family="monospace" font-size="10" fill="#555">UNLOCK · WEAR · RIDE · RETURN</text>`, "#e8f1ec"),
    table: () => S(
      [0,1,2,3,4].map(i=>`<rect x="40" y="${50+i*34}" width="320" height="28" fill="none" stroke="#c7c2b4"/><rect x="50" y="${60+i*34}" width="${90+i*14}" height="8" fill="#111"/><rect x="${290}" y="${57+i*34}" width="56" height="14" fill="${['#d5f0dc','#ffe6b3','#d8e5ff','#ffd0d0','#e7e7e7'][i]}" stroke="#111" stroke-width=".7"/>`).join("") +
      `<rect x="40" y="26" width="320" height="18" fill="#111"/>`, "#f6f5f1")
  };

  window.coverSVG = (key) => (C[key] || C.squares)();
})();
