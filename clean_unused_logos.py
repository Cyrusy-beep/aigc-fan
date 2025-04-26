#!/usr/bin/env python3
import os
import re
import shutil

# 备份文件夹
backup_dir = "backup/logos_backup_unused"
os.makedirs(backup_dir, exist_ok=True)

# 读取webstack.yml文件中使用的logo文件
with open('data/webstack.yml', 'r', encoding='utf-8') as file:
    content = file.read()

# 提取出所有logo文件名
used_logos = re.findall(r'logo: /assets/images/logos/([^"\'\n]+)', content)
print(f"在webstack.yml中找到 {len(used_logos)} 个logo文件引用")

# 统计文件数
logos_dir = "static/assets/images/logos"
all_logos = os.listdir(logos_dir)
print(f"在 {logos_dir} 目录中共有 {len(all_logos)} 个文件")

# 创建未使用文件列表
unused_logos = []
for logo in all_logos:
    if logo not in used_logos:
        unused_logos.append(logo)

print(f"找到 {len(unused_logos)} 个未使用的logo文件")

# 移动未使用的文件到备份目录
moved_count = 0
for logo in unused_logos:
    source_path = os.path.join(logos_dir, logo)
    target_path = os.path.join(backup_dir, logo)
    try:
        shutil.move(source_path, target_path)
        moved_count += 1
    except Exception as e:
        print(f"移动文件 {logo} 时出错: {e}")

print(f"成功移动 {moved_count} 个未使用的logo文件到 {backup_dir} 目录")
print("清理完成!") 