export const PIZZA_SCENARIO = {
  title: "Tutorial: Pedindo uma Pizza 🍕",
  introQuestion: "Você gostaria de aprender a criar um Mapa de Jornada na prática agora?",
  scenarioText: `
    IMAGINE A SEGUINTE SITUAÇÃO:
    
    É sexta-feira à noite. Você chegou cansado do trabalho e decidiu que não quer cozinhar.
    Sua família também está com fome. Vocês decidem pedir uma pizza.
    
    O processo envolve:
    1. Pegar o celular e abrir o aplicativo de delivery.
    2. Discutir os sabores com a família (metade calabresa, metade marguerita?).
    3. Sentir aquela ansiedade e fome enquanto espera o motoboy.
    4. Pensar se o pedido vai demorar ou se virá quente.
    5. Finalmente receber a pizza e comer.
    
    Sua tarefa agora é mapear a PRIMEIRA PARTE dessa experiência (o momento do pedido) nas 5 linhas do mapa.
  `,
  steps: [
    {
      id: 1,
      section: "Fases da Jornada", // Linha 1
      context: "Com base no texto, qual é a FASE atual que estamos mapeando?",
      correctAnswer: { description: "Decisão e Pedido", emojiTag: "🤔" }, // Dados para salvar no banco
      options: [
        { id: 'a', text: "Comer a Pizza", correct: false, feedback: "Ainda não! A pizza nem chegou." },
        { id: 'b', text: "Decisão e Pedido", correct: true, feedback: "Exato! É o momento de escolha." },
        { id: 'c', text: "Lavar a louça", correct: false, feedback: "Isso não faz parte da jornada descrita." }
      ]
    },
    {
      id: 2,
      section: "Ações do Usuário", // Linha 2
      context: "O que o usuário FAZ fisicamente nessa fase?",
      correctAnswer: { description: "Abre o App de Delivery", emojiTag: "📱" },
      options: [
        { id: 'a', text: "Abre o App de Delivery", correct: true, feedback: "Perfeito. É a ação observável." },
        { id: 'b', text: "Sente fome", correct: false, feedback: "Sentir fome é uma sensação, não uma ação física." },
        { id: 'c', text: "Cozinha o jantar", correct: false, feedback: "O cenário diz que ele não quer cozinhar." }
      ]
    },
    {
      id: 3,
      section: "Emoções", // Linha 3
      context: "Qual é a EMOÇÃO predominante descrita no cenário?",
      correctAnswer: { description: "Ansioso/Faminto", emojiTag: "😋", lineY: 35 }, // lineY 35 = Feliz/Alto
      options: [
        { id: 'a', text: "Raiva", correct: false, feedback: "Não há indicativo de raiva no texto." },
        { id: 'b', text: "Tristeza", correct: false, feedback: "Por que triste? Vai ter pizza!" },
        { id: 'c', text: "Expectativa/Fome", correct: true, feedback: "Sim! A expectativa pela comida." }
      ]
    },
    {
      id: 4,
      section: "Pensamentos", // Linha 4
      context: "O que o usuário está PENSANDO enquanto escolhe?",
      correctAnswer: { description: "Qual sabor todos gostam?", emojiTag: "💭" },
      options: [
        { id: 'a', text: "Preciso abastecer o carro", correct: false, feedback: "Isso foge do contexto do jantar." },
        { id: 'b', text: "Qual sabor todos gostam?", correct: true, feedback: "Isso! É a dúvida do momento." },
        { id: 'c', text: "A pizza estava ruim", correct: false, feedback: "Ele ainda nem comeu a pizza." }
      ]
    },
    {
      id: 5,
      section: "Pontos de Contato", // Linha 5
      context: "Onde ocorre a interação entre o usuário e o serviço?",
      correctAnswer: { description: "Aplicativo (iFood/Rappi)", emojiTag: "🛒" },
      options: [
        { id: 'a', text: "Aplicativo no Celular", correct: true, feedback: "Correto. É o meio digital de contato." },
        { id: 'b', text: "Garçom no restaurante", correct: false, feedback: "Eles estão em casa." },
        { id: 'c', text: "Televisão", correct: false, feedback: "A TV não faz o pedido." }
      ]
    }
  ]
};