(function () {
  'use strict';

  var portfolioCase = window.PortfolioCase;
  if (!portfolioCase || !portfolioCase.i18n) return;

  Object.assign(portfolioCase.i18n.pt, {
    navOrchestration: 'Orquestração',
    heroKicker: 'experiência com IA local + agentes + RAG',
    heroLead: 'Eu desenvolvi este projeto para permitir que usuários autorizados conversassem com agentes especializados e consultassem dados operacionais com segurança. A solução combinava OpenWebUI e OpenClaw como POCs de orquestração, Gemma 4 e Qwen no Ollama, ferramentas próprias em FastAPI e uma memória RAG em Markdown aprovada por revisão humana.',
    exploreOrchestration: 'Explorar agentes',
    metricOrchestrators: 'orquestradores avaliados no projeto',
    metricAgents: 'personas, skills e ferramentas próprias',
    metricAccess: 'acesso restrito por login e Tailscale',
    problemTitle: 'Como transformei consultas recorrentes em uma experiência segura de chat',
    problemLead: 'Eu não precisava apenas conectar uma LLM a endpoints. Era necessário criar uma forma controlada de uso, com login, agentes especializados, ferramentas limitadas por responsabilidade e memória revisada. A arquitetura foi separada para que cada resposta pudesse ser rastreada até o agente, a ferramenta, a fonte e o conhecimento aprovado usado na análise.',
    decisionOneTitle: 'Orquestração com login',
    decisionOneText: 'Usei OpenWebUI e OpenClaw como provas de conceito para oferecer chat, autenticação e gestão de agentes sem expor diretamente o Ollama ou as APIs.',
    decisionTwoTitle: 'Agentes especializados',
    decisionTwoText: 'Configurei Agente de Negócios, Agente Agilista e Agente de Inovações com personas, skills, conhecimentos e limites diferentes.',
    decisionThreeTitle: 'Ferramentas via FastAPI',
    decisionThreeText: 'As tools não acessavam as fontes diretamente pelo modelo. Elas chamavam contratos FastAPI controlados para consultar artefatos, métricas e catálogo.',
    decisionFourTitle: 'Rede privada e revisão',
    decisionFourText: 'Os containers acessavam o Ollama local pela rede Tailscale. O acesso era liberado apenas para usuários específicos e as novas notas dependiam de aprovação humana.',
    architectureLead: 'O mapa abaixo mostra a parte de dados e memória. A camada de orquestração apresentada na seção seguinte adicionava login, agentes, skills e ferramentas antes que uma solicitação chegasse às FastAPIs e aos modelos locais.',
    orchestrationKicker: 'orquestração e agentes',
    orchestrationTitle: 'A camada que transformou modelos e APIs em uma experiência utilizável',
    orchestrationLead: 'Eu hospedei OpenWebUI e OpenClaw em containers Docker como provas de conceito. Ambos se conectavam ao Ollama local através da rede privada do Tailscale e exigiam autenticação, permitindo liberar o ambiente apenas para pessoas específicas durante as validações.',
    accessUser: 'Usuário autorizado',
    accessLogin: 'Login do orquestrador',
    restrictedAccess: 'acesso restrito',
    privateNetwork: 'rede privada',
    pocEnvironment: 'ambiente de POC',
    orchestratorLabel: 'Orquestrador',
    agentReady: 'agente disponível',
    sendToAgent: 'Enviar ao agente',
    toolTrace: 'Rastreamento de ferramentas',
    valueThree: 'Acesso controlado',
    valueThreeText: 'Login, Docker e Tailscale permitiram validar a solução com um grupo restrito sem publicar o Ollama ou as ferramentas na internet.',
    valueFour: 'Agentes especializados',
    valueFourText: 'Cada agente tinha contexto e ferramentas alinhados ao seu objetivo, reduzindo respostas genéricas e chamadas fora de responsabilidade.',
    footer: 'Projeto que desenvolvi com orquestradores, agentes, Ollama, FastAPI, RAG em Markdown e revisão humana. Os dados exibidos são fictícios.'
  });

  Object.assign(portfolioCase.i18n.en, {
    navOrchestration: 'Orchestration',
    heroKicker: 'local AI + agents + RAG experience',
    heroLead: 'I developed this project so authorized users could interact with specialized agents and query operational data securely. The solution combined OpenWebUI and OpenClaw as orchestration POCs, Gemma 4 and Qwen on Ollama, custom FastAPI tools, and a human-approved Markdown RAG memory.',
    exploreOrchestration: 'Explore agents',
    metricOrchestrators: 'orchestrators evaluated in the project',
    metricAgents: 'personas, skills, and custom tools',
    metricAccess: 'restricted access through login and Tailscale',
    problemTitle: 'How I turned recurring queries into a secure chat experience',
    problemLead: 'I did not only need to connect an LLM to endpoints. I needed controlled usage with login, specialized agents, tools limited by responsibility, and reviewed memory. The architecture made each answer traceable to the agent, tool, source, and approved knowledge used in the analysis.',
    decisionOneTitle: 'Authenticated orchestration',
    decisionOneText: 'I used OpenWebUI and OpenClaw as proofs of concept to provide chat, authentication, and agent management without exposing Ollama or the APIs directly.',
    decisionTwoTitle: 'Specialized agents',
    decisionTwoText: 'I configured Business, Agile, and Innovation agents with different personas, skills, knowledge, and boundaries.',
    decisionThreeTitle: 'FastAPI tools',
    decisionThreeText: 'Tools did not let the model access sources directly. They called controlled FastAPI contracts for artifacts, metrics, and catalog data.',
    decisionFourTitle: 'Private network and review',
    decisionFourText: 'Containers reached the local Ollama through Tailscale. Access was granted only to selected users, and new notes required human approval.',
    architectureLead: 'The map below shows data and memory. The orchestration layer in the next section added login, agents, skills, and tools before a request reached FastAPI and the local models.',
    orchestrationKicker: 'orchestration and agents',
    orchestrationTitle: 'The layer that turned models and APIs into a usable experience',
    orchestrationLead: 'I hosted OpenWebUI and OpenClaw in Docker containers as proofs of concept. Both connected to the local Ollama through the private Tailscale network and required authentication, allowing only selected people to access the validation environment.',
    accessUser: 'Authorized user',
    accessLogin: 'Orchestrator login',
    restrictedAccess: 'restricted access',
    privateNetwork: 'private network',
    pocEnvironment: 'POC environment',
    orchestratorLabel: 'Orchestrator',
    agentReady: 'agent ready',
    sendToAgent: 'Send to agent',
    toolTrace: 'Tool trace',
    valueThree: 'Controlled access',
    valueThreeText: 'Login, Docker, and Tailscale let us validate the solution with a restricted group without publishing Ollama or the tools to the internet.',
    valueFour: 'Specialized agents',
    valueFourText: 'Each agent had context and tools aligned with its purpose, reducing generic answers and calls outside its responsibility.',
    footer: 'A project I developed with orchestrators, agents, Ollama, FastAPI, Markdown RAG, and human review. Displayed data is fictional.'
  });

  var agents = {
    agile: {
      name: { pt: 'Agente Agilista', en: 'Agile Agent' },
      subtitle: { pt: 'Fluxo, sprint e impedimentos', en: 'Flow, sprint, and blockers' },
      purpose: {
        pt: 'Eu configurei este agente para analisar artefatos do ciclo de desenvolvimento, identificar riscos de fluxo e responder perguntas sobre sprint, aging, impedimentos e qualidade.',
        en: 'I configured this agent to analyze development artifacts, identify flow risks, and answer questions about sprints, aging, blockers, and quality.'
      },
      persona: {
        pt: 'Facilitador objetivo, orientado a evidências e sem substituir a decisão do time.',
        en: 'Objective facilitator, evidence-driven, without replacing team decisions.'
      },
      skills: ['WIQL', 'Sprint analysis', 'Flow risk', 'Summarization'],
      knowledge: ['approved-sprint-notes', 'blocker-patterns', 'quality-signals'],
      tools: ['query_work_items', 'get_sprint_context', 'search_approved_notes'],
      questions: {
        pt: ['Quais itens estão com maior risco nesta sprint?', 'Resuma os impedimentos recorrentes.', 'Quais sinais devo levar para a daily?'],
        en: ['Which items have the highest sprint risk?', 'Summarize recurring blockers.', 'Which signals should I take to the daily?']
      },
      answer: {
        pt: 'Encontrei dois itens com aging elevado, um bloqueio reincidente e concentração de validação no final da sprint. Eu apresentaria primeiro os itens sem avanço, confirmaria responsável e dependência e só depois avaliaria entrada de novo trabalho.',
        en: 'I found two items with elevated aging, one recurring blocker, and validation concentrated near sprint end. I would first review stalled items, confirm owner and dependency, and only then consider adding new work.'
      }
    },
    business: {
      name: { pt: 'Agente de Negócios', en: 'Business Agent' },
      subtitle: { pt: 'Produtos, estoque e comparação', en: 'Products, stock, and comparison' },
      purpose: {
        pt: 'Eu configurei este agente para consultar o catálogo por GraphQL, combinar disponibilidade, descrição e faixa de valor e usar notas aprovadas para responder com contexto.',
        en: 'I configured this agent to query the catalog through GraphQL, combine availability, descriptions, and price ranges, and use approved notes for contextual answers.'
      },
      persona: {
        pt: 'Analista consultivo, claro sobre limitações e sem substituir validações comerciais ou regulatórias.',
        en: 'Consultative analyst, explicit about limitations, without replacing commercial or regulatory validation.'
      },
      skills: ['GraphQL', 'Product comparison', 'Stock analysis', 'Structured answer'],
      knowledge: ['approved-product-notes', 'stock-alternatives', 'supplier-rules'],
      tools: ['query_catalog', 'compare_products', 'search_approved_notes'],
      questions: {
        pt: ['Compare três produtos equivalentes.', 'Quais itens têm estoque baixo e alternativa?', 'Resuma diferenças entre fornecedores fictícios.'],
        en: ['Compare three equivalent products.', 'Which items have low stock and an alternative?', 'Summarize differences between fictional suppliers.']
      },
      answer: {
        pt: 'A consulta fictícia encontrou um item com estoque crítico, duas alternativas ativas e diferença de 12% na faixa de valor. A resposta prioriza disponibilidade e equivalência de descrição e informa onde ainda seria necessária validação humana.',
        en: 'The fictional query found one item with critical stock, two active alternatives, and a 12% price-range difference. The answer prioritizes availability and description equivalence and states where human validation is still required.'
      }
    },
    innovation: {
      name: { pt: 'Agente de Inovações', en: 'Innovation Agent' },
      subtitle: { pt: 'Pesquisa, ideias e experimentos', en: 'Research, ideas, and experiments' },
      purpose: {
        pt: 'Eu configurei este agente para relacionar conhecimentos internos aprovados, registrar hipóteses e apoiar a avaliação de novas ferramentas, integrações e provas de conceito.',
        en: 'I configured this agent to connect approved internal knowledge, record hypotheses, and support the evaluation of new tools, integrations, and proofs of concept.'
      },
      persona: {
        pt: 'Investigador crítico, separando fato, hipótese, risco e próximo experimento.',
        en: 'Critical investigator separating fact, hypothesis, risk, and next experiment.'
      },
      skills: ['Research framing', 'Hypothesis mapping', 'POC planning', 'Risk analysis'],
      knowledge: ['approved-innovation-notes', 'poc-lessons', 'architecture-decisions'],
      tools: ['search_innovation_notes', 'register_hypothesis', 'list_poc_evidence'],
      questions: {
        pt: ['Quais hipóteses ainda não foram validadas?', 'Resuma os aprendizados da POC.', 'Qual seria o próximo experimento seguro?'],
        en: ['Which hypotheses remain unvalidated?', 'Summarize POC lessons.', 'What is the next safe experiment?']
      },
      answer: {
        pt: 'A base fictícia mostra duas hipóteses abertas: qualidade da recuperação em documentos longos e custo de manutenção das tools. O próximo experimento recomendado é medir precisão em um conjunto controlado antes de ampliar usuários ou fontes.',
        en: 'The fictional knowledge base shows two open hypotheses: retrieval quality for long documents and tool maintenance cost. The recommended next experiment is to measure precision on a controlled set before expanding users or sources.'
      }
    }
  };

  var state = {
    orchestrator: 'openwebui',
    agent: 'agile',
    running: false,
    timers: []
  };

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

  function clearTimers() {
    state.timers.forEach(window.clearTimeout);
    state.timers = [];
    state.running = false;
  }

  function renderAgentList() {
    var container = document.getElementById('agent-list');
    if (!container) return;
    container.innerHTML = Object.keys(agents).map(function (id) {
      var agent = agents[id];
      return '<button class="agent-button' + (state.agent === id ? ' active' : '') + '" data-agent="' + id + '" type="button">' +
        '<strong>' + escapeHtml(localize(agent.name)) + '</strong>' +
        '<span>' + escapeHtml(localize(agent.subtitle)) + '</span>' +
      '</button>';
    }).join('');

    container.querySelectorAll('[data-agent]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.agent = button.dataset.agent;
        resetConversation();
        render();
      });
    });
  }

  function renderTags(id, values) {
    var target = document.getElementById(id);
    if (!target) return;
    target.innerHTML = values.map(function (value) {
      return '<span>' + escapeHtml(value) + '</span>';
    }).join('');
  }

  function renderQuestions() {
    var select = document.getElementById('agent-question');
    if (!select) return;
    select.innerHTML = agents[state.agent].questions[language()].map(function (question, index) {
      return '<option value="' + index + '">' + escapeHtml(question) + '</option>';
    }).join('');
  }

  function renderOrchestrator() {
    document.querySelectorAll('[data-orchestrator]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.orchestrator === state.orchestrator);
    });
    var mode = document.getElementById('orchestrator-mode');
    if (mode) {
      mode.textContent = state.orchestrator === 'openwebui'
        ? 'OpenWebUI · authenticated chat · agent workspace'
        : 'OpenClaw · agent POC · skills and tool routing';
    }
  }

  function resetConversation() {
    clearTimers();
    var log = document.getElementById('agent-chat-log');
    var trace = document.getElementById('tool-trace-list');
    if (log) {
      log.innerHTML = '<div class="chat-message system">' +
        escapeHtml(language() === 'pt'
          ? 'Sessão fictícia iniciada. O orquestrador exige login e encaminha a mensagem somente para o agente selecionado.'
          : 'Fictional session started. The orchestrator requires login and routes the message only to the selected agent.') +
      '</div>';
    }
    if (trace) {
      trace.innerHTML = '<li data-step="1">' + escapeHtml(language() === 'pt' ? 'Aguardando mensagem' : 'Waiting for a message') + '</li>';
    }
    var button = document.getElementById('run-agent');
    if (button) button.disabled = false;
  }

  function render() {
    var agent = agents[state.agent];
    renderAgentList();
    renderOrchestrator();
    renderQuestions();

    var name = document.getElementById('agent-name');
    var purpose = document.getElementById('agent-purpose');
    var persona = document.getElementById('agent-persona');
    if (name) name.textContent = localize(agent.name);
    if (purpose) purpose.textContent = localize(agent.purpose);
    if (persona) persona.textContent = localize(agent.persona);
    renderTags('agent-skills', agent.skills);
    renderTags('agent-knowledge', agent.knowledge);
    renderTags('agent-tools', agent.tools);
  }

  function runAgent() {
    if (state.running) return;
    clearTimers();
    state.running = true;

    var agent = agents[state.agent];
    var select = document.getElementById('agent-question');
    var question = agent.questions[language()][Number(select && select.value) || 0];
    var log = document.getElementById('agent-chat-log');
    var trace = document.getElementById('tool-trace-list');
    var button = document.getElementById('run-agent');
    if (!log || !trace || !button) return;

    button.disabled = true;
    log.innerHTML =
      '<div class="chat-message user">' + escapeHtml(question) + '</div>' +
      '<div class="chat-message system">' + escapeHtml(state.orchestrator === 'openwebui'
        ? '[OpenWebUI] authenticated user → selected agent'
        : '[OpenClaw] authenticated user → persona and skill router') + '</div>';

    var steps = [
      language() === 'pt' ? 'Validar sessão e permissão do usuário' : 'Validate user session and permission',
      language() === 'pt' ? 'Carregar persona, skills e conhecimentos do agente' : 'Load agent persona, skills, and knowledge',
      language() === 'pt' ? 'Selecionar ferramenta permitida para a pergunta' : 'Select an allowed tool for the question',
      language() === 'pt' ? 'Chamar FastAPI por rede privada Tailscale' : 'Call FastAPI through the private Tailscale network',
      language() === 'pt' ? 'Combinar fonte atual e notas RAG aprovadas' : 'Combine current source data and approved RAG notes',
      language() === 'pt' ? 'Solicitar inferência ao Ollama local' : 'Request inference from local Ollama'
    ];

    trace.innerHTML = steps.map(function (step, index) {
      return '<li data-step="' + (index + 1) + '">' + escapeHtml(step) + '</li>';
    }).join('');

    var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 60 : 380;
    steps.forEach(function (_, index) {
      var timer = window.setTimeout(function () {
        var items = trace.querySelectorAll('li');
        items.forEach(function (item, itemIndex) {
          item.classList.toggle('active', itemIndex === index);
          if (itemIndex < index) item.classList.add('done');
        });

        if (index === steps.length - 1) {
          items[index].classList.remove('active');
          items[index].classList.add('done');
          log.insertAdjacentHTML('beforeend',
            '<div class="chat-message agent"><strong>' + escapeHtml(localize(agent.name)) + '</strong><br>' +
            escapeHtml(localize(agent.answer)) + '</div>');
          state.running = false;
          button.disabled = false;
        }
      }, index * delay);
      state.timers.push(timer);
    });
  }

  function bind() {
    document.querySelectorAll('[data-orchestrator]').forEach(function (button) {
      button.addEventListener('click', function () {
        state.orchestrator = button.dataset.orchestrator;
        resetConversation();
        render();
      });
    });

    var runButton = document.getElementById('run-agent');
    if (runButton) runButton.addEventListener('click', runAgent);
  }

  window.addEventListener('portfolio-case-language', function () {
    resetConversation();
    render();
  });

  document.addEventListener('DOMContentLoaded', function () {
    bind();
    resetConversation();
    render();
  });
})();