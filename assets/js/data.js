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
    role: { en: "UX Engineer · Design Technologist", zh: "UX 工程师 · Design Technologist" },
    headline: {
      en: ["I turn ambiguous problems into", "working prototypes", "with AI I direct and verify."],
      zh: ["把模糊的问题，变成", "能点开的原型", "用我来定义、指挥、验证的 AI。"]
    },
    intro: {
      en: "Product designer with an engineering background. I frame the problem, write the spec, set the design system, and direct AI coding agents to build it — then test it with real people. In 2026 I have used this method to ship a live restaurant site and ten-plus working prototypes.",
      zh: "工科背景的产品设计师。我负责定义问题、写 spec、定设计系统，指挥 AI 编程助手把它做出来，再拿去给真实的人测试。2026 年，我用这套方式做出了一个真实上线的餐厅网站，以及十多个可运行的原型。"
    }
  },

  tools: ["Claude Code", "Lovable", "Figma", "Supabase", "Next.js", "TypeScript", "Tailwind", "ElevenLabs", "Telegram Bot API", "Chrome Extensions", "Netlify", "Vercel", "Git / PR workflow"],

  cats: [
    { id: "all", en: "All", zh: "全部" },
    { id: "ai", en: "AI-native builds", zh: "AI 原生作品" },
    { id: "hack", en: "Hackathons", zh: "黑客松" },
    { id: "real", en: "Shipped for real", zh: "真实上线" },
    { id: "design", en: "Research & design", zh: "研究与设计" }
  ],

  projects: [
    {
      id: "full-context-canvas", num: "01", year: "2026", cats: ["ai", "design"],
      title: "Full Context Canvas",
      tag: { en: "Your AI remembers part of you. This shows it all, and why.", zh: "你的 AI 只记得你的一部分。这里让它记得全部，并说明为什么。" },
      role: { en: "Product, design, spec, QA", zh: "产品、设计、spec、验收" },
      status: { en: "Prototype + Chrome extension MVP", zh: "原型 + Chrome 插件 MVP" },
      cover: "canvas", shot: "assets/shots/fcc.png", featured: true,
      problem: {
        en: "Chats are scattered across Claude, ChatGPT and Gemini; saves across Chrome, YouTube, Reddit and X. Each AI only knows its own slice of you, and people won't hand their mess to an AI because they can't see where things went.",
        zh: "聊天记录散在 Claude、ChatGPT、Gemini，收藏散在 Chrome、YouTube、Reddit、X。每个 AI 只认识你的一小块；而人们不敢把整理交给 AI，因为看不见东西被放到了哪。"
      },
      built: {
        en: [
          "Interactive whiteboard: 41 sample items from 7 platforms auto-grouped into 6 overlapping groups. One item can live in several groups; the overlap is the insight.",
          "Click any card and a glowing line runs back to its original platform. Originals are never moved.",
          "Every placement carries a reason and a confidence score; anything under 60% goes to a review queue instead of being silently misfiled.",
          "Synthesis across platforms: write a résumé or find where interests meet, every sentence with a clickable source.",
          "Chrome extension MVP that reads all bookmarks, syncs live and groups with Claude; copy any group as Markdown context for any AI.",
          "Importers for Claude / ChatGPT conversations.json, Google Takeout and bookmark files; an 11-step guided tour; EN / 中文."
        ],
        zh: [
          "可交互白板：7 个平台的 41 条示例内容，自动分成 6 个互相重叠的组。一条内容可同时属于多个组，交集本身就是洞察。",
          "点任意卡片，一根发光的线连回原平台。原件从不被移动。",
          "每次归位都有理由和把握度；低于 60% 的进入待确认队列，而不是悄悄放错。",
          "跨平台综合：写简历、找兴趣交汇点，每句话都带可点击的出处。",
          "Chrome 插件 MVP：读取全部书签、实时同步、用 Claude 分组；任意一组可一键复制成 Markdown 上下文交给任何 AI。",
          "支持导入 Claude / ChatGPT 的 conversations.json、Google Takeout、书签文件；11 步演示导览；中英切换。"
        ]
      },
      decisions: {
        en: [
          "Explainability as the wedge. A competitor sweep (mymind, Raindrop, Notion/Obsidian, MemoryPlugin and others) showed everyone auto-tags; nobody shows why. That became the pitch.",
          "Never move the original. Organisation is an index laid on top, so trusting the AI costs nothing.",
          "Synthesis, not filing, is the product. Sorting is the means; the value is what you can now write or decide."
        ],
        zh: [
          "把「可解释」当作楔子。竞品调研（mymind、Raindrop、Notion/Obsidian、MemoryPlugin 等）显示大家都在自动打标签，没人说明为什么。这成了核心卖点。",
          "永远不搬动原件。整理只是叠在上面的一层索引，所以信任 AI 不需要成本。",
          "综合才是产品，不是归档。整理只是手段，价值是你之后能写出什么、决定什么。"
        ]
      },
      ai: {
        en: "Built with Claude Code across five days (24–28 Sep 2026). Opened on claude.ai or with an API key it calls real Claude; otherwise it runs a clearly labelled offline demo.",
        zh: "用 Claude Code 在五天内完成（2026 年 9 月 24–28 日）。在 claude.ai 或填入 API key 时调用真实 Claude，否则运行明确标注的离线演示。"
      },
      stack: ["HTML / JS", "Chrome MV3 extension", "Anthropic SDK"],
      facts: [["7", { en: "platforms", zh: "个平台" }], ["41", { en: "sample items", zh: "条示例内容" }], ["11", { en: "step guided tour", zh: "步演示导览" }], ["16", { en: "commits", zh: "次提交" }]],
      links: [
        { label: { en: "Open live prototype", zh: "打开可运行原型" }, url: "demos/full-context-canvas/index.html" },
        { label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/Full-context-canvas" }
      ]
    },

    {
      id: "dossier", num: "02", year: "2026", cats: ["ai", "hack"],
      title: "Dossier",
      tag: { en: "Say one thing. It becomes a child's lifelong story.", zh: "说一段话，就长出孩子一生的故事。" },
      role: { en: "Product, PRD, design direction, QA", zh: "产品、PRD、设计方向、验收" },
      status: { en: "Hackathon build, 8 roadmap milestones shipped", zh: "黑客松作品，8 个里程碑已完成" },
      cover: "dossier", shot: null, featured: true,
      problem: {
        en: "Parents remember the emotional moments and lose the structured facts (allergies, heights, documents), or the reverse. Two chores, one shoebox.",
        zh: "家长记得情感瞬间却丢了结构化信息（过敏、身高体重、文件），或者反过来。两件麻烦事，一个鞋盒。"
      },
      built: {
        en: [
          "Voice Brain Dump: a parent talks for 30–60 seconds; AI splits it into atomic items; each flies into the right child's lane. Memories become cards on a timeline, facts update the profile (the allergy row glows).",
          "One sentence about two kids becomes two cards. Undo instead of a confirm step, to keep the demo fast.",
          "Two children with their own theme colour; the whole UI recolours when you switch.",
          "Document archive: the original beside AI-extracted fields. Search across timeline and archive.",
          "Two-way voice check-in with live captions (ElevenLabs).",
          "A Polar-backed plans section and QR card, so the demo measures real interest, not just applause."
        ],
        zh: [
          "语音倾倒：家长说 30–60 秒，AI 拆成原子条目，每条飞进对应孩子的轨道。回忆变成时间线卡片，事实更新档案（过敏那一行会发光）。",
          "一句话提到两个孩子，会变成两张卡片。用撤销代替确认步骤，让演示更快。",
          "两个孩子各有主题色，切换头像整个界面随之换色。",
          "文件档案：原件与 AI 提取的字段并排显示。时间线与档案都可搜索。",
          "双向语音签到，带实时字幕（ElevenLabs）。",
          "接入 Polar 的订阅区与二维码卡片，让演示测到真实兴趣，而不只是掌声。"
        ]
      },
      decisions: {
        en: [
          "Pitch leads with emotion and shows the structured side briefly: the doorframe pencil marks are the height curve; the timeline is the other 90% of growing up.",
          "A hidden text input runs the exact same pipeline, as insurance if voice fails on stage. Feature freeze at 14:45, then rehearsal and a backup screen recording.",
          "The design system was rebuilt twice: warm palette, then Material 3, then a neutral 'tech-white' system with 1px frames and a segmented AI signature."
        ],
        zh: [
          "路演先讲情感，再简短展示结构化一面：门框上的铅笔痕是身高曲线，时间线是成长剩下的 90%。",
          "隐藏的文字输入框走完全相同的流程，作为语音在台上失败时的保险。14:45 功能冻结，之后只做排练和备份录屏。",
          "设计系统重做了两次：暖色调 → Material 3 → 中性的「tech-white」（1px 边框、分段式 AI 签名）。"
        ]
      },
      ai: {
        en: "Lovable for the first UI, then a hard handoff so two tools never edit one codebase. In the product: AI extraction into structured items, ElevenLabs for voice. 134 commits, each one an AI-implemented iteration.",
        zh: "先用 Lovable 做出第一版 UI，再完整交接，避免两个工具同时改一份代码。产品内：AI 把语音拆成结构化条目，ElevenLabs 负责语音。134 次提交，每一次都是 AI 实现的迭代。"
      },
      stack: ["TanStack Start", "React", "Supabase", "ElevenLabs", "Polar", "Material 3"],
      facts: [["134", { en: "iterations", zh: "次迭代" }], ["8", { en: "milestones", zh: "个里程碑" }], ["90s", { en: "judge walk-by path", zh: "评委路过路径" }]],
      links: [{ label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/Dossier" }],
      verify: { en: "Confirm the event name and result, and that no real child's data appears in screenshots.", zh: "需确认赛事名称/成绩，以及截图中没有真实孩子的信息。" }
    },

    {
      id: "sushi-jerash", num: "03", year: "2026", cats: ["ai", "real"],
      title: "Sushi Jerash",
      tag: { en: "A real restaurant's ordering site, live in about two days.", zh: "真实餐厅的点餐网站，两天左右上线。" },
      role: { en: "Spec, direction, Supabase, Telegram bot, deploy, QA", zh: "spec、指挥、Supabase、Telegram 机器人、部署、验收" },
      status: { en: "Live in production", zh: "已上线" },
      cover: "sushi", shot: null, featured: true,
      problem: {
        en: "The first sushi shop in Jerash, Jordan, took orders by phone. The owner needed something Arabic-first, cash-on-delivery, and manageable from a phone, with no ops burden.",
        zh: "约旦杰拉什第一家寿司店靠电话接单。老板需要阿拉伯语优先、货到付款、能用手机管理，并且没有运维负担的方案。"
      },
      built: {
        en: [
          "Arabic-only RTL ordering site; cash on delivery; the owner confirms every order by phone.",
          "Telegram bot notifies the owner with inline action buttons; WhatsApp deep link for customer self-confirmation.",
          "19 owner-editable delivery areas. Fee and area name are snapshotted onto each order so history never drifts when prices change.",
          "Admin with magic-link login and an email allowlist: orders, store open/closed, menu prices and availability, delivery areas."
        ],
        zh: [
          "纯阿拉伯语 RTL 点餐网站；货到付款；老板电话确认每一单。",
          "Telegram 机器人推送订单给老板，附内联操作按钮；顾客可通过 WhatsApp 链接自行确认。",
          "19 个老板可自行编辑的配送区域。订单会快照当时的运费和区域名，改价格也不会改动历史。",
          "管理后台：邮件白名单 + 魔法链接登录；订单、营业状态、菜单价格与上下架、配送区域。"
        ]
      },
      decisions: {
        en: [
          "Two spec iterations: v1.1 replaced a free-delivery threshold with per-area fees after the owner's feedback.",
          "Hard delete of delivery areas is intentionally disabled, so old orders always resolve.",
          "Platform call: migrated Vercel → Netlify after the owner's on-the-ground test showed reachability problems, then validated the full order-to-notification loop with a real customer."
        ],
        zh: [
          "spec 迭代了两版：根据老板反馈，v1.1 把「满额免运费」改成按区域计费。",
          "刻意禁用配送区域的硬删除，保证旧订单始终能追溯。",
          "平台决策：老板在当地实测后发现访问不稳定，于是从 Vercel 迁到 Netlify，并用真实顾客跑通了完整的下单到通知链路。"
        ]
      },
      ai: {
        en: "I translated the owner's constraints into a product spec and directed an AI coding agent to implement it. I handled Supabase, the Telegram bot, deployment and QA myself, through a PR-based workflow.",
        zh: "我把老板的约束翻译成产品 spec，指挥 AI 编程助手实现；Supabase、Telegram 机器人、部署与验收由我亲自完成，采用 PR 工作流。"
      },
      stack: ["Next.js 15", "TypeScript", "Tailwind (RTL)", "Supabase", "Zustand", "Telegram Bot API", "Netlify"],
      facts: [["~2", { en: "days to live", zh: "天上线" }], ["19", { en: "delivery areas", zh: "个配送区域" }], ["3", { en: "DB migrations", zh: "次数据库迁移" }]],
      links: [],
      verify: { en: "Add the live URL and 3–5 screenshots (menu, cart, checkout, Telegram message, admin). Repo is private.", zh: "需补充线上网址和 3–5 张截图（菜单、购物车、结账、Telegram 通知、后台）。仓库为私有。" }
    },

    {
      id: "collaboration-canvas", num: "04", year: "2026", cats: ["design", "ai"],
      title: "Collaboration Canvas",
      tag: { en: "Why student–industry–university projects break, and a shared canvas to hold them together.", zh: "为什么学生—企业—学校的合作会散架，以及一张让它们不散的共享画布。" },
      role: { en: "MSc thesis · research, service design, prototype", zh: "硕士论文 · 研究、服务设计、原型" },
      status: { en: "Defended, KTH 2026", zh: "已答辩，KTH 2026" },
      cover: "seven", shot: null, featured: false,
      problem: {
        en: "University-led innovation labs bring students, teachers and external partners together, and the collaboration keeps failing at the seams: mismatched goals, communication gaps, unclear roles.",
        zh: "由大学主导的创新实验室把学生、教师和外部伙伴放在一起，合作却总在接缝处出问题：目标错位、沟通断层、角色不清。"
      },
      built: {
        en: [
          "9 stakeholder interviews across two cases; two-layer coding surfaced five systemic tensions, distilled into four design principles.",
          "The Collaboration Canvas: a seven-component shared coordination layer, delivered as a role-switchable interactive prototype.",
          "Methodological claim: service design tools work as infrastructural devices, not only diagnostic instruments."
        ],
        zh: [
          "两个案例共 9 场利益相关者访谈；两层编码得出五个系统性张力，提炼成四条设计原则。",
          "Collaboration Canvas：由七个组件构成的共享协调层，做成可切换角色的交互原型。",
          "方法论主张：服务设计工具是「基础设施装置」，而不只是诊断工具。"
        ]
      },
      decisions: {
        en: ["Real-world validation is defined as the explicit next step, not claimed as done.", "AI use is disclosed in the methodology chapter: the prototype was spec-driven and AI-implemented."],
        zh: ["真实场景验证被明确定义为下一步，而不是声称已完成。", "AI 的使用在方法论章节中披露：原型由 spec 驱动、AI 实现。"]
      },
      ai: {
        en: "Prototype spec-driven and implemented by AI, with disclosure in the thesis. Research design, coding and synthesis are mine.",
        zh: "原型由 spec 驱动、AI 实现，并在论文中披露。研究设计、编码与归纳由我完成。"
      },
      stack: ["Interviews", "Thematic coding", "Service design", "Interactive prototype"],
      facts: [["9", { en: "interviews", zh: "场访谈" }], ["5", { en: "systemic tensions", zh: "个系统性张力" }], ["4", { en: "design principles", zh: "条设计原则" }], ["7", { en: "canvas components", zh: "个画布组件" }]],
      links: [],
      verify: { en: "Add the prototype link, 4–6 figures and the thesis PDF if you want it public.", zh: "如需公开，请补充原型链接、4–6 张图和论文 PDF。" }
    },

    {
      id: "teamdex", num: "05", year: "2026", cats: ["ai", "hack"],
      title: "Teamdex",
      tag: { en: "An onboarding game where you collect your colleagues.", zh: "把入职做成「收集同事」的游戏。" },
      role: { en: "Service design, product spec, QA", zh: "服务设计、产品 spec、验收" },
      status: { en: "One-day hackathon build (Uniplay)", zh: "一天完成的黑客松作品（Uniplay）" },
      cover: "cards", shot: "assets/shots/teamdex-d.png", featured: false,
      problem: {
        en: "Companies design the 'learn the material' half of onboarding and leave the 'learn the people' half to luck. Shy newcomers lack a legitimate reason to walk up to someone; HR can't see who has actually integrated.",
        zh: "公司把入职的「学材料」一半设计得很完整，「学人」那一半全靠运气。社恐新人缺少一个正当的搭话理由；HR 也看不到谁真正融入了。"
      },
      built: {
        en: [
          "Mobile-first PWA with three roles: newcomer, colleague, HR.",
          "Newcomers scan a colleague's card QR, unlock a fun fact that can only be learned face to face, pass a 'Who do I ask?' quiz, and unlock the onboarding party.",
          "Colleagues set up a pixel-avatar card in under two minutes; HR sees live progress.",
          "A 51-second pitch film for the demo."
        ],
        zh: [
          "移动端优先的 PWA，三种角色：新人、同事、HR。",
          "新人扫描同事的员工卡二维码，解锁只能当面才知道的 fun fact，通过「遇到问题该找谁」小测验，最终解锁入职派对。",
          "同事两分钟内设置好像素头像卡片；HR 实时查看进度。",
          "为演示制作了 51 秒路演短片。"
        ]
      },
      decisions: {
        en: ["No leaderboard: it would create social pressure and defeat the point.", "No chat: the goal is a real conversation, not moving it into the app.", "QR instead of NFC because iPhone web can't do it; NFC badges live in the vision.", "No AI-generated content in v1. The time went into the experience."],
        zh: ["不做排行榜：会制造社交压力，违背初衷。", "不做聊天：目标是促成真实对话，而不是把对话搬进 App。", "用二维码而非 NFC，因为 iPhone 网页做不到；NFC 工牌放进愿景。", "第一版不做 AI 生成内容，时间留给体验打磨。"]
      },
      ai: {
        en: "A five-document spec pack (PRD, service design, tech spec, design system, build plan with paste-ready prompts) plus a CLAUDE.md of working rules was written before the first line of code. Claude Code then built against it: local-first data adapter, always deployable at the end of each phase, no P1 before P0 is done.",
        zh: "先写好五份文档（PRD、服务设计、技术方案、设计系统、含可直接粘贴指令的开发计划）和一份 CLAUDE.md 工作守则，再动第一行代码。Claude Code 依此开发：本地优先的数据适配层、每个阶段结束都保持可部署、P0 没完成前不做 P1。"
      },
      stack: ["Vite", "React", "TypeScript", "Tailwind", "framer-motion", "Supabase realtime"],
      facts: [["1", { en: "day", zh: "天" }], ["5", { en: "spec documents", zh: "份规格文档" }], ["3", { en: "user roles", zh: "种用户角色" }]],
      links: [{ label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/TeamDex" }]
    },

    {
      id: "legacychain", num: "06", year: "2026", cats: ["ai", "hack"],
      title: "LegacyChain",
      tag: { en: "AI opens the archive. Provenance keeps it honest.", zh: "AI 打开档案，出处让它保持诚实。" },
      role: { en: "Concept, architecture direction, QA", zh: "概念、架构指挥、验收" },
      status: { en: "Working prototype", zh: "可运行原型" },
      cover: "chain", shot: "assets/shots/legacychain-vault.png", featured: false,
      problem: {
        en: "AI can read a faded 1982 letter in seconds, but a transcript is a reading of the letter, not the letter. Two generations on, people will read the convenient transcript and the scan will sit unopened.",
        zh: "AI 几秒钟就能读懂一封褪色的 1982 年家书，但转写只是对信的「一种读法」，不是信本身。两代人之后，大家读的会是方便的转写，扫描件再也没人打开。"
      },
      built: {
        en: [
          "Private vault for family heritage: upload → SHA-256 fingerprint → post-quantum signature (ML-DSA-44 / FIPS-204) → hash anchored through a Solidity registry contract.",
          "Derived versions (AI-restored, colourised) get their own hash, signature and anchor plus a link to the parent; the contract rejects rewrites.",
          "AI output arrives as 'pending'. Only a person can accept, edit or reject it, and it can never touch the file or its provenance chain.",
          "Family attestations are stored beside a record, never over it, so disagreement is preserved as history.",
          "Every subsystem degrades to a labelled local mode; the home page and a health endpoint report which mode is live. Tests for hashing, signatures and the chain."
        ],
        zh: [
          "家族档案的私有保险库：上传 → SHA-256 指纹 → 抗量子签名（ML-DSA-44 / FIPS-204）→ 通过 Solidity 注册合约锚定哈希。",
          "衍生版本（AI 修复、上色）拥有自己的哈希、签名和锚点，并指向原件；合约拒绝改写。",
          "AI 的输出一律是「待确认」。只有人可以接受、编辑或拒绝，它永远碰不到文件本身和出处链。",
          "家人的确认/异议并列存放在记录旁边，而不是覆盖它，分歧本身也成为历史的一部分。",
          "每个子系统都能降级为明确标注的本地模式；首页和健康检查接口会报告当前是哪种模式。含哈希、签名与链的测试。"
        ]
      },
      decisions: {
        en: ["AI is a reader, never the authority.", "Nothing private goes on chain; only hashes do.", "Two kinds of truth: cryptography answers 'has this file changed?'; only family can answer 'who is this person?'"],
        zh: ["AI 是读者，永远不是权威。", "任何私密内容都不上链，只有哈希上链。", "两种真相：密码学回答「文件变过吗」；「这是谁」只有家人能回答。"]
      },
      ai: {
        en: "Built with an AI coding agent; the design position on where AI must stop is the part I own, and it is written into the product and its README.",
        zh: "由 AI 编程助手实现；「AI 必须在哪里停下」这个设计立场由我负责，并写进了产品和 README。"
      },
      stack: ["Next.js", "TypeScript", "Solidity", "@noble/post-quantum", "Vitest"],
      facts: [["3", { en: "protocols", zh: "个协议" }], ["27", { en: "commits in a day", zh: "次提交（一天）" }]],
      links: [{ label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/legacychain" }],
      verify: { en: "Confirm the event/theme it was built for and your role vs teammates.", zh: "需确认参赛主题，以及你与队友的分工。" }
    },

    {
      id: "kikaren", num: "07", year: "2026", cats: ["hack", "design", "ai"],
      title: "Kikaren",
      tag: { en: "Voting is choosing a future. Look through the telescope.", zh: "投票，是选择一个未来。用望远镜去看。" },
      role: { en: "Concept, problem framing, design system, prompts", zh: "概念、问题拆解、设计系统、提示词" },
      status: { en: "Hackathon prototype (PwC × Järva)", zh: "黑客松原型（PwC × Järva）" },
      cover: "scope", shot: "assets/shots/vision-telescope-d.png", featured: false,
      problem: {
        en: "Most voter apps show parties as text and bar charts. For 18-year-old first-time voters in Järva, the real barriers aren't only information: they are language, procedure and feeling unsafe or unwelcome in politics at all.",
        zh: "大多数选民应用把政党做成文字和柱状图。对 Järva 的 18 岁首投族来说，真正的障碍不只是信息，还有语言、流程，以及「政治不是给我这种人的」这种不安全感。"
      },
      built: {
        en: [
          "The interaction: insert a party card into a telescope, the view rotates, and you literally see that party's vision for your neighbourhood in five years.",
          "A barrier map (cognitive, language, procedural, emotional) turned into how-might-we questions and a 2×2 of individual vs community, before vs on election day.",
          "An editorial, cinematic art direction for a civic project: sharp corners or pills only, no SaaS dashboard tropes."
        ],
        zh: [
          "交互：把政党卡片插进望远镜，视角转动，你会真的「看见」这个政党对你所在街区五年后的愿景。",
          "把障碍分成认知、语言、流程、情绪四类，转成 HMW 问题，并用「个体/社群 × 投票前/当天」的 2×2 找机会点。",
          "为公民项目定下编辑感、电影感的美术方向：只用直角或胶囊形，拒绝 SaaS 仪表盘套路。"
        ]
      },
      decisions: {
        en: ["Not another voting-advice app: the space is crowded and the barrier is emotional, not informational.", "One interaction, not a feature list: the telescope carries the whole idea."],
        zh: ["不做又一个投票建议应用：赛道拥挤，而且障碍是情绪上的，不是信息上的。", "一个交互，而不是一堆功能：望远镜承载整个想法。"]
      },
      ai: {
        en: "Design-system-first prompting with Lovable: art direction and hard rules ('do not add anything I didn't ask for') were locked before any screen was generated, then one screen at a time.",
        zh: "用 Lovable 做「设计系统先行」的提示：先锁定美术方向和硬规则（「没让你加的一律不要加」），再一屏一屏生成。"
      },
      stack: ["Lovable", "TanStack Start", "React"],
      facts: [["4", { en: "barrier types mapped", zh: "类障碍梳理" }], ["1", { en: "core interaction", zh: "个核心交互" }]],
      links: [{ label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/vision-telescope" }],
      verify: { en: "Confirm hackathon name, date, team and result.", zh: "需确认黑客松名称、日期、团队和成绩。" }
    },

    {
      id: "sap-career-ignite", num: "08", year: "2026", cats: ["ai", "hack", "design"],
      title: "SAP Career Ignite",
      tag: { en: "Won a consulting case with a live clickable prototype instead of slides.", zh: "用可点击的现场原型代替 PPT，拿下咨询案例赛第一名。" },
      role: { en: "Prototype lead and presenter of the solution", zh: "原型负责人，方案演示者" },
      status: { en: "1st place, case competition (Apr 2026)", zh: "案例赛第一名（2026 年 4 月）" },
      cover: "bars", shot: null, featured: false,
      problem: {
        en: "A timed consulting case: a fictional global furniture retailer needs a digital-transformation roadmap. Five-person team, competing against teams that mostly reached for slides.",
        zh: "限时咨询案例：虚构的全球家居零售商需要一份数字化转型路线图。五人小组，对手大多选择做 PPT。"
      },
      built: {
        en: [
          "Proposed and built an AI-assisted rapid-prototyping workflow for the team and iterated a clickable supply-chain control-tower dashboard in about two hours.",
          "Region filters, SKU-level AI explanations, alert handling and a one-click 'approve all'; the judges clicked it themselves.",
          "Presented the solution page live; a teammate covered the 24-month roadmap."
        ],
        zh: [
          "为团队提出并搭建 AI 辅助快速原型的工作流，约两小时迭代出可点击的供应链控制塔 dashboard。",
          "区域筛选、SKU 级 AI 解释、告警处理、一键批量批准；评委亲手点击了它。",
          "由我现场演示方案页；24 个月路线图由队友讲解。"
        ]
      },
      decisions: {
        en: ["Dropped slides for a live prototype so the room could see the future state instead of hearing about it.", "The first evening went badly for lack of preparation; I rebuilt my approach (frame first, prepare templates, fix my role) before the second."],
        zh: ["放弃 PPT，改用现场原型，让评委「看见」而不是「听说」未来的样子。", "第一晚因准备不足表现不佳；之后我重建了准备方式（先搭框架、备好模板、定好自己的角色）。"]
      },
      ai: {
        en: "The dashboard code was generated by AI under my direction. All figures shown in the prototype are fictional demo data, and the case was a paper scenario with no real deployment.",
        zh: "dashboard 代码由 AI 在我的指挥下生成。原型里的所有数字均为虚构演示数据，案例本身是纸面场景，没有真实落地。"
      },
      stack: ["Claude", "Interactive prototype", "Case consulting"],
      facts: [["1st", { en: "place, round two", zh: "第二轮第一名" }], ["~2h", { en: "to a clickable prototype", zh: "做出可点击原型" }], ["3", { en: "evening workshops", zh: "场晚间工作坊" }]],
      links: []
    },

    {
      id: "meanwhile", num: "09", year: "2026", cats: ["ai", "design"],
      title: "Meanwhile",
      tag: { en: "Two squares. No obligation to reply.", zh: "两个方格，没有回复的义务。" },
      role: { en: "Concept, design system, build spec", zh: "概念、设计系统、开发 spec" },
      status: { en: "Front-end prototype", zh: "前端原型" },
      cover: "squares", shot: "assets/shots/moment-share-square-m.png", mobile: true, featured: false,
      problem: {
        en: "Two friends far apart share one rectangle. Sending is complete on its own; the second square is an invitation, never a debt.",
        zh: "两个相隔很远的朋友共用一个矩形。发送本身就是完整的；第二个方格是邀请，而不是欠下的债。"
      },
      built: {
        en: [
          "A 2:1 rectangle split into two 1:1 squares: one person's moment on the left (a photo taken now, or one huge emoji), the other's on the right.",
          "One motion moment only: the pairing animation. It snaps instantly under prefers-reduced-motion.",
          "A deliberately austere system: two colours, 2px borders, zero radius, one typeface, sentence case, no shadows.",
          "The entire Lovable build spec (design tokens, data model, ordering rule) was written as a single document up front."
        ],
        zh: [
          "2:1 矩形分成两个 1:1 方格：左边是一个人的瞬间（此刻拍的照片，或一个巨大的 emoji），右边是另一个人的。",
          "只有一个动效时刻：配对动画。在 prefers-reduced-motion 下会直接跳到终态。",
          "刻意克制的系统：两种颜色、2px 边框、零圆角、单一字体、句首大写、无阴影。",
          "整份 Lovable 开发 spec（设计 token、数据模型、排序规则）事先写成一份完整文档。"
        ]
      },
      decisions: { en: ["Nothing in the UI asks for a reply. Sending is already complete on its own.", "No backend, auth or push: local state and seed data are enough to feel the idea on a phone."], zh: ["界面里没有任何东西催你回复。发送本身就已经完整。", "不做后端、登录和推送：本地状态加示例数据，足以在手机上感受这个想法。"] },
      ai: { en: "Spec-first prompting: a build spec for Lovable with every constraint stated, 38 iterations after.", zh: "spec 先行的提示方式：给 Lovable 一份写清所有约束的开发规格，之后迭代 38 次。" },
      stack: ["Lovable", "TanStack Start", "React"],
      facts: [["2", { en: "colours", zh: "种颜色" }], ["38", { en: "iterations", zh: "次迭代" }]],
      links: [{ label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/moment-share-square" }],
      verify: { en: "The UI calls itself 'beside' while the spec says 'Meanwhile'. Pick one name.", zh: "界面里叫 beside、spec 里叫 Meanwhile，需要定一个名字。" }
    },

    {
      id: "chroma-reader", num: "10", year: "2026", cats: ["ai"],
      title: "Chroma Reader",
      tag: { en: "Read long text in colour. See what you actually know.", zh: "用颜色读长文，一眼看见你真正掌握了多少。" },
      role: { en: "Concept, interaction spec", zh: "概念、交互 spec" },
      status: { en: "Live app", zh: "在线应用" },
      cover: "chroma", shot: "assets/shots/chroma-reading.png", featured: false,
      problem: { en: "Highlighting is binary. A study tool should show gradations of mastery across a whole text at a glance.", zh: "划重点是二元的。学习工具应该让人一眼看到整篇文字里不同程度的掌握。" },
      built: {
        en: ["Paste text; it becomes sentences, each with a background colour, the text itself staying dark and readable.", "Five colours only: got it, shaky, don't get it, key idea, skip.", "Click a sentence and press 1–5: the colour is assigned instantly and the selection moves on. No menus, no modals.", "Editorial reading page: serif, 680px measure, line-height 2, like a well-set book page, not a dashboard.", "Saves to a backend; rendering reads the user's colour first and falls back to an AI label (left empty in v1 on purpose)."],
        zh: ["粘贴文本，自动拆成句子，每句有背景色，文字本身保持深色、易读。", "只有五种颜色：懂了、模糊、不懂、关键想法、跳过。", "点一个句子按 1–5：颜色立刻生效，选中自动移到下一句。没有菜单，没有弹窗。", "编辑感阅读页：衬线体、680px 行宽、行高 2，像一页排得很好的书，而不是仪表盘。", "数据存入后端；渲染时先读用户颜色，再回退到 AI 标签（v1 有意留空）。"]
      },
      decisions: { en: ["Colour is background only, so reading never gets harder.", "Speed is the feature: keyboard-only marking must feel instant."], zh: ["颜色只用作背景，让阅读永远不会变难。", "速度就是功能：纯键盘标注必须快到无感。"] },
      ai: { en: "The whole app was specified in one prompt-length brief and refined over 64 iterations in Lovable.", zh: "整个应用先用一份提示词长度的说明书定义，再在 Lovable 里迭代了 64 次。" },
      stack: ["Lovable", "TanStack Start", "Lovable Cloud"],
      facts: [["5", { en: "colours", zh: "种颜色" }], ["64", { en: "iterations", zh: "次迭代" }]],
      links: [{ label: { en: "Open live app", zh: "打开在线应用" }, url: "https://chroma-reader-study-tool.lovable.app" }, { label: { en: "Source on GitHub", zh: "GitHub 源码" }, url: "https://github.com/PhineasYu/chroma-reader-study-tool" }]
    },

    {
      id: "voi", num: "11", year: "2025", cats: ["design"],
      title: "Voi Inclusive Design",
      tag: { en: "Women ride less because of safety, not price.", zh: "女性骑得少，是因为安全感，不是价格。" },
      role: { en: "Co-led research, in-app flow design, business case", zh: "联合带领研究、App 内流程设计、商业测算" },
      status: { en: "KTH × Voi Technology, Aug–Dec 2025", zh: "KTH × Voi Technology，2025 年 8–12 月" },
      cover: "flow", shot: null, featured: false,
      problem: { en: "Low ridership among Gen-Y women on shared e-scooters. The assumed cause was price.", zh: "Gen-Y 女性在共享电动滑板车上的使用率偏低。团队最初的假设是价格。" },
      built: {
        en: ["37 street interviews and 47 branching surveys traced the gap to perceived safety.", "The team designed a smart helmet integrated with the basket, iterated on feedback from Voi.", "Designed the end-to-end in-app helmet flow (unlock sequencing, wear confirmation, return detection) inside Voi's existing design language.", "Contributed a defensible business case, projected +645k SEK per month, grounded in a real supplier quote."],
        zh: ["37 场街头访谈和 47 份分支问卷，把差距追溯到「感知安全」。", "团队设计了与车筐集成的智能头盔，并根据 Voi 的反馈迭代。", "在 Voi 现有设计语言内，设计了完整的 App 内头盔流程（解锁顺序、佩戴确认、归还检测）。", "参与商业测算：预计每月 +645k SEK，依据来自真实供应商报价。"]
      },
      decisions: { en: ["Reframed the problem from price to safety after the field research."], zh: ["田野研究之后，把问题从「价格」重新定义为「安全」。"] },
      ai: { en: "Not an AI-built project: a human-centred research and hardware-plus-app design project. Included to show the research spine behind the AI work.", zh: "这不是 AI 构建的项目，而是以人为中心的研究加软硬件设计项目。放在这里，是为了展示 AI 作品背后的研究功底。" },
      stack: ["Field research", "Surveys", "Service + UI design", "Business case"],
      facts: [["37", { en: "street interviews", zh: "场街头访谈" }], ["47", { en: "surveys", zh: "份问卷" }], ["+645k", { en: "SEK / month (projected)", zh: "SEK/月（预测）" }]],
      links: [],
      verify: { en: "Add visuals (helmet concept, flow screens) if Voi allows publication.", zh: "如 Voi 允许公开，请补头盔概念与流程截图。" }
    },

    {
      id: "kodiak-hub", num: "12", year: "2025", cats: ["design"],
      title: "Kodiak Hub",
      tag: { en: "Inside a real B2B SaaS design system: BOM, login, and a usability process that outlived the internship.", zh: "在真实 B2B SaaS 设计系统内工作：BOM、登录，以及一套在实习结束后仍在使用的可用性测试流程。" },
      role: { en: "UI/UX Design Intern", zh: "UI/UX 设计实习生" },
      status: { en: "Jun–Sep 2025, Stockholm", zh: "2025 年 6–9 月，斯德哥尔摩" },
      cover: "table", shot: null, featured: false,
      problem: { en: "A supplier-relationship-management platform (about 200 people) needed new features that fit an existing design system, and a way to test an unreleased AI document feature.", zh: "一家供应商关系管理平台（约 200 人）需要在现有设计系统内做新功能，并测试一个尚未发布的 AI 文档管理功能。" },
      built: {
        en: ["Designed two features end-to-end (Bill of Materials, login/authentication); broke BOM into 5 development tickets, delivered before the sprint boundary.", "Audited 4 product modules and documented reusable pattern rules: table types, column standards, filter and destructive-action behaviour.", "Built a six-state supplier-lifecycle indicator and extended the badge system.", "Analysed responsive usage from 1,000+ real users to set a desktop-first breakpoint strategy on evidence.", "Set up the company's first structured usability-testing process with my mentor; think-aloud sessions, layout iterated between rounds, key recommendations adopted and embedded into the Jira workflow.", "Evaluated Figma Make, Lovable and Uizard on output quality, prompt cost, stability and design-system fit; the design team adopted the workflow."],
        zh: ["端到端设计两个功能（物料清单 BOM、登录/认证）；把 BOM 拆成 5 张开发工单，在 sprint 结束前交付。", "审计 4 个产品模块，沉淀可复用的模式规则：表格类型、列规范、筛选与破坏性操作行为。", "做出六状态的供应商生命周期指示器，并扩展徽标体系。", "分析 1,000+ 真实用户的响应式使用数据，用证据确定桌面优先的断点策略。", "与导师一起建立公司第一套结构化可用性测试流程；出声思考、轮次间迭代布局，关键建议被采纳并嵌入 Jira 工作流。", "评估 Figma Make、Lovable、Uizard 的输出质量、提示成本、稳定性与设计系统契合度；设计团队采用了这套工作流。"]
      },
      decisions: { en: ["Breakpoints set from usage data, not from assumption."], zh: ["断点策略基于使用数据，而不是想当然。"] },
      ai: { en: "Where AI enters: I evaluated AI design tools for the team and shared the workflow that was adopted.", zh: "AI 的角色：我为团队评估了 AI 设计工具，并分享了被采纳的工作流。" },
      stack: ["Figma", "Design systems", "Usability testing", "Jira"],
      facts: [["2", { en: "features end-to-end", zh: "个功能端到端" }], ["4", { en: "modules audited", zh: "个模块审计" }], ["1,000+", { en: "users' data analysed", zh: "用户数据分析" }]],
      links: [],
      verify: { en: "Company work: check with Kodiak what visuals are publishable before adding screenshots.", zh: "公司项目：放截图前，先确认 Kodiak 允许公开的范围。" }
    }
  ],

  more: {
    title: { en: "Smaller builds & experiments", zh: "更小的作品与实验" },
    items: [
      { name: "Chronicool", year: "2026", note: { en: "A Rick & Morty habit tracker. The brief was literally 'improve the prompts first, then build'.", zh: "Rick & Morty 风格的习惯打卡。需求原文就是「先帮我改进提示词，再开始做」。" }, url: "https://chronicool-tracker.lovable.app" },
      { name: "Defense Countdown Clock", year: "2026", note: { en: "A minimal, precise 4-minute timer built for my own thesis defence. Space to start, R to reset.", zh: "为自己的论文答辩做的极简、精确 4 分钟倒计时。空格开始，R 重置。" }, url: "https://github.com/PhineasYu/defense-countdown-clock" },
      { name: "ADHD Stride", year: "2025", note: { en: "Early Lovable experiment: task steps as flows, focus timer, progress ring.", zh: "早期 Lovable 实验：把任务拆成步骤流，含专注计时和进度环。" } },
      { name: "Personal Daily Grid", year: "2025", note: { en: "Early Lovable experiment: calendar, tasks and profile in one grid.", zh: "早期 Lovable 实验：把日历、任务和个人档案放进同一张网格。" } }
    ]
  },

  awards: [
    { year: "2026", title: { en: "SAP Career Ignite: 1st place", zh: "SAP Career Ignite：第一名" }, note: { en: "Case competition, round two, with Capgemini and Google", zh: "案例竞赛第二轮，合作方 Capgemini 与 Google" } },
    { year: "2026", title: { en: "Aris & Friends Hackathon: 'Thinking outside of the box' prize", zh: "Aris & Friends 黑客松：「跳出框框思考」奖" }, note: { en: "4-hour build with Protos and Redpine, Stockholm", zh: "4 小时现场搭建，使用 Protos 与 Redpine，斯德哥尔摩" }, verify: true },
    { year: "—", title: { en: "Deloitte Spark Hackathon: 3rd place", zh: "Deloitte Spark 黑客松：第三名" }, note: { en: "Planet-friendlier routing from open deforestation, biodiversity, soil and CO₂ data", zh: "基于森林砍伐、生物多样性、土壤污染与碳排放开放数据的更环保路线建议" }, verify: true }
  ],

  method: {
    title: { en: "How I build with AI", zh: "我如何与 AI 一起做东西" },
    lede: {
      en: "I don't hand-write production code. I own the parts that decide whether the thing is any good, and I say so up front.",
      zh: "我不手写生产级代码。我负责那些决定作品好不好的部分，并且一开始就说清楚。"
    },
    steps: [
      { n: "01", h: { en: "Frame", zh: "定义" }, p: { en: "Turn a vague brief into one person, one moment, one decision. Kikaren's barrier map and Dossier's 90-second judge path came from here.", zh: "把模糊的需求收窄成一个人、一个瞬间、一个决策。Kikaren 的障碍地图、Dossier 的 90 秒路径都出自这里。" } },
      { n: "02", h: { en: "Spec", zh: "写 spec" }, p: { en: "Write it down before any code: PRD, non-goals, design tokens, data model. Teamdex has five spec documents; Meanwhile has a build spec with every constraint stated.", zh: "动代码之前先写下来：PRD、非目标、设计 token、数据模型。Teamdex 有五份规格文档；Meanwhile 有一份写清所有约束的开发规格。" } },
      { n: "03", h: { en: "Direct", zh: "指挥" }, p: { en: "Give the agent working rules, not wishes: local-first data, always deployable, P0 before P1, 'do not add anything I didn't ask for'.", zh: "给 AI 的是工作守则，不是愿望：本地优先、始终可部署、P0 先于 P1、「没让你加的不要加」。" } },
      { n: "04", h: { en: "Verify", zh: "验证" }, p: { en: "Real people and real loops. A real customer through Sushi Jerash's order-to-Telegram loop; think-aloud sessions at Kodiak; tests for hashing and signatures in LegacyChain.", zh: "真实的人、真实的闭环。Sushi Jerash 用真实顾客跑通下单到 Telegram 通知；Kodiak 做出声思考测试；LegacyChain 给哈希与签名写测试。" } }
    ],
    principlesTitle: { en: "Ideas that keep coming back", zh: "反复出现的想法" },
    principles: [
      { h: { en: "Show the reasoning", zh: "让推理看得见" }, p: { en: "Full Context Canvas gives every placement a reason and a confidence score.", zh: "Full Context Canvas 给每一次归位写明理由和把握度。" } },
      { h: { en: "AI is a reader, not the authority", zh: "AI 是读者，不是权威" }, p: { en: "In LegacyChain, AI output is 'pending' until a person accepts it.", zh: "在 LegacyChain 里，AI 的输出在人接受之前一直是「待确认」。" } },
      { h: { en: "Remove the pressure", zh: "拿掉压力" }, p: { en: "Meanwhile has no reply obligation; Teamdex has no leaderboard.", zh: "Meanwhile 没有回复义务；Teamdex 没有排行榜。" } },
      { h: { en: "One interaction carries the idea", zh: "一个交互承载整个想法" }, p: { en: "A telescope for Kikaren; keys 1–5 for Chroma Reader; a voice dump for Dossier.", zh: "Kikaren 的望远镜；Chroma Reader 的 1–5 键；Dossier 的语音倾倒。" } }
    ],
    disclosure: {
      en: "Disclosure: the code in every AI-native project here was generated by AI coding agents (Claude Code, Lovable). I did the framing, specs, design systems, direction, review and QA. Demo data is fictional unless a project says otherwise.",
      zh: "声明：这里每个 AI 原生项目的代码都由 AI 编程助手（Claude Code、Lovable）生成。问题定义、spec、设计系统、指挥、审阅与验收由我完成。除非项目另有说明，演示数据均为虚构。"
    }
  },

  about: {
    title: { en: "About", zh: "关于我" },
    body: {
      en: [
        "I studied packaging engineering in Zhengzhou, worked in Unilever's Shanghai R&D packaging lab, then moved to Stockholm for a master's in Integrated Product Design at KTH. The engineering background is why I read a spec, a schema or a build log without flinching; the design training is why I ask who it is for first.",
        "I'm looking for junior roles where a short loop from ambiguous problem to demoable prototype is the job: design technologist, UX engineer, AI-native product designer."
      ],
      zh: [
        "我本科在郑州学包装工程，在联合利华上海研发中心的包装实验室工作过，然后来到斯德哥尔摩，在 KTH 读集成产品设计硕士。工科背景让我看 spec、数据表和构建日志毫不发怵；设计训练让我总是先问：这是给谁的？",
        "我在找 junior 岗位：从模糊问题到可演示原型的短周期就是工作本身，例如 design technologist、UX engineer、AI 原生的产品设计师。"
      ]
    },
    timeline: [
      { when: "2024–2026", what: { en: "MSc Integrated Product Design, KTH Royal Institute of Technology", zh: "KTH 皇家理工学院，集成产品设计硕士" } },
      { when: "2025", what: { en: "UI/UX Design Intern, Kodiak Hub, Stockholm", zh: "Kodiak Hub UI/UX 设计实习生，斯德哥尔摩" } },
      { when: "2022–2024", what: { en: "Packaging Laboratory Assistant, Unilever Global R&D Center, Shanghai", zh: "联合利华全球研发中心包装实验室助理，上海" } },
      { when: "2017–2021", what: { en: "BEng Packaging Engineering, Zhengzhou University", zh: "郑州大学，包装工程学士" } }
    ],
    languages: { en: "English (professional) · Chinese (native) · Swedish (learning)", zh: "英语（工作语言）· 中文（母语）· 瑞典语（学习中）" }
  },

  ui: {
    nav: { work: { en: "Work", zh: "作品" }, method: { en: "Method", zh: "方法" }, about: { en: "About", zh: "关于" }, contact: { en: "Contact", zh: "联系" } },
    selected: { en: "Selected work", zh: "精选作品" },
    all: { en: "Index", zh: "全部作品" },
    view: { en: "View", zh: "查看" },
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
    recognition: { en: "Recognition", zh: "获奖与认可" },
    contactTitle: { en: "Let's build something.", zh: "一起做点什么。" },
    contactLede: { en: "Open to junior roles in Sweden and China. The fastest way to reach me is email.", zh: "接受瑞典与中国的 junior 岗位机会。最快的联系方式是邮件。" },
    draftNote: { en: "To confirm before sharing", zh: "分享前待确认" },
    footer: { en: "Designed and built with Claude Code.", zh: "由 Claude Code 协助设计与搭建。" },
    more: { en: "Smaller builds & experiments", zh: "更小的作品与实验" },
    ticker: { en: "Working with", zh: "常用工具" }
  }
};
