# 待办清单 · TODO（给 Claude 带着用户一步一步做）

## 给 Claude 的指令（先读这段）

用户有严重的拖延症，看到很多要做的事就会瘫痪。所以：

1. **一次只给一个任务**，用这个格式：
   > 任务 N：〈一句话〉  ·  预计 X 分钟
   > 你要做的：〈一到三个动作〉
   > 做完的标志：〈可验证的一句话〉
   > 不想做可以说「跳过」。
   不要预告后面的任务，不要展示这份清单，不要说「还剩 20 个」。可以说「今天做完这个就有一个可以分享的版本了」这类只针对当前的话。
2. 用户回答后，**你来做所有能自动化的部分**（改 `data.js`、提交、推送），用户只负责提供事实和做只有本人能做的事（截图、确认、发链接）。
3. 用户说跳过 / 不知道 / 之后，立即标记为 `⏭ 跳过` 并进入下一项。不劝说，不追问。
4. 每完成一项，把 `[ ]` 改成 `[x]`，提交并推送（推送 main 会自动更新线上网站，一两分钟后生效）。
5. **设计冻结。** 用户提出改样式、加功能、换布局：回答「记下来了」，写进 `docs/PARKING.md`，回到当前任务。
6. 事实优先于漂亮。没有依据的成绩、数字、分工不写。拿不准就在该项目加 `verify` 字段，并把它作为一个待办。
7. 每个 Phase 结束时，用一句话告诉用户现在网站处于什么状态，然后问「继续还是今天先到这里？」——**停下是完全可以的**。
8. 如果用户明显卡住了（长时间不回、说「好多」「烦」「不想」），不要给更多选项。把当前任务缩小到 2 分钟能做完的最小动作（例如只回答「是/否」）。

网站在线地址：`https://phineasyu.github.io/Yumagination-Portfolio/`
本地预览：`python3 -m http.server 8000`，网址后加 `?draft` 可以看到每个项目「待确认」的红色提示。
内容盘点与依据：`docs/CONTENT_INVENTORY.md`。

---

## Phase 0 · 先让它活着（10 分钟）

- [ ] **0.0b 把默认分支改成 main（只有你能点，1 分钟）**：https://github.com/PhineasYu/Yumagination-Portfolio/settings/branches → Default branch 右边的 ⇄ 图标 → 选 `main` → Update。原因：GitHub Pages 只接受默认分支的部署，目前默认分支还是 Claude 的开发分支，所以推到 main 不会更新网站（工作流已临时兼容，但改掉最干净）。

- [ ] **0.0 打开 GitHub Pages（只有你能点，1 分钟）**：浏览器打开 https://github.com/PhineasYu/Yumagination-Portfolio/settings/pages → 「Build and deployment」下的 Source 选 **GitHub Actions**（不用选别的，不用保存按钮）。然后打开 https://github.com/PhineasYu/Yumagination-Portfolio/actions ，点最新一条失败的 “Deploy portfolio to GitHub Pages” → 右上角 **Re-run all jobs**。一两分钟后变绿。做完的标志：下面 0.1 的链接能打开。

- [ ] **0.1** 打开上面的线上地址，用手机也打开一次。做完的标志：你能在手机上看到首页。
- [ ] **0.2** 把链接发给自己（微信/邮件均可）。做完的标志：链接在你收件箱里。 *（先不给别人。）*

## Phase 1 · 分享前必须确认（每项 ≤ 5 分钟，全是回答问题）

Claude：这些每项只问一个问题，答完立刻改 `data.js` 并删掉对应的 `verify`。

- [ ] **1.1 旧 Framer 网站**：`yunfeiyu.framer.website` 还挂在简历上吗？（7 月诊断说它有模板残留和陌生人邮箱。）选一个：把简历里的链接换成新站 / 先下线旧站 / 暂时不管。
- [ ] **1.2 Dossier**：这是哪场比赛？有成绩吗？（没有就写「参赛作品」。）
- [ ] **1.3 Aris & Friends 奖项**：奖项确切名字是什么？（你笔记里写的是 “Thinking outside of the box Prize”。）
- [ ] **1.4 Deloitte Spark 黑客松**：哪一年？第三名确认吗？
- [ ] **1.5 Meanwhile 的名字**：界面里叫 `beside`，spec 里叫 `Meanwhile`。选一个，Claude 统一。
- [ ] **1.6 Kodiak Hub**：先只放文字（现在就是这样），还是去问公司能不能放截图？选「只放文字」就直接勾掉。
- [ ] **1.7 分工（4 个小问题）**：LegacyChain、Kikaren、Teamdex、SAP，各自是你一个人做的，还是有队友？队友做了什么？（一句话即可；不确定就写「团队项目，我负责 X」。）
- [ ] **1.8 联系方式**：网站上公开的是 phineasyu0812@gmail.com、LinkedIn、GitHub。可以公开吗？要不要加别的（比如小红书/Instagram）？

**Phase 1 完成 = 网站可以安全地发给招聘方了。**

## Phase 2 · 把「所有项目」找全（这是最关键的部分，可以分多天）

用户的目标是**把过往做过的所有项目都整理进来**，而现在网站只有已经在 GitHub / Drive / Notion 里找到的 12 个。Claude 的任务是持续问、直到用户说「没有了」。

