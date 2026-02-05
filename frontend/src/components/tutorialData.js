// frontend/src/components/tutorialData.js

export const PIZZA_SCENARIO = {
  title: "Tutorial Completo: A Jornada da Pizza 🍕",
  introQuestion: "Você está pronto para construir o mapa completo (3 Fases) passo a passo?",
  scenarioText: `
    CENÁRIO COMPLETO:
    
    1. FASE DA FOME (19:00): João chega em casa, abre a geladeira e vê que está vazia. Ele se sente frustrado e pensa: "Vou ter que pedir algo".
    
    2. FASE DO PEDIDO (19:10): Ele senta no sofá, abre o aplicativo de delivery. Fica indeciso entre sabores, mas acaba pedindo meia calabresa.
    
    3. FASE DA ENTREGA (19:50): A campainha toca. João recebe a pizza, o cheiro é ótimo. Ele come e se sente feliz e satisfeito.
    
    ---
    SUA TAREFA: Você vai mapear CADA UMA dessas 3 fases, preenchendo todas as linhas (Ações, Emoções, etc).
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
      correctAnswer: { description: "App iFood/Rappi", emojiTag: "🛒" },
      options: [
        { id: 'a', text: "Telefone Fixo", correct: false, feedback: "Ele está usando um app." },
        { id: 'b', text: "App iFood/Rappi", correct: true, feedback: "Canal digital." },
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

// Removemos a constante PIZZA_OTHER_PHASES pois agora tudo é interativo