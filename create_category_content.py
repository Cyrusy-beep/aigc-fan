import os
import yaml
import re
from datetime import datetime

# 读取 webstack.yml 文件
with open('data/webstack.yml', 'r', encoding='utf-8') as file:
    data = yaml.safe_load(file)

# 确保 categories 目录存在
os.makedirs('content/categories', exist_ok=True)

# 用于将分类名转换为URL友好的格式
def slugify(text):
    # 转换为小写并移除非字母数字字符
    text = text.lower()
    text = re.sub(r'[^a-z0-9\u4e00-\u9fff]+', '-', text)
    # 移除开头和结尾的连字符
    text = text.strip('-')
    return text

# 中文分类名到英文slug的映射
CATEGORY_TO_SLUG = {
    '聊天AI': 'chat-ai',
    '阅读AI': 'reading-ai',
    '写作AI': 'writing-ai',
    '绘画AI': 'painting-ai',
    '图像AI': 'image-ai',
    '设计AI': 'design-ai',
    '音频AI': 'audio-ai',
    '视频AI': 'video-ai',
    '编程AI': 'coding-ai',
    '开发框架': 'development-frameworks',
    '提示词工程': 'prompt-engineering',
    '办公AI': 'office-ai',
    '内容检测': 'content-detection',
    '模型训练': 'model-training',
    '跨境AI': 'cross-border-ai',
    'AI学习资源': 'ai-learning-resources',
    '背景移除': 'background-removal',
    '无损调整': 'lossless-adjustment',
    '优化修复': 'optimization-repair',
    '物体抹除': 'object-removal',
    '3D AI': '3d-ai'
}

# 为每个分类生成详细描述
category_descriptions = {
    "聊天AI": {
        "concept": "聊天AI是一种能够模拟人类对话的人工智能技术，通过自然语言处理和机器学习算法，实现与用户的即时交流和问题解答。这类AI可以理解上下文、记忆对话历史、提供准确回应，并随着交互不断学习改进。",
        "usage": "聊天AI技术广泛应用于客户服务、个人助理、知识问答、语言学习、心理支持等领域。它们能够24小时不间断工作，处理高并发对话，大大提高沟通效率和用户体验。",
        "features": "现代聊天AI系统通常具备多轮对话能力、情感理解、个性化定制、多语言支持、知识检索以及与其他系统集成的能力，使得人机交互变得更加自然流畅。"
    },
    "绘画AI": {
        "concept": "绘画AI是利用深度学习和计算机视觉技术，根据文本描述或参考图像自动生成图像的人工智能系统。这类AI能够理解用户的创意需求，并将其转化为视觉表现形式。",
        "usage": "绘画AI被广泛应用于设计、艺术创作、游戏开发、广告制作、内容营销等领域。它们可以快速生成概念草图、插图、艺术作品、产品设计图等，大大节省了创作时间。",
        "features": "现代绘画AI系统通常支持文本到图像生成、图像编辑修改、风格迁移、图像放大增强以及多样化输出控制，使创作过程更加灵活多变。"
    },
    "写作AI": {
        "concept": "写作AI是一种能够生成、编辑和优化文本内容的人工智能技术，它通过分析大量文本数据，学习语言规律、风格特点和知识体系，从而能够创作各类文本内容。",
        "usage": "写作AI可以应用于内容创作、文案撰写、邮件回复、报告生成、文档翻译、学术写作等众多场景，帮助用户提高写作效率，克服创作瓶颈。",
        "features": "现代写作AI通常支持多种文体和风格的生成、内容优化与润色、语法检查与纠错、文章结构建议、创意构思等功能，使文本创作过程更加流畅高效。"
    },
    "图像AI": {
        "concept": "图像AI是专注于处理、分析和生成视觉内容的人工智能技术，它结合计算机视觉和深度学习，能够理解、优化和创造图像数据。",
        "usage": "图像AI广泛应用于图像识别、内容审核、医学影像分析、安防监控、零售分析等领域，通过智能处理视觉信息，为各行业带来效率提升和价值创新。",
        "features": "现代图像AI系统通常具备物体检测与识别、图像分类、人脸识别、场景理解、图像增强与修复等能力，可以从视觉数据中提取有价值的信息。"
    },
    "视频AI": {
        "concept": "视频AI是专门处理、分析和生成动态视觉内容的人工智能技术，它整合了计算机视觉、深度学习和视频处理技术，能够理解和创造连续的视觉序列。",
        "usage": "视频AI广泛应用于视频创作、影视后期、直播增强、智能剪辑、内容审核、安防监控等领域，通过自动化处理复杂的视频内容，大幅提升工作效率。",
        "features": "现代视频AI系统通常具备视频内容识别、人物跟踪、动作捕捉、情感分析、视频增强、智能合成等能力，可以处理从短视频到长片的各类内容。"
    },
    "音频AI": {
        "concept": "音频AI是专注于处理、分析和生成声音内容的人工智能技术，它结合语音识别、自然语言处理和声学模型，能够理解和创造各类音频数据。",
        "usage": "音频AI广泛应用于语音识别、声音合成、音乐创作、音频编辑、语音助手、实时翻译等领域，通过智能处理声音信息，提升交互体验和创作效率。",
        "features": "现代音频AI系统通常具备语音转文字、文字转语音、声音分离、音频增强、音乐生成、情感识别等能力，可以从声音数据中提取和创造有价值的内容。"
    },
    "编程AI": {
        "concept": "编程AI是辅助软件开发过程的人工智能技术，它通过学习大量代码库和编程模式，能够辅助开发者编写、优化和调试代码。",
        "usage": "编程AI可用于代码补全、错误检测、代码生成、重构建议、API推荐、自动文档生成等方面，帮助程序员提高开发效率，减少常见错误。",
        "features": "现代编程AI通常支持多种编程语言，能够理解代码语义，提供上下文相关的建议，甚至能够根据自然语言描述生成符合要求的代码片段。"
    },
    "设计AI": {
        "concept": "设计AI是辅助创意和设计过程的人工智能技术，它结合视觉理解和创意生成能力，帮助设计师在各个设计阶段提高效率和创造力。",
        "usage": "设计AI广泛应用于UI/UX设计、品牌设计、产品设计、建筑设计、时尚设计等领域，通过自动化处理设计元素和布局，简化设计流程。",
        "features": "现代设计AI系统通常具备布局生成、风格迁移、配色推荐、设计变体生成、用户测试分析等能力，为设计师提供创意启发和效率工具。"
    },
    "3D AI": {
        "concept": "3D AI是专注于三维内容处理和生成的人工智能技术，它结合计算机图形学和深度学习，能够创建、分析和优化3D模型和场景。",
        "usage": "3D AI广泛应用于游戏开发、影视制作、建筑设计、虚拟现实、产品设计、教育培训等领域，通过自动化3D内容创建过程，大幅降低制作门槛。",
        "features": "现代3D AI系统通常具备3D模型生成、纹理创建、姿态估计、场景重建、物理模拟、动画生成等能力，使三维创作过程更加高效直观。"
    },
    "办公AI": {
        "concept": "办公AI是辅助日常工作和办公任务的人工智能技术，它整合了自然语言处理、数据分析和自动化流程，提高办公效率和工作质量。",
        "usage": "办公AI可用于会议记录、日程安排、邮件管理、文档处理、数据分析、任务协作等方面，帮助专业人士减少重复性工作，专注于更有价值的任务。",
        "features": "现代办公AI通常提供智能助手、自动化工作流、文档分析与总结、信息检索、会议助手等功能，使办公环境更加智能高效。"
    }
}

# 其他分类的通用描述
default_description = {
    "concept": "这类AI工具是人工智能技术应用于专业领域的重要分支，通过机器学习算法和特定领域知识，为用户提供智能化解决方案。",
    "usage": "这类AI工具可以应用于效率提升、创意辅助、专业分析、自动化处理等多种场景，帮助用户克服传统方法的局限，实现更高效的工作流程。",
    "features": "现代AI工具通常具备直观的用户界面、强大的后台算法、灵活的定制选项、实时处理能力以及与其他工具的集成功能，为用户创造全新的工作体验。"
}

# 创建分类页面的模板
template = """---
title: "{category}"
date: {date}
draft: false
type: "category"
layout: "category"
---

## {category}的概念与原理

{concept}

## {category}的主要用途

{usage}

## {category}的特点与优势

{features}

## 如何选择适合的{category}工具

选择适合的{category}工具时，建议考虑以下几个方面：

1. **功能匹配度**：工具提供的功能是否能满足您的具体需求，是否涵盖您工作流程中的关键环节。
2. **易用性**：界面设计是否直观，学习曲线是否平缓，是否有中文支持等。
3. **性能与质量**：工具的处理速度、输出质量、稳定性如何，是否能满足您的专业标准。
4. **价格策略**：免费版本是否足够，付费方案是否合理，是一次性付费还是订阅模式。
5. **更新与支持**：开发团队是否活跃，工具是否定期更新，客户支持是否及时有效。
6. **社区与口碑**：其他用户的评价如何，是否有活跃的用户社区可以交流经验。

## {category}的未来发展趋势

随着人工智能技术的不断进步，{category}领域呈现出以下发展趋势：

1. **更强的个性化能力**：能够根据用户的使用习惯和偏好，提供更加定制化的体验。
2. **多模态融合**：结合文本、图像、音频等多种数据形式，实现更全面的功能。
3. **低代码/无代码接口**：降低使用门槛，使非技术背景用户也能轻松操作。
4. **实时协作功能**：支持多人同时参与，提高团队协作效率。
5. **更强的领域专业性**：针对特定行业和场景提供深度优化的解决方案。

我们会持续关注{category}领域的最新发展，为您更新最优质、最实用的工具推荐。
"""

# 当前日期，用于页面元数据
current_date = datetime.now().strftime("%Y-%m-%d")

# 处理所有分类
categories = set()

# 收集主分类
for item in data:
    category = item.get('taxonomy')
    if category:
        categories.add(category)
    
    # 收集子分类
    if 'list' in item:
        for subitem in item['list']:
            subcategory = subitem.get('term')
            if subcategory:
                categories.add(subcategory)

# 为每个分类创建页面
for category in categories:
    # 获取英文slug
    if category in CATEGORY_TO_SLUG:
        category_slug = CATEGORY_TO_SLUG[category]
    else:
        # 如果在映射表中不存在，则使用默认的slugify函数
        category_slug = slugify(category)
    
    # 创建分类的目录 - 使用英文slug
    category_dir = f'content/categories/{category_slug}'
    os.makedirs(category_dir, exist_ok=True)
    
    # 获取分类描述，如果没有预定义描述则使用默认描述
    description = category_descriptions.get(category, default_description)
    
    # 创建 _index.md 文件
    with open(f'{category_dir}/_index.md', 'w', encoding='utf-8') as file:
        file.write(template.format(
            category=category,
            date=current_date,
            concept=description["concept"],
            usage=description["usage"],
            features=description["features"]
        ))
    
    print(f"已创建详细分类页面: {category} (目录: {category_slug})")

print(f"共创建了 {len(categories)} 个详细分类页面") 