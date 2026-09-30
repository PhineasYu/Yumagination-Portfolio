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

- [x] **0.0b 把默认分支改成 main（只有你能点，1 分钟）**：https://github.com/PhineasYu/Yumagination-Portfolio/settings/branches → Default branch 右边的 ⇄ 图标 → 选 `main` → Update。原因：GitHub Pages 只接受默认分支的部署，目前默认分支还是 Claude 的开发分支，所以推到 main 不会更新网站（工作流已临时兼容，但改掉最干净）。

- [x] **0.0 打开 GitHub Pages（只有你能点，1 分钟）**：浏览器打开 https://github.com/PhineasYu/Yumagination-Portfolio/settings/pages → 「Build and deployment」下的 Source 选 **GitHub Actions**（不用选别的，不用保存按钮）。然后打开 https://github.com/PhineasYu/Yumagination-Portfolio/actions ，点最新一条失败的 “Deploy portfolio to GitHub Pages” → 右上角 **Re-run all jobs**。一两分钟后变绿。做完的标志：下面 0.1 的链接能打开。

- [ ] **0.1** 打开上面的线上地址，用手机也打开一次。做完的标志：你能在手机上看到首页。
- [ ] **0.2** 把链接发给自己（微信/邮件均可）。做完的标志：链接在你收件箱里。 *（先不给别人。）*

## Phase 1 · 分享前必须确认（每项 ≤ 5 分钟，全是回答问题）

Claude：这些每项只问一个问题，答完立刻改 `data.js` 并删掉对应的 `verify`。

- [ ] ⏭ 之后（新网站上线后再做）**1.1 旧 Framer 网站**：`yunfeiyu.framer.website` 还挂在简历上吗？（7 月诊断说它有模板残留和陌生人邮箱。）选一个：把简历里的链接换成新站 / 先下线旧站 / 暂时不管。
- [x] **1.2 Dossier**：这是哪场比赛？有成绩吗？（没有就写「参赛作品」。）
- [x] **1.3 Aris & Friends 奖项**：奖项确切名字是什么？（你笔记里写的是 “Thinking outside of the box Prize”。）
- [x] **1.4 Deloitte Spark 黑客松**：哪一年？第三名确认吗？
- [x] **1.5 Meanwhile 的名字**：界面里叫 `beside`，spec 里叫 `Meanwhile`。选一个，Claude 统一。
- [ ] **1.6 Kodiak Hub**：先只放文字（现在就是这样），还是去问公司能不能放截图？选「只放文字」就直接勾掉。
- [ ] **1.7 分工（4 个小问题）**：LegacyChain、Kikaren、Teamdex、SAP，各自是你一个人做的，还是有队友？队友做了什么？（一句话即可；不确定就写「团队项目，我负责 X」。）
- [x] **1.9 Let Me Die 的玩法**：一句话说清这款游戏怎么玩（它会成为卡片和标题的第一句）。顺便：你一个人做的还是有队友？ ✅ 2026-09-30 已写入四个空间和名字由来（队友问题未提供，页面没写）
- [ ] **1.10 Disco Fever**：黑客松的正式名称是什么？有队友吗？
- [x] **1.11 Revive**：网站上可以出现公司名 Revive 吗？（不行就改成「一家零售公司」。）
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

- [ ] **3.0 摄影 Gallery 的照片（这是你最重视的一页，优先做）**：Gallery 页面已经做好了（`gallery.html`，顶栏「Gallery」），现在缺的只有你的照片。任选一种给 Claude：
  1. 把 20–40 张最满意的照片放进 Google Drive 的一个文件夹，告诉 Claude 文件夹名，Claude 用 Drive 下载并处理（先试 1 张确认能下载）；
  2. 直接在 Claude 对话里发照片；
  3. 自己电脑上：把照片放进 `assets/gallery/originals/<展厅名>/`（展厅名前加 01-、02- 决定顺序），运行 `node scripts/add-photos.mjs`，再提交推送。
  Claude 之后问你三件小事：每个展厅叫什么名字（例如「城市」「人」「光」）；有没有想写的说明牌（标题/地点/年份，可以全部留空）；Gallery 页顶部那句话是否满意（现在是：「摄影是我坚持最久的爱好。这里是多年来随身带着相机拍下的照片。」）。
  说明：脚本会把照片缩小成网页尺寸并去掉定位等隐私信息，原图不会上传；预览版式可打开 `gallery.html?demo`。