- [ ] **2.1 在你自己电脑上跑盘点脚本**（3 分钟）：终端里进入本仓库，运行 `node scripts/harvest-claude-code.mjs`，把 `harvest-output/claude-code-projects.md` 的内容贴给 Claude。不想跑就说「跳过」，Claude 改用 2.3。
- [ ] **2.2 导出 claude.ai 聊天记录**（5 分钟 + 等邮件）：claude.ai → Settings → Privacy → Export data。收到邮件后把 `conversations.json` 给 Claude（可上传到会话里）。Claude 只读取标题和首条消息，列出「看起来是项目」的对话，让用户逐个说「是 / 不是」。
- [ ] **2.3 十分钟倾倒**：不要整理，直接说/打出你记得的所有做过的东西，哪怕只有名字：课程项目、比赛、实习、个人小工具、失败的、没做完的都算。Claude 负责整理成清单，并对照 `data.js` 找出还没收录的。
- [ ] **2.4 点名清单**：下面这些名字出现在你的会话或笔记里，Claude 逐个问「是什么？做完了吗？想放吗？」（每个 1 分钟，可以说「不放」）
  - [ ] StoneLeap 游戏（Claude Code 会话「Logging errors」）
  - [ ] 双语餐饮社媒 Agent v0.1
  - [ ] 会话「degree 字段」是哪个项目
  - [ ] 会话「Vercel plugin installation」是哪个项目
  - [ ] 会话「作品集网站 content 更新」（可能已有一份作品集内容，请用户找回）
  - [ ] Insurance Hackathon（2026-09-14）
  - [ ] Stockholm Longevity × AI Hackathon（2026-09）
  - [ ] Microsoft Agentic AI Hack（Fabric 库存规划，2026-09-22）
  - [ ] 情绪回响（AI 情绪感知与艺术疗愈）
  - [ ] Community Viewfinder / Tianlin 安全网 / 其他 2022–2023 课程项目（Notion 诊断建议只留一个压舱，让用户决定）
  - [ ] 联合利华 Dove 包装（现在只在经历里，要不要单独成项目？）
  - [ ] 其他 GitHub 仓库：`nextjs-boilerplate`、`nextjs-ai-chatbot`、`desktop-tutorial`（多半是练习/模板，问一句要不要放）
- [ ] **2.5 项目收录流程（对每个新项目重复）**：Claude 依次只问这几件事，一次一个问题：
  1. 一句话：它是什么，给谁用？
  2. 你具体做了什么？哪些是 AI 做的？
  3. 有队友吗？你负责什么？
  4. 有结果吗（获奖、真实用户、上线、数字）？没有就说没有。
  5. 有链接 / 仓库 / 截图吗？
  6. 想放进精选，还是只放「更小的作品」？
  Claude 据此在 `data.js` 加一个对象（照已有项目的格式，中英文各一份），只写用户说过的事实，然后提交。
- [ ] **2.6 收尾问题**（每次 Phase 2 结束前必问）：「还有别的项目吗？想到就告诉我，随时可以再加。」——网站结构支持随时追加，不需要重做。

## Phase 3 · 素材（可以全部跳过；跳过的用生成封面，网站依然完整）

每项只做一件事。

- [ ] **3.1 Sushi Jerash**：给 Claude 线上网址 + 手机截图 3–5 张（菜单、购物车、结账、Telegram 通知、后台）。
- [ ] **3.2 Dossier**：登录后的主界面截图 2 张（时间线、档案）或一段录屏。只用虚构孩子的数据，不要出现真实孩子。另外：Dossier 的 Lovable 已发布网址现在显示 “Build incomplete”，需要在 Lovable 里重新发布一次。
- [ ] **3.3 Collaboration Canvas**：原型链接 + 4–6 张图。
- [ ] **3.4 Voi**：头盔概念图 / App 流程截图（先确认 Voi 允许公开，不确定就跳过）。
- [ ] **3.5 头像/照片**：要不要在关于页放一张照片？（可选）

放图方法（Claude 来做）：图放进 `assets/shots/`，在 `assets/js/projects.js` 对应项目的 `sections` 里用 `IMG("assets/shots/xxx.png", "描述", { frame: "browser" })`；录屏放 `assets/media/`，用 `V("名字")`。有 Sushi Jerash 线上网址时，可以直接加一个 `embed` 或用 `scripts/record-demos.mjs` 录一段。

## Phase 4 · 定稿（30 分钟）

- [ ] **4.1 通读一遍**：用 `?draft` 打开，Claude 逐页读一遍，指出所有还带 `verify` 的地方。已确认的删掉 `verify`。
- [ ] **4.2 中英文对读**：新加项目的中文和英文是否一致。
- [ ] **4.3 冻结**：Claude 在 `docs/PARKING.md` 顶部写上「已冻结日期」。从这一刻起，只允许加新项目，不改设计。
- [ ] **4.4 发出去**：把链接放进简历、LinkedIn、邮件签名。 *（这一步才算「完成」。）*

## Phase 5 · 自己的域名（最后再做，可选）

- [ ] **5.1** 选域名（例如 yunfeiyu.com / yumagination.com），查是否可用。
- [ ] **5.2** 购买（Namecheap / Cloudflare Registrar / Porkbun 均可）。
- [ ] **5.3** GitHub 仓库 Settings → Pages → Custom domain 填入域名；Claude 会给出要在域名商处添加的 DNS 记录（4 条 A 记录 + 1 条 CNAME），并等待 HTTPS 生效、勾选 Enforce HTTPS。
- [ ] **5.4** 把简历和 LinkedIn 里的链接换成新域名。

---

## 进度日志
（Claude：每完成一项在这里加一行 `日期 · 任务号 · 做了什么`。）
