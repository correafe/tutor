import React, { useState, useContext } from 'react';
import { PIZZA_SCENARIO, STREAMING_SCENARIO, ADVANCED_SCENARIO } from './tutorialData';
import './TutorialWizard.css';
import { ScoreContext } from '../contexts/ScoreContext';
import Popup from './Popup';

const TutorialWizard = ({ onClose, onComplete, onCorrectAnswer, onStartTutorial, scenarioType }) => {
  const { addPoints } = useContext(ScoreContext);
  const [viewState, setViewState] = useState('prompt');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  const [sessionPoints, setSessionPoints] = useState(0);

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

  const maxPoints = scenarioData.steps.length * 10;
  const isPerfect = sessionPoints === maxPoints;
  const maxPointsKey = `maxPoints_${scenarioType}_${userUid}`;
  const previousMax = parseInt(localStorage.getItem(maxPointsKey)) || 0;
  const pointsToAdd = sessionPoints > previousMax ? sessionPoints - previousMax : 0;

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
        const pizzaKey = `completed_pizza_${userUid}`;
        if (!localStorage.getItem(pizzaKey)) {
          addPoints(10, 'Resposta correta no tutorial básico');
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
      if (!isAssessmentMode) {
        localStorage.setItem(`completed_pizza_${userUid}`, 'true');
      }
      onComplete();
    }
  };

  const optionsStyle = currentStep?.isEmojiSelection ? {
    display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: '20px'
  } : {
    display: 'flex', flexDirection: 'column', gap: '10px'
  };

  const buttonStyle = currentStep?.isEmojiSelection ? {
    fontSize: '40px', padding: '10px 20px'
  } : {};

  return (
    // Popup único e mestre envolvendo todo o fluxo do tutorial
    <Popup trigger={true} setTrigger={onClose}>
      <div className={`wizard-content ${isQuiz ? 'quiz-mode' : ''}`} style={{ padding: '10px', maxWidth: '600px' }}>
        
        {/* --- TELA 1: PROMPT --- */}
        {viewState === 'prompt' && (
          <div style={{ textAlign: 'center' }}>
            <h2>{scenarioData.title}</h2>
            <p style={{ marginTop: '20px', fontSize: '18px' }}>
              {scenarioData.introQuestion}
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button onClick={() => setViewState('scenario')} style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                Vamos lá!
              </button>
              <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                Pular tutorial
              </button>
            </div>
          </div>
        )}

        {/* --- TELA 2: CENÁRIO --- */}
        {viewState === 'scenario' && (
          <div style={{ textAlign: 'center' }}>
            <h2>O Cenário</h2>
            <div style={{
                textAlign: 'left', whiteSpace: 'pre-line', backgroundColor: '#f9f9f9',
                padding: '20px', borderRadius: '10px', margin: '20px 0', fontSize: '15px',
                lineHeight: '1.5', maxHeight: '50vh', overflowY: 'auto'
            }}>
              {scenarioData.scenarioText}
            </div>
            <button
              onClick={() => {
                if (onStartTutorial) onStartTutorial();
                setViewState('quiz');
              }}
              style={{ backgroundColor: '#6a7dfe', color: 'white', width: '100%', fontSize: '18px', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Iniciar Mapeamento
            </button>
          </div>
        )}

        {/* --- TELA 3: RESULTADOS --- */}
        {viewState === 'results' && (
          <div style={{ textAlign: 'center' }}>
            <h2>🏁 Avaliação Concluída!</h2>
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Você terminou o cenário: {scenarioData.scenarioMeta.name}</p>
            
            <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
              <p style={{ fontSize: '20px', marginBottom: '10px' }}>Sua Pontuação:</p>
              <h1 style={{ fontSize: '48px', color: isPerfect ? '#4caf50' : '#f5a623', margin: '0' }}>
                {sessionPoints} <span style={{ fontSize: '24px', color: '#888' }}>/ {maxPoints}</span>
              </h1>
              
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

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              {!isPerfect && (
                <button 
                  onClick={() => {
                    setSessionPoints(0);
                    setCurrentStepIndex(0);
                    setViewState('quiz');
                  }}
                  style={{ backgroundColor: '#ff9800', color: '#fff', border: 'none', flex: 1, padding: '15px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Refazer Agora
                </button>
              )}
              <button 
                onClick={() => {
                  if (pointsToAdd > 0) {
                    addPoints(pointsToAdd, `Bateu seu recorde no nível ${scenarioType}`);
                    localStorage.setItem(maxPointsKey, sessionPoints);
                  }
                  onComplete();
                }}
                style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', flex: 1, padding: '15px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {pointsToAdd > 0 ? "Resgatar Pontos" : "Concluir"}
              </button>
            </div>
          </div>
        )}

        {/* --- TELA 4: QUIZ INTERATIVO --- */}
        {viewState === 'quiz' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ backgroundColor: '#e3f2fd', color: '#1565c0', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
                FASE {currentPhaseNumber} DE {totalPhases} DO MAPA
              </span>
              {isAssessmentMode && (
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#666' }}>
                  Modo Avaliação ⏱️
                </span>
              )}
            </div>

            <div style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>
              Pergunta {currentStepIndex + 1} de {scenarioData.steps.length}
            </div>

            <h4 style={{ fontSize: '22px', marginBottom: '15px' }}>{currentStep.section}</h4>
            <p style={{ fontSize: '18px', marginBottom: '30px' }}>{currentStep.context}</p>

            {!feedback ? (
              <div style={optionsStyle}>
                {currentStep.options.map(opt => (
                  <button 
                    key={`btn-${currentStepIndex}-${opt.id}`} 
                    onClick={() => handleOptionClick(opt)} 
                    style={{ ...buttonStyle, cursor: 'pointer', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: feedback === 'success' ? '#e8f5e9' : '#ffebee' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: feedback === 'success' ? '#2e7d32' : '#c62828' }}>
                  {feedback === 'success' ? "🎉 Correto!" : "❌ Tente novamente"}
                </p>
                <p style={{ margin: '15px 0', fontSize: '16px' }}>{feedbackMessage}</p>
                {feedback === 'success' ? (
                  <button onClick={handleNext} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {currentStepIndex === scenarioData.steps.length - 1 ? 'Concluir Tutorial' : 'Próxima'}
                  </button>
                ) : (
                  <button onClick={() => setFeedback(null)} style={{ backgroundColor: '#c62828', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Tentar Novamente
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </Popup>
  );
};

export default TutorialWizard;