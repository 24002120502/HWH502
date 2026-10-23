---
name: commit-project
description: 提交项目到 Gitee 远程仓库并推送。当用户说 提交项目、提交代码、推送、push、同步到 gitee 时使用。不用于用户未要求提交的普通代码修改。
---

# 提交项目（Gitee）

按序执行，任何一步失败先如实报告，不自行绕过。

## 仓库约定

- 项目根目录：d:\02_个人数据\学习资料\高级网页设计
- 远程 origin：https://gitee.com/neusoft_wangyao_jsj/gaojiwangyehuwenhao.git
- 默认分支：master（Gitee 默认分支名）
- 提交者已配置（胡文豪 / hwhpl20242006@qq.com），凭据由 Git Credential Manager（credential.helper=manager）托管

## 流程

1. 若项目无 .git：git init -b master，随后 git remote add origin（地址见上，一律不含令牌）。
2. 已有仓库则 git remote -v 校验 origin 是否存在且指向正确；缺失则补加。
3. 并行运行 git status、git diff（含已暂存）、git log --oneline -8，了解变更与既有提交信息风格。
4. 用 git add <具体路径> 暂存相关文件；不用 git add -A / git add .，除非用户明确要求。
5. 检查暂存内容不含敏感文件（.env、令牌、密钥、凭据文件）；发现则剔除并告知用户。
6. 用 HEREDOC 创建提交，信息为中文、一两句话说明改动目的：
   git commit -m "$(cat <<'EOF'
   <提交信息>
   Co-Authored-By: Claude Sonnet 4.6 noreply@anthropic.com
   EOF
   )"
7. 推送：git push -u origin <当前分支>。
8. 首次推送若认证失败或弹出 Git Credential Manager 窗口：告知用户在窗口中登录 Gitee（用户名 + 私人令牌充作密码），等待用户完成再重试；凭据由系统安全存储，之后免交互。
9. 成功后 git status 确认工作区干净，向用户报告提交哈希与仓库链接。

## 禁止

- 将令牌或任何凭据写入文件（含 .git/config、HWH_prompt.md、SKILL.md、远程 URL、脚本）
- force push、amend 已推送的提交、修改全局 git 配置
- 用户未明确要求提交时创建提交
