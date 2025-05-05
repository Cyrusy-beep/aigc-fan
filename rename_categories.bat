@echo off
chcp 65001 >nul
echo 开始重命名分类目录...

set "timestamp=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "timestamp=%timestamp: =0%"
set "backup_dir=public\categories_backup_%timestamp%"

echo 创建备份目录: %backup_dir%
xcopy "public\categories" "%backup_dir%" /E /I /H

cd public\categories

:: 使用DIR命令和FOR循环遍历目录并重命名
for /d %%D in (*) do (
    set "dirname=%%D"
    call :process_dir "%%D"
)

cd ..\..
echo 分类目录重命名完成！
echo 现在分类链接应该可以正常工作了。
pause
exit /b

:process_dir
set "dirname=%~1"
if "%dirname%"=="聊天ai" (
    rename "%dirname%" "chat-ai"
    echo 重命名: %dirname% -^> chat-ai
) else if "%dirname%"=="绘画ai" (
    rename "%dirname%" "painting-ai"
    echo 重命名: %dirname% -^> painting-ai
) else if "%dirname%"=="图像ai" (
    rename "%dirname%" "image-ai"
    echo 重命名: %dirname% -^> image-ai
) else if "%dirname%"=="写作ai" (
    rename "%dirname%" "writing-ai"
    echo 重命名: %dirname% -^> writing-ai
) else if "%dirname%"=="视频ai" (
    rename "%dirname%" "video-ai"
    echo 重命名: %dirname% -^> video-ai
) else if "%dirname%"=="音频ai" (
    rename "%dirname%" "audio-ai"
    echo 重命名: %dirname% -^> audio-ai
) else if "%dirname%"=="办公ai" (
    rename "%dirname%" "office-ai"
    echo 重命名: %dirname% -^> office-ai
) else if "%dirname%"=="设计ai" (
    rename "%dirname%" "design-ai"
    echo 重命名: %dirname% -^> design-ai
) else if "%dirname%"=="编程ai" (
    rename "%dirname%" "coding-ai"
    echo 重命名: %dirname% -^> coding-ai
) else if "%dirname%"=="3d-ai" (
    echo 跳过已经是英文的目录: %dirname%
) else if "%dirname%"=="阅读ai" (
    rename "%dirname%" "reading-ai"
    echo 重命名: %dirname% -^> reading-ai
) else if "%dirname%"=="跨境ai" (
    rename "%dirname%" "cross-border-ai"
    echo 重命名: %dirname% -^> cross-border-ai
) else if "%dirname%"=="提示词工程" (
    rename "%dirname%" "prompt-engineering"
    echo 重命名: %dirname% -^> prompt-engineering
) else if "%dirname%"=="模型训练" (
    rename "%dirname%" "model-training"
    echo 重命名: %dirname% -^> model-training
) else if "%dirname%"=="开发框架" (
    rename "%dirname%" "development-frameworks"
    echo 重命名: %dirname% -^> development-frameworks
) else if "%dirname%"=="ai学习资源" (
    rename "%dirname%" "ai-learning-resources"
    echo 重命名: %dirname% -^> ai-learning-resources
) else if "%dirname%"=="内容检测" (
    rename "%dirname%" "content-detection"
    echo 重命名: %dirname% -^> content-detection
) else if "%dirname%"=="物体抹除" (
    rename "%dirname%" "object-removal"
    echo 重命名: %dirname% -^> object-removal
) else if "%dirname%"=="背景移除" (
    rename "%dirname%" "background-removal"
    echo 重命名: %dirname% -^> background-removal
) else if "%dirname%"=="无损调整" (
    rename "%dirname%" "lossless-adjustment"
    echo 重命名: %dirname% -^> lossless-adjustment
) else if "%dirname%"=="优化修复" (
    rename "%dirname%" "optimization-repair"
    echo 重命名: %dirname% -^> optimization-repair
)
exit /b 