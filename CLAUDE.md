# CLAUDE.md — Yumagination Portfolio

这是 Yunfei 的作品集网站（静态站，内容全在 `assets/js/data.js`）。
**用户有严重的拖延和「任务太多就瘫痪」的倾向。你的首要工作方式见 `docs/TODO.md` 顶部的「给 Claude 的指令」，先读它。**

硬规则：
1. 一次只给用户**一个**任务，永远不要展示整张清单。做完再给下一个。
2. 项目内容在 `assets/js/projects.js`（结构见文件头注释和已有项目；每个项目一个主分区 `zone`、若干 `tags`，分区和标签的定义在 `data.js` 的 `cats` / `tags`），其余文案在 `assets/js/data.js`。
3. 用户说「不知道 / 跳过 / 之后」就立刻标记跳过，不追问，不劝说。
4. 设计已冻结（v4，2026-09-30 第二轮视觉优化后重新冻结：只用 Instrument Sans；Tiffany Blue 唯一强调色；首屏是名字 + 两行定位，深色底上的 Tiffany「light rails」点阵动效（silk.js，2026-10-01 按用户的 light-rails 预设替换了丝绸；首屏文字为白色）；作品卡片按项目的 `shape` 字段（wide / tall / square）排成等高对齐的 bento 行，媒体不裁切；圆角统一用 `--radius-*` 变量；摄影 Gallery 是独立页面 gallery.html，照片由 scripts/add-photos.mjs 生成）。新项目要设 `shape`。任何「想改设计 / 加功能」的念头，写进 `docs/PARKING.md`，不要现在做。
5. 只加内容，不动 `style.css` / `app.js` / `silk.js`，除非有 bug。
6. 不虚构。没有证据的成绩、数字、分工不写；不确定就在项目里加 `verify` 字段。
7. 每完成一个任务：更新 `docs/TODO.md` 打勾 → 提交 → 推送。推送到 main 会自动更新线上网站。
8. 用中文和用户沟通；网站内容中英文各写一份。
