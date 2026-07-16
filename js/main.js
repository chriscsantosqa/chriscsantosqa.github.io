/* Portfolio QA — idioma, tema e efeitos da página principal. */
(function () {
  'use strict';

  var GITHUB_URL = 'https://github.com/chriscsantosqa';
  var PROJECT_CASE_URL = './projetos/playwright-api/';
  var ARROW_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"></path></svg>';

  var I18N = {
    pt: {
      navExp: 'Experiência', navSkills: 'Stack', navProj: 'Projetos', navForm: 'Formação', navContact: 'Contato',
      heroHello: '$ olá, eu sou',
      heroLead: 'Analista de QA com atuação em testes funcionais, exploratórios, automação, APIs e IA aplicada à qualidade. Transformo requisitos em confiança de entrega — da condição de teste ao report do incidente.',
      heroLoc: 'Araçatuba — SP, Brasil', ctaContact: 'Entrar em contato', termStatus: 'status: qualidade em dia',
      skillsKicker: 'stack técnica', skillsTitle: 'Ferramentas & competências',
      expKicker: 'trajetória', expTitle: 'Experiência',
      expLead: 'Da construção de condições de teste à automação, com foco em entregar produtos de qualidade junto ao time.',
      valAutoT: 'Automação de ponta a ponta', valAutoD: 'Playwright, Cypress e C# cobrindo UI e APIs, com resultados visíveis em relatórios Allure.',
      valAiT: 'IA aplicada à qualidade', valAiD: 'LLMs com RAG, agentes e MCP integrados ao ciclo de QA e aos processos do negócio.',
      valMetT: 'Qualidade guiada por métricas', valMetD: 'Dashboards de métricas e ciclo de vida extraídos do Azure DevOps via WIQL, com análise por IA.',
      valProcT: 'Processo com maturidade', valProcD: 'TMMi como referência internacional de qualidade, com Scrum e Kanban no dia a dia do time.',
      projKicker: 'cases', projTitle: 'Projetos & cases de teste',
      projLead: 'Projetos reais construídos ao longo da trajetória — automação, dados e IA aplicados à qualidade de software.',
      projCta: 'Ver no GitHub', formKicker: 'formação', formTitle: 'Formação acadêmica',
      formLead: 'Graduação em tecnologia, pós em automação de testes e formação contínua na área de qualidade de software.',
      certTitle: 'Cursos & certificações', langTitle: 'Idiomas', contactTitle: 'Vamos conversar sobre qualidade?',
      contactLead: 'Aberto a oportunidades e boas conversas sobre testes, automação e qualidade de software. Me chame e marcamos um papo. 👋',
      footerCopy: 'Alguns direitos reservados.',
      roles: ['QA Analyst', 'Automação de Testes', 'Testes de API', 'IA aplicada à Qualidade', 'Testes Exploratórios'],
      experience: [
        { year: '2023 —', company: '4BIO Medicamentos Especiais', role: 'QA Analyst',
          text: 'À frente da implantação do processo de QA da empresa, estruturando a qualidade em todo o ciclo de vida do desenvolvimento — do refinamento à entrega — com automação, métricas e IA aplicadas ao dia a dia do time.',
          highlights: [
            'Implantação da estrutura de automação de checagens de API com Playwright e C#, com monitoramento e visibilidade dos resultados via relatórios Allure.',
            'Implantação do framework TMMi junto ao time, estruturando o processo de qualidade em aderência a referências internacionais.',
            'Planejamento e execução de condições de teste no Azure DevOps, com conhecimento avançado da plataforma e de suas integrações.',
            'Criação de dashboard desktop (Electron, React, JavaScript e Tailwind) integrado ao Azure DevOps via WIQL: métricas de qualidade, ciclo de vida do desenvolvimento, acompanhamento de artefatos, estimativas de sprint e extração de resultados com análise por IA integrada via MCP.',
            'Desenvolvimento de LLM corporativa com Ollama, OpenWebUI, OpenClaw, FastAPI e vault do Obsidian, estruturando base de conhecimento RAG (endpoints e documentos locais) para uso empresarial e de negócios.',
            'Criação de agentes de IA com ferramentas personalizadas para comunicação com o Azure DevOps (análise de artefatos) e com endpoints de negócio (produtos, valores, estoques), elevando a eficiência do time de negócios.',
            'Apoio à gestão no acompanhamento e desenvolvimento de novos colaboradores do time.'
          ],
          tags: ['Playwright', 'C#', 'Allure', 'Azure DevOps', 'TMMi', 'Postman', 'REST', 'GraphQL', 'HotChocolate', 'LLMs / RAG', 'MCP', 'Scrum', 'Kanban'] },
        { year: '2023', company: 'Lacrei Saúde', role: 'QA Analyst · Voluntário', text: 'Qualidade da plataforma de atendimento clínico para a comunidade LGBTQIAPN+ — condições de teste, cenários em Gherkin, automação com Cypress e report de incidentes.', tags: ['Cypress', 'Gherkin', 'Postman', 'Swagger', 'Kanban', 'Figma', 'Notion'] },
        { year: '2023', company: 'Crowdtest', role: 'Tester · Freelance', text: 'Testes exploratórios e funcionais em projetos de diversos segmentos, em plataforma de crowdtesting.', tags: ['Testes Exploratórios', 'Testes Funcionais', 'Web'] },
        { year: '2023', company: 'uTest', role: 'Tester · Freelance', text: 'Testes exploratórios, funcionais, web e mobile em projetos internacionais, incluindo produtos com I.A.', tags: ['A.I', 'Mobile', 'Web', 'Testes Exploratórios'] },
        { year: '2014 – 21', company: 'Designer Gráfico', role: 'Freelance', text: 'Logotipos, banners, landing pages e social media — base sólida de UX/UI que hoje apoia o olhar crítico de QA sobre interfaces.', tags: ['Illustrator', 'Photoshop', 'HTML', 'CSS', 'UX/UI', 'Figma'] }
      ],
      skillGroups: [
        { name: 'Testes', tags: ['Exploratórios', 'Funcionais', 'Web', 'Mobile', 'API'] },
        { name: 'Automação', tags: ['Playwright', 'Cypress', 'C#', 'JavaScript', 'Allure', 'Robot Framework', 'Gherkin / BDD'] },
        { name: 'API & Dados', tags: ['Postman', 'REST', 'GraphQL', 'HotChocolate', 'Swagger', 'SQL Server'] },
        { name: 'IA aplicada à QA', tags: ['LLMs / RAG', 'Ollama', 'Agentes de IA', 'MCP', 'FastAPI', 'OpenWebUI'] },
        { name: 'Processo & Ferramentas', tags: ['Azure DevOps', 'WIQL', 'TMMi', 'Scrum', 'Kanban', 'Notion', 'Figma'] }
      ],
      projects: [
        { kicker: 'Automação de API', title: 'Framework Playwright + C#', body: 'Estrutura de automação de checagens de API construída do zero com Playwright e C#, com monitoramento e visão dos resultados via relatórios Allure.', tags: ['Playwright', 'C#', 'Allure'], url: PROJECT_CASE_URL, cta: 'Explorar projeto' },
        { kicker: 'Qualidade & Dados', title: 'Dashboard de métricas de QA', body: 'App desktop em Electron + React + Tailwind integrado ao Azure DevOps via WIQL: métricas de qualidade, artefatos, estimativas de sprint e análise por IA integrada via MCP.', tags: ['Electron', 'React', 'WIQL', 'MCP'] },
        { kicker: 'IA aplicada', title: 'LLM corporativa com RAG', body: 'LLM empresarial com Ollama, OpenWebUI e FastAPI sobre base de conhecimento RAG, com agentes e ferramentas personalizadas conectados ao Azure DevOps e endpoints de negócio.', tags: ['Ollama', 'RAG', 'FastAPI', 'Agentes'] },
        { kicker: 'Automação E2E', title: 'Suíte Cypress — fluxos críticos', body: 'Cenários end-to-end escritos em Gherkin e automatizados com Cypress, cobrindo os fluxos críticos da plataforma de atendimento.', tags: ['Cypress', 'Gherkin', 'BDD'] },
        { kicker: 'Testes de API', title: 'Coleções REST & GraphQL', body: 'Coleções Postman para validação de contratos, status e payloads em serviços REST e GraphQL, documentados via Swagger.', tags: ['Postman', 'GraphQL', 'Swagger'] },
        { kicker: 'Documentação de QA', title: 'Artefatos & rastreabilidade', body: 'Planos e condições de teste, report e tracking de incidentes no Azure DevOps — rastreabilidade do requisito ao defeito.', tags: ['Azure DevOps', 'SQL Server'] }
      ],
      degrees: [
        { type: 'Tecnólogo', course: 'Análise e Desenvolvimento de Sistemas', school: 'Uninter' },
        { type: 'Pós-graduação · Cursando', course: 'PGATS — Automação de Testes de Software', school: 'Faculdade VINCIT' }
      ],
      courses: [
        { name: 'Mentoria em Testes de Software', hours: '90h+' }, { name: 'Programa de Testes e Qualidade de Software', hours: '85h+' },
        { name: 'test.class — Escola de Testes de Software', hours: '30h+' }, { name: 'DTAR — Descomplicando Testes de API Rest', hours: '24h+' },
        { name: 'HTML e CSS para Iniciantes', hours: '23h' }, { name: 'UX Design & UI Design', hours: '17h' },
        { name: 'Automação de Testes com Robot Framework', hours: '7h' }, { name: 'Testes automatizados com Cypress — Básico', hours: '4,5h' },
        { name: 'Testes automatizados com Cypress — Intermediário', hours: '3,5h' }, { name: 'Testes automatizados com Cypress — Avançado', hours: '2,5h' }
      ],
      languages: [{ name: 'Português', level: 'Nativo' }, { name: 'Inglês', level: 'Intermediário' }]
    },
    en: {
      navExp: 'Experience', navSkills: 'Stack', navProj: 'Projects', navForm: 'Education', navContact: 'Contact',
      heroHello: '$ hi, I am', heroLead: 'QA Analyst working across functional, exploratory, automation and API testing — plus AI applied to quality. I turn requirements into delivery confidence — from test condition to incident report.',
      heroLoc: 'Araçatuba — SP, Brazil', ctaContact: 'Get in touch', termStatus: 'status: quality on track',
      skillsKicker: 'tech stack', skillsTitle: 'Tools & skills', expKicker: 'career', expTitle: 'Experience',
      expLead: 'From building test conditions to automation, focused on shipping quality products with the team.',
      valAutoT: 'End-to-end automation', valAutoD: 'Playwright, Cypress and C# covering UI and APIs, with results visible in Allure reports.',
      valAiT: 'AI applied to quality', valAiD: 'LLMs with RAG, agents and MCP integrated into the QA cycle and business processes.',
      valMetT: 'Metrics-driven quality', valMetD: 'Quality and life-cycle dashboards pulled from Azure DevOps via WIQL, with AI analysis.',
      valProcT: 'Mature process', valProcD: 'TMMi as the international quality reference, with Scrum and Kanban in the team\'s daily work.',
      projKicker: 'cases', projTitle: 'Projects & test cases', projLead: 'Real projects built along the way — automation, data and AI applied to software quality.',
      projCta: 'View on GitHub', formKicker: 'education', formTitle: 'Academic background',
      formLead: 'A technology degree, a graduate program in test automation, and continuous learning in software quality.',
      certTitle: 'Courses & certifications', langTitle: 'Languages', contactTitle: 'Shall we talk about quality?',
      contactLead: 'Open to opportunities and good conversations about testing, automation and software quality. Reach out and let\'s chat. 👋',
      footerCopy: 'Some rights reserved.',
      roles: ['QA Analyst', 'Test Automation', 'API Testing', 'AI applied to QA', 'Exploratory Testing'],
      experience: [
        { year: '2023 —', company: '4BIO Medicamentos Especiais', role: 'QA Analyst',
          text: 'Leading the implementation of the company\'s QA process, structuring quality across the whole development life cycle — from refinement to delivery — bringing automation, metrics and AI into the team\'s daily work.',
          highlights: [
            'Built the API-check automation framework with Playwright and C#, with results monitoring and visibility through Allure reports.',
            'Helped roll out the TMMi framework with the team, structuring the quality process in line with international references.',
            'Planned and executed test conditions in Azure DevOps, with advanced knowledge of the platform and its integrations.',
            'Created a desktop dashboard (Electron, React, JavaScript and Tailwind) integrated with Azure DevOps via WIQL: quality metrics, development life cycle, artifact tracking, sprint estimates and results extraction with AI analysis integrated via MCP.',
            'Developed an enterprise LLM with Ollama, OpenWebUI, OpenClaw, FastAPI and an Obsidian vault, structuring a RAG knowledge base (endpoints and local documents) for business use.',
            'Created AI agents with custom-built tools talking to Azure DevOps (artifact analysis) and to business endpoints (products, prices, stock), boosting the business team\'s efficiency.',
            'Supported management in following up and developing new team members.'
          ],
          tags: ['Playwright', 'C#', 'Allure', 'Azure DevOps', 'TMMi', 'Postman', 'REST', 'GraphQL', 'HotChocolate', 'LLMs / RAG', 'MCP', 'Scrum', 'Kanban'] },
        { year: '2023', company: 'Lacrei Saúde', role: 'QA Analyst · Volunteer', text: 'Quality for a clinical-care platform serving the LGBTQIAPN+ community — test conditions, Gherkin scenarios, Cypress automation and incident reporting.', tags: ['Cypress', 'Gherkin', 'Postman', 'Swagger', 'Kanban', 'Figma', 'Notion'] },
        { year: '2023', company: 'Crowdtest', role: 'Tester · Freelance', text: 'Exploratory and functional testing across projects in multiple industries on a crowdtesting platform.', tags: ['Exploratory Testing', 'Functional Testing', 'Web'] },
        { year: '2023', company: 'uTest', role: 'Tester · Freelance', text: 'Exploratory, functional, web and mobile testing on international projects, including A.I products.', tags: ['A.I', 'Mobile', 'Web', 'Exploratory Testing'] },
        { year: '2014 – 21', company: 'Graphic Designer', role: 'Freelance', text: 'Logos, banners, landing pages and social media — a solid UX/UI foundation that now backs a critical QA eye on interfaces.', tags: ['Illustrator', 'Photoshop', 'HTML', 'CSS', 'UX/UI', 'Figma'] }
      ],
      skillGroups: [
        { name: 'Testing', tags: ['Exploratory', 'Functional', 'Web', 'Mobile', 'API'] },
        { name: 'Automation', tags: ['Playwright', 'Cypress', 'C#', 'JavaScript', 'Allure', 'Robot Framework', 'Gherkin / BDD'] },
        { name: 'API & Data', tags: ['Postman', 'REST', 'GraphQL', 'HotChocolate', 'Swagger', 'SQL Server'] },
        { name: 'AI applied to QA', tags: ['LLMs / RAG', 'Ollama', 'AI agents', 'MCP', 'FastAPI', 'OpenWebUI'] },
        { name: 'Process & Tools', tags: ['Azure DevOps', 'WIQL', 'TMMi', 'Scrum', 'Kanban', 'Notion', 'Figma'] }
      ],
      projects: [
        { kicker: 'API Automation', title: 'Playwright + C# framework', body: 'API-check automation framework built from scratch with Playwright and C#, with results monitoring and visibility through Allure reports.', tags: ['Playwright', 'C#', 'Allure'], url: PROJECT_CASE_URL, cta: 'Explore project' },
        { kicker: 'Quality & Data', title: 'QA metrics dashboard', body: 'Desktop app in Electron + React + Tailwind integrated with Azure DevOps via WIQL: quality metrics, artifacts, sprint estimates and AI analysis integrated via MCP.', tags: ['Electron', 'React', 'WIQL', 'MCP'] },
        { kicker: 'Applied AI', title: 'Enterprise LLM with RAG', body: 'In-house LLM with Ollama, OpenWebUI and FastAPI over a RAG knowledge base, with agents and custom tools connected to Azure DevOps and business endpoints.', tags: ['Ollama', 'RAG', 'FastAPI', 'Agents'] },
        { kicker: 'E2E Automation', title: 'Cypress suite — critical flows', body: 'End-to-end scenarios written in Gherkin and automated with Cypress, covering the care platform\'s critical flows.', tags: ['Cypress', 'Gherkin', 'BDD'] },
        { kicker: 'API Testing', title: 'REST & GraphQL collections', body: 'Postman collections validating contracts, status codes and payloads across REST and GraphQL services, documented with Swagger.', tags: ['Postman', 'GraphQL', 'Swagger'] },
        { kicker: 'QA Documentation', title: 'Artifacts & traceability', body: 'Test plans and conditions, incident reporting and tracking in Azure DevOps — traceability from requirement to defect.', tags: ['Azure DevOps', 'SQL Server'] }
      ],
      degrees: [
        { type: 'Associate degree', course: 'Systems Analysis and Development', school: 'Uninter' },
        { type: 'Graduate program · In progress', course: 'PGATS — Software Test Automation', school: 'Faculdade VINCIT' }
      ],
      courses: [
        { name: 'Software Testing Mentorship', hours: '90h+' }, { name: 'Software Testing & Quality Program', hours: '85h+' },
        { name: 'test.class — Software Testing School', hours: '30h+' }, { name: 'DTAR — REST API Testing Made Simple', hours: '24h+' },
        { name: 'HTML & CSS for Beginners', hours: '23h' }, { name: 'UX Design & UI Design', hours: '17h' },
        { name: 'Test Automation with Robot Framework', hours: '7h' }, { name: 'Automated tests with Cypress — Basic', hours: '4.5h' },
        { name: 'Automated tests with Cypress — Intermediate', hours: '3.5h' }, { name: 'Automated tests with Cypress — Advanced', hours: '2.5h' }
      ],
      languages: [{ name: 'Portuguese', level: 'Native' }, { name: 'English', level: 'Intermediate' }]
    }
  };

  var state = { lang: 'pt', theme: 'dark' };
  try {
    var savedTheme = localStorage.getItem('cq-theme');
    var savedLang = localStorage.getItem('cq-lang');
    if (savedTheme === 'light' || savedTheme === 'dark') state.theme = savedTheme;
    if (savedLang === 'pt' || savedLang === 'en') state.lang = savedLang;
  } catch (error) {}

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typedElement;
  var cursorElement;
  var typeTimer;
  var roleIndex = 0;
  var characterIndex = 0;
  var deleting = false;

  function $(selector, context) { return (context || document).querySelector(selector); }
  function $$(selector, context) { return Array.prototype.slice.call((context || document).querySelectorAll(selector)); }
  function escapeHtml(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tag(className, value) { return '<span class="tag ' + className + '">' + escapeHtml(value) + '</span>'; }

  function applyTheme() { document.body.dataset.theme = state.theme; }

  function projectLink(project, translation) {
    var url = project.url || GITHUB_URL;
    var external = /^https?:\/\//i.test(url);
    var attributes = external ? ' target="_blank" rel="noopener"' : '';
    var label = project.cta || translation.projCta;
    return '<a class="btn btn-ghost proj-cta" href="' + escapeHtml(url) + '"' + attributes + '>' + escapeHtml(label) + ARROW_SVG + '</a>';
  }

  function renderLists(translation) {
    $('#skills-grid').innerHTML = translation.skillGroups.map(function (group) {
      return '<div class="card elev-sm skill-card"><span class="card-kicker">' + escapeHtml(group.name) + '</span><div class="tags-row">' + group.tags.map(function (item) { return tag('tag-neutral', item); }).join('') + '</div></div>';
    }).join('');

    $('#exp-list').innerHTML = translation.experience.map(function (job) {
      var highlights = job.highlights && job.highlights.length ? '<ul class="exp-highlights">' + job.highlights.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') + '</ul>' : '';
      return '<div class="exp-item"><div class="exp-year">' + escapeHtml(job.year) + '</div><div><div class="exp-head"><h3>' + escapeHtml(job.company) + '</h3><span class="exp-role text-muted">' + escapeHtml(job.role) + '</span></div><p class="exp-text">' + escapeHtml(job.text) + '</p>' + highlights + '<div class="exp-tags">' + job.tags.map(function (item) { return tag('tag-accent', item); }).join('') + '</div></div></div>';
    }).join('');

    $('#projects-grid').innerHTML = translation.projects.map(function (project) {
      return '<div class="card elev-sm project-card" data-tilt><span class="card-kicker">' + escapeHtml(project.kicker) + '</span><span class="card-title">' + escapeHtml(project.title) + '</span><p class="card-body">' + escapeHtml(project.body) + '</p><div class="exp-tags">' + project.tags.map(function (item) { return tag('tag-outline', item); }).join('') + '</div>' + projectLink(project, translation) + '</div>';
    }).join('');

    $('#degrees-list').innerHTML = translation.degrees.map(function (degree) {
      return '<div class="card elev-sm degree-card"><span class="card-kicker">' + escapeHtml(degree.type) + '</span><span class="card-title">' + escapeHtml(degree.course) + '</span><span class="card-meta">' + escapeHtml(degree.school) + '</span></div>';
    }).join('');

    $('#langs-list').innerHTML = translation.languages.map(function (language) {
      return '<div class="lang-row"><span>' + escapeHtml(language.name) + '</span>' + tag('tag-accent', language.level) + '</div>';
    }).join('');

    $('#courses-list').innerHTML = translation.courses.map(function (course) {
      return '<div class="course-row"><span class="course-name">' + escapeHtml(course.name) + '</span><span class="course-hours">' + escapeHtml(course.hours) + '</span></div>';
    }).join('');

    bindTilt();
  }

  function applyLanguage() {
    var translation = I18N[state.lang];
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    $$('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      if (translation[key]) element.textContent = translation[key];
    });
    $$('.lang-btn').forEach(function (button) {
      var active = button.dataset.lang === state.lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    renderLists(translation);
  }

  function typeStep() {
    var roles = I18N[state.lang].roles;
    var word = roles[roleIndex % roles.length];
    var delay;
    if (!deleting) {
      characterIndex += 1;
      if (characterIndex >= word.length) { characterIndex = word.length; deleting = true; delay = 2100; }
      else delay = 80;
    } else {
      characterIndex -= 1;
      if (characterIndex <= 0) { characterIndex = 0; deleting = false; roleIndex += 1; delay = 500; }
      else delay = 42;
    }
    typedElement.textContent = word.slice(0, characterIndex);
    typeTimer = setTimeout(typeStep, delay);
  }

  function bindTilt() {
    $$('[data-tilt]').forEach(function (element) {
      element.addEventListener('mousemove', function (event) {
        var rect = element.getBoundingClientRect();
        var rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
        var rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
        element.style.transform = 'perspective(700px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-3px)';
      });
      element.addEventListener('mouseleave', function () { element.style.transform = ''; });
    });
  }

  function initializeEffects() {
    var staggered = $$('[data-stagger]');
    if (!reducedMotion) {
      staggered.forEach(function (element) { element.style.opacity = '0'; element.style.transform = 'translateY(20px)'; });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          staggered.forEach(function (element) {
            var index = parseInt(element.getAttribute('data-stagger'), 10) || 0;
            element.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
            element.style.transitionDelay = (index * 90) + 'ms';
            element.style.opacity = '1';
            element.style.transform = 'none';
          });
        });
      });
    }

    var hero = document.getElementById('home');
    var spotlight = hero && hero.querySelector('.hero-spotlight');
    if (hero && spotlight) {
      hero.addEventListener('mousemove', function (event) {
        var rect = hero.getBoundingClientRect();
        spotlight.style.background = 'radial-gradient(560px circle at ' + (event.clientX - rect.left) + 'px ' + (event.clientY - rect.top) + 'px, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 65%)';
      });
      hero.addEventListener('mouseleave', function () { spotlight.style.background = 'transparent'; });
    }

    var progress = $('.progress-bar');
    if (progress) {
      var updateProgress = function () {
        var root = document.documentElement;
        var maximum = root.scrollHeight - root.clientHeight;
        progress.style.width = (maximum > 0 ? (root.scrollTop / maximum) * 100 : 0) + '%';
      };
      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress();
    }
  }

  function initializeReveal() {
    if (!('IntersectionObserver' in window) || reducedMotion) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    $$('[data-reveal]').forEach(function (element) {
      if (element.getBoundingClientRect().top > window.innerHeight * 0.92) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(26px)';
        element.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
        observer.observe(element);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    typedElement = $('#typed');
    cursorElement = $('.typed-cursor');
    applyTheme();
    applyLanguage();

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
        roleIndex = 0;
        characterIndex = 0;
        deleting = false;
        applyLanguage();
        if (reducedMotion) typedElement.textContent = I18N[state.lang].roles[0];
      });
    });

    if (reducedMotion) {
      typedElement.textContent = I18N[state.lang].roles[0];
      if (cursorElement) cursorElement.style.display = 'none';
    } else {
      typeStep();
    }

    setTimeout(initializeReveal, 120);
    setTimeout(initializeEffects, 60);
  });
})();
