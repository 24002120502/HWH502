---
name: flex-layout
description: 用于《高级网页设计》flex布局课堂实践项目。当用户提到本项目（flex布局、课堂实践、HWH、页面导航 index.html 或本项目目录）时使用。描述项目结构、编写约定与本地预览验证方式。
---

# Flex 布局课堂实践项目

《高级网页设计》课堂实践导航项目，作者 HWH（胡文豪，学号 24002120502）。纯原生 HTML / CSS / JS，不依赖任何 CDN 与框架。

## 项目结构

- `index.html` — 课堂目录导航主页，通过卡片网格链接到各练习模块。
- `html/` — 练习模块页面，如 `flex布局复习.html`、`svg005.HTML`（字体图标 + 移动端 tab 栏）。
- `css/` — 各模块配套样式与 `font/` 目录下的 iconfont 图标资源（woff/woff2/ttf/json 等）。
- `.opencode/skills/flex-layout/` — 本项目技能。

## 编写约定

- 保持纯原生实现，禁止引入第三方库 / CDN。
- 中文页面使用 `lang="zh-CN"` 与 `<meta charset="UTF-8">`。
- flex 为核心布局手段：卡片网格用 `flex-wrap + gap + flex: 1 1 260px` 自适应换行；导航与 tab 栏用 flex 主轴对齐。
- 样式遵循移动优先响应式设计，窄屏（如 600px 以下）用 `@media` 调整。
- 新增模块时在 `index.html` 的 `.card-grid` 中添加 `.card-link` 卡片并链接到 `html/` 下的新页面。

## 本地预览与验证

无需构建步骤，直接在浏览器中打开 `index.html` 即可预览。项目未配置 lint / 测试脚本，验证方式为人工在浏览器检查各卡片跳转与响应式表现。