# Yumagination Portfolio

纯静态网站（HTML / CSS / JS，无构建步骤），中英双语，内容全部来自 `assets/js/data.js`。

## 本地预览
```bash
python3 -m http.server 8000   # 然后打开 http://localhost:8000
```
加 `?draft` 可以看到「分享前待确认」的红色虚线提示：`http://localhost:8000/?draft`

## 改内容
- 加/改项目：只改 `assets/js/projects.js`。每个项目一个对象：首页卡片（`tile`）、案例页标题/导语/首图（`hero`）、按「短文字 + 一张图/视频」交替的 `sections`。中英文各写一份。
- 媒体类型：`video`（录屏）、`img`、`embed`（内嵌在线应用，装进浏览器/手机框）、`motion`（示意动画，见 `assets/js/motions.js`）、`stats`、`steps`。每个媒体都会自动打上「录自运行的应用 / 示意图 / 在线可玩」标签，保证诚实。
- 录新的演示视频：`scripts/record-demos.mjs`（Playwright 录真实应用 + ffmpeg 压缩）。
- 换主题色/字体：`assets/css/style.css` 顶部 `:root`（现在是 Tiffany Blue）；首屏「呼吸光圈」动效在 `assets/js/breath.js`（一次呼吸 10 秒，可改）。
- 摄影 Gallery：`gallery.html` 是独立页面。把照片放进 `assets/gallery/originals/<展厅名>/`，运行 `node scripts/add-photos.mjs`（需要 `npm i -D sharp`）就会生成缩略图和 `assets/js/gallery-data.js`；`gallery.html?demo` 可预览版式。
- 首页文案、获奖、方法论、关于、工具：`assets/js/data.js`。

## 免费上线（先用免费网址，最后再换你自己的域名）
**GitHub Pages（推荐，已配好）**
1. 把这个分支合并进 `main`。
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
3. 几分钟后得到 `https://phineasyu.github.io/Yumagination-Portfolio/`，这就是可分享的链接。

备选：Netlify Drop（把文件夹拖进 app.netlify.com/drop）或 Cloudflare Pages（连接仓库，无构建命令，输出目录 `/`）。

## 之后接自己的域名
买域名 → 在托管平台的 Domains 里添加 → 按提示在域名注册商处加一条 CNAME/A 记录 → 等 DNS 生效。三家都自动配 HTTPS。

## 自动盘点 Claude Code 项目
在**你自己的电脑**上运行（云端读不到你本机的会话记录）：
```bash
node scripts/harvest-claude-code.mjs
```
生成 `harvest-output/claude-code-projects.md`，列出每个项目的路径、仓库、会话数、时间范围、首条提示词。输出已被 `.gitignore`，分享前请自己先看一遍。
