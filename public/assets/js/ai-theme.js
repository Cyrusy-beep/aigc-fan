/**
 * AI Theme - 增强效果脚本
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI主题初始化...');
    
    // 直接修复可能的ID选择器问题
    fixIdSelectors();
    
    // 确保主题已正确应用（与预加载的行为保持一致）
    ensureThemeApplied();
    
    // 添加内容边距，防止被导航栏遮挡
    addHeaderSpacing();
    
    // 添加锚点支持 - 在标题前添加锚点元素
    addAnchorSupport();
    
    // 检查所有导航目标是否存在
    try {
        safeCheckNavigationTargets();
    } catch(e) {
        console.error('检查导航目标时出错:', e);
    }
    
    // 添加主题切换按钮
    addThemeToggle();
    
    // 添加粒子背景效果
    createParticleEffect();
    
    // 卡片悬停效果增强
    enhanceCardHoverEffects();
    
    // 添加打字机效果到网站标题
    addTypewriterEffect();
    
    // 添加滚动动画效果
    addScrollAnimations();
    
    // 直接添加导航功能
    fixNavigation();
});

/**
 * 修复可能有问题的ID选择器
 */
function fixIdSelectors() {
    console.log('修复可能有问题的ID选择器...');
    
    // 1. 首先，查找所有带ID的元素并检查是否有非法字符
    try {
        const elementsWithId = document.querySelectorAll('[id]');
        console.log(`找到 ${elementsWithId.length} 个带ID的元素`);
        
        // 创建一个映射存储原始ID和元素的关系
        const originalIdMap = new Map();
        
        // 2. 检查并修复有问题的ID
        elementsWithId.forEach(el => {
            const id = el.id;
            // 检查ID是否包含非法字符
            if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id)) {
                console.log(`发现非法ID: "${id}", 包含特殊字符`);
                
                // 创建一个有效的ID
                const validId = 'valid-' + id.replace(/[^a-zA-Z0-9_-]/g, '-');
                console.log(`- 替换为有效ID: "${validId}"`);
                
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
                    console.log(`- 修复链接: 从 "${href}" 到 "${newHref}"`);
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
    console.log('安全检查导航目标...');
    
    try {
        // 收集所有ID
        const allIds = new Set();
        Array.from(document.querySelectorAll('[id]')).forEach(el => {
            allIds.add(el.id);
        });
        
        // 检查导航链接
        const links = document.querySelectorAll('a.smooth');
        console.log(`找到 ${links.length} 个导航链接`);
        
        let validLinks = 0;
        Array.from(links).forEach((link, index) => {
            const href = link.getAttribute('href');
            if (!href) {
                console.log(`链接 ${index + 1}: 无href属性`);
                return;
            }
            
            console.log(`链接 ${index + 1}: ${href}`);
            
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const exists = allIds.has(targetId);
                
                if (exists) {
                    console.log(`- ✓ 目标ID "${targetId}" 存在`);
                    validLinks++;
                } else {
                    console.log(`- ✗ 目标ID "${targetId}" 不存在`);
                }
            }
        });
        
        console.log(`${validLinks}/${links.length} 个导航链接有有效目标`);
        
    } catch (error) {
        console.error('安全检查导航目标时出错:', error);
    }
}

/**
 * 确保主题已正确应用（替代forceApplyTheme）
 * 与预加载脚本保持一致，避免重复应用导致闪烁
 */
function ensureThemeApplied() {
    // 从localStorage获取当前主题，默认为暗色主题
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // 检查当前页面状态，只在需要时应用主题
    if (currentTheme === 'light') {
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
    }
    
    console.log('确认主题已正确应用:', currentTheme);
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
    console.log('安装更安全的导航系统...');
    
    try {
    // 确保jQuery可用
    if (typeof jQuery === 'undefined') {
        console.error('错误：jQuery未定义，无法执行导航功能');
        return;
    }
    
    // 为确保页面完全加载，在$(document).ready内部执行
    $(document).ready(function() {
            try {
        console.log('jQuery已就绪，开始处理导航链接...');
        
                // 确保在分析前先修复ID
                ensureValidIds();
                
                // 分析页面中的所有ID元素
                console.log('===== 页面ID元素分析 =====');
                const idElements = document.querySelectorAll('[id]');
                console.log(`页面中共有 ${idElements.length} 个带ID的元素`);
                
                // 打印所有ID和标签关系，查找可能的模式
                let idMap = {};
                idElements.forEach((el, index) => {
                    if (index < 10) { // 只打印前10个避免日志过长
                        console.log(`- ID "${el.id}" (${el.tagName})`);
                    }
                    idMap[el.id] = $(el);
                });
                
                // 分析导航锚点
                console.log('===== 导航链接分析 =====');
                const navLinks = $('a.smooth');
                console.log(`页面中共有 ${navLinks.length} 个导航链接`);
                
                // 创建导航文本到标题的直接映射，不通过ID
                const navTextToHeaderMap = new Map();
                
                // 获取所有h4标题
                const headers = $('h4').toArray();
                
                // 为每个导航链接查找匹配的标题
                navLinks.each(function() {
                    const navText = $(this).text().trim();
                    
                    // 查找匹配文本的标题
                    for (const header of headers) {
                        if ($(header).text().trim() === navText) {
                            navTextToHeaderMap.set(navText, header);
                            break;
                        }
                    }
                });
                
                console.log(`找到 ${navTextToHeaderMap.size} 个导航文本到标题的映射`);
                
                // 使用安全的事件处理方法
                $('a.smooth').off('click').on('click', function(e) {
                    try {
                        e.preventDefault();
                        
                        // 检测移动菜单状态
                        if ($("#main-menu").hasClass('mobile-is-visible')) {
                            $("#main-menu").removeClass('mobile-is-visible');
                        }
                        
                        // 激活当前项
                        $('#main-menu li').removeClass('active');
                        $(this).parent('li').addClass('active');
                        
                        // 获取导航文本
                        const navText = $(this).text().trim();
                        console.log(`点击导航: "${navText}"`);
                        
                        // 尝试多种方法查找目标
                        let targetElement = null;
                        
                        // 方法1: 通过导航文本查找标题
                        if (navTextToHeaderMap.has(navText)) {
                            targetElement = navTextToHeaderMap.get(navText);
                            console.log(`通过文本映射找到标题: "${navText}"`);
                        }
                        
                        // 方法2: 通过遍历查找匹配文本的标题
                        if (!targetElement) {
                            for (const header of headers) {
                                if ($(header).text().trim() === navText) {
                                    targetElement = header;
                                    console.log(`通过标题文本匹配找到: "${navText}"`);
                                    break;
                                }
                            }
                        }
                        
                        // 方法3: 尝试通过href属性查找元素ID (如果ID是合法的)
                        if (!targetElement) {
                            const href = $(this).attr('href');
                            if (href && href.startsWith('#')) {
                                const targetId = href.substring(1);
                                // 只有当ID符合语法要求时才使用getElementById
                                if (/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(targetId)) {
                                    const idElement = document.getElementById(targetId);
                                    if (idElement) {
                                        targetElement = idElement;
                                        console.log(`通过ID找到元素: "${targetId}"`);
                                    }
                                }
                            }
                        }
                        
                        // 使用新的滚动函数
                        if (targetElement) {
                            // 使用更小的额外偏移量，从20px减少到10px
                            scrollToElement(targetElement, 10);
                        } else {
                            // 应急方法：按导航项在菜单中的位置比例滚动
                            console.log(`未找到目标元素，使用应急滚动方法`);
                            const index = navLinks.index(this);
                            const ratio = index / navLinks.length;
                            const maxScroll = $(document).height() - $(window).height();
                            const targetPosition = ratio * maxScroll * 0.8;
                            console.log(`应急滚动位置: ${targetPosition}px (导航索引: ${index}/${navLinks.length})`);
                            
                            // 执行滚动
                            $('html, body').stop().animate({
                                scrollTop: targetPosition
                            }, 600);
                        }
                    } catch (err) {
                        console.error('处理导航点击时出错:', err);
                    }
                });
                
                // 滚动监听 - 使用更安全的逻辑
                $(window).on('scroll', function() {
                    try {
                        if (navLinks.length === 0 || headers.length === 0) return;
                        
                        const scrollTop = $(window).scrollTop();
                        
                        // 计算实际导航栏高度 - 同步使用相同的逻辑
                        const userInfoNavbar = $('.user-info-navbar, nav.navbar, header.navbar');
                        const navbar = $('.navbar, header, .main-header');
                        const userNavHeight = userInfoNavbar.length ? userInfoNavbar.outerHeight() || 0 : 0;
                        const navbarHeight = navbar.length ? navbar.outerHeight() || 0 : 0;
                        
                        // 备用固定高度
                        const backupNavHeight = userNavHeight + navbarHeight > 0 ? 0 : 60;
                        
                        // 计算阈值
                        const threshold = userNavHeight + navbarHeight + backupNavHeight + 5;
                        
                        // 直接通过标题位置确定当前区域
                        let currentHeader = null;
                        
                        // 查找当前位于视窗上方的最后一个标题
                        for (const header of headers) {
                            const elemTop = $(header).offset().top;
                            if (elemTop - threshold <= scrollTop) {
                                currentHeader = header;
                            }
                        }
                        
                        if (currentHeader) {
                            const headerText = $(currentHeader).text().trim();
                            
                            // 查找匹配此文本的导航项
                            navLinks.each(function() {
                                if ($(this).text().trim() === headerText) {
                                    $('#main-menu li').removeClass('active');
                                    $(this).parent('li').addClass('active');
                                }
                            });
                        }
                    } catch (err) {
                        console.error('滚动监听出错:', err);
                    }
                });
                
                // 初始触发滚动
                setTimeout(function() {
                    try {
                        $(window).trigger('scroll');
                    } catch (err) {
                        console.error('触发初始滚动时出错:', err);
                    }
                }, 300);
                
                console.log('导航系统安装完成');
            } catch (outerErr) {
                console.error('导航系统初始化出错:', outerErr);
            }
        });
    } catch (err) {
        console.error('导航系统安装出错:', err);
    }
}

/**
 * 确保所有ID都是有效的
 */
function ensureValidIds() {
    // 查找所有ID元素
    const elementsWithId = document.querySelectorAll('[id]');
    
    // 修复无效ID
    elementsWithId.forEach(el => {
        const id = el.id;
        if (id && !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id)) {
            // 创建有效ID
            const validId = 'nav-' + Math.random().toString(36).substring(2, 10);
            
            // 记录替换
            console.log(`替换无效ID: "${id}" -> "${validId}"`);
            
            // 保存原始ID
            el.setAttribute('data-original-id', id);
            
            // 设置新ID
            el.id = validId;
        }
    });
}

