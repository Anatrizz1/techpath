/* =============================================
   TECHPATH — QUIZ ENGINE
   Arquivo: quiz.js

   MELHORIAS DE CONVERSÃO IMPLEMENTADAS:
   1. Tela de análise com simulação de IA (~3s)
   2. Ranking de compatibilidade com posições e %
   3. Seção premium melhorada (no HTML)
   4. Botão de compra com copy mais forte (no HTML)
   5. Prova social e urgência (no HTML)
============================================= */

/* -----------------------------------------------
   DADOS DO QUIZ
   Cada opção soma pontos por categoria:
   frontend | backend | data | devops | cybersecurity | ux
----------------------------------------------- */
const questions = [
  {
    text: "Como você prefere passar seu tempo livre?",
    options: [
      { label: "Personalizando o visual de apps e sites",           scores: { frontend:3, ux:2 } },
      { label: "Resolvendo problemas lógicos ou matemáticos",       scores: { backend:3, data:2 } },
      { label: "Analisando padrões e gráficos de dados",            scores: { data:3, devops:1 } },
      { label: "Organizando sistemas e automatizando tarefas",       scores: { devops:3, backend:1 } },
    ]
  },
  {
    text: "Qual dessas atividades te dá mais satisfação?",
    options: [
      { label: "Ver um design bonito ganhar vida no navegador",     scores: { frontend:3, ux:2 } },
      { label: "Criar uma API que funciona perfeitamente",          scores: { backend:3, devops:1 } },
      { label: "Encontrar insights escondidos em dados",            scores: { data:3, backend:1 } },
      { label: "Proteger um sistema de invasões",                   scores: { cybersecurity:3, devops:1 } },
    ]
  },
  {
    text: "Qual dessas frases mais combina com você?",
    options: [
      { label: '"Detalhes visuais fazem toda a diferença"',         scores: { frontend:3, ux:3 } },
      { label: '"Prefiro entender como as coisas funcionam por dentro"', scores: { backend:3, devops:2 } },
      { label: '"Dados nunca mentem — basta saber interpretá-los"', scores: { data:3, cybersecurity:1 } },
      { label: '"Segurança não é opcional, é obrigatória"',         scores: { cybersecurity:3, devops:2 } },
    ]
  },
  {
    text: "Se você pudesse escolher um projeto, qual seria?",
    options: [
      { label: "Criar um app mobile com visual incrível",           scores: { frontend:3, ux:2 } },
      { label: "Desenvolver um sistema de pagamentos escalável",     scores: { backend:3, devops:1 } },
      { label: "Construir um modelo de previsão de vendas com IA",  scores: { data:3, backend:1 } },
      { label: "Fazer pentest em um sistema real",                   scores: { cybersecurity:3 } },
    ]
  },
  {
    text: "Como você se sente com relação a interfaces e design?",
    options: [
      { label: "Amo criar e detalhar cada elemento visual",         scores: { frontend:3, ux:3 } },
      { label: "Prefiro que funcione; o visual é secundário",       scores: { backend:3, devops:1 } },
      { label: "Me interessa o comportamento do usuário",           scores: { ux:3, data:2 } },
      { label: "Design é importante mas segurança vem primeiro",    scores: { cybersecurity:2, ux:1 } },
    ]
  },
  {
    text: "Qual dessas tecnologias te desperta mais curiosidade?",
    options: [
      { label: "React, Vue, CSS animações",                         scores: { frontend:3 } },
      { label: "Node.js, Python, bancos de dados",                  scores: { backend:3 } },
      { label: "Python, TensorFlow, Jupyter",                       scores: { data:3 } },
      { label: "Docker, Kubernetes, AWS",                           scores: { devops:3 } },
    ]
  },
  {
    text: "Diante de um bug, como você costuma agir?",
    options: [
      { label: "Inspeciono o elemento e vejo o que está errado no visual", scores: { frontend:2, ux:1 } },
      { label: "Leio os logs e debugo o código linha a linha",      scores: { backend:3 } },
      { label: "Analiso os dados de entrada e saída",               scores: { data:2, backend:1 } },
      { label: "Verifico se não é um problema de segurança ou infraestrutura", scores: { cybersecurity:2, devops:2 } },
    ]
  },
  {
    text: "O que você mais valoriza num produto digital?",
    options: [
      { label: "Visual bonito e experiência fluida",                scores: { frontend:2, ux:3 } },
      { label: "Performance e estabilidade",                        scores: { backend:3, devops:1 } },
      { label: "Decisões baseadas em dados reais",                  scores: { data:3 } },
      { label: "Privacidade e proteção dos dados do usuário",       scores: { cybersecurity:3 } },
    ]
  },
  {
    text: "Qual área de estudo te atrai mais?",
    options: [
      { label: "Design de interfaces e usabilidade",                scores: { ux:3, frontend:2 } },
      { label: "Estrutura de dados, algoritmos e APIs",             scores: { backend:3 } },
      { label: "Estatística, machine learning e IA",                scores: { data:3 } },
      { label: "Redes, sistemas operacionais e criptografia",       scores: { cybersecurity:3, devops:2 } },
    ]
  },
  {
    text: "Como você prefere trabalhar?",
    options: [
      { label: "Em equipe, com foco no produto final visível",      scores: { frontend:2, ux:2 } },
      { label: "Com autonomia em problemas técnicos complexos",      scores: { backend:3 } },
      { label: "Explorando dados de forma investigativa",           scores: { data:3 } },
      { label: "Garantindo que a infraestrutura não vai cair",      scores: { devops:3, cybersecurity:1 } },
    ]
  },
  {
    text: "Qual dessas ferramentas você usaria primeiro?",
    options: [
      { label: "Figma + código CSS",                                scores: { frontend:2, ux:2 } },
      { label: "VSCode + banco de dados",                           scores: { backend:3 } },
      { label: "Jupyter Notebook + pandas",                         scores: { data:3 } },
      { label: "Terminal Linux + ferramentas de rede",              scores: { devops:2, cybersecurity:2 } },
    ]
  },
  {
    text: "O que te motivaria a acordar todo dia para trabalhar?",
    options: [
      { label: "Ver meu trabalho sendo usado por milhares de pessoas", scores: { frontend:2, ux:2 } },
      { label: "Resolver problemas técnicos difíceis",              scores: { backend:3 } },
      { label: "Descobrir padrões que ninguém havia visto",         scores: { data:3 } },
      { label: "Proteger sistemas de ataques reais",                scores: { cybersecurity:3 } },
    ]
  },
  {
    text: "Qual dessas áreas te parece mais impactante?",
    options: [
      { label: "Criar experiências digitais incríveis",             scores: { ux:3, frontend:2 } },
      { label: "Construir sistemas que escalam para milhões",       scores: { backend:3, devops:1 } },
      { label: "Usar dados para guiar decisões estratégicas",       scores: { data:3 } },
      { label: "Garantir a privacidade e segurança digital",        scores: { cybersecurity:3 } },
    ]
  },
  {
    text: "Como você se envolve com problemas do dia a dia?",
    options: [
      { label: "Procuro a melhor forma de apresentar a solução",    scores: { ux:3, frontend:1 } },
      { label: "Penso na lógica e nos passos para resolver",        scores: { backend:3 } },
      { label: "Quero entender os números por trás do problema",    scores: { data:3 } },
      { label: "Penso em como evitar que o problema se repita",     scores: { devops:2, cybersecurity:2 } },
    ]
  },
  {
    text: "Se fosse começar a estudar hoje, qual trilha escolheria?",
    options: [
      { label: "HTML, CSS, JavaScript, React",                      scores: { frontend:3, ux:1 } },
      { label: "Python/Node, APIs, banco de dados",                 scores: { backend:3 } },
      { label: "Python, estatística, machine learning",             scores: { data:3 } },
      { label: "Linux, redes, segurança ofensiva",                  scores: { cybersecurity:3, devops:1 } },
    ]
  },
];