- [x] **3.1 Sushi Jerash**：给 Claude 线上网址 + 手机截图 3–5 张（菜单、购物车、结账、Telegram 通知、后台）。
- [x] **3.2 Dossier**：登录后的主界面截图 2 张（时间线、档案）或一段录屏。只用虚构孩子的数据，不要出现真实孩子。另外：Dossier 的 Lovable 已发布网址现在显示 “Build incomplete”，需要在 Lovable 里重新发布一次。
- [x] **3.3 Collaboration Canvas**：原型链接 + 4–6 张图。
- [ ] **3.4 Voi**：头盔概念图 / App 流程截图（先确认 Voi 允许公开，不确定就跳过）。
- [ ] **3.5 头像/个人照片**：要不要在关于页放一张照片？（可选）

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
- 2026-09-30 · 0.0b / 0.0 · 默认分支已是 main，线上网站能打开（Claude 核实）
- 2026-09-30 · 1.11 · 可以公开 Revive 的名字和 logo（用户确认），经历里已加 Revive 实习
- 2026-09-30 · 3.2 · Dossier：从已发布网址的演示模式（虚构孩子 Luca、Lucy）录了 21 秒手机录屏和 3 张截图；事实依据是仓库 README（PRD）和 roadmap.md
- 2026-09-30 · 3.3 · Collaboration Canvas：在本机运行原型（~/Downloads/Collaboration-canvas，npm run dev），录 55 秒三角色演示 + 9 张截图；事实依据是原型仓库的 spec、CLAUDE.md、演示脚本和 mock 数据
- 2026-09-30 · 3.1 · Sushi Jerash：在手机尺寸下录线上网站（到结账页为止，没有提交订单），加英文字幕；网站只有阿拉伯语
- 2026-10-01 · 第四批 · 时间线改成职位在上/公司在下；Method 讲品味；Recognition 改名 Awards & wins；删掉 Work 说明；About 重写并加 AI engineer；Longevity（录屏 + deck + ASCII）、MicroHack（微软截图）、Community Viewfinder（原始 PDF）、Let Me Die（截图 + 封面）、Sushi Jerash（录屏）、Disco Fever（桌面 + 手机双录屏，iPhone 外框）、LegacyChain（Roll A Page 起点）、Kodiak（PDF 补充）更新；新增「Hardware & 3D prototyping」卡片；Kodiak 与 Revive 提到第三行；新增 docs/INTERVIEW-UNIPLAY.md
- 2026-10-01 · 第五批 · Revive 合并为一个项目（UX 审计、多卖家结账重设计 + 可点击原型、佣金对账自动化的方法示意）；Voi（Figma：头盔流程动画、服务蓝图、构想、商业计划书页面）；新增 Dove serum bottle、Planet Intelligence Maps（Deloitte 第三名）卡片；Kodiak Hub 用真实界面重写（登录、BOM、进程条、徽标、断点图、AI 工具对比）；SAP Career Ignite 加入当晚演示的 dashboard（可点击）；NotchBreak 加原生菜单图和动画（注意：是按代码画的动画，不是录屏）；Community Viewfinder 加落地版（展厅墙）和取景卡片；「Read case study」按钮改成 Tiffany 底黑字
- 2026-10-01 · 第六批 · Voi 加入 Miro 调研（招募帖、亲和图、问卷数据、目标人群）并修正「安全而非价格」的说法；Kodiak 加入 AI 工作流（来自 Notion）；NotchBreak 视频菜单栏改黑；Dove 卡片挪到倒数第二；Community Viewfinder 加摄影彩蛋（仅此项目）
- 2026-10-01 · 第七批 · Teamdex/Dossier 互换；Collaboration Canvas 在第二行中间；Kodiak 封面换成登录页，登录流程拆成七屏横排；Let Me Die 封面加笑哭 emoji；Gallery 改成无限画布（拖拽/滚轮，照片散落，点击看大图；?demo 可预览）；add-photos 脚本多输出 small 尺寸
- 2026-10-01 · 第八批 · Let Me Die 的 emoji 挪到标题后并斜 45°；「Show the reasoning」卡片改成 Tiffany→黑的颗粒流动渐变；About 去掉三个按钮、加「Download my CV」（文件待放：assets/Yunfei_Yu_CV.pdf）；郑州大学 logo；首页改为 Work → Awards → 摄影像素窗 → logo 条 → About → Contact，Method 独立成页（#/method）；Awards 卡片翻转出现
- 2026-10-01 · 第九批 · Method 页加入第二大块「How I design services」（设计思维 + 服务设计：五步、四个反复用的做法、Teamdex 蓝图可点击）；Teamdex 页加入服务蓝图一节
- 2026-10-01 · 第十批 · Beside 换成更新后的版本（录屏取自仓库最新代码本地运行；线上链接要你在 Lovable 重新发布才会更新）；Kodiak：封面铺满、AI 工作流提前、设计系统维护、最终版进度条、短内容改左右分栏；Work 卡片逐张落下；Let Me Die 笑哭转向
- 2026-10-01 · 第十一批 · Beside 用更新后的应用重新录屏；Award 标签改柠檬黄；About 去掉语言行；Gallery 画布支持缩放（双指捏合/Ctrl+滚轮/+−键/双击）、文案改为 Enjoy；照片放 assets/gallery/originals/all/
- 2026-10-01 · 第十二批 · Kodiak Hub、Revive 卡片加淡紫色「💼 Internship」标签；Beside 卡片视频按 GitHub 最新代码重新录制（滚动、她那一侧、+ 菜单发 emoji、I have time 滚轮）
- 2026-10-01 · 第十三批 · Gallery 放入 107 张照片（已去除 GPS / 相机信息；相机文件名不作标题）；首页像素窗随之显示真实照片
- 2026-10-01 · 第十四批 · Gallery：每张照片只出现一次，从标题向外螺旋散开，拖动范围到照片为止；照片改 WebP 三档（缩小时只加载小图），首页像素窗不再下载照片；底部加彩色色带，拖动只看某一种颜色的照片（黑白在最左）
- 2026-10-01 · 第十五批 · 首屏背景换成 light-rails 点阵动效（按预设 + 录屏重写，配色改为 Tiffany 色系、深色底）；首屏文字和顶部菜单在首屏上改为白色
