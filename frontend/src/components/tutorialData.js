
export const PIZZA_SCENARIO = {
  title: "Tutorial Completo: A Jornada da Pizza 🍕",
  introQuestion: "Você está pronto para construir o mapa completo com 3 Fases?",
  
  scenarioMeta: {
    name: "Jornada do Jantar de Sexta-Feira",
    description: "Mapeamento da experiência do usuário João ao pedir uma pizza via aplicativo num dia cansativo de trabalho. O objetivo é identificar pontos de atrito na escolha do sabor e na espera."
  },

  scenarioText: `
    CENÁRIO COMPLETO:
    
    1. FASE DA FOME (19:00): João chega em casa, abre a geladeira e vê que está vazia. Ele se sente frustrado e pensa: "Vou ter que pedir algo".
    
    2. FASE DO PEDIDO (19:10): Ele senta no sofá, abre o aplicativo de delivery. Fica indeciso entre sabores, mas acaba pedindo de calabresa.
    
    3. FASE DA ENTREGA (19:50): A campainha toca. João recebe a pizza, o cheiro é ótimo. Ele come e se sente feliz e satisfeito.
    
    ---
    SUA TAREFA: Você vai mapear cada uma dessas 3 fases, preenchendo todas as linhas (Ações, Emoções, Pensamentos e Pontos de Contato).
  `,
  steps: [
    // --- FASE 1: A FOME ---
    {
      id: 1,
      section: "Fase 1: Fases da Jornada",
      context: "Começando às 19:00. Qual nome define o momento que João abre a geladeira?",
      correctAnswer: { description: "Descoberta da Fome", emojiTag: "😫" },
      options: [
        { id: 'a', text: "Descoberta da Fome", correct: true, feedback: "Correto! É o gatilho da jornada." },
        { id: 'b', text: "Pagamento", correct: false, feedback: "Muito cedo para isso." },
        { id: 'c', text: "Dormir", correct: false, feedback: "Ele está com fome, não com sono." }
      ]
    },
    {
      id: 2,
      section: "Fase 1: Ações do Usuário",
      context: "O que João faz fisicamente nessa fase?",
      correctAnswer: { description: "Abre a geladeira vazia", emojiTag: "❄️" },
      options: [
        { id: 'a', text: "Pega o celular", correct: false, feedback: "Ainda não. Primeiro ele checa a comida." },
        { id: 'b', text: "Abre a geladeira vazia", correct: true, feedback: "Isso. Uma ação observável." },
        { id: 'c', text: "Come uma maçã", correct: false, feedback: "A geladeira está vazia!" }
      ]
    },
    {
      id: 3,
      section: "Fase 1: Emoções",
      context: "Como ele se sente ao ver a geladeira vazia?",
      isEmojiSelection: true,
      correctAnswer: { description: "Frustrado", emojiTag: "😫", lineY: -30 }, // Ponto baixo
      options: [
        { id: 'a', text: "😁", correct: false, feedback: "Ninguém fica feliz sem comida." },
        { id: 'b', text: "😫", correct: true, feedback: "Exato. Frustração e fome." },
        { id: 'c', text: "😴", correct: false, feedback: "Ele não está com sono." }
      ]
    },
    {
      id: 4,
      section: "Fase 1: Pensamentos",
      context: "O que ele pensa?",
      correctAnswer: { description: "Não tem nada pra comer...", emojiTag: "🚫" },
      options: [
        { id: 'a', text: "Que dia lindo", correct: false, feedback: "O foco é a fome." },
        { id: 'b', text: "Não tem nada pra comer...", correct: true, feedback: "O pensamento direto da situação." },
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
        { id: 'b', text: "Geladeira de Casa", correct: true, feedback: "Correto. O objeto físico." },
        { id: 'c', text: "Motoboy", correct: false, feedback: "Ainda não." }
      ]
    },

    // --- FASE 2: O PEDIDO ---
    {
      id: 6,
      section: "Fase 2: Fases da Jornada",
      context: "Agora às 19:10. Ele decide pedir. Qual é a fase?",
      correctAnswer: { description: "Escolha no App", emojiTag: "📱" },
      options: [
        { id: 'a', text: "Cozinhar", correct: false, feedback: "Ele desistiu de cozinhar." },
        { id: 'b', text: "Escolha no App", correct: true, feedback: "Sim, o processo de compra." },
        { id: 'c', text: "Lavar Louça", correct: false, feedback: "Não faz sentido agora." }
      ]
    },
    {
      id: 7,
      section: "Fase 2: Ações do Usuário",
      context: "O que ele faz no sofá?",
      correctAnswer: { description: "Navega no cardápio", emojiTag: "👆" },
      options: [
        { id: 'a', text: "Navega no cardápio", correct: true, feedback: "Ação de usar o app." },
        { id: 'b', text: "Corre", correct: false, feedback: "Ele está sentado." },
        { id: 'c', text: "Grita", correct: false, feedback: "Sem necessidade." }
      ]
    },
    {
      id: 8,
      section: "Fase 2: Emoções",
      context: "Ele não sabe qual sabor escolher. Como se sente?",
      isEmojiSelection: true,
      correctAnswer: { description: "Indeciso", emojiTag: "🤔", lineY: 0 }, // Neutro
      options: [
        { id: 'a', text: "😡", correct: false, feedback: "Não é raiva, é dúvida." },
        { id: 'b', text: "🤔", correct: true, feedback: "Isso. Pensativo/Indeciso." },
        { id: 'c', text: "😭", correct: false, feedback: "Exagerado." }
      ]
    },
    {
      id: 9,
      section: "Fase 2: Pensamentos",
      context: "Qual a dúvida dele?",
      correctAnswer: { description: "Calabresa ou Queijo?", emojiTag: "🍕" },
      options: [
        { id: 'a', text: "Será que vai chover?", correct: false, feedback: "Foco na pizza." },
        { id: 'b', text: "Calabresa ou Queijo?", correct: true, feedback: "A dúvida da compra." },
        { id: 'c', text: "O app travou", correct: false, feedback: "O cenário não diz isso." }
      ]
    },
    {
      id: 10,
      section: "Fase 2: Pontos de Contato",
      context: "Onde ele escolhe a pizza?",
      correctAnswer: { description: "App", emojiTag: "🛒" },
      options: [
        { id: 'a', text: "Telefone Fixo", correct: false, feedback: "Ele está usando um app." },
        { id: 'b', text: "App", correct: true, feedback: "Canal digital." },
        { id: 'c', text: "Panfleto de Papel", correct: false, feedback: "É um app." }
      ]
    },

    // --- FASE 3: ENTREGA ---
    {
      id: 11,
      section: "Fase 3: Fases da Jornada",
      context: "19:50. A campainha toca. Qual é a fase final?",
      correctAnswer: { description: "Recebimento e Consumo", emojiTag: "😋" },
      options: [
        { id: 'a', text: "Reclamação", correct: false, feedback: "Tudo correu bem." },
        { id: 'b', text: "Recebimento e Consumo", correct: true, feedback: "O fim da jornada." },
        { id: 'c', text: "Devolução", correct: false, feedback: "Ele quer comer!" }
      ]
    },
    {
      id: 12,
      section: "Fase 3: Ações do Usuário",
      context: "O que ele faz quando a pizza chega?",
      correctAnswer: { description: "Pega a caixa e come", emojiTag: "🍴" },
      options: [
        { id: 'a', text: "Pega a caixa e come", correct: true, feedback: "A recompensa." },
        { id: 'b', text: "Joga fora", correct: false, feedback: "Jamais!" },
        { id: 'c', text: "Vai dormir", correct: false, feedback: "De barriga cheia, talvez depois." }
      ]
    },
    {
      id: 13,
      section: "Fase 3: Emoções",
      context: "Comendo uma pizza quente. Como ele está?",
      isEmojiSelection: true,
      correctAnswer: { description: "Satisfeito", emojiTag: "🥰", lineY: 35 }, // Ponto alto
      options: [
        { id: 'a', text: "🤢", correct: false, feedback: "A pizza estava boa." },
        { id: 'b', text: "🥰", correct: true, feedback: "Felicidade pura." },
        { id: 'c', text: "😠", correct: false, feedback: "Por que estaria bravo?" }
      ]
    },
    {
      id: 14,
      section: "Fase 3: Pensamentos",
      context: "O veredito final:",
      correctAnswer: { description: "Estava ótima!", emojiTag: "❤️" },
      options: [
        { id: 'a', text: "Nunca mais peço", correct: false, feedback: "Ele gostou." },
        { id: 'b', text: "Estava ótima!", correct: true, feedback: "Satisfação do cliente." },
        { id: 'c', text: "Vou pedir outra", correct: false, feedback: "Já está cheio." }
      ]
    },
    {
      id: 15,
      section: "Fase 3: Pontos de Contato",
      context: "O que ele tem em mãos?",
      correctAnswer: { description: "Caixa de Pizza", emojiTag: "📦" },
      options: [
        { id: 'a', text: "Caixa de Pizza", correct: true, feedback: "O produto final." },
        { id: 'b', text: "O celular", correct: false, feedback: "Já largou o celular." },
        { id: 'c', text: "A TV", correct: false, feedback: "Não é o foco." }
      ]
    }
  ]
};

