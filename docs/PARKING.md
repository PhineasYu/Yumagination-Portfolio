# 停车场（Parking lot）

> **2026-09-30：小色点缀放宽。** Tiffany 蓝 #81D8D0 仍是唯一主题色（选中状态、按钮悬停、下划线、方法区的 04）；小的点缀色可以换：奖项标签用珊瑚色 #FF9A8B（Tiffany 的互补色），「Available for work」用黄油黄 #FFE07A。整站不再强制大写（`text-transform: uppercase` 已全部去掉，插图里的标签也改成了正常大小写）。新增图标库 `assets/js/icons.js`（Lucide 线性图标 + Simple Icons 的 GitHub / LinkedIn）。
>
> **2026-09-30：第三轮视觉修改（polish 分支）。** 「Smaller builds & experiments」区块从首页移除（不渲染，数据仍在 `data.js` 的 `more`）；Longevity 3D 升级为正式项目；区块间距统一由 `--sec` 控制并缩小；「How I build with AI」重排；配色收成「中性灰 + 纯 Tiffany #81D8D0」，去掉所有发灰的蓝绿色和 Tiffany 文字色。首屏丝绸动画按要求保持原样（它的着色器里仍是旧的 Tiffany 色阶）。
>
> **被隐藏的「Smaller builds」条目**（想恢复：在 `app.js` 的 `home()` 里，`work` 区块后加回 `${moreBlock()}`）：
> - Chronicool（2026，Rick & Morty 习惯打卡）
> - Defense Countdown Clock（2026，答辩倒计时）
> - ADHD Stride（2025，早期 Lovable 实验）
> - Personal Daily Grid（2025，早期 Lovable 实验）
> - （Longevity visualisation 已升级为正式项目 `longevity-3d`，不在此列。）
>
> **2026-09-30：第二轮视觉优化完成（polish 分支），设计重新冻结。** 首屏恢复为丝绸流体（改成 Tiffany 蓝、规律流动），只放名字和两行定位；文字加深到 WCAG AA；卡片是灰底上的白卡片；项目卡按 `shape` 字段排成不裁切的 bento 行；统一圆角变量；更小的作品改为 Feed 小卡片；关于区加「Available for work」和时区。
>
> **2026-09-30：视觉打磨完成（polish 分支），设计重新冻结。** 全站只用 Instrument Sans；统一字号层级和 `--gap` 间距；首页作品改为 bento 布局；全站无渐变，Tiffany 蓝是唯一强调色；首屏呼吸光圈改为纯色并轻微跟随鼠标；卡片悬停、详情页入场、滚动淡入等动效统一为 200–400ms。
>
> **2026-09-30：分区改版完成（zones 分支），设计重新冻结。** 首页现在按 5 个分区 + 5 个标签筛选；没有录屏的项目用文字卡片。之后再有改设计的想法，照旧写在下面。

设计已冻结。想改的、想加的，全部先记在这里，**不要现在做**。
等 `docs/TODO.md` 的 Phase 1–4 全部完成、网站已经可以分享之后，再一起看这里，最多挑 3 件做。

## 想法
（Claude：用户提出改设计/加功能时，一句话记在这里，然后回到当前任务。）
