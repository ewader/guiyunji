# 项目概览

这是一个基于 **Hugo** 静态站点生成器的博客项目，名为 "guiyun"（归云）。Hugo 是一个用 Go 语言编写的快速、现代化的静态网站生成器。

## 项目类型

- **类型**: 静态网站/博客
- **核心技术**: Hugo (Go 语言)
- **用途**: 博客或内容网站

## 项目结构

```
/home/liu/blog/guiyun/
├── hugo.toml          # Hugo 主配置文件
├── archetypes/        # 内容原型模板
│   └── default.md     # 默认的 Markdown 文章模板
├── assets/            # 资源文件（CSS、JS 等，目前为空）
├── content/           # 网站内容目录（Markdown 文章，目前为空）
├── data/              # 数据文件（目前为空）
├── i18n/              # 国际化文件（目前为空）
├── layouts/           # 自定义布局模板（目前为空）
├── static/            # 静态文件（图片、 favicon 等，目前为空）
└── themes/            # Hugo 主题目录（目前为空）
```

## 配置说明

### hugo.toml

当前配置：
- **baseURL**: `https://example.org/` - 需要更新为实际域名
- **languageCode**: `en-us` - 英文语言设置
- **title**: `My New Hugo Project` - 网站标题（需要更新）

## 构建和运行

### 前置要求
- Hugo 静态站点生成器（需要安装）

### 常用命令

```bash
# 构建网站（生成到 public/ 目录）
hugo

# 启动本地开发服务器（默认端口 1313）
hugo server

# 启动开发服务器并监听文件变化
hugo server --watch

# 构建并包含草稿
hugo -D

# 创建新文章
hugo new content/posts/my-first-post.md
```

## 开发约定

### 内容创建
- 使用 `hugo new content/<path>/<filename>.md` 创建新文章
- 新文章会自动使用 `archetypes/default.md` 模板
- Markdown 文件使用 Front Matter（前置元数据）格式

### Front Matter 格式
新文章默认包含：
```toml
+++
date = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
+++
```

### 主题管理
- 当前 `themes/` 目录为空，项目未安装任何主题
- 可以通过添加子模块或下载主题到 `themes/` 目录
- 也可以使用自定义布局（`layouts/` 目录）

### 内容组织
- 所有网站内容应放在 `content/` 目录下
- 静态资源（图片、CSS、JS）放在 `static/` 目录
- 可处理的资源（Sass、PostCSS 等）放在 `assets/` 目录

## 待办事项

- [ ] 更新 `hugo.toml` 中的 `baseURL` 为实际域名
- [ ] 更新 `hugo.toml` 中的 `title` 为实际网站标题
- [ ] 考虑安装或创建 Hugo 主题
- [ ] 在 `content/` 目录下创建博客文章
- [ ] 配置语言设置（如需要中文支持）

## 相关资源

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Hugo 主题库](https://themes.gohugo.io/)