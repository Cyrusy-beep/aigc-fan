#!/usr/bin/env python3
import os
import re
import shutil

# 备份文件夹
backup_dir = "backup/theme_logos_backup"
os.makedirs(backup_dir, exist_ok=True)

# 读取webstack.yml文件中使用的logo文件
with open('data/webstack.yml', 'r', encoding='utf-8') as file:
    content = file.read()

# 提取出所有logo文件名
used_logos = re.findall(r'logo: /assets/images/logos/([^"\'\n]+)', content)
print(f"在webstack.yml中找到 {len(used_logos)} 个logo文件引用")

# 统计主题中的logo文件
theme_logos_dir = "themes/webstack-hugo/static/assets/images/logos"
if os.path.exists(theme_logos_dir):
    theme_logos = os.listdir(theme_logos_dir)
    print(f"在 {theme_logos_dir} 目录中共有 {len(theme_logos)} 个文件")

    # 备份并移除主题中的logo目录，因为我们已经将所有需要的logo移到了static目录
    try:
        # 备份主题logo目录
        for logo in theme_logos:
            source_path = os.path.join(theme_logos_dir, logo)
            target_path = os.path.join(backup_dir, logo)
            try:
                shutil.copy2(source_path, target_path)
            except Exception as e:
                print(f"备份文件 {logo} 时出错: {e}")
        
        # 移除主题logo目录
        shutil.rmtree(theme_logos_dir)
        print(f"已备份并移除 {theme_logos_dir} 目录")
    except Exception as e:
        print(f"处理主题logo目录时出错: {e}")
else:
    print(f"{theme_logos_dir} 目录不存在")

# 检查public目录中的logo
public_logos_dir = "public/assets/images/logos"
if os.path.exists(public_logos_dir):
    try:
        # 移除public中的logo目录，因为这应该由Hugo自动生成
        shutil.rmtree(public_logos_dir)
        print(f"已移除 {public_logos_dir} 目录")
    except Exception as e:
        print(f"移除 {public_logos_dir} 目录时出错: {e}")
else:
    print(f"{public_logos_dir} 目录不存在")

print("清理完成!") 