# 重命名分类目录脚本
# 将public/categories下的中文目录名改为英文slug
# 作用：修复分类页链接问题

# 设置目录路径
$categoriesDir = "public\categories"

# 定义映射关系 - 使用数组避免编码问题
$mappings = @(
    @{Chinese = "聊天ai"; English = "chat-ai"},
    @{Chinese = "阅读ai"; English = "reading-ai"},
    @{Chinese = "写作ai"; English = "writing-ai"},
    @{Chinese = "绘画ai"; English = "painting-ai"},
    @{Chinese = "图像ai"; English = "image-ai"},
    @{Chinese = "设计ai"; English = "design-ai"},
    @{Chinese = "音频ai"; English = "audio-ai"},
    @{Chinese = "视频ai"; English = "video-ai"},
    @{Chinese = "编程ai"; English = "coding-ai"},
    @{Chinese = "开发框架"; English = "development-frameworks"},
    @{Chinese = "提示词工程"; English = "prompt-engineering"},
    @{Chinese = "办公ai"; English = "office-ai"},
    @{Chinese = "内容检测"; English = "content-detection"},
    @{Chinese = "模型训练"; English = "model-training"},
    @{Chinese = "跨境ai"; English = "cross-border-ai"},
    @{Chinese = "ai学习资源"; English = "ai-learning-resources"},
    @{Chinese = "背景移除"; English = "background-removal"},
    @{Chinese = "无损调整"; English = "lossless-adjustment"},
    @{Chinese = "优化修复"; English = "optimization-repair"},
    @{Chinese = "物体抹除"; English = "object-removal"},
    @{Chinese = "3d ai"; English = "3d-ai"}
)

Write-Host "开始重命名分类目录..." -ForegroundColor Green

# 备份categories目录
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "public\categories_backup_$timestamp"
Write-Host "创建备份目录: $backupDir" -ForegroundColor Yellow
Copy-Item -Path $categoriesDir -Destination $backupDir -Recurse -Force

# 遍历categories目录下的所有文件夹
Get-ChildItem -Path $categoriesDir -Directory | ForEach-Object {
    $dirName = $_.Name
    $lowerDirName = $dirName.ToLower()
    
    Write-Host "检查目录: $dirName" -ForegroundColor Gray
    
    # 检查是否有匹配的映射
    foreach ($mapping in $mappings) {
        if ($lowerDirName -eq $mapping.Chinese.ToLower()) {
            $newName = $mapping.English
            $oldPath = Join-Path -Path $categoriesDir -ChildPath $dirName
            $newPath = Join-Path -Path $categoriesDir -ChildPath $newName
            
            # 检查目标目录是否已存在
            if (Test-Path $newPath) {
                Write-Host "目标目录 $newPath 已存在，先删除它" -ForegroundColor Yellow
                Remove-Item -Path $newPath -Recurse -Force
            }
            
            # 重命名目录
            Write-Host "重命名: $dirName -> $newName" -ForegroundColor Cyan
            Rename-Item -Path $oldPath -NewName $newName -Force
            break
        }
    }
}

Write-Host "分类目录重命名完成!" -ForegroundColor Green
Write-Host "现在分类链接应该可以正常工作了。" -ForegroundColor Green 