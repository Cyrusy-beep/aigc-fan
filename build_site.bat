@echo off
echo 开始构建网站...
hugo

echo 网站构建完成，开始修复分类目录...
call rename_categories.bat

echo 开始清理中文目录...
python cleanup_public_categories.py

echo 所有操作完成!
pause 