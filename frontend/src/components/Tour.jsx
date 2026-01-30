// frontend/src/components/Tour.jsx

import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

/*
  TARGETS (seletores CSS) para o Dashboard (MapCreation.jsx):
  - Botão Novo Mapa: .blocoadd
  - Um mapa existente: .bloco
  - Filtro de busca: .input-filter
  - Botão Logout: .botaologout
*/
const DASHBOARD_STEPS = [
  {
    target: 'body',
    content: 'Bem-vindo ao JEM! Vamos fazer um tour rápido pelas funcionalidades.',
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
    target: '.botaologout',
    content: 'E aqui você pode sair da sua conta.',
    placement: 'bottom',
  }
];

/*
  TARGETS (seletores CSS) para a Ferramenta (Tool.jsx + Navbar.jsx):
  - Título do Cenário: .scenario span (em Navbar.jsx)
  - Botão Salvar: #saveButton (em Navbar.jsx)
  - Botão Mapas: .button.map (em Navbar.jsx)
  - As 5 linhas: .teste-1 (em Tool.jsx)
  - Área de desenho: .stage-container (em Tool.jsx)
*/
const TOOL_STEPS = [
  {
    target: 'body',
    content: 'Esta é a sua ferramenta de criação de mapas! Vamos ver como usá-la.',
    placement: 'center',
  },
  {
    target: '.scenario span', // Pega o <span> dentro da div .scenario
    content: 'Aqui fica o nome do seu Cenário. Clique nele para editar o nome e a descrição.',
    placement: 'bottom',
  },
  {
    target: '#saveButton',
    content: 'Este é o botão mais importante! Clique nele para salvar seu progresso.',
    placement: 'bottom',
  },
  {
    target: '.button.map',
    content: 'Para voltar ao menu principal de mapas, clique aqui.',
    placement: 'bottom',
  },
  {
    target: '.teste-1',
    content: 'Estas são as 5 seções da sua jornada: Fases, Ações, Emoções, Pensamentos e Pontos de Contato.',
    placement: 'right',
  },
  {
    target: '.stage-container',
    content: 'Nesta área, você pode clicar com o mouse para adicionar, arrastar e editar os cards da sua jornada.',
    placement: 'left',
  },
];

// Componente do Tour para o Dashboard
export const DashboardTour = ({ run, onTourEnd }) => (
  <Joyride
    steps={DASHBOARD_STEPS}
    run={run}
    continuous
    showProgress
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
    showProgress
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
      }
    }}
  />
);