# AIGC-Fan 目录结构优化文档

## 优化背景

项目中发现logo存放在多个不同位置，不利于统一管理和维护，比如：
- 部分logo存放在 `public/assets/images/logos/` 目录
- 部分logo存放在 `themes/webstack-hugo/static/assets/images/logos/` 目录
- 网站自身logo分散在不同目录

## 优化方案

1. **统一logo存放目录**：
   - 创建 `static/assets/images/logos/` 目录，作为所有AI工具logo的统一存放位置
   - 创建 `static/assets/images/site/` 目录，专门存放网站自身的logo和图标

2. **路径规范化**：
   - 所有logo路径统一使用 `/assets/images/logos/logo_工具名.png` 格式
   - 网站自身logo路径统一使用 `/assets/images/site/` 开头

3. **更新引用**：
   - 更新 `data/webstack.yml` 文件中的所有logo路径
   - 更新 `README.md` 中的logo路径和目录结构说明

4. **清理未使用的logo**：
   - 移除未在 `data/webstack.yml` 中引用的logo文件
   - 将这些文件备份到 `backup/logos_backup_unused` 目录

5. **清理主题和public目录**：
   - 移除 `themes/webstack-hugo/static/assets/images/logos` 目录（备份后）
   - 移除 `public/assets/images/logos` 目录（Hugo会自动生成）
   - 统一处理网站自身图像，保持一致性

6. **修改网站模板**：
   - 直接修改主题模板文件，使其引用 `site` 目录下的logo
   - 清理不再需要的复制logo
   - 避免了复制logo到多处的麻烦

## 优化流程

1. **备份现有文件**：
   - 创建 `backup/logo_backup/` 目录
   - 将现有logo文件备份

2. **创建新目录结构**：
   - 创建 `static/assets/images/logos/` 和 `static/assets/images/site/` 目录

3. **移动文件**：
   - 将 `public/assets/images/logos/` 下的文件移动到 `static/assets/images/logos/`
   - 将网站自身logo移动到 `static/assets/images/site/`

4. **更新路径引用**：
   - 编写 `update_logo_paths.py` 脚本，批量更新 `webstack.yml` 中的路径
   - 手动更新 `README.md` 文件中的路径和目录结构说明

5. **清理未使用的logo**：
   - 编写 `clean_unused_logos.py` 脚本，识别并移除未使用的logo
   - 清理前: 1373个logo文件
   - 清理后: 1134个logo文件
   - 共移除了239个未使用的logo文件

6. **清理主题和public目录**：
   - 编写 `clean_theme_logos.py` 脚本，备份并移除主题中的logo目录
   - 共备份了238个主题logo文件
   - 编写 `clean_site_images.py` 脚本，处理网站自身图像
   - 确保所有网站图像都存放在一处并保持一致

7. **修改网站模板文件**：
   - 修改 `themes/webstack-hugo/layouts/index.html` 文件中的logo引用路径
   - 将所有logo引用路径指向 `./assets/images/site/` 目录
   - 修改网站卡片中的fallback图标路径
   - 优化各种元标签中的图标引用

## 优化效果

1. **目录结构清晰**：
   - 所有源文件统一在 `static` 目录下管理
   - 分类明确，方便维护

2. **路径规范统一**：
   - 所有logo引用路径格式一致
   - 避免了多处修改导致的不一致问题

3. **维护流程简化**：
   - 添加新logo时，只需放入对应目录，简化操作
   - 修改已有logo时，只需更新一处，避免遗漏

4. **减少冗余文件**：
   - 移除了239个未使用的logo文件，减小了项目体积
   - 清理了主题和public目录中的重复文件
   - 提高了网站生成和加载速度

5. **遵循Hugo最佳实践**：
   - 所有静态资源统一放在 `static` 目录下
   - 让Hugo负责将资源复制到 `public` 目录，而不是手动管理
   - 避免了源文件和生成文件的混淆

6. **彻底解决模板引用问题**：
   - 不再需要复制logo到多个位置
   - 直接修改模板引用路径，从根本上解决问题
   - 更符合软件工程的最佳实践

## 注意事项

1. 使用Hugo构建站点时，`static` 目录的内容会自动复制到 `public` 目录
2. 项目中使用的所有静态资源应该放在 `static` 目录下，而不是直接放在 `public` 目录
3. 添加新工具时，应将logo文件放在 `static/assets/images/logos/` 目录下
4. 网站重建后，确保检查 `public` 目录，避免手动添加文件
5. 如果更新网站logo，只需更新 `static/assets/images/site/` 目录下的文件即可

## 建议

1. 定期清理不再使用的logo文件
2. 考虑优化logo文件大小，提高网站加载速度
3. 建立logo命名规范，如：`logo_工具名.png`，避免使用特殊字符和空格
4. 定期运行脚本 `clean_unused_logos.py` 来检测和清理未使用的logo文件
5. 考虑进一步优化主题模板，减少不必要的资源加载 