/**
 * 导航栏高亮处理脚本
 * 独立实现导航栏高亮功能，确保可靠运行
 */
(function() {
    // 确保文档加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        console.log('导航高亮脚本已加载');
        
        // 等待确保jQuery和菜单元素加载完成
        function checkAndInitialize() {
            // 检查jQuery是否可用
            if (typeof jQuery === 'undefined') {
                console.log('等待jQuery加载...');
                setTimeout(checkAndInitialize, 300);
                return;
            }
            
            // 检查菜单是否存在
            const menuItems = document.querySelectorAll('#main-menu li a');
            if (menuItems.length === 0) {
                console.log('等待菜单元素加载...');
                setTimeout(checkAndInitialize, 300);
                return;
            }
            
            console.log('开始初始化导航高亮...');
            initializeNavHighlight();
        }
        
        // 初始化导航高亮
        function initializeNavHighlight() {
            // 为所有菜单项添加点击事件
            jQuery('#main-menu li a').on('click', function() {
                // 移除所有高亮
                jQuery('#main-menu li').removeClass('active');
                
                // 添加高亮到当前点击项
                jQuery(this).parent('li').addClass('active');
                
                // 保存当前点击的链接到本地存储
                const href = jQuery(this).attr('href');
                if (href) {
                    localStorage.setItem('activeMenuItem', href);
                }
                
                console.log('菜单项点击:', href);
            });
            
            // 恢复之前的高亮状态
            const savedItem = localStorage.getItem('activeMenuItem');
            if (savedItem) {
                console.log('恢复保存的高亮状态:', savedItem);
                jQuery('#main-menu li a').each(function() {
                    if (jQuery(this).attr('href') === savedItem) {
                        jQuery(this).parent('li').addClass('active');
                    }
                });
            } 
            // 如果没有保存的项但有URL hash，根据hash设置高亮
            else if (window.location.hash) {
                const hash = window.location.hash;
                console.log('根据URL hash设置高亮:', hash);
                jQuery('#main-menu li a').each(function() {
                    if (jQuery(this).attr('href') === hash) {
                        jQuery(this).parent('li').addClass('active');
                    }
                });
            }
            
            // 监听hash变化事件
            window.addEventListener('hashchange', function() {
                const newHash = window.location.hash;
                console.log('URL hash变化:', newHash);
                
                if (newHash) {
                    // 移除所有高亮
                    jQuery('#main-menu li').removeClass('active');
                    
                    // 查找并设置新的高亮
                    jQuery('#main-menu li a').each(function() {
                        if (jQuery(this).attr('href') === newHash) {
                            jQuery(this).parent('li').addClass('active');
                            localStorage.setItem('activeMenuItem', newHash);
                        }
                    });
                }
            });
            
            console.log('导航高亮初始化完成');
        }
        
        // 开始检查并初始化
        checkAndInitialize();
    });
})(); 