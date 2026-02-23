import React, { useState } from 'react';
import { PIZZA_SCENARIO } from './tutorialData';
import './TutorialWizard.css';

const TutorialWizard = ({ onClose, onComplete, onCorrectAnswer, onStartTutorial }) => {
  const [viewState, setViewState] = useState('prompt');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const currentStep = PIZZA_SCENARIO.steps[currentStepIndex];
  const currentPhaseNumber = Math.floor(currentStepIndex / 5) + 1;

  // Define se deve aplicar o layout da direita (apenas no estado de quiz)
  const isQuiz = viewState === 'quiz';

  if (viewState === 'prompt') {
    return (
      <div className="wizard-overlay">
        <div className="wizard-box">
          <h3>{PIZZA_SCENARIO.title}</h3>
          <p className="wizard-context" style={{ marginTop: '20px' }}>
            {PIZZA_SCENARIO.introQuestion}
          </p>
          <div className="wizard-options" style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={() => setViewState('scenario')}
              style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', flex: 1 }}
            >
              Vamos lá!
            </button>
            <button onClick={onClose} style={{ flex: 1 }}>
              Pular tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'scenario') {
    return (
      <div className="wizard-overlay">
        <div className="wizard-box" style={{ maxWidth: '700px' }}>
          <h3>O Cenário</h3>
          <div
            style={{
              textAlign: 'left',
              whiteSpace: 'pre-line',
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '10px',
              margin: '20px 0',
              fontSize: '15px',
              lineHeight: '1.5',
              maxHeight: '60vh',
              overflowY: 'auto'
            }}
          >
            {PIZZA_SCENARIO.scenarioText}
          </div>
          <button
            className="botaosavename"
            onClick={() => {
              if (onStartTutorial) onStartTutorial();
              setViewState('quiz');
            }}
            style={{ width: '100%', fontSize: '18px' }}
          >
            Iniciar Mapeamento
          </button>
        </div>
      </div>
    );
  }

  const handleOptionClick = (option) => {
    if (option.correct) {
      setFeedback('success');
      setFeedbackMessage(option.feedback);
      if (onCorrectAnswer) {
        onCorrectAnswer(currentStep, currentStepIndex);
      }
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
      onComplete();
    }
  };

  const optionsStyle = currentStep.isEmojiSelection ? {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px'
  } : {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const buttonStyle = currentStep.isEmojiSelection ? {
    fontSize: '40px',
    padding: '10px 20px'
  } : {};

  return (
    <div className={`wizard-overlay ${isQuiz ? 'quiz-mode' : ''}`}>
      <div className="wizard-box">
        <div className="wizard-header" style={{ marginBottom: '10px' }}>
          <span style={{
            backgroundColor: '#e3f2fd',
            color: '#1565c0',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            FASE {currentPhaseNumber} DE 3 DO MAPA
          </span>
        </div>

        <div className="wizard-progress">
          Pergunta {currentStepIndex + 1} de {PIZZA_SCENARIO.steps.length}
        </div>

        <h4 style={{ fontSize: '22px', marginBottom: '15px' }}>{currentStep.section}</h4>
        <p className="wizard-context">{currentStep.context}</p>

        {!feedback ? (
          <div className="wizard-options" style={optionsStyle}>
            {currentStep.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt)}
                style={buttonStyle}
              >
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className={`wizard-feedback ${feedback}`}>
            <p style={{ fontSize: '18px', fontWeight: '500' }}>{feedback === 'success' ? "🎉 Correto!" : "❌ Tente novamente"}</p>
            <p>{feedbackMessage}</p>
            {feedback === 'success' ? (
              <button onClick={handleNext}>
                {currentStepIndex === PIZZA_SCENARIO.steps.length - 1 ? 'Concluir Tutorial' : 'Próxima'}
              </button>
            ) : (
              <button onClick={() => setFeedback(null)}>Tentar Novamente</button>
            )}
          </div>
        )}

        <button className="close-btn" onClick={onClose} style={{ marginTop: '20px' }}>Sair</button>
      </div>
    </div>
  );
};

export default TutorialWizard;