/* -----------------------------------------------
   DADOS DE RESULTADO POR ÁREA
----------------------------------------------- */
const results = {
  frontend: {
    title: "Frontend Developer",
    emoji: "🎨",
    rarity: "Apenas 18% das pessoas têm esse perfil",
    description: "Você tem um olhar aguçado para design e adora transformar ideias em experiências visuais incríveis. Seu lugar é na camada que o usuário vê e interage — criando interfaces responsivas, animadas e acessíveis.",
  },
  backend: {
    title: "Backend Developer",
    emoji: "⚙️",
    rarity: "Apenas 22% das pessoas têm esse perfil",
    description: "Você prefere resolver problemas complexos nos bastidores. APIs, banco de dados, lógica de negócio — tudo que faz o sistema funcionar de verdade é o seu território.",
  },
  data: {
    title: "Data Scientist",
    emoji: "📊",
    rarity: "Apenas 12% das pessoas têm esse perfil",
    description: "Você pensa em números, padrões e insights. Sua vocação está em transformar dados brutos em decisões inteligentes, usando estatística, machine learning e visualização.",
  },
  devops: {
    title: "DevOps Engineer",
    emoji: "🚀",
    rarity: "Apenas 15% das pessoas têm esse perfil",
    description: "Você é o elo entre desenvolvimento e infraestrutura. Automação, pipelines, cloud e confiabilidade de sistemas são o que te move — e o mercado paga muito bem por isso.",
  },
  cybersecurity: {
    title: "Cybersecurity Analyst",
    emoji: "🔐",
    rarity: "Apenas 10% das pessoas têm esse perfil",
    description: "Você pensa como atacante para proteger como defensor. Segurança ofensiva, análise de vulnerabilidades e proteção de dados são sua paixão — uma das áreas mais escassas e valorizadas.",
  },
  ux: {
    title: "UX Designer",
    emoji: "🧩",
    rarity: "Apenas 14% das pessoas têm esse perfil",
    description: "Você coloca o usuário no centro de tudo. Pesquisa, prototipação e design de interação são suas ferramentas para criar produtos que as pessoas amam usar.",
  },
};

