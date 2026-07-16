/* Portfolio QA — i18n, tema e efeitos (implementa "Portfolio QA.dc.html"). */
(function () {
  'use strict';

  var I18N = {
    pt: {
      navExp: 'Experiência', navSkills: 'Stack', navProj: 'Projetos', navForm: 'Formação', navContact: 'Contato',
      heroHello: '$ olá, eu sou',
      heroLead: 'Analista de QA com atuação em testes funcionais, exploratórios, automação, APIs e IA aplicada à qualidade. Transformo requisitos em confiança de entrega — da condição de teste ao report do incidente.',
      heroLoc: 'Araçatuba — SP, Brasil',
      ctaContact: 'Entrar em contato',
      termStatus: 'status: qualidade em dia',
      skillsKicker: 'stack técnica', skillsTitle: 'Ferramentas & competências',
      expKicker: 'trajetória', expTitle: 'Experiência',
      expLead: 'Da construção de condições de teste à automação, com foco em entregar produtos de qualidade junto ao time.',
      valAutoT: 'Automação de ponta a ponta',
      valAutoD: 'Playwright, Cypress e C# cobrindo UI e APIs, com resultados visíveis em relatórios Allure.',
      valAiT: 'IA aplicada à qualidade',
      valAiD: 'LLMs com RAG, agentes e MCP integrados ao ciclo de QA e aos processos do negócio.',
      valMetT: 'Qualidade guiada por métricas',
      valMetD: 'Dashboards de métricas e ciclo de vida extraídos do Azure DevOps via WIQL, com análise por IA.',
      valProcT: 'Processo com maturidade',
      valProcD: 'TMMi como referência internacional de qualidade, com Scrum e Kanban no dia a dia do time.',
      projKicker: 'cases', projTitle: 'Projetos & cases de teste',
      projLead: 'Projetos reais construídos ao longo da trajetória — automação, dados e IA aplicados à qualidade de software.',
      projCta: 'Ver no GitHub',
      formKicker: 'formação', formTitle: 'Formação acadêmica',
      formLead: 'Graduação em tecnologia, pós em automação de testes e formação contínua na área de qualidade de software.',
      certTitle: 'Cursos & certificações', langTitle: 'Idiomas',
      contactTitle: 'Vamos conversar sobre qualidade?',
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
        { year: '2023', company: 'Lacrei Saúde', role: 'QA Analyst · Voluntário',
          text: 'Qualidade da plataforma de atendimento clínico para a comunidade LGBTQIAPN+ — condições de teste, cenários em Gherkin, automação com Cypress e report de incidentes.',
          tags: ['Cypress', 'Gherkin', 'Postman', 'Swagger', 'Kanban', 'Figma', 'Notion'] },
        { year: '2023', company: 'Crowdtest', role: 'Tester · Freelance',
          text: 'Testes exploratórios e funcionais em projetos de diversos segmentos, em plataforma de crowdtesting.',
          tags: ['Testes Exploratórios', 'Testes Funcionais', 'Web'] },
        { year: '2023', company: 'uTest', role: 'Tester · Freelance',
          text: 'Testes exploratórios, funcionais, web e mobile em projetos internacionais, incluindo produtos com I.A.',
          tags: ['A.I', 'Mobile', 'Web', 'Testes Exploratórios'] },
        { year: '2014 – 21', company: 'Designer Gráfico', role: 'Freelance',
          text: 'Logotipos, banners, landing pages e social media — base sólida de UX/UI que hoje apoia o olhar crítico de QA sobre interfaces.',
          tags: ['Illustrator', 'Photoshop', 'HTML', 'CSS', 'UX/UI', 'Figma'] }
      ],
      skillGroups: [
        { name: 'Testes', tags: ['Exploratórios', 'Funcionais', 'Web', 'Mobile', 'API'] },
        { name: 'Automação', tags: ['Playwright', 'Cypress', 'C#', 'JavaScript', 'Allure', 'Robot Framework', 'Gherkin / BDD'] },
        { name: 'API & Dados', tags: ['Postman', 'REST', 'GraphQL', 'HotChocolate', 'Swagger', 'SQL Server'] },
        { name: 'IA aplicada à QA', tags: ['LLMs / RAG', 'Ollama', 'Agentes de IA', 'MCP', 'FastAPI', 'OpenWebUI'] },
        { name: 'Processo & Ferramentas', tags: ['Azure DevOps', 'WIQL', 'TMMi', 'Scrum', 'Kanban', 'Notion', 'Figma'] }
      ],
      projects: [
        { kicker: 'Automação de API', title: 'Framework Playwright + C#',
          body: 'Estrutura de automação de checagens de API construída do zero com Playwright e C#, com monitoramento e visão dos resultados via relatórios Allure.', tags: ['Playwright', 'C#', 'Allure'] },
        { kicker: 'Qualidade & Dados', title: 'Dashboard de métricas de QA',
          body: 'App desktop em Electron + React + Tailwind integrado ao Azure DevOps via WIQL: métricas de qualidade, artefatos, estimativas de sprint e análise por IA integrada via MCP.', tags: ['Electron', 'React', 'WIQL', 'MCP'] },
        { kicker: 'IA aplicada', title: 'LLM corporativa com RAG',
          body: 'LLM empresarial com Ollama, OpenWebUI e FastAPI sobre base de conhecimento RAG, com agentes e ferramentas personalizadas conectados ao Azure DevOps e endpoints de negócio.', tags: ['Ollama', 'RAG', 'FastAPI', 'Agentes'] },
        { kicker: 'Automação E2E', title: 'Suíte Cypress — fluxos críticos',
          body: 'Cenários end-to-end escritos em Gherkin e automatizados com Cypress, cobrindo os fluxos críticos da plataforma de atendimento.', tags: ['Cypress', 'Gherkin', 'BDD'] },
        { kicker: 'Testes de API', title: 'Coleções REST & GraphQL',
          body: 'Coleções Postman para validação de contratos, status e payloads em serviços REST e GraphQL, documentados via Swagger.', tags: ['Postman', 'GraphQL', 'Swagger'] },
        { kicker: 'Documentação de QA', title: 'Artefatos & rastreabilidade',
          body: 'Planos e condições de teste, report e tracking de incidentes no Azure DevOps — rastreabilidade do requisito ao defeito.', tags: ['Azure DevOps', 'SQL Server'] }
      ],
      degrees: [
        { type: 'Tecnólogo', course: 'Análise e Desenvolvimento de Sistemas', school: 'Uninter' },
        { type: 'Pós-graduação · Cursando', course: 'PGATS — Automação de Testes de Software', school: 'Faculdade VINCIT' }
      ],
      courses: [
        { name: 'Mentoria em Testes de Software', hours: '90h+' },
        { name: 'Programa de Testes e Qualidade de Software', hours: '85h+' },
        { name: 'test.class — Escola de Testes de Software', hours: '30h+' },
        { name: 'DTAR — Descomplicando Testes de API Rest', hours: '24h+' },
        { name: 'HTML e CSS para Iniciantes', hours: '23h' },
        { name: 'UX Design & UI Design', hours: '17h' },
        { name: 'Automação de Testes com Robot Framework', hours: '7h' },
        { name: 'Testes automatizados com Cypress — Básico', hours: '4,5h' },
        { name: 'Testes automatizados com Cypress — Intermediário', hours: '3,5h' },
        { name: 'Testes automatizados com Cypress — Avançado', hours: '2,5h' }
      ],
      languages: [
        { name: 'Português', level: 'Nativo' },
        { name: 'Inglês', level: 'Intermediário' }
      ]
    },
    en: {
      navExp: 'Experience', navSkills: 'Stack', navProj: 'Projects', navForm: 'Education', navContact: 'Contact',
      heroHello: '$ hi, I am',
      heroLead: 'QA Analyst working across functional, exploratory, automation and API testing — plus AI applied to quality. I turn requirements into delivery confidence — from test condition to incident report.',
      heroLoc: 'Araçatuba — SP, Brazil',
      ctaContact: 'Get in touch',
      termStatus: 'status: quality on track',
      skillsKicker: 'tech stack', skillsTitle: 'Tools & skills',
      expKicker: 'career', expTitle: 'Experience',
      expLead: 'From building test conditions to automation, focused on shipping quality products with the team.',
      valAutoT: 'End-to-end automation',
      valAutoD: 'Playwright, Cypress and C# covering UI and APIs, with results visible in Allure reports.',
      valAiT: 'AI applied to quality',
      valAiD: 'LLMs with RAG, agents and MCP integrated into the QA cycle and business processes.',
      valMetT: 'Metrics-driven quality',
      valMetD: 'Quality and life-cycle dashboards pulled from Azure DevOps via WIQL, with AI analysis.',
      valProcT: 'Mature process',
      valProcD: 'TMMi as the international quality reference, with Scrum and Kanban in the team\'s daily work.',
      projKicker: 'cases', projTitle: 'Projects & test cases',
      projLead: 'Real projects built along the way — automation, data and AI applied to software quality.',
      projCta: 'View on GitHub',
      formKicker: 'education', formTitle: 'Academic background',
      formLead: 'A technology degree, a graduate program in test automation, and continuous learning in software quality.',
      certTitle: 'Courses & certifications', langTitle: 'Languages',
      contactTitle: 'Shall we talk about quality?',
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
        { year: '2023', company: 'Lacrei Saúde', role: 'QA Analyst · Volunteer',
          text: 'Quality for a clinical-care platform serving the LGBTQIAPN+ community — test conditions, Gherkin scenarios, Cypress automation and incident reporting.',
          tags: ['Cypress', 'Gherkin', 'Postman', 'Swagger', 'Kanban', 'Figma', 'Notion'] },
        { year: '2023', company: 'Crowdtest', role: 'Tester · Freelance',
          text: 'Exploratory and functional testing across projects in multiple industries on a crowdtesting platform.',
          tags: ['Exploratory Testing', 'Functional Testing', 'Web'] },
        { year: '2023', company: 'uTest', role: 'Tester · Freelance',
          text: 'Exploratory, functional, web and mobile testing on international projects, including A.I products.',
          tags: ['A.I', 'Mobile', 'Web', 'Exploratory Testing'] },
        { year: '2014 – 21', company: 'Graphic Designer', role: 'Freelance',
          text: 'Logos, banners, landing pages and social media — a solid UX/UI foundation that now backs a critical QA eye on interfaces.',
          tags: ['Illustrator', 'Photoshop', 'HTML', 'CSS', 'UX/UI', 'Figma'] }
      ],
      skillGroups: [
        { name: 'Testing', tags: ['Exploratory', 'Functional', 'Web', 'Mobile', 'API'] },
        { name: 'Automation', tags: ['Playwright', 'Cypress', 'C#', 'JavaScript', 'Allure', 'Robot Framework', 'Gherkin / BDD'] },
        { name: 'API & Data', tags: ['Postman', 'REST', 'GraphQL', 'HotChocolate', 'Swagger', 'SQL Server'] },
        { name: 'AI applied to QA', tags: ['LLMs / RAG', 'Ollama', 'AI agents', 'MCP', 'FastAPI', 'OpenWebUI'] },
        { name: 'Process & Tools', tags: ['Azure DevOps', 'WIQL', 'TMMi', 'Scrum', 'Kanban', 'Notion', 'Figma'] }
      ],
      projects: [
        { kicker: 'API Automation', title: 'Playwright + C# framework',
          body: 'API-check automation framework built from scratch with Playwright and C#, with results monitoring and visibility through Allure reports.', tags: ['Playwright', 'C#', 'Allure'] },
        { kicker: 'Quality & Data', title: 'QA metrics dashboard',
          body: 'Desktop app in Electron + React + Tailwind integrated with Azure DevOps via WIQL: quality metrics, artifacts, sprint estimates and AI analysis integrated via MCP.', tags: ['Electron', 'React', 'WIQL', 'MCP'] },
        { kicker: 'Applied AI', title: 'Enterprise LLM with RAG',
          body: 'In-house LLM with Ollama, OpenWebUI and FastAPI over a RAG knowledge base, with agents and custom tools connected to Azure DevOps and business endpoints.', tags: ['Ollama', 'RAG', 'FastAPI', 'Agents'] },
        { kicker: 'E2E Automation', title: 'Cypress suite — critical flows',
          body: 'End-to-end scenarios written in Gherkin and automated with Cypress, covering the care platform\'s critical flows.', tags: ['Cypress', 'Gherkin', 'BDD'] },
        { kicker: 'API Testing', title: 'REST & GraphQL collections',
          body: 'Postman collections validating contracts, status codes and payloads across REST and GraphQL services, documented with Swagger.', tags: ['Postman', 'GraphQL', 'Swagger'] },
        { kicker: 'QA Documentation', title: 'Artifacts & traceability',
          body: 'Test plans and conditions, incident reporting and tracking in Azure DevOps — traceability from requirement to defect.', tags: ['Azure DevOps', 'SQL Server'] }
      ],
      degrees: [
        { type: 'Associate degree', course: 'Systems Analysis and Development', school: 'Uninter' },
        { type: 'Graduate program · In progress', course: 'PGATS — Software Test Automation', school: 'Faculdade VINCIT' }
      ],
      courses: [
        { name: 'Software Testing Mentorship', hours: '90h+' },
        { name: 'Software Testing & Quality Program', hours: '85h+' },
        { name: 'test.class — Software Testing School', hours: '30h+' },
        { name: 'DTAR — REST API Testing Made Simple', hours: '24h+' },
        { name: 'HTML & CSS for Beginners', hours: '23h' },
        { name: 'UX Design & UI Design', hours: '17h' },
        { name: 'Test Automation with Robot Framework', hours: '7h' },
        { name: 'Automated tests with Cypress — Basic', hours: '4.5h' },
        { name: 'Automated tests with Cypress — Intermediate', hours: '3.5h' },
        { name: 'Automated tests with Cypress — Advanced', hours: '2.5h' }
      ],
      languages: [
        { name: 'Portuguese', level: 'Native' },
        { name: 'English', level: 'Intermediate' }
      ]
    }
  };

  var GITHUB_URL = 'https://github.com/chriscsantosqa';
  var ARROW_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"></path></svg>';

  var state = { lang: 'pt', theme: 'dark' };
  try {
    var th = localStorage.getItem('cq-theme');
    var lg = localStorage.getItem('cq-lang');
    if (th === 'light' || th === 'dark') state.theme = th;
    if (lg === 'pt' || lg === 'en') state.lang = lg;
  } catch (e) {}

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tag(cls, txt) { return '<span class="tag ' + cls + '">' + esc(txt) + '</span>'; }

  /* — tema — */
  function applyTheme() {
    document.body.dataset.theme = state.theme;
  }

  /* — idioma — */
  function applyLang() {
    var t = I18N[state.lang];
    document.documentElement.lang = state.lang === 'pt' ? 'pt-BR' : 'en';
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) el.textContent = t[key];
    });
    $$('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.lang === state.lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    renderLists(t);
  }

  function renderLists(t) {
    $('#skills-grid').innerHTML = t.skillGroups.map(function (grp) {
      return '<div class="card elev-sm skill-card">' +
        '<span class="card-kicker">' + esc(grp.name) + '</span>' +
        '<div class="tags-row">' + grp.tags.map(function (x) { return tag('tag-neutral', x); }).join('') + '</div>' +
        '</div>';
    }).join('');

    $('#exp-list').innerHTML = t.experience.map(function (job) {
      var highlights = job.highlights && job.highlights.length
        ? '<ul class="exp-highlights">' + job.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>'
        : '';
      return '<div class="exp-item">' +
        '<div class="exp-year">' + esc(job.year) + '</div>' +
        '<div>' +
          '<div class="exp-head"><h3>' + esc(job.company) + '</h3><span class="exp-role text-muted">' + esc(job.role) + '</span></div>' +
          '<p class="exp-text">' + esc(job.text) + '</p>' +
          highlights +
          '<div class="exp-tags">' + job.tags.map(function (x) { return tag('tag-accent', x); }).join('') + '</div>' +
        '</div>' +
        '</div>';
    }).join('');

    $('#projects-grid').innerHTML = t.projects.map(function (prj) {
      return '<div class="card elev-sm project-card" data-tilt>' +
        '<span class="card-kicker">' + esc(prj.kicker) + '</span>' +
        '<span class="card-title">' + esc(prj.title) + '</span>' +
        '<p class="card-body">' + esc(prj.body) + '</p>' +
        '<div class="exp-tags">' + prj.tags.map(function (x) { return tag('tag-outline', x); }).join('') + '</div>' +
        '<a class="btn btn-ghost proj-cta" href="' + GITHUB_URL + '" target="_blank" rel="noopener">' + esc(t.projCta) + ARROW_SVG + '</a>' +
        '</div>';
    }).join('');

    $('#degrees-list').innerHTML = t.degrees.map(function (deg) {
      return '<div class="card elev-sm degree-card">' +
        '<span class="card-kicker">' + esc(deg.type) + '</span>' +
        '<span class="card-title">' + esc(deg.course) + '</span>' +
        '<span class="card-meta">' + esc(deg.school) + '</span>' +
        '</div>';
    }).join('');

    $('#langs-list').innerHTML = t.languages.map(function (lng) {
      return '<div class="lang-row"><span>' + esc(lng.name) + '</span>' + tag('tag-accent', lng.level) + '</div>';
    }).join('');

    $('#courses-list').innerHTML = t.courses.map(function (crs) {
      return '<div class="course-row"><span class="course-name">' + esc(crs.name) + '</span>' +
        '<span class="course-hours">' + esc(crs.hours) + '</span></div>';
    }).join('');

    bindTilt();
  }

  /* — efeito de digitação — */
  var typedEl, cursorEl, typeTimer, ri = 0, ci = 0, deleting = false;
  function typeStep() {
    var roles = I18N[state.lang].roles;
    var word = roles[ri % roles.length];
    var delay;
    if (!deleting) {
      ci++;
      if (ci >= word.length) { ci = word.length; deleting = true; delay = 2100; }
      else delay = 80;
    } else {
      ci--;
      if (ci <= 0) { ci = 0; deleting = false; ri++; delay = 500; }
      else delay = 42;
    }
    typedEl.textContent = word.slice(0, ci);
    typeTimer = setTimeout(typeStep, delay);
  }

  /* — tilt 3D nos cards de projeto — */
  function bindTilt() {
    $$('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        el.style.transform = 'perspective(700px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-3px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* — efeitos de entrada, spotlight, progresso e contadores — */
  function initFx() {
    var staggered = $$('[data-stagger]');
    if (!reducedMotion) {
      staggered.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; });
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        staggered.forEach(function (el) {
          var i = parseInt(el.getAttribute('data-stagger'), 10) || 0;
          el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
          el.style.transitionDelay = (i * 90) + 'ms';
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }); });
    }

    var hero = document.getElementById('home');
    var spot = hero && hero.querySelector('.hero-spotlight');
    if (hero && spot) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        spot.style.background = 'radial-gradient(560px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px, color-mix(in srgb, var(--color-accent) 9%, transparent), transparent 65%)';
      });
      hero.addEventListener('mouseleave', function () { spot.style.background = 'transparent'; });
    }

    var bar = $('.progress-bar');
    if (bar) {
      var updateBar = function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      };
      window.addEventListener('scroll', updateBar, { passive: true });
      updateBar();
    }

  }

  /* — reveal ao rolar — */
  function initReveal() {
    if (!('IntersectionObserver' in window) || reducedMotion) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'none';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    $$('[data-reveal]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.92) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(26px)';
        el.style.transition = 'opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)';
        io.observe(el);
      }
    });
  }

  /* — inicialização — */
  document.addEventListener('DOMContentLoaded', function () {
    typedEl = $('#typed');
    cursorEl = $('.typed-cursor');

    applyTheme();
    applyLang();

    $('.theme-toggle').addEventListener('click', function () {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      try { localStorage.setItem('cq-theme', state.theme); } catch (e) {}
    });

    $$('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.lang === state.lang) return;
        state.lang = btn.dataset.lang;
        try { localStorage.setItem('cq-lang', state.lang); } catch (e) {}
        ri = 0; ci = 0; deleting = false;
        applyLang();
        if (reducedMotion) typedEl.textContent = I18N[state.lang].roles[0];
      });
    });

    if (reducedMotion) {
      typedEl.textContent = I18N[state.lang].roles[0];
      if (cursorEl) cursorEl.style.display = 'none';
    } else {
      typeStep();
    }

    setTimeout(initReveal, 120);
    setTimeout(initFx, 60);
  });
})();
