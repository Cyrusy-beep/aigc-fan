#!/usr/bin/env python3
import yaml
import re

# 读取原始文件
with open('data/webstack.yml', 'r', encoding='utf-8') as file:
    content = file.read()

# 进行路径替换
# 从 assets/images/logos/ 到 /assets/images/logos/
content = re.sub(r'logo: assets/', r'logo: /assets/', content)

# 写回文件
with open('data/webstack.yml', 'w', encoding='utf-8') as file:
    file.write(content)

print("已更新webstack.yml中的logo路径") 