/* -----------------------------------------------
   RÓTULOS AMIGÁVEIS DAS CATEGORIAS
----------------------------------------------- */
const categoryLabels = {
  frontend:      'Frontend',
  backend:       'Backend',
  data:          'Data Science',
  devops:        'DevOps',
  cybersecurity: 'Cybersecurity',
  ux:            'UX Design',
};

/* -----------------------------------------------
   UTILITÁRIO — Fisher-Yates shuffle
   Embaralha array sem modificar o original
----------------------------------------------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* -----------------------------------------------
   ESTADO DO QUIZ
----------------------------------------------- */
let currentQuestion   = 0;
let selectedOption    = null;
let scores            = { frontend: 0, backend: 0, data: 0, devops: 0, cybersecurity: 0, ux: 0 };
let shuffledQuestions = [];
let answers           = [];

/* -----------------------------------------------
   PÁGINAS REGISTRADAS
   Inclui 'analysis' como nova página
----------------------------------------------- */
const pages = ['home', 'quiz', 'analysis', 'result', 'privacy', 'terms', 'about'];

/* -----------------------------------------------
   NAVEGAÇÃO ENTRE PÁGINAS
----------------------------------------------- */
function showPage(name) {
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* -----------------------------------------------
   INICIAR QUIZ
----------------------------------------------- */
function startQuiz() {
  currentQuestion = 0;
  scores          = { frontend: 0, backend: 0, data: 0, devops: 0, cybersecurity: 0, ux: 0 };

  // Embaralha as opções de cada pergunta (Fisher-Yates)
  shuffledQuestions = questions.map(q => ({
    text:    q.text,
    options: shuffle(q.options),
  }));

  answers = new Array(shuffledQuestions.length).fill(null);
  showPage('quiz');
  renderQuestion();
}

/* -----------------------------------------------
   RENDERIZAR PERGUNTA ATUAL
----------------------------------------------- */
function renderQuestion() {
  const q       = shuffledQuestions[currentQuestion];
  const total   = shuffledQuestions.length;
  const num     = currentQuestion + 1;
  const pct     = Math.round((currentQuestion / total) * 100);
  const letters = ['A', 'B', 'C', 'D'];

  document.getElementById('q-num').textContent          = `Pergunta ${num} de ${total}`;
  document.getElementById('q-text').textContent         = q.text;
  document.getElementById('progress-fill').style.width  = pct + '%';
  document.getElementById('progress-label').textContent = `${currentQuestion} / ${total}`;
  document.getElementById('btn-back').style.visibility  = currentQuestion === 0 ? 'hidden' : 'visible';

  selectedOption = answers[currentQuestion];
  document.getElementById('btn-next').disabled = (selectedOption === null);

  const container = document.getElementById('q-options');
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div       = document.createElement('div');
    div.className   = 'quiz-option' + (selectedOption === i ? ' selected' : '');
    div.innerHTML   = `<span class="quiz-option-letter">${letters[i]}</span><span>${opt.label}</span>`;
    div.addEventListener('click', () => selectOption(i));
    container.appendChild(div);
  });
}

/* -----------------------------------------------
   SELECIONAR OPÇÃO
----------------------------------------------- */
function selectOption(index) {
  // Desfaz pontuação anterior desta pergunta
  if (answers[currentQuestion] !== null) {
    const prev = shuffledQuestions[currentQuestion].options[answers[currentQuestion]].scores;
    for (const [cat, val] of Object.entries(prev)) scores[cat] -= val;
  }

  // Aplica nova seleção
  selectedOption            = index;
  answers[currentQuestion]  = index;
  const newScores           = shuffledQuestions[currentQuestion].options[index].scores;
  for (const [cat, val] of Object.entries(newScores)) scores[cat] += val;

  // Atualiza visual
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  document.getElementById('btn-next').disabled = false;
}

/* -----------------------------------------------
   AVANÇAR PERGUNTA
----------------------------------------------- */
function nextQuestion() {
  if (selectedOption === null) return;
  if (currentQuestion < shuffledQuestions.length - 1) {
    currentQuestion++;
    selectedOption = answers[currentQuestion];
    renderQuestion();
  } else {
    // Última pergunta: vai para a tela de análise antes do resultado
    runAnalysis();
  }
}

/* -----------------------------------------------
   VOLTAR PERGUNTA
----------------------------------------------- */
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

