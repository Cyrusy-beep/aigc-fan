/**
 * URL编码调试工具 - 帮助分析和解决中文URL编码问题
 * 用于在生产环境临时部署，确定问题所在
 */
(function() {
  console.log('URL编码调试工具已加载');
  
  // 当DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    console.log('开始URL编码调试...');
    
    // 显示当前页面URL的各种编码格式
    analyzeCurrentUrl();
    
    // 分析所有链接的URL编码
    analyzeAllLinks();
    
    // 检查运行环境
    checkEnvironment();
  });

  /**
   * 分析当前URL的各种编码情况
   */
  function analyzeCurrentUrl() {
    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    
    console.group('当前页面URL分析');
    console.log('完整URL:', currentUrl);
    console.log('路径部分:', currentPath);
    
    try {
      console.log('解码路径:', decodeURIComponent(currentPath));
    } catch (e) {
      console.error('路径解码失败:', e);
    }
    
    // 如果是分类页面，分析分类名
    if (currentPath.includes('/categories/')) {
      const categoryPart = currentPath.split('/categories/')[1].replace(/\/$/, '');
      console.log('分类部分(原始):', categoryPart);
      
      try {
        const decodedCategory = decodeURIComponent(categoryPart);
        console.log('分类解码结果:', decodedCategory);
        console.log('分类重新编码:', encodeURIComponent(decodedCategory));
        
        // 检查是否含有中文字符
        if (/[\u4e00-\u9fa5]/.test(decodedCategory)) {
          console.log('包含中文字符: 是');
        } else {
          console.log('包含中文字符: 否');
        }
        
        // 检查大小写问题
        if (decodedCategory.toLowerCase().includes('ai')) {
          console.log('包含"ai"(不区分大小写): 是');
          console.log('原始格式:', decodedCategory.match(/ai/i)[0]);
        }
      } catch (e) {
        console.error('分类名解码失败:', e);
      }
    }
    
    console.groupEnd();
  }

  /**
   * 分析页面上所有链接的URL编码
   */
  function analyzeAllLinks() {
    console.group('页面链接分析');
    
    // 查找所有分类链接
    const categoryLinks = document.querySelectorAll('a[href^="/categories/"]');
    console.log('找到分类链接数量:', categoryLinks.length);
    
    if (categoryLinks.length > 0) {
      console.group('分类链接详情');
      
      categoryLinks.forEach(function(link, index) {
        const href = link.getAttribute('href');
        const linkText = link.textContent.trim();
        
        console.group(`链接 ${index + 1}: ${linkText}`);
        console.log('href值:', href);
        
        // 提取分类部分
        const categoryPart = href.replace('/categories/', '').replace(/\/$/, '');
        console.log('分类部分:', categoryPart);
        
        try {
          const decodedCategory = decodeURIComponent(categoryPart);
          console.log('解码结果:', decodedCategory);
          console.log('重新编码:', encodeURIComponent(decodedCategory));
          
          // 检查编码一致性
          if (categoryPart !== encodeURIComponent(decodedCategory)) {
            console.warn('⚠️ 编码不一致，可能导致404错误');
          } else {
            console.log('✓ 编码正确');
          }
        } catch (e) {
          console.error('解码失败:', e);
        }
        
        console.groupEnd();
      });
      
      console.groupEnd();
    }
    
    console.groupEnd();
  }

  /**
   * 检查运行环境信息
   */
  function checkEnvironment() {
    console.group('运行环境分析');
    
    // 检查浏览器信息
    console.log('用户代理:', navigator.userAgent);
    console.log('语言:', navigator.language);
    
    // 检查URL处理器是否加载
    if (window.urlHandlerLoaded) {
      console.log('URL处理器已加载: 是');
    } else {
      console.warn('URL处理器已加载: 否 (可能导致链接处理问题)');
      
      // 设置标志
      window.urlHandlerLoaded = true;
      
      // 尝试修复丢失的处理器
      console.log('尝试应用紧急URL修复...');
      
      // 查找所有分类链接
      const categoryLinks = document.querySelectorAll('a[href^="/categories/"]');
      
      categoryLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // 获取分类名称部分
        const categoryPath = href.replace('/categories/', '').replace(/\/$/, '');
        
        try {
          // 尝试解码分类名称
          const decodedCategory = decodeURIComponent(categoryPath);
          
          // 重新正确编码分类名称
          const correctlyEncodedCategory = encodeURIComponent(decodedCategory);
          
          // 更新链接
          const correctedHref = '/categories/' + correctlyEncodedCategory + '/';
          
          if (correctedHref !== href) {
            console.log(`修正链接: ${href} -> ${correctedHref}`);
            link.setAttribute('href', correctedHref);
          }
        } catch (e) {
          console.error('链接修正失败:', href, e);
        }
      });
    }
    
    console.groupEnd();
  }
})(); 