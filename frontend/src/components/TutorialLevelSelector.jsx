import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Star } from 'lucide-react';
import './TutorialLevelSelector.css';

const TutorialLevelSelector = ({ onClose, onSelectLevel }) => {
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    const savedLevel = parseInt(localStorage.getItem('unlockedTutorialLevel')) || 1;
    setUnlockedLevel(savedLevel);
  }, []);

  return (
    <div className="level-selector-overlay">
      <div className="level-selector-box">
        <div className="level-header">
          <h2>Prática de Criação de Mapa</h2>
          <button className="close-btn-icon" onClick={onClose}><X size={24} /></button>
        </div>
        <p className="level-subtitle">Escolha um nível para iniciar a simulação prática:</p>

        <div className="levels-grid">

          <div className="level-card available" onClick={() => onSelectLevel(1)}>
            <div className="icon-container" style={{ backgroundColor: '#4caf50' }}>
              <Star size={32} color="#fff" fill="#fff" />
            </div>
            <h3>Nível 1: Básico</h3>
            <p>Cenário: A Jornada da Pizza</p>
            <span className="status-badge unlocked"><Unlock size={14} /> Desbloqueado</span>
          </div>

          <div 
            className={`level-card ${unlockedLevel >= 2 ? 'available' : 'locked'}`} 
            onClick={() => unlockedLevel >= 2 && onSelectLevel(2)}
          >
            <div className="icon-container" style={{ backgroundColor: unlockedLevel >= 2 ? '#6a7dfe' : '#ccc' }}>
              {unlockedLevel >= 2 ? <Star size={32} color="#fff" fill="#fff" /> : <Lock size={32} />}
            </div>
            <h3>Nível 2: Intermediário</h3>
            <p>Cenário: Assinatura de Streaming</p>
            {unlockedLevel >= 2 ? (
              <span className="status-badge unlocked"><Unlock size={14} /> Desbloqueado</span>
            ) : (
              <span className="status-badge locked"><Lock size={14} /> Conclua o Nível 1</span>
            )}
          </div>

          <div 
            className={`level-card ${unlockedLevel >= 3 ? 'available' : 'locked'}`} 
            onClick={() => unlockedLevel >= 3 && onSelectLevel(3)}
          >
            <div className="icon-container" style={{ backgroundColor: unlockedLevel >= 3 ? '#ff5722' : '#ccc' }}>
              {unlockedLevel >= 3 ? <Star size={32} color="#fff" fill="#fff" /> : <Lock size={32} />}
            </div>
            <h3>Nível 3: Avançado</h3>
            <p>Cenário: Planejamento de Viagem</p>
            {unlockedLevel >= 3 ? (
              <span className="status-badge unlocked"><Unlock size={14} /> Desbloqueado</span>
            ) : (
              <span className="status-badge locked"><Lock size={14} /> Conclua o Nível 2</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialLevelSelector;