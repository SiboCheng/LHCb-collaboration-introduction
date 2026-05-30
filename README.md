# LHCb 合作组介绍网页

这是一个用于公开介绍 PKU LHCb 合作组的静态网页。页面长期目标是介绍合作组简介、
研究方向和联系方式；内容组织可以参考学生在夏令营、推免或科研训练前希望了解的信息。

## 本地预览

网页会读取 `content/research.md`。由于浏览器直接打开本地
`index.html` 时可能限制读取文件，建议用本地静态服务预览：

```bash
python -m http.server 8787
```

然后访问：

```text
http://127.0.0.1:8787/
```

## 编辑研究方向

老师只需要修改这个 Markdown 文件：

```text
content/research.md
```

每个研究方向区块顶部的字段会显示在研究方向卡片中：

```md
---
title: "研究方向标题"
label: "方向类别"
summary: "一句话摘要"
tags: "关键词1, 关键词2, 关键词3"
detail: "点击详细介绍后显示的一整段专业化描述"
---
```

字段含义：

- `title`：研究方向标题。
- `label`：方向类别，显示为英文标签。
- `summary`：一句话摘要，显示在卡片顶部。
- `tags`：关键词，用英文逗号分隔。
- `detail`：点击“详细介绍”按钮后显示的专业化段落。

分隔线下方的正文会直接显示在研究方向卡片中，不会被折叠。当前支持段落、二级标题和列表。
`detail` 字段会额外显示在“详细介绍”展开区域中。研究方向建议按物理问题或技术方向组织，不按个人组织。

如果以后要新增研究方向，在 `content/research.md` 中复制一个完整区块，并用
`---direction---` 分隔即可，不需要修改网页代码。

## 发布到 GitHub Pages

1. 在 GitHub 新建公开仓库。
2. 上传 `index.html`、`styles.css`、`app.js`、`README.md` 和 `content/research.md`。
3. 进入仓库的 `Settings` -> `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/ (root)`。
6. 保存后等待 GitHub 生成公开访问链接。

## 后续可优化内容

- 替换联系邮箱和合作组正式名称。
- 添加老师和学生成员列表。
- 添加真实照片或公开授权的实验图片。
- 增加中英文切换。
- 增加新闻动态页面。
