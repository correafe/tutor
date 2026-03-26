export const PIZZA_SCENARIO = {
  title: "Nível Básico: A Jornada da Pizza 🍕",
  introQuestion: "Você está pronto para construir o mapa completo com 3 Fases?",
  
  scenarioMeta: {
    name: "Jornada do Jantar de Sexta-Feira",
    description: "Mapeamento da experiência do usuário Lucas ao pedir uma pizza via aplicativo num dia cansativo de trabalho. O objetivo é identificar pontos de atrito na escolha do sabor e na espera."
  },

  scenarioText: `
    CENÁRIO COMPLETO:
    
    Persona: Lucas, 28 anos, desenvolvedor. Teve uma semana exaustiva de trabalho e só quer relaxar.
    
    1. FASE DA FOME (19:00): Lucas chega em casa, abre a geladeira e vê que está vazia. Ele se sente frustrado e pensa: "Vou ter que pedir algo".
    
    2. FASE DO PEDIDO (19:10): Ele senta no sofá e abre o aplicativo de delivery. Fica indeciso entre sabores, mas acaba pedindo uma de calabresa.
    
    3. FASE DA ENTREGA (19:50): A campainha toca. Lucas recebe a pizza e o cheiro é ótimo. Ele come, sentindo-se feliz e satisfeito.
    
    ---
    SUA TAREFA: Você deve mapear cada uma dessas 3 fases, preenchendo todas as linhas (Fases, Ações, Emoções, Pensamentos e Pontos de Contato).
  `,
  steps: [
    // --- FASE 1: A FOME ---
    {
      id: 1,
      section: "Fase 1: Fases da Jornada",
      context: "Começando às 19:00. Qual nome define o momento em que Lucas abre a geladeira?",
      correctAnswer: { description: "Descoberta da Fome", emojiTag: "😫" },
      options: [
        { id: 'a', text: "Pagamento", correct: false, feedback: "Muito cedo para isso." },
        { id: 'b', text: "Dormir", correct: false, feedback: "Ele está com fome, não com sono." },
        { id: 'c', text: "Descoberta da Fome", correct: true, feedback: "Correto! É o gatilho da jornada." }
      ]
    },
    {
      id: 2,
      section: "Fase 1: Ações do Usuário",
      context: "O que Lucas faz fisicamente nessa fase?",
      correctAnswer: { description: "Abre a geladeira vazia", emojiTag: "❄️" },
      options: [
        { id: 'a', text: "Abre a geladeira vazia", correct: true, feedback: "Isso. Uma ação observável." },
        { id: 'b', text: "Pega o celular", correct: false, feedback: "Ainda não. Primeiro ele checa a comida." },
        { id: 'c', text: "Come uma maçã", correct: false, feedback: "A geladeira está vazia!" }
      ]
    },
    {
      id: 3,
      section: "Fase 1: Emoções",
      context: "Como ele se sente ao ver a geladeira vazia?",
      isEmojiSelection: true,
      correctAnswer: { description: "Frustrado", emojiTag: "😫", lineY: -30 }, 
      options: [
        { id: 'a', text: "😁", correct: false, feedback: "Ninguém fica feliz sem comida." },
        { id: 'b', text: "😴", correct: false, feedback: "Ele não está com sono." },
        { id: 'c', text: "😫", correct: true, feedback: "Exato. Frustração e fome." }
      ]
    },
    {
      id: 4,
      section: "Fase 1: Pensamentos",
      context: "O que ele pensa?",
      correctAnswer: { description: "Não tem nada pra comer...", emojiTag: "🚫" },
      options: [
        { id: 'a', text: "Não tem nada pra comer...", correct: true, feedback: "O pensamento direto da situação." },
        { id: 'b', text: "Que dia lindo", correct: false, feedback: "O foco é a fome." },
        { id: 'c', text: "Vou comprar um carro", correct: false, feedback: "Fora de contexto." }
      ]
    },
    {
      id: 5,
      section: "Fase 1: Pontos de Contato",
      context: "Com o que ele está interagindo?",
      correctAnswer: { description: "Geladeira de Casa", emojiTag: "🏠" },
      options: [
        { id: 'a', text: "Aplicativo", correct: false, feedback: "Ainda não pegou o celular." },
        { id: 'b', text: "Motoboy", correct: false, feedback: "Ainda não." },
        { id: 'c', text: "Geladeira de Casa", correct: true, feedback: "Correto. O objeto físico." }
      ]
    },

    // --- FASE 2: O PEDIDO ---
    {
      id: 6,
      section: "Fase 2: Fases da Jornada",
      context: "Agora são 19:10. Ele decide pedir. Qual é a fase?",
      correctAnswer: { description: "Escolha no App", emojiTag: "📱" },
      options: [
        { id: 'a', text: "Lavar Louça", correct: false, feedback: "Não faz sentido agora." },
        { id: 'b', text: "Cozinhar", correct: false, feedback: "Ele desistiu de cozinhar." },
        { id: 'c', text: "Escolha no App", correct: true, feedback: "Sim, o processo de compra." }
      ]
    },
    {
      id: 7,
      section: "Fase 2: Ações do Usuário",
      context: "O que ele faz no sofá?",
      correctAnswer: { description: "Navega no cardápio", emojiTag: "👆" },
      options: [
        { id: 'a', text: "Corre", correct: false, feedback: "Ele está sentado." },
        { id: 'b', text: "Navega no cardápio", correct: true, feedback: "Ação de usar o app." },
        { id: 'c', text: "Grita", correct: false, feedback: "Sem necessidade." }
      ]
    },
    {
      id: 8,
      section: "Fase 2: Emoções",
      context: "Ele não sabe qual sabor escolher. Como se sente?",
      isEmojiSelection: true,
      correctAnswer: { description: "Indeciso", emojiTag: "🤔", lineY: 0 }, 
      options: [
        { id: 'a', text: "🤔", correct: true, feedback: "Isso. Pensativo ou indeciso." },
        { id: 'b', text: "😡", correct: false, feedback: "Não é raiva, é dúvida." },
        { id: 'c', text: "😭", correct: false, feedback: "Exagerado." }
      ]
    },
    {
      id: 9,
      section: "Fase 2: Pensamentos",
      context: "Qual é a dúvida dele?",
      correctAnswer: { description: "Calabresa ou queijo?", emojiTag: "🍕" },
      options: [
        { id: 'a', text: "O app travou", correct: false, feedback: "O cenário não diz isso." },
        { id: 'b', text: "Será que vai chover?", correct: false, feedback: "Foco na pizza." },
        { id: 'c', text: "Calabresa ou queijo?", correct: true, feedback: "A dúvida da compra." }
      ]
    },
    {
      id: 10,
      section: "Fase 2: Pontos de Contato",
      context: "Onde ele escolhe a pizza?",
      correctAnswer: { description: "App", emojiTag: "🛒" },
      options: [
        { id: 'a', text: "App", correct: true, feedback: "Canal digital." },
        { id: 'b', text: "Telefone Fixo", correct: false, feedback: "Ele está usando um app." },
        { id: 'c', text: "Panfleto de Papel", correct: false, feedback: "É um app." }
      ]
    },

    // --- FASE 3: ENTREGA ---
    {
      id: 11,
      section: "Fase 3: Fases da Jornada",
      context: "São 19:50 e a campainha toca. Qual é a fase final?",
      correctAnswer: { description: "Recebimento e Consumo", emojiTag: "😋" },
      options: [
        { id: 'a', text: "Devolução", correct: false, feedback: "Ele quer comer!" },
        { id: 'b', text: "Reclamação", correct: false, feedback: "Tudo correu bem." },
        { id: 'c', text: "Recebimento e Consumo", correct: true, feedback: "O fim da jornada." }
      ]
    },
    {
      id: 12,
      section: "Fase 3: Ações do Usuário",
      context: "O que ele faz quando a pizza chega?",
      correctAnswer: { description: "Pega a caixa e come", emojiTag: "🍴" },
      options: [
        { id: 'a', text: "Joga fora", correct: false, feedback: "Jamais!" },
        { id: 'b', text: "Pega a caixa e come", correct: true, feedback: "A recompensa." },
        { id: 'c', text: "Vai dormir", correct: false, feedback: "De barriga cheia, talvez depois." }
      ]
    },
    {
      id: 13,
      section: "Fase 3: Emoções",
      context: "Comendo uma pizza quente. Como ele está?",
      isEmojiSelection: true,
      correctAnswer: { description: "Satisfeito", emojiTag: "🥰", lineY: 35 }, 
      options: [
        { id: 'a', text: "🥰", correct: true, feedback: "Felicidade pura." },
        { id: 'b', text: "🤢", correct: false, feedback: "A pizza estava boa." },
        { id: 'c', text: "😠", correct: false, feedback: "Por que estaria bravo?" }
      ]
    },
    {
      id: 14,
      section: "Fase 3: Pensamentos",
      context: "Qual é o veredito final?",
      correctAnswer: { description: "Estava ótima!", emojiTag: "❤️" },
      options: [
        { id: 'a', text: "Vou pedir outra", correct: false, feedback: "Já está satisfeito." },
        { id: 'b', text: "Nunca mais peço", correct: false, feedback: "Ele gostou." },
        { id: 'c', text: "Estava ótima!", correct: true, feedback: "Satisfação do cliente." }
      ]
    },
    {
      id: 15,
      section: "Fase 3: Pontos de Contato",
      context: "O que ele tem em mãos?",
      correctAnswer: { description: "Caixa de Pizza", emojiTag: "📦" },
      options: [
        { id: 'a', text: "O celular", correct: false, feedback: "Já largou o celular." },
        { id: 'b', text: "Caixa de Pizza", correct: true, feedback: "O produto final." },
        { id: 'c', text: "A TV", correct: false, feedback: "Não é o foco." }
      ]
    }
  ]
};


