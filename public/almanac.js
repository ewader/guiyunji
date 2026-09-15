// ═══ 今日黄历：lunar-typescript 浏览器端渲染 ═══
// 库：static/js/lunar.min.js（IIFE，全局 LunarLib）
(function () {
  'use strict';

  function fill() {
    if (!window.LunarLib) return false;
    try {
      var solar = LunarLib.Solar.fromDate(new Date());
      var lunar = solar.getLunar();

      var weekCN = ['日', '一', '二', '三', '四', '五', '六'];

      var el = function (id) { return document.getElementById(id); };
      if (!el('al-day')) return false;

      // 星期（头部右侧）
      el('al-week').textContent = '星期' + weekCN[solar.getWeek()];

      // 日期卡：公历 / 日 / 农历+干支
      el('al-solar').textContent = solar.getYear() + ' 年 ' + solar.getMonth() + ' 月';
      el('al-day').textContent = solar.getDay();
      el('al-lunar').textContent =
        '农历 ' + lunar.getYearInGanZhi() + ' 年 · ' + lunar.toString().slice(-3);

      // 四格：生肖 / 星座 / 节气 / 冲煞
      el('al-shengxiao').textContent = lunar.getYearShengXiao();
      el('al-xingzuo').textContent = solar.getXingZuo() + '座';
      el('al-jieqi').textContent = lunar.getJieQi() || lunar.getPrevJieQi(true).getName();
      el('al-chongsha').textContent = '冲' + lunar.getDayChongShengXiao() + ' 煞' + lunar.getDaySha();

      // 宜 / 忌（各取前 8 项，避免溢出）
      el('al-yi').textContent = lunar.getDayYi().slice(0, 8).join(' ') || '—';
      el('al-ji').textContent = lunar.getDayJi().slice(0, 8).join(' ') || '—';

      // 方位
      el('al-pos').textContent =
        '财神 [' + lunar.getDayPositionCaiDesc() + '] · 喜神 [' + lunar.getDayPositionXiDesc() +
        '] · 福神 [' + lunar.getDayPositionFuDesc() + ']';
      return true;
    } catch (e) {
      return false;
    }
  }

  if (!fill()) {
    // 库未加载或异常：静默降级
    var body = document.querySelector('#almanac .almanac-body');
    if (body) {
      body.innerHTML = '<p class="almanac-fallback">黄历加载失败，请刷新重试</p>';
    }
  }
})();
