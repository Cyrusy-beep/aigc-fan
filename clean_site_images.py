#!/usr/bin/env python3
import os
import shutil

# 备份文件夹
backup_dir = "backup/site_images_backup"
os.makedirs(backup_dir, exist_ok=True)

# 主题中的原始图像目录
theme_images_dir = "themes/webstack-hugo/static/assets/images"
# 我们的统一图像目录
site_images_dir = "static/assets/images/site"

# 检查public目录中的图像
public_images_dir = "public/assets/images"
if os.path.exists(public_images_dir):
    # 备份public中的自定义图像（除了logos目录）
    public_files = [f for f in os.listdir(public_images_dir) if os.path.isfile(os.path.join(public_images_dir, f))]
    
    for file in public_files:
        source_path = os.path.join(public_images_dir, file)
        target_path = os.path.join(backup_dir, file)
        try:
            if not os.path.exists(target_path):
                shutil.copy2(source_path, target_path)
                print(f"已备份 {source_path} 到 {target_path}")
        except Exception as e:
            print(f"备份文件 {file} 时出错: {e}")
    
    # 移除public中除了site目录外的所有文件（因为这些应该由Hugo自动生成）
    for file in public_files:
        try:
            os.remove(os.path.join(public_images_dir, file))
            print(f"已移除 {os.path.join(public_images_dir, file)}")
        except Exception as e:
            print(f"移除文件 {file} 时出错: {e}")
else:
    print(f"{public_images_dir} 目录不存在")

# 备份并清理theme主题中的图像文件（除了flags目录）
if os.path.exists(theme_images_dir):
    theme_files = [f for f in os.listdir(theme_images_dir) if os.path.isfile(os.path.join(theme_images_dir, f))]
    
    # 确保所有主题图像都已经复制到site目录
    for file in theme_files:
        source_path = os.path.join(theme_images_dir, file)
        site_target_path = os.path.join(site_images_dir, file)
        backup_target_path = os.path.join(backup_dir, file)
        
        # 如果site目录中不存在此文件，从主题目录复制
        if not os.path.exists(site_target_path):
            try:
                shutil.copy2(source_path, site_target_path)
                print(f"已复制 {source_path} 到 {site_target_path}")
            except Exception as e:
                print(f"复制文件 {file} 到site目录时出错: {e}")
        
        # 备份主题文件
        if not os.path.exists(backup_target_path):
            try:
                shutil.copy2(source_path, backup_target_path)
                print(f"已备份 {source_path} 到 {backup_target_path}")
            except Exception as e:
                print(f"备份文件 {file} 时出错: {e}")
    
    # 移除主题中的图像文件
    for file in theme_files:
        try:
            os.remove(os.path.join(theme_images_dir, file))
            print(f"已移除 {os.path.join(theme_images_dir, file)}")
        except Exception as e:
            print(f"移除文件 {file} 时出错: {e}")
else:
    print(f"{theme_images_dir} 目录不存在")

print("网站图像清理完成!") 