export const STREAMING_SCENARIO = {
  title: "Nível Intermediário: A Assinatura de Streaming 📺",
  introQuestion: "Neste nível, vamos mapear uma jornada de 4 fases. As alternativas possuem pesos diferentes (10, 5 ou 0 pontos). O feedback será dado apenas no final!",
  scenarioMeta: {
    name: "Assinatura de Serviço de Streaming",
    description: "A jornada de Camila buscando um serviço de filmes. Identifique o impacto da lentidão no cadastro."
  },
  scenarioText: `
    CENÁRIO COMPLETO:
    
    Persona: Camila, 32 anos. É aficionada por séries, tem pouca paciência para sites lentos e faz questão de alta qualidade de imagem (4K).
    
    Contexto: Camila quer assinar um novo serviço de streaming porque sua série favorita mudou de plataforma.

    1. FASE DE PESQUISA: Camila abre um buscador na internet e procura por "melhores serviços de streaming 2024". Ela lê comparativos em blogs de tecnologia e fica em dúvida sobre os preços.
    
    2. FASE DE ESCOLHA: Ela entra no site oficial de um dos serviços. Analisa os planos (Básico vs. Premium). Ela decide pelo Premium por causa da resolução 4K, mas se preocupa com o valor mensal.
    
    3. FASE DE CADASTRO: Camila preenche seus dados e insere o cartão de crédito. O site está muito lento, o que a deixa impaciente e irritada, mas ela insiste e finaliza a compra.
    
    4. FASE DE USO: Camila finalmente abre o app na TV. A interface é muito intuitiva e ela encontra a série que queria. Ela se sente relaxada e pensa: "Valeu o investimento".
    
    ---
    SUA TAREFA: Você deve mapear cada uma dessas 4 fases, preenchendo todas as linhas (Fases, Ações, Emoções, Pensamentos e Pontos de Contato).
  `,
  
  steps: [
    // --- FASE 1: PESQUISA ---
    {
      id: 1, section: "Fase 1: Fases da Jornada", context: "Camila percebe que precisa de um novo serviço e começa a levantar opções. Como chamamos esta etapa?",
      correctAnswer: { description: "Pesquisa e Aprendizado", emojiTag: "🔍" },
      options: [
        { id: 'a', text: "Consideração", points: 5 }, // Meio certo
        { id: 'b', text: "Decisão de Compra", points: 0 }, 
        { id: 'c', text: "Pesquisa e Aprendizado", points: 10 }, // Certo
        { id: 'd', text: "Reconhecimento do Problema", points: 0 } 
      ]
    },
    {
      id: 2, section: "Fase 1: Ações do Usuário", context: "Qual é a ação principal de Camila no início dessa jornada?",
      correctAnswer: { description: "Comparar serviços em blogs", emojiTag: "📑" },
      options: [
        { id: 'a', text: "Comparar serviços em blogs", points: 10 },
        { id: 'b', text: "Acessar o site do serviço", points: 5 },
        { id: 'c', text: "Baixar o aplicativo na TV", points: 0 },
        { id: 'd', text: "Solicitar período de teste", points: 0 }
      ]
    },
    {
      id: 3, section: "Fase 1: Emoções", context: "Camila vê muitos preços e catálogos diferentes. Como ela se sente?",
      isEmojiSelection: true, correctAnswer: { description: "Analítica e em dúvida", emojiTag: "🤨", lineY: -15 },
      options: [
        { id: 'a', text: "😀", points: 0 },
        { id: 'b', text: "😍", points: 0 },
        { id: 'c', text: "😴", points: 5 }, // Entediada pelas opções (parcial)
        { id: 'd', text: "🤨", points: 10 } // Analítica/Dúvida
      ]
    },
    {
      id: 4, section: "Fase 1: Pensamentos", context: "O que passa pela cabeça de Camila enquanto lê os blogs?",
      correctAnswer: { description: "Será que vale a pena?", emojiTag: "💭" },
      options: [
        { id: 'a', text: "O site está travando", points: 0 },
        { id: 'b', text: "Será que vale a pena assinar?", points: 10 },
        { id: 'c', text: "A imagem 4K é perfeita", points: 0 },
        { id: 'd', text: "Vou cancelar os outros", points: 5 } // Pensamento plausível, mas secundário
      ]
    },
    {
      id: 5, section: "Fase 1: Pontos de Contato", context: "Qual é o canal de interação que Camila está usando?",
      correctAnswer: { description: "Buscadores e Blogs", emojiTag: "🌐" },
      options: [
        { id: 'a', text: "Loja de Aplicativos", points: 5 },
        { id: 'b', text: "Navegador da Smart TV", points: 0 },
        { id: 'c', text: "Buscadores e Blogs Tech", points: 10 },
        { id: 'd', text: "Suporte via Chat", points: 0 }
      ]
    },

    // --- FASE 2: ESCOLHA ---
    {
      id: 6, section: "Fase 2: Fases da Jornada", context: "Camila agora está focada apenas no site do serviço. Que etapa é esta?",
      correctAnswer: { description: "Consideração da Solução", emojiTag: "⚖️" },
      options: [
        { id: 'a', text: "Avaliação da Intenção", points: 5 },
        { id: 'b', text: "Consideração da Solução", points: 10 },
        { id: 'c', text: "Engajamento Inicial", points: 0 },
        { id: 'd', text: "Retenção de Cliente", points: 0 }
      ]
    },
    {
      id: 7, section: "Fase 2: Ações do Usuário", context: "O que Camila faz dentro do site?",
      correctAnswer: { description: "Análise de planos e recursos", emojiTag: "📊" },
      options: [
        { id: 'a', text: "Lê a política de privacidade", points: 0 },
        { id: 'b', text: "Cria uma senha forte", points: 0 },
        { id: 'c', text: "Assiste a um trailer", points: 5 }, // Plausível, mas foge do foco financeiro
        { id: 'd', text: "Analisa planos e recursos", points: 10 }
      ]
    },
    {
      id: 8, section: "Fase 2: Emoções", context: "Ela decide pelo Premium, mas o preço a incomoda um pouco. Como ela se sente?",
      isEmojiSelection: true, correctAnswer: { description: "Preocupada", emojiTag: "😟", lineY: -15 },
      options: [
        { id: 'a', text: "😭", points: 5 }, // Exagerado, mas na mesma linha negativa
        { id: 'b', text: "🤩", points: 0 },
        { id: 'c', text: "😟", points: 10 },
        { id: 'd', text: "😡", points: 0 }
      ]
    },
    {
      id: 9, section: "Fase 2: Pensamentos", context: "O que Camila pensa ao escolher o plano mais caro?",
      correctAnswer: { description: "Preciso de 4K na TV", emojiTag: "📺" },
      options: [
        { id: 'a', text: "Vou dividir a conta", points: 5 }, // Hipótese válida, mas não citada no texto
        { id: 'b', text: "O site está muito lerdo", points: 0 },
        { id: 'c', text: "Preciso de 4K para a minha TV", points: 10 },
        { id: 'd', text: "O suporte é bom?", points: 0 }
      ]
    },
    {
      id: 10, section: "Fase 2: Pontos de Contato", context: "Onde essa análise de planos está ocorrendo?",
      correctAnswer: { description: "Site Oficial (Preços)", emojiTag: "💻" },
      options: [
        { id: 'a', text: "Banner Publicitário", points: 0 },
        { id: 'b', text: "E-mail de Boas-vindas", points: 0 },
        { id: 'c', text: "Site Oficial (Preços)", points: 10 },
        { id: 'd', text: "Redes Sociais", points: 5 } // Ela pode ter vindo de lá
      ]
    },

    // --- FASE 3: CADASTRO ---
    {
      id: 11, section: "Fase 3: Fases da Jornada", context: "Camila preenche os dados e paga. Como chamamos este momento?",
      correctAnswer: { description: "Conversão / Compra", emojiTag: "💳" },
      options: [
        { id: 'a', text: "Inscrição em Newsletter", points: 0 },
        { id: 'b', text: "Conversão / Compra", points: 10 },
        { id: 'c', text: "Configuração de Conta", points: 5 }, // Faz parte, mas o foco é o cartão
        { id: 'd', text: "Adoção do Produto", points: 0 }
      ]
    },
    {
      id: 12, section: "Fase 3: Ações do Usuário", context: "O que ela faz enquanto o site demora a carregar?",
      correctAnswer: { description: "Preenche dados e aguarda", emojiTag: "⌨️" },
      options: [
        { id: 'a', text: "Reinicia o computador", points: 0 },
        { id: 'b', text: "Cancela o pagamento", points: 0 },
        { id: 'c', text: "Limpa os cookies", points: 5 },
        { id: 'd', text: "Preenche dados e aguarda", points: 10 }
      ]
    },
    {
      id: 13, section: "Fase 3: Emoções", context: "O site demora muito. Qual é o sentimento de Camila?",
      isEmojiSelection: true, correctAnswer: { description: "Irritada", emojiTag: "😡", lineY: -60 },
      options: [
        { id: 'a', text: "🤩", points: 0 },
        { id: 'b', text: "😴", points: 0 },
        { id: 'c', text: "🤨", points: 5 }, // Fraco para a situação
        { id: 'd', text: "😡", points: 10 }
      ]
    },
    {
      id: 14, section: "Fase 3: Pensamentos", context: "O que ela pensa enquanto a barra de carregamento trava?",
      correctAnswer: { description: "Que site horrível!", emojiTag: "💢" },
      options: [
        { id: 'a', text: "Será que meu cartão tem limite?", points: 5 }, // Dúvida comum no checkout
        { id: 'b', text: "Vou pedir uma pizza", points: 0 },
        { id: 'c', text: "Que site horrível!", points: 10 },
        { id: 'd', text: "Amanhã eu tento de novo", points: 0 }
      ]
    },
    {
      id: 15, section: "Fase 3: Pontos de Contato", context: "Com qual parte do sistema ela interage agora?",
      correctAnswer: { description: "Gateway de Pagamento", emojiTag: "🔒" },
      options: [
        { id: 'a', text: "Gateway de Pagamento", points: 10 },
        { id: 'b', text: "Fórum de Usuários", points: 0 },
        { id: 'c', text: "Página inicial do buscador", points: 0 },
        { id: 'd', text: "Aplicativo da Smart TV", points: 5 } // Ela usará no futuro
      ]
    },

    // --- FASE 4: USO ---
    {
      id: 16, section: "Fase 4: Fases da Jornada", context: "Camila finalmente utiliza o serviço na TV. Que etapa é esta?",
      correctAnswer: { description: "Experiência de Uso", emojiTag: "🎬" },
      options: [
        { id: 'a', text: "Suporte ao Cliente", points: 0 },
        { id: 'b', text: "Pós-Venda", points: 5 }, // Uso é parte do pós-venda
        { id: 'c', text: "Experiência de Uso", points: 10 },
        { id: 'd', text: "Fidelização", points: 0 }
      ]
    },
    {
      id: 17, section: "Fase 4: Ações do Usuário", context: "O que Camila faz ao abrir o app na TV?",
      correctAnswer: { description: "Encontra a série e assiste", emojiTag: "🍿" },
      options: [
        { id: 'a', text: "Cria um novo perfil", points: 5 }, // Ela até poderia fazer, mas o texto foca no conteúdo
        { id: 'b', text: "Muda a senha", points: 0 },
        { id: 'c', text: "Luta com o controle remoto", points: 0 },
        { id: 'd', text: "Encontra a série e assiste", points: 10 }
      ]
    },
    {
      id: 18, section: "Fase 4: Emoções", context: "Camila está relaxada e a série é ótima. Como ela se sente?",
      isEmojiSelection: true, correctAnswer: { description: "Satisfeita", emojiTag: "🥰", lineY: 35 },
      options: [
        { id: 'a', text: "😟", points: 0 },
        { id: 'b', text: "🥰", points: 10 },
        { id: 'c', text: "😡", points: 0 },
        { id: 'd', text: "🤨", points: 5 }
      ]
    },
    {
      id: 19, section: "Fase 4: Pensamentos", context: "Qual é a conclusão de Camila no final da noite?",
      correctAnswer: { description: "Valeu o investimento!", emojiTag: "💎" },
      options: [
        { id: 'a', text: "Vou cancelar amanhã", points: 0 },
        { id: 'b', text: "O Básico era melhor", points: 5 }, // Falso, pois ela curtiu o 4K
        { id: 'c', text: "Valeu o investimento!", points: 10 },
        { id: 'd', text: "O site ainda está lento", points: 0 }
      ]
    },
    {
      id: 20, section: "Fase 4: Pontos de Contato", context: "Qual é o canal final de interação?",
      correctAnswer: { description: "App na Smart TV", emojiTag: "📺" },
      options: [
        { id: 'a', text: "Site no Navegador", points: 0 },
        { id: 'b', text: "Controle Remoto", points: 5 }, // Dispositivo de apoio, mas não o canal central
        { id: 'c', text: "Notificação Push", points: 0 },
        { id: 'd', text: "App na Smart TV", points: 10 }
      ]
    }
  ]
};

