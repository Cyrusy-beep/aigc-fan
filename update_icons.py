import yaml
import os

# 定义每个分类的新图标和优化名称（如有需要）
category_updates = {
    "聊天AI": {"icon": "fa-comments", "new_name": "聊天AI"},  # 对话气泡图标
    "阅读AI": {"icon": "fa-book", "new_name": "阅读AI"},  # 书本图标
    "写作AI": {"icon": "fa-pencil", "new_name": "写作AI"},  # 笔图标
    "绘画AI": {"icon": "fa-paint-brush", "new_name": "绘画AI"},  # 画笔图标
    "图像AI": {"icon": "fa-image", "new_name": "图像AI"},  # 图像图标
    "设计AI": {"icon": "fa-object-group", "new_name": "设计AI"},  # 设计图标
    "音频AI": {"icon": "fa-music", "new_name": "音频AI"},  # 音乐图标
    "视频AI": {"icon": "fa-video-camera", "new_name": "视频AI"},  # 视频摄像机图标
    "编程AI": {"icon": "fa-code", "new_name": "编程AI"},  # 代码图标
    "开发框架": {"icon": "fa-cubes", "new_name": "开发框架"},  # 积木/框架图标
    "提示词": {"icon": "fa-magic", "new_name": "提示词工程"},  # 魔杖图标，名称更精确
    "办公AI": {"icon": "fa-briefcase", "new_name": "办公AI"},  # 公文包图标
    "内容检测": {"icon": "fa-shield", "new_name": "内容检测"},  # 盾牌图标
    "训练模型": {"icon": "fa-cogs", "new_name": "模型训练"},  # 齿轮图标，名称更简洁
    "跨境AI": {"icon": "fa-globe", "new_name": "跨境AI"},  # 地球图标
    "学习网站": {"icon": "fa-graduation-cap", "new_name": "AI学习资源"}  # 毕业帽图标，名称更明确
}

# 读取当前YAML文件
yaml_file = "data/webstack.yml"
with open(yaml_file, 'r', encoding='utf-8') as f:
    content = f.read()
    if content.startswith('---\n\n'):
        # 去掉YAML头部
        content = content[5:]

# 解析YAML数据
data = yaml.safe_load(content)

# 备份原文件
backup_file = f"{yaml_file}.icon_backup"
with open(backup_file, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"已将原文件备份为: {backup_file}")

# 更新图标和分类名称
changes_made = 0
for item in data:
    old_name = item['taxonomy']
    if old_name in category_updates:
        # 更新图标
        item['icon'] = category_updates[old_name]['icon']
        changes_made += 1
        
        # 如果有新名称且与旧名称不同，则更新
        new_name = category_updates[old_name]['new_name']
        if new_name != old_name:
            item['taxonomy'] = new_name
            print(f"分类名称已更新: '{old_name}' -> '{new_name}'")
            changes_made += 1
        else:
            print(f"已更新 '{old_name}' 的图标为 {item['icon']}")

# 写入更新后的YAML
try:
    with open(yaml_file, 'w', encoding='utf-8') as f:
        # 添加YAML头部
        f.write('---\n\n')
        yaml.dump(data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
    print(f"已成功更新 {changes_made} 处内容并写入: {yaml_file}")
except Exception as e:
    print(f"写入文件时出错: {e}")
    # 恢复原文件
    with open(yaml_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("已恢复原文件")

print("\n建议的图标和分类名称更改：")
for old_name, updates in category_updates.items():
    print(f"{old_name} -> 图标: {updates['icon']}, 建议名称: {updates['new_name']}") 