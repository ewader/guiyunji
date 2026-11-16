# 归云集（guiyun）

中国传统文化题材的 Hugo 静态站，日更一篇。线上 <https://www.guiyun.org>，由 Cloudflare Pages 从 GitHub 自动构建。

## 事实

- 仓库：`git@github.com:ewader/guiyunji.git`，分支 `main`
- 线上构建用 **Hugo 0.147**，本机是 0.169 —— 模板只能用 0.147 就有的函数，**禁用 `hugo.Data`**（本地能过、线上静默失败，站点停在旧版）
- `public/` 是入库的构建产物，必须跟着提交
- 线上不返回 `Last-Modified`／`ETag`，判断生效看新路径 404→200，再核对正文
- push 的密钥：`GIT_SSH_COMMAND='ssh -F /dev/null -o StrictHostKeyChecking=no -o UserKnownHostsFile=/home/liu/.ssh/known_hosts -i /home/liu/.ssh/id_rsa'`

## 命令

```bash
hugo --cleanDestinationDir     # 构建（cleanDestinationDir 会删一批孤儿文件，diff 里成批删除属正常）
cd public && python3 -m http.server 8099   # 本地看效果
```

**不要跑 `hugo server`**：它把 `public/` 全量重建成 `http://localhost:1313` 的 baseURL 并插入 livereload 脚本，一次污染上千个文件。

## 内容约定

- 文章：`content/posts/YYYY-MM-DD-<english-slug>.md`，`date` 固定 `T08:00:00+08:00`
- front matter 必带 `image`（单数，模板读这个）与 `images`（社交分享），都指向 `/images/posts/<slug>/cover.jpg`
- 封面：3:2，1400×934，JPG；站内风格是绢本设色／工笔小品，主体偏一侧、大片留白
- 出图与裁切脚本在 `~/bin/ai-illustration.py`、`~/bin/cover-crop.py`，用法见技能 `guiyun-daily-article`

## 目录

```
content/posts/     文章
static/images/posts/<slug>/cover.jpg   每篇封面
layouts/           模板（改动要格外小心 0.147 兼容）
public/            构建产物，入库
.tmp/              临时件，已 gitignore
```
