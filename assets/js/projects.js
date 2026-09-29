/* ------------------------------------------------------------------
   Projects. One object per project; the home grid and case pages render
   from it. Add a project = add an object here.

   media kinds:  video | img | embed | motion | steps | stats
   `verify` = things to confirm before sharing (shown only with ?draft).
------------------------------------------------------------------- */
(function () {
  const L = (en, zh) => ({ en, zh });
  const V = (name, extra) => Object.assign({ type: "video", src: `assets/media/${name}.mp4`, poster: `assets/media/${name}-poster.jpg` }, extra || {});
  const IMG = (src, alt, extra) => Object.assign({ type: "img", src, alt }, extra || {});
  const GH = (u) => ({ label: L("Source on GitHub", "GitHub 源码"), url: u });

  window.PORTFOLIO.projects = [
    /* ------------------------------------------------------------ 01 */
    {
      id: "full-context-canvas", num: "01", year: "2026", when: "Sep 2026", cats: ["ai", "design"],
      title: "Full Context Canvas", meta: "Full Context Canvas · Sep 2026",
      cap: L("A whiteboard for every AI chat and every save", "把每个 AI 聊天和每条收藏放上同一张白板"),
      h1: L("A whiteboard that shows every AI conversation and every save in one place, and explains where each one went", "一张白板，把所有 AI 对话和收藏放在一起，并解释每一条被放到了哪里"),
      lead: L("Each AI only remembers its own slice of you. This is a prototype and a Chrome extension that gathers all of it, groups it, and shows its reasoning.", "每个 AI 只记得你的一小块。这是一个原型加一个 Chrome 插件：把所有内容聚在一起、分组，并把推理摆出来。"),
      role: L("Product, design, spec, QA", "产品、设计、spec、验收"),
      status: L("Prototype + Chrome extension MVP", "原型 + Chrome 插件 MVP"),
      stack: ["HTML / JS", "Chrome MV3", "Anthropic SDK", "Claude Code"],
      links: [{ label: L("Open the live prototype", "打开可运行原型"), url: "demos/full-context-canvas/index.html" }, GH("https://github.com/PhineasYu/Full-context-canvas")],
      tile: { video: "fcc", poster: "fcc-poster" },
      hero: V("fcc", { frame: "browser", tag: "rec", cap: L("The built-in 11-step guided tour, recorded from the running prototype.", "内置的 11 步演示导览，录自正在运行的原型。") }),
      sections: [
        { h: L("Overview — Seven platforms, seven silos", "概述 — 七个平台，七座孤岛"),
          p: L(["Chats live in Claude, ChatGPT and Gemini. Saves live in Chrome, YouTube, Reddit and X. Each AI only knows the slice that happened inside it.", "People don't dare hand the mess to an AI because they can't see where things end up. So the board has to be legible before it is clever."], ["聊天在 Claude、ChatGPT、Gemini，收藏在 Chrome、YouTube、Reddit、X。每个 AI 只认识发生在它里面的那一小块。", "人们不敢把这堆东西交给 AI，因为看不见它们最后去了哪。所以这张白板要先「看得懂」，再谈「聪明」。"]),
          media: IMG("assets/shots/fcc-1.jpg", "Seven platforms, each in its own column", { frame: "browser" }), cap: L("Before: 41 items, seven columns, nobody remembers what is where.", "整理前：41 条内容，七列，没人记得什么在哪。") },
        { h: L("Try it — The prototype is live", "试一试 — 原型是活的"),
          p: L(["This is the real prototype running inside the page. Press Guided tour, click a card, or simulate a new save and watch it fly into place."], ["下面是页面里正在运行的真实原型。点「Guided tour」，点任意卡片，或者模拟一条新收藏，看它飞进对应的组。"]),
          media: { type: "embed", src: "demos/full-context-canvas/index.html", frame: "browser", ratio: "16/10", open: "demos/full-context-canvas/index.html" }, cap: L("Live embed. Sample data is fictional; with an API key it calls real Claude.", "内嵌的可运行原型。示例数据为虚构；填入 API key 后会调用真实 Claude。") },
        { h: L("Source lines — Originals are never moved", "来源线 — 原件从不被移动"),
          p: L(["Click any card and a glowing line runs back to its original platform. Organisation is an index laid on top, so trusting the AI costs nothing.", "One item can sit in several groups at once. The overlap between groups is where new ideas tend to come from."], ["点任意卡片，一根发光的线连回它的原平台。整理只是叠在上面的一层索引，所以信任 AI 不需要成本。", "一条内容可以同时在几个组里。组与组之间的交集，往往就是新想法出现的地方。"]),
          media: IMG("assets/shots/fcc-3.jpg", "Every Reddit save lit up with a line back to Reddit", { frame: "browser" }), cap: L("Clicking a platform lights up every save from it.", "点一个平台，它的全部收藏一起亮起来。") },
        { h: L("Transparency — Every placement has a reason and a confidence score", "透明度 — 每次归位都有理由和把握度"),
          p: L(["Anything under 60% confidence goes into a review queue instead of being silently misfiled. One click keeps or removes it, and every correction is logged.", "A competitor sweep (mymind, Raindrop, Notion, MemoryPlugin and others) showed everyone auto-tags and nobody says why. That gap became the pitch."], ["把握度低于 60% 的进入待确认队列，而不是悄悄放错。一键保留或移出，每次修正都会被记录。", "竞品调研（mymind、Raindrop、Notion、MemoryPlugin 等）显示大家都在自动打标签，没有人说明为什么。这个空缺成了核心卖点。"]),
          media: IMG("assets/shots/fcc-4.jpg", "Review queue with confidence bars", { frame: "browser" }), cap: L("The AI flags what it is unsure about instead of quietly misfiling it.", "AI 会主动说出拿不准的，而不是悄悄放错。") },
        { h: L("Synthesis — A résumé drafted from all seven platforms", "综合 — 从七个平台一起写出一份简历"),
          p: L(["Sorting is the means. The value is what you can now write or decide: every sentence in the draft carries a clickable source back to the original.", "A Chrome extension carries this to real data: it reads all bookmarks, syncs live, groups with Claude, and copies any group as Markdown context for any AI."], ["整理只是手段，价值是你之后能写出什么、决定什么：草稿里每句话都带一个可点击的出处，连回原件。", "Chrome 插件把它带到真实数据上：读取全部书签、实时同步、用 Claude 分组，并可把任意一组复制成 Markdown 上下文交给任何 AI。"]),
          media: IMG("assets/shots/fcc-5.jpg", "Résumé draft with numbered sources", { frame: "browser" }), cap: L("A cross-platform draft where each claim points back to its source.", "跨平台生成的草稿，每一条陈述都指回出处。") },
        { h: L("Next — What would prove it works", "下一步 — 什么能证明它有用"),
          p: L(["Use it on my own bookmarks for two weeks and log how many placements I correct. Then put it in front of ten heavy savers, ADHD users first, and see who comes back in week two.", "After that: importers for Claude and ChatGPT exports inside the extension, then an MCP server so an AI can read one group directly."], ["先在自己的真实书签上用两周，记录每周纠正了多少条。再找 10 个重度收藏者（优先 ADHD 人群）试用，看第二周还有谁回来。", "之后：把 Claude 和 ChatGPT 的对话导入放进插件，再做 MCP server，让 AI 直接读取某一组。"]),
          media: IMG("assets/shots/fcc-6.jpg", "Inventory view", { frame: "browser" }), cap: L("The inventory: where everything went, and which themes span several platforms.", "盘点页：一切去了哪里，哪些主题横跨了几个平台。") }
      ]
    },

    /* ------------------------------------------------------------ 02 */
    {
      id: "dossier", num: "02", year: "2026", when: "Sep 2026", cats: ["ai", "hack"],
      title: "Dossier", meta: "Dossier · Sep 2026",
      cap: L("A voice-first archive of a child's growing up", "用语音记录孩子成长的档案"),
      h1: L("Turning a parent's 60-second voice memo into a child's timeline and profile", "把家长 60 秒的语音，变成孩子的时间线和档案"),
      lead: L("One input, two outputs. Parents just talk; AI sorts the feelings into memory cards and the facts into a profile.", "一个输入，两个输出。家长只管说话；AI 把情感变成回忆卡片，把事实变成档案。"),
      role: L("Product, PRD, design direction, QA", "产品、PRD、设计方向、验收"),
      status: L("Hackathon build · 8 roadmap milestones shipped", "黑客松作品 · 8 个里程碑已完成"),
      stack: ["TanStack Start", "React", "Supabase", "ElevenLabs", "Polar", "Lovable"],
      links: [GH("https://github.com/PhineasYu/Dossier")],
      verify: L("Confirm event name and result. Add real in-app screenshots (fictional child only). The published Lovable URL currently shows 'Build incomplete'.", "需确认赛事名称与成绩；补登录后的真实界面截图（只用虚构孩子）。目前 Lovable 已发布的网址显示 “Build incomplete”。"),
      tile: { motion: "dossier-dump" },
      hero: { type: "motion", id: "dossier-dump", cap: L("Illustration of the pipeline: a spoken paragraph is split into items that land in each child's lane.", "流程示意：一段口述被拆成条目，落入各个孩子的轨道。"), tag: "ill" },
      sections: [
        { h: L("Overview — Parents remember the feeling and lose the facts", "概述 — 家长记得感受，却丢了事实"),
          p: L(["The moments that matter, a first fear, a new dream, get told at dinner and forgotten. The facts that matter, an allergy, a height, a checkup PDF, sit in a shoebox.", "Dossier treats them as one habit: talk for a minute, and both get filed."], ["真正重要的瞬间，第一次害怕、一个新梦想，在饭桌上说过就忘了。真正重要的事实，过敏、身高、体检 PDF，躺在鞋盒里。", "Dossier 把它们当成一个习惯：说一分钟话，两边都被归档。"]),
          media: { type: "stats", items: [["1", L("voice memo", "段语音")], ["2", L("outputs", "种输出")], ["30–60s", L("of talking", "口述时长")], ["8", L("milestones shipped", "个里程碑")]] } },
        { h: L("Hero interaction — The voice brain dump", "核心交互 — 语音倾倒"),
          p: L(["A parent holds the mic and talks for 30 to 60 seconds, mixing everything. AI splits the transcript into atomic items and each one flies into the right child's lane.", "One sentence about two kids becomes two cards. There is no confirm step, only undo, to keep the demo fast. A hidden text input runs the exact same pipeline in case voice fails on stage."], ["家长握着麦克风说 30 到 60 秒，什么都混着说。AI 把转写拆成原子条目，每条飞进对应孩子的轨道。", "一句话提到两个孩子，会变成两张卡片。没有确认步骤，只有撤销，让演示更快。隐藏的文字输入走完全相同的流程，防止语音在台上失败。"]),
          media: { type: "motion", id: "dossier-theme" }, cap: L("Each child has a theme colour, and the whole UI recolours when you switch.", "每个孩子有自己的主题色，切换头像时整个界面随之换色。") },
        { h: L("Design system — Rebuilt three times", "设计系统 — 重建了三次"),
          p: L(["A warm palette from a reference upload, then Material 3 with layered archive folders, then a neutral 'tech-white' system with 1px frames and a segmented AI signature.", "The last one won because colour finally meant something: child colours and question colours, and nothing else."], ["先是从参考图提取的暖色调，然后是 Material 3 加分层档案夹，最后是中性的「tech-white」：1px 边框、分段式 AI 签名。", "最后一版胜出，因为颜色终于有了含义：孩子的颜色、问题的颜色，除此之外都不用。"]),
          media: { type: "steps", items: [["01", L("Polar subscription section", "Polar 订阅区")], ["02", L("Palette from reference upload", "参考图提取配色")], ["03", L("Document archive, folders", "文件档案夹")], ["04", L("Polish & judging prep", "打磨与评审准备")], ["05", L("Material 3 rebuild", "Material 3 重做")], ["06", L("Two-way voice check-in", "双向语音签到")], ["07", L("Search across timeline & archive", "时间线与档案搜索")], ["08", L("Tech-white design system", "tech-white 设计系统")]] }, cap: L("The eight roadmap milestones, from the project's own roadmap file.", "项目自己的路线图里的八个里程碑。") },
        { h: L("Judging — Ninety seconds and two safety nets", "评审 — 九十秒，两道保险"),
          p: L(["The judges walk the room. The path is planned to the second: splash, avatar switch, voice dump, search, stats line, and a shimmering QR card that measures real interest.", "Feature freeze at 14:45, then rehearsal and a backup screen recording. The demo had to survive a bad Wi-Fi, not just a good one."], ["评委在展厅里走动。路径规划到秒：开场、切换头像、语音倾倒、搜索、统计句，最后是一张会闪光的二维码卡片，用来测真实兴趣。", "14:45 功能冻结，之后只做排练和备份录屏。演示得扛得住糟糕的网络，而不只是顺利的那一次。"]),
          media: { type: "steps", items: [["0–10s", L("Splash: the child grows taller", "开场：孩子慢慢长高")], ["10–25s", L("Tap avatars, theme recolours", "切换头像，主题换色")], ["25–45s", L("Voice dump, items fly into lanes", "语音倾倒，条目飞入轨道")], ["45–65s", L("Ask a question, cards float up", "提问，卡片浮现")], ["65–75s", L("Stats line", "统计句")], ["75–90s", L("Shimmering QR card", "闪光二维码卡片")]] }, cap: L("The 90-second judge path, from the PRD.", "PRD 里的 90 秒评委路径。") }
      ]
    },

    /* ------------------------------------------------------------ 03 */
    {
      id: "sushi-jerash", num: "03", year: "2026", when: "May 2026", cats: ["ai", "real"],
      title: "Sushi Jerash", meta: "Sushi Jerash · May 2026",
      cap: L("An Arabic ordering site for a real sushi shop", "为真实寿司店做的阿拉伯语点餐网站"),
      h1: L("Putting a real sushi restaurant online in about two days, in Arabic, with orders arriving on Telegram", "两天左右把一家真实的寿司店搬上线：阿拉伯语、订单直接到 Telegram"),
      lead: L("The first sushi shop in Jerash, Jordan took orders by phone. This is the site, the bot and the admin that replaced that, live in production.", "约旦杰拉什第一家寿司店原来靠电话接单。这是取代它的网站、机器人和后台，已在生产环境上线。"),
      role: L("Spec, direction, Supabase, Telegram bot, deploy, QA", "spec、指挥、Supabase、Telegram 机器人、部署、验收"),
      status: L("Live in production", "已上线"),
      stack: ["Next.js 15", "TypeScript", "Tailwind (RTL)", "Supabase", "Zustand", "Telegram Bot API", "Netlify"],
      links: [],
      verify: L("Add the live URL and 3–5 screenshots or a screen recording (menu, cart, checkout, Telegram message, admin). Repo is private.", "需补线上网址和 3–5 张截图或一段录屏（菜单、购物车、结账、Telegram 通知、后台）。仓库为私有。"),
      tile: { motion: "sushi-flow" },
      hero: { type: "motion", id: "sushi-flow", cap: L("Illustration of the order loop: site, database, Telegram, owner's phone call.", "订单闭环示意：网站、数据库、Telegram、老板电话确认。"), tag: "ill" },
      sections: [
        { h: L("Overview — Arabic first, cash on delivery, no ops burden", "概述 — 阿拉伯语优先、货到付款、没有运维负担"),
          p: L(["The owner needed something manageable from a phone. So: Arabic-only right-to-left, cash on delivery, and the owner confirms every order by phone before it counts.", "I translated those constraints into a product spec, went through two versions of it, and directed an AI coding agent to build it."], ["老板需要一个能用手机管理的东西。所以：纯阿拉伯语、从右到左、货到付款，每一单都由老板电话确认后才算数。", "我把这些约束翻译成产品 spec，迭代了两版，再指挥 AI 编程助手实现。"]),
          media: { type: "stats", items: [["~2", L("days to live", "天上线")], ["19", L("delivery areas", "个配送区域")], ["3", L("database migrations", "次数据库迁移")], ["1", L("real customer loop tested", "次真实顾客链路验证")]] } },
        { h: L("Delivery — Fees by area, snapshotted onto each order", "配送 — 按区域计费，并快照进每张订单"),
          p: L(["Version 1.1 replaced a free-delivery threshold with 19 owner-editable areas after the owner's feedback. The cart shows the fee as 'set at checkout' until an area is chosen.", "Each order stores the area name and fee at that moment, so history never drifts when prices change. Hard delete of areas is disabled on purpose, so old orders always resolve."], ["v1.1 根据老板的反馈，把「满额免运费」换成了 19 个老板可自己编辑的配送区域。选定区域之前，购物车里的运费显示为「结账时确定」。", "每张订单会记下当时的区域名和运费，改价格也不会改动历史。刻意禁用区域的硬删除，保证旧订单永远能追溯。"]),
          media: { type: "motion", id: "sushi-fees" }, cap: L("Choosing an area sets the fee and total live; the order keeps a snapshot.", "选择区域后运费和总价实时更新；订单保存当时的快照。") },
        { h: L("Owner tools — Telegram in, admin out", "老板工具 — Telegram 进，后台出"),
          p: L(["A Telegram bot pushes every order to the owner with inline action buttons, and a WhatsApp deep link lets the customer confirm themselves.", "The admin uses magic-link login with an email allowlist: today's orders, store open or closed, menu prices and availability, delivery areas."], ["Telegram 机器人把每张订单推给老板，附内联操作按钮；顾客可以用 WhatsApp 链接自己确认。", "后台用魔法链接登录，加邮件白名单：今日订单、营业状态、菜单价格与上下架、配送区域。"]) },
        { h: L("Shipping — Moving Vercel to Netlify after the owner's own test", "上线 — 老板实测后从 Vercel 迁到 Netlify"),
          p: L(["The owner tested from the shop and hit reachability problems, so I migrated the deployment and re-ran the whole loop with a real customer: order, Telegram message, phone confirmation.", "I handled Supabase, the bot, deployment and QA myself through a pull-request workflow."], ["老板在店里实测后发现访问不稳定，于是我迁移了部署，并用一位真实顾客把整个链路再跑一遍：下单、Telegram 通知、电话确认。", "Supabase、机器人、部署和验收由我亲自完成，采用 PR 工作流。"]) }
      ]
    },

    /* ------------------------------------------------------------ 04 */
    {
      id: "collaboration-canvas", num: "04", year: "2026", when: "MSc thesis · 2026", cats: ["design", "ai"],
      title: "Collaboration Canvas", meta: "KTH thesis · 2026",
      cap: L("Why student–industry collaborations break, and a canvas to hold them", "学生—企业合作为什么会散架，以及一张让它们不散的画布"),
      h1: L("Why student–industry–university collaborations break, and a shared canvas that holds them together", "学生—企业—学校的合作为什么会散架，以及一张让它们不散的共享画布"),
      lead: L("My master's thesis at KTH: nine interviews, five systemic tensions, four design principles, and one interactive prototype.", "我在 KTH 的硕士论文：九场访谈、五个系统性张力、四条设计原则，以及一个交互原型。"),
      role: L("MSc thesis · research, service design, prototype", "硕士论文 · 研究、服务设计、原型"),
      status: L("Defended, KTH 2026", "已答辩，KTH 2026"),
      stack: ["Interviews", "Thematic coding", "Service design", "Interactive prototype"],
      links: [],
      verify: L("Add prototype link, 4–6 figures, and the thesis PDF if you want it public.", "如需公开，请补原型链接、4–6 张图和论文 PDF。"),
      tile: { motion: "funnel" },
      hero: { type: "motion", id: "funnel", cap: L("From data to design: interviews to tensions to principles to the Canvas.", "从数据到设计：访谈 → 张力 → 原则 → 画布。"), tag: "ill" },
      sections: [
        { h: L("Overview — Collaboration fails at the seams", "概述 — 合作总在接缝处出问题"),
          p: L(["University-led innovation labs bring students, teachers and external partners together. The collaboration keeps failing in the same places: mismatched goals, communication gaps, unclear roles.", "The thesis asks why, and whether service design tools can hold the seams together, not just diagnose them."], ["由大学主导的创新实验室把学生、教师和外部伙伴放在一起，合作却总在同样的地方出问题：目标错位、沟通断层、角色不清。", "论文要问的是为什么，以及服务设计工具能不能把这些接缝真正连起来，而不只是诊断它们。"]),
          media: { type: "stats", items: [["9", L("stakeholder interviews", "场利益相关者访谈")], ["2", L("cases", "个案例")], ["5", L("systemic tensions", "个系统性张力")], ["4", L("design principles", "条设计原则")]] } },
        { h: L("Method — Two-layer coding across two cases", "方法 — 两个案例，两层编码")  ,
          p: L(["Nine interviews across two cases were coded in two layers. The first stays close to what people said; the second lifts it into patterns about the system.", "Five tensions came out of that second layer, and four design principles were distilled from them."], ["两个案例共九场访谈，做了两层编码。第一层贴近受访者原话；第二层把它抬升为关于系统的模式。", "第二层里浮现出五个张力，并从中提炼出四条设计原则。"]),
          media: { type: "steps", items: [["01", L("9 interviews, 2 cases", "9 场访谈、2 个案例")], ["02", L("Two-layer coding", "两层编码")], ["03", L("5 systemic tensions", "5 个系统性张力")], ["04", L("4 design principles", "4 条设计原则")], ["05", L("Collaboration Canvas", "Collaboration Canvas")], ["→", L("Next: real-world validation", "下一步：真实场景验证")]] }, cap: L("The chain of evidence in the thesis.", "论文里的证据链。") },
        { h: L("The Canvas — Seven components, one shared coordination layer", "画布 — 七个组件，一层共享的协调界面"),
          p: L(["The Collaboration Canvas is a seven-component shared coordination layer, delivered as a role-switchable interactive prototype so each party sees the same board from their own seat.", "The methodological claim: service design tools work as infrastructural devices, not only diagnostic instruments."], ["Collaboration Canvas 是由七个组件构成的共享协调层，做成可切换角色的交互原型，让各方从各自的位置看到同一块画布。", "方法论主张：服务设计工具是「基础设施装置」，而不只是诊断工具。"]) },
        { h: L("Honesty — What is claimed, and what isn't", "诚实 — 声称了什么，没有声称什么"),
          p: L(["Real-world validation is defined as the explicit next step, not claimed as done. The prototype was spec-driven and implemented by AI, and that is disclosed in the methodology chapter.", "The research design, the coding and the synthesis are mine."], ["真实场景验证被明确定义为下一步，而不是声称已完成。原型由 spec 驱动、AI 实现，并在方法论章节里披露。", "研究设计、编码和归纳由我完成。"]) }
      ]
    },

    /* ------------------------------------------------------------ 05 */
    {
      id: "teamdex", num: "05", year: "2026", when: "Sep 2026", cats: ["ai", "hack"],
      title: "Teamdex", meta: "Teamdex · Sep 2026",
      cap: L("An onboarding game where you collect your colleagues", "把入职做成「收集同事」的游戏"),
      h1: L("Making onboarding a card game, so shy newcomers have a reason to say hello", "把入职做成卡牌游戏，让社恐新人有一个开口的理由"),
      lead: L("Companies design the 'learn the material' half of onboarding and leave 'learn the people' to luck. Teamdex designs the second half.", "公司把入职的「学材料」一半设计得很完整，「学人」一半全靠运气。Teamdex 设计的是后一半。"),
      role: L("Service design, product spec, QA", "服务设计、产品 spec、验收"),
      status: L("One-day hackathon build (Uniplay)", "一天完成的黑客松作品（Uniplay）"),
      stack: ["Vite", "React", "TypeScript", "Tailwind", "framer-motion", "Supabase realtime", "Claude Code"],
      links: [GH("https://github.com/PhineasYu/TeamDex")],
      tile: { video: "teamdex", poster: "teamdex-poster", phone: true },
      hero: V("teamdex", { frame: "phone", bg: "#dfe9e2", tag: "rec", cap: L("Joining a team with a code, meeting colleagues, opening a card, the 'Who do I ask?' quiz. Recorded from the running app.", "用邀请码加入团队、认识同事、打开卡片、「该找谁」小测验。录自正在运行的应用。") }),
      sections: [
        { h: L("Overview — Onboarding has two halves", "概述 — 入职有两半"),
          p: L(["Companies do the material half well: handbooks, processes, training. The people half is left to luck. Shy newcomers lack a legitimate reason to walk up to someone, and HR can't see who has really integrated.", "The insight: a game gives a newcomer a reason to start a conversation, and makes talking to newcomers part of a colleague's job."], ["公司把材料那一半做得很完整：手册、流程、培训。人那一半全靠运气。社恐新人缺一个正当的搭话理由，HR 也看不到谁真正融入了。", "洞察：游戏给新人一个开口的理由，也让「和新人聊天」成为同事的正当工作内容。"]),
          media: IMG("assets/shots/teamdex-m.png", "Teamdex start screen: your new team, as a card collection", { frame: "phone", bg: "#dfe9e2" }), cap: L("The start screen: a team as a card collection.", "起始页：把团队变成一副卡牌。") },
        { h: L("The loop — Meet, scan, unlock, quiz, party", "闭环 — 见面、扫码、解锁、测验、派对"),
          p: L(["A newcomer meets a colleague in person, scans their card QR, and unlocks a fun fact that can only be learned face to face. Collect the key colleagues, pass the 'Who do I ask?' quiz, unlock the onboarding party.", "Colleagues set up a pixel-avatar card in under two minutes and get a notification when someone scans them. HR sees progress live."], ["新人当面认识同事，扫描对方员工卡上的二维码，解锁只有当面才知道的 fun fact。集齐关键同事，通过「遇到问题该找谁」小测验，解锁入职派对。", "同事两分钟内设置好像素头像卡片，被扫码时收到通知。HR 实时查看进度。"]) },
        { h: L("Non-goals — What I refused to build", "非目标 — 我拒绝做的东西"),
          p: L(["No leaderboard: it would create social pressure and defeat the point. No chat: the goal is a real conversation, not moving it into the app.", "QR instead of NFC, because iPhone web can't do it; NFC badges live in the vision. And no AI-generated content in v1, so the time went into the experience."], ["不做排行榜：会制造社交压力，违背初衷。不做聊天：目标是促成真实对话，而不是把对话搬进 App。", "用二维码而不是 NFC，因为 iPhone 网页做不到；NFC 工牌放进愿景。第一版也不做 AI 生成内容，时间留给体验打磨。"]),
          media: { type: "steps", items: [["✕", L("Leaderboard", "排行榜")], ["✕", L("In-app chat", "应用内聊天")], ["✕", L("Real accounts & SSO", "真实账号与 SSO")], ["✕", L("Native iOS / Android", "原生 iOS / Android")], ["✕", L("AI-generated content", "AI 生成内容")]] }, cap: L("The PRD's non-goals table.", "PRD 的「非目标」表。") },
        { h: L("Spec pack — Five documents before the first line of code", "规格包 — 动第一行代码之前的五份文档"),
          p: L(["PRD, service design, tech spec, design system, and a build plan with paste-ready prompts, plus a CLAUDE.md of working rules: local-first data adapter, always deployable at the end of each phase, no P1 before P0 is done.", "Claude Code then built against it, and a 51-second pitch film covers the story for the judges."], ["PRD、服务设计、技术方案、设计系统，以及带可直接粘贴指令的开发计划，再加一份 CLAUDE.md 工作守则：本地优先的数据适配层、每个阶段结束都保持可部署、P0 没完成前不做 P1。", "然后由 Claude Code 依此开发；另外做了一支 51 秒的路演短片向评委讲故事。"]),
          media: { type: "steps", items: [["01", L("PRD", "PRD")], ["02", L("Service design", "服务设计")], ["03", L("Tech spec", "技术方案")], ["04", L("Design system", "设计系统")], ["05", L("Build plan", "开发计划")], ["+", L("CLAUDE.md rules", "CLAUDE.md 守则")]] }, cap: L("The doc pack in the repository's docs folder.", "仓库 docs 目录里的文档包。") }
      ]
    },

    /* ------------------------------------------------------------ 06 */
    {
      id: "legacychain", num: "06", year: "2026", when: "Sep 2026", cats: ["ai", "hack"],
      title: "LegacyChain", meta: "LegacyChain · Sep 2026",
      cap: L("A family archive where AI reads but never rewrites the record", "AI 只能阅读、不能改写记录的家族档案"),
      h1: L("A family archive where AI can read the letters but never rewrite the record", "一个家族档案：AI 可以读信，但永远改写不了记录"),
      lead: L("AI opens the archive. Provenance keeps it honest. Every reading stays attached to the exact bytes it came from.", "AI 打开档案，出处让它保持诚实。每一次「读法」都始终连着它所依据的那份原始文件。"),
      role: L("Concept, architecture direction, QA", "概念、架构指挥、验收"),
      status: L("Working prototype", "可运行原型"),
      stack: ["Next.js", "TypeScript", "Solidity", "@noble/post-quantum", "Vitest", "Claude Code"],
      links: [GH("https://github.com/PhineasYu/legacychain")],
      verify: L("Confirm the event or theme it was built for, and your role vs teammates.", "需确认参赛主题，以及你与队友的分工。"),
      tile: { video: "legacychain", poster: "legacychain-poster" },
      hero: V("legacychain", { frame: "browser", tag: "rec", cap: L("Opening the vault, a heritage certificate with its QR, and the provenance view. Recorded from the running app.", "打开保险库、带二维码的传承证书、出处视图。录自正在运行的应用。") }),
      sections: [
        { h: L("Overview — A transcript is a reading, not the letter", "概述 — 转写只是一种「读法」，不是信本身"),
          p: L(["AI can read a faded 1982 letter in seconds. But models misread handwriting, fill in faded words and normalise dialect. Two generations on, people will read the convenient transcript and the scan will sit unopened.", "So every reading is stored beside its source and traceable back to it. Anyone can ask to see the exact bytes a transcript was made from."], ["AI 几秒钟就能读懂一封褪色的 1982 年家书。但模型会读错笔迹、补全模糊的字、把方言规范化。两代人之后，大家读的会是方便的转写，扫描件再也没人打开。", "所以每一次读法都存放在原件旁边，并可回溯。任何人都可以要求看到转写所依据的那份原始文件。"]),
          media: IMG("assets/shots/legacychain-vault.png", "The Family Vault with four demo heritage items", { frame: "browser" }), cap: L("The family vault, seeded with four demo items run through the real pipeline.", "家族保险库，四件演示条目都走了真实流程。") },
        { h: L("The chain — Original, derived, derived", "链条 — 原件、衍生、衍生"),
          p: L(["Upload gives a SHA-256 fingerprint, a post-quantum signature (ML-DSA-44, FIPS-204) and a hash anchored through a Solidity registry. Derived versions, AI-restored or colourised, get their own hash, signature and anchor plus a link to the parent.", "The contract rejects a second write to the same record, so the chain can only grow."], ["上传后得到 SHA-256 指纹、抗量子签名（ML-DSA-44 / FIPS-204），并通过 Solidity 注册合约锚定哈希。衍生版本（AI 修复、上色）有自己的哈希、签名和锚点，并指向原件。", "合约拒绝对同一记录的第二次写入，所以链条只会增长。"]),
          media: { type: "motion", id: "chain" }, cap: L("Each version is fingerprinted and linked to its parent.", "每个版本都有指纹，并指向它的上一级。") },
        { h: L("AI as reader — Pending until a person says otherwise", "AI 作为读者 — 在人点头之前一直是待确认"),
          p: L(["AI output arrives as 'pending'. Only a person can accept, edit or reject it, and it can never touch the file, its fingerprint or its provenance chain.", "Family attestations are stored beside a record and never over it, so disagreement is preserved as part of the history."], ["AI 的输出一律是「待确认」。只有人可以接受、编辑或拒绝，它永远碰不到文件本身、指纹或出处链。", "家人的确认或异议并列存放在记录旁边，而不是覆盖它，分歧本身也成为历史的一部分。"]),
          media: { type: "stats", items: [["3", L("protocols: fingerprint, signature, ledger", "个协议：指纹、签名、账本")], ["27", L("commits in one day", "次提交（一天内）")], ["3", L("test suites", "组测试")], ["0", L("private data on-chain", "字节私密数据上链")]] } },
        { h: L("Degrading honestly — Every subsystem says which mode it is in", "诚实地降级 — 每个子系统都会说明自己处于哪种模式"),
          p: L(["With no configuration the app runs in local mode. With keys it promotes each subsystem to live: real vision AI, a real legal identity check, anchors mined on Sepolia.", "The home page and a health endpoint always report which mode is actually running, so a demo never pretends to be more than it is."], ["不做任何配置时，应用运行在本地模式；填入密钥后，各子系统逐个升级为真实：真实的视觉 AI、真实的法律身份核验、在 Sepolia 上真正挖出的锚点。", "首页和健康检查接口始终报告当前实际运行的是哪种模式，所以演示永远不会假装自己比实际更多。"]),
          media: IMG("assets/shots/legacychain-vault.png", "Vault status", { frame: "browser" }) }
      ]
    },

    /* ------------------------------------------------------------ 07 */
    {
      id: "kikaren", num: "07", year: "2026", when: "Hackathon · 2026", cats: ["hack", "design", "ai"],
      title: "Kikaren", meta: "Kikaren · 2026",
      cap: L("A telescope for seeing each party's vision for Järva", "用望远镜看每个政党对 Järva 的愿景"),
      h1: L("Letting first-time voters in Järva look through a telescope at the future each party imagines", "让 Järva 的首投族透过望远镜，看每个政党想象中的未来"),
      lead: L("Most voter apps show parties as text and bar charts. Kikaren, Swedish for 'the telescope', turns choosing into looking.", "多数选民应用把政党做成文字和柱状图。Kikaren（瑞典语「望远镜」）把选择变成观看。"),
      role: L("Concept, problem framing, art direction, prompts", "概念、问题拆解、美术方向、提示词"),
      status: L("Hackathon prototype (PwC × Järva)", "黑客松原型（PwC × Järva）"),
      stack: ["Lovable", "TanStack Start", "React"],
      links: [GH("https://github.com/PhineasYu/vision-telescope")],
      verify: L("Confirm hackathon name, date, team and result.", "需确认黑客松名称、日期、团队和成绩。"),
      tile: { video: "kikaren", poster: "kikaren-poster" },
      hero: V("kikaren", { frame: "browser", tag: "rec", cap: L("Drag a party card into the lens, the telescope turns, and you see that party's vision for Järva in five years. Recorded from the running app.", "把政党卡片拖进镜头，望远镜转动，你看到这个政党对 Järva 五年后的愿景。录自正在运行的应用。") }),
      sections: [
        { h: L("Overview — The barrier isn't information", "概述 — 障碍不是信息")  ,
          p: L(["For 18-year-old first-time voters in Järva, the barriers are cognitive, linguistic, procedural and emotional. The last one is the most underrated: 'politics isn't for people like me'.", "So the answer isn't another voting-advice app. It is an experience that feels like looking at something, not being lectured."], ["对 Järva 的 18 岁首投族来说，障碍有认知的、语言的、流程的、情绪的。最后一种最被低估：「政治不是给我这种人的」。", "所以答案不是又一个投票建议应用，而是一种更像「看」某个东西、而不是被说教的体验。"]),
          media: { type: "steps", items: [["01", L("Cognitive: what is my vote for?", "认知：我这一票到底管什么？")], ["02", L("Language & culture: nobody at home has voted", "语言与文化：家里没人投过票")], ["03", L("Procedure: card, ID, where, when", "流程：投票卡、证件、在哪、几点")], ["04", L("Emotional: not for people like me", "情绪：这不是给我这种人的")]] }, cap: L("The barrier map that framed the concept, before any screen was designed.", "在设计任何一屏之前，用来框定概念的障碍地图。") },
        { h: L("Interaction — Insert a party, turn the view, see five years", "交互 — 插入政党，转动视角，看五年后")  ,
          p: L(["The whole idea is carried by one gesture: drag a party card into the lens. The view rotates and shows what that party's vision could look like in the neighbourhood.", "One interaction, not a feature list. The official brief was a shopping list of chatbot, map, calendar and reminders; I cut it down to the telescope."], ["整个想法由一个手势承载：把政党卡片拖进镜头。视角旋转，展示这个政党的愿景在街区里可能的样子。", "一个交互，而不是一堆功能。官方需求是一张购物清单：聊天机器人、地图、日历、提醒……我把它砍到只剩望远镜。"]),
          media: IMG("assets/shots/vision-telescope-d.png", "The lens and three party cards", { frame: "browser" }), cap: L("Sharp corners, mono captions, serif italic: art direction for a civic project.", "直角、等宽小字、衬线斜体：为公民项目定下的美术方向。") },
        { h: L("Art direction — Rules first, screens after", "美术方向 — 先定规则，再生成屏幕")  ,
          p: L(["Editorial and cinematic, not a B2B dashboard: near-black, warm off-white, sharp corners or full pills and nothing in between, no gradients.", "In Lovable I locked those rules before generating anything, then built one screen at a time with the line 'do not add anything I didn't ask for'."], ["编辑感、电影感，而不是 B2B 仪表盘：近黑背景、暖白文字、只用直角或胶囊形、没有渐变。", "在 Lovable 里，我先锁定这些规则，再一屏一屏生成，并反复强调「没让你加的一律不要加」。"]) }
      ]
    },

    /* ------------------------------------------------------------ 08 */
    {
      id: "sap-career-ignite", num: "08", year: "2026", when: "Apr 2026", cats: ["ai", "hack", "design"],
      title: "SAP Career Ignite", meta: "SAP × Capgemini × Google · Apr 2026",
      cap: L("Winning a consulting case with a clickable prototype", "用可点击的原型赢下咨询案例赛"),
      h1: L("Winning a consulting case by letting the judges click the future instead of reading about it", "让评委亲手点一点未来，而不是读一份 PPT，赢下咨询案例赛"),
      lead: L("A timed case for a fictional furniture retailer. While most teams reached for slides, we brought a live control-tower dashboard.", "一场限时案例：虚构的家居零售商。大多数队伍做 PPT，我们带来了一个现场可点击的控制塔 dashboard。"),
      role: L("Prototype lead and presenter of the solution page", "原型负责人，方案页演示者"),
      status: L("1st place, case competition round two", "案例赛第二轮第一名"),
      stack: ["Claude", "Interactive prototype", "Case consulting"],
      links: [],
      tile: { motion: "tower" },
      hero: { type: "motion", id: "tower", cap: L("Illustration of the idea: region filters, SKU-level explanations, one-click approve. The real dashboard used fictional demo data.", "思路示意：区域筛选、SKU 级解释、一键批准。真实的 dashboard 使用虚构的演示数据。"), tag: "ill" },
      sections: [
        { h: L("Overview — Three evenings, two cases", "概述 — 三个晚上，两次案例赛")  ,
          p: L(["Career Ignite is a selective programme run by SAP with Capgemini, Google and Ericsson: three evening workshops in Stockholm, a business simulation and two team cases.", "The second case: a fictional global furniture retailer needs a digital-transformation roadmap, and our five-person team plays the consultants."], ["Career Ignite 是 SAP 联合 Capgemini、Google、Ericsson 举办的选拔制项目：斯德哥尔摩三场晚间工作坊、一次商业模拟、两次小组案例。", "第二次案例：一家虚构的全球家居零售商需要数字化转型路线图，我们五人小组扮演顾问。"]),
          media: { type: "steps", items: [["14 Apr", L("Evening 1 at SAP: business simulation", "第一晚 @SAP：商业模拟")], ["21 Apr", L("Evening 2 at Google: roadmap case, 1st place", "第二晚 @Google：路线图案例，第一名")], ["28 Apr", L("Evening 3 at SAP with Ericsson: budget case", "第三晚 @SAP 联合 Ericsson：预算案例")]] } },
        { h: L("The bet — A prototype instead of slides", "这次押注 — 用原型代替 PPT")  ,
          p: L(["I proposed building a clickable supply-chain control tower with AI, and iterated it in about two hours. Region filters, SKU-level AI explanations, alert handling and a one-click 'approve all'.", "The judges clicked it themselves. Seeing the future state beat hearing about it."], ["我提议用 AI 做一个可点击的供应链控制塔，并在约两小时内迭代出来：区域筛选、SKU 级 AI 解释、告警处理、一键「全部批准」。", "评委亲手点了它。「看见」未来的样子，比「听说」更有说服力。"]),
          media: { type: "stats", items: [["1st", L("place, round two", "第二轮第一名")], ["~2h", L("to a clickable prototype", "做出可点击原型")], ["5", L("people on the team", "人的小组")], ["24", L("month roadmap (a teammate presented)", "个月路线图（队友讲解）")]] } },
        { h: L("Reflection — The first evening went badly", "反思 — 第一晚并不顺利")  ,
          p: L(["I was under-prepared, got flustered, and my weak spot was teamwork and speaking, not knowledge. Before the second evening I built a framework first, prepared templates, and fixed my role: structure and prototype.", "That loop, from a bad first evening to a result, is the part of this project I trust most."], ["我准备不足，慌了，弱项是协作和表达，而不是知识。第二晚之前，我先搭好框架、备好模板、定好自己的角色：结构和原型。", "从糟糕的第一晚到拿到结果，这个循环是这个项目里我最信任的部分。"]) },
        { h: L("What's real — Fictional client, AI-generated code", "什么是真的 — 虚构的客户，AI 生成的代码")  ,
          p: L(["The client was fictional and every number on the dashboard was demo data. The code was generated by AI under my direction; my part was the workflow, the requirements and the iteration.", "There was no real deployment, and I don't present it as one."], ["客户是虚构的，dashboard 上的每个数字都是演示数据。代码由 AI 在我的指挥下生成；我的部分是工作流、需求拆解和迭代。", "没有真实落地，我也不会把它说成落地。"]) }
      ]
    },

    /* ------------------------------------------------------------ 09 */
    {
      id: "meanwhile", num: "09", year: "2026", when: "Sep 2026", cats: ["ai", "design"],
      title: "Meanwhile", meta: "Meanwhile · Sep 2026",
      cap: L("Two squares for two friends, with no obligation to reply", "两个朋友的两个方格，没有回复的义务"),
      h1: L("Two friends, two squares, and no obligation to reply", "两个朋友，两个方格，没有回复的义务"),
      lead: L("Two friends far apart share one rectangle. Sending is complete on its own; the second square is an invitation, never a debt.", "两个相隔很远的朋友共用一个矩形。发送本身就是完整的；第二个方格是邀请，而不是欠下的债。"),
      role: L("Concept, design system, build spec", "概念、设计系统、开发 spec"),
      status: L("Front-end prototype, live", "前端原型，已上线"),
      stack: ["Lovable", "TanStack Start", "React"],
      links: [{ label: L("Open the live app", "打开在线应用"), url: "https://moment-share-square.lovable.app" }, GH("https://github.com/PhineasYu/moment-share-square")],
      verify: L("The UI says 'beside' while the spec says 'Meanwhile'. Pick one name.", "界面里叫 beside、spec 里叫 Meanwhile，需要定一个名字。"),
      tile: { video: "meanwhile", poster: "meanwhile-poster", phone: true },
      hero: V("meanwhile", { frame: "phone", bg: "#efefef", tag: "rec", cap: L("Switching person, adding a moment, sending an emoji, and the pairing. Recorded from the running app.", "切换人、添加瞬间、发送 emoji、配对。录自正在运行的应用。") }),
      sections: [
        { h: L("Overview — Removing the pressure to reply", "概述 — 拿掉回复的压力")  ,
          p: L(["A moment is a photo taken right now or one huge emoji. The left square is one person's, the right is the other's. Nothing in the interface asks for a reply.", "Timestamps show each person's local time and city, so distance is part of the picture."], ["一个「瞬间」是此刻拍的照片，或者一个巨大的 emoji。左边是一个人的，右边是另一个人的。界面里没有任何东西催你回复。", "时间戳显示各自的当地时间和城市，让距离本身成为画面的一部分。"]) },
        { h: L("Try it — The live app, in a phone frame", "试一试 — 在线应用，装进手机框")  ,
          p: L(["This is the published app running inside the page. Switch to Mei, add a moment, send an emoji and watch the pairing."], ["这是已发布的应用，直接运行在页面里。切换到 Mei，添加一个瞬间，发一个 emoji，看配对。"]),
          media: { type: "embed", src: "https://moment-share-square.lovable.app", frame: "phone", open: "https://moment-share-square.lovable.app" }, cap: L("Live embed of the published prototype (if it does not load, use Open). The photos are seed images.", "已发布原型的内嵌版本（若未加载，请点 Open）。照片是示例图片。") },
        { h: L("System — Two colours, one motion moment", "系统 — 两种颜色，一个动效时刻")  ,
          p: L(["Black and white only: 2px borders, zero radius, one typeface, sentence case, no shadows. The single motion moment is the pairing animation, and it snaps instantly under prefers-reduced-motion.", "The rectangle is always 2:1 and each square 1:1, so the whole product is one shape."], ["只有黑和白：2px 边框、零圆角、单一字体、句首大写、无阴影。唯一的动效是配对动画，在 prefers-reduced-motion 下会直接跳到终态。", "矩形永远是 2:1，每个方格是 1:1，整个产品就是一个形状。"]),
          media: { type: "stats", items: [["2", L("colours", "种颜色")], ["2px", L("borders", "边框")], ["0", L("border radius", "圆角")], ["1", L("motion moment", "个动效时刻")]] } },
        { h: L("Spec — The whole build in one document", "Spec — 整个构建写在一份文档里")  ,
          p: L(["Before generating anything I wrote the full Lovable build spec: design tokens, the data model, the ordering rule, the pairing animation.", "38 iterations followed, each one a small correction against that spec."], ["在生成任何东西之前，我先写下完整的 Lovable 开发 spec：设计 token、数据模型、排序规则、配对动画。", "之后迭代了 38 次，每一次都是对照这份 spec 的小修正。"]) }
      ]
    },

    /* ------------------------------------------------------------ 10 */
    {
      id: "chroma-reader", num: "10", year: "2026", when: "Sep 2026", cats: ["ai"],
      title: "Chroma Reader", meta: "Chroma Reader · Sep 2026",
      cap: L("A study reader that colours sentences by mastery", "按掌握程度给句子上色的学习阅读器"),
      h1: L("A study reader that colours every sentence by how well you know it, at the speed of a keypress", "一个按掌握程度给每个句子上色的阅读器，快到只需一次按键"),
      lead: L("Highlighting is binary. Chroma Reader shows gradations of mastery across a whole text at a glance.", "划重点是二元的。Chroma Reader 让你一眼看到整篇文字里不同程度的掌握。"),
      role: L("Concept, interaction spec", "概念、交互 spec"),
      status: L("Live app", "在线应用"),
      stack: ["Lovable", "TanStack Start", "Lovable Cloud"],
      links: [{ label: L("Open the live app", "打开在线应用"), url: "https://chroma-reader-study-tool.lovable.app" }, GH("https://github.com/PhineasYu/chroma-reader-study-tool")],
      tile: { video: "chroma", poster: "chroma-poster" },
      hero: V("chroma", { frame: "browser", tag: "rec", cap: L("Opening the sample reading and marking sentences with keys 1 to 5. Recorded from the running app.", "打开示例文章，用 1 到 5 键给句子标色。录自正在运行的应用。") }),
      sections: [
        { h: L("Overview — Five colours, nothing else", "概述 — 只有五种颜色")  ,
          p: L(["Green for got it, amber for shaky, red for don't get it, blue for key idea, grey for skip. Colour is background only and the text stays dark, so reading never gets harder.", "The app began as one prompt-length brief and was refined over 64 iterations."], ["绿色是懂了，琥珀色是模糊，红色是不懂，蓝色是关键想法，灰色是跳过。颜色只用作背景，文字保持深色，所以阅读永远不会变难。", "整个应用从一份提示词长度的说明书开始，之后迭代了 64 次。"]),
          media: IMG("assets/shots/chroma-reading.png", "A reading coloured by mastery with a progress panel", { frame: "browser" }), cap: L("The reading view: colour per sentence and a progress panel by mastery.", "阅读视图：每句一个颜色，侧边是各掌握程度的进度。") },
        { h: L("Try it — The live app", "试一试 — 在线应用")  ,
          p: L(["Open the sample reading, click a sentence and press 1 to 5. The selection moves on by itself."], ["打开示例文章，点一个句子，按 1 到 5。选中会自动移到下一句。"]),
          media: { type: "embed", src: "https://chroma-reader-study-tool.lovable.app", frame: "browser", ratio: "16/10", open: "https://chroma-reader-study-tool.lovable.app" }, cap: L("Live embed of the published app.", "已发布应用的内嵌版本。") },
        { h: L("Speed — No menus, no modals", "速度 — 没有菜单，没有弹窗")  ,
          p: L(["Click a sentence and press a key: the colour is assigned instantly and the selection moves to the next one. Marking a page takes seconds.", "Speed is the feature. If marking feels like work, nobody will do it."], ["点一个句子按一个键：颜色立刻生效，选中移到下一句。标完一页只要几秒。", "速度就是功能。如果标注像干活，就没人会去做。"]) },
        { h: L("Editorial — A well-set book page, not a dashboard", "编辑感 — 像一页排得很好的书，而不是仪表盘")  ,
          p: L(["Serif body, 680px measure, line-height 2, generous margins, colour with 3px rounded corners.", "Data is stored as segments; rendering reads the reader's own colour first and falls back to an AI label, which I left empty in v1 on purpose."], ["衬线正文、680px 行宽、行高 2、宽松页边距，色块带 3px 圆角。", "数据以句段存储；渲染时先读读者自己的颜色，再回退到 AI 标签，v1 里我有意让它留空。"]) }
      ]
    },

    /* ------------------------------------------------------------ 11 */
    {
      id: "voi", num: "11", year: "2025", when: "Aug–Dec 2025", cats: ["design"],
      title: "Voi Inclusive Design", meta: "KTH × Voi Technology · 2025",
      cap: L("Why women ride less, and a helmet flow designed around it", "女性为什么骑得少，以及围绕它设计的头盔流程"),
      h1: L("Finding that women ride shared scooters less because of safety, not price, then designing the helmet flow around it", "发现女性少骑共享滑板车是因为安全感而不是价格，再围绕它设计头盔流程"),
      lead: L("A KTH course project with Voi Technology. The assumed cause was price. The field research said otherwise.", "与 Voi Technology 合作的 KTH 课程项目。原本假设的原因是价格，田野研究给出了不同答案。"),
      role: L("Co-led research, in-app flow design, business case", "联合带领研究、App 内流程设计、商业测算"),
      status: L("KTH × Voi, Aug–Dec 2025", "KTH × Voi，2025 年 8–12 月"),
      stack: ["Field research", "Surveys", "Service + UI design", "Business case"],
      links: [],
      verify: L("Add visuals (helmet concept, flow screens) if Voi allows publication.", "如 Voi 允许公开，请补头盔概念与流程截图。"),
      tile: { motion: "voi-flow" },
      hero: { type: "motion", id: "voi-flow", cap: L("Illustration of the helmet flow: unlock, wear, ride, return.", "头盔流程示意：解锁、佩戴、骑行、归还。"), tag: "ill" },
      sections: [
        { h: L("Overview — Ridership among Gen-Y women was low", "概述 — Gen-Y 女性的使用率偏低")  ,
          p: L(["The obvious hypothesis was price. We went to the street instead.", "Thirty-seven street interviews and 47 branching surveys traced the gap to perceived safety, which reframed the whole project."], ["最直接的假设是价格。我们选择走到街上去问。", "37 场街头访谈和 47 份分支问卷，把差距追溯到「感知安全」，整个项目因此被重新定义。"]),
          media: { type: "stats", items: [["37", L("street interviews", "场街头访谈")], ["47", L("branching surveys", "份分支问卷")], ["+645k", L("SEK / month, projected", "SEK/月（预测）")]] } },
        { h: L("Concept — A helmet built into the basket", "概念 — 与车筐集成的智能头盔")  ,
          p: L(["The team designed a smart helmet integrated with the scooter's basket, and iterated on feedback from Voi.", "My part was the end-to-end in-app flow, inside Voi's existing design language."], ["团队设计了与滑板车车筐集成的智能头盔，并根据 Voi 的反馈迭代。", "我负责端到端的 App 内流程，并且必须落在 Voi 现有的设计语言里。"]) },
        { h: L("Flow — Unlock sequencing, wear confirmation, return detection", "流程 — 解锁顺序、佩戴确认、归还检测")  ,
          p: L(["The flow covers unlock sequencing, wear confirmation and return detection, so that a helmet is a natural part of starting a ride and not an extra chore.", "Where it touches Voi's existing patterns, I used them instead of inventing new ones."], ["这个流程覆盖解锁顺序、佩戴确认和归还检测，目的是让头盔成为开始骑行的自然一步，而不是额外的负担。", "凡是碰到 Voi 现有的模式，我都直接沿用，而不是另造新的。"]) },
        { h: L("Business case — Grounded in a real supplier quote", "商业测算 — 基于真实供应商报价")  ,
          p: L(["I contributed a business case projecting +645k SEK per month, built on a real supplier quote for the helmet.", "It is a projection, and I present it as one."], ["我参与了商业测算：预计每月 +645k SEK，基于头盔的真实供应商报价。", "它是预测，我也只把它当预测来讲。"]) }
      ]
    },

    /* ------------------------------------------------------------ 12 */
    {
      id: "kodiak-hub", num: "12", year: "2025", when: "Jun–Sep 2025", cats: ["design"],
      title: "Kodiak Hub", meta: "Kodiak Hub · 2025",
      cap: L("Design work inside a live B2B SaaS design system", "在真实 B2B SaaS 设计系统里做设计"),
      h1: L("Designing inside a live B2B design system, and leaving a usability-testing process behind", "在真实的 B2B 设计系统里设计，并留下一套可用性测试流程"),
      lead: L("A summer as UI/UX design intern at a supplier-relationship-management platform of about 200 people in Stockholm.", "在斯德哥尔摩一家约 200 人的供应商关系管理平台做 UI/UX 设计实习的一个夏天。"),
      role: L("UI/UX Design Intern", "UI/UX 设计实习生"),
      status: L("Jun–Sep 2025, Stockholm", "2025 年 6–9 月，斯德哥尔摩"),
      stack: ["Figma", "Design systems", "Usability testing", "Jira"],
      links: [],
      verify: L("Company work: check with Kodiak what visuals are publishable before adding screenshots.", "公司项目：放截图前，先确认 Kodiak 允许公开的范围。"),
      tile: { motion: "breakpoints" },
      hero: { type: "motion", id: "breakpoints", cap: L("Illustration of the breakpoint decision: evidence from 1,000+ real users set a desktop-first strategy.", "断点决策示意：1,000+ 真实用户的数据支撑了桌面优先的策略。"), tag: "ill" },
      sections: [
        { h: L("Overview — Two features, end to end", "概述 — 两个功能，端到端")  ,
          p: L(["I designed two features inside the existing design system: a Bill of Materials and login/authentication.", "The BOM broke into five development tickets and was delivered before the sprint boundary."], ["我在现有设计系统内端到端设计了两个功能：物料清单（BOM）和登录/认证。", "BOM 被拆成五张开发工单，在 sprint 结束前交付。"]),
          media: { type: "stats", items: [["2", L("features, end to end", "个功能端到端")], ["5", L("dev tickets, on time", "张开发工单，按时交付")], ["4", L("modules audited", "个模块审计")], ["1,000+", L("users' data analysed", "用户数据分析")]] } },
        { h: L("System — Audit four modules, write the pattern rules down", "系统 — 审计四个模块，把模式规则写下来")  ,
          p: L(["I audited four product modules and documented reusable rules: table types, column standards, filter behaviour, destructive actions.", "I also built a six-state supplier-lifecycle indicator and extended the badge system."], ["我审计了四个产品模块，并记录下可复用的规则：表格类型、列规范、筛选行为、破坏性操作。", "还做了一个六状态的供应商生命周期指示器，并扩展了徽标体系。"]) },
        { h: L("Evidence — Breakpoints from real usage data", "证据 — 用真实使用数据定断点")  ,
          p: L(["Instead of assuming, I analysed responsive usage from more than 1,000 real users to set the product's breakpoint strategy: desktop-first, on evidence.", "Assumptions about mobile use were tested against what people actually did."], ["我没有凭感觉，而是分析了 1,000 多名真实用户的响应式使用数据，来确定产品的断点策略：桌面优先，且有证据。", "关于移动端使用的假设，被拿去和人们实际的行为对照。"]),
          media: { type: "motion", id: "breakpoints" } },
        { h: L("Process — The company's first structured usability test", "流程 — 公司第一套结构化可用性测试")  ,
          p: L(["With my design mentor I set up the company's first structured usability-testing process for an unreleased AI document-management feature: think-aloud sessions, the layout iterated between rounds, key recommendations adopted.", "The process was embedded into the team's Jira workflow and outlived the internship."], ["我与设计导师一起，为一个尚未发布的 AI 文档管理功能建立了公司第一套结构化可用性测试流程：出声思考、轮次间迭代布局、关键建议被采纳。", "这套流程被嵌入团队的 Jira 工作流，在实习结束后仍在使用。"]) },
        { h: L("AI tools — Evaluating Figma Make, Lovable and Uizard", "AI 工具 — 评估 Figma Make、Lovable、Uizard")  ,
          p: L(["I compared them on output quality, prompt cost, stability and how well they fit the design system, and shared the resulting workflow, which the design team adopted."], ["我从输出质量、提示成本、稳定性以及与设计系统的契合度来比较它们，并分享了由此得出的工作流，设计团队采用了它。"]) }
      ]
    }
  ];
})();
