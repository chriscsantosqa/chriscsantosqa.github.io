(function () {
  'use strict';

  function l(pt, en) { return { pt: pt, en: en }; }
  function node(id, name, type, category, summary, code, children, language, expanded) {
    return {
      id: id,
      name: name,
      type: type,
      category: category,
      summary: l(summary[0], summary[1]),
      title: l(name, name),
      responsibility: l(summary[0], summary[1]),
      problem: l('Evita duplicação e acoplamento entre cenários.', 'Avoids duplication and coupling between scenarios.'),
      decision: l('Componente isolado por responsabilidade em uma solução totalmente fictícia.', 'Component isolated by responsibility in a fully fictional solution.'),
      relations: l('Participa apenas do fluxo demonstrativo desta página.', 'Participates only in this page demonstration flow.'),
      code: code || '',
      children: children || [],
      language: language || (type === 'folder' ? 'Directory' : 'Text'),
      expanded: expanded === true
    };
  }
  function folder(id, name, category, summary, children, expanded) {
    return node(id, name, 'folder', category, summary, '', children, 'Directory', expanded);
  }
  function file(id, name, category, summary, code, language) {
    return node(id, name, 'file', category, summary, code, [], language, false);
  }

  var nodes = [folder('root', 'Demo.AutomationTests', 'config',
    ['Raiz fictícia usada exclusivamente nesta demonstração.', 'Fictional root used only in this demonstration.'], [
      folder('src', 'src', 'core', ['Código demonstrativo.', 'Demonstration code.'], [
        folder('core', 'Core', 'core', ['Infraestrutura compartilhada fictícia.', 'Fictional shared infrastructure.'], [
          file('configuration-manager', 'DemoConfiguration.cs', 'config',
            ['Fornece apenas URLs e parâmetros mockados.', 'Provides mocked URLs and parameters only.'],
`public sealed class DemoConfiguration
{
    public string BaseUrl => "https://api.example.test";
    public string Environment => "Mock";
}`, 'C#'),
          file('token-provider', 'TokenProvider.cs', 'core',
            ['Simula cache OAuth thread-safe sem usar credenciais reais.', 'Simulates a thread-safe OAuth cache without real credentials.'],
`public static async Task<string> GetTokenAsync()
{
    if (IsValid()) return _token!;
    await Mutex.WaitAsync();
    try { return _token ??= "mock-token"; }
    finally { Mutex.Release(); }
}`, 'C#'),
          file('api-assert', 'ApiAssert.cs', 'core',
            ['Centraliza validações HTTP, JSON e GraphQL.', 'Centralizes HTTP, JSON, and GraphQL checks.'],
`public static void Status(ApiResult result, int expected)
{
    Assert.That(result.StatusCode, Is.EqualTo(expected));
}`, 'C#')
        ], true),
        folder('api', 'API', 'rest', ['Automação fictícia de APIs REST e GraphQL.', 'Fictional REST and GraphQL API automation.'], [
          file('setup-api-test', 'SetupApiTest.cs', 'config',
            ['Cria um contexto mockado por fixture.', 'Creates one mocked context per fixture.'],
`[OneTimeSetUp]
public async Task Setup()
{
    Context = await Playwright.APIRequest.NewContextAsync(new()
    {
        BaseURL = "https://api.example.test"
    });
}`, 'C#'),
          file('api-client-helper', 'ApiClientHelper.cs', 'rest',
            ['Padroniza requisições e respostas simuladas.', 'Standardizes simulated requests and responses.'],
`public Task<ApiResult> PostAsync<T>(string url, T body) =>
    SendAsync("POST", url, body);`, 'C#'),
          file('rest-builder', 'SampleItemBuilder.cs', 'rest',
            ['Cria payloads fictícios válidos por padrão.', 'Creates valid fictional payloads by default.'],
`var body = SampleItemBuilder.Create()
    .WithName("Mock item")
    .Build();`, 'C#'),
          file('graphql-query-factory', 'GraphQLQueryFactory.cs', 'graphql',
            ['Monta queries fictícias reutilizáveis.', 'Builds reusable fictional queries.'],
`var query = GraphQLQueryFactory
    .Operation("sampleItem")
    .Select("id", "name", "active")
    .Build();`, 'C#'),
          file('rest-happy-path', 'SampleItemHappyPath.cs', 'rest',
            ['Demonstra criação, consulta e cleanup mockados.', 'Demonstrates mocked creation, retrieval, and cleanup.'],
`[Test]
public async Task ValidItemShouldPersist()
{
    var created = await Api.PostAPI("/v1/sample-items", body);
    ApiAssert.Status(created, 201);
}`, 'C#'),
          file('graphql-happy-path', 'SampleItemGraphQL.cs', 'graphql',
            ['Valida data e errors[] em uma query fictícia.', 'Validates data and errors[] in a fictional query.'],
`var result = await GraphQL.ExecuteAsync("/graphql", query);
var item = ApiAssert.GraphQLData(result, "sampleItem");`, 'C#')
        ], true),
        folder('web', 'Web', 'web', ['Estrutura fictícia preparada para testes Web.', 'Fictional structure prepared for Web tests.'], [
          file('setup-web-test', 'SetupWebTest.cs', 'web',
            ['Prepara browser e página fictícios.', 'Prepares fictional browser and page.'],
`[SetUp]
public async Task CreatePage() =>
    Page = await Context.NewPageAsync();`, 'C#')
        ], false)
      ], true),
      folder('docs', 'docs', 'config', ['Documentação genérica fictícia.', 'Generic fictional documentation.'], [], false),
      folder('pipelines', 'pipelines', 'config', ['Pipeline fictício.', 'Fictional pipeline.'], [
        file('ci-pipeline', 'ci-playwright.yml', 'config',
          ['Executa build e testes demonstrativos.', 'Runs demonstration build and tests.'],
`steps:
  - script: dotnet test --filter "TestCategory=Smoke"
    displayName: Execute mock tests`, 'YAML')
      ], false),
      file('allure-config', 'allureConfig.json', 'config',
        ['Define uma pasta fictícia de resultados.', 'Defines a fictional results directory.'],
`{ "allure": { "directory": "../../../allure-results" } }`, 'JSON'),
      file('runsettings', 'test.runsettings', 'config',
        ['Configura quatro workers demonstrativos.', 'Configures four demonstration workers.'],
`<RunSettings><NUnit><NumberOfTestWorkers>4</NumberOfTestWorkers></NUnit></RunSettings>`, 'XML'),
      file('csproj', 'Demo.AutomationTests.csproj', 'config',
        ['Declara .NET 8 e dependências do projeto fictício.', 'Declares .NET 8 and fictional project dependencies.'],
`<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.Playwright" Version="1.61.0" />
    <PackageReference Include="NUnit" Version="4.4.0" />
    <PackageReference Include="Allure.NUnit" Version="2.15.0" />
  </ItemGroup>
</Project>`, 'XML')
    ], true)
  ];

  var commonPt = {
    projectCase: 'case técnico', navArchitecture: 'Arquitetura', navExecution: 'Execução', navReport: 'Relatório',
    backPortfolio: 'Voltar aos projetos', heroKicker: 'automação de API',
    heroLead: 'Case técnico interativo com estrutura, serviços, dados e resultados totalmente fictícios.',
    exploreArchitecture: 'Explorar arquitetura', simulateExecution: 'Simular execução',
    sanitizedNote: 'Conteúdo 100% fictício. Não representa empresa, produto, ambiente ou API real.',
    metricProtocols: 'dois protocolos, uma base', metricParallel: 'paralelismo por fixture', metricAuth: 'autenticação simulada', metricReport: 'diagnóstico demonstrativo',
    contextKicker: 'problema e decisões', contextTitle: 'Por que a estrutura foi criada desta forma',
    contextLead: 'A arquitetura demonstra separação de responsabilidades, execução paralela e diagnóstico rastreável.',
    decisionOneTitle: 'Contexto isolado', decisionOneText: 'Cada fixture recebe seu próprio APIRequestContext fictício.',
    decisionTwoTitle: 'Dados expressivos', decisionTwoText: 'Builders criam payloads mockados válidos por padrão.',
    decisionThreeTitle: 'Asserts reutilizáveis', decisionThreeText: 'Validações HTTP, JSON e GraphQL ficam centralizadas.',
    decisionFourTitle: 'Diagnóstico visível', decisionFourText: 'Metadados fictícios alimentam o relatório demonstrativo.',
    architectureKicker: 'explorador interativo', architectureTitle: 'Arquitetura fictícia do projeto',
    architectureLead: 'Expanda as pastas e selecione um arquivo para entender sua responsabilidade no exemplo.',
    searchLabel: 'Buscar arquivo', searchPlaceholder: 'Buscar arquivo ou responsabilidade', filterAll: 'Tudo', filterConfig: 'Configuração', projectExplorer: 'Project Explorer', noFiles: 'Nenhum arquivo encontrado.',
    responsibility: 'Responsabilidade', problemSolved: 'Problema resolvido', architectureDecision: 'Decisão arquitetural', relations: 'Relações',
    flowKicker: 'fluxo de execução', flowTitle: 'Do ambiente mockado ao relatório', flowLead: 'Selecione uma etapa para localizar o componente na árvore.',
    executionKicker: 'execução demonstrativa', executionTitle: 'Simulação visual da suíte', executionLead: 'A simulação usa apenas dados fictícios e não chama serviços externos.',
    scenario: 'Cenário', stableRun: 'Execução estável', failureRun: 'Falha demonstrativa', runDemo: 'Executar demonstração', reset: 'Reiniciar', currentState: 'Estado atual', waitingExecution: 'Aguardando execução',
    reportKicker: 'relatório interativo', reportTitle: 'Resultado fictício inspirado no Allure', reportLead: 'Filtre os resultados mockados e abra um teste.',
    reportDisclaimer: 'Relatório inteiramente fictício. Não representa empresa, produto, ambiente ou execução real.',
    suites: 'Suites', tests: 'testes', testCases: 'Casos de teste', steps: 'Etapas', attachments: 'Anexos', footerText: 'Case técnico com dados inteiramente fictícios.',
    all: 'Todos', passed: 'Aprovados', failed: 'Falhos', skipped: 'Ignorados', duration: 'Duração',
    resultCompleted: 'Execução fictícia concluída', resultCompletedFailure: 'Execução fictícia concluída com falha demonstrativa', openAttachment: 'Abrir anexo demonstrativo', noTests: 'Nenhum teste neste filtro.'
  };
  var commonEn = {
    projectCase: 'technical case', navArchitecture: 'Architecture', navExecution: 'Execution', navReport: 'Report',
    backPortfolio: 'Back to projects', heroKicker: 'API automation',
    heroLead: 'Interactive technical case with fully fictional structure, services, data, and results.',
    exploreArchitecture: 'Explore architecture', simulateExecution: 'Simulate execution',
    sanitizedNote: '100% fictional content. It does not represent a real company, product, environment, or API.',
    metricProtocols: 'two protocols, one foundation', metricParallel: 'parallelism per fixture', metricAuth: 'simulated authentication', metricReport: 'demonstration diagnostics',
    contextKicker: 'problem and decisions', contextTitle: 'Why the structure was designed this way',
    contextLead: 'The architecture demonstrates separation of concerns, parallel execution, and traceable diagnostics.',
    decisionOneTitle: 'Isolated context', decisionOneText: 'Each fixture receives its own fictional APIRequestContext.',
    decisionTwoTitle: 'Expressive data', decisionTwoText: 'Builders create valid mocked payloads by default.',
    decisionThreeTitle: 'Reusable assertions', decisionThreeText: 'HTTP, JSON, and GraphQL checks are centralized.',
    decisionFourTitle: 'Visible diagnostics', decisionFourText: 'Fictional metadata feeds the demonstration report.',
    architectureKicker: 'interactive explorer', architectureTitle: 'Fictional project architecture',
    architectureLead: 'Expand folders and select a file to understand its responsibility in the example.',
    searchLabel: 'Search file', searchPlaceholder: 'Search file or responsibility', filterAll: 'All', filterConfig: 'Configuration', projectExplorer: 'Project Explorer', noFiles: 'No files found.',
    responsibility: 'Responsibility', problemSolved: 'Problem solved', architectureDecision: 'Architecture decision', relations: 'Relations',
    flowKicker: 'execution flow', flowTitle: 'From mocked environment to report', flowLead: 'Select a step to locate its component in the tree.',
    executionKicker: 'demonstration run', executionTitle: 'Visual suite simulation', executionLead: 'The simulation uses fictional data only and does not call external services.',
    scenario: 'Scenario', stableRun: 'Stable execution', failureRun: 'Demonstration failure', runDemo: 'Run demonstration', reset: 'Reset', currentState: 'Current state', waitingExecution: 'Waiting for execution',
    reportKicker: 'interactive report', reportTitle: 'Fictional result inspired by Allure', reportLead: 'Filter mocked results and open a test.',
    reportDisclaimer: 'Entirely fictional report. It does not represent a real company, product, environment, or execution.',
    suites: 'Suites', tests: 'tests', testCases: 'Test cases', steps: 'Steps', attachments: 'Attachments', footerText: 'Technical case with entirely fictional data.',
    all: 'All', passed: 'Passed', failed: 'Failed', skipped: 'Skipped', duration: 'Duration',
    resultCompleted: 'Fictional execution completed', resultCompletedFailure: 'Fictional execution completed with a demonstration failure', openAttachment: 'Open demonstration attachment', noTests: 'No tests in this filter.'
  };

  var flow = [
    { index: '01', label: l('Ambiente mockado', 'Mocked environment'), fileId: 'configuration-manager' },
    { index: '02', label: l('Autenticação fictícia', 'Fictional authentication'), fileId: 'token-provider' },
    { index: '03', label: l('Fixture', 'Fixture'), fileId: 'setup-api-test' },
    { index: '04', label: l('Builder / Query', 'Builder / Query'), fileId: 'rest-builder' },
    { index: '05', label: l('Request + Assert', 'Request + Assert'), fileId: 'api-assert' },
    { index: '06', label: l('Relatório fictício', 'Fictional report'), fileId: 'allure-config' }
  ];
  var simulationStates = ['PREPARING', 'AUTHENTICATING', 'DISCOVERING_TESTS', 'EXECUTING', 'GENERATING_REPORT', 'COMPLETED']
    .map(function (id) { return { id: id, label: l(id, id) }; });
  function entries(values) { return values.map(function (x) { return { state: x[0], type: x[1], text: x[2] }; }); }
  var simulations = {
    stable: entries([
      ['PREPARING', 'muted', '$ dotnet test --filter "TestCategory=Smoke"'],
      ['PREPARING', 'info', '[setup] Ambiente carregado: Mock'],
      ['AUTHENTICATING', 'info', '[auth] Token fictício disponível no cache'],
      ['DISCOVERING_TESTS', 'muted', '[nunit] 9 testes fictícios encontrados'],
      ['EXECUTING', 'info', '[REST] POST /v1/sample-items -> 201 Created'],
      ['EXECUTING', 'pass', '[PASS] ValidItemShouldPersist'],
      ['EXECUTING', 'info', '[GraphQL] query sampleItem -> HTTP 200'],
      ['GENERATING_REPORT', 'info', '[allure] resultados fictícios gravados'],
      ['COMPLETED', 'pass', 'Passed: 9 | Failed: 0 | Skipped: 0']
    ]),
    failure: entries([
      ['PREPARING', 'muted', '$ dotnet test --filter "TestCategory=Smoke"'],
      ['PREPARING', 'info', '[setup] Ambiente carregado: Mock'],
      ['AUTHENTICATING', 'info', '[auth] Token fictício armazenado'],
      ['DISCOVERING_TESTS', 'muted', '[nunit] 9 testes fictícios encontrados'],
      ['EXECUTING', 'info', '[REST] POST /v1/sample-items -> 400 Bad Request'],
      ['EXECUTING', 'fail', '[FAIL] ValidItemShouldPersist'],
      ['EXECUTING', 'fail', 'Expected: 201 | Actual: 400'],
      ['GENERATING_REPORT', 'info', '[allure] anexos fictícios registrados'],
      ['COMPLETED', 'fail', 'Passed: 7 | Failed: 1 | Skipped: 1']
    ])
  };
  function test(id, status, suite, duration, pt, en) {
    return {
      id: id, status: status, suite: suite, duration: duration, name: l(pt, en),
      metadata: ['Epic: Demo Platform', 'Feature: Sample Items', 'Owner: QA Portfolio', 'Severity: normal', 'Category: Smoke'],
      steps: [{ status: status, label: l('Etapa inteiramente fictícia', 'Entirely fictional step') }],
      attachments: [l('Mock Request JSON', 'Mock Request JSON'), l('Mock Response JSON', 'Mock Response JSON')]
    };
  }
  var tests = [
    test('create-kit', 'failed', 'REST / Sample Items', '614 ms', 'ItemFicticioValidoDevePersistir', 'ValidFictionalItemShouldPersist'),
    test('get-kit', 'passed', 'REST / Sample Items', '391 ms', 'ItemFicticioCriadoDeveRetornarDados', 'CreatedFictionalItemShouldReturnData'),
    test('invalid-kit', 'passed', 'REST / Sample Items', '274 ms', 'NomeFicticioAusenteDeveRetornarBadRequest', 'MissingFictionalNameShouldReturnBadRequest'),
    test('graphql-ticket', 'passed', 'GraphQL / Sample Items', '503 ms', 'QueryFicticiaDeveRetornarDados', 'FictionalQueryShouldReturnData'),
    test('graphql-error', 'passed', 'GraphQL / Sample Items', '428 ms', 'QueryFicticiaInvalidaDeveExporErrors', 'InvalidFictionalQueryShouldExposeErrors'),
    test('token-cache', 'passed', 'Core / Mock Authentication', '112 ms', 'TokenFicticioValidoDeveSerReutilizado', 'ValidFictionalTokenShouldBeReused'),
    test('parallel-context', 'passed', 'Core / Mock Execution', '801 ms', 'FixturesParalelasDevemUsarContextosIndependentes', 'ParallelFixturesShouldUseIndependentContexts'),
    test('cleanup', 'passed', 'REST / Mock Cleanup', '318 ms', 'TearDownDeveRemoverDadosFicticios', 'TearDownShouldRemoveFictionalData'),
    test('update-kit', 'skipped', 'REST / Sample Items', '0 ms', 'AtualizarItemFicticioDevePersistir', 'FictionalItemUpdateShouldPersist')
  ];

  window.PlaywrightCaseData = {
    i18n: { pt: commonPt, en: commonEn },
    nodes: nodes,
    flow: flow,
    simulationStates: simulationStates,
    simulations: simulations,
    tests: tests
  };
})();
