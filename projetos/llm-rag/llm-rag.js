(function () {
  'use strict';

  window.PortfolioCase = {
    i18n: {
      pt: {
        projectCase: 'projeto realizado',
        navArchitecture: 'Arquitetura',
        navLab: 'Laboratório RAG',
        navKnowledge: 'Conhecimento',
        backPortfolio: 'Voltar aos projetos',
        heroKicker: 'experiência com IA local + RAG',
        heroLead: 'Eu desenvolvi este projeto para transformar consultas técnicas e operacionais em uma base de conhecimento local, revisável e reutilizável. A solução combinava Gemma 4 e Qwen no Ollama, duas FastAPIs especializadas e arquivos Markdown aprovados por revisão humana.',
        exploreLab: 'Abrir laboratório',
        exploreArchitecture: 'Explorar arquitetura',
        disclaimer: 'A experiência apresentada é real. Para preservar a confidencialidade, nomes, dados, endpoints, documentos e respostas foram substituídos por exemplos fictícios. Nenhum serviço real é consultado.',
        metricModels: 'modelos locais que usei de forma complementar',
        metricApis: 'integrações que separei por domínio',
        metricGate: 'aprovação humana antes da memória',
        metricStorage: 'conhecimento legível e auditável',
        problemKicker: 'problema que encontrei',
        problemTitle: 'Como transformei consultas recorrentes em conhecimento reutilizável',
        problemLead: 'Na prática, eu precisava consultar fontes diferentes com rapidez sem transformar a LLM em uma caixa-preta. Também precisava impedir que uma análise ainda não revisada fosse reutilizada como verdade. Por isso separei acesso aos dados, raciocínio do modelo, memória local e aprovação humana.',
        decisionOneTitle: 'Modelos locais',
        decisionOneText: 'Escolhi executar Gemma 4 e Qwen no Ollama para manter a inferência no ambiente local e comparar comportamentos entre um modelo mais geral e outro mais estruturado.',
        decisionTwoTitle: 'APIs por domínio',
        decisionTwoText: 'Criei uma FastAPI para artefatos e consultas WIQL/REST e outra para consultas GraphQL de catálogo. Essa separação evitou misturar regras, contratos e permissões de fontes diferentes.',
        decisionThreeTitle: 'RAG em Markdown',
        decisionThreeText: 'Optei por arquivos Markdown porque eu conseguia abrir, revisar, corrigir, versionar e pesquisar cada análise sem depender da interface da aplicação.',
        decisionFourTitle: 'Revisão humana',
        decisionFourText: 'Incluí um fluxo de rascunho e aprovação para que somente análises revisadas entrassem na memória usada pelas respostas seguintes.',
        architectureKicker: 'raciocínio de arquitetura',
        architectureTitle: 'Como organizei o fluxo de confiança',
        architectureLead: 'O mapa abaixo reproduz a lógica que apliquei no projeto. Cada componente foi separado para deixar claro de onde o dado veio, como foi transformado e em qual ponto a revisão humana era obrigatória.',
        labKicker: 'experiência interativa',
        labTitle: 'Laboratório de consulta RAG',
        labLead: 'Use o simulador para acompanhar a mesma sequência que eu implementei: receber a pergunta, identificar o domínio, consultar a fonte, recuperar notas aprovadas, gerar a análise e registrar um novo rascunho para revisão.',
        domain: 'Domínio',
        workDomain: 'Artefatos de trabalho',
        catalogDomain: 'Catálogo de produtos',
        model: 'Modelo',
        question: 'Pergunta',
        run: 'Executar consulta',
        reset: 'Reiniciar',
        stageIdle: 'Aguardando consulta',
        stageRunning: 'Processando',
        stageDone: 'Resposta concluída',
        activity: 'Fluxo que implementei',
        finalAnswer: 'Resposta consolidada',
        retrieved: 'Notas aprovadas recuperadas',
        knowledgeKicker: 'memória que construí',
        knowledgeTitle: 'Base de conhecimento local',
        knowledgeLead: 'Durante o projeto, cada análise relevante era registrada em Markdown com fonte, contexto e status de revisão. Nesta vitrine, os arquivos são fictícios, mas o fluxo de rascunho, revisão e aprovação reproduz o funcionamento que utilizei.',
        all: 'Todas',
        approved: 'Aprovadas',
        drafts: 'Rascunhos',
        approve: 'Aprovar nota',
        approvedLabel: 'Aprovada',
        draftLabel: 'Em revisão',
        updated: 'Atualizado agora',
        noNotes: 'Nenhuma nota neste filtro.',
        valueKicker: 'valor que entreguei',
        valueTitle: 'O que essa arquitetura resolveu na prática',
        valueLead: 'Essa abordagem me permitiu reduzir consultas repetidas, reaproveitar análises já validadas e manter uma trilha clara entre o dado original, a interpretação da LLM e a decisão humana.',
        valueOne: 'Consulta mais rápida',
        valueOneText: 'Passei a combinar dados atuais com análises que já tinham sido revisadas, evitando recomeçar a investigação do zero.',
        valueTwo: 'Memória explicável',
        valueTwoText: 'Cada conhecimento podia ser aberto, corrigido e auditado em um arquivo simples, sem ficar escondido dentro do modelo.',
        valueThree: 'Domínios independentes',
        valueThreeText: 'As integrações evoluíam separadamente, o que facilitava manutenção, controle de acesso e investigação de falhas.',
        valueFour: 'Resposta contextual',
        valueFourText: 'A resposta passou a considerar a fonte atual, o histórico aprovado e instruções específicas para cada tipo de consulta.',
        footer: 'Projeto que desenvolvi com Ollama, FastAPI, RAG em Markdown e revisão humana. Os dados exibidos são fictícios.'
      },
      en: {
        projectCase: 'completed project',
        navArchitecture: 'Architecture',
        navLab: 'RAG Lab',
        navKnowledge: 'Knowledge',
        backPortfolio: 'Back to projects',
        heroKicker: 'local AI + RAG experience',
        heroLead: 'I built this project to turn technical and operational queries into a local, reviewable, and reusable knowledge base. The solution combined Gemma 4 and Qwen through Ollama, two specialized FastAPI services, and human-approved Markdown files.',
        exploreLab: 'Open laboratory',
        exploreArchitecture: 'Explore architecture',
        disclaimer: 'The experience described here is real. To protect confidentiality, names, data, endpoints, documents, and answers were replaced with fictional examples. No real service is queried.',
        metricModels: 'local models used for complementary strengths',
        metricApis: 'integrations separated by domain',
        metricGate: 'human approval before memory',
        metricStorage: 'readable and auditable knowledge',
        problemKicker: 'the problem I faced',
        problemTitle: 'How I turned recurring queries into reusable knowledge',
        problemLead: 'In practice, I needed to query different sources quickly without turning the LLM into a black box. I also needed to prevent an unreviewed analysis from being reused as truth. That led me to separate data access, model reasoning, local memory, and human approval.',
        decisionOneTitle: 'Local models',
        decisionOneText: 'I ran Gemma 4 and Qwen through Ollama to keep inference local and compare a more general model with one that produced more structured reasoning.',
        decisionTwoTitle: 'Domain APIs',
        decisionTwoText: 'I created one FastAPI for work artifacts and WIQL/REST queries and another for catalog GraphQL queries. This kept rules, contracts, and permissions from different sources isolated.',
        decisionThreeTitle: 'Markdown RAG',
        decisionThreeText: 'I chose Markdown because every analysis could be opened, reviewed, corrected, versioned, and searched outside the application.',
        decisionFourTitle: 'Human review',
        decisionFourText: 'I added a draft-and-approval flow so only reviewed analyses could become part of the memory used by future answers.',
        architectureKicker: 'architecture reasoning',
        architectureTitle: 'How I organized the trust flow',
        architectureLead: 'The map below reproduces the reasoning I applied. Each component was separated to make the source, transformation, and mandatory human-review point explicit.',
        labKicker: 'interactive experience',
        labTitle: 'RAG query laboratory',
        labLead: 'Use the simulator to follow the same sequence I implemented: receive the question, identify the domain, query the source, retrieve approved notes, generate the analysis, and save a new draft for review.',
        domain: 'Domain',
        workDomain: 'Work artifacts',
        catalogDomain: 'Product catalog',
        model: 'Model',
        question: 'Question',
        run: 'Run query',
        reset: 'Reset',
        stageIdle: 'Waiting for query',
        stageRunning: 'Processing',
        stageDone: 'Answer completed',
        activity: 'Flow I implemented',
        finalAnswer: 'Consolidated answer',
        retrieved: 'Retrieved approved notes',
        knowledgeKicker: 'the memory I built',
        knowledgeTitle: 'Local knowledge base',
        knowledgeLead: 'During the project, every relevant analysis was stored in Markdown with its source, context, and review status. The files shown here are fictional, but the draft, review, and approval flow reproduces the process I used.',
        all: 'All',
        approved: 'Approved',
        drafts: 'Drafts',
        approve: 'Approve note',
        approvedLabel: 'Approved',
        draftLabel: 'In review',
        updated: 'Updated now',
        noNotes: 'No notes in this filter.',
        valueKicker: 'value I delivered',
        valueTitle: 'What this architecture solved in practice',
        valueLead: 'This approach reduced repeated queries, reused validated analysis, and maintained a clear trail between source data, LLM interpretation, and human decision.',
        valueOne: 'Faster queries',
        valueOneText: 'I could combine current data with previously reviewed analysis instead of restarting the investigation from zero.',
        valueTwo: 'Explainable memory',
        valueTwoText: 'Every piece of knowledge could be opened, corrected, and audited in a simple file instead of remaining hidden inside the model.',
        valueThree: 'Independent domains',
        valueThreeText: 'The integrations could evolve separately, which simplified maintenance, access control, and failure analysis.',
        valueFour: 'Contextual answer',
        valueFourText: 'Answers could consider the current source, approved history, and instructions specific to each type of query.',
        footer: 'A project I built with Ollama, FastAPI, Markdown RAG, and human review. Displayed data is fictional.'
      }
    }
  };

  var domains = {
    work: {
      label: { pt: 'Artefatos de trabalho', en: 'Work artifacts' },
      source: 'WIQL + REST',
      api: 'work-items-api',
      questions: {
        pt: [
          'Quais itens apresentam maior risco para o encerramento da sprint?',
          'Quais impedimentos voltaram a ocorrer nas últimas sprints?',
          'Resuma os principais sinais de qualidade desta sprint.'
        ],
        en: [
          'Which items present the highest sprint completion risk?',
          'Which blockers have recurred in recent sprints?',
          'Summarize the main quality signals for this sprint.'
        ]
      },
      answer: {
        pt: 'A simulação encontrou três sinais prioritários: dois itens com aging acima do baseline, um bloqueio recorrente ligado a dependência externa e concentração de validações nos últimos dias. A recomendação é revisar ownership, antecipar critérios de aceite e limitar novo trabalho até reduzir o WIP atual.',
        en: 'The simulation found three priority signals: two items with aging above baseline, one recurring blocker linked to an external dependency, and validation work concentrated in the final days. The recommendation is to review ownership, anticipate acceptance criteria, and limit new work until current WIP is reduced.'
      },
      snippets: ['risk-aging.md', 'blocker-patterns.md', 'sprint-review-07.md']
    },
    catalog: {
      label: { pt: 'Catálogo de produtos', en: 'Product catalog' },
      source: 'GraphQL',
      api: 'catalog-api',
      questions: {
        pt: [
          'Compare disponibilidade e faixa de preço de três produtos equivalentes.',
          'Quais itens possuem estoque baixo e alternativa disponível?',
          'Resuma as diferenças entre dois laboratórios fictícios.'
        ],
        en: [
          'Compare availability and price range for three equivalent products.',
          'Which items have low stock and an available alternative?',
          'Summarize the differences between two fictional laboratories.'
        ]
      },
      answer: {
        pt: 'A consulta simulada identificou um item com estoque crítico, duas alternativas ativas e diferença de 12% na faixa de preço. A resposta prioriza disponibilidade, equivalência de descrição e dados aprovados nas notas locais, sem substituir validação comercial ou regulatória.',
        en: 'The simulated query identified one item with critical stock, two active alternatives, and a 12% price-range difference. The answer prioritizes availability, description equivalence, and approved local notes without replacing commercial or regulatory validation.'
      },
      snippets: ['sample-product-a.md', 'stock-alternatives.md', 'supplier-comparison.md']
    }
  };

  var notes = [
    { id: 'risk-aging.md', domain: 'work', status: 'approved', title: { pt: 'Padrão de aging e risco', en: 'Aging and risk pattern' }, summary: { pt: 'Critérios revisados para destacar itens sem avanço por vários dias.', en: 'Reviewed criteria to highlight items without progress for several days.' }, tags: ['WIQL', 'Aging', 'Risk'] },
    { id: 'blocker-patterns.md', domain: 'work', status: 'approved', title: { pt: 'Bloqueios recorrentes', en: 'Recurring blockers' }, summary: { pt: 'Mapa de causas frequentes e perguntas recomendadas para a daily.', en: 'Map of frequent causes and recommended daily questions.' }, tags: ['Blocker', 'Sprint'] },
    { id: 'sprint-review-07.md', domain: 'work', status: 'draft', title: { pt: 'Análise da sprint de demonstração', en: 'Demonstration sprint analysis' }, summary: { pt: 'Rascunho gerado pela LLM aguardando revisão de premissas.', en: 'LLM-generated draft waiting for premise review.' }, tags: ['Review', 'Draft'] },
    { id: 'sample-product-a.md', domain: 'catalog', status: 'approved', title: { pt: 'Produto fictício A', en: 'Fictional product A' }, summary: { pt: 'Descrição normalizada, faixa de preço e condições de disponibilidade.', en: 'Normalized description, price range, and availability conditions.' }, tags: ['Product', 'GraphQL'] },
    { id: 'stock-alternatives.md', domain: 'catalog', status: 'approved', title: { pt: 'Alternativas para estoque baixo', en: 'Alternatives for low stock' }, summary: { pt: 'Regras revisadas para ordenar alternativas e explicitar limitações.', en: 'Reviewed rules to rank alternatives and state limitations.' }, tags: ['Stock', 'Alternatives'] },
    { id: 'supplier-comparison.md', domain: 'catalog', status: 'draft', title: { pt: 'Comparativo de fornecedores fictícios', en: 'Fictional supplier comparison' }, summary: { pt: 'Rascunho sem aprovação, excluído da recuperação RAG.', en: 'Unapproved draft excluded from RAG retrieval.' }, tags: ['Supplier', 'Draft'] }
  ];

  var state = { domain: 'work', model: 'gemma', noteFilter: 'all', running: false, timers: [] };

  function c() { return window.CaseCommon; }
  function lang() { return c().getLang(); }
  function loc(value) { return c().localize(value); }
  function esc(value) { return c().escapeHtml(value); }
  function clearTimers() {
    state.timers.forEach(clearTimeout);
    state.timers = [];
    state.running = false;
  }

  function renderQuestions() {
    var select = c().$('#rag-question');
    select.innerHTML = domains[state.domain].questions[lang()].map(function (question, index) {
      return '<option value="' + index + '">' + esc(question) + '</option>';
    }).join('');
  }

  function renderDomain() {
    c().$$('[data-domain]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.domain === state.domain);
    });
    c().$('#source-type').textContent = domains[state.domain].source;
    c().$('#api-name').textContent = domains[state.domain].api;
    renderQuestions();
    renderNotes();
    resetRun();
  }

  function renderNotes() {
    var visible = notes.filter(function (note) {
      return note.domain === state.domain && (state.noteFilter === 'all' || note.status === state.noteFilter);
    });
    c().$('#note-count').textContent = visible.length + ' / ' + notes.filter(function (note) {
      return note.domain === state.domain;
    }).length;
    c().$('#knowledge-list').innerHTML = visible.length ? visible.map(function (note) {
      var status = note.status === 'approved' ? 'success' : 'warning';
      var label = note.status === 'approved' ? c().text('approvedLabel') : c().text('draftLabel');
      var action = note.status === 'draft'
        ? '<button class="approve-note" data-note="' + esc(note.id) + '">' + esc(c().text('approve')) + '</button>'
        : '';
      return '<article class="knowledge-card">' +
        '<div class="knowledge-file"><span>MD</span><strong>' + esc(note.id) + '</strong></div>' +
        '<div class="knowledge-copy"><div class="knowledge-title"><h3>' + esc(loc(note.title)) + '</h3>' +
        '<span class="status-pill ' + status + '"><span class="status-dot ' + status + '"></span>' + esc(label) + '</span></div>' +
        '<p>' + esc(loc(note.summary)) + '</p><div class="knowledge-tags">' +
        note.tags.map(function (tag) { return '<span>' + esc(tag) + '</span>'; }).join('') +
        '</div></div>' + action + '</article>';
    }).join('') : '<div class="empty-state">' + esc(c().text('noNotes')) + '</div>';

    c().$$('.approve-note').forEach(function (button) {
      button.addEventListener('click', function () {
        var note = notes.find(function (item) { return item.id === button.dataset.note; });
        if (note) {
          note.status = 'approved';
          renderNotes();
          updateMemoryStats();
        }
      });
    });
  }

  function updateMemoryStats() {
    var domainNotes = notes.filter(function (note) { return note.domain === state.domain; });
    c().$('#approved-count').textContent = domainNotes.filter(function (note) { return note.status === 'approved'; }).length;
    c().$('#draft-count').textContent = domainNotes.filter(function (note) { return note.status === 'draft'; }).length;
  }

  function resetRun() {
    clearTimers();
    c().$('#run-rag').disabled = false;
    c().$('#rag-state').textContent = c().text('stageIdle');
    c().$('#rag-log').innerHTML = '<span class="log-muted">$ ' + esc(c().text('stageIdle')) + '</span>';
    c().$('#rag-answer').textContent = '—';
    c().$('#retrieved-notes').innerHTML = '';
    c().$$('.pipeline-node').forEach(function (node) {
      node.classList.remove('active', 'done');
    });
  }

  function run() {
    if (state.running) return;
    resetRun();
    state.running = true;
    c().$('#run-rag').disabled = true;
    c().$('#rag-state').textContent = c().text('stageRunning');

    var domain = domains[state.domain];
    var selectedQuestion = domain.questions[lang()][Number(c().$('#rag-question').value) || 0];
    var stages = [
      { id: 'prompt', log: '[prompt] ' + selectedQuestion },
      { id: 'router', log: '[router] domain=' + state.domain + ' model=' + state.model },
      { id: 'api', log: '[fastapi] ' + domain.api + ' -> ' + domain.source + ' mock query' },
      { id: 'source', log: '[source] 6 records normalized from api.example.test' },
      { id: 'rag', log: '[rag] approved notes: ' + notes.filter(function (note) { return note.domain === state.domain && note.status === 'approved'; }).length },
      { id: 'model', log: '[ollama] ' + (state.model === 'gemma' ? 'Gemma 4' : 'Qwen') + ' composed answer' },
      { id: 'review', log: '[gate] new note saved as draft for human review' }
    ];

    c().$('#rag-log').innerHTML = '';
    var delay = c().reducedMotion ? 70 : 430;

    stages.forEach(function (stage, index) {
      var timer = setTimeout(function () {
        var node = c().$('.pipeline-node[data-stage="' + stage.id + '"]');
        if (node) node.classList.add('active');

        if (index > 0) {
          var previous = c().$('.pipeline-node[data-stage="' + stages[index - 1].id + '"]');
          if (previous) {
            previous.classList.remove('active');
            previous.classList.add('done');
          }
        }

        var line = document.createElement('span');
        line.className = 'rag-log-line';
        line.textContent = stage.log;
        c().$('#rag-log').appendChild(line);

        if (index === stages.length - 1) {
          node.classList.remove('active');
          node.classList.add('done');
          state.running = false;
          c().$('#run-rag').disabled = false;
          c().$('#rag-state').textContent = c().text('stageDone');
          c().$('#rag-answer').textContent = loc(domain.answer) + (state.model === 'qwen'
            ? (lang() === 'pt' ? ' O modelo selecionado priorizou uma resposta mais estruturada.' : ' The selected model prioritized a more structured answer.')
            : '');
          c().$('#retrieved-notes').innerHTML = domain.snippets.filter(function (id) {
            var note = notes.find(function (item) { return item.id === id; });
            return note && note.status === 'approved';
          }).map(function (id) {
            return '<span>' + esc(id) + '</span>';
          }).join('');
        }
      }, index * delay);
      state.timers.push(timer);
    });
  }

  function renderArchitectureDetail(component) {
    var data = {
      ollama: {
        title: 'Ollama',
        text: {
          pt: 'Escolhi o Ollama para manter Gemma 4 e Qwen executando localmente. Assim eu controlava onde a inferência acontecia e conseguia comparar os modelos sem enviar o contexto para um provedor externo.',
          en: 'I chose Ollama to keep Gemma 4 and Qwen running locally. This gave me control over where inference happened and let me compare the models without sending context to an external provider.'
        }
      },
      fastapi: {
        title: 'FastAPI',
        text: {
          pt: 'Criei duas APIs com contratos separados: uma para artefatos e WIQL/REST e outra para o catálogo GraphQL. Isso facilitou validação, manutenção e controle de acesso.',
          en: 'I created two APIs with separate contracts: one for work artifacts and WIQL/REST and another for the GraphQL catalog. This simplified validation, maintenance, and access control.'
        }
      },
      source: {
        title: { pt: 'Fontes operacionais', en: 'Operational sources' },
        text: {
          pt: 'Eu concentrei o acesso às fontes dentro das FastAPIs. A LLM não consultava diretamente WIQL, REST ou GraphQL; ela recebia dados já normalizados e limitados ao domínio da pergunta.',
          en: 'I kept source access inside the FastAPI services. The LLM did not query WIQL, REST, or GraphQL directly; it received normalized data limited to the question domain.'
        }
      },
      notes: {
        title: { pt: 'Vault Markdown', en: 'Markdown vault' },
        text: {
          pt: 'Registrei as análises em arquivos Markdown para manter fonte, contexto, data e status de aprovação visíveis. Isso tornou a memória fácil de revisar e corrigir.',
          en: 'I stored analyses in Markdown files so source, context, date, and approval status remained visible. This made the memory easy to review and correct.'
        }
      },
      gate: {
        title: { pt: 'Revisão humana', en: 'Human review' },
        text: {
          pt: 'Eu tratei a revisão humana como uma etapa obrigatória, não como detalhe opcional. Um rascunho só passava a influenciar respostas futuras depois de ser conferido e aprovado.',
          en: 'I treated human review as a mandatory step, not an optional detail. A draft could influence future answers only after it had been checked and approved.'
        }
      },
      retrieval: {
        title: 'RAG',
        text: {
          pt: 'Na recuperação, filtrei somente notas aprovadas e relacionadas ao domínio consultado. O objetivo era trazer contexto útil sem misturar rascunhos ou análises de outra fonte.',
          en: 'During retrieval, I filtered for approved notes related to the queried domain. The goal was to add useful context without mixing drafts or analyses from another source.'
        }
      }
    }[component];

    if (!data) return;
    c().$('#arch-detail-title').textContent = loc(data.title);
    c().$('#arch-detail-text').textContent = loc(data.text);
    c().$$('.arch-node').forEach(function (node) {
      node.classList.toggle('active', node.dataset.component === component);
    });
  }

  function bind() {
    c().$$('[data-domain]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.domain = button.dataset.domain;
        renderDomain();
        updateMemoryStats();
      });
    });
    c().$('#rag-model').addEventListener('change', function (event) {
      state.model = event.target.value;
      resetRun();
    });
    c().$('#run-rag').addEventListener('click', run);
    c().$('#reset-rag').addEventListener('click', resetRun);
    c().$$('[data-note-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.noteFilter = button.dataset.noteFilter;
        c().$$('[data-note-filter]').forEach(function (item) {
          item.classList.toggle('active', item === button);
        });
        renderNotes();
      });
    });
    c().$$('.arch-node').forEach(function (node) {
      node.addEventListener('click', function () {
        renderArchitectureDetail(node.dataset.component);
      });
    });
  }

  function renderAll() {
    renderQuestions();
    renderNotes();
    updateMemoryStats();
    resetRun();
    renderArchitectureDetail('ollama');
  }

  window.addEventListener('portfolio-case-language', renderAll);
  document.addEventListener('DOMContentLoaded', function () {
    bind();
    renderAll();
  });
})();
