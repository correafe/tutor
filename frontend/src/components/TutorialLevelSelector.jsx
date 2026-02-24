import React from 'react';
import { X, Lock, Unlock, Star } from 'lucide-react';
import './TutorialLevelSelector.css'; // Criaremos o CSS abaixo

const TutorialLevelSelector = ({ onClose, onSelectLevel }) => {
  return (
    <div className="level-selector-overlay">
      <div className="level-selector-box">
        <div className="level-header">
          <h2>Prática de Criação de Mapa</h2>
          <button className="close-btn-icon" onClick={onClose}><X size={24} /></button>
        </div>
        <p className="level-subtitle">Escolha um nível para iniciar a simulação prática:</p>

        <div className="levels-grid">
          {/* NÍVEL 1 - DISPONÍVEL */}
          <div className="level-card available" onClick={() => onSelectLevel(1)}>
            <div className="icon-container">
              <Star size={32} color="#fff" fill="#fff" />
            </div>
            <h3>Nível 1: Básico</h3>
            <p>Cenário: A Jornada da Pizza</p>
            <span className="status-badge unlocked"><Unlock size={14} /> Desbloqueado</span>
          </div>

          {/* NÍVEL 2 - AGORA DISPONÍVEL */}
          <div className="level-card available" onClick={() => onSelectLevel(2)}>
            <div className="icon-container" style={{ backgroundColor: '#6a7dfe' }}>
              <Star size={32} color="#fff" fill="#fff" />
            </div>
            <h3>Nível 2: Intermediário</h3>
            <p>Cenário: Assinatura de Streaming</p>
            <span className="status-badge unlocked"><Unlock size={14} /> Desbloqueado</span>
          </div>

          {/* NÍVEL 3 - BLOQUEADO */}
          <div className="level-card locked">
            <div className="icon-container">
              <Lock size={32} />
            </div>
            <h3>Nível 3: Avançado</h3>
            <p>Cenário: Em breve...</p>
            <span className="status-badge locked">Bloqueado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialLevelSelector;