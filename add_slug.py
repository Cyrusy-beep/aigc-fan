import re
import sys

# 定义分类到slug的映射
category_to_slug = {
    "聊天AI": "chat-ai",
    "阅读AI": "reading-ai",
    "写作AI": "writing-ai",
    "绘画AI": "painting-ai",
    "图像AI": "image-ai",
    "设计AI": "design-ai",
    "音频AI": "audio-ai",
    "视频AI": "video-ai",
    "编程AI": "coding-ai",
    "开发框架": "development-frameworks",
    "提示词工程": "prompt-engineering",
    "办公AI": "office-ai",
    "内容检测": "content-detection",
    "模型训练": "model-training",
    "跨境AI": "cross-border-ai",
    "AI学习资源": "ai-learning-resources",
    "背景移除": "background-removal",
    "无损调整": "lossless-adjustment",
    "优化修复": "optimization-repair",
    "物体抹除": "object-removal",
    "3D AI": "3d-ai"
}

def add_slug_to_taxonomy(input_file, output_file):
    # 读取原始文件
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定义正则表达式模式来匹配taxonomy行和后面的行
    pattern = r'(- taxonomy: ([^\n]+))\n  (icon:)'
    
    # 查找所有匹配并在每个taxonomy后添加slug
    def add_slug(match):
        taxonomy_line = match.group(1)
        taxonomy_name = match.group(2)
        next_line = match.group(3)
        
        # 获取对应的slug，如果未定义则使用kebab-case的taxonomy名称
        if taxonomy_name in category_to_slug:
            slug = category_to_slug[taxonomy_name]
        else:
            # 将中文转换为拼音或其他处理方式（这里简化处理）
            slug = taxonomy_name.lower().replace(' ', '-')
        
        # 返回修改后的内容
        return f"{taxonomy_line}\n  slug: {slug}\n  {next_line}"
    
    # 替换内容
    modified_content = re.sub(pattern, add_slug, content)
    
    # 处理子分类 (list中的term)
    list_pattern = r'(    - term: ([^\n]+))\n      (links:)'
    def add_slug_to_term(match):
        term_line = match.group(1)
        term_name = match.group(2)
        next_line = match.group(3)
        
        # 获取对应的slug
        if term_name in category_to_slug:
            slug = category_to_slug[term_name]
        else:
            slug = term_name.lower().replace(' ', '-')
        
        return f"{term_line}\n      slug: {slug}\n      {next_line}"
    
    modified_content = re.sub(list_pattern, add_slug_to_term, modified_content)
    
    # 写入新文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(modified_content)
    
    print(f"完成！已将slug字段添加到{output_file}")

if __name__ == "__main__":
    input_file = "data/webstack.yml"
    output_file = "data/webstack_with_slug.yml"
    add_slug_to_taxonomy(input_file, output_file) 