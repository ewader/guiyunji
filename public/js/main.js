/**
 * 归云集 - 主题脚本
 * 包含轮播图、菜单切换、页面过渡等功能
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initMobileMenu();
    initShareButtons();
    initPageTransition();
    initSmoothScroll();
});

/**
 * 英雄轮播图
 */
function initHeroSlider() {
    const slider = document.getElementById('heroSlider');
    const dotsContainer = document.getElementById('heroDots');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5秒自动切换
    
    // 创建指示器点
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `第 ${index + 1} 张`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.hero-dot');
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // 更新索引
        currentIndex = index;
        
        // 添加新的活动状态
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // 下一张
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    // 上一张
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 事件监听
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // 鼠标悬停时暂停自动播放
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // 向左滑动，显示下一张
            } else {
                prevSlide(); // 向右滑动，显示上一张
            }
        }
    }
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    // 启动自动播放
    startAutoPlay();
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    let isMenuOpen = false;
    
    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active', isMenuOpen);
        navMenu.classList.toggle('active', isMenuOpen);
        
        // 防止背景滚动
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // 点击菜单项后关闭菜单
    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * 分享按钮功能
 */
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    if (shareButtons.length === 0) return;
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch (platform) {
                case 'weibo':
                    shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    break;
                    
                case 'weixin':
                    // 微信分享需要生成二维码，这里简单复制链接
                    copyToClipboard(window.location.href);
                    showNotification('链接已复制，请在微信中粘贴分享');
                    break;
                    
                case 'copy':
                    copyToClipboard(window.location.href);
                    showNotification('链接已复制到剪贴板');
                    break;
            }
        });
    });
}

/**
 * 复制到剪贴板
 */
function copyToClipboard(text) {
    // 使用现代 API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .catch(err => {
                console.error('复制失败:', err);
                fallbackCopyToClipboard(text);
            });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * 备用复制方法
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
}

/**
 * 显示通知
 */
function showNotification(message) {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--ink-black);
        color: var(--rice-white);
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // 添加动画样式
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideDown {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // 3秒后自动消失
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * 页面过渡效果
 */
function initPageTransition() {
    // 为所有内部链接添加页面过渡
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 跳过锚点链接和特殊链接
            if (href.startsWith('#') || 
                this.getAttribute('target') === '_blank' ||
                this.classList.contains('no-transition')) {
                return;
            }
            
            e.preventDefault();
            
            // 添加淡出效果
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // 延迟导航
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    // 为锚点链接添加平滑滚动
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 图片懒加载（可选增强）
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // 观察所有带 data-src 的图片
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 性能优化：节流函数
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

/**
 * 性能优化：防抖函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * 窗口大小改变时的处理
 */
const handleResize = debounce(() => {
    // 可以在这里添加响应式相关的逻辑
    // 例如重新计算轮播图高度等
}, 250);

window.addEventListener('resize', handleResize);

/**
 * 页面可见性变化处理
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时暂停一些操作
        // 例如暂停自动播放
    } else {
        // 页面显示时恢复操作
    }
});

/**
 * 错误处理
 */
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.message);
});

/**
 * 控制台欢迎信息
 */
console.log('%c归云集', 'font-size: 24px; font-weight: bold; color: #c73e3a;');
console.log('%c传承中华文化，弘扬民族精神', 'font-size: 14px; color: #5a7a6a;');