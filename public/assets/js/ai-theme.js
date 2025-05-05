/**
 * AI Theme - 增强效果脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // 确保主题已正确应用
        ensureThemeApplied();
        
        // 修复导航功能
        fixNavigation();
        
        // 安全检查导航目标
        safeCheckNavigationTargets();
        
        // 增强卡片悬停效果
        // enhanceCardHoverEffects();
        
        // 添加打字机效果到搜索框
        addTypewriterEffect();
        
        // 添加滚动动画
        addScrollAnimations();
        
        // 添加内部锚点支持
        addAnchorSupport();
        
        // 添加页眉间距
        addHeaderSpacing();
        
        // 添加卡片悬停状态管理
        manageCardHoverState();
        
        console.log('AI主题增强功能已加载');
    } catch (e) {
        console.error('AI主题增强加载失败:', e);
    }
});

/**
 * 修复可能有问题的ID选择器
 */
function fixIdSelectors() {
    // 修复可能有问题的ID选择器...
    
    // 1. 首先，查找所有带ID的元素并检查是否有非法字符
    try {
        const elementsWithId = document.querySelectorAll('[id]');
        
        // 创建一个映射存储原始ID和元素的关系
        const originalIdMap = new Map();
        
        // 2. 检查并修复有问题的ID
        elementsWithId.forEach(el => {
            const id = el.id;
            // 检查ID是否包含非法字符
            if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id)) {
                // 发现非法ID包含特殊字符
                
                // 创建一个有效的ID
                const validId = 'valid-' + id.replace(/[^a-zA-Z0-9_-]/g, '-');
                
                // 保存原始ID作为data属性
                el.setAttribute('data-original-id', id);
                originalIdMap.set(id, el);
                
                // 设置新ID
                el.id = validId;
            }
        });
        
        // 3. 修复导航链接href - 使用映射而不是querySelector
        const smoothLinks = document.querySelectorAll('a.smooth');
        smoothLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                
                // 检查这个ID是否在我们的映射中
                if (originalIdMap.has(targetId)) {
                    const targetElement = originalIdMap.get(targetId);
                    const newHref = '#' + targetElement.id;
                    link.setAttribute('href', newHref);
                }
            }
        });
        
    } catch (err) {
        console.error('修复ID选择器时出错:', err);
    }
}

/**
 * 安全地检查导航目标 - 完全避免使用querySelector
 */
function safeCheckNavigationTargets() {
    // 安全检查导航目标...
    
    try {
        // 收集所有ID
        const allIds = new Set();
        Array.from(document.querySelectorAll('[id]')).forEach(el => {
            allIds.add(el.id);
        });
        
        // 检查导航链接
        const links = document.querySelectorAll('a.smooth');
        
        let validLinks = 0;
        Array.from(links).forEach((link, index) => {
            const href = link.getAttribute('href');
            if (!href) {
                return;
            }
            
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const exists = allIds.has(targetId);
                
                if (exists) {
                    validLinks++;
                }
            }
        });
        
    } catch (error) {
        console.error('安全检查导航目标时出错:', error);
    }
}

/**
 * 确保主题已正确应用（替代forceApplyTheme）
 * 与预加载脚本保持一致，避免重复应用导致闪烁
 */
function ensureThemeApplied() {
    // 从localStorage直接获取主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('从localStorage获取主题:', savedTheme);
    
    // 根据保存的主题设置应用样式
    if (savedTheme === 'light') {
        // 确保亮色主题正确应用
        if (!document.documentElement.classList.contains('light-theme')) {
            document.documentElement.classList.add('light-theme');
        }
        if (!document.body.classList.contains('light-theme')) {
            document.body.classList.add('light-theme');
        }
        // 移除暗色主题
        document.documentElement.classList.remove('ai-theme');
        document.body.classList.remove('ai-theme');
        
        console.log('已应用亮色主题');
    } else {
        // 确保暗色主题正确应用
        if (!document.documentElement.classList.contains('ai-theme')) {
            document.documentElement.classList.add('ai-theme');
        }
        if (!document.body.classList.contains('ai-theme')) {
            document.body.classList.add('ai-theme');
        }
        // 移除亮色主题
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
        
        console.log('已应用暗色主题');
    }
}

/**
 * 强制应用主题
 * 保留此函数以兼容可能调用它的其他代码
 */
function forceApplyTheme() {
    // 调用新的函数来处理
    ensureThemeApplied();
}

/**
 * 修复导航滚动功能 - 更安全的版本
 */
