# Uniplay · AI Engineer Internship · 面试准备（2026-10-01）

> 原则：只讲项目里真实发生过的事。JD 里你还没做过的（RAG、向量库、知识图谱），直接承认，并说你打算怎么补。面试官最怕的是「什么都会一点」，最喜欢的是「我做过 X，结果是 Y，我学到 Z」。

## 0. 先记住这三句话

1. **我是谁**：I'm a UX designer turned AI-native builder. I frame the problem, write the spec, direct coding agents to build it, and test it with real people.
2. **我有什么证据**：I won your own hackathon with Teamdex, and I have more than ten working AI prototypes you can open, not slides.
3. **我想做什么**：I want to be an AI engineer who thinks like a UX designer: make the AI's output something a person can check, trust and learn from. That is exactly what turning company knowledge into learning is about.

## 1. 60 秒自我介绍（英文，背下来）

"I'm Yunfei. I studied packaging engineering, then moved into UX and product design, and I'm finishing my master's at KTH. This year I became AI-native: I frame a problem, write the spec, and direct agents like Claude Code to build it, then I test it with real people.

I won first place at your hackathon with Teamdex, an onboarding game where newcomers collect their colleagues. Since then I've built things that are close to what you describe: a canvas that groups a person's chats and bookmarks with Claude and shows the reason and confidence for every placement; a family-archive prototype where AI output stays 'pending' until a person accepts it; and a multi-agent workflow on Microsoft Foundry with an evaluation.

I'm not a traditional software engineer, and I'll be honest about that. What I bring is a fast loop from idea to prototype to feedback, and a habit of making AI output checkable. I'd love to spend twelve weeks doing that on real company knowledge."

## 2. JD 逐条对照：你有什么证据

| JD 要求 | 你的证据（真实的） | 在哪看 |
|---|---|---|
| **AI-native mindset** | 所有项目都是用 Claude Code / Lovable 做的；方法论：定义 → spec → 指挥 → 验证；CLAUDE.md 工作守则 | 网站 Method；Teamdex 有 5 份规格文档 + 带可粘贴提示词的 build plan |
| **Own AI projects（至少一个具体项目）** | Full Context Canvas（Claude 分组 + 置信度 + 复核队列 + Chrome 插件）；LegacyChain（AI 读信，输出「待确认」）；Dossier（语音 → 结构化条目）；MicroHack（三个 agent + 工作流 + 5 题评估） | 网站 Work；GitHub 仓库 |
| **Source grounding / RAG 概念** | Full Context Canvas：每个卡片能连回原平台，草稿里每句话有可点击的来源；Dossier：问答只基于已保存的数据；LegacyChain：每次「读法」都连着原始文件 | 各项目页 |
| **Structured generation** | Dossier：服务端把口述抽取成严格 JSON（child_ids、kind、category、title、text、value），带重试；Full Context Canvas：分组结果 | Dossier 页「Tech」段 |
| **Agents / orchestration** | MicroHack：三个 Foundry agent（需求感知、库存优化、补货）共用一个 Fabric Data Agent，用 Workflow 串起来，人工审批后才下单；会读 trace | MicroHack 页（有截图） |
| **Test & evaluate** | Full Context Canvas：置信度低于 60% 进复核队列，每次修正都记日志，下一步是用两周自己的数据统计修正次数；MicroHack：5 题评估；LegacyChain：Vitest 测试哈希与签名；Kodiak：比较 Figma Make / Uizard / Lovable | 各项目页 |
| **Extreme drive / fast iterator** | Teamdex 一天做完并拿第一；Disco Fever 用 11 条提示词；NotchBreak 一天；Sushi Jerash 两天上线真实餐厅 | 网站 |
| **Learning mindset** | Teamdex 本身就是关于「人怎么学会认识同事」；你是 UX 背景，懂怎么研究人；Kodiak 建立了公司第一套结构化可用性测试 | Teamdex、Kodiak |
| **Technical curiosity（TS / Python / 前端）** | TypeScript/React/Next.js 项目；Revive：Python 脚本核对三个月的数据；Supabase、Chrome MV3 扩展 | 项目 stack |
| **和工程师、HR、产品设计师协作** | Kodiak：在真实 B2B 设计系统里和开发一起交付，工单拆分；SAP Career Ignite 团队案例；Collaboration Canvas 论文（多方利益相关者） | 对应项目页 |

## 3. 四个故事（STAR，每个 90 秒）

### A. Teamdex：在 Uniplay 自己的黑客松拿第一
- **Situation**：一天时间，题目是入职体验。我发现公司把「学材料」设计得很好，「学人」靠运气。
- **Task**：我负责服务设计、产品 spec、验收；用 Claude Code 开发。
- **Action**：先写 PRD、设计系统、技术 spec、带提示词的 build plan 和一份工作守则（本地优先、每个阶段结束都能部署、P0 没做完不做 P1）。决定不做排行榜（会制造社交压力）、不做聊天、v1 不做 AI 生成内容，把时间放在体验上。
- **Result**：一等奖。 **What I learned**：写给 agent 的不是愿望，是工作守则；砍功能和做功能一样重要。
- **连到 JD**：入职 = 把公司知识变成体验；下一步我想把这个「游戏化」的想法接上 AI 生成的内容，并评估它。

