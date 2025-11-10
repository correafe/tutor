import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';

// Define os passos do seu tour
// Os "targets" são seletores CSS (classes ou IDs) dos seus elementos HTML
const TOUR_STEPS_DASHBOARD = [
  {
    target: '.blocoadd', // Classe do seu botão "Novo Mapa"
    content: 'Bem-vindo! Clique aqui para criar seu primeiro Mapa da Jornada.',
    placement: 'right',
  },
  {
    target: '.bloco', // Classe de um mapa existente
    content: 'Seus mapas criados aparecerão aqui. Clique neles para editar.',
  },
];

const TOUR_STEPS_TOOL = [
  {
    target: '.fases-container', // As barras laterais
    content: 'Esta é a sua área de trabalho. Cada linha representa uma parte da jornada.',
    placement: 'right',
  },
  {
    target: '#saveButton', // O botão de salvar na Navbar
    content: 'Não se esqueça de salvar seu progresso regularmente!',
  },
  // Adicione mais passos conforme a necessidade...
];

export const DashboardTour = () => {
  const [run, setRun] = useState(false);

  // Controla para mostrar o tour apenas uma vez
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
    if (!hasSeenTour) {
      setRun(true);
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  }, []);

  return (
    <Joyride
      steps={TOUR_STEPS_DASHBOARD}
      run={run}
      continuous // Move para o próximo passo ao clicar em "Next"
      showProgress // Mostra o progresso (ex: 1/3)
      showSkipButton // Permite pular o tour
      styles={{
        options: {
          primaryColor: '#06bd2d', // Cor verde do seu botão "Novo Mapa"
          zIndex: 10000,
        },
      }}
    />
  );
};

// Você pode criar um Tour.jsx separado para a página Tool.jsx
export const ToolTour = () => {
    // ... lógica similar com useState e localStorage ...
    return (
        <Joyride
            steps={TOUR_STEPS_TOOL}
            // ... outras props
        />
    )
}