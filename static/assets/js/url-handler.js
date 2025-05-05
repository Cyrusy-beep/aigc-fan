/**
 * URL处理器 - 处理分类URL编码和英文slug映射
 * v1.2.0 - 增加英文slug到中文分类的映射
 */
(function() {
  // 防止重复加载
  if (window.urlHandlerLoaded) {
    console.log('URL处理器已加载，跳过重复初始化');
    return;
  }
  
  // 设置标志
  window.urlHandlerLoaded = true;
  
  console.log('URL处理器已加载');
  
  // 规范化路径中的特定分类名
  const CATEGORY_CORRECTIONS = {
    '阅读ai': '阅读AI',
    '绘画ai': '绘画AI',
    '编程ai': '编程AI',
    '写作ai': '写作AI',
    '聊天ai': '聊天AI',
    '视频ai': '视频AI',
    '音频ai': '音频AI',
    '图像ai': '图像AI',
    '设计ai': '设计AI',
    '办公ai': '办公AI'
  };
  
  // 英文slug到中文分类的映射
  const SLUG_TO_CATEGORY = {
    'chat-ai': '聊天AI',
    'reading-ai': '阅读AI',
    'writing-ai': '写作AI',
    'painting-ai': '绘画AI',
    'image-ai': '图像AI',
    'design-ai': '设计AI',
    'audio-ai': '音频AI',
    'video-ai': '视频AI',
    'coding-ai': '编程AI',
    'development-frameworks': '开发框架',
    'prompt-engineering': '提示词工程',
    'office-ai': '办公AI',
    'content-detection': '内容检测',
    'model-training': '模型训练',
    'cross-border-ai': '跨境AI',
    'ai-learning-resources': 'AI学习资源',
    'background-removal': '背景移除',
    'lossless-adjustment': '无损调整',
    'optimization-repair': '优化修复',
    'object-removal': '物体抹除',
    '3d-ai': '3D AI'
  };
  
  // 当DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始处理URL');
    
    // 检测当前页面是否是404
    if (document.title.indexOf('404') !== -1) {
      console.log('检测到404页面，尝试处理重定向');
      handlePossible404Redirect();
    }
    
    // 修正所有分类链接
    fixCategoryLinks();
  });

  /**
   * 处理可能由于URL编码导致的404错误，或将英文slug映射到中文分类
   */
  function handlePossible404Redirect() {
    // 获取当前URL路径
    const path = window.location.pathname;
    console.log('当前路径:', path);
    
    // 检查是否是分类页面路径
    if (path.indexOf('/categories/') === 0) {
      try {
        // 获取分类部分
        const categoryPart = path.split('/categories/')[1].replace(/\/$/, '');
        console.log('分类部分:', categoryPart);
        
        // 首先检查是否是英文slug
        if (SLUG_TO_CATEGORY[categoryPart]) {
          console.log('找到英文slug映射:', categoryPart, '->', SLUG_TO_CATEGORY[categoryPart]);
          // 英文slug不需要重定向，直接返回
          return;
        }
        
        // 尝试解码当前URL
        let decodedCategory;
        try {
          decodedCategory = decodeURIComponent(categoryPart);
          console.log('解码后的分类:', decodedCategory);
        } catch (decodeError) {
          console.error('解码失败，使用原始值:', decodeError);
          decodedCategory = categoryPart;
        }
        
        // 检查是否需要规范化大小写 (如将"阅读ai"转换为"阅读AI")
        if (CATEGORY_CORRECTIONS[decodedCategory]) {
          console.log('应用分类名称规范化:', decodedCategory, '->', CATEGORY_CORRECTIONS[decodedCategory]);
          decodedCategory = CATEGORY_CORRECTIONS[decodedCategory];
        } else {
          // 处理可能的AI后缀大小写问题
          for (const key in CATEGORY_CORRECTIONS) {
            if (decodedCategory.toLowerCase() === key.toLowerCase()) {
              console.log('应用分类名称规范化 (忽略大小写):', decodedCategory, '->', CATEGORY_CORRECTIONS[key]);
              decodedCategory = CATEGORY_CORRECTIONS[key];
              break;
            }
          }
        }
        
        // 检查规范化后的分类名是否有对应的英文slug
        for (const slug in SLUG_TO_CATEGORY) {
          if (SLUG_TO_CATEGORY[slug] === decodedCategory) {
            console.log('找到中文分类对应的英文slug:', decodedCategory, '->', slug);
            const newPath = '/categories/' + slug + '/';
            console.log('重定向到英文slug URL:', newPath);
            window.location.href = newPath;
            return;
          }
        }
        
        // 如果没有找到对应的英文slug，保持原有的处理逻辑
        // 重新编码分类名
        const correctlyEncodedCategory = encodeURIComponent(decodedCategory);
        console.log('重新编码后的分类:', correctlyEncodedCategory);
        
        // 构建修正后的URL
        const correctPath = '/categories/' + correctlyEncodedCategory + '/';
        console.log('修正后的路径:', correctPath);
        
        // 如果修正后的URL与当前URL不同，则重定向
        if (correctPath !== path) {
          console.log('重定向到修正后的URL');
          window.location.href = correctPath;
        } else {
          console.log('URL无需修正');
        }
      } catch (e) {
        console.error('URL处理失败:', e);
      }
    }
  }

  /**
   * 修正页面上所有分类链接，优先使用英文slug
   */
  function fixCategoryLinks() {
    // 查找所有指向分类页面的链接
    const categoryLinks = document.querySelectorAll('a[href^="/categories/"]');
    console.log('找到分类链接数量:', categoryLinks.length);
    
    categoryLinks.forEach(function(link, index) {
      const href = link.getAttribute('href');
      console.log(`处理链接 ${index + 1}/${categoryLinks.length}:`, href);
      
      // 获取分类名称部分
      const categoryPath = href.replace('/categories/', '').replace(/\/$/, '');
      
      try {
        // 首先检查是否已经是英文slug
        if (SLUG_TO_CATEGORY[categoryPath]) {
          console.log(`链接 ${index + 1} 已经使用英文slug，无需修改`);
          return;
        }
        
        // 尝试解码分类名称
        let decodedCategory;
        try {
          decodedCategory = decodeURIComponent(categoryPath);
        } catch (decodeError) {
          console.error(`链接 ${index + 1} 解码失败:`, decodeError);
          decodedCategory = categoryPath;
        }
        
        // 检查是否需要规范化大小写
        if (CATEGORY_CORRECTIONS[decodedCategory]) {
          decodedCategory = CATEGORY_CORRECTIONS[decodedCategory];
        } else {
          // 处理可能的AI后缀大小写问题
          for (const key in CATEGORY_CORRECTIONS) {
            if (decodedCategory.toLowerCase() === key.toLowerCase()) {
              decodedCategory = CATEGORY_CORRECTIONS[key];
              break;
            }
          }
        }
        
        // 查找对应的英文slug
        let targetSlug = null;
        for (const slug in SLUG_TO_CATEGORY) {
          if (SLUG_TO_CATEGORY[slug] === decodedCategory) {
            targetSlug = slug;
            break;
          }
        }
        
        // 如果找到了对应的英文slug，使用它
        if (targetSlug) {
          const slugHref = '/categories/' + targetSlug + '/';
          console.log(`链接 ${index + 1} 从 ${href} 转换为英文slug: ${slugHref}`);
          link.setAttribute('href', slugHref);
        } else {
          // 没有找到对应的英文slug，使用原有编码逻辑
          const correctlyEncodedCategory = encodeURIComponent(decodedCategory);
          const correctedHref = '/categories/' + correctlyEncodedCategory + '/';
          
          if (correctedHref !== href) {
            console.log(`链接 ${index + 1} 从 ${href} 修正为 ${correctedHref} (未找到英文slug)`);
            link.setAttribute('href', correctedHref);
          }
        }
      } catch (e) {
        console.error(`链接 ${index + 1} 修正失败:`, href, e);
      }
    });
    
    console.log('分类链接处理完成');
  }
})(); 