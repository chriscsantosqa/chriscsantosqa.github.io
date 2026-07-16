(function () {
  'use strict';

  var data = window.PlaywrightCaseData;
  if (!data) return;

  Object.assign(data.i18n.pt, {
    projectCase: 'projeto realizado',
    heroKicker: 'experiência em automação de API',
    heroLead: 'Eu construí este framework quando a automação de API começou a crescer e o setup repetido passou a dificultar manutenção, paralelismo e diagnóstico. A estrutura foi organizada com Playwright, C#, NUnit e Allure para suportar REST e GraphQL com responsabilidades bem separadas.',
    sanitizedNote: 'A experiência apresentada é real. Para preservar a confidencialidade, nomes, domínios, URLs, payloads e resultados foram substituídos por exemplos fictícios. Nenhuma API real é chamada.',
    metricProtocols: 'protocolos que reuni na mesma base',
    metricParallel: 'isolamento que usei por fixture',
    metricAuth: 'token centralizado com controle de concorrência',
    metricReport: 'diagnóstico que deixei rastreável',
    contextKicker: 'problema que eu precisava resolver',
    contextTitle: 'Por que eu organizei o framework desta forma',
    contextLead: 'Meu objetivo era reduzir repetição sem esconder o comportamento dos testes. Eu precisava permitir execução paralela, reutilizar autenticação, criar dados claros e deixar a falha explicável no relatório.',
    decisionOneText: 'Eu dei a cada fixture seu próprio APIRequestContext. O token podia ser compartilhado, mas o recurso descartável não, evitando que uma execução encerrasse o contexto de outra.',
    decisionTwoText: 'Eu usei builders com valores válidos por padrão para que o cenário mostrasse somente a alteração responsável pela condição testada.',
    decisionThreeText: 'Eu centralizei validações HTTP, JSON e GraphQL para manter mensagens de falha consistentes e reduzir código repetido.',
    decisionFourText: 'Eu levei etapas, metadados, requests e responses ao Allure para reduzir o tempo entre a falha e a identificação da causa.',
    architectureKicker: 'estrutura que desenvolvi',
    architectureTitle: 'Arquitetura do framework',
    architectureLead: 'Expanda as pastas e selecione um arquivo para acompanhar as decisões que tomei, o problema que cada componente resolveu e como ele participa da execução.',
    responsibility: 'Responsabilidade no projeto',
    problemSolved: 'Problema que resolveu',
    architectureDecision: 'Decisão que tomei',
    relations: 'Como se conecta',
    flowKicker: 'fluxo que implementei',
    flowTitle: 'Da configuração ao relatório',
    flowLead: 'Selecione uma etapa para localizar o componente e entender onde ele entra na execução.',
    executionKicker: 'experiência interativa',
    executionLead: 'A simulação reproduz a sequência que eu estruturava no projeto: preparar ambiente, autenticar, descobrir testes, executar cenários e gerar o relatório. Os dados usados aqui são fictícios.',
    reportKicker: 'como eu analisava o resultado',
    reportTitle: 'Relatório interativo inspirado no Allure',
    reportLead: 'Abra os testes e os anexos para ver o tipo de contexto que eu deixava disponível durante a investigação de uma falha.',
    reportDisclaimer: 'A estrutura e a experiência são reais, mas o relatório, os testes, os nomes e os resultados exibidos são integralmente fictícios.',
    footerText: 'Framework que desenvolvi com Playwright, C#, NUnit e Allure. Os dados exibidos são fictícios.',
    resultCompleted: 'Simulação concluída conforme o fluxo que implementei',
    resultCompletedFailure: 'Simulação concluída com uma falha demonstrativa para análise'
  });

  Object.assign(data.i18n.en, {
    projectCase: 'completed project',
    heroKicker: 'API automation experience',
    heroLead: 'I built this framework when API automation started to grow and repeated setup began to make maintenance, parallelism, and diagnosis harder. I organized it with Playwright, C#, NUnit, and Allure to support REST and GraphQL through clear responsibilities.',
    sanitizedNote: 'The experience described here is real. To protect confidentiality, names, domains, URLs, payloads, and results were replaced with fictional examples. No real API is called.',
    metricProtocols: 'protocols I brought into one foundation',
    metricParallel: 'isolation I used per fixture',
    metricAuth: 'centralized token with concurrency control',
    metricReport: 'diagnostics I made traceable',
    contextKicker: 'the problem I needed to solve',
    contextTitle: 'Why I organized the framework this way',
    contextLead: 'My goal was to reduce repetition without hiding test behavior. I needed parallel execution, reusable authentication, clear test data, and failures that remained explainable in the report.',
    decisionOneText: 'I gave each fixture its own APIRequestContext. The token could be shared, but the disposable resource could not, preventing one execution from closing another fixture context.',
    decisionTwoText: 'I used builders with valid defaults so each scenario exposed only the change responsible for the tested condition.',
    decisionThreeText: 'I centralized HTTP, JSON, and GraphQL checks to keep failure messages consistent and reduce repeated code.',
    decisionFourText: 'I sent steps, metadata, requests, and responses to Allure to shorten the path from failure to cause.',
    architectureKicker: 'the structure I built',
    architectureTitle: 'Framework architecture',
    architectureLead: 'Expand the folders and select a file to follow the decisions I made, the problem each component solved, and how it participates in execution.',
    responsibility: 'Responsibility in the project',
    problemSolved: 'Problem it solved',
    architectureDecision: 'Decision I made',
    relations: 'How it connects',
    flowKicker: 'the flow I implemented',
    flowTitle: 'From configuration to report',
    flowLead: 'Select a step to locate its component and understand where it enters the execution.',
    executionKicker: 'interactive experience',
    executionLead: 'The simulation reproduces the sequence I structured in the project: prepare the environment, authenticate, discover tests, run scenarios, and generate the report. The data shown here is fictional.',
    reportKicker: 'how I analyzed results',
    reportTitle: 'Interactive report inspired by Allure',
    reportLead: 'Open tests and attachments to see the context I kept available while investigating a failure.',
    reportDisclaimer: 'The structure and experience are real, but the report, tests, names, and displayed results are entirely fictional.',
    footerText: 'A framework I built with Playwright, C#, NUnit, and Allure. Displayed data is fictional.',
    resultCompleted: 'Simulation completed following the flow I implemented',
    resultCompletedFailure: 'Simulation completed with a demonstration failure for analysis'
  });

  var copy = {
    root: {
      summary: ['Estrutura anonimizada do framework que desenvolvi.', 'An anonymized structure of the framework I built.'],
      problem: ['Eu precisava transformar uma automação crescente em uma base organizada e sustentável.', 'I needed to turn growing automation into an organized and sustainable foundation.'],
      decision: ['Separei infraestrutura, clientes, dados, testes e configuração por responsabilidade.', 'I separated infrastructure, clients, data, tests, and configuration by responsibility.'],
      relations: ['A raiz conecta Core, API, Web, documentação, pipeline e configuração da suíte.', 'The root connects Core, API, Web, documentation, pipeline, and suite configuration.']
    },
    'configuration-manager': {
      summary: ['Centralizei ambiente, URLs e parâmetros usados pela execução.', 'I centralized environment, URLs, and parameters used by execution.'],
      problem: ['As configurações espalhadas dificultavam troca de ambiente e diagnóstico.', 'Scattered configuration made environment changes and diagnosis harder.'],
      decision: ['Criei um ponto único para ler valores e impedir que cada teste montasse sua própria configuração.', 'I created one place to read values so each test would not build its own configuration.'],
      relations: ['Alimenta autenticação, criação de contexto, clientes e execução da suíte.', 'It feeds authentication, context creation, clients, and suite execution.']
    },
    'token-provider': {
      summary: ['Implementei cache OAuth com controle de concorrência e renovação antecipada.', 'I implemented OAuth caching with concurrency control and early renewal.'],
      problem: ['Solicitar um token por teste aumentava tempo, carga e risco de concorrência.', 'Requesting a token per test increased time, load, and concurrency risk.'],
      decision: ['Usei cache compartilhado protegido por SemaphoreSlim, mantendo o contexto de teste isolado.', 'I used a shared cache protected by SemaphoreSlim while keeping test contexts isolated.'],
      relations: ['Recebe configuração, autentica uma vez e fornece o token ao setup das fixtures.', 'It receives configuration, authenticates once, and provides the token to fixture setup.']
    },
    'api-assert': {
      summary: ['Centralizei validações e mensagens de diagnóstico de REST e GraphQL.', 'I centralized REST and GraphQL checks and diagnostic messages.'],
      problem: ['Asserts repetidos produziam mensagens diferentes e escondiam contexto importante.', 'Repeated assertions produced inconsistent messages and hid important context.'],
      decision: ['Criei helpers que validavam status, JSON e errors[] sem tirar a intenção do teste.', 'I created helpers that checked status, JSON, and errors[] without hiding test intent.'],
      relations: ['É usado após os clientes e builders para validar a resposta e alimentar o relatório.', 'It is used after clients and builders to validate responses and feed the report.']
    },
    'setup-api-test': {
      summary: ['Criei um contexto autenticado e independente para cada fixture.', 'I created an authenticated and independent context for each fixture.'],
      problem: ['Um contexto estático podia ser descartado enquanto outra fixture ainda o utilizava.', 'A static context could be disposed while another fixture was still using it.'],
      decision: ['Compartilhei apenas o token e mantive APIRequestContext como recurso da própria fixture.', 'I shared only the token and kept APIRequestContext as a fixture-owned resource.'],
      relations: ['Consome configuração e token, cria o contexto e o disponibiliza aos clientes dos testes.', 'It consumes configuration and token, creates the context, and provides it to test clients.']
    },
    'api-client-helper': {
      summary: ['Padronizei envio de requests, leitura de responses e anexos de diagnóstico.', 'I standardized request sending, response reading, and diagnostic attachments.'],
      problem: ['Cada teste repetia detalhes de transporte e tratamento de resposta.', 'Each test repeated transport and response-handling details.'],
      decision: ['Mantive o cliente fino para reutilizar transporte sem esconder o endpoint e o payload testado.', 'I kept the client thin to reuse transport without hiding the tested endpoint and payload.'],
      relations: ['Recebe o contexto do setup, executa a chamada e entrega o resultado ao ApiAssert.', 'It receives the setup context, performs the call, and sends the result to ApiAssert.']
    },
    'rest-builder': {
      summary: ['Usei builders para criar payloads válidos e alterar somente o dado do cenário.', 'I used builders to create valid payloads and change only the scenario data.'],
      problem: ['Payloads copiados ficavam extensos, frágeis e difíceis de interpretar.', 'Copied payloads became long, fragile, and difficult to interpret.'],
      decision: ['Defini defaults válidos e métodos explícitos para cada alteração relevante.', 'I defined valid defaults and explicit methods for each relevant change.'],
      relations: ['Prepara dados para os testes REST e reduz ruído antes da chamada do cliente.', 'It prepares REST test data and reduces noise before the client call.']
    },
    'graphql-query-factory': {
      summary: ['Organizei a montagem de queries e seleções reutilizáveis de GraphQL.', 'I organized reusable GraphQL query and selection construction.'],
      problem: ['Strings extensas dificultavam manutenção de campos, filtros e variáveis.', 'Long strings made fields, filters, and variables harder to maintain.'],
      decision: ['Separei operação, argumentos e selection set para deixar a intenção visível.', 'I separated operation, arguments, and selection set to keep intent visible.'],
      relations: ['Monta a query entregue ao cliente GraphQL e validada posteriormente pelo ApiAssert.', 'It builds the query sent to the GraphQL client and later validated by ApiAssert.']
    },
    'rest-happy-path': {
      summary: ['Estruturei o cenário completo de criação, consulta e limpeza do dado.', 'I structured the full create, retrieve, and cleanup scenario.'],
      problem: ['Validar apenas o POST não confirmava persistência nem deixava o ambiente limpo.', 'Checking only POST did not confirm persistence or leave the environment clean.'],
      decision: ['Usei round-trip e registrei o identificador cedo para garantir cleanup no TearDown.', 'I used a round trip and registered the identifier early to guarantee cleanup in TearDown.'],
      relations: ['Combina builder, cliente, assert, consulta posterior e rotina de limpeza.', 'It combines builder, client, assertion, later query, and cleanup routine.']
    },
    'graphql-happy-path': {
      summary: ['Validei o corpo GraphQL e também a presença de errors[], mesmo com HTTP 200.', 'I validated the GraphQL body and errors[] even when HTTP returned 200.'],
      problem: ['Tratar HTTP 200 como sucesso criava falsos positivos em respostas GraphQL.', 'Treating HTTP 200 as success created false positives in GraphQL responses.'],
      decision: ['Separei validação de transporte e validação semântica do payload GraphQL.', 'I separated transport validation from semantic GraphQL payload validation.'],
      relations: ['Usa a query factory, executa pelo cliente e entrega data/errors ao ApiAssert.', 'It uses the query factory, executes through the client, and sends data/errors to ApiAssert.']
    },
    'setup-web-test': {
      summary: ['Mantive uma base preparada para compartilhar infraestrutura entre API e Web.', 'I kept a foundation ready to share infrastructure between API and Web.'],
      problem: ['Eu queria evoluir o projeto sem misturar responsabilidades de browser e API.', 'I wanted to evolve the project without mixing browser and API responsibilities.'],
      decision: ['Separei setup e testes Web, reutilizando somente configuração e utilidades comuns.', 'I separated Web setup and tests while reusing only common configuration and utilities.'],
      relations: ['Faz parte da mesma solução, mas não interfere no ciclo de vida das fixtures de API.', 'It belongs to the same solution but does not interfere with API fixture lifecycle.']
    },
    'ci-pipeline': {
      summary: ['Automatizei build, execução por categoria e publicação dos resultados.', 'I automated build, category-based execution, and result publishing.'],
      problem: ['A execução local isolada não dava visibilidade consistente ao time.', 'Local-only execution did not provide consistent visibility to the team.'],
      decision: ['Levei a suíte ao pipeline com filtros e artefatos para permitir repetição e análise.', 'I moved the suite to the pipeline with filters and artifacts for repeatability and analysis.'],
      relations: ['Executa o projeto, aplica runsettings e publica os resultados utilizados pelo Allure.', 'It runs the project, applies runsettings, and publishes the results used by Allure.']
    },
    'allure-config': {
      summary: ['Configurei a coleta dos resultados e anexos usados no diagnóstico.', 'I configured collection of results and attachments used for diagnosis.'],
      problem: ['Sem um relatório central, a falha exigia reproduzir a execução para obter contexto.', 'Without a central report, failures had to be reproduced to recover context.'],
      decision: ['Registrei etapas, metadados e anexos relevantes em uma saída padronizada.', 'I recorded relevant steps, metadata, and attachments in a standardized output.'],
      relations: ['Recebe dados gerados pelos testes e os organiza para consulta após a execução.', 'It receives test-generated data and organizes it for post-run inspection.']
    },
    runsettings: {
      summary: ['Defini o paralelismo da suíte de forma explícita e controlável.', 'I defined suite parallelism explicitly and controllably.'],
      problem: ['Paralelismo implícito dificultava reproduzir concorrência e ajustar capacidade.', 'Implicit parallelism made concurrency harder to reproduce and capacity harder to tune.'],
      decision: ['Centralizei workers no runsettings e projetei fixtures para serem independentes.', 'I centralized workers in runsettings and designed fixtures to remain independent.'],
      relations: ['É aplicado pelo runner e trabalha em conjunto com o isolamento do SetupApiTest.', 'It is applied by the runner and works together with SetupApiTest isolation.']
    },
    csproj: {
      summary: ['Consolidei runtime, pacotes de teste e arquivos necessários à execução.', 'I consolidated runtime, test packages, and files required for execution.'],
      problem: ['Dependências divergentes criavam comportamento diferente entre máquinas e pipeline.', 'Divergent dependencies created different behavior across machines and pipeline.'],
      decision: ['Mantive uma solução canônica em .NET 8 com versões explícitas dos pacotes.', 'I kept one canonical .NET 8 solution with explicit package versions.'],
      relations: ['Define a base compilada pelo pipeline e utilizada por todos os componentes da árvore.', 'It defines the foundation compiled by the pipeline and used by every component in the tree.']
    }
  };

  function localized(pt, en) {
    return { pt: pt, en: en };
  }

  function walk(nodes) {
    nodes.forEach(function (node) {
      var item = copy[node.id];
      if (item) {
        node.summary = localized(item.summary[0], item.summary[1]);
        node.responsibility = localized(item.summary[0], item.summary[1]);
        node.problem = localized(item.problem[0], item.problem[1]);
        node.decision = localized(item.decision[0], item.decision[1]);
        node.relations = localized(item.relations[0], item.relations[1]);
      }
      if (node.children) walk(node.children);
    });
  }

  walk(data.nodes);

  var flowLabels = [
    ['Configuração do ambiente', 'Environment configuration'],
    ['Autenticação com cache', 'Cached authentication'],
    ['Contexto isolado', 'Isolated context'],
    ['Dados e query', 'Data and query'],
    ['Request e validação', 'Request and validation'],
    ['Evidências no relatório', 'Report evidence']
  ];

  data.flow.forEach(function (step, index) {
    if (flowLabels[index]) step.label = localized(flowLabels[index][0], flowLabels[index][1]);
  });

  data.tests.forEach(function (test) {
    test.metadata = ['Epic: Demo Platform', 'Feature: Sample Items', 'Owner: QA Portfolio', 'Severity: normal', 'Category: Smoke'];
    test.steps = [
      { status: test.status, label: localized('Preparar dados e contexto do cenário', 'Prepare scenario data and context') },
      { status: test.status, label: localized('Executar a chamada e registrar evidências', 'Execute the call and record evidence') },
      { status: test.status, label: localized('Validar resposta, persistência e cleanup', 'Validate response, persistence, and cleanup') }
    ];
  });
})();