/* -----------------------------------------------
   TELA DE ANÁLISE — MELHORIA 1
   Simula um processamento de IA por ~3,2 segundos.
   Cada etapa aparece em sequência com checkmark verde.
   A barra de progresso avança suavemente.
   Ao terminar, chama showResult() automaticamente.
----------------------------------------------- */
function runAnalysis() {
  showPage('analysis');

  const steps    = document.querySelectorAll('.analysis-step');
  const bar      = document.getElementById('analysis-bar');
  const pctLabel = document.getElementById('analysis-pct');

  // Reseta estado visual das etapas
  steps.forEach(s => {
    s.classList.remove('visible', 'done');
    s.querySelector('.analysis-step-icon').textContent = '·';
  });
  bar.style.width  = '0%';
  pctLabel.textContent = '0%';

  // Configuração: cada etapa tem delay de entrada e duração até ser marcada "done"
  const stepTimings = [
    { show: 200,  done: 700  },   // etapa 0
    { show: 900,  done: 1400 },   // etapa 1
    { show: 1600, done: 2100 },   // etapa 2
    { show: 2300, done: 2800 },   // etapa 3
  ];

  // Anima a barra de progresso de 0% → 100% ao longo de 3s
  let progress   = 0;
  const barTimer = setInterval(() => {
    progress = Math.min(progress + 2, 100);
    bar.style.width        = progress + '%';
    pctLabel.textContent   = progress + '%';
    if (progress >= 100) clearInterval(barTimer);
  }, 60); // 60ms × 50 iterações ≈ 3s

  // Revela cada etapa no momento certo e depois marca como concluída
  stepTimings.forEach(({ show, done }, i) => {
    // Aparece
    setTimeout(() => {
      steps[i].classList.add('visible');
    }, show);

    // Marca como feito (ícone vira ✓ verde)
    setTimeout(() => {
      steps[i].classList.add('done');
      steps[i].querySelector('.analysis-step-icon').textContent = '✓';
    }, done);
  });

  // Redireciona para o resultado após a última etapa ser concluída
  setTimeout(() => {
    showResult();
  }, 3300);
}


/* Máximo possível por área (pré-calculado)
   = soma da melhor pontuação de cada área
     em cada pergunta do quiz              */
const maxScores = {
  frontend:      36,
  backend:       45,
  data:          43,
  devops:        25,
  cybersecurity: 33,
  ux:            32,
};

function showResult() {
  // Categoria vencedora
  const winner = Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  const res    = results[winner];

  // ── Percentual relativo ao máximo possível ──
  // Cada área mostra: pontos_obtidos / máximo_possível * 100
  // Garante que quem é claramente frontend veja 80-95%, não 52%.
  const rawPcts = Object.fromEntries(
    Object.entries(scores).map(([cat, val]) => [
      cat,
      Math.min(100, Math.round((val / maxScores[cat]) * 100))
    ])
  );

  // Ordena por % decrescente para o ranking
  const sorted = Object.entries(rawPcts).sort((a, b) => b[1] - a[1]);

  // ── Hero ──────────────────────────────────────
  document.getElementById('result-rarity').textContent = res.rarity;
  document.getElementById('result-title').innerHTML    = `${res.emoji} <span>${res.title}</span>`;
  document.getElementById('result-desc').textContent   = res.description;

  // ── Ranking de compatibilidade ─────────────────
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣'];

  const scoreContainer = document.getElementById('result-scores');
  scoreContainer.innerHTML = `
    <div class="ranking-title">
      Seu ranking de compatibilidade <span>— baseado nas suas respostas</span>
    </div>`;

  sorted.forEach(([cat, pct], idx) => {
    const isTop = cat === winner;
    scoreContainer.innerHTML += `
      <div class="score-row">
        <span class="score-position ${isTop ? 'first' : ''}">${medals[idx]}</span>
        <span class="score-label ${isTop ? 'top' : ''}">${categoryLabels[cat]}</span>
        <div class="score-bar-wrap">
          <div class="score-bar ${isTop ? 'top' : ''}"
               id="bar-${cat}"
               style="width:0%">
          </div>
        </div>
        <span class="score-val ${isTop ? 'top' : ''}">${pct}%</span>
      </div>`;
  });

  // Anima as barras com delay escalonado
  sorted.forEach(([cat, pct], idx) => {
    setTimeout(() => {
      const bar = document.getElementById('bar-' + cat);
      if (bar) bar.style.width = pct + '%';
    }, 120 * idx + 200);
  });

  showPage('result');
}

/* -----------------------------------------------
   REINICIAR QUIZ
----------------------------------------------- */
function restartQuiz() {
  startQuiz();
}

/* -----------------------------------------------
   INICIALIZAÇÃO
----------------------------------------------- */
showPage('home');