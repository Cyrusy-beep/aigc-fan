import os
import shutil
from pathlib import Path

# 中文分类名到英文slug的映射
CATEGORY_TO_SLUG = {
    '聊天ai': 'chat-ai',
    '阅读ai': 'reading-ai',
    '写作ai': 'writing-ai',
    '绘画ai': 'painting-ai',
    '图像ai': 'image-ai',
    '设计ai': 'design-ai',
    '音频ai': 'audio-ai',
    '视频ai': 'video-ai',
    '编程ai': 'coding-ai',
    '开发框架': 'development-frameworks',
    '提示词工程': 'prompt-engineering',
    '办公ai': 'office-ai',
    '内容检测': 'content-detection',
    '模型训练': 'model-training',
    '跨境ai': 'cross-border-ai',
    'ai学习资源': 'ai-learning-resources',
    '背景移除': 'background-removal',
    '无损调整': 'lossless-adjustment',
    '优化修复': 'optimization-repair',
    '物体抹除': 'object-removal',
    '3d-ai': '3d-ai'  # 这个可能已经是英文目录
}

# 确保目录存在
def ensure_dir_exists(dir_path):
    os.makedirs(dir_path, exist_ok=True)

# 迁移目录内容
def migrate_directories():
    base_dir = 'content/categories'
    
    # 确保基目录存在
    if not os.path.exists(base_dir):
        print(f"错误: 基目录 '{base_dir}' 不存在!")
        return
    
    # 获取所有现有目录
    existing_dirs = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]
    
    # 迁移计数器
    migrated_count = 0
    skipped_count = 0
    
    # 处理每个中文目录
    for chinese_dir in existing_dirs:
        # 检查是否是需要迁移的中文目录
        if chinese_dir in CATEGORY_TO_SLUG:
            english_dir = CATEGORY_TO_SLUG[chinese_dir]
            
            # 源目录和目标目录的完整路径
            source_dir = os.path.join(base_dir, chinese_dir)
            target_dir = os.path.join(base_dir, english_dir)
            
            # 如果目标英文目录已存在，检查是否为同一目录
            if os.path.exists(target_dir) and os.path.samefile(source_dir, target_dir):
                print(f"跳过: '{chinese_dir}' 已经是 '{english_dir}'")
                skipped_count += 1
                continue
            
            # 如果目标英文目录已存在但内容不同，仅复制内容
            if os.path.exists(target_dir):
                # 复制所有文件
                for file in os.listdir(source_dir):
                    source_file = os.path.join(source_dir, file)
                    target_file = os.path.join(target_dir, file)
                    
                    if os.path.isfile(source_file):
                        shutil.copy2(source_file, target_file)
                        print(f"复制文件: '{source_file}' -> '{target_file}'")
            else:
                # 目标目录不存在，直接重命名/移动整个目录
                os.rename(source_dir, target_dir)
                print(f"迁移目录: '{chinese_dir}' -> '{english_dir}'")
            
            migrated_count += 1
        else:
            print(f"跳过: '{chinese_dir}' 没有对应的英文slug映射")
            skipped_count += 1
    
    print(f"\n迁移完成: {migrated_count} 个目录已迁移, {skipped_count} 个目录已跳过")

# 运行迁移
if __name__ == "__main__":
    print("开始迁移分类目录从中文到英文...")
    migrate_directories()
    print("迁移完成!") 