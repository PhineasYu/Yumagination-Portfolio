/* Animated illustrations. Each returns an <svg> string; keyframes live in style.css (.m-*).
   These are honest diagrams of a mechanism, always labelled "Illustration" on the page. */
(function () {
  const W = 800, H = 500;
  const svg = (inner, cls = "") => `<svg class="mo ${cls}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${inner}</svg>`;
  const T = (x, y, s, txt, cls = "", anchor = "start") => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="${anchor}" class="mt ${cls}">${txt}</text>`;

  const M = {
    "dossier-dump": () => {
      const chips = [
        ["Leo tried mango", 172, "a", "0s"], ["lips a bit swollen", 216, "a", "0.55s"], ["said hi to a new kid", 260, "a", "1.1s"],
        ["Mia is 112 cm", 370, "b", "1.65s"], ["wants to be an astronaut", 412, "b", "2.2s"]
      ];
      const lane = (y, h, c, name) => `<rect x="470" y="${y}" width="290" height="${h}" fill="${c}" fill-opacity=".07" stroke="${c}" stroke-opacity=".45"/>` + T(486, y + 24, 12, name, "mt-mono");
      return svg(
        `<circle class="m-pulse" cx="110" cy="250" r="34" fill="var(--tf)"/><rect x="102" y="232" width="16" height="26" rx="8" fill="var(--wash)"/>` +
        [0, 1, 2, 3].map(i => `<rect class="m-eq" style="animation-delay:${i * .15}s" x="${74 + i * 20}" y="292" width="6" height="22" fill="var(--tf-deep)"/>`).join("") +
        T(110, 352, 12, "VOICE MEMO · 45s", "mt-mono", "middle") +
        lane(110, 175, "#0ABAB5", "LEO · MEMORY CARDS + PROFILE") + lane(305, 130, "#5d6868", "MIA · TIMELINE + PROFILE") +
        chips.map(([t, y1, k, d]) => `<g class="m-fly" style="--dx:${330}px;--dy:${y1 - 250}px;animation-delay:${d}"><rect x="170" y="234" width="${t.length * 7.6 + 24}" height="32" fill="${k === "a" ? "#0ABAB5" : "#5d6868"}"/>${T(182, 255, 14, t, "mt-chip")}</g>`).join(""), "m-dossier");
    },
    "dossier-theme": () => {
      const ui = (c, name, cls) => `<g class="${cls}"><rect x="220" y="60" width="360" height="380" fill="#fff" stroke="${c}" stroke-width="2"/><rect x="220" y="60" width="360" height="56" fill="${c}"/><circle cx="252" cy="88" r="14" fill="#fff"/>` + T(280, 94, 17, name, "mt-w") + [0, 1, 2, 3].map(i => `<rect x="244" y="${146 + i * 66}" width="312" height="48" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-opacity=".5"/><rect x="258" y="${162 + i * 66}" width="${150 - i * 14}" height="8" fill="${c}"/><rect x="258" y="${176 + i * 66}" width="${210 - i * 20}" height="6" fill="${c}" fill-opacity=".45"/>`).join("") + `</g>`;
      return svg(ui("#0ABAB5", "Leo", "m-swap-a") + ui("#5d6868", "Mia", "m-swap-b"), "m-theme");
    },
    "sushi-flow": () => {
      const nodes = [["Customer", "phone"], ["Site", "RTL · Arabic"], ["Supabase", "orders"], ["Telegram", "bot alert"], ["Owner", "confirms by phone"]];
      const xs = [90, 260, 430, 600, 730];
      return svg(
        `<line x1="90" y1="250" x2="730" y2="250" stroke="var(--tf)" stroke-opacity=".3" stroke-width="2"/>` +
        nodes.map(([a, b], i) => `<g class="m-node" style="animation-delay:${i * 1.1}s"><circle cx="${xs[i]}" cy="250" r="34" fill="var(--wash)" stroke="var(--tf-deep)" stroke-width="2"/>${T(xs[i], 256, 20, i + 1, "mt-strong", "middle")}${T(xs[i], 316, 15, a, "mt-strong", "middle")}${T(xs[i], 336, 12, b, "mt-mono", "middle")}</g>`).join("") +
        `<circle class="m-travel" cx="90" cy="250" r="9" fill="var(--sun)"/>` +
        `<g class="m-ping" style="animation-delay:3.3s"><rect x="520" y="130" width="160" height="50" fill="var(--tf-deep)"/>${T(600, 162, 22, "طلب جديد", "mt-w mt-ar", "middle")}<path d="M590 180 l10 14 l10 -14z" fill="var(--tf-deep)"/></g>` +
        T(400, 440, 13, "CASH ON DELIVERY · OWNER CONFIRMS EVERY ORDER", "mt-mono", "middle"), "m-flow");
    },
    "sushi-fees": () => {
      const st = [["Area A", "2.0", "31.5"], ["Area B", "3.0", "32.5"], ["Area C", "1.5", "31.0"]];
      return svg(
        `<rect x="200" y="70" width="400" height="360" fill="#fff" stroke="var(--tf-deep)"/>` + T(230, 110, 14, "AREA", "mt-mono") + `<rect x="230" y="122" width="340" height="44" fill="none" stroke="var(--tf-deep)"/>` +
        st.map(([a, f, t], i) => `<g class="m-cycle m-cycle-${i}">${T(246, 151, 18, a, "mt-strong")}${T(230, 226, 15, "Delivery", "mt-muted")}${T(570, 226, 20, f, "mt-strong", "end")}${T(230, 262, 15, "Items", "mt-muted")}${T(570, 262, 20, "29.5", "mt-strong", "end")}<line x1="230" y1="286" x2="570" y2="286" stroke="var(--tf-deep)" stroke-opacity=".3"/>${T(230, 326, 16, "Total", "mt-strong")}${T(570, 330, 30, t, "mt-strong m-total", "end")}<rect x="230" y="366" width="340" height="40" fill="var(--sun)"/>${T(400, 392, 16, "Snapshot saved with the order", "mt-strong", "middle")}</g>`).join(""), "m-fees");
    },
    "funnel": () => {
      const rows = [["9", "interviews", "two cases", 560], ["5", "tensions", "from two-layer coding", 420], ["4", "principles", "distilled", 300], ["1", "canvas", "seven components", 200]];
      return svg(rows.map(([n, a, b, w], i) => `<g class="m-rise" style="animation-delay:${i * .9}s"><rect x="${400 - w / 2}" y="${60 + i * 96}" width="${w}" height="78" fill="${["var(--tf-light)", "var(--tf)", "var(--tf-deep)", "var(--ink)"][i]}" fill-opacity="${i < 1 ? .55 : .95}"/>${T(400 - w / 2 + 22, 116 + i * 96, 44, n, i < 1 ? "mt-strong" : "mt-w")}${T(400 - w / 2 + 84, 104 + i * 96, 20, a, i < 1 ? "mt-strong" : "mt-w")}${T(400 - w / 2 + 84, 128 + i * 96, 13, b, i < 1 ? "mt-mono" : "mt-mono mt-w")}</g>`).join("") +
        [0, 1, 2, 3, 4, 5, 6].map(i => `<rect class="m-rise" style="animation-delay:${4 + i * .12}s" x="${572 + (i % 4) * 36}" y="${348 + Math.floor(i / 4) * 36}" width="28" height="28" fill="var(--sun)"/>`).join(""), "m-funnel");
    },
    "chain": () => {
      const blocks = [["ORIGINAL", "9f3a…c1e0", 60], ["DERIVED · restored", "b27d…44aa", 300], ["DERIVED · colourised", "e01c…7f52", 540]];
      return svg(blocks.map(([a, h, x], i) => `<g class="m-rise" style="animation-delay:${i * 1.1}s"><rect x="${x}" y="170" width="200" height="130" fill="var(--ink)"/>${T(x + 16, 204, 14, a, "mt-mono mt-sun")}${T(x + 16, 236, 18, "sha256", "mt-w")}${T(x + 16, 262, 15, h, "mt-mono mt-w")}${T(x + 16, 286, 12, "signed · anchored", "mt-mono mt-w mt-dim")}</g>${i < 2 ? `<line class="m-draw" style="animation-delay:${i * 1.1 + .6}s" x1="${x + 200}" y1="235" x2="${x + 240}" y2="235" stroke="var(--sun)" stroke-width="3"/>` : ""}`).join("") +
        `<g class="m-badge"><rect x="300" y="330" width="200" height="44" fill="none" stroke="var(--tf-deep)" stroke-dasharray="6 4"/>${T(400, 358, 15, "AI reading · pending", "mt-strong", "middle")}</g><g class="m-badge2"><rect x="300" y="330" width="200" height="44" fill="var(--tf-deep)"/>${T(400, 358, 15, "accepted by a person", "mt-w", "middle")}</g>` +
        T(400, 110, 13, "THE CONTRACT REJECTS A SECOND WRITE · THE CHAIN CAN ONLY GROW", "mt-mono", "middle"), "m-chain");
    },
    "tower": () => {
      const bars = [110, 170, 90, 210, 140, 190];
      return svg(
        ["All", "DACH", "Nordic", "UK", "Asia"].map((r, i) => `<g class="m-tab" style="animation-delay:${i * 1.2}s"><rect x="${80 + i * 96}" y="60" width="86" height="34" fill="none" stroke="var(--tf-deep)"/>${T(123 + i * 96, 83, 14, r, "mt-strong", "middle")}</g>`).join("") +
        `<line x1="80" y1="400" x2="720" y2="400" stroke="var(--ink)"/>` +
        bars.map((h, i) => `<rect class="m-bar" style="animation-delay:${i * .35}s;--h:${h}px" x="${110 + i * 100}" y="${400 - h}" width="56" height="${h}" fill="${i === 3 ? "var(--tf)" : "var(--tf-light)"}"/>`).join("") +
        `<g class="m-alert"><rect x="470" y="110" width="220" height="60" fill="#fff" stroke="var(--sun)" stroke-width="2"/>${T(486, 136, 14, "Stock-out risk · SKU 2041", "mt-strong")}${T(486, 156, 12, "Approve all", "mt-mono mt-violet")}</g>` +
        T(80, 440, 12, "ILLUSTRATION · DEMO DATA IS FICTIONAL", "mt-mono"), "m-tower");
    },
    "voi-flow": () => {
      const st = [["Unlock", "1"], ["Wear", "2"], ["Ride", "3"], ["Return", "4"]];
      return svg(
        `<line x1="120" y1="250" x2="680" y2="250" stroke="var(--tf)" stroke-opacity=".3" stroke-width="2"/>` +
        st.map(([a, n], i) => `<g class="m-node" style="animation-delay:${i * 1.2}s"><circle cx="${120 + i * 187}" cy="250" r="40" fill="var(--wash)" stroke="var(--tf-deep)" stroke-width="2"/>${T(120 + i * 187, 258, 24, n, "mt-strong", "middle")}${T(120 + i * 187, 326, 17, a, "mt-strong", "middle")}</g>`).join("") +
        `<rect class="m-scooter" x="100" y="196" width="40" height="16" fill="var(--sun)"/>` +
        T(400, 440, 13, "UNLOCK SEQUENCING · WEAR CONFIRMATION · RETURN DETECTION", "mt-mono", "middle"), "m-voi");
    },
    "breakpoints": () => {
      const v = [["Mobile", 150, 260, "small share"], ["Tablet", 260, 260, ""], ["Desktop", 470, 260, "primary, desktop-first"]];
      return svg(
        v.map(([n, w, h], i) => `<g class="m-vp m-vp-${i}"><rect x="${400 - w / 2}" y="${250 - h / 2}" width="${w}" height="${h}" fill="#fff" stroke="var(--tf-deep)" stroke-width="2"/><rect x="${400 - w / 2}" y="${250 - h / 2}" width="${w}" height="24" fill="var(--tf-deep)"/>` + [0, 1, 2].map(k => `<rect x="${400 - w / 2 + 14}" y="${250 - h / 2 + 46 + k * 50}" width="${w - 28 - k * 20}" height="30" fill="var(--tf)" fill-opacity="${.15 + k * .1}"/>`).join("") + T(400, 250 + h / 2 + 34, 16, n, "mt-strong", "middle") + `</g>`).join("") +
        T(400, 60, 13, "BREAKPOINTS SET FROM 1,000+ REAL USERS' USAGE, NOT ASSUMPTION", "mt-mono", "middle"), "m-bp");
    }
  };

  window.motion = (id) => (M[id] || M["funnel"])();
})();
