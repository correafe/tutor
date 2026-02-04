// frontend/src/components/TutorialWizard.jsx
import React, { useState } from 'react';
import { PIZZA_SCENARIO } from './tutorialData';
import './TutorialWizard.css'; // Você precisará criar o CSS para estilizar

const TutorialWizard = ({ onClose, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // null, 'success', 'error'
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentStep = PIZZA_SCENARIO.steps[currentStepIndex];

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
      // Fim do tutorial
      onComplete(); // Esta função vai injetar os cards no mapa
    }
  };

  return (
    <div className="wizard-overlay">
      <div className="wizard-box">
        {currentStepIndex === 0 && <h3>{PIZZA_SCENARIO.title}</h3>}
        
        <div className="wizard-progress">
          Passo {currentStepIndex + 1} de {PIZZA_SCENARIO.steps.length}
        </div>

        <h4>{currentStep.section}</h4>
        <p className="wizard-context">{currentStep.context}</p>

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
            <p>{feedbackMessage}</p>
            {feedback === 'success' ? (
              <button onClick={handleNext}>Próximo {currentStepIndex === PIZZA_SCENARIO.steps.length - 1 ? '(Ver Mapa)' : ''}</button>
            ) : (
              <button onClick={() => setFeedback(null)}>Tentar Novamente</button>
            )}
          </div>
        )}
        
        <button className="close-btn" onClick={onClose}>Sair do Tutorial</button>
      </div>
    </div>
  );
};

export default TutorialWizard;