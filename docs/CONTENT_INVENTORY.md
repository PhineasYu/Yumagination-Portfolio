# 内容盘点 · Content Inventory

更新：2026-09-29。这份文档回答三件事：**找到了什么、放进站里的依据是什么、还缺什么需要你回答。**

## 1. 我读过的来源

| 来源 | 读到了什么 | 怎么用 |
|---|---|---|
| GitHub（PhineasYu 名下 17 个仓库） | 其中 12 个是你的作品，逐个克隆读了 README、文档、代码结构、提交数 | 站内 12 个项目页的事实来源 |
| Claude Code 会话列表（7 条） | 标题、时间、状态 | 只能看到标题，读不到对话内容（见第 4 节） |
| Google Drive | CV_UX-Engineer_Scania、简历 bullets、情绪回响作品集文案、SAP 参考文档 | 经历、Kodiak、Voi、Collaboration Canvas 的事实来源 |
| Notion | SAP 项目档案、求职 project instructions、作品集诊断、岗位速查表、PWC/Aris/Deloitte 黑客松笔记 | SAP、Kikaren、获奖、定位叙事 |

站点的「诚实上限」沿用你自己在求职 instructions 里定的原则：**不虚构、AI 生成的代码明说是 AI 生成、虚构数据明说是虚构。**

## 2. 已放进站里的项目（12 个）

| # | 项目 | 类型 | 事实依据 | 封面 |
|---|---|---|---|---|
| 01 | Full Context Canvas | AI 原生 · 产品 | 仓库 + docs/RESEARCH + PRODUCT_PLAN | 真实截图 + 可运行原型（`demos/`） |
| 02 | Dossier | AI 原生 · 黑客松 | 仓库 PRD/roadmap（134 次提交） | 生成封面 |
| 03 | Sushi Jerash | AI 原生 · 真实上线 | 私有仓库 README + CV | 生成封面（缺截图） |
| 04 | Collaboration Canvas | 硕士论文 | CV + Notion 论文页 | 生成封面（缺图） |
| 05 | Teamdex | AI 原生 · 黑客松 | 仓库 CLAUDE.md + 5 份 docs | 真实截图 |
| 06 | LegacyChain | AI 原生 · 黑客松 | 仓库 README + 测试 + 合约 | 真实截图 |
| 07 | Kikaren | 黑客松 · 设计 | 仓库 + Notion PWC 笔记 | 真实截图 |
| 08 | SAP Career Ignite | AI 原型夺冠 | Notion SAP 档案 + CV | 生成封面 |
| 09 | Meanwhile | AI 原生 · 设计系统 | 仓库 README（完整 spec） | 真实截图（手机） |
| 10 | Chroma Reader | AI 原生 | 仓库 README（原始 prompt） | 真实截图 |
| 11 | Voi Inclusive Design | 用户研究 | CV + 简历 bullets | 生成封面（缺图） |
| 12 | Kodiak Hub | 实习 | CV | 生成封面（缺图，需确认可公开范围） |

另有「更小的作品」四个：Chronicool、Defense Countdown Clock、ADHD Stride、Personal Daily Grid。

## 3. 需要你确认的（浏览器里在网址后加 `?draft` 会显示红色虚线提示）

**必须确认，否则不要分享链接**
1. **Dossier**：赛事名称和成绩；它的 PRD 里写有「1 个真实孩子（已获许可）」，站内**没有**使用任何该孩子的信息，你自己截图时也请只用虚构孩子。
2. **Aris & Friends 奖项**：你的笔记里写的是「Thinking outside of the box Prize」，请确认奖项名称。
3. **Deloitte Spark 黑客松第三名**：年份不明，请补。
4. **Kodiak Hub**：公司项目，先问清楚能公开什么，再加截图。
5. **Meanwhile**：界面里叫 `beside`，spec 里叫 `Meanwhile`，定一个名字。

**缺素材（补了会明显更好看）**
- Sushi Jerash：线上网址 + 3–5 张截图（菜单、购物车、结账、Telegram 通知、后台）。
- Collaboration Canvas：原型链接、4–6 张图，论文 PDF 如愿公开。
- Voi：头盔概念图、App 流程截图（先问 Voi 是否允许）。
- Dossier：进入登录后的主界面截图（时间线、档案），我这边进不去。

**你的分工 / 团队**：LegacyChain、Kikaren、Teamdex、SAP 是否有队友？站内现在按「你的角色」写，队友情况请补一句，瑞典面试文化偏 “we”。

## 4. 还没能放进来的（需要你提供信息）

**Claude Code 会话**（我只能看到标题，读不到内容）：
- 「degree 字段」、「Logging errors」（一个在 StoneLeap 里做的游戏）、「Vercel plugin installation」、「作品集网站 content 更新」（这条很可能已有一版作品集内容）、「双语餐饮社媒 Agent v0.1」。
- 你本机的会话记录在 `~/.claude/projects/`。在你电脑上运行 `node scripts/harvest-claude-code.mjs`，会生成一份项目清单（路径、仓库、时间、首条提示词），把它发给我，我就能一次性把剩下的项目补进来。

**Claude.ai 其他 chat 的记忆**：我这里没有读取 claude.ai 聊天记录的通道。三个办法，任选：
1. claude.ai → Settings → Privacy → Export data，收到邮件后把 `conversations.json` 给我（Full Context Canvas 的原型里就带这个文件的解析器）；
2. 你在那些 chat 里让 Claude 用你的「导出记忆」格式总结成一段发给我；
3. 你直接告诉我项目名，我用 Notion/Drive 里已有的档案补。

**Notion 里提到但我还没细读的黑客松**：Insurance Hackathon（2026-09-14）、Longevity × AI Hackathon（2026-09）、Microsoft Agentic AI Hack（Fabric 库存规划，2026-09-22）。如果你参加了并做出东西，告诉我做了什么。

**早期作品**：情绪回响（AI 情绪感知与艺术疗愈，音频 CNN + MediaPipe + TouchDesigner）、Community Viewfinder、联合利华 Dove 包装。你的 Notion 诊断建议老项目只留一个作压舱，我暂时没放，等你定。

## 5. 一些值得你现在就处理的事

来自你 7 月的作品集诊断（Notion「Jira Web APP flow」页）：**旧 Framer 网站** `yunfeiyu.framer.website` 当时还有模板残留（页面标题 “Portfolio Template”、footer 链接到模板作者的邮箱和 X、Email 按钮缺 `mailto:`）。如果那个链接还在你简历里，先修或先下线。

## 6. 站点决策记录（可推翻）

- **审美**：我没有你的参考图，所以是根据你自己的东西推断的：你给 Lovable 写的 Stockholm 编辑感规则（衬线斜体 + 等宽小字、只用直角、无渐变）、Meanwhile 的极简黑白、Dossier 的 1px 边框。纸色底 + 墨黑 + 一个信号橙。想换方向，改 `style.css` 顶部变量即可，或者给我 2–3 个你喜欢的网站。
- **叙事**：主轴是你自己定的「AI 增强的产品通才：把模糊问题快速变成可演示原型」，四步方法（定义 → spec → 指挥 → 验证）用你各项目里真实存在的证据支撑。
- **数据**：统计数字只用能核对的（项目数、开源仓库数）。**没有**用 commit 时间做「N 天做了 N 个项目」，因为 Lovable 同步会把几十次提交压在同一天，会误导。
- **免责声明**：写在首页方法论下方，说明代码由 AI 生成、演示数据虚构。
- **Notion 里出现的一个 Lovable 学生折扣码**没有使用，也没有写进任何文件。