export const ADVANCED_SCENARIO = {
  title: "Nível Avançado: Planejamento de Viagem Internacional ✈️",
  introQuestion: "Este é o desafio final! Você terá que mapear as 5 fases sem receber feedback até o fim. Cuidado, alternativas erradas podem dar zero pontos ou meio ponto!",
  
  scenarioMeta: {
    name: "Planejamento de Viagem Internacional",
    description: "A jornada desde a idealização da viagem até o momento do embarque."
  },

  scenarioText: `
    CENÁRIO COMPLETO:
    
    Persona: Sofia, 29 anos, analista financeira. É super organizada com seu dinheiro. Sonha em conhecer a Europa, mas tem muito medo de fazer escolhas ruins que estraguem as férias ou seu orçamento.
    
    1. FASE DE INSPIRAÇÃO: Sofia decide que quer viajar nas férias. Ela passa horas em redes sociais e buscadores de voos pesquisando destinos exóticos e baratos, sonhando acordada.
    
    2. FASE DE PLANEJAMENTO: Ela escolhe a Itália. Ao ver os custos base, percebe que precisa economizar. Ela cria uma planilha e se sente preocupada com os cortes de gastos.
    
    3. FASE DE COMPRA: Sofia entra no site da companhia aérea. Ela sente uma enorme tensão ao digitar os dados do cartão (é muito dinheiro!), mas após 1 min a tela mostra "Aprovada".
    
    4. FASE DE HOSPEDAGEM: Passagens garantidas, ela entra em apps de hospedagem. Fica sobrecarregada com as opções e com medo de escolher um lugar ruim, optando pelo mais bem avaliado.
    
    5. DIA DO EMBARQUE: Sofia despacha a mala no balcão e senta no portão de embarque. Ela está radiante e aliviada por tudo ter dado certo.

    ---
    SUA TAREFA: Você deve mapear cada uma dessas 5 fases, preenchendo todas as linhas (Fases, Ações, Emoções, Pensamentos e Pontos de Contato).
  `,
  
  steps: [
    // FASE 1
    {
      id: 1, section: "Fase 1: Fases da Jornada", context: "Sofia busca destinos sem ter nada definido. Qual é o nome dessa etapa?",
      correctAnswer: { description: "Pesquisa e Inspiração", emojiTag: "💡" },
      options: [
        { id: 'a', text: "Planejamento Logístico", points: 0 },
        { id: 'b', text: "Conscientização de Compra", points: 5 },
        { id: 'c', text: "Avaliação de Custos", points: 0 },
        { id: 'd', text: "Pesquisa e Inspiração", points: 10 },
        { id: 'e', text: "Decisão de Destino", points: 0 }
      ]
    },
    {
      id: 2, section: "Fase 1: Ações do Usuário", context: "O que Sofia faz para encontrar seu destino ideal?",
      correctAnswer: { description: "Navega em redes visuais e buscadores", emojiTag: "🖱️" },
      options: [
        { id: 'a', text: "Navega em redes visuais e buscadores", points: 10 },
        { id: 'b', text: "Cria uma planilha de despesas", points: 0 },
        { id: 'c', text: "Lê avaliações de hotéis", points: 0 },
        { id: 'd', text: "Entra em contato com agência", points: 5 },
        { id: 'e', text: "Verifica o limite do cartão", points: 0 }
      ]
    },
    {
      id: 3, section: "Fase 1: Emoções", context: "Imaginando-se em lugares incríveis, qual é o sentimento de Sofia?",
      isEmojiSelection: true, correctAnswer: { description: "Sonhadora", emojiTag: "🤩", lineY: 35 }, 
      options: [
        { id: 'a', text: "😰", points: 0 },
        { id: 'b', text: "🤩", points: 10 },
        { id: 'c', text: "🧐", points: 0 },
        { id: 'd', text: "😵‍💫", points: 5 }, // Leve confusão pelas opções, mas menos provável
        { id: 'e', text: "😌", points: 0 }
      ]
    },
    {
      id: 4, section: "Fase 1: Pensamentos", context: "Durante essa busca aberta, qual é o pensamento dominante dela?",
      correctAnswer: { description: "Qual destino cabe no orçamento?", emojiTag: "💭" },
      options: [
        { id: 'a', text: "Vou precisar cortar o delivery", points: 0 },
        { id: 'b', text: "A transação vai aprovar?", points: 0 },
        { id: 'c', text: "Qual destino cabe no orçamento?", points: 10 },
        { id: 'd', text: "Espero que o hotel seja bom", points: 5 }, // Tão longe que não é o foco principal
        { id: 'e', text: "Será que meu voo atrasa?", points: 0 }
      ]
    },
    {
      id: 5, section: "Fase 1: Pontos de Contato", context: "Onde ocorre a interação de Sofia nesta fase?",
      correctAnswer: { description: "Buscadores e Redes Sociais", emojiTag: "📱" },
      options: [
        { id: 'a', text: "Planilha de Gastos", points: 0 },
        { id: 'b', text: "Aplicativo de Hospedagem", points: 0 },
        { id: 'c', text: "Balcão do Aeroporto", points: 0 },
        { id: 'd', text: "Sistema de Checkout Aéreo", points: 5 },
        { id: 'e', text: "Buscadores e Redes Sociais", points: 10 }
      ]
    },

    // FASE 2
    {
      id: 7, section: "Fase 2: Fases da Jornada", context: "Sofia escolheu a Itália e analisa os custos. Que fase é esta?",
      correctAnswer: { description: "Planejamento Financeiro", emojiTag: "📈" },
      options: [
        { id: 'a', text: "Pagamento do Voo", points: 0 },
        { id: 'b', text: "Planejamento Financeiro", points: 10 },
        { id: 'c', text: "Organização do Roteiro", points: 5 }, // Faz parte do plano geral, mas o foco é financeiro
        { id: 'd', text: "Avaliação Pós-Compra", points: 0 },
        { id: 'e', text: "Reserva de Serviços", points: 0 }
      ]
    },
    {
      id: 8, section: "Fase 2: Ações do Usuário", context: "O que ela precisa fazer ativamente nesta etapa?",
      correctAnswer: { description: "Cria planilha e corta gastos", emojiTag: "📝" },
      options: [
        { id: 'a', text: "Passa pela segurança", points: 0 },
        { id: 'b', text: "Pesquisa fotos do Coliseu", points: 5 },
        { id: 'c', text: "Filtra hotéis por avaliação", points: 0 },
        { id: 'd', text: "Digita o cartão no site", points: 0 },
        { id: 'e', text: "Cria planilha e corta gastos", points: 10 }
      ]
    },
    {
      id: 9, section: "Fase 2: Emoções", context: "Ver o quanto custa a viagem mexe com ela. Qual é a emoção?",
      isEmojiSelection: true, correctAnswer: { description: "Preocupada", emojiTag: "🧐", lineY: -15 }, 
      options: [
        { id: 'a', text: "😌", points: 0 },
        { id: 'b', text: "😡", points: 0 },
        { id: 'c', text: "🧐", points: 10 },
        { id: 'd', text: "🥰", points: 0 },
        { id: 'e', text: "😰", points: 5 } // Muito tensa para ser só a planilha
      ]
    },
    {
      id: 10, section: "Fase 2: Pensamentos", context: "Diante dos números da viagem, o que Sofia pensa?",
      correctAnswer: { description: "Onde posso cortar despesas?", emojiTag: "✂️" },
      options: [
        { id: 'a', text: "Onde fica o portão 8?", points: 0 },
        { id: 'b', text: "Qual país devo escolher?", points: 0 },
        { id: 'c', text: "Onde posso cortar despesas?", points: 10 },
        { id: 'd', text: "Esse anfitrião é confiável?", points: 0 },
        { id: 'e', text: "Espero que o pagamento passe", points: 5 }
      ]
    },
    {
      id: 11, section: "Fase 2: Pontos de Contato", context: "Qual é a ferramenta que ela usa para realizar essa fase?",
      correctAnswer: { description: "Planilha de Orçamento", emojiTag: "📊" },
      options: [
        { id: 'a', text: "Aplicativo de Hospedagem", points: 0 },
        { id: 'b', text: "Buscador de Voos", points: 5 },
        { id: 'c', text: "Planilha de Orçamento", points: 10 },
        { id: 'd', text: "Check-in Eletrônico", points: 0 },
        { id: 'e', text: "E-mail de confirmação", points: 0 }
      ]
    },

    // FASE 3
    {
      id: 13, section: "Fase 3: Fases da Jornada", context: "O mês da viagem chegou, hora de pagar as passagens. Que etapa é essa?",
      correctAnswer: { description: "Checkout e Compra", emojiTag: "💳" },
      options: [
        { id: 'a', text: "Emissão do Cartão de Embarque", points: 0 },
        { id: 'b', text: "Planejamento Financeiro", points: 5 },
        { id: 'c', text: "Checkout e Compra", points: 10 },
        { id: 'd', text: "Serviço de Bordo", points: 0 },
        { id: 'e', text: "Reserva de Acomodação", points: 0 }
      ]
    },
    {
      id: 14, section: "Fase 3: Ações do Usuário", context: "O que Sofia faz concretamente nesse momento?",
      correctAnswer: { description: "Digita dados e confirma compra", emojiTag: "💻" },
      options: [
        { id: 'a', text: "Pesquisa sobre o clima na Itália", points: 0 },
        { id: 'b', text: "Envia mensagem ao anfitrião", points: 0 },
        { id: 'c', text: "Despacha a bagagem", points: 0 },
        { id: 'd', text: "Abre o banco e vê o extrato", points: 5 },
        { id: 'e', text: "Digita dados e confirma a compra", points: 10 }
      ]
    },
    {
      id: 15, section: "Fase 3: Emoções", context: "Sendo um valor muito alto, qual é a emoção ao pagar?",
      isEmojiSelection: true, correctAnswer: { description: "Ansiosa/Tensa", emojiTag: "😰", lineY: -30 }, 
      options: [
        { id: 'a', text: "😰", points: 10 },
        { id: 'b', text: "🤩", points: 0 },
        { id: 'c', text: "😵‍💫", points: 5 },
        { id: 'd', text: "😡", points: 0 },
        { id: 'e', text: "😌", points: 0 }
      ]
    },
    {
      id: 16, section: "Fase 3: Pensamentos", context: "Enquanto o site processa o pagamento, o que ela pensa?",
      correctAnswer: { description: "Aprova logo, por favor!", emojiTag: "🙏" },
      options: [
        { id: 'a', text: "Qual é a senha do meu Wi-Fi?", points: 0 },
        { id: 'b', text: "Espero que o hotel tenha café", points: 5 },
        { id: 'c', text: "Quero comer massa e pizza", points: 0 },
        { id: 'd', text: "Aprova logo, por favor!", points: 10 },
        { id: 'e', text: "Esqueci de trancar a casa", points: 0 }
      ]
    },
    {
      id: 17, section: "Fase 3: Pontos de Contato", context: "Onde o pagamento está sendo processado?",
      correctAnswer: { description: "Site da Companhia Aérea", emojiTag: "✈️" },
      options: [
        { id: 'a', text: "Balcão de Check-in", points: 0 },
        { id: 'b', text: "App de Hospedagem", points: 0 },
        { id: 'c', text: "Planilha Financeira", points: 5 },
        { id: 'd', text: "Site da Companhia Aérea", points: 10 },
        { id: 'e', text: "Máquina de Cartão Física", points: 0 }
      ]
    },

    // FASE 4
    {
      id: 19, section: "Fase 4: Fases da Jornada", context: "Voo garantido! Sofia vai buscar onde dormir. Como definir esta fase?",
      correctAnswer: { description: "Seleção de Hospedagem", emojiTag: "🏨" },
      options: [
        { id: 'a', text: "Pagamento de Voo", points: 0 },
        { id: 'b', text: "Corte de Despesas", points: 0 },
        { id: 'c', text: "Decisão do Roteiro Turístico", points: 5 },
        { id: 'd', text: "Inspeção de Bagagem", points: 0 },
        { id: 'e', text: "Seleção de Hospedagem", points: 10 }
      ]
    },
    {
      id: 20, section: "Fase 4: Ações do Usuário", context: "Como ela resolve a questão de onde ficar hospedada?",
      correctAnswer: { description: "Filtra opções em apps de hospedagem", emojiTag: "🎛️" },
      options: [
        { id: 'a', text: "Adiciona dados do passaporte", points: 0 },
        { id: 'b', text: "Liga para agências locais", points: 5 },
        { id: 'c', text: "Filtra opções em apps de hospedagem", points: 10 },
        { id: 'd', text: "Cria pastas de referências visuais", points: 0 },
        { id: 'e', text: "Despacha as malas", points: 0 }
      ]
    },
    {
      id: 21, section: "Fase 4: Emoções", context: "Com centenas de hotéis e preços, como ela se sente?",
      isEmojiSelection: true, correctAnswer: { description: "Sobrecarregada/Confusa", emojiTag: "😵‍💫", lineY: -15 }, 
      options: [
        { id: 'a', text: "🥰", points: 0 },
        { id: 'b', text: "😵‍💫", points: 10 },
        { id: 'c', text: "🤩", points: 0 },
        { id: 'd', text: "😡", points: 5 },
        { id: 'e', text: "😰", points: 0 }
      ]
    },
    {
      id: 22, section: "Fase 4: Pensamentos", context: "Lendo comentários de usuários antigos, o que preocupa Sofia?",
      correctAnswer: { description: "E se a cama for horrível?", emojiTag: "🛏️" },
      options: [
        { id: 'a', text: "E se cancelarem meu voo?", points: 5 },
        { id: 'b', text: "Vou tirar muitas fotos", points: 0 },
        { id: 'c', text: "Como vou levar meus euros?", points: 0 },
        { id: 'd', text: "A senha do cartão está certa?", points: 0 },
        { id: 'e', text: "E se a cama for horrível?", points: 10 }
      ]
    },
    {
      id: 23, section: "Fase 4: Pontos de Contato", context: "Onde ela está fazendo essa análise de hotéis?",
      correctAnswer: { description: "Apps de Hospedagem", emojiTag: "📲" },
      options: [
        { id: 'a', text: "Redes Sociais Visuais", points: 5 },
        { id: 'b', text: "Site da Companhia Aérea", points: 0 },
        { id: 'c', text: "Apps de Hospedagem", points: 10 },
        { id: 'd', text: "Totem do Aeroporto", points: 0 },
        { id: 'e', text: "Planilha Financeira", points: 0 }
      ]
    },

    // FASE 5
    {
      id: 25, section: "Fase 5: Fases da Jornada", context: "O grande dia chegou. Sofia está no aeroporto para viajar. Como chamamos essa etapa?",
      correctAnswer: { description: "Uso / Início da Experiência", emojiTag: "🛫" },
      options: [
        { id: 'a', text: "Pesquisa Pós-Venda", points: 5 },
        { id: 'b', text: "Cancelamento de Reserva", points: 0 },
        { id: 'c', text: "Avaliação de Custos", points: 0 },
        { id: 'd', text: "Uso / Início da Experiência", points: 10 },
        { id: 'e', text: "Retenção de Marca", points: 0 }
      ]
    },
    {
      id: 26, section: "Fase 5: Ações do Usuário", context: "Quais ações físicas Sofia realiza no aeroporto?",
      correctAnswer: { description: "Despacha mala e vai ao portão", emojiTag: "🚶‍♀️" },
      options: [
        { id: 'a', text: "Despacha a mala e vai ao portão", points: 10 },
        { id: 'b', text: "Compra lembrancinhas", points: 5 },
        { id: 'c', text: "Lê as avaliações do hotel", points: 0 },
        { id: 'd', text: "Digita a senha do cartão", points: 0 },
        { id: 'e', text: "Salva fotos de referência", points: 0 }
      ]
    },
    {
      id: 27, section: "Fase 5: Emoções", context: "Sentada em frente ao portão de embarque pronta para ir, como ela está?",
      isEmojiSelection: true, correctAnswer: { description: "Feliz e Aliviada", emojiTag: "🥰", lineY: 35 }, 
      options: [
        { id: 'a', text: "😡", points: 0 },
        { id: 'b', text: "😰", points: 5 },
        { id: 'c', text: "🥰", points: 10 },
        { id: 'd', text: "🧐", points: 0 },
        { id: 'e', text: "😵‍💫", points: 0 }
      ]
    },
    {
      id: 28, section: "Fase 5: Pensamentos", context: "Relaxada, olhando os aviões pela janela, o que ela pensa?",
      correctAnswer: { description: "Tudo deu certo, finalmente férias!", emojiTag: "✨" },
      options: [
        { id: 'a', text: "Como usar essa planilha?", points: 0 },
        { id: 'b', text: "Para onde será que eu vou?", points: 0 },
        { id: 'c', text: "Esse review parece falso", points: 5 },
        { id: 'd', text: "Tudo deu certo, finalmente férias!", points: 10 },
        { id: 'e', text: "Espero que o cartão tenha limite", points: 0 }
      ]
    },
    {
      id: 29, section: "Fase 5: Pontos de Contato", context: "Neste último momento, ela interage no mundo físico. Qual é o ponto de contato?",
      correctAnswer: { description: "Balcão e Raio-X (Aeroporto)", emojiTag: "🏢" },
      options: [
        { id: 'a', text: "Balcão e Raio-X (Aeroporto)", points: 10 },
        { id: 'b', text: "Buscador de Hotéis", points: 0 },
        { id: 'c', text: "Planilha Financeira", points: 0 },
        { id: 'd', text: "Checkout Online", points: 0 },
        { id: 'e', text: "Redes Sociais", points: 5 }
      ]
    }
  ]
};