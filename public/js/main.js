/**
 * 归云集 — 主题脚本
 */
document.addEventListener('DOMContentLoaded', function () {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
});

/* ── 导航栏滚动效果 ── */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const isHome = document.body.classList.contains('home');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* ── 移动端菜单 ── */
function initMobileMenu() {
  const toggle = document.getElementById('headerToggle');
  const nav = document.getElementById('headerNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    }
  });
}

/* ── 平滑滚动 ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── 返回顶部 ── */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', '返回顶部');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
