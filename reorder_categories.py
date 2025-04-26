import yaml
import os

# 定义新的分类顺序
new_order = [
    "聊天AI",
    "阅读AI",
    "写作AI",
    "绘画AI",
    "图像AI",
    "设计AI",
    "音频AI",
    "视频AI",
    "编程AI",
    "开发框架",
    "提示词",
    "办公AI",
    "内容检测",
    "训练模型",
    "跨境AI",
    "学习网站"
]

# 读取当前YAML文件
yaml_file = "data/webstack.yml"
with open(yaml_file, 'r', encoding='utf-8') as f:
    content = f.read()
    if content.startswith('---\n\n'):
        # 去掉YAML头部
        content = content[5:]

# 解析YAML数据
data = yaml.safe_load(content)

# 创建一个按新顺序排序的数据字典
sorted_data = []
category_dict = {item['taxonomy']: item for item in data}

# 按新顺序添加分类
for category_name in new_order:
    if category_name in category_dict:
        sorted_data.append(category_dict[category_name])
    else:
        print(f"警告: 分类 '{category_name}' 在原始数据中不存在")

# 备份原文件
backup_file = f"{yaml_file}.bak"
os.rename(yaml_file, backup_file)
print(f"已将原文件备份为: {backup_file}")

# 写入排序后的YAML
try:
    with open(yaml_file, 'w', encoding='utf-8') as f:
        # 添加YAML头部
        f.write('---\n\n')
        yaml.dump(sorted_data, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
    print(f"已成功重新排序并写入: {yaml_file}")
except Exception as e:
    print(f"写入文件时出错: {e}")
    # 恢复原文件
    os.rename(backup_file, yaml_file)
    print("已恢复原文件") 