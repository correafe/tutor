import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const DASHBOARD_STEPS = [
  {
    target: 'body',
    content: 'Bem-vindo ao JEM! Vamos fazer um tour pelas funcionalidades.',
    placement: 'center',
  },
  {
    target: '.blocoadd',
    content: 'Clique aqui para criar um novo Mapa da Jornada em branco.',
    placement: 'right',
  },
  {
    target: '.bloco',
    content: 'Seus mapas existentes aparecerão aqui. Clique em um para editar.',
    placement: 'bottom',
  },
  {
    target: '.input-filter',
    content: 'Você pode filtrar seus mapas por nome aqui.',
  },
  {
    target: '#faq-dashboard-btn',
    content: 'Tem alguma dúvida? Clique aqui para acessar as Perguntas Frequentes (FAQ) a qualquer momento.',
  },
  {
    target: '.botaologout',
    content: 'E aqui você pode sair da sua conta.',
    placement: 'bottom',
  },
  {
    target: '#dashboard-tour-btn',
    content: 'Se tiver dúvidas ou quiser rever este tutorial, basta clicar neste botão.',
    placement: 'bottom',
  }
];

const TOOL_STEPS = [
{
    target: 'body',
    content: 'Esta é a sua ferramenta de criação de mapas! Vamos ver como usá-la.',
    placement: 'center',
  },
  {
    target: '.scenario',
    content: 'Aqui fica o nome do seu Cenário. Clique nele para editar o nome e a descrição.',
    placement: 'bottom',
  },
  {
    target: '#saveButton',
    content: 'Este é o botão mais importante! Clique nele para salvar seu progresso.',
    placement: 'bottom',
  },
  {
    target: '#mapsButton',
    content: 'Para voltar ao menu principal de mapas, clique aqui.',
    placement: 'bottom',
  },
  {
    target: '#faqButton',
    content: 'Precisa de ajuda rápida sobre como usar a ferramenta? Consulte o FAQ aqui.',
  },
  {
    target: '#tutorialButton', 
    content: 'Clique aqui para abrir a "Prática Guiada", onde você aprende a usar a ferramenta passo a passo.',
  },
  {
    target: '#aboutButton', 
    content: 'Aqui você encontra informações e definições sobre cada linha do mapa.',
    placement: 'bottom',
  },
  {
    target: '.teste-1',
    content: 'Estas são as 5 seções da sua jornada: Fases, Ações, Emoções, Pensamentos e Pontos de Contato.',
    placement: 'right',
  },
  {
    target: 'body',
    content: 'Nesta área, você pode clicar para criar novos cards, ou arrastar e editar os existentes.',
    placement: 'center',
    styles: {
      options: {
        zIndex: 10000, 
      }
    }
  },
    {
    target: '#tourButton', 
    content: 'Clique neste botão sempre que quiser rever este tutorial.',
    placement: 'bottom',
  },
];


export const DashboardTour = ({ run, onTourEnd }) => (
  <Joyride
    steps={DASHBOARD_STEPS}
    run={run}
    continuous
    //showProgress
    showSkipButton
    locale={{
      last: 'Fim',
      next: 'Próximo',
      skip: 'Pular',
      back: 'Voltar',
    }}
    callback={(data) => {
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
        onTourEnd(); // Chama a função para parar o tour
      }
    }}
    styles={{
      options: {
        primaryColor: '#06bd2d', 
        zIndex: 10000,
      },
      tooltipContent: {
        fontSize: '20px', 
        textAlign: 'left' 
      },
      tooltipTitle: {
        fontSize: '24px', 
        fontWeight: 'bold'
      },
      buttonNext: {
        fontSize: '18px' 
      },
      buttonBack: {
        fontSize: '18px'
      },
      buttonSkip: {
        fontSize: '18px'
      }
    }}
  />
);

// Componente do Tour para a Ferramenta Principal
export const ToolTour = ({ run, onTourEnd }) => (
  <Joyride
    steps={TOOL_STEPS}
    run={run}
    continuous
    //showProgress
    showSkipButton
    locale={{
      last: 'Fim',
      next: 'Próximo',
      skip: 'Pular',
      back: 'Voltar',
    }}
    callback={(data) => {
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
        onTourEnd(); // Chama a função para parar o tour
      }
    }}
    styles={{
      options: {
        primaryColor: '#4caf50', // Botão Salvar
        zIndex: 10000,
      },
      tooltipContent: {
        fontSize: '20px', 
        textAlign: 'left'
      },
      tooltipTitle: {
        fontSize: '24px', 
        fontWeight: 'bold'
      },
       buttonNext: {
        fontSize: '18px'
      },
      buttonBack: {
        fontSize: '18px'
      },
      buttonSkip: {
        fontSize: '18px'
      }
    }}
  />
);