/**
 * 添加主题切换按钮
 */
function addThemeToggle() {
    // 先删除可能已存在的主题切换按钮
    const existingToggle = document.querySelector('.theme-toggle');
    if (existingToggle) {
        existingToggle.remove();
    }
    
    // 创建主题切换按钮
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    
    // 创建图标
    const icon = document.createElement('i');
    icon.className = 'fa theme-toggle-icon';
    themeToggle.appendChild(icon);
    
    // 添加到页面
    document.body.appendChild(themeToggle);
    
    // 从localStorage获取当前主题
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // 应用当前主题
    if (currentTheme === 'light') {
        document.documentElement.classList.remove('ai-theme');
        document.documentElement.classList.add('light-theme');
        document.body.classList.remove('ai-theme');
        document.body.classList.add('light-theme');
        icon.classList.add('fa-moon-o');
    } else {
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('ai-theme');
        document.body.classList.remove('light-theme');
        document.body.classList.add('ai-theme');
        icon.classList.add('fa-sun-o');
    }
    
    // 添加点击事件
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('ai-theme')) {
            // 切换到亮色主题
            document.documentElement.classList.remove('ai-theme');
            document.documentElement.classList.add('light-theme');
            document.body.classList.remove('ai-theme');
            document.body.classList.add('light-theme');
            icon.classList.remove('fa-sun-o');
            icon.classList.add('fa-moon-o');
            localStorage.setItem('theme', 'light');
        } else {
            // 切换到暗色主题
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('ai-theme');
            document.body.classList.remove('light-theme');
            document.body.classList.add('ai-theme');
            icon.classList.remove('fa-moon-o');
            icon.classList.add('fa-sun-o');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/**
 * 创建背景粒子效果
 */
function createParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ai-particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // 创建50个粒子
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

/**
 * 创建单个粒子
 */
function createParticle(container) {
    const particle = document.createElement('div');
    
    // 随机属性
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 20 + 10;
    
    // 随机颜色 - 使用主题配色
    const colors = [
        'rgba(111, 66, 193, 0.3)', // 紫色
        'rgba(0, 212, 255, 0.3)',  // 蓝色
        'rgba(0, 255, 229, 0.3)',  // 青色
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 设置粒子样式
    particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        filter: blur(1px);
        box-shadow: 0 0 10px ${color.replace('0.3', '0.8')};
        opacity: 0;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
}

/**
 * 增强卡片悬停效果
 */
function enhanceCardHoverEffects() {
    // 为每个卡片添加悬停效果
    const cards = document.querySelectorAll('.xe-widget.xe-conversations');
    
    cards.forEach(card => {
        // 鼠标移入时的3D效果
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // 计算旋转角度 - 范围在 -5 到 5 度之间
            const xRotation = ((y - rect.height / 2) / rect.height) * -10;
            const yRotation = ((x - rect.width / 2) / rect.width) * 10;
            
            // 应用变换
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-5px)`;
            
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
            this.style.transform = 'translateY(-5px)';
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
    console.log('添加锚点支持...');
    
    // 查找所有带ID的h4标题 - 通常是分类标题
    const categoryHeaders = document.querySelectorAll('h4[id], h4 [id]');
    console.log(`找到 ${categoryHeaders.length} 个分类标题`);
    
    // 查找所有导航链接，获取需要支持的锚点
    const navLinks = document.querySelectorAll('a.smooth');
    const targetIds = {};
    
    // 收集所有目标ID
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const id = href.substring(1);
            targetIds[id] = true;
        }
    });
    
    // 确保所有目标ID都有对应的锚点
    Object.keys(targetIds).forEach(id => {
        // 检查ID是否已存在
        let element = document.getElementById(id);
        
        if (!element) {
            console.log(`为缺失的锚点 #${id} 创建锚点元素`);
            
            // 创建新的锚点元素
            const anchor = document.createElement('div');
            anchor.id = id;
            anchor.className = 'scroll-anchor';
            anchor.style.cssText = 'position: relative; top: -80px; visibility: hidden;';
            
            // 寻找适合放置锚点的地方 - 通常是对应分类的标题
            // 由于ID通常是基于term或taxonomy生成的MD5，我们需要找到相关联的标题
            
            // 1. 找到导航项文本
            let navText = '';
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + id) {
                    navText = link.textContent.trim();
                }
            });
            
            if (navText) {
                console.log(`- 锚点 #${id} 对应导航项: "${navText}"`);
                
                // 2. 查找匹配此文本的标题
                let inserted = false;
                document.querySelectorAll('h4').forEach(header => {
                    if (header.textContent.trim() === navText && !inserted) {
                        // 插入锚点到标题前
                        header.parentNode.insertBefore(anchor, header);
                        console.log(`- 成功插入锚点到标题前: "${navText}"`);
                        inserted = true;
                    }
                });
                
                // 如果没找到匹配的标题，插入到主内容区开头
                if (!inserted) {
                    const mainContent = document.querySelector('.sites-list');
                    if (mainContent) {
                        mainContent.prepend(anchor);
                        console.log(`- 插入锚点到主内容区: #${id}`);
                    }
                }
            }
        }
    });
    
    console.log('锚点支持添加完成');
}

