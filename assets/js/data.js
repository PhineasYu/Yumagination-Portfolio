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
      en: ["I turn ambiguous problems into working prototypes", "with AI I direct and verify."],
      zh: ["把模糊的问题，变成能点开的原型", "用我来定义、指挥、验证的 AI。"]
    },
    // hero: the headline's meaning, shorter (two lines under the name)
    tagline: {
      en: ["From ambiguous problem to working prototype.", "Built with AI I direct and verify."],
      zh: ["从模糊的问题，到能点开的原型。", "由 AI 搭建，由我指挥和验证。"]
    },
    intro: {
      en: "Product designer with an engineering background. I frame the problem, write the spec, set the design system, and direct AI coding agents to build it — then test it with real people. So far in 2026, this way of working has shipped a live restaurant site and more than ten working prototypes.",
      zh: "工科背景的产品设计师。我负责定义问题、写 spec、定设计系统，指挥 AI 编程助手把它做出来，再拿去给真实的人测试。2026 年，我用这套方式做出了一个真实上线的餐厅网站，以及十多个可运行的原型。"
    }
  },

  tools: ["Claude Code", "Lovable", "Figma", "Supabase", "Next.js", "TypeScript", "Tailwind", "ElevenLabs", "Telegram Bot API", "Chrome Extensions", "Netlify", "Vercel", "Git / PR workflow"],

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
    { year: "2026", title: { en: "SAP Career Ignite: 1st place", zh: "SAP Career Ignite：第一名" }, note: { en: "Case competition, round two, with Capgemini and Google", zh: "案例竞赛第二轮，合作方 Capgemini 与 Google" } },
    { year: "2026", title: { en: "Aris & Friends Hackathon: 'Thinking outside of the box' prize", zh: "Aris & Friends 黑客松：「跳出框框思考」奖" }, note: { en: "4-hour build with Protos and Redpine, Stockholm", zh: "4 小时现场搭建，使用 Protos 与 Redpine，斯德哥尔摩" } },
    { year: "2026", title: { en: "Deloitte Spark Hackathon: 3rd place", zh: "Deloitte Spark 黑客松：第三名" }, note: { en: "Planet-friendlier routing from open deforestation, biodiversity, soil and CO₂ data", zh: "基于森林砍伐、生物多样性、土壤污染与碳排放开放数据的更环保路线建议" } },
    { year: "2026", title: { en: "Uniplay Hackathon: 1st place (Teamdex)", zh: "Uniplay 黑客松：一等奖（Teamdex）" }, note: { en: "An onboarding game where newcomers collect their colleagues", zh: "把入职做成「收集同事」的游戏" } },
    { year: "2026", title: { en: "Stone Leap Build-a-Game: 1st place (Let Me Die)", zh: "Stone Leap Build-a-Game：第一名（Let Me Die）" }, note: { en: "A playable game built in one evening with an AI world builder", zh: "用 AI world builder 一个晚上做出的可玩游戏" } },
    { year: "2026", title: { en: "BitMagic game hackathon: 2nd place (Disco Fever)", zh: "BitMagic 游戏黑客松：二等奖（Disco Fever）" }, note: { en: "A one-minute disco rhythm game, now playable online", zh: "一分钟的迪斯科节奏游戏，已在线可玩" }, verify: true },
    { year: "2026", title: { en: "Accel AI Innovate Hackathon: Top 8 and a pitch slot (Dossier)", zh: "Accel AI Innovate 黑客松：Top 8 并获得路演机会（Dossier）" }, note: { en: "Hosted by KTH AI Society", zh: "KTH AI Society 主办" } },
    { year: "2022–23", title: { en: "Huayang Road community renewal: Excellent Proposal commendation", zh: "华阳路街道社区更新：优秀提案表彰" }, note: { en: "Community Viewfinder, Changning District, Shanghai", zh: "社区取景框，上海长宁区" } }
  ],

  method: {
    title: { en: "How I build with AI", zh: "我如何与 AI 一起做东西" },
    lede: {
      en: "I don't hand-write production code. I own the parts that decide whether the thing is any good, and I say so up front.",
      zh: "我不手写生产级代码。我负责那些决定作品好不好的部分，并且一开始就说清楚。"
    },
    steps: [
      { n: "01", h: { en: "Frame", zh: "定义" }, p: { en: "Turn a vague brief into one person, one moment, one decision. Kikaren's barrier map and Dossier's 90-second judge path came from here.", zh: "把模糊的需求收窄成一个人、一个瞬间、一个决策。Kikaren 的障碍地图、Dossier 的 90 秒路径都出自这里。" } },
      { n: "02", h: { en: "Spec", zh: "写 spec" }, p: { en: "Write it down before any code: PRD, non-goals, design tokens, data model. Teamdex has five spec documents; Beside has a build spec with every constraint stated.", zh: "动代码之前先写下来：PRD、非目标、设计 token、数据模型。Teamdex 有五份规格文档；Beside 有一份写清所有约束的开发规格。" } },
      { n: "03", h: { en: "Direct", zh: "指挥" }, p: { en: "Give the agent working rules, not wishes: local-first data, always deployable, P0 before P1, 'do not add anything I didn't ask for'.", zh: "给 AI 的是工作守则，不是愿望：本地优先、始终可部署、P0 先于 P1、「没让你加的不要加」。" } },
      { n: "04", h: { en: "Verify", zh: "验证" }, p: { en: "Real people and real loops. A real customer through Sushi Jerash's order-to-Telegram loop; think-aloud sessions at Kodiak; tests for hashing and signatures in LegacyChain.", zh: "真实的人、真实的闭环。Sushi Jerash 用真实顾客跑通下单到 Telegram 通知；Kodiak 做出声思考测试；LegacyChain 给哈希与签名写测试。" } }
    ],
    principlesTitle: { en: "Ideas that keep coming back", zh: "反复出现的想法" },
    principles: [
      { h: { en: "Show the reasoning", zh: "让推理看得见" }, p: { en: "Full Context Canvas gives every placement a reason and a confidence score.", zh: "Full Context Canvas 给每一次归位写明理由和把握度。" } },
      { h: { en: "AI is a reader, not the authority", zh: "AI 是读者，不是权威" }, p: { en: "In LegacyChain, AI output is 'pending' until a person accepts it.", zh: "在 LegacyChain 里，AI 的输出在人接受之前一直是「待确认」。" } },
      { h: { en: "Remove the pressure", zh: "拿掉压力" }, p: { en: "Beside has no reply obligation; Teamdex has no leaderboard.", zh: "Beside 没有回复义务；Teamdex 没有排行榜。" } },
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