function fixNavigation() {
    // 安装更安全的导航系统...
    
    try {
        // 确保jQuery可用
        if (typeof jQuery === 'undefined') {
            console.error('错误：jQuery未定义，无法执行导航功能');
            return;
        }
        
        // 处理导航系统锚点滚动
        $(document).ready(function() {
            try {
                // 修复ID问题
                ensureValidIds();
                
                // 使用nav.js中实现的导航高亮功能，不再在这里重复实现
                console.log('使用nav.js中的导航高亮功能');
                
            } catch (err) {
                console.error('初始化导航时出错:', err);
            }
        });
        
    } catch (err) {
        console.error('设置导航系统时出错:', err);
    }
}

/**
 * 确保所有ID都是有效的
 */
function ensureValidIds() {
    // 查找所有带ID的元素
    const elementsWithId = document.querySelectorAll('[id]');
    
    // 遍历并修复无效ID
    elementsWithId.forEach(el => {
        const id = el.id;
        
        // 检查ID是否有效
        if (id && !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id)) {
            // 创建新的有效ID
            const validId = 'valid-' + id.replace(/[^a-zA-Z0-9_-]/g, '-');
            
            // 保存原始ID作为data属性
            el.setAttribute('data-original-id', id);
            
            // 应用新ID
            el.id = validId;
        }
    });
}

/**
 * 增强卡片悬停效果
 */