// 添加CSS样式确保内容不被导航栏遮挡
function addHeaderSpacing() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* 确保标题和内容有足够的上边距，但不过多 */
        .sites-list h4 {
            padding-top: 30px;
            margin-top: -20px;
        }
        
        /* 滚动锚点样式 */
        .scroll-anchor {
            display: block;
            position: relative;
            top: -50px;
            visibility: hidden;
        }
        
        /* 动画样式 */
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.5;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.6;
            }
            75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.7;
            }
        }
        
        .ai-theme .sites-list h4 {
            position: relative;
            display: inline-block;
            padding-left: 15px;
            overflow: hidden;
        }
        
        .ai-theme .sites-list h4::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 15px;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #6f42c1, #00d4ff);
            animation: expand 1s ease-out forwards;
        }
        
        @keyframes expand {
            to { width: 100%; }
        }
        
        .xe-widget.xe-conversations:hover {
            transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    console.log('添加了标题边距和动画样式');
}

// 滚动到目标元素的函数，精确计算偏移量
function scrollToElement(targetElement, additionalOffset = 20) {
    if (!targetElement) return false;
    
    // 获取导航栏元素 - 添加更多的选择器尝试
    const userInfoNavbar = $('.user-info-navbar, nav.navbar, header.navbar');
    const navbar = $('.navbar, header, .main-header');
    
    // 打印所有可能的导航元素用于调试
    console.log('可能的导航元素:');
    console.log('- .user-info-navbar:', $('.user-info-navbar').length ? '找到' : '未找到');
    console.log('- .navbar:', $('.navbar').length ? '找到' : '未找到');
    console.log('- nav.navbar:', $('nav.navbar').length ? '找到' : '未找到');
    console.log('- header:', $('header').length ? '找到' : '未找到');
    
    // 计算实际的导航栏高度和固定元素高度
    const userNavHeight = userInfoNavbar.length ? userInfoNavbar.outerHeight() || 0 : 0;
    const navbarHeight = navbar.length ? navbar.outerHeight() || 0 : 0;
    
    // 备用固定高度 - 如果无法检测到导航栏元素
    const backupNavHeight = userNavHeight + navbarHeight > 0 ? 0 : 60;
    
    // 计算总偏移量 = 导航栏高度 + 额外空间 + 备用高度
    const totalOffset = userNavHeight + navbarHeight + additionalOffset + backupNavHeight;
    
    console.log('滚动偏移量计算:');
    console.log('- 用户导航栏高度:', userNavHeight, 'px');
    console.log('- 主导航栏高度:', navbarHeight, 'px');
    console.log('- 备用导航高度:', backupNavHeight, 'px');
    console.log('- 额外空间:', additionalOffset, 'px');
    console.log('- 总偏移量:', totalOffset, 'px');
    
    // 计算目标位置
    const targetPosition = $(targetElement).offset().top - totalOffset;
    console.log(`滚动到位置: ${targetPosition}px (原始位置: ${$(targetElement).offset().top}px)`);
    
    // 执行滚动
    $('html, body').stop().animate({
        scrollTop: Math.max(0, targetPosition)
    }, 600);
    
    return true;
} 