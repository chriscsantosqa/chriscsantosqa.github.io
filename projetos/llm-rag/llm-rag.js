(function () {
  'use strict';

  window.PortfolioCase = {
    i18n: {
      pt: {
        projectCase:'case técnico', navArchitecture:'Arquitetura', navLab:'Laboratório RAG', navKnowledge:'Conhecimento', backPortfolio:'Voltar aos projetos',
        heroKicker:'IA local + RAG', heroLead:'Uma arquitetura local com dois modelos no Ollama, duas APIs especializadas e uma base RAG em Markdown controlada por revisão humana.',
        exploreLab:'Abrir laboratório', exploreArchitecture:'Explorar arquitetura', disclaimer:'Todos os nomes, dados, endpoints, documentos e respostas são fictícios. Nenhum serviço real é consultado.',
        metricModels:'modelos locais complementares', metricApis:'fontes isoladas por domínio', metricGate:'aprovação antes da memória', metricStorage:'conhecimento auditável',
        problemKicker:'problema e decisões', problemTitle:'Transformar consultas operacionais em conhecimento reutilizável', problemLead:'A solução separa acesso a dados, raciocínio do modelo, memória local e aprovação humana para evitar respostas opacas e aprendizado sem controle.',
        decisionOneTitle:'Modelos locais', decisionOneText:'Gemma e Qwen executam no Ollama sem depender de envio de dados para provedores externos.',
        decisionTwoTitle:'APIs por domínio', decisionTwoText:'Uma FastAPI atende artefatos e consultas WIQL; outra concentra consultas GraphQL de catálogo.',
        decisionThreeTitle:'RAG em Markdown', decisionThreeText:'Cada análise vira uma nota versionável, pesquisável e legível fora da aplicação.',
        decisionFourTitle:'Human in the loop', decisionFourText:'Notas entram como rascunho e só alimentam futuras respostas após revisão e aprovação.',
        architectureKicker:'mapa interativo', architectureTitle:'Arquitetura e fluxo de confiança', architectureLead:'Selecione um componente para entender responsabilidade, entrada, saída e limite de segurança.',
        labKicker:'simulador local', labTitle:'Laboratório de consulta RAG', labLead:'Escolha o domínio, o modelo e uma pergunta. A página simula consulta, geração de nota, recuperação de conhecimento aprovado e composição da resposta.',
        domain:'Domínio', workDomain:'Artefatos de trabalho', catalogDomain:'Catálogo de produtos', model:'Modelo', question:'Pergunta', run:'Executar consulta', reset:'Reiniciar',
        stageIdle:'Aguardando consulta', stageRunning:'Processando', stageDone:'Resposta concluída', activity:'Atividade simulada', finalAnswer:'Resposta consolidada', retrieved:'Notas recuperadas',
        knowledgeKicker:'memória controlada', knowledgeTitle:'Base de conhecimento local', knowledgeLead:'As notas abaixo representam arquivos Markdown fictícios. Apenas conteúdos aprovados participam da recuperação RAG.',
        all:'Todas', approved:'Aprovadas', drafts:'Rascunhos', approve:'Aprovar nota', approvedLabel:'Aprovada', draftLabel:'Em revisão', updated:'Atualizado agora', noNotes:'Nenhuma nota neste filtro.',
        valueKicker:'valor entregue', valueTitle:'Por que esta arquitetura é útil', valueLead:'O ganho não está apenas em responder perguntas: está em preservar contexto, reduzir retrabalho e manter responsabilidade humana sobre o conhecimento.',
        valueOne:'Consulta mais rápida', valueOneText:'A LLM combina dados atuais com decisões e análises já revisadas.', valueTwo:'Memória explicável', valueTwoText:'O conhecimento pode ser aberto, editado, revisado e auditado em Markdown.', valueThree:'Domínios independentes', valueThreeText:'Integrações e regras de acesso evoluem sem misturar artefatos com catálogo.', valueFour:'Resposta contextual', valueFourText:'O modelo recebe histórico aprovado, fonte atual e instruções específicas do domínio.',
        footer:'Case demonstrativo de LLM local, FastAPI e RAG com aprovação humana.'
      },
      en: {
        projectCase:'technical case', navArchitecture:'Architecture', navLab:'RAG Lab', navKnowledge:'Knowledge', backPortfolio:'Back to projects',
        heroKicker:'local AI + RAG', heroLead:'A local architecture with two Ollama models, two specialized APIs, and a Markdown RAG knowledge base controlled by human review.',
        exploreLab:'Open laboratory', exploreArchitecture:'Explore architecture', disclaimer:'All names, data, endpoints, documents, and answers are fictional. No real service is queried.',
        metricModels:'complementary local models', metricApis:'sources isolated by domain', metricGate:'approval before memory', metricStorage:'auditable knowledge',
        problemKicker:'problem and decisions', problemTitle:'Turn operational queries into reusable knowledge', problemLead:'The solution separates data access, model reasoning, local memory, and human approval to avoid opaque answers and uncontrolled learning.',
        decisionOneTitle:'Local models', decisionOneText:'Gemma and Qwen run through Ollama without sending data to external model providers.',
        decisionTwoTitle:'Domain APIs', decisionTwoText:'One FastAPI handles work items and WIQL queries; another handles catalog GraphQL queries.',
        decisionThreeTitle:'Markdown RAG', decisionThreeText:'Each analysis becomes a versionable, searchable note readable outside the application.',
        decisionFourTitle:'Human in the loop', decisionFourText:'Notes begin as drafts and only feed future answers after review and approval.',
        architectureKicker:'interactive map', architectureTitle:'Architecture and trust flow', architectureLead:'Select a component to inspect responsibility, input, output, and security boundary.',
        labKicker:'local simulator', labTitle:'RAG query laboratory', labLead:'Choose the domain, model, and a question. The page simulates retrieval, note generation, approved knowledge retrieval, and answer composition.',
        domain:'Domain', workDomain:'Work artifacts', catalogDomain:'Product catalog', model:'Model', question:'Question', run:'Run query', reset:'Reset',
        stageIdle:'Waiting for query', stageRunning:'Processing', stageDone:'Answer completed', activity:'Simulated activity', finalAnswer:'Consolidated answer', retrieved:'Retrieved notes',
        knowledgeKicker:'controlled memory', knowledgeTitle:'Local knowledge base', knowledgeLead:'The notes below represent fictional Markdown files. Only approved content participates in RAG retrieval.',
        all:'All', approved:'Approved', drafts:'Drafts', approve:'Approve note', approvedLabel:'Approved', draftLabel:'In review', updated:'Updated now', noNotes:'No notes in this filter.',
        valueKicker:'delivered value', valueTitle:'Why this architecture is useful', valueLead:'The gain is not only answering questions: it preserves context, reduces repeated analysis, and keeps humans accountable for knowledge.',
        valueOne:'Faster queries', valueOneText:'The LLM combines current data with previously reviewed analysis and decisions.', valueTwo:'Explainable memory', valueTwoText:'Knowledge can be opened, edited, reviewed, and audited as Markdown.', valueThree:'Independent domains', valueThreeText:'Integrations and access rules evolve without mixing work artifacts and catalog data.', valueFour:'Contextual answer', valueFourText:'The model receives approved history, current source data, and domain-specific instructions.',
        footer:'Demonstration case for local LLMs, FastAPI, and human-approved RAG.'
      }
    }
  };

  var domains = {
    work: {
      label:{pt:'Artefatos de trabalho',en:'Work artifacts'}, source:'WIQL + REST', api:'work-items-api',
      questions:{pt:['Quais itens apresentam maior risco para o encerramento da sprint?','Quais impedimentos voltaram a ocorrer nas últimas sprints?','Resuma os principais sinais de qualidade desta sprint.'],en:['Which items present the highest sprint completion risk?','Which blockers have recurred in recent sprints?','Summarize the main quality signals for this sprint.']},
      answer:{pt:'A simulação encontrou três sinais prioritários: dois itens com aging acima do baseline, um bloqueio recorrente ligado a dependência externa e concentração de validações nos últimos dias. A recomendação é revisar ownership, antecipar critérios de aceite e limitar novo trabalho até reduzir o WIP atual.',en:'The simulation found three priority signals: two items with aging above baseline, one recurring blocker linked to an external dependency, and validation work concentrated in the final days. The recommendation is to review ownership, anticipate acceptance criteria, and limit new work until current WIP is reduced.'},
      snippets:['risk-aging.md','blocker-patterns.md','sprint-review-07.md']
    },
    catalog: {
      label:{pt:'Catálogo de produtos',en:'Product catalog'}, source:'GraphQL', api:'catalog-api',
      questions:{pt:['Compare disponibilidade e faixa de preço de três produtos equivalentes.','Quais itens possuem estoque baixo e alternativa disponível?','Resuma as diferenças entre dois laboratórios fictícios.'],en:['Compare availability and price range for three equivalent products.','Which items have low stock and an available alternative?','Summarize the differences between two fictional laboratories.']},
      answer:{pt:'A consulta simulada identificou um item com estoque crítico, duas alternativas ativas e diferença de 12% na faixa de preço. A resposta prioriza disponibilidade, equivalência de descrição e dados aprovados nas notas locais, sem substituir validação comercial ou regulatória.',en:'The simulated query identified one item with critical stock, two active alternatives, and a 12% price-range difference. The answer prioritizes availability, description equivalence, and approved local notes without replacing commercial or regulatory validation.'},
      snippets:['sample-product-a.md','stock-alternatives.md','supplier-comparison.md']
    }
  };

  var notes = [
    {id:'risk-aging.md',domain:'work',status:'approved',title:{pt:'Padrão de aging e risco',en:'Aging and risk pattern'},summary:{pt:'Critérios revisados para destacar itens sem avanço por vários dias.',en:'Reviewed criteria to highlight items without progress for several days.'},tags:['WIQL','Aging','Risk']},
    {id:'blocker-patterns.md',domain:'work',status:'approved',title:{pt:'Bloqueios recorrentes',en:'Recurring blockers'},summary:{pt:'Mapa de causas frequentes e perguntas recomendadas para a daily.',en:'Map of frequent causes and recommended daily questions.'},tags:['Blocker','Sprint']},
    {id:'sprint-review-07.md',domain:'work',status:'draft',title:{pt:'Análise da sprint de demonstração',en:'Demonstration sprint analysis'},summary:{pt:'Rascunho gerado pela LLM aguardando revisão de premissas.',en:'LLM-generated draft waiting for premise review.'},tags:['Review','Draft']},
    {id:'sample-product-a.md',domain:'catalog',status:'approved',title:{pt:'Produto fictício A',en:'Fictional product A'},summary:{pt:'Descrição normalizada, faixa de preço e condições de disponibilidade.',en:'Normalized description, price range, and availability conditions.'},tags:['Product','GraphQL']},
    {id:'stock-alternatives.md',domain:'catalog',status:'approved',title:{pt:'Alternativas para estoque baixo',en:'Alternatives for low stock'},summary:{pt:'Regras revisadas para ordenar alternativas e explicitar limitações.',en:'Reviewed rules to rank alternatives and state limitations.'},tags:['Stock','Alternatives']},
    {id:'supplier-comparison.md',domain:'catalog',status:'draft',title:{pt:'Comparativo de fornecedores fictícios',en:'Fictional supplier comparison'},summary:{pt:'Rascunho sem aprovação, excluído da recuperação RAG.',en:'Unapproved draft excluded from RAG retrieval.'},tags:['Supplier','Draft']}
  ];

  var state = { domain:'work', model:'gemma', noteFilter:'all', running:false, timers:[] };
  function c(){ return window.CaseCommon; }
  function lang(){ return c().getLang(); }
  function loc(value){ return c().localize(value); }
  function esc(value){ return c().escapeHtml(value); }
  function clearTimers(){ state.timers.forEach(clearTimeout); state.timers=[]; state.running=false; }

  function renderQuestions(){
    var select=c().$('#rag-question');
    select.innerHTML=domains[state.domain].questions[lang()].map(function(q,i){return '<option value="'+i+'">'+esc(q)+'</option>';}).join('');
  }

  function renderDomain(){
    c().$$('[data-domain]').forEach(function(btn){btn.classList.toggle('active',btn.dataset.domain===state.domain);});
    c().$('#source-type').textContent=domains[state.domain].source;
    c().$('#api-name').textContent=domains[state.domain].api;
    renderQuestions(); renderNotes(); resetRun();
  }

  function renderNotes(){
    var visible=notes.filter(function(n){return n.domain===state.domain && (state.noteFilter==='all'||n.status===state.noteFilter);});
    c().$('#note-count').textContent=visible.length+' / '+notes.filter(function(n){return n.domain===state.domain;}).length;
    c().$('#knowledge-list').innerHTML=visible.length?visible.map(function(note){
      var status=note.status==='approved'?'success':'warning';
      var label=note.status==='approved'?c().text('approvedLabel'):c().text('draftLabel');
      var action=note.status==='draft'?'<button class="approve-note" data-note="'+esc(note.id)+'">'+esc(c().text('approve'))+'</button>':'';
      return '<article class="knowledge-card"><div class="knowledge-file"><span>MD</span><strong>'+esc(note.id)+'</strong></div><div class="knowledge-copy"><div class="knowledge-title"><h3>'+esc(loc(note.title))+'</h3><span class="status-pill '+status+'"><span class="status-dot '+status+'"></span>'+esc(label)+'</span></div><p>'+esc(loc(note.summary))+'</p><div class="knowledge-tags">'+note.tags.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div></div>'+action+'</article>';
    }).join(''):'<div class="empty-state">'+esc(c().text('noNotes'))+'</div>';
    c().$$('.approve-note').forEach(function(button){button.addEventListener('click',function(){var note=notes.find(function(n){return n.id===button.dataset.note;});if(note){note.status='approved';renderNotes();updateMemoryStats();}});});
  }

  function updateMemoryStats(){
    var domainNotes=notes.filter(function(n){return n.domain===state.domain;});
    c().$('#approved-count').textContent=domainNotes.filter(function(n){return n.status==='approved';}).length;
    c().$('#draft-count').textContent=domainNotes.filter(function(n){return n.status==='draft';}).length;
  }

  function resetRun(){
    clearTimers();
    c().$('#run-rag').disabled=false;
    c().$('#rag-state').textContent=c().text('stageIdle');
    c().$('#rag-log').innerHTML='<span class="log-muted">$ '+esc(c().text('stageIdle'))+'</span>';
    c().$('#rag-answer').textContent='—';
    c().$('#retrieved-notes').innerHTML='';
    c().$$('.pipeline-node').forEach(function(n){n.classList.remove('active','done');});
  }

  function run(){
    if(state.running)return; resetRun(); state.running=true; c().$('#run-rag').disabled=true; c().$('#rag-state').textContent=c().text('stageRunning');
    var d=domains[state.domain]; var selectedQuestion=d.questions[lang()][Number(c().$('#rag-question').value)||0];
    var stages=[
      {id:'prompt',log:'[prompt] '+selectedQuestion},
      {id:'router',log:'[router] domain='+state.domain+' model='+state.model},
      {id:'api',log:'[fastapi] '+d.api+' -> '+d.source+' mock query'},
      {id:'source',log:'[source] 6 records normalized from api.example.test'},
      {id:'rag',log:'[rag] approved notes: '+notes.filter(function(n){return n.domain===state.domain&&n.status==='approved';}).length},
      {id:'model',log:'[ollama] '+(state.model==='gemma'?'Gemma':'Qwen')+' composed answer'},
      {id:'review',log:'[gate] new note saved as draft for human review'}
    ];
    c().$('#rag-log').innerHTML='';
    var delay=c().reducedMotion?70:430;
    stages.forEach(function(stage,index){
      var timer=setTimeout(function(){
        var node=c().$('.pipeline-node[data-stage="'+stage.id+'"]');
        if(node)node.classList.add('active');
        if(index>0){var prev=c().$('.pipeline-node[data-stage="'+stages[index-1].id+'"]');if(prev){prev.classList.remove('active');prev.classList.add('done');}}
        var line=document.createElement('span'); line.className='rag-log-line'; line.textContent=stage.log; c().$('#rag-log').appendChild(line);
        if(index===stages.length-1){
          node.classList.remove('active');node.classList.add('done');state.running=false;c().$('#run-rag').disabled=false;c().$('#rag-state').textContent=c().text('stageDone');
          c().$('#rag-answer').textContent=loc(d.answer)+' '+(state.model==='qwen'?(lang()==='pt'?'O modelo selecionado priorizou uma resposta mais estruturada.':'The selected model prioritized a more structured answer.'):'');
          c().$('#retrieved-notes').innerHTML=d.snippets.filter(function(id){var n=notes.find(function(x){return x.id===id;});return n&&n.status==='approved';}).map(function(id){return '<span>'+esc(id)+'</span>';}).join('');
        }
      },index*delay); state.timers.push(timer);
    });
  }

  function renderArchitectureDetail(component){
    var data={
      ollama:{title:'Ollama',text:{pt:'Hospeda modelos locais e mantém a inferência dentro do ambiente controlado.',en:'Hosts local models and keeps inference inside the controlled environment.'}},
      fastapi:{title:'FastAPI',text:{pt:'Expõe contratos separados para artefatos e catálogo, valida entradas e limita o acesso às fontes.',en:'Exposes separate contracts for artifacts and catalog, validates input, and restricts source access.'}},
      source:{title:{pt:'Fontes operacionais',en:'Operational sources'},text:{pt:'WIQL/REST e GraphQL são consultados somente pela API correspondente.',en:'WIQL/REST and GraphQL are queried only by their corresponding API.'}},
      notes:{title:{pt:'Vault Markdown',en:'Markdown vault'},text:{pt:'Armazena análises legíveis, metadados, fonte, data e status de aprovação.',en:'Stores readable analyses, metadata, source, date, and approval status.'}},
      gate:{title:{pt:'Revisão humana',en:'Human review'},text:{pt:'Impede que conteúdo não revisado influencie respostas futuras.',en:'Prevents unreviewed content from influencing future answers.'}},
      retrieval:{title:'RAG',text:{pt:'Recupera apenas notas aprovadas e relevantes antes da composição da resposta.',en:'Retrieves only approved and relevant notes before answer composition.'}}
    }[component];
    if(!data)return;c().$('#arch-detail-title').textContent=loc(data.title);c().$('#arch-detail-text').textContent=loc(data.text);
    c().$$('.arch-node').forEach(function(n){n.classList.toggle('active',n.dataset.component===component);});
  }

  function bind(){
    c().$$('[data-domain]').forEach(function(btn){btn.addEventListener('click',function(){state.domain=btn.dataset.domain;renderDomain();updateMemoryStats();});});
    c().$('#rag-model').addEventListener('change',function(e){state.model=e.target.value;resetRun();});
    c().$('#run-rag').addEventListener('click',run); c().$('#reset-rag').addEventListener('click',resetRun);
    c().$$('[data-note-filter]').forEach(function(btn){btn.addEventListener('click',function(){state.noteFilter=btn.dataset.noteFilter;c().$$('[data-note-filter]').forEach(function(b){b.classList.toggle('active',b===btn);});renderNotes();});});
    c().$$('.arch-node').forEach(function(node){node.addEventListener('click',function(){renderArchitectureDetail(node.dataset.component);});});
  }

  function renderAll(){renderQuestions();renderNotes();updateMemoryStats();resetRun();renderArchitectureDetail('ollama');}
  window.addEventListener('portfolio-case-language',renderAll);
  document.addEventListener('DOMContentLoaded',function(){bind();renderAll();});
})();
