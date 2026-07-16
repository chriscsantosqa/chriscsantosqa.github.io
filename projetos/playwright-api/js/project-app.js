(function () {
  'use strict';

  var data = window.PlaywrightCaseData;
  if (!data) return;

  var state = {
    lang: 'pt',
    theme: 'dark',
    selectedNodeId: 'token-provider',
    filter: 'all',
    query: '',
    running: false,
    timers: [],
    clockTimer: null,
    reportStatus: 'all',
    reportSuite: 'all',
    selectedTestId: 'create-kit'
  };

  try {
    var savedTheme = localStorage.getItem('cq-theme');
    var savedLang = localStorage.getItem('cq-lang');
    if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
    if (savedLang === 'pt' || savedLang === 'en') state.lang = savedLang;
  } catch (error) {}

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supportsHover = window.matchMedia('(hover: hover)').matches;
  var openFolders = new Set();
  var nodeIndex = new Map();
  var parentIndex = new Map();

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $$(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  function localize(value) {
    if (value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, state.lang)) {
      return value[state.lang];
    }
    return value == null ? '' : String(value);
  }

  function text(key) {
    return data.i18n[state.lang][key] || key;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function indexNodes(nodes, parentId) {
    nodes.forEach(function (node) {
      nodeIndex.set(node.id, node);
      if (parentId) parentIndex.set(node.id, parentId);
      if (node.expanded) openFolders.add(node.id);
      if (node.children) indexNodes(node.children, node.id);
    });
  }

  indexNodes(data.nodes, null);

  function applyTheme() {
    document.body.dataset.theme = state.theme;
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';

    $$('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      if (data.i18n[state.lang][key]) element.textContent = data.i18n[state.lang][key];
    });

    $$('[data-i18n-placeholder]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-placeholder');
      if (data.i18n[state.lang][key]) element.setAttribute('placeholder', data.i18n[state.lang][key]);
    });

    $$('.lang-btn').forEach(function (button) {
      var active = button.dataset.lang === state.lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    renderTree();
    renderDetails(nodeIndex.get(state.selectedNodeId));
    renderFlow();
    renderSimulationSteps(-1);
    renderReport();
  }

  function nodeMatches(node) {
    var query = state.query.trim().toLowerCase();
    var filterMatches = state.filter === 'all' || node.category === state.filter;
    var haystack = [
      node.name,
      localize(node.title),
      localize(node.summary),
      localize(node.responsibility),
      localize(node.problem),
      localize(node.decision),
      localize(node.relations)
    ].join(' ').toLowerCase();
    var queryMatches = !query || haystack.indexOf(query) !== -1;
    var childMatches = (node.children || []).some(nodeMatches);
    return (filterMatches && queryMatches) || childMatches;
  }

  function folderIcon() {
    return '<svg class="tree-node-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 6.8h6l2 2h10v9.7A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5V6.8Z"></path><path d="M3 9h18"></path></svg>';
  }

  function fileIcon() {
    return '<svg class="tree-node-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"></path><path d="M14 3v5h5"></path></svg>';
  }

  function renderTreeNodes(nodes, level) {
    var visible = nodes.filter(nodeMatches);
    if (!visible.length) return '';

    return '<ul class="tree-list" role="group">' + visible.map(function (node) {
      var isFolder = node.type === 'folder';
      var isOpen = isFolder && openFolders.has(node.id);
      var isSelected = node.id === state.selectedNodeId;
      var chevron = isFolder ? '<svg class="tree-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m6 3 5 5-5 5"></path></svg>' : '<span class="tree-chevron"></span>';
      var children = isFolder && isOpen ? renderTreeNodes(node.children || [], level + 1) : '';
      var expanded = isFolder ? ' aria-expanded="' + (isOpen ? 'true' : 'false') + '"' : '';

      return '<li role="none">' +
        '<button type="button" class="tree-node-row' + (isSelected ? ' selected' : '') + '" role="treeitem" aria-level="' + level + '" data-node-id="' + escapeHtml(node.id) + '"' + expanded + '>' +
          chevron + (isFolder ? folderIcon() : fileIcon()) + '<span class="tree-node-name">' + escapeHtml(node.name) + '</span>' +
        '</button>' + children +
      '</li>';
    }).join('') + '</ul>';
  }

  function renderTree() {
    var container = $('#file-tree');
    var html = renderTreeNodes(data.nodes, 1);
    container.innerHTML = html;
    $('#tree-empty').hidden = Boolean(html);

    $$('.tree-node-row', container).forEach(function (button) {
      var node = nodeIndex.get(button.dataset.nodeId);

      button.addEventListener('click', function () {
        if (node.type === 'folder') {
          if (openFolders.has(node.id)) openFolders.delete(node.id);
          else openFolders.add(node.id);
          state.selectedNodeId = node.id;
          renderTree();
          renderDetails(node);
          return;
        }

        state.selectedNodeId = node.id;
        renderTree();
        renderDetails(node);
      });

      if (supportsHover) {
        button.addEventListener('mouseenter', function () {
          renderDetails(node);
        });
        button.addEventListener('mouseleave', function () {
          renderDetails(nodeIndex.get(state.selectedNodeId));
        });
      }
    });
  }

  function renderCode(node) {
    var code = node.code;
    if (!code && node.children) {
      code = '// ' + localize(node.summary) + '\n\n' + node.children.map(function (child) {
        return (child.type === 'folder' ? '📁 ' : '📄 ') + child.name;
      }).join('\n');
    }
    if (!code) code = '// ' + localize(node.summary);

    $('#code-file-name').textContent = node.name;
    $('#code-language').textContent = node.language || (node.type === 'folder' ? 'Directory' : 'Text');
    $('#code-view').innerHTML = escapeHtml(code);
  }

  function renderDetails(node) {
    if (!node) return;
    $('#details-kind').textContent = String(node.category || node.type).toUpperCase();
    $('#details-title').textContent = localize(node.title) || node.name;
    $('#details-summary').textContent = localize(node.summary);
    $('#details-responsibility').textContent = localize(node.responsibility);
    $('#details-problem').textContent = localize(node.problem);
    $('#details-decision').textContent = localize(node.decision);
    $('#details-relations').textContent = localize(node.relations);
    renderCode(node);
  }

  function revealNode(nodeId) {
    var current = nodeId;
    while (parentIndex.has(current)) {
      current = parentIndex.get(current);
      openFolders.add(current);
    }
    state.filter = 'all';
    state.query = '';
    $('#tree-search').value = '';
    $$('.filter-chip').forEach(function (button) {
      button.classList.toggle('active', button.dataset.filter === 'all');
    });
    state.selectedNodeId = nodeId;
    renderTree();
    renderDetails(nodeIndex.get(nodeId));
  }

  function renderFlow() {
    var container = $('#execution-flow');
    container.innerHTML = data.flow.map(function (step) {
      return '<button type="button" class="flow-step" data-file-id="' + escapeHtml(step.fileId) + '">' +
        '<strong>' + escapeHtml(step.index) + '</strong>' +
        '<span>' + escapeHtml(localize(step.label)) + '</span>' +
      '</button>';
    }).join('');

    $$('.flow-step', container).forEach(function (button) {
      button.addEventListener('click', function () {
        $$('.flow-step', container).forEach(function (item) { item.classList.remove('active'); });
        button.classList.add('active');
        revealNode(button.dataset.fileId);
        $('.explorer-shell').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function clearSimulationTimers() {
    state.timers.forEach(function (timer) { clearTimeout(timer); });
    state.timers = [];
    if (state.clockTimer) clearInterval(state.clockTimer);
    state.clockTimer = null;
  }

  function renderSimulationSteps(activeIndex) {
    var container = $('#simulation-steps');
    container.innerHTML = data.simulationStates.map(function (item, index) {
      var className = index < activeIndex ? 'done' : index === activeIndex ? 'active' : '';
      return '<li class="' + className + '"><strong>' + escapeHtml(item.id) + '</strong><br><span>' + escapeHtml(localize(item.label)) + '</span></li>';
    }).join('');
  }

  function setSimulationState(stateId) {
    var index = data.simulationStates.findIndex(function (item) { return item.id === stateId; });
    if (index < 0) return;
    $('#current-state').textContent = stateId;
    $('#simulation-progress').style.width = (((index + 1) / data.simulationStates.length) * 100) + '%';
    renderSimulationSteps(index);
  }

  function appendTerminalLine(entry) {
    var terminal = $('#simulation-terminal');
    var line = document.createElement('span');
    line.className = 'terminal-line terminal-' + entry.type + (prefersReducedMotion ? '' : ' entering');
    line.textContent = entry.text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function resetSimulation() {
    clearSimulationTimers();
    state.running = false;
    $('#run-simulation').disabled = false;
    $('#simulation-mode').disabled = false;
    $('#simulation-terminal').innerHTML = '<span class="terminal-line terminal-muted">$ ' + escapeHtml(text('waitingExecution')) + '</span>';
    $('#current-state').textContent = 'IDLE';
    $('#simulation-progress').style.width = '0%';
    $('#simulation-clock').textContent = '00:00.000';
    renderSimulationSteps(-1);
    var result = $('#simulation-result');
    result.className = 'simulation-result';
    result.textContent = text('waitingExecution');
  }

  function formatElapsed(milliseconds) {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = Math.floor((milliseconds % 60000) / 1000);
    var ms = Math.floor(milliseconds % 1000);
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + '.' + String(ms).padStart(3, '0');
  }

  function runSimulation() {
    if (state.running) return;
    clearSimulationTimers();
    state.running = true;
    $('#run-simulation').disabled = true;
    $('#simulation-mode').disabled = true;
    $('#simulation-terminal').innerHTML = '';

    var mode = $('#simulation-mode').value;
    var entries = data.simulations[mode];
    var delay = prefersReducedMotion ? 55 : 330;
    var startedAt = performance.now();

    state.clockTimer = setInterval(function () {
      $('#simulation-clock').textContent = formatElapsed(performance.now() - startedAt);
    }, 33);

    entries.forEach(function (entry, index) {
      var timer = setTimeout(function () {
        setSimulationState(entry.state);
        appendTerminalLine(entry);

        if (index === entries.length - 1) {
          clearInterval(state.clockTimer);
          state.clockTimer = null;
          state.running = false;
          $('#run-simulation').disabled = false;
          $('#simulation-mode').disabled = false;
          renderSimulationSteps(data.simulationStates.length);

          var result = $('#simulation-result');
          result.className = 'simulation-result ' + (mode === 'stable' ? 'success' : 'failure');
          result.textContent = mode === 'stable' ? text('resultCompleted') : text('resultCompletedFailure');
        }
      }, index * delay);
      state.timers.push(timer);
    });
  }

  function statusLabel(status) {
    if (status === 'passed') return text('passed');
    if (status === 'failed') return text('failed');
    if (status === 'skipped') return text('skipped');
    return text('all');
  }

  function reportCounts() {
    return data.tests.reduce(function (counts, test) {
      counts[test.status] += 1;
      return counts;
    }, { passed: 0, failed: 0, skipped: 0 });
  }

  function renderReportFilters() {
    var counts = reportCounts();
    var filters = [
      { id: 'all', label: text('all'), count: data.tests.length },
      { id: 'passed', label: text('passed'), count: counts.passed },
      { id: 'failed', label: text('failed'), count: counts.failed },
      { id: 'skipped', label: text('skipped'), count: counts.skipped }
    ];

    $('#report-filters').innerHTML = filters.map(function (filter) {
      return '<button type="button" class="report-filter' + (state.reportStatus === filter.id ? ' active' : '') + '" data-status="' + filter.id + '">' +
        '<span>' + escapeHtml(filter.label) + '</span><span>' + filter.count + '</span>' +
      '</button>';
    }).join('');

    $$('.report-filter').forEach(function (button) {
      button.addEventListener('click', function () {
        state.reportStatus = button.dataset.status;
        renderReport();
      });
    });
  }

  function renderSuites() {
    var suites = Array.from(new Set(data.tests.map(function (test) { return test.suite; }))).sort();
    var items = [{ id: 'all', label: text('all') }].concat(suites.map(function (suite) { return { id: suite, label: suite }; }));

    $('#suite-list').innerHTML = items.map(function (suite) {
      return '<button type="button" class="suite-button' + (state.reportSuite === suite.id ? ' active' : '') + '" data-suite="' + escapeHtml(suite.id) + '">' + escapeHtml(suite.label) + '</button>';
    }).join('');

    $$('.suite-button').forEach(function (button) {
      button.addEventListener('click', function () {
        state.reportSuite = button.dataset.suite;
        renderReport();
      });
    });
  }

  function visibleTests() {
    return data.tests.filter(function (test) {
      var statusMatches = state.reportStatus === 'all' || test.status === state.reportStatus;
      var suiteMatches = state.reportSuite === 'all' || test.suite === state.reportSuite;
      return statusMatches && suiteMatches;
    });
  }

  function renderReportOverview() {
    var counts = reportCounts();
    var total = data.tests.length;
    var passedAngle = (counts.passed / total) * 360;
    var failedAngle = passedAngle + (counts.failed / total) * 360;
    var donut = $('#result-donut');
    donut.style.setProperty('--passed-angle', passedAngle + 'deg');
    donut.style.setProperty('--failed-angle', failedAngle + 'deg');
    $('#donut-total').textContent = total;

    var metrics = [
      { className: 'passed', value: counts.passed, label: text('passed') },
      { className: 'failed', value: counts.failed, label: text('failed') },
      { className: 'skipped', value: counts.skipped, label: text('skipped') },
      { className: 'duration', value: '6.4s', label: text('duration') }
    ];

    $('#report-metrics').innerHTML = metrics.map(function (metric) {
      return '<div class="report-metric ' + metric.className + '"><strong>' + escapeHtml(metric.value) + '</strong><span>' + escapeHtml(metric.label) + '</span></div>';
    }).join('');
  }

  function renderTestList() {
    var tests = visibleTests();
    $('#visible-test-count').textContent = tests.length + ' / ' + data.tests.length;

    if (!tests.length) {
      $('#test-list').innerHTML = '<p style="padding:18px;color:#858b99;font-size:11px">' + escapeHtml(text('noTests')) + '</p>';
      renderTestDetail(null);
      return;
    }

    if (!tests.some(function (test) { return test.id === state.selectedTestId; })) {
      state.selectedTestId = tests[0].id;
    }

    $('#test-list').innerHTML = tests.map(function (test) {
      return '<button type="button" class="test-list-button' + (test.id === state.selectedTestId ? ' active' : '') + '" data-test-id="' + escapeHtml(test.id) + '">' +
        '<span class="result-dot ' + test.status + '"></span>' +
        '<span class="test-list-name"><strong>' + escapeHtml(localize(test.name)) + '</strong><span>' + escapeHtml(test.suite) + '</span></span>' +
        '<span class="test-duration">' + escapeHtml(test.duration) + '</span>' +
      '</button>';
    }).join('');

    $$('.test-list-button').forEach(function (button) {
      button.addEventListener('click', function () {
        state.selectedTestId = button.dataset.testId;
        renderTestList();
        renderTestDetail(data.tests.find(function (test) { return test.id === state.selectedTestId; }));
      });
    });

    renderTestDetail(data.tests.find(function (test) { return test.id === state.selectedTestId; }));
  }

  function renderTestDetail(test) {
    if (!test) {
      $('#test-status').className = 'result-status';
      $('#test-status').textContent = '—';
      $('#test-title').textContent = text('noTests');
      $('#test-suite').textContent = '';
      $('#test-metadata').innerHTML = '';
      $('#test-steps').innerHTML = '';
      $('#test-attachments').innerHTML = '';
      return;
    }

    $('#test-status').className = 'result-status ' + test.status;
    $('#test-status').textContent = statusLabel(test.status);
    $('#test-title').textContent = localize(test.name);
    $('#test-suite').textContent = test.suite + ' · ' + test.duration;
    $('#test-metadata').innerHTML = test.metadata.map(function (metadata) {
      return '<span class="metadata-chip">' + escapeHtml(metadata) + '</span>';
    }).join('');
    $('#test-steps').innerHTML = test.steps.map(function (step) {
      return '<li class="' + step.status + '">' + escapeHtml(localize(step.label)) + '</li>';
    }).join('');
    $('#test-attachments').innerHTML = test.attachments.map(function (attachment) {
      return '<button type="button" class="attachment-button" title="' + escapeHtml(text('openAttachment')) + '">' + escapeHtml(localize(attachment)) + '</button>';
    }).join('');

    $$('.attachment-button').forEach(function (button) {
      button.addEventListener('click', function () {
        window.alert(button.textContent + '\n\n' + text('reportDisclaimer'));
      });
    });
  }

  function renderReport() {
    renderReportOverview();
    renderReportFilters();
    renderSuites();
    renderTestList();
  }

  function initScrollProgress() {
    var bar = $('.progress-bar');
    function update() {
      var root = document.documentElement;
      var maximum = root.scrollHeight - root.clientHeight;
      bar.style.width = (maximum > 0 ? (root.scrollTop / maximum) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function bindEvents() {
    $('.theme-toggle').addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try { localStorage.setItem('cq-theme', state.theme); } catch (error) {}
    });

    $$('.lang-btn').forEach(function (button) {
      button.addEventListener('click', function () {
        if (button.dataset.lang === state.lang) return;
        state.lang = button.dataset.lang;
        try { localStorage.setItem('cq-lang', state.lang); } catch (error) {}
        applyLanguage();
        resetSimulation();
      });
    });

    $('#tree-search').addEventListener('input', function (event) {
      state.query = event.target.value;
      renderTree();
    });

    $$('.filter-chip').forEach(function (button) {
      button.addEventListener('click', function () {
        state.filter = button.dataset.filter;
        $$('.filter-chip').forEach(function (item) { item.classList.toggle('active', item === button); });
        renderTree();
      });
    });

    $('#run-simulation').addEventListener('click', runSimulation);
    $('#reset-simulation').addEventListener('click', resetSimulation);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme();
    bindEvents();
    applyLanguage();
    resetSimulation();
    initScrollProgress();
  });
})();
