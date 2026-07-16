(function () {
  'use strict';

  var portfolioCase = window.PortfolioCase;
  if (!portfolioCase || !portfolioCase.i18n) return;

  Object.assign(portfolioCase.i18n.pt, {
    projectCase: 'projeto realizado',
    navInsights: 'Decisões',
    heroKicker: 'experiência com qualidade guiada por métricas',
    heroLead: 'Eu desenvolvi este dashboard porque as informações da sprint estavam espalhadas e a liderança precisava montar o cenário manualmente. O objetivo foi transformar histórico de PBIs, bugs e mudanças de estado em sinais claros para acompanhar fluxo, qualidade, risco e entrega.',
    disclaimer: 'A experiência apresentada é real. Para preservar a confidencialidade, times, sprints, PBIs, métricas, pessoas e resultados foram substituídos por dados fictícios. Nenhum ambiente real é consultado.',
    metricDesktop: 'aplicação que disponibilizei em web e desktop',
    metricSource: 'consultas e histórico que normalizei',
    metricViews: 'visões que construí para decisões diferentes',
    metricExports: 'formas que usei para comunicar evidências',
    problemKicker: 'problema que eu precisava resolver',
    problemTitle: 'Como transformei dados dispersos em sinais de decisão',
    problemLead: 'Antes do dashboard, parte da análise dependia de abrir consultas, planilhas e itens individualmente. Eu organizei o produto para que liderança, produto, desenvolvimento e QA enxergassem o mesmo contexto de sprint e pudessem chegar da métrica até o PBI que explicava o resultado.',
    decisionOneText: 'Eu mantive time, sprint e filtros como contexto único para evitar comparações feitas com recortes diferentes.',
    decisionTwoText: 'Eu reconstruí a passagem do PBI pelas fases para enxergar aging, espera, carry-over e concentração de trabalho perto do fim da sprint.',
    decisionThreeText: 'Eu combinei bugs, severidade, reabertura, leakage, pass rate e governança em indicadores que ajudavam a priorizar investigação.',
    decisionFourText: 'Eu apresentei o mesmo dado por perspectivas diferentes, porque Produto, Agilidade, Engenharia e QA precisavam tomar decisões distintas.',
    architectureKicker: 'arquitetura que implementei',
    architectureTitle: 'Como conectei as camadas do produto',
    architectureLead: 'A arquitetura abaixo reproduz as principais decisões do projeto que desenvolvi. Os nomes públicos são genéricos, mas a relação entre interface, desktop, API, Azure DevOps, banco, relatórios e análises segue o funcionamento real.',
    dashboardKicker: 'experiência interativa',
    dashboardLead: 'Troque o time e a sprint, sincronize os dados fictícios e navegue pelas métricas. A interação reproduz a lógica que usei para sair de um indicador agregado e chegar ao item, risco ou ação recomendada.',
    sync: 'Sincronizar dados fictícios',
    insightsKicker: 'valor que entreguei',
    insightsTitle: 'Decisões que o dashboard passou a facilitar',
    insightsLead: 'Na experiência real, a métrica só tinha valor quando ajudava alguém a agir. Por isso eu conectei cada indicador ao contexto, à provável causa e ao próximo passo que precisava ser discutido com o time.',
    insightOneText: 'Eu usava aging, WIP e carry-over para identificar onde o fluxo estava parando antes que o problema aparecesse apenas no fim da sprint.',
    insightTwoText: 'Severidade, leakage e reabertura ajudavam a direcionar investigação para os pontos com maior impacto e recorrência.',
    insightThreeText: 'As perspectivas por persona traduziam o mesmo conjunto de dados para perguntas diferentes de Produto, Agilidade, Engenharia e QA.',
    insightFourText: 'Relatórios e exportações preservavam o recorte analisado e facilitavam o acompanhamento das decisões depois da reunião.',
    recommendation: 'Como eu usava este sinal',
    footer: 'Dashboard que desenvolvi com React, Electron, Node, WIQL e métricas de entrega. Os dados exibidos são fictícios.'
  });

  Object.assign(portfolioCase.i18n.en, {
    projectCase: 'completed project',
    navInsights: 'Decisions',
    heroKicker: 'metrics-driven quality experience',
    heroLead: 'I built this dashboard because sprint information was scattered and leadership had to assemble the picture manually. My goal was to turn PBI history, bugs, and state changes into clear signals for flow, quality, risk, and delivery.',
    disclaimer: 'The experience described here is real. To protect confidentiality, teams, sprints, PBIs, metrics, people, and results were replaced with fictional data. No real environment is queried.',
    metricDesktop: 'the application I delivered for web and desktop',
    metricSource: 'queries and history I normalized',
    metricViews: 'views I built for different decisions',
    metricExports: 'ways I used to communicate evidence',
    problemKicker: 'the problem I needed to solve',
    problemTitle: 'How I turned scattered data into decision signals',
    problemLead: 'Before the dashboard, part of the analysis required opening queries, spreadsheets, and individual items. I organized the product so leadership, product, development, and QA could see the same sprint context and move from a metric to the PBI that explained it.',
    decisionOneText: 'I kept team, sprint, and filters as a single context to avoid comparisons built from different data slices.',
    decisionTwoText: 'I reconstructed the PBI journey through each stage to expose aging, waiting time, carry-over, and work concentrated near sprint end.',
    decisionThreeText: 'I combined bugs, severity, reopen, leakage, pass rate, and governance into indicators that supported prioritization.',
    decisionFourText: 'I presented the same data through different perspectives because Product, Agility, Engineering, and QA needed to make different decisions.',
    architectureKicker: 'the architecture I implemented',
    architectureTitle: 'How I connected the product layers',
    architectureLead: 'The architecture below reproduces the main decisions from the project I built. Public names are generic, but the relationship between the interface, desktop shell, API, Azure DevOps, database, reports, and analysis follows the real design.',
    dashboardKicker: 'interactive experience',
    dashboardLead: 'Change the team and sprint, synchronize fictional data, and navigate the metrics. The interaction reproduces the logic I used to move from an aggregate indicator to the item, risk, or recommended action.',
    sync: 'Sync fictional data',
    insightsKicker: 'value I delivered',
    insightsTitle: 'Decisions the dashboard made easier',
    insightsLead: 'In the real experience, a metric was useful only when it helped someone act. I connected each indicator to its context, likely cause, and the next step that needed discussion with the team.',
    insightOneText: 'I used aging, WIP, and carry-over to identify where flow was stopping before the issue appeared only at sprint end.',
    insightTwoText: 'Severity, leakage, and reopen helped direct investigation toward the highest-impact and recurring problems.',
    insightThreeText: 'Persona perspectives translated the same dataset into different questions for Product, Agility, Engineering, and QA.',
    insightFourText: 'Reports and exports preserved the analyzed slice and made it easier to follow up on decisions after the meeting.',
    recommendation: 'How I used this signal',
    footer: 'A dashboard I built with React, Electron, Node, WIQL, and delivery metrics. Displayed data is fictional.'
  });

  var details = {
    pt: {
      quality: 'Eu usava este indicador como ponto de entrada. Quando ele caía, abria pass rate, leakage, reabertura e severidade para localizar o sinal que explicava a piora.',
      flow: 'Eu comparava aging, WIP e concentração por fase para entender se o problema era volume, espera ou handoff.',
      risk: 'Eu usava o risco agregado para ordenar a conversa, mas sempre descia até os itens e responsáveis antes de propor qualquer ação.',
      passRate: 'Eu separava as falhas por severidade, recorrência e regra afetada para não tratar todos os cenários com o mesmo peso.',
      defects: 'Eu abria os PBIs com maior concentração de defeitos e revisava refinamento, critérios e mudanças de escopo.',
      reopen: 'Eu tratava reabertura como sinal de causa não eliminada, validação insuficiente ou entendimento incompleto da regra.',
      leakage: 'Eu investigava em qual etapa o defeito deveria ter sido encontrado e ajustava o gate anterior, não apenas o teste final.',
      cycle: 'Eu quebrava o tempo por fase para diferenciar trabalho ativo de espera entre handoffs.',
      carry: 'Eu analisava itens carregados repetidamente para identificar escopo grande, dependência, falta de decisão ou entrada tardia em validação.',
      bugs: 'Eu priorizava por severidade, aging, item afetado e risco de entrega, não apenas pela quantidade aberta.',
      throughput: 'Eu comparava o volume concluído com o WIP e o compromisso da sprint para evitar interpretar produtividade sem contexto.'
    },
    en: {
      quality: 'I used this indicator as an entry point. When it dropped, I opened pass rate, leakage, reopen, and severity to locate the signal behind the decline.',
      flow: 'I compared aging, WIP, and stage concentration to understand whether the issue was volume, waiting time, or handoff.',
      risk: 'I used aggregate risk to order the conversation, but always drilled down to items and owners before proposing an action.',
      passRate: 'I separated failures by severity, recurrence, and affected rule instead of treating every scenario with the same weight.',
      defects: 'I opened the PBIs with the highest defect concentration and reviewed refinement, criteria, and scope changes.',
      reopen: 'I treated reopen as a signal of an unresolved cause, insufficient validation, or incomplete rule understanding.',
      leakage: 'I investigated which earlier stage should have detected the defect and strengthened that gate instead of only the final test.',
      cycle: 'I broke the time down by stage to separate active work from waiting between handoffs.',
      carry: 'I analyzed repeatedly carried items to identify oversized scope, dependency, missing decisions, or late validation.',
      bugs: 'I prioritized by severity, aging, affected item, and delivery risk, not only by the open count.',
      throughput: 'I compared completed volume with WIP and sprint commitment to avoid interpreting productivity without context.'
    }
  };

  function language() {
    try {
      return localStorage.getItem('cq-lang') === 'en' ? 'en' : 'pt';
    } catch (error) {
      return document.documentElement.lang === 'en' ? 'en' : 'pt';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
      var metric = event.target.closest('[data-metric]');
      if (metric) {
        window.setTimeout(function () {
          var text = document.getElementById('detail-text');
          var copy = details[language()][metric.dataset.metric];
          if (text && copy) text.textContent = copy;
        }, 0);
      }

      var risk = event.target.closest('[data-risk-index]');
      if (risk) {
        window.setTimeout(function () {
          var text = document.getElementById('detail-text');
          if (!text) return;
          text.textContent += language() === 'pt'
            ? ' Na rotina, eu abria os itens relacionados e confirmava responsável, prazo, dependência e ação antes de levar o sinal para decisão.'
            : ' In practice, I opened the related items and confirmed owner, deadline, dependency, and action before taking the signal into a decision.';
        }, 0);
      }
    });
  });
})();
