(function () {
  'use strict';

  var config = window.PortfolioCase || {};
  var state = { lang: 'pt', theme: 'dark' };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  try {
    var storedTheme = localStorage.getItem('cq-theme');
    var storedLang = localStorage.getItem('cq-lang');
    if (storedTheme === 'light' || storedTheme === 'dark') state.theme = storedTheme;
    if (storedLang === 'pt' || storedLang === 'en') state.lang = storedLang;
  } catch (error) {}

  function $(selector, context) { return (context || document).querySelector(selector); }
  function $$(selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); }
  function text(key) {
    var group = config.i18n && config.i18n[state.lang];
    return group && group[key] ? group[key] : key;
  }
  function applyTheme() { document.body.dataset.theme = state.theme; }
  function applyLanguage() {
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    $$('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      var value = text(key);
      if (value !== key) element.textContent = value;
    });
    $$('[data-i18n-placeholder]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-placeholder');
      var value = text(key);
      if (value !== key) element.setAttribute('placeholder', value);
    });
    $$('.lang-btn').forEach(function (button) {
      var active = button.dataset.lang === state.lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    window.dispatchEvent(new CustomEvent('portfolio-case-language', { detail: { lang: state.lang } }));
  }
  function bindBaseEvents() {
    var themeToggle = $('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
        try { localStorage.setItem('cq-theme', state.theme); } catch (error) {}
      });
    }
    $$('.lang-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.dataset.lang === state.lang) return;
        state.lang = button.dataset.lang;
        try { localStorage.setItem('cq-lang', state.lang); } catch (error) {}
        applyLanguage();
      });
    });
  }
  function initProgress() {
    var bar = $('.case-progress');
    if (!bar) return;
    var update = function () {
      var root = document.documentElement;
      var max = root.scrollHeight - root.clientHeight;
      bar.style.width = (max > 0 ? (root.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
  function initReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-hidden');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(function (element) {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
        element.classList.add('is-hidden');
        observer.observe(element);
      }
    });
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function localize(value) {
    if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, state.lang)) return value[state.lang];
    return value == null ? '' : String(value);
  }

  window.CaseCommon = {
    $: $, $$: $$, text: text, escapeHtml: escapeHtml, localize: localize,
    getLang: function () { return state.lang; }, reducedMotion: reducedMotion
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme();
    bindBaseEvents();
    applyLanguage();
    initProgress();
    setTimeout(initReveal, 60);
  });
})();