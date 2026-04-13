import React, { useState, useContext } from 'react';
import { PIZZA_SCENARIO, STREAMING_SCENARIO, ADVANCED_SCENARIO } from './tutorialData';
import './TutorialWizard.css';
import { ScoreContext } from '../contexts/ScoreContext';

const TutorialWizard = ({ onClose, onComplete, onCorrectAnswer, onStartTutorial, scenarioType }) => {
  const { addPoints } = useContext(ScoreContext);
  const [viewState, setViewState] = useState('prompt');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  const [sessionPoints, setSessionPoints] = useState(0);

  // Garante que a pontuação fique vinculada ao usuário atual
  const user = JSON.parse(localStorage.getItem('user'));
  const userUid = user?.uid || 'anonimo';

  let scenarioData;
  if (scenarioType === 'streaming') scenarioData = STREAMING_SCENARIO;
  else if (scenarioType === 'viagem') scenarioData = ADVANCED_SCENARIO;
  else scenarioData = PIZZA_SCENARIO;

  const currentPhaseNumber = Math.floor(currentStepIndex / 5) + 1;
  const currentStep = scenarioData.steps[currentStepIndex];
  const totalPhases = scenarioData.steps.length / 5;

  const isAssessmentMode = scenarioType !== 'pizza';
  const isQuiz = viewState === 'quiz';

  if (viewState === 'prompt') {
    return (
      <div className="wizard-overlay">
        <div className="wizard-box">
          <h3>{scenarioData.title}</h3>
          <p className="wizard-context" style={{ marginTop: '20px' }}>
            {scenarioData.introQuestion}
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
            {scenarioData.scenarioText}
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

  if (viewState === 'results') {
    const maxPoints = scenarioData.steps.length * 10;
    const isPerfect = sessionPoints === maxPoints;

    // Calcular se há pontos novos a receber (diferença entre o recorde anterior e o atual)
    const maxPointsKey = `maxPoints_${scenarioType}_${userUid}`;
    const previousMax = parseInt(localStorage.getItem(maxPointsKey)) || 0;
    const pointsToAdd = sessionPoints > previousMax ? sessionPoints - previousMax : 0;

    return (
      <div className="wizard-overlay">
        <div className="wizard-box" style={{ textAlign: 'center' }}>
          <h2>🏁 Avaliação Concluída!</h2>
          <p style={{ fontSize: '18px', marginTop: '10px' }}>Você terminou o cenário: {scenarioData.scenarioMeta.name}</p>
          
          <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <p style={{ fontSize: '20px', marginBottom: '10px' }}>Sua Pontuação:</p>
            <h1 style={{ fontSize: '48px', color: isPerfect ? '#4caf50' : '#f5a623', margin: '0' }}>
              {sessionPoints} <span style={{ fontSize: '24px', color: '#888' }}>/ {maxPoints}</span>
            </h1>
            
            {/* Feedback de pontos extras */}
            {pointsToAdd > 0 ? (
               <p style={{ color: '#4caf50', fontWeight: 'bold', marginTop: '10px', fontSize: '18px' }}>
                 +{pointsToAdd} pontos novos alcançados!
               </p>
            ) : (
               <p style={{ color: '#888', marginTop: '10px' }}>
                 Sua melhor pontuação anterior foi {previousMax}. Supere seu recorde para ganhar mais pontos!
               </p>
            )}
          </div>

          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            {isPerfect 
              ? "Incrível! Você fez as melhores escolhas possíveis e gabaritou o mapa!" 
              : "Você foi bem, mas ainda pode melhorar algumas escolhas para alcançar a pontuação máxima."}
          </p>

          <div className="wizard-options" style={{ display: 'flex', flexDirection: 'row', gap: '15px', marginTop: '20px' }}>
            {!isPerfect && (
              <button 
                onClick={() => {
                  setSessionPoints(0);
                  setCurrentStepIndex(0);
                  setViewState('quiz');
                }}
                style={{ backgroundColor: '#ff9800', color: '#fff', border: 'none', flex: 1, padding: '15px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}
              >
                Refazer Agora
              </button>
            )}
            <button 
              onClick={() => {
                if (pointsToAdd > 0) {
                  const mensagemDePonto = scenarioType === 'pizza' 
                    ? 'Completou a prática guiada básica' 
                    : `Bateu seu recorde no nível ${scenarioType}`;
                  
                  addPoints(pointsToAdd, mensagemDePonto);
                  localStorage.setItem(maxPointsKey, sessionPoints);
                }

                const currentUserUid = user?.uid || 'anonimo';
                let nextLevel = 1;
                if (scenarioType === 'pizza') nextLevel = 2;
                if (scenarioType === 'streaming') nextLevel = 3;

                const currentUnlocked = parseInt(localStorage.getItem(`unlockedTutorialLevel_${currentUserUid}`)) || 1;
                
                if (nextLevel > currentUnlocked) {
                  localStorage.setItem(`unlockedTutorialLevel_${currentUserUid}`, nextLevel.toString());
                }

                onComplete();
              }}
              style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', flex: 1, padding: '15px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold' }}
            >
              {pointsToAdd > 0 ? "Resgatar Pontos" : "Concluir"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleOptionClick = (option) => {
    if (isAssessmentMode) {
      const pointsScored = option.points !== undefined ? option.points : (option.correct ? 10 : 0);
      setSessionPoints(prev => prev + pointsScored);

      if (onCorrectAnswer) {
        const userSelectedStepData = {
          ...currentStep,
          correctAnswer: {
            description: option.text,
            emojiTag: option.text, 
            lineY: currentStep.correctAnswer?.lineY || 0 
          }
        };
        onCorrectAnswer(userSelectedStepData, currentStepIndex);
      }

      if (currentStepIndex < scenarioData.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setViewState('results'); 
      }
    } else {
      if (option.correct) {
        // Controla a pontuação visualmente, garantindo que pegue os 10 pontos por etapa certa
        if (sessionPoints < (currentStepIndex + 1) * 10) {
          setSessionPoints((currentStepIndex + 1) * 10);
        }
        
        setFeedback('success');
        setFeedbackMessage(option.feedback);
        if (onCorrectAnswer) onCorrectAnswer(currentStep, currentStepIndex);
      } else {
        setFeedback('error');
        setFeedbackMessage(option.feedback);
      }
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setFeedbackMessage("");
    if (currentStepIndex < scenarioData.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Agora a fase básica (pizza) também cai na tela de resultados
      setViewState('results');
    }
  };

  const optionsStyle = currentStep.isEmojiSelection ? {
    display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '20px'
  } : {
    display: 'flex', flexDirection: 'column', gap: '10px'
  };

  const buttonStyle = currentStep.isEmojiSelection ? {
    fontSize: '40px', padding: '10px 20px'
  } : {};

  return (
    <div className={`wizard-overlay ${isQuiz ? 'quiz-mode' : ''}`}>
      <div className="wizard-box" style={{ position: 'relative' }}>
        
        <button className="padrao-close-btn" onClick={onClose}>
          &#10006;
        </button>

        <div className="wizard-header" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ backgroundColor: '#e3f2fd', color: '#1565c0', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
            FASE {currentPhaseNumber} DE {totalPhases} DO MAPA
          </span>
          {isAssessmentMode && (
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>
              Modo Avaliação ⏱️
            </span>
          )}
        </div>

        <div className="wizard-progress">
          Pergunta {currentStepIndex + 1} de {scenarioData.steps.length}
        </div>

        <h4 style={{ fontSize: '22px', marginBottom: '15px' }}>{currentStep.section}</h4>
        <p className="wizard-context">{currentStep.context}</p>

        {!feedback ? (
          <div key={`container-${currentStepIndex}`} className="wizard-options-container" style={optionsStyle}>
            {currentStep.options.map(opt => (
              <button 
                key={`btn-${currentStepIndex}-${opt.id}`} 
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
                {currentStepIndex === scenarioData.steps.length - 1 ? 'Concluir Tutorial' : 'Próxima'}
              </button>
            ) : (
              <button onClick={() => setFeedback(null)}>Tentar Novamente</button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TutorialWizard;