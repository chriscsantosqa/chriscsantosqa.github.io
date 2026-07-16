(function () {
  'use strict';

  function localized(pt, en) {
    return { pt: pt, en: en };
  }

  function folder(id, name, category, children, description, expanded) {
    return {
      id: id,
      name: name,
      type: 'folder',
      category: category,
      children: children || [],
      expanded: expanded === true,
      title: localized(name, name),
      summary: description || localized('Agrupa componentes relacionados.', 'Groups related components.'),
      responsibility: description || localized('Organizar componentes com a mesma responsabilidade técnica.', 'Organize components with the same technical responsibility.'),
      problem: localized('Evita uma estrutura plana e reduz o custo para localizar uma alteração.', 'Avoids a flat structure and reduces the cost of locating a change.'),
      decision: localized('A organização segue responsabilidade técnica, protocolo e domínio.', 'The organization follows technical responsibility, protocol, and domain.'),
      relations: localized('Contém os arquivos e subpastas exibidos na árvore.', 'Contains the files and subfolders shown in the tree.')
    };
  }

  function file(config) {
    config.type = 'file';
    return config;
  }

  var nodes = [
    folder('root', 'FourBio.AutomatedTests', 'config', [
      folder('src', 'src', 'core', [
        folder('core', 'Core', 'core', [
          folder('auth', 'Auth', 'core', [
            file({
              id: 'token-provider', name: 'TokenProvider.cs', category: 'core', language: 'C#',
              title: localized('TokenProvider.cs', 'TokenProvider.cs'),
              summary: localized('Obtém o token OAuth uma única vez e controla sua renovação com segurança entre fixtures paralelas.', 'Obtains the OAuth token once and safely controls renewal across parallel fixtures.'),
              responsibility: localized('Entregar um access token válido para o setup das fixtures.', 'Provide a valid access token to fixture setup.'),
              problem: localized('Impede autenticações repetidas, condições de corrida e uso de token expirado.', 'Prevents repeated authentication, race conditions, and expired token usage.'),
              decision: localized('Cache estático protegido por SemaphoreSlim, com renovação antecipada e descarte garantido do contexto usado na autenticação.', 'Static cache protected by SemaphoreSlim, with early renewal and guaranteed disposal of the authentication request context.'),
              relations: localized('Lê ConfigurationManager, monta a URL com UrlBuilder, usa PlaywrightSingleton e fornece o token para SetupApiTest.', 'Reads ConfigurationManager, builds the URL with UrlBuilder, uses PlaywrightSingleton, and supplies the token to SetupApiTest.'),
              code: `public static class TokenProvider
{
    private static readonly SemaphoreSlim Mutex = new(1, 1);
    private static string? _accessToken;
    private static DateTime _expiresAtUtc = DateTime.MinValue;

    public static async Task<string> GetTokenAsync()
    {
        if (IsTokenValid()) return _accessToken!;

        await Mutex.WaitAsync();
        try
        {
            if (IsTokenValid()) return _accessToken!;

            var token = await FetchTokenAsync();
            _accessToken = token.AccessToken;
            _expiresAtUtc = DateTime.UtcNow
                .AddSeconds(Math.Max(token.ExpiresIn - 60, 30));

            return _accessToken;
        }
        finally
        {
            Mutex.Release();
        }
    }
}`
            })
          ], localized('Centraliza autenticação e ciclo de vida do token.', 'Centralizes authentication and token lifecycle.'), true),
          folder('core-configs', 'Configs', 'config', [
            file({
              id: 'configuration-manager', name: 'ConfigurationManager.cs', category: 'config', language: 'C#',
              title: localized('ConfigurationManager.cs', 'ConfigurationManager.cs'),
              summary: localized('Combina configurações por ambiente com variáveis de ambiente.', 'Combines environment-specific settings with environment variables.'),
              responsibility: localized('Fornecer URLs, parâmetros não sensíveis e segredos injetados no processo.', 'Provide URLs, non-sensitive parameters, and secrets injected into the process.'),
              problem: localized('Evita credenciais no código e configurações duplicadas em cada teste.', 'Avoids credentials in code and duplicated configuration in each test.'),
              decision: localized('Arquivo JSON para configuração pública e variáveis de ambiente para dados sensíveis.', 'JSON files for public configuration and environment variables for sensitive data.'),
              relations: localized('É consumido por TokenProvider, UrlBuilder, setup de API e setup Web.', 'Consumed by TokenProvider, UrlBuilder, API setup, and Web setup.'),
              code: `public sealed class ConfigurationManager
{
    public static ConfigurationManager Instance { get; } = new();

    private readonly IConfiguration _configuration;

    private ConfigurationManager()
    {
        var environment = Environment.GetEnvironmentVariable(
            "ASPNETCORE_ENVIRONMENT") ?? "Homolog";

        _configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile($"appsettings.{environment}.json", optional: true)
            .AddEnvironmentVariables()
            .Build();
    }

    public string GetRequired(string key) =>
        _configuration[key]
        ?? throw new InvalidOperationException($"Configuração ausente: {key}");
}`
            })
          ], localized('Configura ambientes e parâmetros de execução.', 'Configures environments and execution parameters.')),
          folder('http', 'Http', 'core', [
            file({
              id: 'playwright-singleton', name: 'PlaywrightSingleton.cs', category: 'core', language: 'C#',
              title: localized('PlaywrightSingleton.cs', 'PlaywrightSingleton.cs'),
              summary: localized('Mantém uma instância de IPlaywright durante a execução da suíte.', 'Keeps one IPlaywright instance during the test run.'),
              responsibility: localized('Evitar inicializações repetidas do motor Playwright.', 'Avoid repeated initialization of the Playwright engine.'),
              problem: localized('Reduz custo de inicialização e centraliza o descarte ao final do assembly.', 'Reduces initialization cost and centralizes disposal at assembly shutdown.'),
              decision: localized('Inicialização lazy thread-safe e descarte global controlado.', 'Thread-safe lazy initialization with controlled global disposal.'),
              relations: localized('É usado pelo TokenProvider, SetupApiTest e SetupWebTest.', 'Used by TokenProvider, SetupApiTest, and SetupWebTest.'),
              code: `public static class PlaywrightSingleton
{
    private static readonly SemaphoreSlim Mutex = new(1, 1);
    private static IPlaywright? _instance;

    public static async Task<IPlaywright> GetInstanceAsync()
    {
        if (_instance is not null) return _instance;

        await Mutex.WaitAsync();
        try
        {
            return _instance ??= await Playwright.CreateAsync();
        }
        finally
        {
            Mutex.Release();
        }
    }

    public static void DisposeInstance()
    {
        _instance?.Dispose();
        _instance = null;
    }
}`
            })
          ], localized('Infraestrutura compartilhada do Playwright.', 'Shared Playwright infrastructure.')),
          folder('assertions', 'Assertions', 'core', [
            file({
              id: 'api-assert', name: 'ApiAssert.cs', category: 'core', language: 'C#',
              title: localized('ApiAssert.cs', 'ApiAssert.cs'),
              summary: localized('Expressa validações recorrentes com mensagens de falha orientadas ao diagnóstico.', 'Expresses recurring validations with diagnostic failure messages.'),
              responsibility: localized('Validar status, estrutura JSON, mensagens e respostas GraphQL.', 'Validate status codes, JSON structure, messages, and GraphQL responses.'),
              problem: localized('Evita asserts duplicados e falhas pouco explicativas espalhadas pelos testes.', 'Avoids duplicated assertions and poorly explained failures across tests.'),
              decision: localized('Asserts de alto nível retornam nós já validados para as verificações específicas do cenário.', 'High-level assertions return already validated nodes for scenario-specific checks.'),
              relations: localized('Recebe resultados de ApiClientHelper ou GraphQLClient e utiliza StringNormalizer.', 'Receives results from ApiClientHelper or GraphQLClient and uses StringNormalizer.'),
              code: `public static JToken GraphQLData(
    GraphQLResult result,
    string operation)
{
    Assert.Multiple(() =>
    {
        Assert.That(result.StatusCode, Is.EqualTo(200),
            $"Status inesperado. Corpo: {result.Raw}");

        Assert.That(result.HasErrors, Is.False,
            $"GraphQL retornou errors[]: {result.Errors}");

        Assert.That(result.Data, Is.Not.Null,
            $"Resposta sem data. Corpo: {result.Raw}");
    });

    var node = result.Data?[operation];
    Assert.That(node, Is.Not.Null,
        $"data.{operation} ausente. Corpo: {result.Raw}");

    return node!;
}`
            })
          ], localized('Concentra validações reutilizáveis.', 'Concentrates reusable validations.')),
          folder('utils', 'Utils', 'core', [
            file({
              id: 'string-normalizer', name: 'StringNormalizer.cs', category: 'core', language: 'C#',
              title: localized('StringNormalizer.cs', 'StringNormalizer.cs'),
              summary: localized('Remove caracteres invisíveis e normaliza espaços em mensagens comparadas.', 'Removes invisible characters and normalizes whitespace in compared messages.'),
              responsibility: localized('Estabilizar comparações textuais sem esconder diferenças semânticas.', 'Stabilize text comparisons without hiding semantic differences.'),
              problem: localized('Caracteres de largura zero podem produzir falhas impossíveis de perceber visualmente.', 'Zero-width characters can produce failures that are visually impossible to detect.'),
              decision: localized('Normalização pequena e explícita, aplicada apenas em mensagens onde o formato não é o objetivo do teste.', 'Small, explicit normalization applied only where formatting is not the test objective.'),
              relations: localized('Utilizado principalmente por ApiAssert.', 'Primarily used by ApiAssert.'),
              code: `public static string NormalizeMessage(string? value)
{
    if (string.IsNullOrWhiteSpace(value)) return string.Empty;

    return Regex.Replace(
        value.Replace("\\u200B", string.Empty),
        @"\\s+",
        " ").Trim();
}`
            })
          ], localized('Utilitários pequenos sem dependência de domínio.', 'Small utilities without domain dependencies.'))
        ], localized('Infraestrutura compartilhada entre API e Web.', 'Infrastructure shared by API and Web.'), true),

        folder('api', 'API', 'rest', [
          folder('api-configs', 'Configs', 'config', [
            file({
              id: 'setup-api-test', name: 'SetupApiTest.cs', category: 'config', language: 'C#',
              title: localized('SetupApiTest.cs', 'SetupApiTest.cs'),
              summary: localized('Prepara um contexto autenticado por fixture e entrega os clientes usados nos testes.', 'Prepares one authenticated context per fixture and exposes the clients used by tests.'),
              responsibility: localized('Executar o setup e teardown compartilhados das fixtures de API.', 'Run shared setup and teardown for API fixtures.'),
              problem: localized('Evita setup duplicado e impede que fixtures paralelas compartilhem um recurso descartável.', 'Avoids duplicated setup and prevents parallel fixtures from sharing a disposable resource.'),
              decision: localized('Token compartilhado; APIRequestContext de instância por fixture; descarte no OneTimeTearDown.', 'Shared token; instance APIRequestContext per fixture; disposal in OneTimeTearDown.'),
              relations: localized('Consome TokenProvider e PlaywrightSingleton; cria ApiClientHelper, ApiModel e GraphQLClient.', 'Consumes TokenProvider and PlaywrightSingleton; creates ApiClientHelper, ApiModel, and GraphQLClient.'),
              code: `public abstract class SetupApiTest
{
    protected ApiModel Api { get; private set; } = null!;
    protected GraphQLClient GraphQL { get; private set; } = null!;

    private IAPIRequestContext? _requestContext;

    [OneTimeSetUp]
    public async Task GlobalSetup()
    {
        var token = await TokenProvider.GetTokenAsync();
        var playwright = await PlaywrightSingleton.GetInstanceAsync();

        _requestContext = await playwright.APIRequest.NewContextAsync(new()
        {
            IgnoreHTTPSErrors = true,
            ExtraHTTPHeaders = new Dictionary<string, string>
            {
                ["Authorization"] = $"Bearer {token}",
                ["Content-Type"] = "application/json"
            }
        });

        var client = new ApiClientHelper(_requestContext);
        Api = new ApiModel(client);
        GraphQL = new GraphQLClient(Api);
    }

    [OneTimeTearDown]
    public async Task GlobalTearDown() =>
        await (_requestContext?.DisposeAsync() ?? ValueTask.CompletedTask);
}`
            })
          ], localized('Base comum para fixtures de API.', 'Common base for API fixtures.'), true),
          folder('clients', 'Clients', 'rest', [
            file({
              id: 'api-client-helper', name: 'ApiClientHelper.cs', category: 'rest', language: 'C#',
              title: localized('ApiClientHelper.cs', 'ApiClientHelper.cs'),
              summary: localized('Encapsula operações HTTP do APIRequestContext e padroniza a leitura das respostas.', 'Wraps APIRequestContext HTTP operations and standardizes response reading.'),
              responsibility: localized('Executar GET, POST, PUT e DELETE e devolver corpo mais status.', 'Execute GET, POST, PUT, and DELETE and return body plus status.'),
              problem: localized('Evita serialização, tratamento de corpo e captura de status repetidos em cada teste.', 'Avoids repeated serialization, body handling, and status capture in every test.'),
              decision: localized('Cliente fino: transporte apenas. Regras de validação permanecem em ApiAssert e nos testes.', 'Thin client: transport only. Validation rules remain in ApiAssert and tests.'),
              relations: localized('Criado por SetupApiTest e utilizado por ApiModel e GraphQLClient.', 'Created by SetupApiTest and used by ApiModel and GraphQLClient.'),
              code: `public async Task<ApiResult> PostAsync<T>(string url, T body)
{
    var response = await _context.PostAsync(url, new()
    {
        DataObject = body
    });

    var raw = await response.TextAsync();
    var json = TryParseJson(raw);

    return new ApiResult(json, response.Status, raw);
}`
            }),
            file({
              id: 'graphql-client', name: 'GraphQLClient.cs', category: 'graphql', language: 'C#',
              title: localized('GraphQLClient.cs', 'GraphQLClient.cs'),
              summary: localized('Executa queries GraphQL e separa data, errors e resposta bruta.', 'Executes GraphQL queries and separates data, errors, and raw response.'),
              responsibility: localized('Traduz a resposta HTTP do endpoint GraphQL para um resultado específico do protocolo.', 'Translate the GraphQL endpoint HTTP response into a protocol-specific result.'),
              problem: localized('HTTP 200 não representa sucesso quando a resposta contém errors[].', 'HTTP 200 does not mean success when the response contains errors[].'),
              decision: localized('O modelo GraphQLResult expõe HasErrors explicitamente para impedir falsos positivos.', 'GraphQLResult explicitly exposes HasErrors to prevent false positives.'),
              relations: localized('Usa ApiModel para transporte e entrega o resultado para ApiAssert.GraphQLData.', 'Uses ApiModel for transport and passes the result to ApiAssert.GraphQLData.'),
              code: `public async Task<GraphQLResult> ExecuteAsync(
    string endpoint,
    string query)
{
    var result = await _api.PostAPI(endpoint, new { query });
    var errors = result.Response["errors"] as JArray;

    return new GraphQLResult(
        result.StatusCode,
        result.Response["data"],
        errors,
        result.Response);
}`
            })
          ], localized('Clientes responsáveis apenas pelo transporte.', 'Clients responsible only for transport.'), true),
          folder('factory', 'Factory', 'rest', [
            folder('factory-rest', 'REST', 'rest', [
              file({
                id: 'rest-builder', name: 'GerenciamentoKitBuilder.cs', category: 'rest', language: 'C#',
                title: localized('GerenciamentoKitBuilder.cs', 'GerenciamentoKitBuilder.cs'),
                summary: localized('Cria um payload REST válido por padrão e permite alterar apenas o dado relevante.', 'Creates a valid REST payload by default and lets tests change only the relevant value.'),
                responsibility: localized('Tornar o Arrange legível e reduzir objetos montados manualmente.', 'Make Arrange readable and reduce manually assembled objects.'),
                problem: localized('Payloads extensos copiados em testes escondem a intenção e aumentam manutenção.', 'Large payloads copied into tests hide intent and increase maintenance.'),
                decision: localized('Builder fluente com defaults válidos e Build retornando um objeto independente.', 'Fluent builder with valid defaults and Build returning an independent object.'),
                relations: localized('É usado por testes REST e por TestCaseSource quando existem variações de dados.', 'Used by REST tests and TestCaseSource when data variations exist.'),
                code: `public sealed class GerenciamentoKitBuilder
{
    private string _descricao = "Kit de demonstração";
    private bool _ativo = true;

    public static GerenciamentoKitBuilder Novo() => new();

    public GerenciamentoKitBuilder ComDescricao(string descricao)
    {
        _descricao = descricao;
        return this;
    }

    public GerenciamentoKit Build() => new()
    {
        Descricao = _descricao,
        Ativo = _ativo
    };
}`
              })
            ], localized('Builders, factories e dados para endpoints REST.', 'Builders, factories, and data for REST endpoints.'), true),
            folder('factory-graphql', 'GraphQL', 'graphql', [
              file({
                id: 'graphql-query-factory', name: 'GraphQLQueryFactory.cs', category: 'graphql', language: 'C#',
                title: localized('GraphQLQueryFactory.cs', 'GraphQLQueryFactory.cs'),
                summary: localized('Monta queries GraphQL sem espalhar strings extensas pelos testes.', 'Builds GraphQL queries without spreading long strings across tests.'),
                responsibility: localized('Centralizar seleção de campos, filtros e paginação.', 'Centralize field selection, filters, and pagination.'),
                problem: localized('Queries copiadas dificultam evolução do schema e revisão do cenário.', 'Copied queries make schema evolution and scenario review harder.'),
                decision: localized('Factory focada em construção de query; validação permanece fora dela.', 'Factory focused on query construction; validation remains outside it.'),
                relations: localized('Produz a query enviada por GraphQLClient.', 'Produces the query sent by GraphQLClient.'),
                code: `var query = GraphQLQueryFactory
    .Operation("obterTicket")
    .Argument("take", 1)
    .Where("statusId", "eq", 1)
    .Select("id", "titulo", "statusId")
    .Build();`
              })
            ], localized('Construção e dados para cenários GraphQL.', 'Construction and data for GraphQL scenarios.'), true)
          ], localized('Centraliza criação de payloads e dados de teste.', 'Centralizes payload and test data creation.'), true),
          folder('tests', 'Tests', 'rest', [
            folder('tests-rest', 'REST', 'rest', [
              file({
                id: 'rest-happy-path', name: 'ExemploHappyPathComCleanup.cs', category: 'rest', language: 'C#',
                title: localized('ExemploHappyPathComCleanup.cs', 'ExemploHappyPathComCleanup.cs'),
                summary: localized('Demonstra criação, consulta, validação de persistência e cleanup após o teste.', 'Demonstrates creation, retrieval, persistence validation, and cleanup after the test.'),
                responsibility: localized('Representar o padrão recomendado de happy path para recursos persistentes.', 'Represent the recommended happy-path pattern for persistent resources.'),
                problem: localized('Testes que apenas validam status podem passar sem confirmar persistência e deixar massa residual.', 'Tests that only validate status can pass without confirming persistence and can leave residual data.'),
                decision: localized('Dado único, registro antecipado do ID, round-trip e cleanup no TearDown.', 'Unique data, early ID tracking, round-trip verification, and cleanup in TearDown.'),
                relations: localized('Usa Builder, ApiModel, ApiAssert e metadados Allure.', 'Uses Builder, ApiModel, ApiAssert, and Allure metadata.'),
                code: `[Test]
[Category("Smoke"), Category("Regression")]
public async Task InserirKitValidoDevePersistir()
{
    var descricao = $"Kit demo - {DateTime.UtcNow:yyyyMMdd-HHmmss}";
    var body = GerenciamentoKitBuilder.Novo()
        .ComDescricao(descricao)
        .Build();

    var criacao = await Api.PostAPI(_baseUrl, body);
    ApiAssert.Status(criacao, 201);

    var id = criacao.Response["id"]!.ToString();
    _idsCriados.Add(id);

    var consulta = await Api.GetAPI($"{_baseUrl}/{id}");
    ApiAssert.Status(consulta, 200);
    Assert.That(consulta.Response["descricao"]?.ToString(),
        Is.EqualTo(descricao));
}`
              })
            ], localized('Testes de endpoints REST.', 'REST endpoint tests.'), true),
            folder('tests-graphql', 'GraphQL', 'graphql', [
              file({
                id: 'graphql-happy-path', name: 'ExemploGraphQLHappyPath.cs', category: 'graphql', language: 'C#',
                title: localized('ExemploGraphQLHappyPath.cs', 'ExemploGraphQLHappyPath.cs'),
                summary: localized('Valida HTTP, errors[] e conteúdo de data para uma query GraphQL.', 'Validates HTTP, errors[], and data content for a GraphQL query.'),
                responsibility: localized('Representar o padrão seguro para respostas GraphQL.', 'Represent the safe pattern for GraphQL responses.'),
                problem: localized('Uma query pode retornar HTTP 200 e ainda falhar no protocolo.', 'A query can return HTTP 200 and still fail at protocol level.'),
                decision: localized('ApiAssert.GraphQLData bloqueia o acesso ao nó até confirmar ausência de errors[].', 'ApiAssert.GraphQLData blocks node access until errors[] absence is confirmed.'),
                relations: localized('Usa GraphQLQueryFactory, GraphQLClient e ApiAssert.', 'Uses GraphQLQueryFactory, GraphQLClient, and ApiAssert.'),
                code: `[Test]
public async Task ConsultarTicketDeveRetornarDados()
{
    var query = GraphQLQueryFactory
        .Operation("obterTicket")
        .Argument("take", 1)
        .Select("id", "titulo", "statusId")
        .Build();

    var result = await GraphQL.ExecuteAsync(_endpoint, query);
    var ticket = ApiAssert.GraphQLData(result, "obterTicket");

    Assert.That(ticket["id"], Is.Not.Null);
}`
              })
            ], localized('Testes de queries e mutations GraphQL.', 'GraphQL query and mutation tests.'), true)
          ], localized('Cenários separados por protocolo e domínio.', 'Scenarios separated by protocol and domain.'), true)
        ], localized('Automação de APIs REST e GraphQL.', 'REST and GraphQL API automation.'), true),

        folder('web', 'Web', 'web', [
          folder('web-configs', 'Configs', 'web', [
            file({
              id: 'setup-web-test', name: 'SetupWebTest.cs', category: 'web', language: 'C#',
              title: localized('SetupWebTest.cs', 'SetupWebTest.cs'),
              summary: localized('Prepara browser, contexto, página e tracing para testes de interface.', 'Prepares browser, context, page, and tracing for UI tests.'),
              responsibility: localized('Aplicar o mesmo núcleo de configuração à automação Web.', 'Apply the same configuration core to Web automation.'),
              problem: localized('Evita uma segunda infraestrutura desconectada para testes de interface.', 'Avoids a second disconnected infrastructure for UI tests.'),
              decision: localized('Browser por fixture, contexto e página por teste, tracing preservado em falhas.', 'Browser per fixture, context and page per test, tracing retained on failures.'),
              relations: localized('Compartilha ConfigurationManager e PlaywrightSingleton com a camada de API.', 'Shares ConfigurationManager and PlaywrightSingleton with the API layer.'),
              code: `[SetUp]
public async Task CreatePage()
{
    Context = await Browser.NewContextAsync();
    await Context.Tracing.StartAsync(new()
    {
        Screenshots = true,
        Snapshots = true,
        Sources = true
    });

    Page = await Context.NewPageAsync();
}`
            })
          ], localized('Configuração de execução Web.', 'Web execution configuration.'), true),
          folder('pages', 'Pages', 'web', [], localized('Page Objects com locators e ações, sem asserts.', 'Page Objects with locators and actions, without assertions.')),
          folder('web-tests', 'Tests', 'web', [], localized('Cenários Web que consomem Page Objects.', 'Web scenarios consuming Page Objects.'))
        ], localized('Estrutura preparada para automação de interface com a mesma stack.', 'Structure prepared for UI automation with the same stack.'))
      ], localized('Código-fonte separado entre núcleo, API e Web.', 'Source code separated into core, API, and Web.'), true),

      folder('docs', 'docs', 'config', [
        file({
          id: 'creation-guide', name: 'Guia-Criacao-Testes.md', category: 'config', language: 'Markdown',
          title: localized('Guia de criação de testes', 'Test creation guide'),
          summary: localized('Documenta convenções, exemplos e decisões para quem amplia a suíte.', 'Documents conventions, examples, and decisions for contributors extending the suite.'),
          responsibility: localized('Reduzir conhecimento implícito e manter consistência entre novos testes.', 'Reduce implicit knowledge and keep new tests consistent.'),
          problem: localized('Uma arquitetura só escala quando suas regras estão acessíveis além do código.', 'An architecture scales only when its rules are accessible beyond the code.'),
          decision: localized('Documentação versionada ao lado da implementação e exemplos que compilam junto com a suíte.', 'Versioned documentation beside the implementation and examples that compile with the suite.'),
          relations: localized('Referencia Builders, setups, asserts, execução e relatório.', 'References builders, setups, assertions, execution, and reporting.'),
          code: `# Criando novos testes

1. Escolha o protocolo e o domínio.
2. Reutilize a fixture base adequada.
3. Crie dados válidos com Builder.
4. Altere apenas a condição do cenário.
5. Use ApiAssert para verificações recorrentes.
6. Registre metadados Allure.
7. Garanta cleanup de dados persistidos.`
        })
      ], localized('Documentação técnica versionada.', 'Versioned technical documentation.')),
      folder('pipelines', 'pipelines', 'config', [
        file({
          id: 'ci-pipeline', name: 'ci-playwright.yml', category: 'config', language: 'YAML',
          title: localized('Pipeline de integração contínua', 'Continuous integration pipeline'),
          summary: localized('Restaura, compila, executa testes e publica resultados e relatório.', 'Restores, builds, runs tests, and publishes results and report.'),
          responsibility: localized('Executar a suíte de forma reproduzível fora da máquina do autor.', 'Run the suite reproducibly outside the author’s machine.'),
          problem: localized('Uma suíte sem execução automatizada depende de disciplina manual e perde valor como sinal de entrega.', 'A suite without automated execution depends on manual discipline and loses value as a delivery signal.'),
          decision: localized('Build limpo, filtro por categoria, resultados TRX e artefatos Allure.', 'Clean build, category filtering, TRX results, and Allure artifacts.'),
          relations: localized('Consome o csproj, test.runsettings e allureConfig.json.', 'Consumes the csproj, test.runsettings, and allureConfig.json.'),
          code: `steps:
  - task: UseDotNet@2
    inputs:
      packageType: sdk
      version: 8.x

  - script: dotnet test --configuration Release \
      --logger "trx" \
      --filter "TestCategory=Smoke"
    displayName: Execute smoke tests

  - task: PublishTestResults@2
    inputs:
      testResultsFormat: VSTest
      testResultsFiles: "**/*.trx"`
        })
      ], localized('Automação da execução no CI.', 'Execution automation in CI.')),
      file({
        id: 'allure-config', name: 'allureConfig.json', category: 'config', language: 'JSON',
        title: localized('allureConfig.json', 'allureConfig.json'),
        summary: localized('Define o diretório onde o adapter grava os resultados brutos do Allure.', 'Defines where the adapter writes raw Allure results.'),
        responsibility: localized('Padronizar a saída de relatório em execução local e CI.', 'Standardize report output in local and CI execution.'),
        problem: localized('Resultados espalhados no bin dificultam geração e publicação do relatório.', 'Results scattered in bin folders make report generation and publishing harder.'),
        decision: localized('Diretório previsível na raiz, ignorado pelo Git e publicado como artefato quando necessário.', 'Predictable root directory, ignored by Git and published as an artifact when needed.'),
        relations: localized('Consumido pelo adapter Allure.NUnit e pelo comando allure generate.', 'Consumed by Allure.NUnit adapter and the allure generate command.'),
        code: `{
  "allure": {
    "directory": "../../../allure-results",
    "links": [
      { "type": "issue", "urlTemplate": "https://tracker.demo/{issue}" },
      { "type": "tms", "urlTemplate": "https://tests.demo/{tms}" }
    ]
  }
}`
      }),
      file({
        id: 'runsettings', name: 'test.runsettings', category: 'config', language: 'XML',
        title: localized('test.runsettings', 'test.runsettings'),
        summary: localized('Controla paralelismo e parâmetros do runner sem alterar os testes.', 'Controls runner parallelism and parameters without changing tests.'),
        responsibility: localized('Manter configurações operacionais separadas do código dos cenários.', 'Keep operational settings separate from scenario code.'),
        problem: localized('Configuração implícita gera diferenças entre Visual Studio, terminal e pipeline.', 'Implicit configuration creates differences between Visual Studio, terminal, and pipeline.'),
        decision: localized('Arquivo versionado referenciado diretamente pelo csproj.', 'Versioned file referenced directly by the csproj.'),
        relations: localized('Lido pelo dotnet test e complementado pelos atributos NUnit.', 'Read by dotnet test and complemented by NUnit attributes.'),
        code: `<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
  <NUnit>
    <NumberOfTestWorkers>4</NumberOfTestWorkers>
  </NUnit>
  <RunConfiguration>
    <ResultsDirectory>TestResults</ResultsDirectory>
  </RunConfiguration>
</RunSettings>`
      }),
      file({
        id: 'csproj', name: 'FourBio.AutomatedTests.csproj', category: 'config', language: 'XML',
        title: localized('FourBio.AutomatedTests.csproj', 'FourBio.AutomatedTests.csproj'),
        summary: localized('Declara .NET 8, dependências de teste, conteúdo por ambiente e runsettings.', 'Declares .NET 8, test dependencies, environment content, and runsettings.'),
        responsibility: localized('Definir a composição reproduzível do projeto de testes.', 'Define the reproducible composition of the test project.'),
        problem: localized('Versões transitivas ou dependências não declaradas podem quebrar a suíte silenciosamente.', 'Transitive versions or undeclared dependencies can silently break the suite.'),
        decision: localized('Dependências diretas explícitas e arquivos de configuração copiados para o output.', 'Explicit direct dependencies and configuration files copied to output.'),
        relations: localized('É o ponto de entrada para restore, build, dotnet test e pipeline.', 'Entry point for restore, build, dotnet test, and pipeline.'),
        code: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>annotations</Nullable>
    <IsTestProject>true</IsTestProject>
    <RunSettingsFilePath>$(MSBuildProjectDirectory)\\test.runsettings</RunSettingsFilePath>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Playwright" Version="1.61.0" />
    <PackageReference Include="NUnit" Version="4.4.0" />
    <PackageReference Include="Allure.NUnit" Version="2.15.0" />
    <PackageReference Include="Newtonsoft.Json" Version="13.0.4" />
  </ItemGroup>
</Project>`
      })
    ], localized('Raiz da solução canônica apresentada neste case.', 'Root of the canonical solution presented in this case.'), true)
  ];

  var i18n = {
    pt: {
      projectCase: 'case técnico', navArchitecture: 'Arquitetura', navExecution: 'Execução', navReport: 'Relatório',
      backPortfolio: 'Voltar aos projetos', heroKicker: 'automação de API',
      heroLead: 'Case técnico interativo de uma estrutura de automação para APIs REST e GraphQL, construída com separação de responsabilidades, paralelismo seguro e diagnóstico por relatório.',
      exploreArchitecture: 'Explorar arquitetura', simulateExecution: 'Simular execução',
      sanitizedNote: 'Conteúdo sanitizado para apresentação pública. Nenhuma API real é chamada.',
      metricProtocols: 'dois protocolos, uma base', metricParallel: 'paralelismo por fixture', metricAuth: 'autenticação centralizada', metricReport: 'diagnóstico rastreável',
      contextKicker: 'problema e decisões', contextTitle: 'Por que a estrutura foi criada desta forma', contextLead: 'A arquitetura reduz repetição, protege a execução paralela e deixa cada falha tecnicamente explicável.',
      decisionOneTitle: 'Contexto isolado', decisionOneText: 'Cada fixture recebe seu próprio APIRequestContext. O token é compartilhado, mas o recurso descartável não.',
      decisionTwoTitle: 'Dados expressivos', decisionTwoText: 'Builders criam payloads válidos por padrão. Cada teste altera apenas o campo relevante para o cenário.',
      decisionThreeTitle: 'Asserts de domínio', decisionThreeText: 'Validações repetidas ficam centralizadas, incluindo HTTP, corpo JSON e errors[] do GraphQL.',
      decisionFourTitle: 'Diagnóstico visível', decisionFourText: 'Metadados e etapas chegam ao relatório para reduzir o tempo entre falha, análise e correção.',
      architectureKicker: 'explorador interativo', architectureTitle: 'Arquitetura do projeto', architectureLead: 'Expanda as pastas e selecione um arquivo para entender sua responsabilidade, decisão e relação com o fluxo.',
      searchLabel: 'Buscar arquivo', searchPlaceholder: 'Buscar arquivo ou responsabilidade', filterAll: 'Tudo', filterConfig: 'Configuração', projectExplorer: 'Project Explorer', noFiles: 'Nenhum arquivo encontrado.',
      responsibility: 'Responsabilidade', problemSolved: 'Problema resolvido', architectureDecision: 'Decisão arquitetural', relations: 'Relações',
      flowKicker: 'fluxo de execução', flowTitle: 'Do ambiente ao relatório', flowLead: 'Selecione uma etapa para localizar o componente responsável na árvore.',
      executionKicker: 'execução demonstrativa', executionTitle: 'Simulação visual da suíte', executionLead: 'A simulação representa o comportamento da estrutura no terminal. Os dados são fictícios e não existe comunicação com serviços externos.',
      scenario: 'Cenário', stableRun: 'Execução estável', failureRun: 'Falha demonstrativa', runDemo: 'Executar demonstração', reset: 'Reiniciar', currentState: 'Estado atual', waitingExecution: 'Aguardando execução',
      reportKicker: 'relatório interativo', reportTitle: 'Resultado demonstrativo inspirado no Allure', reportLead: 'Filtre os resultados e abra um teste para visualizar metadados, etapas e anexos simulados.',
      reportDisclaimer: 'Relatório demonstrativo. Não representa uma execução atual de ambiente real.', suites: 'Suites', tests: 'testes', testCases: 'Casos de teste', steps: 'Etapas', attachments: 'Anexos',
      footerText: 'Case técnico de automação de testes de API.', all: 'Todos', passed: 'Aprovados', failed: 'Falhos', skipped: 'Ignorados', duration: 'Duração',
      resultCompleted: 'Execução concluída', resultCompletedFailure: 'Execução concluída com falha demonstrativa', openAttachment: 'Abrir anexo demonstrativo', noTests: 'Nenhum teste neste filtro.'
    },
    en: {
      projectCase: 'technical case', navArchitecture: 'Architecture', navExecution: 'Execution', navReport: 'Report',
      backPortfolio: 'Back to projects', heroKicker: 'API automation',
      heroLead: 'Interactive technical case of a REST and GraphQL API automation structure built with separation of concerns, safe parallelism, and report-driven diagnostics.',
      exploreArchitecture: 'Explore architecture', simulateExecution: 'Simulate execution',
      sanitizedNote: 'Sanitized content for public presentation. No real API is called.',
      metricProtocols: 'two protocols, one foundation', metricParallel: 'parallelism per fixture', metricAuth: 'centralized authentication', metricReport: 'traceable diagnostics',
      contextKicker: 'problem and decisions', contextTitle: 'Why the structure was designed this way', contextLead: 'The architecture reduces repetition, protects parallel execution, and makes each failure technically explainable.',
      decisionOneTitle: 'Isolated context', decisionOneText: 'Each fixture receives its own APIRequestContext. The token is shared, but the disposable resource is not.',
      decisionTwoTitle: 'Expressive data', decisionTwoText: 'Builders create valid payloads by default. Each test changes only the field relevant to the scenario.',
      decisionThreeTitle: 'Domain assertions', decisionThreeText: 'Repeated checks are centralized, including HTTP, JSON body, and GraphQL errors[].',
      decisionFourTitle: 'Visible diagnostics', decisionFourText: 'Metadata and steps reach the report to reduce the time between failure, analysis, and correction.',
      architectureKicker: 'interactive explorer', architectureTitle: 'Project architecture', architectureLead: 'Expand folders and select a file to understand its responsibility, decision, and relationship to the flow.',
      searchLabel: 'Search file', searchPlaceholder: 'Search file or responsibility', filterAll: 'All', filterConfig: 'Configuration', projectExplorer: 'Project Explorer', noFiles: 'No files found.',
      responsibility: 'Responsibility', problemSolved: 'Problem solved', architectureDecision: 'Architecture decision', relations: 'Relations',
      flowKicker: 'execution flow', flowTitle: 'From environment to report', flowLead: 'Select a step to locate the responsible component in the tree.',
      executionKicker: 'demonstration run', executionTitle: 'Visual suite simulation', executionLead: 'The simulation represents the structure behavior in the terminal. Data is fictional and there is no communication with external services.',
      scenario: 'Scenario', stableRun: 'Stable execution', failureRun: 'Demonstration failure', runDemo: 'Run demonstration', reset: 'Reset', currentState: 'Current state', waitingExecution: 'Waiting for execution',
      reportKicker: 'interactive report', reportTitle: 'Demonstration result inspired by Allure', reportLead: 'Filter results and open a test to view simulated metadata, steps, and attachments.',
      reportDisclaimer: 'Demonstration report. It does not represent a current execution in a real environment.', suites: 'Suites', tests: 'tests', testCases: 'Test cases', steps: 'Steps', attachments: 'Attachments',
      footerText: 'Technical case for API test automation.', all: 'All', passed: 'Passed', failed: 'Failed', skipped: 'Skipped', duration: 'Duration',
      resultCompleted: 'Execution completed', resultCompletedFailure: 'Execution completed with a demonstration failure', openAttachment: 'Open demonstration attachment', noTests: 'No tests in this filter.'
    }
  };

  var flow = [
    { id: 'environment', index: '01', label: localized('Ambiente', 'Environment'), fileId: 'configuration-manager' },
    { id: 'authentication', index: '02', label: localized('Autenticação', 'Authentication'), fileId: 'token-provider' },
    { id: 'fixture', index: '03', label: localized('Fixture', 'Fixture'), fileId: 'setup-api-test' },
    { id: 'arrange', index: '04', label: localized('Builder / Query', 'Builder / Query'), fileId: 'rest-builder' },
    { id: 'request', index: '05', label: localized('Request + Assert', 'Request + Assert'), fileId: 'api-assert' },
    { id: 'report', index: '06', label: localized('Allure', 'Allure'), fileId: 'allure-config' }
  ];

  var simulationStates = [
    { id: 'PREPARING', label: localized('Preparando execução', 'Preparing run') },
    { id: 'AUTHENTICATING', label: localized('Autenticando', 'Authenticating') },
    { id: 'DISCOVERING_TESTS', label: localized('Descobrindo testes', 'Discovering tests') },
    { id: 'EXECUTING', label: localized('Executando cenários', 'Executing scenarios') },
    { id: 'GENERATING_REPORT', label: localized('Gerando relatório', 'Generating report') },
    { id: 'COMPLETED', label: localized('Concluído', 'Completed') }
  ];

  var simulations = {
    stable: [
      { state: 'PREPARING', type: 'muted', text: '$ dotnet test --filter "TestCategory=Smoke"' },
      { state: 'PREPARING', type: 'info', text: '[setup] Ambiente carregado: Demo' },
      { state: 'AUTHENTICATING', type: 'info', text: '[auth] Token OAuth disponível no cache' },
      { state: 'AUTHENTICATING', type: 'info', text: '[fixture] APIRequestContext autenticado criado' },
      { state: 'DISCOVERING_TESTS', type: 'muted', text: '[nunit] 8 testes encontrados em 3 fixtures' },
      { state: 'EXECUTING', type: 'info', text: '[REST] POST /v1/kits -> 201 Created' },
      { state: 'EXECUTING', type: 'pass', text: '[PASS] InserirKitValidoDevePersistir (842 ms)' },
      { state: 'EXECUTING', type: 'info', text: '[REST] GET /v1/kits/demo-001 -> 200 OK' },
      { state: 'EXECUTING', type: 'pass', text: '[PASS] ConsultarKitCriadoDeveRetornarDados (391 ms)' },
      { state: 'EXECUTING', type: 'info', text: '[GraphQL] query obterTicket -> HTTP 200, errors[] ausente' },
      { state: 'EXECUTING', type: 'pass', text: '[PASS] ConsultarTicketDeveRetornarDados (517 ms)' },
      { state: 'EXECUTING', type: 'muted', text: '[cleanup] DELETE /v1/kits/demo-001 -> 204 No Content' },
      { state: 'GENERATING_REPORT', type: 'info', text: '[allure] 8 resultados gravados em allure-results/' },
      { state: 'COMPLETED', type: 'pass', text: 'Passed: 8 | Failed: 0 | Skipped: 0 | Duration: 00:00:05.842' }
    ],
    failure: [
      { state: 'PREPARING', type: 'muted', text: '$ dotnet test --filter "TestCategory=Smoke"' },
      { state: 'PREPARING', type: 'info', text: '[setup] Ambiente carregado: Demo' },
      { state: 'AUTHENTICATING', type: 'info', text: '[auth] Novo token OAuth obtido e armazenado no cache' },
      { state: 'DISCOVERING_TESTS', type: 'muted', text: '[nunit] 8 testes encontrados em 3 fixtures' },
      { state: 'EXECUTING', type: 'info', text: '[REST] POST /v1/kits -> 400 Bad Request' },
      { state: 'EXECUTING', type: 'fail', text: '[FAIL] InserirKitValidoDevePersistir (614 ms)' },
      { state: 'EXECUTING', type: 'fail', text: 'Expected: 201 | Actual: 400' },
      { state: 'EXECUTING', type: 'fail', text: 'Response: { "errors": [{ "message": "Descrição é obrigatória." }] }' },
      { state: 'EXECUTING', type: 'pass', text: '[PASS] ConsultarTicketDeveRetornarDados (503 ms)' },
      { state: 'EXECUTING', type: 'warn', text: '[SKIP] AtualizarKitDevePersistirAlteracao — dependência não criada' },
      { state: 'EXECUTING', type: 'muted', text: '[cleanup] Nenhum recurso persistido para remover' },
      { state: 'GENERATING_REPORT', type: 'info', text: '[allure] Falha, response e stack trace anexados' },
      { state: 'COMPLETED', type: 'fail', text: 'Passed: 6 | Failed: 1 | Skipped: 1 | Duration: 00:00:06.421' }
    ]
  };

  var tests = [
    {
      id: 'create-kit', status: 'failed', suite: 'REST / Gerenciamento de Kits', duration: '614 ms',
      name: localized('InserirKitValidoDevePersistir', 'ValidKitCreationShouldPersist'),
      metadata: ['Epic: Televendas', 'Feature: Kits', 'Owner: Christopher', 'Severity: critical', 'Category: Smoke'],
      steps: [
        { status: 'passed', label: localized('Preparar payload único com Builder', 'Prepare unique payload with Builder') },
        { status: 'passed', label: localized('Enviar POST para o endpoint', 'Send POST to endpoint') },
        { status: 'failed', label: localized('Validar HTTP 201', 'Validate HTTP 201') },
        { status: 'skipped', label: localized('Consultar o registro criado', 'Retrieve created record') },
        { status: 'passed', label: localized('Executar cleanup tolerante', 'Run tolerant cleanup') }
      ],
      attachments: [localized('Request JSON', 'Request JSON'), localized('Response JSON', 'Response JSON'), localized('Stack trace', 'Stack trace')]
    },
    {
      id: 'get-kit', status: 'passed', suite: 'REST / Gerenciamento de Kits', duration: '391 ms',
      name: localized('ConsultarKitCriadoDeveRetornarDados', 'CreatedKitQueryShouldReturnData'),
      metadata: ['Epic: Televendas', 'Feature: Kits', 'Owner: Christopher', 'Severity: normal', 'Category: Smoke'],
      steps: [
        { status: 'passed', label: localized('Montar URL com identificador', 'Build URL with identifier') },
        { status: 'passed', label: localized('Enviar GET', 'Send GET') },
        { status: 'passed', label: localized('Validar HTTP 200', 'Validate HTTP 200') },
        { status: 'passed', label: localized('Comparar descrição persistida', 'Compare persisted description') }
      ],
      attachments: [localized('Response JSON', 'Response JSON')]
    },
    {
      id: 'invalid-kit', status: 'passed', suite: 'REST / Gerenciamento de Kits', duration: '274 ms',
      name: localized('DescricaoAusenteDeveRetornarBadRequest', 'MissingDescriptionShouldReturnBadRequest'),
      metadata: ['Epic: Televendas', 'Feature: Kits', 'Owner: Christopher', 'Severity: normal', 'Category: Regression'],
      steps: [
        { status: 'passed', label: localized('Criar payload inválido', 'Create invalid payload') },
        { status: 'passed', label: localized('Enviar POST', 'Send POST') },
        { status: 'passed', label: localized('Validar HTTP 400 e mensagem', 'Validate HTTP 400 and message') }
      ],
      attachments: [localized('Request JSON', 'Request JSON'), localized('Response JSON', 'Response JSON')]
    },
    {
      id: 'graphql-ticket', status: 'passed', suite: 'GraphQL / Tickets', duration: '503 ms',
      name: localized('ConsultarTicketDeveRetornarDados', 'TicketQueryShouldReturnData'),
      metadata: ['Epic: Tickets', 'Feature: Consulta', 'Owner: Christopher', 'Severity: critical', 'Category: Smoke'],
      steps: [
        { status: 'passed', label: localized('Construir query e seleção', 'Build query and selection') },
        { status: 'passed', label: localized('Validar HTTP 200', 'Validate HTTP 200') },
        { status: 'passed', label: localized('Confirmar ausência de errors[]', 'Confirm errors[] is absent') },
        { status: 'passed', label: localized('Validar data.obterTicket', 'Validate data.obterTicket') }
      ],
      attachments: [localized('GraphQL query', 'GraphQL query'), localized('Response JSON', 'Response JSON')]
    },
    {
      id: 'graphql-error', status: 'passed', suite: 'GraphQL / Tickets', duration: '428 ms',
      name: localized('QueryInvalidaDeveExporErrors', 'InvalidQueryShouldExposeErrors'),
      metadata: ['Epic: Tickets', 'Feature: Contrato', 'Owner: Christopher', 'Severity: normal', 'Category: Regression'],
      steps: [
        { status: 'passed', label: localized('Enviar query inválida controlada', 'Send controlled invalid query') },
        { status: 'passed', label: localized('Validar presença de errors[]', 'Validate errors[] presence') },
        { status: 'passed', label: localized('Validar mensagem do protocolo', 'Validate protocol message') }
      ],
      attachments: [localized('GraphQL query', 'GraphQL query'), localized('Response JSON', 'Response JSON')]
    },
    {
      id: 'token-cache', status: 'passed', suite: 'Core / Autenticação', duration: '112 ms',
      name: localized('TokenValidoDeveSerReutilizado', 'ValidTokenShouldBeReused'),
      metadata: ['Epic: Core', 'Feature: OAuth', 'Owner: Christopher', 'Severity: critical', 'Category: Smoke'],
      steps: [
        { status: 'passed', label: localized('Ler token existente', 'Read existing token') },
        { status: 'passed', label: localized('Verificar expiração', 'Check expiration') },
        { status: 'passed', label: localized('Retornar cache sem nova chamada', 'Return cache without a new call') }
      ],
      attachments: [localized('Execution log', 'Execution log')]
    },
    {
      id: 'parallel-context', status: 'passed', suite: 'Core / Execução', duration: '801 ms',
      name: localized('FixturesParalelasDevemUsarContextosIndependentes', 'ParallelFixturesShouldUseIndependentContexts'),
      metadata: ['Epic: Core', 'Feature: Parallelism', 'Owner: Christopher', 'Severity: blocker', 'Category: Regression'],
      steps: [
        { status: 'passed', label: localized('Iniciar duas fixtures', 'Start two fixtures') },
        { status: 'passed', label: localized('Comparar contextos', 'Compare contexts') },
        { status: 'passed', label: localized('Descartar recursos independentemente', 'Dispose resources independently') }
      ],
      attachments: [localized('Parallel execution log', 'Parallel execution log')]
    },
    {
      id: 'cleanup', status: 'passed', suite: 'REST / Cleanup', duration: '318 ms',
      name: localized('TearDownDeveRemoverDadosCriados', 'TearDownShouldRemoveCreatedData'),
      metadata: ['Epic: Core', 'Feature: Data lifecycle', 'Owner: Christopher', 'Severity: normal', 'Category: Regression'],
      steps: [
        { status: 'passed', label: localized('Registrar ID criado', 'Track created ID') },
        { status: 'passed', label: localized('Executar DELETE no TearDown', 'Run DELETE in TearDown') },
        { status: 'passed', label: localized('Registrar resultado no relatório', 'Record result in report') }
      ],
      attachments: [localized('Cleanup log', 'Cleanup log')]
    },
    {
      id: 'update-kit', status: 'skipped', suite: 'REST / Gerenciamento de Kits', duration: '0 ms',
      name: localized('AtualizarKitDevePersistirAlteracao', 'KitUpdateShouldPersistChanges'),
      metadata: ['Epic: Televendas', 'Feature: Kits', 'Owner: Christopher', 'Severity: normal', 'Category: Regression'],
      steps: [
        { status: 'skipped', label: localized('Cenário dependente do recurso criado', 'Scenario depends on created resource') }
      ],
      attachments: [localized('Skip reason', 'Skip reason')]
    }
  ];

  window.PlaywrightCaseData = {
    i18n: i18n,
    nodes: nodes,
    flow: flow,
    simulationStates: simulationStates,
    simulations: simulations,
    tests: tests
  };
})();
