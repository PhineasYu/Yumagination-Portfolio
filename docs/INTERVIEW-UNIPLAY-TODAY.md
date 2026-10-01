# Uniplay 面试 · 今天下午 · 轻量版

> 你已经在他们自己的黑客松拿了第一，他们见过你做事。今天不是证明你会，而是让他们看到：**你怎么想、怎么做、怎么跟人合作**。
> 不用背稿。记住下面三句话、两个故事、一句诚实的话，就够了。

---

## 0. 心态（30 秒读完）

- 这是一次聊天，不是考试。他们想知道「和你一起工作 12 周是什么感觉」。
- 不会的就说不会，然后说你会怎么学。这在 AI 实习里是加分项。
- 慢一点说话。停顿两秒没关系。
- 只讲真实发生过的事。

---

## 1. 三句话（开场就用）

1. **我是谁** — *"I'm Yunfei. I'm a UX designer turned AI-native builder: I frame the problem, write the spec, direct coding agents to build it, and test it with real people."*
2. **我有什么证据** — *"You've seen Teamdex at your hackathon. Since then I've kept building: my portfolio has more than ten working prototypes you can open, not slides."*
3. **我想做什么** — *"I want to make AI output something a person can check, trust and learn from. Turning company knowledge into learning is exactly that problem."*

### 60 秒自我介绍（自然说，不用一字不差）

"I studied packaging engineering, worked in Unilever's R&D packaging lab in Shanghai, then moved into design and finished my master's in Integrated Product Design at KTH last month.

This year I became AI-native. I write the spec, direct agents like Claude Code to build it, and test it myself. I won your hackathon with Teamdex, an onboarding game where newcomers collect their colleagues. I've also built a canvas where Claude groups your saved chats and links and shows the reason and confidence for every placement, and a family-archive prototype where AI readings stay 'pending' until a person accepts them.

I'm not a traditional software engineer, and I'll be honest about that. What I bring is a fast loop from idea to prototype to feedback, and the habit of making AI output checkable."

---

## 2. 两个故事就够了（各 90 秒）

### 故事 A · Teamdex（他们最熟，用来聊「怎么做」）

- **问题**：入职时，公司把「学材料」做得很好，「认识人」全靠运气。
- **我做了什么**：先写 PRD、设计系统、技术 spec、带提示词的 build plan，再用 Claude Code 搭。
- **关键取舍**：不做排行榜（制造社交压力）、不做聊天、第一版不用 AI 生成内容，把一天的时间都给体验。
- **结果**：第一名。
- **学到**：给 agent 的不是愿望，是工作守则。砍功能和做功能一样重要。
- **接到岗位**：*"Onboarding is company knowledge turned into an experience. The next step I'd want to test is feeding real company material into it, with AI-generated content, and evaluating it."*

### 故事 B · Full Context Canvas（用来聊「AI 怎么做得可信」）

- **问题**：大家的对话和收藏散落在 Claude、ChatGPT、Chrome、YouTube，没人敢交给 AI 整理，因为看不到东西去了哪里。
- **我做了什么**：Claude 分组，每次归位都给出**理由和把握度**；低于 60% 的进**复核队列**，一键保留或移除；每次修正记日志；每张卡都能**连回原平台**。还做了 Chrome 扩展导出书签。
- **接到岗位**：*"That's source grounding and evaluation in a small form: make the output checkable first, then make it smart."*

> 如果他们问到提示词 / 工作流 / 评估，再拿出 **Kodiak Hub**：你设计了两段式 AI 工作流（一个模型写提示，另一个做原型，设计系统作为约束贴进去），先用评分表比较了 Figma Make、Uizard、Lovable，再写成指南给团队。**这是 UI 方向的工作流，不是 RAG**，被追问就直说。

---

## 3. JD 里每一条，你各有一句话

| JD 写的 | 你说一句 |
|---|---|
| AI-native / agentic coding | 所有项目都是我写 spec、Claude Code 和 Lovable 执行，我验收。 |
| Own AI project | Full Context Canvas、LegacyChain、Dossier，都能现场打开。 |
| Source grounding | Canvas 每张卡连回原平台；LegacyChain 每次 AI 读法都连着原始文件。 |
| Structured generation | Dossier：把口述内容抽取成严格的 JSON 字段，带重试。 |
| Agents / orchestration | Microsoft MicroHack：三个 agent 用一个工作流串起来，人工批准后才下单；我读了 trace。 |
| Test & evaluate | Canvas 的把握度阈值和复核队列；MicroHack 的 5 题评估；Kodiak 的工具对比评分表。 |
| Fast iterator | Teamdex 一天；Sushi Jerash 两天上线给真实餐厅用。 |
| Learning mindset | 我是 UX 出身，习惯先研究人怎么用；Kodiak 我建立了公司第一套结构化可用性测试。 |
| Present findings | 论文做的是多方协作（学生、企业、学校），我习惯把发现讲给不同的人听。 |

---

## 4. 一句诚实的话（三个短板，提前想好就不慌）

| 他们可能问 | 你可以这样说 |
|---|---|
| **代码写得怎么样？** | *"I direct agents for most of the code. I read TypeScript and Python, review diffs and test the result. I won't pretend I'd beat a senior engineer at a whiteboard."* |
| **做过 RAG / 向量数据库吗？** | *"Not with a vector database yet. I've built source-grounded features where every claim links back to its origin, and I'd love to learn retrieval properly in the first weeks."* |
| **瑞典语？**（JD 写了 Swedish and English） | *"English is my working language. I'm learning Swedish and I'm happy to keep going. Day to day I'd work in English for now."* — 照实说，不要夸大。 |

---

## 5. 如果问「12 周你想做什么」（是想法，不是承诺）

1. **前 2 周**：拿一份真实材料（手册、视频字幕、链接），做带**来源引用**的课程草稿，每句话能点回原文。
2. **3–5 周**：同一份材料用不同提示词 / 模板各生成一版，按「忠于原文、好读、有小测」打分比较。
3. **6–9 周**：试一种新形式，比如内联小测验，或者 Teamdex 那种「谁是谁、该问谁」的知识卡。
4. **10–12 周**：演示和报告：哪些值得继续做、哪些要改、哪些先搁置。

---

## 6. 你问他们的问题（挑两个）

- What would a great 12-week outcome look like, and what would make you say "park it"?
- How do you evaluate the quality of AI-generated learning content today? Where is the bottleneck?
- Which kinds of company material are the hardest to turn into good learning?
- What does the weekly 1:1 look like in practice?

---

## 7. 面试前 10 分钟

- [ ] 浏览器只留一个窗口，关掉通知
- [ ] 提前打开这几个，准备屏幕共享：
  - 作品集：https://phineasyu.github.io/Yumagination-Portfolio/
  - Teamdex 代码：https://github.com/PhineasYu/TeamDex
  - Full Context Canvas 代码：https://github.com/PhineasYu/Full-context-canvas
  - LegacyChain 线上原型：https://legacychain-one.vercel.app/
  - Dossier 演示：https://dossier-parenting.lovable.app/
- [ ] 喝口水，读一遍第 1 节
- [ ] 记住：他们已经选过你一次了

> 结束时可以说一句：*"Thanks. Whatever happens, I really enjoyed building Teamdex for your hackathon, and I'd love to keep building on this problem with you."*
