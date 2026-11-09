# 项目规则记录 · 高级网页设计

> 本文件汇总本项目长期生效的编写规则，任何新增页面与代码均须遵守。

## 一、代码编写规则

| 编号 | 设立时间 | 规则内容 |
|---|---|---|
| 1 | 2026-10-23 | 所有 CSS 类名、id 名、JS 变量名必须以 `HWH_` 开头 |
| 2 | 2026-10-23 | 每条用户提示词在执行之前，以**附加方式**写入 `HWH_prompt.md`，不得覆盖；记录包含时间（yyyy-MM-dd HH:mm:ss）、使用的模型、提示词原文 |
| 3 | 2026-10-23 | 所有新建的 HTML 文件必须包含指向首页 `index.html` 的超链接入口 |
| 4 | 2026-11-04 | 新建 HTML 文件必须在文件顶部加入作者注释，包含作者（胡文豪）、建立时间、使用大模型、功能名称 |
| 5 | 2026-11-04 | JS 部分的每个函数必须附主要功能说明注释 |

### 作者注释格式

```html
<!-- 作者：胡文豪 | 建立时间：2026-11-04 13:34:49 | 使用大模型：GLM-5.3-Flash | 功能名称：xxx -->
```

## 二、提示词记录格式

`HWH_prompt.md` 中以追加方式记录，条目之间用 `---` 分隔：

```markdown
## yyyy-MM-dd HH:mm:ss

- **模型**: 模型名称
- **提示词内容**:

> 提示词原文
```

## 三、远程仓库约定

| 远程名 | 仓库地址 | 认证方式 |
|---|---|---|
| `origin` | https://gitee.com/neusoft_wangyao_jsj/gaojiwangyehuwenhao.git | Git Credential Manager |
| `github` | git@github.com:24002120502/HWH502.git | SSH 公钥 |

- 分支统一为 `master`
- 提交信息使用中文，说明改动目的
- 任何令牌、密钥、凭据一律不写入文件或远程 URL

## 四、关联技能

- 提交到 Gitee：`.trae/skills/commit-project/SKILL.md`（触发语：提交 / 提交项目 / 提交代码 / push）
- 提交到 GitHub：`.trae/skills/push-github/SKILL.md`（触发语：提交到 github / push 到 github）
