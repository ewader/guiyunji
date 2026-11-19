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
      // 农历：原来用 lunar.toString().slice(-3) 截尾巴，十月初十会截成「月十一」，改成按字段拼
      el('al-lunar').textContent =
        '农历 ' + lunar.getYearInGanZhi() + ' 年 · ' +
        lunar.getMonthInChinese() + '月' + lunar.getDayInChinese();

      // 四格：生肖 / 星座 / 节气 / 冲煞
      el('al-shengxiao').textContent = lunar.getYearShengXiao();
      el('al-xingzuo').textContent = solar.getXingZuo() + '座';
      var jieqiName = lunar.getJieQi() || lunar.getPrevJieQi(true).getName();
      el('al-jieqi').textContent = jieqiName;
      el('al-chongsha').textContent = '冲' + lunar.getDayChongShengXiao() + ' 煞' + lunar.getDaySha();

      // 首页「二十四节气」栏：用同一套判定给当前节气加高亮，并把已过／未到的节气分出来。
      // 这段原先是写在 Hugo 模板里按月估的（每月 16 号就跳到下一节气），
      // 挪到这里以后，交节时刻由库算，不用每年手工维护日期表。
      // $solar 的顺序就是从立春到次年大寒的时间顺序，按下标前后就能分出已过与未到。
      var solarItems = document.querySelectorAll('.solar-item');
      var curIdx = -1;
      for (var i = 0; i < solarItems.length; i++) {
        if (solarItems[i].textContent.trim() === jieqiName) { curIdx = i; break; }
      }
      for (var j = 0; j < solarItems.length; j++) {
        solarItems[j].classList.toggle('is-past', curIdx > -1 && j < curIdx);
        solarItems[j].classList.toggle('is-now', j === curIdx);
        solarItems[j].classList.toggle('is-future', curIdx > -1 && j > curIdx);
      }

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
