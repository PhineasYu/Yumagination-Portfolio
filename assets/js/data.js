/* ------------------------------------------------------------------
   Portfolio content. Every project is one object; the site renders from it.
   Bilingual fields are { en, zh }. Anything marked `verify: true` came from
   notes rather than code/CV and should be confirmed before you send the link.
   Add a project = add an object here. Nothing else to touch.
------------------------------------------------------------------- */
window.PORTFOLIO = {
  person: {
    name: "Yunfei Yu",
    brand: "Yumagination",
    email: "phineasyu0812@gmail.com",
    linkedin: "https://www.linkedin.com/in/yunfeiyu/",
    github: "https://github.com/PhineasYu",
    location: { en: "Stockholm, Sweden", zh: "瑞典 · 斯德哥尔摩" },
    role: { en: "AI-native UX Engineer", zh: "AI 原生的 UX 工程师" },
    headline: {
      en: ["I turn ambiguous problems into working prototypes", "with AI I direct and verify."],
      zh: ["把模糊的问题，变成能点开的原型", "用我来定义、指挥、验证的 AI。"]
    },
    // hero: the headline's meaning, shorter (two lines under the name)
    tagline: {
      en: ["UX designer turned AI builder.", "I research the people, direct the agents, and test what we make."],
      zh: ["UX 设计师，转身成为 AI builder。", "我研究人，指挥 AI agent，并测试做出来的东西。"]
    },
    intro: {
      en: "UX designer, now AI-native. I frame the problem, write the spec, and direct AI coding agents to build it, then test it with real people. What I have built works with agents and workflows, structured output from speech and documents, answers that cite their sources, and a person reviewing whatever the model is unsure about. So far in 2026, this way of working has shipped a live restaurant site and more than ten working prototypes.",
      zh: "UX 设计师，现在是 AI 原生的。我负责定义问题、写 spec、指挥 AI 编程助手把它做出来，再拿去给真实的人测试。我做过的东西涉及 agent 与工作流、从语音和文档生成结构化输出、会标明出处的回答，以及由人来复核模型没把握的部分。2026 年，这套方式已经做出了一个真实上线的餐厅网站，以及十多个可运行的原型。"
    }
  },

  tools: ["Claude Code", "Lovable", "Figma", "Supabase", "Next.js", "TypeScript", "Tailwind", "ElevenLabs", "Telegram Bot API", "Chrome Extensions", "Netlify", "Vercel", "Git / PR workflow"],

  /* Company logos (assets/logos). `h` = display height in px, tuned so the marks look evenly sized.
     Only real logos from each organisation's own site or a public logo archive; never redrawn.
     Kodiak Hub, Stone Leap and Bitmagic publish light-on-dark versions only, so theirs are re-coloured to one dark tone. */
  logos: {
    unilever:  { name: "Unilever",   file: "unilever.svg",     h: 40, th: 34 },
    zzu:       { name: "Zhengzhou University", file: "zzu.png", h: 34, th: 44 },
    kth:       { name: "KTH Royal Institute of Technology", file: "kth.png", h: 52, th: 40 },
    kodiak:    { name: "Kodiak Hub", file: "kodiak.svg",       h: 26, th: 20 },
    revive:    { name: "Revive Retail", file: "revive.svg",    h: 26, th: 20 },
    voi:       { name: "Voi",        file: "voi.svg",          h: 26 },
    sap:       { name: "SAP",        file: "sap.svg",          h: 32 },
    capgemini: { name: "Capgemini",  file: "capgemini.svg",    h: 26 },
    ericsson:  { name: "Ericsson",   file: "ericsson.svg",     h: 38 },
    google:    { name: "Google",     file: "google.svg",       h: 30 },
    microsoft: { name: "Microsoft",  file: "microsoft.svg",    h: 26 },
    deloitte:  { name: "Deloitte",   file: "deloitte.svg",     h: 22 },
    uniplay:   { name: "Uniplay",    file: "uniplay.svg",      h: 26 },
    stoneleap: { name: "Stone Leap", file: "stoneleap.png",    h: 32 },
    bitmagic:  { name: "Bitmagic",   file: "bitmagic.png",     h: 22 },
    aris:      { name: "Aris Machina", file: "aris-machina.svg", h: 18 },
    accel:     { name: "Accel",      file: "accel.svg",        h: 30 },
    pwc:       { name: "PwC",        file: "pwc.svg",          h: 30 },
    nebius:    { name: "Nebius",     file: "nebius.svg",       h: 30 }
  },
  // order of the logo strip under the hero
  logoStrip: ["unilever", "kth", "zzu", "kodiak", "revive", "voi", "sap", "capgemini", "ericsson", "google", "microsoft", "deloitte", "uniplay", "stoneleap", "bitmagic", "aris", "accel", "pwc", "nebius"],

  /* Zones: every project has exactly one `zone` and any number of `tags`. */
  cats: [
    { id: "all", en: "All", zh: "全部" },
    { id: "ux", en: "UX & UI Design", zh: "用户体验与界面设计" },
    { id: "service", en: "Service Design & Research", zh: "服务设计与研究" },
    { id: "ai", en: "AI Products", zh: "AI 产品" },
    { id: "build", en: "Build, Automate & Ship", zh: "开发、自动化与上线" },
    { id: "games", en: "Games & Interactive", zh: "游戏与互动体验" }
  ],

  tags: [
    { id: "hackathon", en: "Hackathon", zh: "黑客松" },
    { id: "award", en: "Award", zh: "获奖" },
    { id: "internship", en: "Internship", zh: "实习" },
    { id: "real-users", en: "Real users", zh: "真实用户" },
    { id: "built-with-ai", en: "Built with AI", zh: "用 AI 构建" },
    { id: "automation", en: "Automation & Agents", zh: "自动化与 Agent" },
    { id: "data-viz", en: "Data visualisation", zh: "数据可视化" }
  ],

  /* NOT RENDERED (hidden 2026-09-30). The "Smaller builds & experiments" section
     is no longer shown; the data stays here so it can come back: add
     ${moreBlock()} to home() in app.js after the work section. Hidden entries
     are listed in docs/PARKING.md. Longevity moved to projects.js. */
  more: {
    title: { en: "Smaller builds & experiments", zh: "更小的作品与实验" },
    items: [
      { name: "Chronicool", year: "2026", note: { en: "A Rick & Morty habit tracker. The brief was literally 'improve the prompts first, then build'.", zh: "Rick & Morty 风格的习惯打卡。需求原文就是「先帮我改进提示词，再开始做」。" }, url: "https://chronicool-tracker.lovable.app" },
      { name: "Defense Countdown Clock", year: "2026", note: { en: "A minimal, precise 4-minute timer built for my own thesis defence. Space to start, R to reset.", zh: "为自己的论文答辩做的极简、精确 4 分钟倒计时。空格开始，R 重置。" }, url: "https://github.com/PhineasYu/defense-countdown-clock" },
      { name: "ADHD Stride", year: "2025", note: { en: "Early Lovable experiment: task steps as flows, focus timer, progress ring.", zh: "早期 Lovable 实验：把任务拆成步骤流，含专注计时和进度环。" }, url: "https://adhd-stride.lovable.app" },
      { name: "Personal Daily Grid", year: "2025", note: { en: "Early Lovable experiment: calendar, tasks and profile in one grid.", zh: "早期 Lovable 实验：把日历、任务和个人档案放进同一张网格。" }, url: "https://personal-daily-grid.lovable.app" }
    ]
  },

  awards: [
    { logo: "sap", year: "2026", title: { en: "SAP Career Ignite: 1st place", zh: "SAP Career Ignite：第一名" }, note: { en: "Case competition, round two, with Capgemini and Google", zh: "案例竞赛第二轮，合作方 Capgemini 与 Google" } },
    { logo: "aris", year: "2026", title: { en: "Aris & Friends Hackathon: 'Thinking outside of the box' prize", zh: "Aris & Friends 黑客松：「跳出框框思考」奖" }, note: { en: "4-hour build with Protos and Redpine, Stockholm", zh: "4 小时现场搭建，使用 Protos 与 Redpine，斯德哥尔摩" } },
    { logo: "deloitte", year: "2026", title: { en: "Deloitte Spark Hackathon: 3rd place", zh: "Deloitte Spark 黑客松：第三名" }, note: { en: "Planet-friendlier routing from open deforestation, biodiversity, soil and CO₂ data", zh: "基于森林砍伐、生物多样性、土壤污染与碳排放开放数据的更环保路线建议" } },
    { logo: "uniplay", year: "2026", title: { en: "Uniplay Hackathon: 1st place (Teamdex)", zh: "Uniplay 黑客松：一等奖（Teamdex）" }, note: { en: "An onboarding game where newcomers collect their colleagues", zh: "把入职做成「收集同事」的游戏" } },
    { logo: "stoneleap", year: "2026", title: { en: "Stone Leap Build-a-Game: 1st place (Let Me Die)", zh: "Stone Leap Build-a-Game：第一名（Let Me Die）" }, note: { en: "A playable game built in one evening with an AI world builder", zh: "用 AI world builder 一个晚上做出的可玩游戏" } },
    { logo: "bitmagic", year: "2026", title: { en: "BitMagic game hackathon: 2nd place (Disco Fever)", zh: "BitMagic 游戏黑客松：二等奖（Disco Fever）" }, note: { en: "A one-minute disco rhythm game, now playable online", zh: "一分钟的迪斯科节奏游戏，已在线可玩" }, verify: true },
    { logo: "accel", year: "2026", title: { en: "Accel AI Innovate Hackathon: Top 8 and a pitch slot (Dossier)", zh: "Accel AI Innovate 黑客松：Top 8 并获得路演机会（Dossier）" }, note: { en: "Hosted by KTH AI Society", zh: "KTH AI Society 主办" } },
    { year: "2022–23", title: { en: "Huayang Road community renewal: Excellent Proposal commendation", zh: "华阳路街道社区更新：优秀提案表彰" }, note: { en: "Community Viewfinder, Changning District, Shanghai", zh: "社区取景框，上海长宁区" } }
  ],

  method: {
    title: { en: "How I build with AI", zh: "我如何与 AI 一起做东西" },
    lede: {
      en: "AI can build almost anything now, so taste decides what is worth building.",
      zh: "现在 AI 几乎什么都能做出来，所以决定做什么、做成什么样的，是品味。"
    },
    lede2: {
      en: "My taste comes from my eye for design and from deep research into how people actually use things. It is what makes the AI products I direct easier and more comfortable to use. I don't hand-write production code; I own the parts that decide whether the thing is any good, and I say so up front.",
      zh: "我的品味来自我的审美，也来自我对用户体验的深入研究。它让我指挥出来的 AI 产品更易用、更舒服。我不手写生产级代码；我负责那些决定作品好不好的部分，并且一开始就说清楚。"
    },
    steps: [
      { n: "01", h: { en: "Frame", zh: "定义" }, p: { en: "Turn a vague brief into one person, one moment, one decision. Dossier's 90-second judge path and Collaboration Canvas's five tensions came from here.", zh: "把模糊的需求收窄成一个人、一个瞬间、一个决策。Dossier 的 90 秒路径、Collaboration Canvas 的五个张力都出自这里。" } },
      { n: "02", h: { en: "Spec", zh: "写 spec" }, p: { en: "Write it down before any code: PRD, non-goals, design tokens, data model. Teamdex has five spec documents; Beside has a build spec with every constraint stated.", zh: "动代码之前先写下来：PRD、非目标、设计 token、数据模型。Teamdex 有五份规格文档；Beside 有一份写清所有约束的开发规格。" } },
      { n: "03", h: { en: "Direct", zh: "指挥" }, p: { en: "Give the agent working rules, not wishes: local-first data, always deployable, P0 before P1, 'do not add anything I didn't ask for'.", zh: "给 AI 的是工作守则，不是愿望：本地优先、始终可部署、P0 先于 P1、「没让你加的不要加」。" } },
      { n: "04", h: { en: "Verify", zh: "验证" }, p: { en: "Real people and real loops. A real customer through Sushi Jerash's order-to-Telegram loop; think-aloud sessions at Kodiak; tests for hashing and signatures in LegacyChain.", zh: "真实的人、真实的闭环。Sushi Jerash 用真实顾客跑通下单到 Telegram 通知；Kodiak 做出声思考测试；LegacyChain 给哈希与签名写测试。" } }
    ],
    principlesTitle: { en: "Ideas that keep coming back", zh: "反复出现的想法" },
    principles: [
      { h: { en: "Show the reasoning", zh: "让推理看得见" }, p: { en: "Full Context Canvas gives every placement a reason and a confidence score.", zh: "Full Context Canvas 给每一次归位写明理由和把握度。" } },
      { h: { en: "AI is a reader, not the authority", zh: "AI 是读者，不是权威" }, p: { en: "In LegacyChain, AI output is 'pending' until a person accepts it.", zh: "在 LegacyChain 里，AI 的输出在人接受之前一直是「待确认」。" } },
      { h: { en: "Remove the pressure", zh: "拿掉压力" }, p: { en: "Beside has no reply obligation; Teamdex has no leaderboard.", zh: "Beside 没有回复义务；Teamdex 没有排行榜。" } },
      { h: { en: "One interaction carries the idea", zh: "一个交互承载整个想法" }, p: { en: "A voice dump for Dossier; keys 1–5 for Chroma Reader; one handover note for Collaboration Canvas.", zh: "Dossier 的语音倾倒；Chroma Reader 的 1–5 键；Collaboration Canvas 的一条交接记录。" } }
    ],
    disclosure: {
      en: "Disclosure: the code in every AI-native project here was generated by AI coding agents (Claude Code, Lovable). I did the framing, specs, design systems, direction, review and QA. Demo data is fictional unless a project says otherwise.",
      zh: "声明：这里每个 AI 原生项目的代码都由 AI 编程助手（Claude Code、Lovable）生成。问题定义、spec、设计系统、指挥、审阅与验收由我完成。除非项目另有说明，演示数据均为虚构。"
    }
  },

  /* The second half of the Method page: how I design services (design thinking + service design). */
  design: {
    title: { en: "How I design services", zh: "我如何做服务设计" },
    lede: {
      en: "A service is decided at the seams between people, teams and moments. I find where it breaks before I draw anything, then I design the seam.",
      zh: "一项服务的好坏，取决于人、团队和时刻之间的接缝。我在动手画之前，先找出它在哪里断，然后设计那道接缝。"
    },
    lede2: {
      en: "My method is design thinking with service design's tools: listen on every side, name the tensions, map the whole service, write principles, prototype, and say what was not tested.",
      zh: "我的方法是设计思维，加上服务设计的工具：在每一方都听、给张力起名、把整个服务画出来、写原则、做原型，并说清楚哪些没有测试过。"
    },
    steps: [
      { n: "01", h: { en: "Listen on every side", zh: "在每一方都听" }, p: { en: "A service has more than one user. I interview the people on each side of a seam. The thesis ran nine interviews across two cases and coded them in two layers; the Voi project added 37 street interviews and 47 survey responses.", zh: "一项服务不止一种用户。我采访接缝两边的人。论文在两个案例里做了九场访谈，并分两层编码；Voi 项目另有 37 场街头访谈和 47 份问卷。" } },
      { n: "02", h: { en: "Name the tensions", zh: "给张力起名" }, p: { en: "Cluster what people said until the same problem keeps coming back, then give it a name. The thesis ended with five systemic tensions. The Voi board sorted into problems, feelings, suggestions, usage and brand, and three problems rose to the top.", zh: "把人们说的话聚类，直到同一个问题反复出现，然后给它起名字。论文最后得到五个系统性张力。Voi 的画板分成问题、感受、建议、使用情况和品牌，有三个问题浮到最上面。" } },
      { n: "03", h: { en: "Map the whole service", zh: "把整个服务画出来" }, p: { en: "A blueprint puts every actor, stage and feeling on one page, with the line of interaction and the line of visibility drawn in. Teamdex's has four lanes, seven stages and an emotion curve, and the moments that matter are marked.", zh: "服务蓝图把每个角色、阶段和感受放在同一页，并画出交互线和可见线。Teamdex 的蓝图有四条泳道、七个阶段和一条情绪曲线，关键时刻都做了标记。" } },
      { n: "04", h: { en: "Turn tensions into principles", zh: "把张力变成原则" }, p: { en: "Write a few principles and make every feature answer one. The thesis distilled four from its tensions, and each of the Canvas's seven components was checked against them. Teamdex did it at hackathon speed: a game to give a reason to talk, and no leaderboard because it would create pressure.", zh: "写几条原则，让每个功能都回应其中一条。论文从张力里提炼出四条，画布的七个组件都对照它们检查过。Teamdex 在黑客松的速度里也这么做：用游戏给人开口的理由，不做排行榜，因为那会制造压力。" } },
      { n: "05", h: { en: "Prototype, test, be honest", zh: "做原型、测试、说实话" }, p: { en: "Prototype the seam, not the whole system. The Canvas was checked by a walkthrough against its principles, and real-world validation is the stated next step. At Kodiak I ran think-aloud sessions and changed the layout between rounds. I say what was tested and what was not.", zh: "原型做的是接缝，不是整个系统。画布是对照原则做了走查，真实场景的验证是明说的下一步。在 Kodiak，我做了出声思考测试，并在轮次之间调整布局。我会说清楚什么测试过，什么没有。" } }
    ],
    principlesTitle: { en: "Moves I keep making", zh: "反复用到的做法" },
    principles: [
      { h: { en: "Design the handover, not just the first visit", zh: "设计交接，而不只是第一次到访" }, p: { en: "In the thesis cases, collaboration collapsed when a contact person left. In the Canvas a new partner lands on the handover record, not on a dashboard.", zh: "在论文的案例里，联系人一离开，合作就垮了。在画布里，新来的伙伴落在交接记录上，而不是一个仪表盘。" } },
      { h: { en: "Make invisible work visible", zh: "让看不见的工作被看见" }, p: { en: "Coordination is usually unseen labour. In the log it is an entry everyone can read, and only the person it served sees 'On your behalf'.", zh: "协调通常是没人看见的劳动。在日志里它是人人可读的一条记录，只有被它服务的那个人会看到「代表你」。" } },
      { h: { en: "Give people a reason, not a rule", zh: "给人一个理由，而不是一条规定" }, p: { en: "Teamdex does not order colleagues to welcome newcomers. A game gives the newcomer a reason to walk up, and makes talking to newcomers part of a colleague's job.", zh: "Teamdex 没有要求同事欢迎新人。游戏给了新人走上前的理由，也让和新人聊天成为同事工作的一部分。" } },
      { h: { en: "Write the risk next to the intent", zh: "把风险写在意图旁边" }, p: { en: "Every stage of the Teamdex blueprint states its touchpoint, its design intent, and what could go wrong with the response.", zh: "Teamdex 蓝图的每个阶段，都写明触点、设计意图，以及可能出什么问题和对应的办法。" } }
    ],
    figure: { src: "demos/teamdex-blueprint/index.html", cap: { en: "The Teamdex service blueprint, running. Pick a role to focus on its lane; pick a stage to see its touchpoint, design intent and risk.", zh: "Teamdex 服务蓝图，可点击。选一个角色聚焦它的泳道；选一个阶段，看它的触点、设计意图和风险。" } },
    links: [
      { label: { en: "The thesis: Collaboration Canvas", zh: "论文：Collaboration Canvas" }, url: "#/work/collaboration-canvas" },
      { label: { en: "The game: Teamdex", zh: "游戏：Teamdex" }, url: "#/work/teamdex" }
    ],
    disclosure: {
      en: "The thesis was co-authored with Fangjing Fu, split by chapter; I wrote the prototype spec and accepted the build. Teamdex is a one-day hackathon build, so its blueprint is a design plan, not a measured result.",
      zh: "论文与 Fangjing Fu 合著，按章节分工；我写了原型 spec 并负责验收。Teamdex 是一天完成的黑客松作品，所以它的蓝图是设计方案，不是测出来的结果。"
    }
  },

  about: {
    title: { en: "About", zh: "关于我" },
    body: {
      en: [
        "I'm a UX designer, now AI-native: an AI-enhanced designer who frames the problem, writes the spec, directs coding agents to build it, and tests it with real people. What I bring on top is taste, and a habit of researching how people actually use things until the product feels easy.",
        "I come from packaging engineering, then moved into design: Unilever's R&D packaging lab in Shanghai, and now a master's in Integrated Product Design at KTH in Stockholm. That is why I can read a spec or a build log without flinching, and why I still enjoy making things you can hold, from Arduino devices to 3D-modelled hardware.",
        "I'm looking for junior roles where a short loop from ambiguous problem to demoable prototype is the job: AI engineer, design technologist, UX engineer, AI-native product designer."
      ],
      zh: [
        "我是一名 UX 设计师，现在是 AI 原生的：一个 AI 增强的设计师，负责定义问题、写 spec、指挥 AI 编程助手把它做出来，再拿去给真实的人测试。在此之上，我带来的是品味，以及把用户怎么真正使用东西研究透、直到产品用起来毫不费力的习惯。",
        "我出身包装工程，后来转向设计：在联合利华上海研发中心的包装实验室工作过，现在在斯德哥尔摩的 KTH 读集成产品设计硕士。所以我看 spec 和构建日志毫不发怵，也仍然喜欢做能拿在手里的东西，从 Arduino 设备到 3D 建模的硬件。",
        "我在找 junior 岗位：从模糊问题到可演示原型的短周期就是工作本身，例如 AI engineer、design technologist、UX engineer、AI 原生的产品设计师。"
      ]
    },
    timeline: [
      { logo: "revive", when: "2026", role: { en: "UX Intern", zh: "UX 实习生" }, org: { en: "Revive Retail · May–Aug", zh: "Revive Retail · 5–8 月" } },
      { logo: "kth", when: "2024–2026", role: { en: "MSc Integrated Product Design", zh: "集成产品设计硕士" }, org: { en: "KTH Royal Institute of Technology", zh: "KTH 皇家理工学院" } },
      { logo: "kodiak", when: "2025", role: { en: "UI/UX Design Intern", zh: "UI/UX 设计实习生" }, org: { en: "Kodiak Hub, Stockholm", zh: "Kodiak Hub，斯德哥尔摩" } },
      { logo: "unilever", when: "2022–2024", role: { en: "Packaging Laboratory Assistant", zh: "包装实验室助理" }, org: { en: "Unilever Global R&D Center, Shanghai", zh: "联合利华全球研发中心，上海" } },
      { logo: "zzu", when: "2017–2021", role: { en: "BEng Packaging Engineering", zh: "包装工程学士" }, org: { en: "Zhengzhou University", zh: "郑州大学" } }
    ],
    cv: { label: { en: "Download my CV", zh: "下载我的简历" }, file: "assets/Yunfei_Yu_CV.pdf" },
    languages: { en: "English (professional) · Chinese (native) · Swedish (learning)", zh: "英语（工作语言）· 中文（母语）· 瑞典语（学习中）" }
  },

  ui: {
    nav: { work: { en: "Work", zh: "作品" }, method: { en: "Method", zh: "方法" }, about: { en: "About", zh: "关于" }, contact: { en: "Contact", zh: "联系" } },
    selected: { en: "Selected work", zh: "精选作品" },
    all: { en: "Index", zh: "全部作品" },
    view: { en: "View", zh: "查看" },
    logosLbl: { en: "Worked, studied and competed with", zh: "一起工作、学习、参赛的机构" },
    orgs: { en: "Organisations", zh: "相关机构" },
    back: { en: "← All work", zh: "← 全部作品" },
    next: { en: "Next", zh: "下一个" },
    prev: { en: "Previous", zh: "上一个" },
    problem: { en: "The problem", zh: "问题" },
    built: { en: "What I made", zh: "我做了什么" },
    decisions: { en: "Decisions", zh: "关键决策" },
    ai: { en: "Where AI comes in", zh: "AI 在哪里" },
    role: { en: "Role", zh: "角色" },
    year: { en: "Year", zh: "年份" },
    status: { en: "Status", zh: "状态" },
    stack: { en: "Stack", zh: "技术栈" },
    links: { en: "Links", zh: "链接" },
    recognition: { en: "Awards & wins", zh: "获奖" },
    contactTitle: { en: "Let's build something.", zh: "一起做点什么。" },
    contactLede: { en: "Open to junior roles in Sweden and China. The fastest way to reach me is email.", zh: "接受瑞典与中国的 junior 岗位机会。最快的联系方式是邮件。" },
    draftNote: { en: "To confirm before sharing", zh: "分享前待确认" },
    footer: { en: "Designed and built with Claude Code.", zh: "由 Claude Code 协助设计与搭建。" },
    more: { en: "Smaller builds & experiments", zh: "更小的作品与实验" },
    ticker: { en: "Working with", zh: "常用工具" }
  }
};
