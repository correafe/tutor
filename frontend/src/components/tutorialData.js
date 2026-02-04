// frontend/src/components/tutorialData.js

export const PIZZA_SCENARIO = {
  title: "Jornada: Pedindo uma Pizza 🍕",
  description: "João chegou cansado do trabalho e decidiu pedir uma pizza. Seu objetivo é mapear essa experiência.",
  steps: [
    {
      id: 1,
      section: "Fases da Jornada", // Linha 1
      context: "Qual é a primeira coisa que o João faz antes mesmo de comer?",
      options: [
        { id: 'a', text: "Come a pizza", correct: false, feedback: "Ainda não! A pizza nem chegou." },
        { id: 'b', text: "Escolhe o sabor no App", correct: true, feedback: "Exato! Essa é a fase de Decisão/Pedido." },
        { id: 'c', text: "Lava a louça", correct: false, feedback: "Isso não faz parte da jornada de pedir pizza agora." }
      ]
    },
    {
      id: 2,
      section: "Ações do Usuário", // Linha 2
      context: "Na fase de 'Escolha', o que o João faz fisicamente?",
      options: [
        { id: 'a', text: "Abre o aplicativo e rola o cardápio", correct: true, feedback: "Perfeito. É uma ação observável." },
        { id: 'b', text: "Sente fome", correct: false, feedback: "Sentir fome é uma sensação/motivação interna, não uma ação física." }
      ]
    },
    // ... Adicione passos para Emoções, Pensamentos, etc.
  ]
};