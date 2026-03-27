import React, { useContext } from 'react'; 
import { ScoreContext } from '../contexts/ScoreContext';
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
    target: '#dashboard-ranking-btn',
    content: 'Confira sua posição no Ranking e veja quem são os melhores criadores de mapas!',
    placement: 'bottom',
  },
  {
    target: '.avatar-tooltip-container',
    content: 'Aqui você acompanha sua pontuação total de experiência e seu título atual. Confira o FAQ para descobrir todas as formas de ganhar pontos!',
    placement: 'bottom',
  },
{
    target: '.botaologout',
    content: 'Aqui você pode encerrar sua sessão atual para sair ou acessar outra conta.',
    placement: 'bottom',
  },
  {
    target: '#dashboard-tour-btn',
    content: 'Se tiver dúvidas ou quiser rever este tutorial, basta clicar neste botão.',
    placement: 'bottom',
  },
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
    target: '.button.info.ranking',
    content: 'Acompanhe a tabela de classificação e veja sua posição no Ranking sem sair da ferramenta.',
    placement: 'bottom',
  },
  {
    target: '#tutorialButton', 
    content: 'Clique aqui para abrir a "Prática Guiada", onde você aprende a usar a ferramenta passo a passo.',
  },
  {
    target: '#aboutButton', 
    content: 'Pronto para exportar? Clique aqui para fazer o Download do seu mapa de jornada.',
    placement: 'bottom',
  },

  {
    target: '.avatar-tooltip-container',
    content: 'Veja seus pontos e o seu nível subindo em tempo real enquanto você completa tarefas. Confira o FAQ para descobrir todas as formas de ganhar pontos!',
    placement: 'bottom',
  },

  {
    target: '.buttonlogout',
    content: 'Aqui você pode encerrar sua sessão atual para sair ou acessar outra conta.',
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

export const DashboardTour = ({ run, onTourEnd }) => {
  const { addPoints } = useContext(ScoreContext);

  return (
    <Joyride
      steps={DASHBOARD_STEPS}
      run={run}
      continuous
      showSkipButton
      hideCloseButton={true}
      disableOverlayClose={true}
      disableScrollParentFix={true} 
      disableScrolling={true}    
      locale={{ last: 'Fim', next: 'Próximo', skip: 'Pular', back: 'Voltar' }}
      callback={(data) => {
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
          const user = JSON.parse(localStorage.getItem('user'));
          const tourKey = `hasCompletedDashboardTour_${user?.uid}`;
          const hasCompletedDashboardTour = localStorage.getItem(tourKey);
          
          if (!hasCompletedDashboardTour && user) {
            addPoints(50, 'Completou o Tour do Dashboard');
            localStorage.setItem(tourKey, 'true');
          }
          
          onTourEnd(); 
        }
      }}
      styles={{
        options: { 
          primaryColor: '#06bd2d', 
          zIndex: 10000,
          width: 300
        },
        tooltip: {
          padding: '15px'
        },
        tooltipContent: { fontSize: '15px', textAlign: 'left', padding: '10px 0' }, 
        tooltipTitle: { fontSize: '18px', fontWeight: 'bold' },    
        buttonNext: { fontSize: '14px', padding: '8px 12px' }, 
        buttonBack: { fontSize: '14px' }, 
        buttonSkip: { fontSize: '14px' }  
      }}
    />
  );
};

export const ToolTour = ({ run, onTourEnd }) => {
  const { addPoints } = useContext(ScoreContext);

  return (
    <Joyride
      steps={TOOL_STEPS}
      run={run}
      continuous
      showSkipButton
      hideCloseButton={true}
      disableOverlayClose={true}
      disableScrollParentFix={true} 
      disableScrolling={true}       
      locale={{ last: 'Fim', next: 'Próximo', skip: 'Pular', back: 'Voltar' }}
      callback={(data) => {
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
          const user = JSON.parse(localStorage.getItem('user'));
          const tourKey = `hasCompletedToolTour_${user?.uid}`;
          const hasCompletedToolTour = localStorage.getItem(tourKey);
          
          if (!hasCompletedToolTour && user) {
            addPoints(50, 'Completou o Tour da Ferramenta');
            localStorage.setItem(tourKey, 'true');
          }

          onTourEnd(); 
        }
      }}
      styles={{
        options: { 
          primaryColor: '#4caf50', 
          zIndex: 10000,
          width: 300 
        },
        tooltip: {
          padding: '15px' 
        },
        tooltipContent: { fontSize: '15px', textAlign: 'left', padding: '10px 0' }, 
        tooltipTitle: { fontSize: '18px', fontWeight: 'bold' },    
        buttonNext: { fontSize: '14px', padding: '8px 12px' }, 
        buttonBack: { fontSize: '14px' }, 
        buttonSkip: { fontSize: '14px' }  
      }}
    />
  );
};