### B. Full Context Canvas：让 AI 的判断看得见
- **Situation**：人们的对话和收藏散在 Claude、ChatGPT、Chrome、YouTube、X；没人敢把它们交给 AI，因为看不到东西去了哪里。
- **Action**：用 Claude 分组，每次归位给出理由和把握度；低于 60% 进复核队列，一键保留或移除，每次修正记日志；每个卡片连回原平台。做了 Chrome 扩展，读取所有书签并导出 Markdown 上下文。
- **Result**：可运行的原型和扩展；下一步是用我自己的书签跑两周，记录我修正了多少次。
- **连到 JD**：这就是 source grounding + evaluation 的思路：先让输出可检查，再谈聪明。

### C. MicroHack：三个 agent，一个工作流，人来批准
- 三个 Foundry agent（需求感知、库存优化、补货下单），共用一个 Fabric Data Agent；补货 agent 起草采购单，然后停下来问「批准、取消还是修改」，回答 YES 才提交。
- 我读了 trace（每一步调用了哪个 agent、哪个工具、花了多久），发现大部分时间花在 Fabric 调用上。完成全部 5 个挑战和进阶任务，包括 5 题评估。
- **诚实**：这是学习，没有成绩；场景是微软给的。

### D. Revive 实习：真实数据、自动核对
- 业务方要每个零售商的私人销售佣金，并且要和独立来源核对。我把需求拆成 Claude Code 能执行的任务，脚本逐行核对、标出不匹配的行，跑了三个月的数据，做成 7 页汇报。
- **学到**：对账比生成更难，「标出不匹配」比「看起来对」更有价值。
- 数据是公司的，所以不要讲具体数字。

## 4. 你的短板：直接说，并带着计划

| 他们可能问 | 诚实的回答 |
|---|---|
| 你手写过多少代码？ | "I direct agents for most of the code. I can read TypeScript and Python, review diffs, and write tests. I'm not going to claim I'd beat a senior engineer at a whiteboard." |
| 做过 RAG / 向量库吗？ | "Not with a vector database yet. I've built source-grounded answers, where every claim links to its origin, and the same mindset applies. This week I'm building a small RAG prototype with citations so I can show it." （说了就要做：见第 6 节） |
| 知识图谱？ | "Full Context Canvas is a graph of saves and groups with overlapping membership, but it isn't a formal knowledge graph. I'd love to learn that properly." |
| 怎么评估 AI 输出？ | "Start with something checkable: confidence thresholds, a review queue, logging each correction. Then compare outputs side by side on representative material, which is what the internship asks for." |
| 为什么不做设计岗？ | "I want to be the person who builds and evaluates the thing, not hands over a mock-up. My design background is how I decide what's worth building." |

## 5. 如果他们让你说「12 周想做什么」（想法，不是承诺）

1. **第 1–2 周**：拿一份真实的公司材料（手册、视频字幕、链接），做一个带来源引用的课程草稿生成器。每一句话能点回原文。
2. **第 3–5 周**：加一个小型评估：同一份材料，不同提示词 / 模板各生成一版，按「忠实于原文、可读、有测验」打分，记录哪个更好。
3. **第 6–9 周**：试一种新形式：内联小测验，或者把材料变成「谁是谁、问谁」的知识卡（Teamdex 的思路）。
4. **第 10–12 周**：演示和报告：哪些值得继续做、哪些改进、哪些搁置（这正是 JD 写的最后一项）。

## 6. 今晚如果还有时间：补最大的洞（可选，1–2 小时）

做一个 **最小的 RAG demo**：上传一个 PDF 或粘贴一段文字 → 切块 → 向量检索 → 回答并显示引用的原文句子。用 Claude Code 做，放在 GitHub，面试时说 "I built this last night to learn it"。这比任何说辞都有力。想做的话告诉我，我可以帮你现在就搭。

## 7. 你可以问他们的问题

- What does a good 12-week outcome look like, and what would make you say "park it"?
- How do you evaluate the quality of AI-generated learning content today? What is the bottleneck?
- What kinds of company material are hardest to turn into good learning?
- How do engineers, HR experts and designers split the work on a single feature?
- What does the weekly 1:1 look like in practice?

## 8. 面试前检查清单

- [ ] 打开并测试：Teamdex GitHub、Full Context Canvas 原型（网站里的嵌入）、LegacyChain 线上原型、Dossier 演示（点「Just look around」）
- [ ] 网站首页在手机和电脑上各打开一遍（还没部署；`polish` 分支本地预览）
- [ ] 准备屏幕共享：只开一个浏览器窗口，关掉通知
- [ ] 背熟第 1 节；第 3 节的故事选两个练习
- [ ] 准备好回答「为什么是 Uniplay」：你赢了他们的黑客松，也真的想做「把公司知识变成学习」这件事
