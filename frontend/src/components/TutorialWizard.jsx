import React, { useState } from 'react';
import { PIZZA_SCENARIO } from './tutorialData';
import './TutorialWizard.css';

const TutorialWizard = ({ onClose, onComplete }) => {
  // Estados: 'prompt' (quer fazer?), 'scenario' (ler texto), 'quiz' (perguntas)
  const [viewState, setViewState] = useState('prompt'); 
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // null, 'success', 'error'
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentStep = PIZZA_SCENARIO.steps[currentStepIndex];

  // 1. Tela Inicial: Pergunta se quer fazer
  if (viewState === 'prompt') {
    return (
      <div className="wizard-overlay">
        <div className="wizard-box">
          <h3>{PIZZA_SCENARIO.title}</h3>
          <p className="wizard-context" style={{marginTop: '20px'}}>
            {PIZZA_SCENARIO.introQuestion}
          </p>
          <div className="wizard-options" style={{flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
            <button 
              onClick={() => setViewState('scenario')}
              style={{backgroundColor: '#4caf50', color: 'white', border: 'none'}}
            >
              Sim, vamos lá!
            </button>
            <button onClick={onClose}>
              Agora não
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Tela do Cenário: Mostra o texto
  if (viewState === 'scenario') {
    return (
      <div className="wizard-overlay">
        <div className="wizard-box" style={{maxWidth: '700px'}}>
          <h3>Entenda o Cenário</h3>
          <div 
            style={{
              textAlign: 'left', 
              whiteSpace: 'pre-line', 
              backgroundColor: '#f9f9f9', 
              padding: '20px', 
              borderRadius: '10px',
              margin: '20px 0',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
          >
            {PIZZA_SCENARIO.scenarioText}
          </div>
          <button 
            className="botaosavename" // Usando classe existente do seu projeto se houver, ou a do css
            onClick={() => setViewState('quiz')}
            style={{width: '100%', fontSize: '18px'}}
          >
            Começar Mapeamento
          </button>
        </div>
      </div>
    );
  }

  // 3. Tela do Quiz (Perguntas)
  const handleOptionClick = (option) => {
    if (option.correct) {
      setFeedback('success');
      setFeedbackMessage(option.feedback);
    } else {
      setFeedback('error');
      setFeedbackMessage(option.feedback);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setFeedbackMessage("");
    
    if (currentStepIndex < PIZZA_SCENARIO.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(); // Finaliza e preenche o mapa
    }
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-box">
        <div className="wizard-progress">
          Etapa {currentStepIndex + 1} de {PIZZA_SCENARIO.steps.length}: {currentStep.section}
        </div>

        <h4 style={{fontSize: '22px', marginBottom: '15px'}}>{currentStep.context}</h4>

        {!feedback ? (
          <div className="wizard-options">
            {currentStep.options.map(opt => (
              <button key={opt.id} onClick={() => handleOptionClick(opt)}>
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className={`wizard-feedback ${feedback}`}>
            <p style={{fontSize: '18px', fontWeight: '500'}}>{feedback === 'success' ? "🎉 Correto!" : "❌ Ops..."}</p>
            <p>{feedbackMessage}</p>
            {feedback === 'success' ? (
              <button onClick={handleNext}>
                {currentStepIndex === PIZZA_SCENARIO.steps.length - 1 ? 'Finalizar e Ver Mapa' : 'Próxima Etapa'}
              </button>
            ) : (
              <button onClick={() => setFeedback(null)}>Tentar Novamente</button>
            )}
          </div>
        )}
        
        <button className="close-btn" onClick={onClose} style={{marginTop: '20px'}}>Sair do Tutorial</button>
      </div>
    </div>
  );
};

export default TutorialWizard;