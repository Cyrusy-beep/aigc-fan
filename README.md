# AIGC-Fan AI工具导航

![AIGC-Fan Logo](/assets/images/site/logo_AigcFan.png)

## 项目简介

AIGC-Fan 是一个精心设计的AI工具导航网站，旨在帮助用户快速发现和使用最新、最实用的人工智能工具。本站点收集整理了各类AI工具，包括聊天AI、阅读AI、写作AI、绘画AI、图像AI、设计AI、音频AI、视频AI、编程AI等多个分类，为AI爱好者和专业用户提供一站式工具索引服务。

网站地址：[https://www.aigc-fan.com/](https://www.aigc-fan.com/)

## 最近更新

- **2025-04-25**: 移除JS中的theme-toggle-btn按钮，消除与HTML模板中的主题切换按钮重复，优化页面性能和用户体验。
- **2025-04-25**: 将主题切换按钮从页面右下角移至顶部导航栏，使其在所有设备上更加醒目且易于访问，提升用户体验。
- **2025-04-25**: 优化移动端主题切换按钮样式，将其固定在右下角位置，并增加z-index确保其始终位于顶层，保持与桌面版视觉一致性，提升移动端用户体验。
- **2025-04-25**: 优化项目目录结构，统一整合logo存放位置，提高项目维护效率。

## SEO优化说明

为提高网站在搜索引擎中的可见性和排名，我们进行了以下SEO优化：

1. **网站标题与描述**：
   - 优化了网站标题为"AigcFan - 专业AI工具导航平台 | 发现最优质人工智能应用"
   - 扩展了网站描述，使其更加详细并包含关键词
   - 添加了关键词列表，涵盖各类AI工具相关术语

2. **Robots.txt优化**：
   - 允许搜索引擎爬取关键页面
   - 禁止爬取无关紧要的资源文件和重复内容
   - 添加了爬取频率控制，避免服务器负载过高
   - 清晰指明了网站地图位置

3. **Sitemap.xml优化**：
   - 添加了更多XML命名空间支持
   - 为每个分类页面添加了描述标签
   - 优化了更新频率和优先级设置
   - 完善了URL结构

4. **内容优化建议**：
   - 为每个AI工具添加更详细的描述，包含关键词
   - 保持工具信息的更新，确保链接有效
   - 考虑添加工具使用教程或评测内容，增加内容深度

## 技术栈

- **静态网站生成器**：[Hugo](https://gohugo.io/)
- **主题**：[webstack-hugo](https://github.com/iplaycode/webstack-hugo) (经过定制化修改)
- **数据格式**：YAML
- **部署**：静态网站托管

## 目录结构

```
aigc-fan/
├── archetypes/          # Hugo的内容模板目录
├── backup/              # 备份文件目录
├── content/             # 网站内容目录
├── data/                # 数据文件目录
│   └── webstack.yml     # 主要的工具数据文件
├── public/              # 生成的静态网站文件
│   └── assets/          # 生成的静态资源（由static目录生成）
├── static/              # 静态资源源文件
│   └── assets/          
│       └── images/      # 图片资源
│           ├── logos/   # 工具logo统一存放目录
│           └── site/    # 网站自身logo和图标
├── themes/              # Hugo主题目录
│   └── webstack-hugo/   # 使用的主题
├── config.toml          # Hugo配置文件
├── logos_list.txt       # 工具logo列表
├── reorder_categories.py # 分类重排序脚本
├── update_icons.py      # 图标更新脚本
└── README.md            # 项目说明文档
```

## 主要功能

1. **分类导航**：按功能领域归类AI工具，方便用户快速查找
2. **搜索功能**：支持快速搜索特定AI工具
3. **简洁描述**：每个工具都有logo、简短描述和官方链接
4. **响应式设计**：适配各种设备屏幕尺寸
5. **暗黑模式**：（可在配置中启用）

## 如何添加/修改工具

所有AI工具的数据都存储在 `data/webstack.yml` 文件中，采用YAML格式组织。

### 工具数据结构

```yaml
- taxonomy: 分类名称  # 例如：聊天AI、绘画AI等
  icon: fa-图标名称   # 使用Font Awesome图标，例如：fa-comments
  links:             # 该分类下的工具列表
  - title: 工具名称   # 工具的显示名称
    logo: /assets/images/logos/logo_工具名.png  # 工具的logo路径
    url: https://工具官网地址/  # 工具的官方网站链接
    description: 工具的简短描述  # 简洁描述工具的主要功能
```

### 添加新工具

1. 将工具的logo保存到 `static/assets/images/logos/` 目录，建议命名为 `logo_工具名.png`
2. 打开 `data/webstack.yml` 文件
3. 找到相应的分类，在 `links` 列表中添加新工具的信息
4. 保存文件后重新生成网站

### 添加新分类

1. 打开 `data/webstack.yml` 文件
2. 在文件末尾添加新的分类信息，按照以下格式：

```yaml
- taxonomy: 新分类名称
  icon: fa-新分类图标
  links:
  - title: 第一个工具名称
    logo: /assets/images/logos/logo_工具名.png
    url: https://工具官网地址/
    description: 工具的简短描述
```

3. 如果需要调整分类的显示顺序，可以修改 `reorder_categories.py` 脚本中的 `new_order` 列表
4. 运行 `python reorder_categories.py` 更新分类顺序

## 工具脚本使用说明

### 分类重排序脚本

`reorder_categories.py` 用于调整分类的显示顺序。

使用方法：
```bash
python reorder_categories.py
```

脚本会根据 `new_order` 列表中定义的顺序重新排列 `data/webstack.yml` 中的分类。

### 图标更新脚本

`update_icons.py` 用于更新分类的图标和名称。

使用方法：
```bash
python update_icons.py
```

脚本会根据 `category_updates` 字典中定义的图标和名称更新 `data/webstack.yml` 中的分类信息。

## 网站生成和部署

### 本地开发

1. 安装 [Hugo](https://gohugo.io/getting-started/installing/)
2. 克隆本项目
3. 在项目根目录运行 `hugo server` 启动本地开发服务器
4. 浏览器访问 http://localhost:1313/ 预览网站

### 生成静态网站

```bash
hugo
```

生成的静态网站文件将保存在 `public` 目录中。

### 部署

将 `public` 目录中的文件上传到你的网站托管服务商。

## 配置说明

主要配置文件是 `config.toml`，其中包含网站的基本设置：

- `baseURL`：网站的基础URL
- `languageCode`：网站语言
- `title`：网站标题
- `theme`：使用的主题
- `copyright`：版权信息
- `enableRobotsTXT`：是否启用robots.txt

其他配置项：
- `[params.search]` - 搜索功能配置
- `[params.darkmode]` - 暗黑模式配置

## 贡献指南

欢迎为AIGC-Fan项目做出贡献！您可以通过以下方式参与：

1. 提交新的AI工具信息
2. 修正现有工具信息的错误
3. 改进网站功能和用户体验
4. 优化代码结构和性能

## 许可证

本项目采用[MIT许可证](LICENSE)。

## 联系方式

如有任何问题或建议，请联系：admin@aigc-fan.com 