// frontend/src/components/tutorialData.js

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