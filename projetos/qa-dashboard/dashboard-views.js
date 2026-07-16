(function () {
  'use strict';

  var portfolioCase = window.PortfolioCase;
  if (!portfolioCase || !portfolioCase.i18n) return;

  Object.assign(portfolioCase.i18n.pt, {
    viewOverview: 'Overview',
    viewDaily: 'Daily',
    viewTimeline: 'Timeline',
    viewQuality: 'Qualidade',
    viewCockpit: 'Sprint cockpit',
    viewReports: 'Relatórios',
    viewSystem: 'Status do sistema',
    screen: 'Tela',
    dashboardLead: 'Troque o time e a sprint, sincronize os dados fictícios e navegue pelas telas. Cada opção reproduz uma parte da lógica que implementei no produto original.'
  });

  Object.assign(portfolioCase.i18n.en, {
    viewOverview: 'Overview',
    viewDaily: 'Daily',
    viewTimeline: 'Timeline',
    viewQuality: 'Quality',
    viewCockpit: 'Sprint cockpit',
    viewReports: 'Reports',
    viewSystem: 'System status',
    screen: 'Screen',
    dashboardLead: 'Change the team and sprint, sync fictional data, and navigate through the screens. Each option reproduces part of the logic I implemented in the original product.'
  });

  var state = {
    view: 'overview',
    dailyOwner: 'all',
    dailyStatus: 'all'
  };

  var contexts = {
    'alpha-s12': { quality: 86, flow: 72, risk: 'medium', pass: 91, bugs: 5, carry: 4, cycle: 38, throughput: 18 },
    'alpha-s13': { quality: 78, flow: 64, risk: 'high', pass: 84, bugs: 9, carry: 7, cycle: 49, throughput: 14 },
    'beta-s12': { quality: 92, flow: 88, risk: 'low', pass: 96, bugs: 2, carry: 2, cycle: 27, throughput: 21 },
    'beta-s13': { quality: 89, flow: 81, risk: 'low', pass: 94, bugs: 3, carry: 3, cycle: 31, throughput: 20 }
  };

  var dailyItems = [
    { id: 'PBI-1042', title: { pt: 'Validação de checkout', en: 'Checkout validation' }, owner: 'Alex', qa: 'Taylor', system: 'Commerce', status: 'Testing', age: 6, tasks: 4, bugs: 2, update: { pt: 'Aguardando correção de regra de arredondamento.', en: 'Waiting for a rounding-rule fix.' } },
    { id: 'PBI-1051', title: { pt: 'Filtros de catálogo', en: 'Catalog filters' }, owner: 'Sam', qa: 'Jordan', system: 'Catalog', status: 'Development', age: 4, tasks: 5, bugs: 0, update: { pt: 'Implementação em andamento sem bloqueio.', en: 'Implementation in progress without blockers.' } },
    { id: 'PBI-1068', title: { pt: 'Regras de notificação', en: 'Notification rules' }, owner: 'Taylor', qa: 'Morgan', system: 'Messaging', status: 'Code Review', age: 3, tasks: 3, bugs: 1, update: { pt: 'Pull request aberto; validar cenários negativos depois do merge.', en: 'Pull request open; validate negative scenarios after merge.' } },
    { id: 'PBI-1074', title: { pt: 'Perfis de acesso', en: 'Access profiles' }, owner: 'Jordan', qa: 'Alex', system: 'Identity', status: 'Testing', age: 8, tasks: 6, bugs: 2, update: { pt: 'Impedimento por dependência externa recorrente.', en: 'Blocked by a recurring external dependency.' } },
    { id: 'PBI-1080', title: { pt: 'Histórico de auditoria', en: 'Audit history' }, owner: 'Morgan', qa: 'Taylor', system: 'Platform', status: 'Backlog', age: 2, tasks: 0, bugs: 0, update: { pt: 'Critérios de aceite ainda precisam de detalhamento.', en: 'Acceptance criteria still need detail.' } }
  ];

  var timelineItems = [
    {
      id: 'PBI-1042', title: { pt: 'Validação de checkout', en: 'Checkout validation' }, status: 'Testing', effort: ['DEV 12h', 'QA 6h', 'PAIR 2h'],
      phases: [
        ['DEV', 0, 3, 22, '#67e8f9', false], ['PR', 3, 2, 45, '#c4b5fd', false], ['PAIR', 5, 1, 68, '#6ee7b7', false], ['TEST', 6, 3, 91, '#fcd34d', true]
      ]
    },
    {
      id: 'PBI-1051', title: { pt: 'Filtros de catálogo', en: 'Catalog filters' }, status: 'Development', effort: ['DEV 16h', 'QA 4h', 'PAIR —'],
      phases: [
        ['DEV', 1, 5, 22, '#67e8f9', true], ['PR', 6, 2, 45, '#c4b5fd', false], ['PAIR', 8, 1, 68, '#6ee7b7', false], ['TEST', 9, 1, 91, '#fcd34d', false]
      ]
    },
    {
      id: 'PBI-1074', title: { pt: 'Perfis de acesso', en: 'Access profiles' }, status: 'Impedimento', effort: ['DEV 10h', 'QA 8h', 'PAIR 3h'],
      phases: [
        ['DEV', 0, 2, 22, '#67e8f9', false], ['PR', 2, 2, 45, '#c4b5fd', false], ['PAIR', 4, 2, 68, '#6ee7b7', true], ['TEST', 6, 4, 91, '#fcd34d', true]
      ]
    }
  ];

  var qualityData = {
    rootCause: [['Regra de negócio', 38], ['Contrato/API', 24], ['Dados e massa', 17], ['Integração', 13], ['Interface', 8]],
    leakage: [['Development', 12], ['Code Review', 18], ['Testing', 46], ['Homologation', 24]],
    sla: [['Critical', '4.2h', '92%'], ['High', '9.8h', '84%'], ['Medium', '21h', '78%'], ['Low', '43h', '71%']]
  };

  var riskRows = [
    { title: { pt: 'Concentração em testes', en: 'Testing concentration' }, detail: { pt: 'Quatro itens chegaram à validação no terço final da sprint.', en: 'Four items reached validation in the final third of the sprint.' }, level: 'high' },
    { title: { pt: 'Dependência recorrente', en: 'Recurring dependency' }, detail: { pt: 'Uma integração externa impactou dois PBIs.', en: 'One external integration affected two PBIs.' }, level: 'medium' },
    { title: { pt: 'Aumento de escopo', en: 'Scope increase' }, detail: { pt: 'O escopo cresceu 14% após o início da sprint.', en: 'Scope grew 14% after sprint start.' }, level: 'medium' }
  ];

  var actions = [
    { priority: 'alta', title: { pt: 'Aplicar swarm nos itens em teste', en: 'Swarm on testing items' }, text: { pt: 'Reduzir fila de validação antes de aceitar novo trabalho.', en: 'Reduce the validation queue before accepting new work.' } },
    { priority: 'alta', title: { pt: 'Confirmar responsável pela dependência', en: 'Confirm dependency owner' }, text: { pt: 'Definir prazo e alternativa para o bloqueio externo.', en: 'Define deadline and alternative for the external blocker.' } },
    { priority: 'média', title: { pt: 'Congelar entrada de escopo', en: 'Freeze scope intake' }, text: { pt: 'Permitir exceção apenas com decisão explícita de produto.', en: 'Allow exceptions only through an explicit product decision.' } },
    { priority: 'baixa', title: { pt: 'Revisar critérios de aceite', en: 'Review acceptance criteria' }, text: { pt: 'Antecipar dúvidas antes do próximo refinamento.', en: 'Resolve questions before the next refinement.' } }
  ];

  function language() {
    try {
      return localStorage.getItem('cq-lang') === 'en' ? 'en' : 'pt';
    } catch (error) {
      return document.documentElement.lang === 'en' ? 'en' : 'pt';
    }
  }

  function localize(value) {
    return value && typeof value === 'object' ? value[language()] : value;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function selectedContext() {
    var team = document.getElementById('team-select');
    var sprint = document.getElementById('sprint-select');
    return contexts[(team ? team.value : 'alpha') + '-' + (sprint ? sprint.value : 's12')] || contexts['alpha-s12'];
  }

  function panel(title, subtitle, body, extraClass) {
    return '<section class="dash-panel ' + (extraClass || '') + '">' +
      '<div class="dash-panel-head"><strong>' + escapeHtml(title) + '</strong><span>' + escapeHtml(subtitle || '') + '</span></div>' +
      body +
    '</section>';
  }

  function viewHead(title, description, actionsHtml) {
    return '<div class="view-page-head"><div><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(description) + '</p></div>' +
      '<div class="view-actions">' + (actionsHtml || '') + '</div></div>';
  }

  function summaryCard(label, value, note, className, id) {
    return '<article class="view-summary-card ' + (className || '') + '"' + (id ? ' id="' + id + '"' : '') + '>' +
      '<span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(value) + '</strong><small>' + escapeHtml(note || '') + '</small></article>';
  }

  function renderDaily() {
    var pt = language() === 'pt';
    var content = document.getElementById('dashboard-view-content');
    var owners = ['all'].concat(Array.from(new Set(dailyItems.map(function (item) { return item.owner; }))));
    var statuses = ['all'].concat(Array.from(new Set(dailyItems.map(function (item) { return item.status; }))));

    var ownerOptions = owners.map(function (owner) {
      var label = owner === 'all' ? (pt ? 'Todos os devs' : 'All developers') : owner;
      return '<option value="' + escapeHtml(owner) + '"' + (state.dailyOwner === owner ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
    }).join('');

    var statusOptions = statuses.map(function (status) {
      var label = status === 'all' ? (pt ? 'Todos os status' : 'All statuses') : status;
      return '<option value="' + escapeHtml(status) + '"' + (state.dailyStatus === status ? ' selected' : '') + '>' + escapeHtml(label) + '</option>';
    }).join('');

    content.innerHTML =
      viewHead(
        'Daily Standup',
        pt
          ? 'Nesta tela eu reuni o contexto que precisava estar visível durante a daily: quantidade de PBIs, tarefas, bugs, fase atual, responsáveis, última atualização e sinais de impedimento.'
          : 'On this screen I brought together the context needed during the daily: PBIs, tasks, bugs, current phase, owners, latest update, and blocker signals.',
        '<button class="btn btn-secondary" id="daily-refresh" type="button">' + (pt ? 'Atualizar contexto' : 'Refresh context') + '</button>'
      ) +
      '<div class="view-summary-grid">' +
        summaryCard(pt ? 'PBIs na sprint' : 'Sprint PBIs', '5', pt ? 'contexto atual' : 'current context') +
        summaryCard(pt ? 'Tarefas abertas' : 'Open tasks', '18', 'DEV + QA') +
        summaryCard(pt ? 'Bugs desenvolvimento' : 'Development bugs', '3', pt ? '2 em correção' : '2 being fixed') +
        summaryCard(pt ? 'Bugs homologação' : 'Validation bugs', '2', pt ? 'clique para detalhar' : 'click for detail', 'clickable', 'daily-bugs-card') +
      '</div>' +
      '<div class="view-filter-row">' +
        '<select id="daily-owner-filter" class="case-select">' + ownerOptions + '</select>' +
        '<select id="daily-status-filter" class="case-select">' + statusOptions + '</select>' +
      '</div>' +
      '<div class="daily-layout">' +
        panel(pt ? 'Backlogs acompanhados' : 'Tracked backlog items', pt ? 'filtros por responsável e status' : 'owner and status filters', '<div class="daily-list"><table class="mock-table"><thead><tr><th>ID</th><th>' + (pt ? 'Título' : 'Title') + '</th><th>DEV / QA</th><th>Status</th><th>' + (pt ? 'Atualização' : 'Update') + '</th><th>' + (pt ? 'Sinais' : 'Signals') + '</th></tr></thead><tbody id="daily-items-body"></tbody></table></div>') +
        panel(pt ? 'Leitura para a daily' : 'Daily reading', pt ? 'próxima conversa' : 'next conversation',
          '<div class="daily-detail"><h4 id="daily-detail-title">' + (pt ? 'Pontos que eu levaria para discussão' : 'Points I would bring to discussion') + '</h4>' +
          '<p id="daily-detail-text">' + (pt ? 'Começaria pelos itens com aging alto, dependência ou bugs ativos. Depois confirmaria responsável, prazo e próximo passo antes de discutir entrada de novo trabalho.' : 'I would start with items showing high aging, dependencies, or active bugs. Then I would confirm owner, deadline, and next step before discussing new work.') + '</p>' +
          '<div id="daily-bug-list" class="daily-bug-list"></div></div>') +
      '</div>';

    bindDaily();
    renderDailyRows();
  }

  function renderDailyRows() {
    var pt = language() === 'pt';
    var body = document.getElementById('daily-items-body');
    if (!body) return;
    var filtered = dailyItems.filter(function (item) {
      return (state.dailyOwner === 'all' || item.owner === state.dailyOwner) &&
        (state.dailyStatus === 'all' || item.status === state.dailyStatus);
    });

    body.innerHTML = filtered.map(function (item) {
      var signals = [];
      if (item.age >= 7) signals.push('<span class="inline-badge warning">aging ' + item.age + 'd</span>');
      if (item.bugs) signals.push('<span class="inline-badge danger">' + item.bugs + ' bug(s)</span>');
      if (!signals.length) signals.push('<span class="inline-badge success">' + (pt ? 'sem alerta' : 'no alert') + '</span>');
      return '<tr><td>' + escapeHtml(item.id) + '</td><td><strong>' + escapeHtml(localize(item.title)) + '</strong><br><small>' + escapeHtml(item.system) + '</small></td>' +
        '<td>' + escapeHtml(item.owner) + ' / ' + escapeHtml(item.qa) + '</td><td><span class="table-state">' + escapeHtml(item.status) + '</span></td>' +
        '<td>' + escapeHtml(localize(item.update)) + '</td><td><div class="inline-badges">' + signals.join('') + '</div></td></tr>';
    }).join('');
  }

  function bindDaily() {
    var owner = document.getElementById('daily-owner-filter');
    var status = document.getElementById('daily-status-filter');
    var bugs = document.getElementById('daily-bugs-card');
    var refresh = document.getElementById('daily-refresh');

    if (owner) owner.addEventListener('change', function () { state.dailyOwner = owner.value; renderDailyRows(); });
    if (status) status.addEventListener('change', function () { state.dailyStatus = status.value; renderDailyRows(); });

    if (bugs) bugs.addEventListener('click', function () {
      var pt = language() === 'pt';
      document.getElementById('daily-detail-title').textContent = pt ? 'Bugs de homologação' : 'Validation bugs';
      document.getElementById('daily-detail-text').textContent = pt
        ? 'Eu abria o detalhamento para confirmar impacto, responsável, estado e vínculo com o PBI antes de definir prioridade.'
        : 'I opened the detail to confirm impact, owner, state, and linked PBI before setting priority.';
      document.getElementById('daily-bug-list').innerHTML =
        '<div class="daily-bug"><strong>#BUG-301 · ' + (pt ? 'Divergência no total calculado' : 'Calculated total mismatch') + '</strong><span>Alex · Active · PBI-1042</span></div>' +
        '<div class="daily-bug"><strong>#BUG-304 · ' + (pt ? 'Permissão não aplicada' : 'Permission not applied') + '</strong><span>Jordan · Committed · PBI-1074</span></div>';
    });

    if (refresh) refresh.addEventListener('click', function () {
      refresh.disabled = true;
      refresh.textContent = '...';
      window.setTimeout(function () {
        refresh.disabled = false;
        refresh.textContent = language() === 'pt' ? 'Contexto atualizado' : 'Context refreshed';
      }, 450);
    });
  }

  function renderTimeline() {
    var pt = language() === 'pt';
    var days = ['01/07', '02/07', '03/07', '04/07', '05/07', '08/07', '09/07', '10/07', '11/07', '12/07'];
    var rows = timelineItems.map(function (item) {
      var bars = item.phases.map(function (phase) {
        return '<span class="phase-label" style="--start:' + phase[1] + ';--top:' + phase[3] + 'px">' + phase[0] + '</span>' +
          '<i class="phase-bar planned" style="--start:' + phase[1] + ';--span:' + phase[2] + ';--top:' + (phase[3] + 14) + 'px;--phase-color:' + phase[4] + '"></i>' +
          '<i class="phase-bar' + (phase[5] ? ' late' : '') + '" style="--start:' + phase[1] + ';--span:' + Math.max(1, phase[2] - (phase[5] ? 0 : 1)) + ';--top:' + (phase[3] + 14) + 'px;--phase-color:' + phase[4] + '"></i>';
      }).join('');
      return '<div class="timeline-row"><div class="timeline-item"><strong>' + escapeHtml(item.id + ' · ' + localize(item.title)) + '</strong><p>' + escapeHtml(item.status) + '</p><div class="timeline-effort">' +
        item.effort.map(function (value) { return '<span>' + escapeHtml(value) + '</span>'; }).join('') +
        '</div></div><div class="timeline-lane">' + bars + '</div></div>';
    }).join('');

    document.getElementById('dashboard-view-content').innerHTML =
      viewHead(
        'Timeline',
        pt
          ? 'Eu construí esta visão para comparar a janela planejada com o tempo realmente consumido em Development, Pull Request, Pair Testing e Testing. Ela ajudava a localizar atraso e espera entre fases.'
          : 'I built this view to compare planned windows with the time actually spent in Development, Pull Request, Pair Testing, and Testing. It helped locate delay and waiting between phases.'
      ) +
      '<div class="view-summary-grid">' +
        summaryCard(pt ? 'Itens atrasados' : 'Late items', '2', pt ? 'fora da janela prevista' : 'outside planned window') +
        summaryCard(pt ? 'Maior espera' : 'Longest wait', 'Testing', pt ? 'concentração no fim' : 'end-of-sprint concentration') +
        summaryCard(pt ? 'Esforço DEV' : 'DEV effort', '38h', pt ? 'soma do contexto' : 'context total') +
        summaryCard(pt ? 'Esforço QA + Pair' : 'QA + Pair effort', '23h', pt ? 'soma do contexto' : 'context total') +
      '</div>' +
      '<div class="timeline-legend"><span><i class="planned"></i>' + (pt ? 'planejado' : 'planned') + '</span><span><i></i>' + (pt ? 'executado' : 'actual') + '</span><span><i style="background:#d96a73"></i>' + (pt ? 'período em atraso' : 'late period') + '</span></div>' +
      panel(pt ? 'Cronograma por PBI' : 'PBI schedule', pt ? 'dias úteis da sprint' : 'sprint business days',
        '<div class="timeline-board"><div class="timeline-grid"><div class="timeline-days"><div>' + (pt ? 'Item e esforço' : 'Item and effort') + '</div>' +
        days.map(function (day) { return '<div>' + day + '</div>'; }).join('') + '</div>' + rows + '</div></div>');
  }

  function renderQuality() {
    var pt = language() === 'pt';
    var context = selectedContext();
    var chart = qualityData.rootCause.map(function (row) {
      return '<div class="horizontal-chart-row"><span>' + escapeHtml(row[0]) + '</span><div data-quality-detail="' + escapeHtml(row[0]) + '" data-value="' + row[1] + '"><i style="--value:' + row[1] + '%"></i></div><strong>' + row[1] + '%</strong></div>';
    }).join('');

    var slaRows = qualityData.sla.map(function (row) {
      return '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>';
    }).join('');

    document.getElementById('dashboard-view-content').innerHTML =
      viewHead(
        pt ? 'Qualidade' : 'Quality',
        pt
          ? 'Eu concentrei nesta tela indicadores de defeito, leakage, reabertura, causa raiz, SLA, densidade e aging. Os gráficos tinham drill-down para levar do percentual aos PBIs e bugs que explicavam o resultado.'
          : 'I concentrated defect, leakage, reopen, root cause, SLA, density, and aging indicators on this screen. Charts supported drill-down from percentages to the PBIs and bugs behind the result.'
      ) +
      '<div class="view-summary-grid">' +
        summaryCard(pt ? 'Taxa de aprovação' : 'Pass rate', context.pass + '%', pt ? 'cenários executados' : 'executed scenarios') +
        summaryCard('Leakage', (context.risk === 'high' ? 21 : 12) + '%', pt ? 'defeitos após a fase esperada' : 'defects after expected phase') +
        summaryCard(pt ? 'Reabertura' : 'Reopen', (context.risk === 'high' ? 13 : 7) + '%', pt ? 'correções reprovadas' : 'rejected fixes') +
        summaryCard(pt ? 'Bugs ativos' : 'Active bugs', String(context.bugs), pt ? 'priorizados por severidade' : 'prioritized by severity') +
      '</div>' +
      '<div class="quality-layout">' +
        panel(pt ? 'Distribuição por causa raiz' : 'Root cause distribution', pt ? 'clique em uma barra' : 'click a bar', '<div class="chart-panel"><div class="horizontal-chart">' + chart + '</div></div>') +
        panel(pt ? 'Leitura do indicador' : 'Indicator reading', pt ? 'drill-down orientado à ação' : 'action-oriented drill-down',
          '<div class="quality-detail"><h4 id="quality-detail-title">' + (pt ? 'Regra de negócio' : 'Business rule') + '</h4><p id="quality-detail-text">' +
          (pt ? 'Eu verificaria quais regras geraram mais defeitos, se estavam claras no refinamento e em qual etapa deveriam ter sido detectadas.' : 'I would inspect which rules generated more defects, whether they were clear during refinement, and at which stage they should have been detected.') +
          '</p><div class="quality-mini-grid"><article><span>' + (pt ? 'PBIs afetados' : 'Affected PBIs') + '</span><strong>4</strong></article><article><span>' + (pt ? 'Recorrência' : 'Recurrence') + '</span><strong>2 sprints</strong></article><article><span>' + (pt ? 'Severidade maior' : 'Highest severity') + '</span><strong>High</strong></article><article><span>' + (pt ? 'Ação sugerida' : 'Suggested action') + '</span><strong>' + (pt ? 'Refinar regra' : 'Refine rule') + '</strong></article></div></div>') +
      '</div>' +
      '<div class="dashboard-grid" style="margin-top:10px">' +
        panel(pt ? 'Leakage por fase' : 'Leakage by phase', pt ? 'onde o defeito escapou' : 'where the defect escaped',
          '<div class="quality-bars">' + qualityData.leakage.map(function (row) { return '<div class="quality-bar"><span>' + row[0] + '</span><div><i style="--value:' + row[1] + '%"></i></div><strong>' + row[1] + '%</strong></div>'; }).join('') + '</div>') +
        panel(pt ? 'SLA de resolução' : 'Resolution SLA', pt ? 'tempo e cumprimento' : 'time and compliance',
          '<div class="items-table-wrap"><table class="mock-table"><thead><tr><th>' + (pt ? 'Severidade' : 'Severity') + '</th><th>' + (pt ? 'Média' : 'Average') + '</th><th>SLA</th></tr></thead><tbody>' + slaRows + '</tbody></table></div>') +
      '</div>';

    document.querySelectorAll('[data-quality-detail]').forEach(function (bar) {
      bar.addEventListener('click', function () {
        var title = bar.dataset.qualityDetail;
        var value = bar.dataset.value;
        document.getElementById('quality-detail-title').textContent = title + ' · ' + value + '%';
        document.getElementById('quality-detail-text').textContent = pt
          ? 'Eu usaria este recorte para abrir os bugs relacionados, identificar sistema, requisito e fase de detecção e então discutir uma ação preventiva com o time.'
          : 'I would use this cut to open related bugs, identify system, requirement, and detection stage, and then discuss a preventive action with the team.';
      });
    });
  }

  function renderCockpit() {
    var pt = language() === 'pt';
    var context = selectedContext();
    var score = Math.round((context.quality + context.flow) / 2);
    var risksHtml = riskRows.map(function (risk) {
      return '<article class="cockpit-row"><strong>' + escapeHtml(localize(risk.title)) + '</strong><p>' + escapeHtml(localize(risk.detail)) + '</p><small>' + risk.level.toUpperCase() + '</small></article>';
    }).join('');
    var actionsHtml = actions.map(function (action) {
      return '<article class="cockpit-row"><strong>' + escapeHtml(localize(action.title)) + '</strong><p>' + escapeHtml(localize(action.text)) + '</p><small>' + escapeHtml(action.priority.toUpperCase()) + '</small></article>';
    }).join('');

    document.getElementById('dashboard-view-content').innerHTML =
      viewHead(
        'Sprint Cockpit',
        pt
          ? 'Eu criei o cockpit para reunir saúde, compromisso, previsão, capacidade, riscos e ações prioritárias em uma leitura executiva. A tela não substituía a conversa; ela mostrava onde a conversa precisava começar.'
          : 'I created the cockpit to combine health, commitment, forecast, capacity, risks, and priority actions in an executive view. The screen did not replace conversation; it showed where the conversation should start.'
      ) +
      '<div class="cockpit-layout">' +
        panel(pt ? 'Saúde da sprint' : 'Sprint health', pt ? 'score composto' : 'composite score',
          '<div class="cockpit-health"><div class="health-gauge" style="--gauge:' + (score * 3.6) + 'deg"><div><strong>' + score + '</strong><span>' + (score >= 85 ? (pt ? 'saudável' : 'healthy') : score >= 70 ? (pt ? 'atenção' : 'attention') : (pt ? 'crítica' : 'critical')) + '</span></div></div>' +
          '<div class="cockpit-metrics"><article><span>' + (pt ? 'Compromisso' : 'Commitment') + '</span><strong>' + context.flow + '%</strong></article><article><span>' + (pt ? 'Previsão' : 'Forecast') + '</span><strong>' + (context.flow - 5) + '%</strong></article><article><span>' + (pt ? 'Capacidade' : 'Capacity') + '</span><strong>88%</strong></article></div></div>') +
        '<div class="cockpit-columns">' +
          panel(pt ? 'Riscos críticos' : 'Critical risks', pt ? 'evidência do contexto' : 'context evidence', '<div class="cockpit-list">' + risksHtml + '</div>') +
          panel(pt ? 'Ações recomendadas' : 'Recommended actions', pt ? 'próximos passos' : 'next steps', '<div class="cockpit-list">' + actionsHtml + '</div>') +
        '</div>' +
      '</div>';
  }

  function downloadCsv() {
    var pt = language() === 'pt';
    var rows = [
      ['ID', pt ? 'Título' : 'Title', 'Status', 'Owner', 'Risk'],
      ['PBI-1042', localize(dailyItems[0].title), dailyItems[0].status, dailyItems[0].owner, 'High'],
      ['PBI-1051', localize(dailyItems[1].title), dailyItems[1].status, dailyItems[1].owner, 'Medium']
    ];
    var text = rows.map(function (row) {
      return row.map(function (cell) { return '"' + String(cell).replace(/"/g, '""') + '"'; }).join(';');
    }).join('\r\n');
    var blob = new Blob(['\uFEFF' + text], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'qa-dashboard-mock-report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function renderReports() {
    var pt = language() === 'pt';
    document.getElementById('dashboard-view-content').innerHTML =
      viewHead(
        pt ? 'Relatórios' : 'Reports',
        pt
          ? 'Eu criei relatórios para preservar o recorte analisado e facilitar comunicação com pessoas que não estavam usando o dashboard. A tela permitia gerar detalhamento de sprint, resumo executivo, exportações e uma análise assistida por IA.'
          : 'I created reports to preserve the analyzed context and support communication with people who were not using the dashboard. The screen generated sprint detail, executive summary, exports, and AI-assisted analysis.'
      ) +
      '<div class="reports-grid">' +
        '<article class="report-card"><span>SPRINT DETAIL</span><h4>' + (pt ? 'Relatório detalhado' : 'Detailed report') + '</h4><p>' + (pt ? 'PBIs, tarefas, bugs, responsáveis, esforço, ocorrências e riscos do contexto selecionado.' : 'PBIs, tasks, bugs, owners, effort, occurrences, and risks for the selected context.') + '</p><div class="view-actions"><button class="btn btn-secondary" data-report-action="pdf" type="button">PDF</button><button class="btn btn-secondary" data-report-action="csv" type="button">CSV</button></div></article>' +
        '<article class="report-card"><span>EXECUTIVE</span><h4>' + (pt ? 'Resumo executivo' : 'Executive summary') + '</h4><p>' + (pt ? 'Indicadores, semáforos, riscos e recomendações para acompanhamento gerencial.' : 'Indicators, semaphores, risks, and recommendations for management follow-up.') + '</p><div class="view-actions"><button class="btn btn-secondary" data-report-action="executive" type="button">' + (pt ? 'Gerar resumo' : 'Generate summary') + '</button></div></article>' +
        '<article class="report-card"><span>MCP ANALYSIS</span><h4>' + (pt ? 'Análise assistida' : 'Assisted analysis') + '</h4><p>' + (pt ? 'Contexto compacto enviado ao agente para produzir análise, riscos e mitigações com rastreabilidade.' : 'Compact context sent to the agent to produce analysis, risks, and mitigations with traceability.') + '</p><div class="view-actions"><button class="btn btn-primary" data-report-action="ai" type="button">' + (pt ? 'Analisar sprint' : 'Analyze sprint') + '</button></div></article>' +
      '</div>' +
      '<div class="ai-report">' +
        panel(pt ? 'Score de risco' : 'Risk score', pt ? 'resultado fictício' : 'fictional result', '<div class="ai-score"><strong id="report-risk-score">68</strong><span>' + (pt ? 'atenção' : 'attention') + '</span></div>') +
        panel(pt ? 'Análise do agente' : 'Agent analysis', pt ? 'análise · riscos · mitigação' : 'analysis · risks · mitigation',
          '<div class="ai-analysis"><h4 id="report-analysis-title">' + (pt ? 'Aguardando execução' : 'Waiting for execution') + '</h4><p id="report-analysis-text">' +
          (pt ? 'Clique em “Analisar sprint” para simular a composição do contexto e a resposta do agente.' : 'Click “Analyze sprint” to simulate context composition and the agent response.') +
          '</p><ul id="report-analysis-list"></ul></div>') +
      '</div>';

    document.querySelectorAll('[data-report-action]').forEach(function (button) {
      button.addEventListener('click', function () {
        var action = button.dataset.reportAction;
        if (action === 'csv') {
          downloadCsv();
          return;
        }
        if (action === 'ai') {
          var title = document.getElementById('report-analysis-title');
          var text = document.getElementById('report-analysis-text');
          var list = document.getElementById('report-analysis-list');
          title.textContent = pt ? 'Analisando contexto...' : 'Analyzing context...';
          text.textContent = pt ? 'Normalizando métricas, riscos e itens prioritários.' : 'Normalizing metrics, risks, and priority items.';
          list.innerHTML = '';
          window.setTimeout(function () {
            title.textContent = pt ? 'Leitura consolidada da sprint' : 'Consolidated sprint reading';
            text.textContent = pt
              ? 'O principal risco está na concentração de itens em teste e na dependência recorrente. A recomendação é reduzir a fila ativa antes de aceitar novo escopo.'
              : 'The main risk is the concentration of items in testing and the recurring dependency. The recommendation is to reduce the active queue before accepting new scope.';
            list.innerHTML = '<li>' + (pt ? 'Confirmar responsável e prazo dos bloqueios.' : 'Confirm blocker owner and deadline.') + '</li><li>' + (pt ? 'Aplicar swarm nos itens em validação.' : 'Swarm on validation items.') + '</li><li>' + (pt ? 'Revisar carry-over antes do planejamento seguinte.' : 'Review carry-over before the next planning.') + '</li>';
          }, 650);
          return;
        }
        button.disabled = true;
        var previous = button.textContent;
        button.textContent = pt ? 'Gerando...' : 'Generating...';
        window.setTimeout(function () {
          button.disabled = false;
          button.textContent = action === 'pdf' ? (pt ? 'PDF preparado' : 'PDF ready') : (pt ? 'Resumo preparado' : 'Summary ready');
          window.setTimeout(function () { button.textContent = previous; }, 1200);
        }, 500);
      });
    });
  }

  function renderSystem() {
    var pt = language() === 'pt';
    var services = [
      ['Azure adapter', 'p95 184 ms', 'error 0.8%', 'cache 42/8', 'closed'],
      ['Analytics service', 'p95 96 ms', 'error 0.2%', 'cache 71/5', 'closed'],
      ['Report service', 'p95 241 ms', 'error 1.4%', 'cache 12/4', 'closed'],
      ['MCP gateway', 'p95 318 ms', 'error 2.1%', 'cache 8/3', 'attention']
    ];
    var serviceRows = services.map(function (service) {
      return '<article class="service-row"><div><strong>' + service[0] + '</strong><p>' + service[1] + ' · ' + service[2] + '</p></div><div class="service-metrics"><span>' + service[3] + '</span><span class="' + (service[4] === 'closed' ? 'pass' : 'warn') + '">' + (service[4] === 'closed' ? 'Circuit closed' : 'Monitor') + '</span></div></article>';
    }).join('');

    document.getElementById('dashboard-view-content').innerHTML =
      viewHead(
        pt ? 'Status do Sistema' : 'System Status',
        pt
          ? 'Eu criei esta tela para diferenciar rapidamente problema de dado, problema de integração e indisponibilidade da própria aplicação. Ela reunia API, banco, configuração, latência, cache, taxa de erro e circuit breaker.'
          : 'I created this screen to quickly separate data issues, integration issues, and application availability. It combined API, database, configuration, latency, cache, error rate, and circuit breaker signals.',
        '<button class="btn btn-primary" id="run-health-check" type="button">' + (pt ? 'Testar saúde' : 'Run health check') + '</button>'
      ) +
      '<div class="system-grid">' +
        summaryCard(pt ? 'Status geral' : 'Overall status', 'OK', pt ? 'serviços operacionais' : 'services operational') +
        summaryCard(pt ? 'Versão' : 'Version', '2.4.0', 'demo-metrics') +
        summaryCard(pt ? 'Uptime' : 'Uptime', '18h 42m', pt ? 'processo atual' : 'current process') +
        summaryCard(pt ? 'Banco' : 'Database', '23 ms', pt ? 'latência média' : 'average latency') +
      '</div>' +
      '<div class="system-service-grid">' +
        panel(pt ? 'Serviços e integrações' : 'Services and integrations', 'p95 · error rate · cache · circuit breaker', '<div class="service-list">' + serviceRows + '</div>') +
        panel(pt ? 'Health check' : 'Health check', pt ? 'diagnóstico executável' : 'executable diagnosis', '<div id="health-log" class="health-log"><span>$ ' + (pt ? 'aguardando verificação' : 'waiting for check') + '</span></div>') +
      '</div>';

    var health = document.getElementById('run-health-check');
    if (health) health.addEventListener('click', function () {
      health.disabled = true;
      var log = document.getElementById('health-log');
      var lines = pt
        ? ['[api] rota /system/health respondeu 200', '[database] conexão validada em 21 ms', '[azure] circuit breaker fechado', '[cache] leitura e escrita operacionais', '[reports] serviço disponível', '[result] ambiente saudável']
        : ['[api] /system/health returned 200', '[database] connection validated in 21 ms', '[azure] circuit breaker closed', '[cache] read and write operational', '[reports] service available', '[result] environment healthy'];
      log.innerHTML = '';
      lines.forEach(function (line, index) {
        window.setTimeout(function () {
          log.insertAdjacentHTML('beforeend', '<span class="' + (index === lines.length - 1 ? 'pass' : '') + '">' + escapeHtml(line) + '</span>');
          if (index === lines.length - 1) health.disabled = false;
        }, index * 180);
      });
    });
  }

  function renderCurrentView() {
    var overview = document.getElementById('dashboard-overview');
    var content = document.getElementById('dashboard-view-content');
    if (!overview || !content) return;

    var isOverview = state.view === 'overview';
    overview.hidden = !isOverview;
    content.hidden = isOverview;

    document.querySelectorAll('[data-dashboard-view]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.dashboardView === state.view);
    });
    var select = document.getElementById('dashboard-view-select');
    if (select) select.value = state.view;

    if (isOverview) return;
    if (state.view === 'daily') renderDaily();
    if (state.view === 'timeline') renderTimeline();
    if (state.view === 'quality') renderQuality();
    if (state.view === 'cockpit') renderCockpit();
    if (state.view === 'reports') renderReports();
    if (state.view === 'system') renderSystem();
  }

  function setView(view) {
    state.view = view;
    renderCurrentView();
  }

  function bind() {
    document.querySelectorAll('[data-dashboard-view]').forEach(function (button) {
      button.addEventListener('click', function () {
        setView(button.dataset.dashboardView);
      });
    });

    var viewSelect = document.getElementById('dashboard-view-select');
    if (viewSelect) viewSelect.addEventListener('change', function () { setView(viewSelect.value); });

    ['team-select', 'sprint-select'].forEach(function (id) {
      var element = document.getElementById(id);
      if (element) element.addEventListener('change', function () {
        if (state.view !== 'overview') renderCurrentView();
      });
    });
  }

  window.addEventListener('portfolio-case-language', renderCurrentView);
  document.addEventListener('DOMContentLoaded', function () {
    bind();
    renderCurrentView();
  });
})();