export const STREAMING_SCENARIO = {
  title: "Nível Intermediário: A Assinatura de Streaming 📺",
  introQuestion: "Neste nível, vamos mapear uma jornada de 4 fases. As opções são mais parecidas, então preste atenção aos detalhes do cenário!",
  scenarioMeta: {
    name: "Assinatura do CineStream",
    description: "A jornada de Mariana, que busca um novo serviço de filmes para o final de semana. O objetivo é identificar o impacto da lentidão no cadastro e a satisfação final."
  },
  scenarioText: `Mariana quer assinar um novo serviço de streaming porque sua série favorita mudou de plataforma.

  1. FASE DE PESQUISA: Mariana abre o Google e busca por "melhores serviços de streaming 2024". Ela lê comparativos em blogs de tecnologia e fica em dúvida sobre os preços.
  
  2. FASE DE ESCOLHA: Ela entra no site oficial do 'CineStream'. Analisa os planos (Básico vs Premium). Ela decide pelo Premium por causa da resolução 4K, mas se preocupa com o valor mensal.
  
  3. FASE DE CADASTRO: Mariana preenche seus dados e insere o cartão de crédito. O site está muito lento, o que a deixa impaciente e irritada, mas ela insiste e finaliza a compra.
  
  4. FASE DE USO: Mariana finalmente abre o app na TV. A interface é muito intuitiva e ela encontra o filme que queria. Ela se sente relaxada e pensa: "Valeu o investimento".`,
  
  steps: [
    // --- FASE 1: PESQUISA ---
    {
      section: "Fase 1: Fases da Jornada",
      context: "Mariana percebe que precisa de um novo serviço e começa a levantar opções. Como chamamos essa etapa?",
      options: [
        { id: 1, text: "Consideração", correct: false, feedback: "A consideração vem quando ela já tem uma lista curta de opções." },
        { id: 2, text: "Pesquisa e Aprendizado", correct: true, feedback: "Correto! É a fase de descoberta e busca de informações.", description: "Pesquisa e Aprendizado", emojiTag: "🔍" },
        { id: 3, text: "Decisão de Compra", correct: false, feedback: "Ela ainda está apenas olhando o que existe no mercado." },
        { id: 4, text: "Reconhecimento do Problema", correct: false, feedback: "Isso foi o gatilho, a fase atual já é a busca ativa." }
      ],
      correctAnswer: { description: "Pesquisa e Aprendizado", emojiTag: "🔍" }
    },
    {
      section: "Fase 1: Ações do Usuário",
      context: "Qual a ação principal de Mariana no início dessa jornada?",
      options: [
        { id: 1, text: "Acessar o site do CineStream", correct: false, feedback: "Isso acontece na fase 2. Agora ela está em blogs externos." },
        { id: 2, text: "Comparar serviços em blogs", correct: true, feedback: "Exato! Ela está buscando opiniões de terceiros.", description: "Comparar serviços em blogs", emojiTag: "📑" },
        { id: 3, text: "Baixar o aplicativo na TV", correct: false, feedback: "Ela só fará isso depois de assinar." },
        { id: 4, text: "Solicitar período de teste", correct: false, feedback: "O cenário não menciona testes gratuitos nesta fase." }
      ],
      correctAnswer: { description: "Comparar serviços em blogs", emojiTag: "📑" }
    },
    {
      section: "Fase 1: Emoções",
      context: "Mariana vê muitos preços e catálogos diferentes. Como ela se sente?",
      isEmojiSelection: true,
      options: [
        { id: 1, text: "😀", correct: false, feedback: "Ela ainda está em dúvida, não necessariamente alegre." },
        { id: 2, text: "🤨", correct: true, feedback: "Sim, ela está analítica e confusa com as opções.", emojiTag: "🤨", lineY: -15 },
        { id: 3, text: "😍", correct: false, feedback: "Ela ainda não se apaixonou por nenhum serviço." },
        { id: 4, text: "😴", correct: false, feedback: "Ela está interessada na série, não entediada." }
      ],
      correctAnswer: { emojiTag: "🤨", lineY: -15 }
    },
    {
      section: "Fase 1: Pensamentos",
      context: "O que passa pela cabeça de Mariana enquanto lê os blogs?",
      options: [
        { id: 1, text: "Será que vale a pena assinar?", correct: true, feedback: "Isso! É a dúvida clássica da fase de pesquisa.", description: "Será que vale a pena?", emojiTag: "💭" },
        { id: 2, text: "O site está travando", correct: false, feedback: "Isso só acontecerá no cadastro." },
        { id: 3, text: "A imagem 4K é perfeita", correct: false, feedback: "Ela só pensará nisso quando estiver assistindo." },
        { id: 4, text: "Vou cancelar os outros", correct: false, feedback: "Foco no levantamento inicial de custos." }
      ],
      correctAnswer: { description: "Será que vale a pena?", emojiTag: "💭" }
    },
    {
      section: "Fase 1: Pontos de Contato",
      context: "Qual o canal de interação Mariana está usando?",
      options: [
        { id: 1, text: "App Store", correct: false, feedback: "Ela está usando o navegador, não a loja de apps." },
        { id: 2, text: "Google e Blogs Tech", correct: true, feedback: "Correto! Canais de busca e conteúdo especializado.", description: "Google e Blogs Tech", emojiTag: "🌐" },
        { id: 3, text: "Navegador da Smart TV", correct: false, feedback: "Ela está pesquisando no computador/celular." },
        { id: 4, text: "Suporte via Chat", correct: false, feedback: "Ela ainda não falou com a empresa." }
      ],
      correctAnswer: { description: "Google e Blogs Tech", emojiTag: "🌐" }
    },

    // --- FASE 2: ESCOLHA ---
    {
      section: "Fase 2: Fases da Jornada",
      context: "Mariana agora está focada apenas no site do CineStream. Que etapa é esta?",
      options: [
        { id: 1, text: "Avaliação da Intenção", correct: false, feedback: "Termo incorreto. Ela está avaliando as opções da marca." },
        { id: 2, text: "Consideração da Solução", correct: true, feedback: "Exato! Ela reduziu as opções e está avaliando o CineStream.", description: "Consideração da Solução", emojiTag: "⚖️" },
        { id: 3, text: "Engajamento Inicial", correct: false, feedback: "Engajamento costuma ser após a conversão." },
        { id: 4, text: "Retenção de Cliente", correct: false, feedback: "Ela ainda nem é cliente!" }
      ],
      correctAnswer: { description: "Consideração da Solução", emojiTag: "⚖️" }
    },
    {
      section: "Fase 2: Ações do Usuário",
      context: "O que Mariana faz dentro do site?",
      options: [
        { id: 1, text: "Lê a política de privacidade", correct: false, feedback: "O cenário diz que ela analisa os planos." },
        { id: 2, text: "Analisa planos e recursos", correct: true, feedback: "Sim, comparando Básico vs Premium.", description: "Análise de planos e recursos", emojiTag: "📊" },
        { id: 3, text: "Cria uma senha forte", correct: false, feedback: "Isso será na fase de cadastro." },
        { id: 4, text: "Assiste um trailer", correct: false, feedback: "O foco dela agora é a escolha do plano." }
      ],
      correctAnswer: { description: "Análise de planos e recursos", emojiTag: "📊" }
    },
    {
      section: "Fase 2: Emoções",
      context: "Ela decide pelo Premium, mas o preço a incomoda um pouco. Como ela se sente?",
      isEmojiSelection: true,
      options: [
        { id: 1, text: "😭", correct: false, feedback: "Muito exagerado." },
        { id: 2, text: "😟", correct: true, feedback: "Sim, uma leve preocupação com o custo.", emojiTag: "😟", lineY: -15 },
        { id: 3, text: "🤩", correct: false, feedback: "Ela está decidida, mas o preço é um ponto negativo." },
        { id: 4, text: "😡", correct: false, feedback: "Ainda não chegou a irritação com o site." }
      ],
      correctAnswer: { emojiTag: "😟", lineY: -15 }
    },
    {
      section: "Fase 2: Pensamentos",
      context: "O que Mariana pensa ao escolher o plano mais caro?",
      options: [
        { id: 1, text: "Preciso de 4K para minha TV", correct: true, feedback: "Correto! É a justificativa para o gasto maior.", description: "Preciso de 4K na TV", emojiTag: "📺" },
        { id: 2, text: "Vou dividir a conta", correct: false, feedback: "O cenário não menciona outras pessoas." },
        { id: 3, text: "O site está muito lerdo", correct: false, feedback: "Isso acontece no próximo passo." },
        { id: 4, text: "O suporte é bom?", correct: false, feedback: "Ela está focada na qualidade da imagem." }
      ],
      correctAnswer: { description: "Preciso de 4K na TV", emojiTag: "📺" }
    },
    {
      section: "Fase 2: Pontos de Contato",
      context: "Onde essa análise de planos está ocorrendo?",
      options: [
        { id: 1, text: "Banner Publicitário", correct: false, feedback: "Ela já clicou e está dentro do site." },
        { id: 2, text: "Site Oficial (Preços)", correct: true, feedback: "Isso! A página de planos do site.", description: "Site Oficial (Preços)", emojiTag: "💻" },
        { id: 3, text: "E-mail de Boas-vindas", correct: false, feedback: "Ela ainda não se cadastrou." },
        { id: 4, text: "Redes Sociais", correct: false, feedback: "Ela está no domínio da empresa agora." }
      ],
      correctAnswer: { description: "Site Oficial (Preços)", emojiTag: "💻" }
    },

    // --- FASE 3: CADASTRO ---
    {
      section: "Fase 3: Fases da Jornada",
      context: "Mariana preenche os dados e paga. Como chamamos este momento?",
      options: [
        { id: 1, text: "Conversão / Compra", correct: true, feedback: "Exato! É o momento onde ela se torna cliente.", description: "Conversão / Compra", emojiTag: "💳" },
        { id: 2, text: "Inscrição em Newsletter", correct: false, feedback: "Newsletter é apenas e-mail, aqui é assinatura paga." },
        { id: 3, text: "Configuração de Conta", correct: false, feedback: "Isso vem após o pagamento ser aprovado." },
        { id: 4, text: "Adoção do Produto", correct: false, feedback: "Adoção envolve o uso recorrente, não apenas o checkout." }
      ],
      correctAnswer: { description: "Conversão / Compra", emojiTag: "💳" }
    },
    {
      section: "Fase 3: Ações do Usuário",
      context: "O que ela faz enquanto o site demora a carregar?",
      options: [
        { id: 1, text: "Reinicia o computador", correct: false, feedback: "Ela insiste e espera o site carregar." },
        { id: 2, text: "Preenche dados e aguarda", correct: true, feedback: "Sim, ela está no processo de checkout.", description: "Preenche dados e aguarda", emojiTag: "⌨️" },
        { id: 3, text: "Cancela o pagamento", correct: false, feedback: "Ela finaliza a compra apesar da lentidão." },
        { id: 4, text: "Limpa os cookies", correct: false, feedback: "O cenário não cita essa ação técnica." }
      ],
      correctAnswer: { description: "Preenche dados e aguarda", emojiTag: "⌨️" }
    },
    {
      section: "Fase 3: Emoções",
      context: "O site demora muito. Qual o sentimento de Mariana?",
      isEmojiSelection: true,
      options: [
        { id: 1, text: "🤩", correct: false, feedback: "Ninguém fica maravilhado com um site lento." },
        { id: 2, text: "😡", correct: true, feedback: "Isso! Impaciência e irritação.", emojiTag: "😡", lineY: -60 },
        { id: 3, text: "😴", correct: false, feedback: "Ela está irritada, não com sono." },
        { id: 4, text: "🤨", correct: false, feedback: "A dúvida da fase 1 virou raiva pela má performance do site." }
      ],
      correctAnswer: { emojiTag: "😡", lineY: -60 }
    },
    {
      section: "Fase 3: Pensamentos",
      context: "O que ela pensa enquanto a barra de carregamento trava?",
      options: [
        { id: 1, text: "Que site horrível!", correct: true, feedback: "Sim, a má experiência técnica gera esse pensamento.", description: "Que site horrível!", emojiTag: "💢" },
        { id: 2, text: "Será que meu cartão tem limite?", correct: false, feedback: "A irritação é com a lentidão do site." },
        { id: 3, text: "Vou pedir uma pizza", correct: false, feedback: "Cenário errado! Aqui é streaming." },
        { id: 4, text: "Amanhã eu tento de novo", correct: false, feedback: "Ela insiste até conseguir hoje." }
      ],
      correctAnswer: { description: "Que site horrível!", emojiTag: "💢" }
    },
    {
      section: "Fase 3: Pontos de Contato",
      context: "Com qual parte do sistema ela interage agora?",
      options: [
        { id: 1, text: "Gateway de Pagamento", correct: true, feedback: "Correto! É a interface de inserção do cartão.", description: "Gateway de Pagamento", emojiTag: "🔒" },
        { id: 2, text: "Fórum de Usuários", correct: false, feedback: "Ela está no ambiente oficial de compra." },
        { id: 3, text: "Página inicial do Google", correct: false, feedback: "Ela já saiu do Google faz tempo." },
        { id: 4, text: "Aplicativo da Smart TV", correct: false, feedback: "Ela ainda está no site para pagar." }
      ],
      correctAnswer: { description: "Gateway de Pagamento", emojiTag: "🔒" }
    },

    // --- FASE 4: USO ---
    {
      section: "Fase 4: Fases da Jornada",
      context: "Mariana finalmente utiliza o serviço na TV. Que etapa é esta?",
      options: [
        { id: 1, text: "Suporte ao Cliente", correct: false, feedback: "Ela não teve problemas no uso, apenas usou." },
        { id: 2, text: "Experiência de Uso", correct: true, feedback: "Exato! É o momento do consumo do produto.", description: "Experiência de Uso", emojiTag: "🎬" },
        { id: 3, text: "Pós-Venda", correct: false, feedback: "Pós-venda costuma envolver feedback direto para a empresa." },
        { id: 4, text: "Fidelização", correct: false, feedback: "Ela está gostando, mas fidelizar leva tempo." }
      ],
      correctAnswer: { description: "Experiência de Uso", emojiTag: "🎬" }
    },
    {
      section: "Fase 4: Ações do Usuário",
      context: "O que Mariana faz ao abrir o app na TV?",
      options: [
        { id: 1, text: "Cria um novo perfil", correct: false, feedback: "O cenário foca na facilidade de achar o filme." },
        { id: 2, text: "Encontra o filme e assiste", correct: true, feedback: "Isso! Ação direta de consumo.", description: "Encontra o filme e assiste", emojiTag: "🍿" },
        { id: 3, text: "Muda a senha", correct: false, feedback: "Não há motivo para isso agora." },
        { id: 4, text: "Luta com o controle remoto", correct: false, feedback: "O cenário diz que a interface é intuitiva." }
      ],
      correctAnswer: { description: "Encontra o filme e assiste", emojiTag: "🍿" }
    },
    {
      section: "Fase 4: Emoções",
      context: "Mariana está relaxada e o filme é ótimo. Como ela se sente?",
      isEmojiSelection: true,
      options: [
        { id: 1, text: "🥰", correct: true, feedback: "Correto! Satisfação total após o estresse do cadastro.", emojiTag: "🥰", lineY: 35 },
        { id: 2, text: "😟", correct: false, feedback: "A preocupação com o preço sumiu ao ver a qualidade." },
        { id: 3, text: "😡", correct: false, feedback: "Ela já esqueceu a lentidão do site." },
        { id: 4, text: "🤨", correct: false, feedback: "Ela não tem mais dúvidas." }
      ],
      correctAnswer: { emojiTag: "🥰", lineY: 35 }
    },
    {
      section: "Fase 4: Pensamentos",
      context: "Qual a conclusão de Mariana no final da noite?",
      options: [
        { id: 1, text: "Valeu o investimento!", correct: true, feedback: "Sim! A qualidade compensou o custo e o esforço.", description: "Valeu o investimento!", emojiTag: "💎" },
        { id: 2, text: "Vou cancelar amanhã", correct: false, feedback: "Ela está satisfeita." },
        { id: 3, text: "O Básico era melhor", correct: false, feedback: "Ela está feliz com o Premium e o 4K." },
        { id: 4, text: "O site ainda está lento", correct: false, feedback: "Ela está no App agora, que funciona bem." }
      ],
      correctAnswer: { description: "Valeu o investimento!", emojiTag: "💎" }
    },
    {
      section: "Fase 4: Pontos de Contato",
      context: "Qual o canal final de interação?",
      options: [
        { id: 1, text: "Site no Navegador", correct: false, feedback: "Agora ela está na TV." },
        { id: 2, text: "App na Smart TV", correct: true, feedback: "Correto! É onde a experiência final acontece.", description: "App na Smart TV", emojiTag: "📺" },
        { id: 3, text: "Controle Remoto", correct: false, feedback: "O controle é um acessório, o canal é o App." },
        { id: 4, text: "Notificação Push", correct: false, feedback: "Ela que abriu o app, não foi chamada por notificação." }
      ],
      correctAnswer: { description: "App na Smart TV", emojiTag: "📺" }
    }
  ]
};