function enhanceCardHoverEffects() {
    // 为每个卡片添加悬停效果
    const cards = document.querySelectorAll('.xe-widget.xe-conversations');
    
    cards.forEach(card => {
        // 获取对应的按钮 (假设按钮是卡片父级 .xe-card 里的 .visit-website-button)
        const parentCardDiv = card.closest('.xe-card');
        const button = parentCardDiv ? parentCardDiv.querySelector('.visit-website-button') : null;

        // 鼠标移入时的3D效果
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // 计算旋转角度 - 范围在 -5 到 5 度之间
            const xRotation = ((y - rect.height / 2) / rect.height) * -10;
            const yRotation = ((x - rect.width / 2) / rect.width) * 10;
            
            // 构建 transform 字符串
            const transformStyle = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-5px)`;

            // 应用变换到卡片内容
            this.style.transform = transformStyle;
            
            // 应用变换到按钮 (如果存在)
            if (button) {
                button.style.transform = transformStyle;
            }

            // 光照效果 - 根据鼠标位置改变光照方向
            const shine = this.querySelector('.shine') || document.createElement('div');
            if (!shine.classList.contains('shine')) {
                shine.className = 'shine';
                shine.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 8px;
                    pointer-events: none;
                `;
                this.appendChild(shine);
            }
            
            // 计算光照渐变位置
            const lightX = (x / rect.width) * 100;
            const lightY = (y / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`;
        });
        
        // 鼠标移出时重置效果
        card.addEventListener('mouseleave', function() {
            // 重置卡片内容 transform 到原始位置
            this.style.transform = 'translateY(0px)'; 

            // 重置按钮 transform 到原始位置 (如果存在)
            if (button) {
                button.style.transform = 'translateY(0px)';
            }

            // 移除光照效果
            const shine = this.querySelector('.shine');
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });
}

/**
 * 添加打字机效果到网站标题
 */
function addTypewriterEffect() {
    // 为搜索框添加提示文字动画
    const searchBox = document.getElementById('search-text');
    if (searchBox) {
        // 提示文字数组
        const placeholders = [
            '搜索AI工具...',
            '发现专业AI模型...',
            '查找AI应用案例...',
            '寻找最佳AI实践...',
            '探索AI新技术...'
        ];
        
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        let placeholder = '';
        
        // 更新搜索框提示文字
        function typeWriter() {
            const current = placeholders[index];
            
            if (isDeleting) {
                // 删除字符
                placeholder = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // 添加字符
                placeholder = current.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // 更新搜索框提示文字
            searchBox.setAttribute('placeholder', placeholder);
            
            // 速度控制
            let typeSpeed = isDeleting ? 50 : 150;
            
            // 状态控制
            if (!isDeleting && charIndex === current.length) {
                // 完成打字，等待一段时间后开始删除
                isDeleting = true;
                typeSpeed = 1000; // 延迟删除
            } else if (isDeleting && charIndex === 0) {
                // 完成删除，开始下一个词
                isDeleting = false;
                index = (index + 1) % placeholders.length;
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // 开始打字效果
        setTimeout(typeWriter, 1000);
    }
}

/**
 * 添加滚动动画效果
 */
function addScrollAnimations() {
    // 为卡片添加滚动时的淡入效果
    const cards = document.querySelectorAll('.xe-card');
    
    // 初始隐藏卡片
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2; // 当卡片进入视窗的80%时显示
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 初始触发一次，显示首屏的卡片
    window.dispatchEvent(new Event('scroll'));
}

/**
 * 添加锚点支持
 * 为每个分类标题添加可靠的锚点元素，确保导航正确工作
 */
function addAnchorSupport() {
    // 添加锚点支持...
    
    try {
        // 查找所有分类标题作为可能的锚点
        const categoryHeaders = document.querySelectorAll('.row.row-sm h4');
        
        // 处理所有标题
        categoryHeaders.forEach((header, index) => {
            // 尝试获取内部文本作为ID基础
            const text = header.textContent.trim();
            let id = text
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '');
            
            // 如果ID为空，使用索引
            if (!id) {
                id = 'category-' + (index + 1);
            }
            
            // 确保ID是唯一的
            let uniqueId = id;
            let counter = 1;
            while (document.getElementById(uniqueId)) {
                uniqueId = id + '-' + counter;
                counter++;
            }
            id = uniqueId;
            
            // 检查是否已经有对应的锚点
            if (!document.getElementById(id)) {
                // 创建锚点元素
                const anchor = document.createElement('a');
                anchor.setAttribute('id', id);
                anchor.classList.add('category-anchor');
                anchor.style.display = 'block';
                anchor.style.position = 'relative';
                anchor.style.top = '-150px';
                anchor.style.visibility = 'hidden';
                
                // 插入锚点到标题前
                header.parentNode.insertBefore(anchor, header);
                
                // 尝试查找对应的导航项
                const navItem = $('#main-menu a').filter(function() {
                    return $(this).text().trim() === text;
                });
                
                if (navItem.length > 0) {
                    // 更新导航项的href
                    navItem.attr('href', '#' + id);
                }
            }
        });
        
        // 提供备用锚点插入点
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !document.getElementById('content-top')) {
            const contentAnchor = document.createElement('a');
            contentAnchor.setAttribute('id', 'content-top');
            contentAnchor.style.display = 'block';
            contentAnchor.style.position = 'relative';
            contentAnchor.style.top = '-100px';
            contentAnchor.style.visibility = 'hidden';
            
            mainContent.insertBefore(contentAnchor, mainContent.firstChild);
        }
        
    } catch (error) {
        console.error('添加锚点支持时出错:', error);
    }
}

// 添加CSS样式确保内容不被导航栏遮挡
function addHeaderSpacing() {
    try {
        // 给所有标题元素添加顶部内边距和滚动时的平滑过渡
        const style = document.createElement('style');
        style.textContent = `
            h1, h2, h3, h4, h5, h6 {
                scroll-margin-top: 100px;
                transition: scroll-margin-top 0.3s ease;
            }
            
            @media (max-width: 768px) {
                h1, h2, h3, h4, h5, h6 {
                    scroll-margin-top: 80px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 计算滚动偏移量
        const userNavHeight = $('.user-info-navbar').outerHeight() || 0;
        const navbarHeight = $('.navbar').outerHeight() || 0;
        const backupNavHeight = $('nav.navbar').outerHeight() || 0;
        const headerHeight = $('header').outerHeight() || 0;
        
        // 使用可用的导航高度，保证至少有50px的空间
        const additionalOffset = 50;
        const totalOffset = Math.max(userNavHeight + navbarHeight, backupNavHeight, headerHeight) + additionalOffset;
        
        // 存储全局偏移量供其他函数使用
        window.scrollOffset = totalOffset;
        
    } catch (err) {
        console.error('添加标题边距时出错:', err);
    }
}

// 滚动到指定元素
function scrollToElement(targetElement, additionalOffset = 20) {
    try {
        if (!targetElement) return;
        
        console.log('[AI-Theme] 滚动到元素:', targetElement.id || '未知ID');
        
        // 获取基本偏移量
        const baseOffset = window.scrollOffset || 100;
        
        // 获取导航栏高度
        const navbarHeight = $('.navbar').outerHeight() || 60;
        console.log('[AI-Theme] 导航栏高度:', navbarHeight, 'px');
        
        // 计算总偏移量 - 包括导航栏高度
        const totalOffset = navbarHeight + additionalOffset;
        console.log('[AI-Theme] 总偏移量:', totalOffset, 'px');
        
        // 计算目标位置
        const targetPosition = $(targetElement).offset().top - totalOffset;
        console.log('[AI-Theme] 目标位置:', targetPosition, 'px');
        
        // 执行滚动
        $('html, body').animate({
            scrollTop: targetPosition
        }, 800, function() {
            console.log('[AI-Theme] 滚动完成');
        });
        
    } catch (err) {
        console.error('滚动到元素时出错:', err);
    }
}

/**
 * 管理卡片悬停状态
 */
function manageCardHoverState() {
    const cardElements = document.querySelectorAll('.xe-card');
    cardElements.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hovered');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hovered');
        });
    });
} 