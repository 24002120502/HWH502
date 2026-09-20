---
name: gaojiwangye-practice
description: Use when working on HWH 胡文豪's《高级网页设计》course practice project (gaojiwangyehuwenhao, 502huwenhao folder). Covers the HTML/CSS/JS practice pages, the index.html classroom navigation page, adding new MODULE cards, iconfont/SVG usage, Flex layout exercises, and project conventions (pure native code, no CDN, Chinese UI). Trigger keywords: 高级网页设计, gaojiwangye, 502huwenhao, index.html, flex布局, 字体图标, svg005, HWH.
---

# 高级网页设计 · HWH 课堂实践（gaojiwangye-practice）

本仓库是学生胡文豪（HWH, 学号 24002120502）的《高级网页设计》课堂练习与学习笔记。所有页面为**原生 HTML/CSS/JS**，不依赖任何 CDN 或框架。

## 目录结构

```
gaojiwangyehuwenhao/
└── 24002120502+胡文豪/          # 课程提交目录（本 skill 所在项目的根）
    ├── .opencode/skills/        # opencode 项目技能（本技能）
    └── 502huwenhao/             # 练习代码主目录
        ├── index.html           # 课堂目录导航页（上有各模块卡片）
        ├── html/                # 练习页面：flex布局复习.html、svg005.HTML、intex.css
        └── css/                 # 样式：svg005.css、flex布局复习.css、font/（iconfont 字体图标）
```

## 核心约定

- 纯原生实现：不要引入 jQuery、Bootstrap、Vue 等外部依赖，也不用 CDN 链接。
- 界面文案使用中文，整体风格参考现有页面（渐变页头、圆角卡片、轻阴影）。
- `index.html` 是导航入口，每个练习页都要在其中添加一张「课堂目录卡片」。
- 新增练习的标准流程：建一个新 HTML 页面 → 在根目录 `index.html` 添加对应卡片链接 → 按需添加模块。

## 现有模块

| 模块 | 入口 | 内容 |
| ---- | ---- | ---- |
| MODULE 01 | `html/flex布局复习.html`（样式 `css/flex布局复习.css`） | Flex 布局复习：导航布局、三等分布局、响应式卡片网格、侧边栏布局，覆盖 justify-content / align-items / flex |
| MODULE 02 | `html/svg005.HTML`（样式 `css/svg005.css`） | iconfont 字体图标 + SVG symbol 用法，移动端底部 tab 栏，JS 切换 active 状态 |
| MODULE 03 | 占位卡片（`class="card placeholder"`，链接 `#`） | 待添加 |

## 导航页卡片结构（index.html）

每张卡片是 `.card-grid` 下的 `.card-link > .card`，内容含 `.num`、`<h3>`、描述 `<p>` 和 `.go` 链接。添加 TODO 卡片时：

1. 编写练习页并放到 `html/` 下，样式放到 `css/` 下。
2. 在 `index.html` 的 `.card-grid` 内克隆一个 `.card-link`：
   - href 指向新页面；
   - `.num` 递增（MODULE 03、04…）；
   - 若需新配色，仿照 `nth-child` 规则给 `.card` 增加渐变与阴影。

## 验证

- 改动后用浏览器（或 `open`）打开 `index.html` 本地预览，确认卡片链接可跳转、无 404。
- 检查所有 CSS/JS 为相对路径引用，未引用任何外网 CDN。
- 提交前运行 `git status` 与 `git diff` 确认改动范围符合预期。