export const ADVANCED_SCENARIO = {
  title: "Nível Avançado: Planejamento de Viagem Internacional ✈️",
  introQuestion: "Este é o desafio final! Vamos mapear 5 fases completas. As alternativas foram elaboradas para confundir com outras etapas, então preste muita atenção ao que está acontecendo AGORA.",
  
  scenarioMeta: {
    name: "Planejamento de Viagem Internacional",
    description: "A jornada complexa e demorada desde a idealização da viagem até o momento de embarcar no aeroporto."
  },

  scenarioText: `
    CENÁRIO COMPLETO:
    
    1. FASE DE INSPIRAÇÃO: Mariana decide que quer viajar nas férias, mas não sabe para onde. Ela passa horas no Pinterest e no Google Flights buscando destinos exóticos e baratos, sonhando acordada.
    
    2. FASE DE PLANEJAMENTO FINANCEIRO: Ela finalmente escolhe a Itália. Porém, ao ver os custos base, percebe que precisa economizar muito. Ela cria uma planilha e se sente preocupada com os cortes de gastos.
    
    3. FASE DE COMPRA: O mês da viagem se aproxima. Mariana entra no site da companhia aérea para fechar o voo. Ela sente uma enorme tensão ao digitar os dados do cartão de crédito (é muito dinheiro!), mas após 1 minuto a tela mostra "Compra Aprovada".
    
    4. FASE DE RESERVA DE HOSPEDAGEM: Passagens garantidas, ela entra no Airbnb e no Booking para procurar estadia perto do centro. Fica sobrecarregada com a quantidade de opções e com medo de escolher um lugar ruim, mas opta pelo mais bem avaliado.
    
    5. DIA DO EMBARQUE: O grande dia chega! Mariana chega ao aeroporto, despacha a mala no balcão físico, passa pelo raio-X e senta no portão de embarque. Ela está radiante e aliviada por tudo ter dado certo.
  `,
  
  steps: [
    // --- FASE 1: INSPIRAÇÃO ---
    {
      id: 1,
      section: "Fase 1: Fases da Jornada",
      context: "Mariana quer viajar e começou a buscar destinos sem ter nada definido ainda. Como essa fase inicial se chama?",
      correctAnswer: { description: "Pesquisa e Inspiração", emojiTag: "💡" },
      options: [
        { id: 'a', text: "Conscientização de Compra", correct: false, feedback: "Termo de marketing. 'Inspiração' define melhor a exploração inicial de destinos." },
        { id: 'b', text: "Decisão de Destino", correct: false, feedback: "Ela está em dúvida, ainda não decidiu nada." },
        { id: 'c', text: "Pesquisa e Inspiração", correct: true, feedback: "Exato! Fase de exploração, onde o usuário está aberto a possibilidades." },
        { id: 'd', text: "Planejamento Logístico", correct: false, feedback: "Planejar a logística vem depois de saber para onde vai." },
        { id: 'e', text: "Avaliação de Custos", correct: false, feedback: "Isso é o tema principal da Fase 2." }
      ]
    },
    {
      id: 2,
      section: "Fase 1: Ações do Usuário",
      context: "O que Mariana faz para encontrar seu destino ideal?",
      correctAnswer: { description: "Navega no Pinterest e Voos", emojiTag: "🖱️" },
      options: [
        { id: 'a', text: "Verifica o limite do cartão", correct: false, feedback: "Ela fará isso na fase de compra, não na inspiração." },
        { id: 'b', text: "Cria uma planilha de despesas", correct: false, feedback: "A planilha só entra na Fase 2 (Planejamento Financeiro)." },
        { id: 'c', text: "Navega no Pinterest e Voos", correct: true, feedback: "Correto! É a ação observável dela no Google Flights e Pinterest." },
        { id: 'd', text: "Lê avaliações de hotéis", correct: false, feedback: "Hospedagem é apenas na Fase 4. Ela nem tem o voo ainda." },
        { id: 'e', text: "Entra em contato com agência", correct: false, feedback: "O cenário diz que ela pesquisa sozinha no Google e Pinterest." }
      ]
    },
    {
      id: 3,
      section: "Fase 1: Emoções",
      context: "Imaginando-se em lugares incríveis, qual o sentimento de Mariana?",
      isEmojiSelection: true,
      correctAnswer: { description: "Sonhadora", emojiTag: "🤩", lineY: 35 }, 
      options: [
        { id: 'a', text: "😵‍💫", correct: false, feedback: "Ela não está confusa ou tonta ainda, está apenas sonhando." },
        { id: 'b', text: "🧐", correct: false, feedback: "Ela ficará analítica assim na Fase 2 (planilha)." },
        { id: 'c', text: "🤩", correct: true, feedback: "Perfeito! A fase de inspiração costuma ser um ponto alto emocionalmente.", emojiTag: "🤩", lineY: 35 },
        { id: 'd', text: "😰", correct: false, feedback: "A tensão só vem na hora de passar o cartão (Fase 3)." },
        { id: 'e', text: "😌", correct: false, feedback: "O alívio é o sentimento da Fase 5, após o embarque." }
      ]
    },
    {
      id: 4,
      section: "Fase 1: Pensamentos",
      context: "Durante essa busca aberta, qual é o pensamento dominante dela?",
      correctAnswer: { description: "Qual destino cabe no orçamento?", emojiTag: "💭" },
      options: [
        { id: 'a', text: "Espero que o hotel seja bom", correct: false, feedback: "Hospedagem é Fase 4." },
        { id: 'b', text: "Vou precisar cortar o delivery", correct: false, feedback: "Isso acontece quando ela começa a preencher a planilha na Fase 2." },
        { id: 'c', text: "Será que meu voo atrasa?", correct: false, feedback: "Pensamento muito precoce, isso seria na Fase 5." },
        { id: 'd', text: "Qual destino cabe no orçamento?", correct: true, feedback: "Exato! A intersecção entre o sonho e a realidade financeira inicial." },
        { id: 'e', text: "A transação vai aprovar?", correct: false, feedback: "Esse é o medo específico da Fase 3 (Compra)." }
      ]
    },
    {
      id: 5,
      section: "Fase 1: Pontos de Contato",
      context: "Onde ocorre a interação de Mariana com a ideia de viagem nesta fase?",
      correctAnswer: { description: "Buscadores e Redes Sociais", emojiTag: "📱" },
      options: [
        { id: 'a', text: "Sistema de Checkout Aéreo", correct: false, feedback: "Ela não está comprando passagem ainda." },
        { id: 'b', text: "Buscadores e Redes Sociais", correct: true, feedback: "Google Flights (Buscador) e Pinterest (Rede Social)." },
        { id: 'c', text: "Aplicativo de Hospedagem", correct: false, feedback: "Isso é Fase 4 (Booking/Airbnb)." },
        { id: 'd', text: "Balcão do Aeroporto", correct: false, feedback: "O aeroporto físico só aparece na Fase 5." },
        { id: 'e', text: "Planilha do Excel", correct: false, feedback: "A planilha entra na Fase 2." }
      ]
    },

    // --- FASE 2: PLANEJAMENTO FINANCEIRO ---
    {
      id: 6,
      section: "Fase 2: Fases da Jornada",
      context: "Mariana escolheu a Itália, mas agora precisa lidar com o dinheiro. Que fase é esta?",
      correctAnswer: { description: "Planejamento Financeiro", emojiTag: "📈" },
      options: [
        { id: 'a', text: "Organização do Roteiro", correct: false, feedback: "O roteiro diz respeito aos passeios lá, aqui ela está cuidando do dinheiro." },
        { id: 'b', text: "Planejamento Financeiro", correct: true, feedback: "Correto! Momento de equilibrar as finanças para realizar a viagem." },
        { id: 'c', text: "Pagamento do Voo", correct: false, feedback: "A compra real só acontece na Fase 3." },
        { id: 'd', text: "Avaliação Pós-Compra", correct: false, feedback: "Ela não comprou nada ainda." },
        { id: 'e', text: "Reserva de Serviços", correct: false, feedback: "Reservas ocorrem mais à frente." }
      ]
    },
    {
      id: 7,
      section: "Fase 2: Ações do Usuário",
      context: "O que ela precisa fazer ativamente nesta etapa?",
      correctAnswer: { description: "Cria planilha e corta gastos", emojiTag: "📝" },
      options: [
        { id: 'a', text: "Cria planilha e corta gastos", correct: true, feedback: "Exato! Ação clara e tática para economizar." },
        { id: 'b', text: "Digita o cartão no site", correct: false, feedback: "Isso é a Fase 3 (Checkout)." },
        { id: 'c', text: "Pesquisa fotos do Coliseu", correct: false, feedback: "Ela já passou da fase de inspiração visual." },
        { id: 'd', text: "Filtra hotéis por avaliação", correct: false, feedback: "Isso acontecerá na Fase 4." },
        { id: 'e', text: "Passa pela segurança", correct: false, feedback: "Fase 5!" }
      ]
    },
    {
      id: 8,
      section: "Fase 2: Emoções",
      context: "Ver o quanto custa viajar para a Itália mexe com ela. Qual a emoção predominante?",
      isEmojiSelection: true,
      correctAnswer: { description: "Preocupada", emojiTag: "🧐", lineY: -15 }, 
      options: [
        { id: 'a', text: "🥰", correct: false, feedback: "Fazer planilhas de corte de gastos não costuma ser tão maravilhoso assim." },
        { id: 'b', text: "😌", correct: false, feedback: "Ela não está aliviada, está calculando sob certa pressão." },
        { id: 'c', text: "🧐", correct: true, feedback: "Sim, ela está analítica, focada e levemente preocupada.", emojiTag: "🧐", lineY: -15 },
        { id: 'd', text: "😰", correct: false, feedback: "O pico de ansiedade financeira virá no momento exato de passar o cartão (Fase 3)." },
        { id: 'e', text: "😡", correct: false, feedback: "Ela não está irritada com nenhuma falha de sistema." }
      ]
    },
    {
      id: 9,
      section: "Fase 2: Pensamentos",
      context: "Diante dos números da viagem, o que Mariana pensa?",
      correctAnswer: { description: "Onde posso cortar despesas?", emojiTag: "✂️" },
      options: [
        { id: 'a', text: "Onde posso cortar despesas?", correct: true, feedback: "Perfeito. O pensamento que guia a ação de economizar." },
        { id: 'b', text: "Qual país devo escolher?", correct: false, feedback: "Ela já escolheu: Itália." },
        { id: 'c', text: "Espero que o pagamento passe", correct: false, feedback: "Isso é pensamento de checkout de compra (Fase 3)." },
        { id: 'd', text: "Esse anfitrião é confiável?", correct: false, feedback: "Pensamento ligado a hospedagem (Fase 4)." },
        { id: 'e', text: "Onde fica o portão 8?", correct: false, feedback: "Isso é no dia do embarque." }
      ]
    },
    {
      id: 10,
      section: "Fase 2: Pontos de Contato",
      context: "Qual é a ferramenta que ela usa para realizar essa fase?",
      correctAnswer: { description: "Planilha de Orçamento", emojiTag: "📊" },
      options: [
        { id: 'a', text: "Google Flights", correct: false, feedback: "Ela usou voos para inspirar custos na Fase 1." },
        { id: 'b', text: "Aplicativo do Airbnb", correct: false, feedback: "Airbnb será o ponto de contato da Fase 4." },
        { id: 'c', text: "Check-in Eletrônico", correct: false, feedback: "Fase 5." },
        { id: 'd', text: "E-mail de confirmação", correct: false, feedback: "Ela ainda não comprou nada." },
        { id: 'e', text: "Planilha de Orçamento", correct: true, feedback: "A ferramenta de controle financeiro dela." }
      ]
    },

    // --- FASE 3: COMPRA ---
    {
      id: 11,
      section: "Fase 3: Fases da Jornada",
      context: "Mês da viagem chegou. Ela está no site da companhia aérea inserindo os dados para pagar. Que etapa é essa?",
      correctAnswer: { description: "Checkout e Compra", emojiTag: "💳" },
      options: [
        { id: 'a', text: "Checkout e Compra", correct: true, feedback: "A fase de conversão final da passagem." },
        { id: 'b', text: "Emissão do Cartão de Embarque", correct: false, feedback: "O cartão de embarque só é emitido no check-in, perto da viagem." },
        { id: 'c', text: "Planejamento Financeiro", correct: false, feedback: "Isso acabou de acontecer (Fase 2)." },
        { id: 'd', text: "Reserva de Acomodação", correct: false, feedback: "A hospedagem vem logo depois (Fase 4)." },
        { id: 'e', text: "Serviço de Bordo", correct: false, feedback: "Ela ainda nem pisou no avião." }
      ]
    },
    {
      id: 12,
      section: "Fase 3: Ações do Usuário",
      context: "O que Mariana faz concretamente nesse momento de tensão?",
      correctAnswer: { description: "Digita dados e confirma compra", emojiTag: "💻" },
      options: [
        { id: 'a', text: "Pesquisa sobre o clima na Itália", correct: false, feedback: "Isso seria Fase 1." },
        { id: 'b', text: "Abre o banco e vê o extrato", correct: false, feedback: "Fase 2." },
        { id: 'c', text: "Digita dados e confirma compra", correct: true, feedback: "O preenchimento do formulário de pagamento." },
        { id: 'd', text: "Envia mensagem ao anfitrião", correct: false, feedback: "Fase 4 (Hospedagem)." },
        { id: 'e', text: "Despacha a bagagem", correct: false, feedback: "Fase 5." }
      ]
    },
    {
      id: 13,
      section: "Fase 3: Emoções",
      context: "Sendo um valor muito alto, Mariana fica apreensiva esperando a tela de aprovação. Qual a emoção?",
      isEmojiSelection: true,
      correctAnswer: { description: "Ansiosa/Tensa", emojiTag: "😰", lineY: -30 }, 
      options: [
        { id: 'a', text: "🤩", correct: false, feedback: "Ela estava assim na pesquisa (Fase 1)." },
        { id: 'b', text: "😰", correct: true, feedback: "Exato! Pagamentos de alto valor causam picos de ansiedade.", emojiTag: "😰", lineY: -30 },
        { id: 'c', text: "😡", correct: false, feedback: "O sistema não falhou, ela só está nervosa." },
        { id: 'd', text: "😵‍💫", correct: false, feedback: "Ela não está confusa, sabe muito bem o que está fazendo." },
        { id: 'e', text: "😌", correct: false, feedback: "O alívio vem DEPOIS que a tela aprova, mas a emoção dominante da ação é a tensão." }
      ]
    },
    {
      id: 14,
      section: "Fase 3: Pensamentos",
      context: "Enquanto a 'bolinha' do site carrega o pagamento, qual é o pensamento dela?",
      correctAnswer: { description: "Aprova logo, por favor!", emojiTag: "🙏" },
      options: [
        { id: 'a', text: "Qual a senha do meu Wi-Fi?", correct: false, feedback: "Nada a ver com o contexto." },
        { id: 'b', text: "Espero que o hotel tenha café", correct: false, feedback: "Ela ainda está comprando o voo!" },
        { id: 'c', text: "Aprova logo, por favor!", correct: true, feedback: "O clássico pensamento durante o processamento do cartão." },
        { id: 'd', text: "Esqueci de trancar a casa", correct: false, feedback: "Ela não saiu de casa ainda." },
        { id: 'e', text: "Quero comer massa e pizza", correct: false, feedback: "Isso é inspiração, agora o foco é a transação bancária." }
      ]
    },
    {
      id: 15,
      section: "Fase 3: Pontos de Contato",
      context: "Onde o pagamento está sendo processado fisicamente/digitalmente?",
      correctAnswer: { description: "Site da Companhia Aérea", emojiTag: "✈️" },
      options: [
        { id: 'a', text: "Balcão de Check-in", correct: false, feedback: "Isso é físico, no aeroporto (Fase 5)." },
        { id: 'b', text: "Site da Companhia Aérea", correct: true, feedback: "O ambiente digital de checkout da empresa aérea." },
        { id: 'c', text: "Máquina de Cartão Física", correct: false, feedback: "Ela está comprando em casa, online." },
        { id: 'd', text: "App do Airbnb", correct: false, feedback: "App de hospedagem é Fase 4." },
        { id: 'e', text: "Planilha do Excel", correct: false, feedback: "Fase 2." }
      ]
    },

    // --- FASE 4: RESERVA DE HOSPEDAGEM ---
    {
      id: 16,
      section: "Fase 4: Fases da Jornada",
      context: "Voo garantido! Mariana vai buscar onde dormir. Como definir esta fase?",
      correctAnswer: { description: "Seleção de Hospedagem", emojiTag: "🏨" },
      options: [
        { id: 'a', text: "Decisão do Roteiro Turístico", correct: false, feedback: "Roteiro é passeios, aqui ela procura cama e banho." },
        { id: 'b', text: "Seleção de Hospedagem", correct: true, feedback: "A busca e reserva de um hotel/acomodação." },
        { id: 'c', text: "Pagamento de Voo", correct: false, feedback: "Ela acabou de fazer isso na Fase 3." },
        { id: 'd', text: "Inspeção de Bagagem", correct: false, feedback: "Fase 5." },
        { id: 'e', text: "Corte de Despesas", correct: false, feedback: "Fase 2." }
      ]
    },
    {
      id: 17,
      section: "Fase 4: Ações do Usuário",
      context: "Como ela resolve a questão de onde ficar hospedada?",
      correctAnswer: { description: "Filtra opções no Booking/Airbnb", emojiTag: "🎛️" },
      options: [
        { id: 'a', text: "Liga para agências locais", correct: false, feedback: "O texto afirma que ela entra no Booking e Airbnb." },
        { id: 'b', text: "Despacha as malas", correct: false, feedback: "Fase 5." },
        { id: 'c', text: "Cria pastas no Pinterest", correct: false, feedback: "Isso é ação de inspiração (Fase 1)." },
        { id: 'd', text: "Filtra opções no Booking/Airbnb", correct: true, feedback: "Ação direta e operacional no app." },
        { id: 'e', text: "Adiciona dados do passaporte", correct: false, feedback: "Ação de check-in." }
      ]
    },
    {
      id: 18,
      section: "Fase 4: Emoções",
      context: "Existem centenas de hotéis, locais e preços diferentes. Como Mariana se sente lendo os reviews?",
      isEmojiSelection: true,
      correctAnswer: { description: "Sobrecarregada/Confusa", emojiTag: "😵‍💫", lineY: -15 }, 
      options: [
        { id: 'a', text: "😵‍💫", correct: true, feedback: "Isso! A sobrecarga de informações (paradoxo da escolha).", emojiTag: "😵‍💫", lineY: -15 },
        { id: 'b', text: "🤩", correct: false, feedback: "Ela estava assim no começo, agora é muito detalhe chato para analisar." },
        { id: 'c', text: "🥰", correct: false, feedback: "A alegria profunda vem no embarque." },
        { id: 'd', text: "😰", correct: false, feedback: "Ela estava com medo era do cartão recusar o voo." },
        { id: 'e', text: "😡", correct: false, feedback: "Ela não está com raiva, apenas confusa com as opções." }
      ]
    },
    {
      id: 19,
      section: "Fase 4: Pensamentos",
      context: "Lendo comentários de usuários antigos, o que preocupa Mariana?",
      correctAnswer: { description: "E se a cama for horrível?", emojiTag: "🛏️" },
      options: [
        { id: 'a', text: "E se cancelarem meu voo?", correct: false, feedback: "O foco atual é o hotel." },
        { id: 'b', text: "Como vou levar meus euros?", correct: false, feedback: "Isso é planejamento financeiro geral." },
        { id: 'c', text: "E se a cama for horrível?", correct: true, feedback: "O medo de escolher uma hospedagem ruim com base nas avaliações." },
        { id: 'd', text: "Vou tirar muitas fotos", correct: false, feedback: "Pensamento de Fase 1 ou da viagem em si." },
        { id: 'e', text: "A senha do cartão está certa?", correct: false, feedback: "Problema da Fase 3." }
      ]
    },
    {
      id: 20,
      section: "Fase 4: Pontos de Contato",
      context: "Onde ela está fazendo essa análise de hotéis?",
      correctAnswer: { description: "Apps de Hospedagem", emojiTag: "📲" },
      options: [
        { id: 'a', text: "Apps de Hospedagem", correct: true, feedback: "Booking ou Airbnb são os canais de interação." },
        { id: 'b', text: "Site da Companhia Aérea", correct: false, feedback: "Isso foi na compra da passagem." },
        { id: 'c', text: "Planilha Financeira", correct: false, feedback: "Fase 2." },
        { id: 'd', text: "Totem do Aeroporto", correct: false, feedback: "Isso seria na Fase 5." },
        { id: 'e', text: "Instagram", correct: false, feedback: "Instagram é inspiração (Fase 1)." }
      ]
    },

    // --- FASE 5: DIA DO EMBARQUE ---
    {
      id: 21,
      section: "Fase 5: Fases da Jornada",
      context: "O dia chegou. Mariana está no aeroporto para viajar. Como chamamos essa etapa de consumo do serviço?",
      correctAnswer: { description: "Uso / Início da Experiência", emojiTag: "🛫" },
      options: [
        { id: 'a', text: "Pesquisa Pós-Venda", correct: false, feedback: "Isso acontece depois que ela voltar da Itália." },
        { id: 'b', text: "Uso / Início da Experiência", correct: true, feedback: "Correto! O serviço que ela comprou meses atrás começou a ser entregue." },
        { id: 'c', text: "Cancelamento de Reserva", correct: false, feedback: "Tudo deu certo, não há cancelamento." },
        { id: 'd', text: "Retenção de Marca", correct: false, feedback: "Isso é objetivo da empresa a longo prazo." },
        { id: 'e', text: "Avaliação de Custos", correct: false, feedback: "Fase 2." }
      ]
    },
    {
      id: 22,
      section: "Fase 5: Ações do Usuário",
      context: "Quais ações físicas Mariana realiza no aeroporto?",
      correctAnswer: { description: "Despacha mala e vai ao portão", emojiTag: "🚶‍♀️" },
      options: [
        { id: 'a', text: "Compra lembrancinhas", correct: false, feedback: "Talvez na Itália, não agora." },
        { id: 'b', text: "Digita senha do cartão", correct: false, feedback: "Fase 3." },
        { id: 'c', text: "Despacha mala e vai ao portão", correct: true, feedback: "As ações de navegação física no aeroporto." },
        { id: 'd', text: "Lê as avaliações do hotel", correct: false, feedback: "Isso foi resolvido na Fase 4." },
        { id: 'e', text: "Salva fotos no Pinterest", correct: false, feedback: "Isso foi o estopim na Fase 1." }
      ]
    },
    {
      id: 23,
      section: "Fase 5: Emoções",
      context: "Sentada em frente ao portão de embarque, pronta para ir, como ela está?",
      isEmojiSelection: true,
      correctAnswer: { description: "Feliz e Aliviada", emojiTag: "🥰", lineY: 35 }, 
      options: [
        { id: 'a', text: "😰", correct: false, feedback: "O estresse do cartão de crédito passou na Fase 3." },
        { id: 'b', text: "🧐", correct: false, feedback: "A fase de análise financeira (Fase 2) já acabou." },
        { id: 'c', text: "😵‍💫", correct: false, feedback: "A confusão mental dos hotéis (Fase 4) já passou." },
        { id: 'd', text: "😡", correct: false, feedback: "A viagem está indo bem!" },
        { id: 'e', text: "🥰", correct: true, feedback: "Ponto Altíssimo! A ansiedade virou alegria e alívio.", emojiTag: "🥰", lineY: 35 }
      ]
    },
    {
      id: 24,
      section: "Fase 5: Pensamentos",
      context: "Relaxada, olhando os aviões pela janela, o que ela pensa?",
      correctAnswer: { description: "Tudo deu certo, finalmente férias!", emojiTag: "✨" },
      options: [
        { id: 'a', text: "Aonde será que eu vou?", correct: false, feedback: "Fase 1." },
        { id: 'b', text: "Espero que o cartão tenha limite", correct: false, feedback: "Fase 3." },
        { id: 'c', text: "Esse review parece falso", correct: false, feedback: "Fase 4." },
        { id: 'd', text: "Tudo deu certo, finalmente férias!", correct: true, feedback: "O pensamento final de recompensa pela longa jornada." },
        { id: 'e', text: "Como usar essa planilha?", correct: false, feedback: "Fase 2." }
      ]
    },
    {
      id: 25,
      section: "Fase 5: Pontos de Contato",
      context: "Neste último momento, ela interage no mundo físico. Qual é o ponto de contato?",
      correctAnswer: { description: "Balcão e Raio-X (Aeroporto)", emojiTag: "🏢" },
      options: [
        { id: 'a', text: "Planilha Financeira", correct: false, feedback: "Fase 2." },
        { id: 'b', text: "Balcão e Raio-X (Aeroporto)", correct: true, feedback: "Os canais físicos de interação com o serviço de aviação." },
        { id: 'c', text: "Redes Sociais", correct: false, feedback: "Isso foi na fase de inspiração (Fase 1)." },
        { id: 'd', text: "Checkout Online", correct: false, feedback: "Fase 3." },
        { id: 'e', text: "Buscador de Hotéis", correct: false, feedback: "Fase 4." }
      ]
    }
  ]
};