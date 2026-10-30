---
name: push-github
description: 将项目提交并推送到 GitHub 仓库（SSH 公钥认证）。当用户说 提交到github、提交到 GitHub、push 到 github、同步到 github 时使用。不用于未要求提交的普通代码修改。
---

# 提交到 GitHub

按序执行，任何一步失败先如实报告，不自行绕过。

## 仓库约定

- 项目根目录：d:\02_个人数据\学习资料\高级网页设计
- GitHub 远程名：github（origin 已被 gitee 占用，勿动 origin）
- 远程地址（SSH，公钥认证）：git@github.com:24002120502/HWH502.git
- 分支：master（跟随本地当前分支推送）
- 提交者已配置（胡文豪 / hwhpl20242006@qq.com）

## 流程

1. 执行前按项目规则将本次提交请求追加到根目录 HWH_prompt.md（时间、模型、内容）。
2. git remote -v 校验名为 github 的远程；缺失则 git remote add github git@github.com:24002120502/HWH502.git；若已有 github 但地址不符，先报告用户再决定是否改址。
3. 并行运行 git status、git diff（含已暂存）、git log --oneline -8，了解变更与提交信息风格。
4. 用 git add <具体路径> 暂存相关文件；不用 git add -A / git add .，除非用户明确要求。
5. 检查暂存内容不含敏感文件（.env、令牌、密钥、凭据文件）与 IDE 缓存（.trae-html-share-packages 已被 .gitignore 排除）；发现异常则剔除并告知用户。
6. 用 PowerShell here-string 创建中文提交信息（本机 shell 为 PowerShell，bash heredoc 不可用）：
   git commit -m @'
   <提交信息>
   Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
   '@
7. 推送：git push -u github <当前分支>。
8. 若提示 fetch first（远程有新提交）：git pull --rebase github <当前分支> 整合后重推；冲突则停下报告。
9. 若报 Permission denied (publickey)：运行 ssh -T git@github.com 诊断并如实报告结果（提示用户检查本机公钥是否已加入 GitHub 账户 24002120502）。
10. 成功后 git status 确认工作区干净，报告提交哈希与仓库链接 https://github.com/24002120502/HWH502 。

## 禁止

- 将令牌、密钥或凭据写入任何文件或远程 URL
- force push、amend 已推送的提交、修改 origin（gitee）远程与全局 git 配置
- 用户未明确要求提交时创建提交
