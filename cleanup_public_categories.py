import os
import shutil
from pathlib import Path

# 中文分类名列表 - 这些目录需要被删除
CHINESE_CATEGORIES = [
    '聊天ai', '阅读ai', '写作ai', '绘画ai', '图像ai', '设计ai', '音频ai', '视频ai', 
    '编程ai', '开发框架', '提示词工程', '办公ai', '内容检测', '模型训练', '跨境ai', 
    'ai学习资源', '背景移除', '无损调整', '优化修复', '物体抹除'
]

def cleanup_public_categories():
    base_dir = 'public/categories'
    
    # 确保基目录存在
    if not os.path.exists(base_dir):
        print(f"错误: 公共目录 '{base_dir}' 不存在!")
        return
    
    # 删除计数器
    deleted_count = 0
    
    # 处理每个中文目录
    for chinese_dir in CHINESE_CATEGORIES:
        dir_path = os.path.join(base_dir, chinese_dir)
        
        if os.path.exists(dir_path):
            try:
                # 删除目录及其内容
                shutil.rmtree(dir_path)
                print(f"已删除: '{chinese_dir}'")
                deleted_count += 1
            except Exception as e:
                print(f"删除 '{chinese_dir}' 时出错: {e}")
        else:
            print(f"目录不存在，跳过: '{chinese_dir}'")
    
    print(f"\n清理完成: 共删除了 {deleted_count} 个中文目录")

if __name__ == "__main__":
    print("开始清理public/categories目录中的中文目录...")
    cleanup_public_categories()
    print("清理完成!") 