import React, { useState, useEffect, useContext } from 'react'; 
import { ScoreContext } from '../contexts/ScoreContext'; 
import { LogOut, GraduationCap, HelpCircle, Trophy, Map, Download } from 'lucide-react';
import axios from 'axios';
import './Navbar.css';
import teste1 from '../assets/teste1.png';
import teste2 from '../assets/teste2.png';
import teste3 from '../assets/teste3.png';
import teste4 from '../assets/teste4.png';
import teste5 from '../assets/teste5.png';

const Navbar = ({ 
  onSaveClick, 
  onRankingClick,
  onTutorialClick, 
  onMap, 
  onInfoClick, 
  onScenarioClick, 
  onLogoutClick, 
  onFAQClick,
  dataLoaded, 
  currentJourneyMap, 
  handlePostClick, 
  onStartTour 
}) => {   
  const [scenarioName, setScenarioName] = useState("Nome do Cenário");

  const usuario = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchScenarioName = async () => {
      try {
        if (!currentJourneyMap) return;
        const response = await axios.get(import.meta.env.VITE_BACKEND + `/scenario/${currentJourneyMap}`);
        const scenario = response.data;
        if (scenario && scenario.name) {
          setScenarioName(scenario.name);
        } else {
          setScenarioName("Nome do Cenário");
        }
      } catch (error) {
        console.error("Erro ao buscar cenário:", error);
      }
    };
    fetchScenarioName();
  }, [currentJourneyMap]);

  const { score } = useContext(ScoreContext); 

  // LOGICA DO RANKING
  const getRankInfo = (currentScore) => {
    if (currentScore < 100) return { 
      title: "Aprendiz", icon: "🥉", className: "rank-bronze",
      frameUrl: teste1
    };
    if (currentScore < 300) return { 
      title: "Explorador", icon: "🥈", className: "rank-silver",
      frameUrl: teste2
    };
    if (currentScore < 500) return { 
      title: "Mapeador", icon: "🥇", className: "rank-gold",
      frameUrl: teste3
    };
    if (currentScore < 700) return { 
      title: "Especialista", icon: "🔮", className: "rank-platinum",
      frameUrl: teste4
    };
    return { 
      title: "Mestre", icon: "👑", className: "rank-diamond",
      frameUrl: teste5
    };
  };

  const rankInfo = getRankInfo(score);

  return (
    <div className="scenario">
      
      {/* Esquerda: Logo */}
      <div className="logo-container">
        <img 
          src="https://github.com/luca-ferro/imagestest/blob/main/mascote.png?raw=true" 
          className="mascote-img" 
          alt="Mascote" 
        />
        <p>JEM</p>
      </div>
      
      {/* Centro: Nome/Botão */}
      {!dataLoaded ? (
        <button className="button-novo-mapa" onClick={handlePostClick}>
          <p>Novo Mapa de Jornada</p>
        </button>
      ) : (
        <span className="scenario-name" onClick={onScenarioClick}>
          Cenário - {scenarioName}
        </span>
      )}

      {/* Direita: Botões e Pontuação */}
      <div className="botoes">
        
        <button className="button save" id="saveButton" onClick={onSaveClick}>
          Salvar
        </button>

        <button className="button map" id="mapsButton" onClick={onMap}>
          Mapas
        </button>

        <button 
          className="button info faq" 
          id="faqButton"
          onMouseDown={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              if (onFAQClick) onFAQClick(); 
          }}
          title="Perguntas Frequentes"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#ffffff' 
          }}
        >
          FAQ
        </button>

        {onStartTour && (
          <button 
          className="button info tour" 
          id="tourButton" 
          onClick={onStartTour}
          >
          <Map size={24} style={{ marginRight: '8px' }} />
        </button>
        )}

        <button 
          className="button info" 
          onClick={onRankingClick} 
          title="Ranking"
          style={{ marginLeft: '2vh', backgroundColor: '#FFD700', color: '#333' }}
        >
           <Trophy size={24} />
        </button>

        <button 
          className="button info learn" 
          id="tutorialButton"
          onClick={onTutorialClick} 
          title="Prática Guiada"
        >
           <GraduationCap size={24} />
        </button>

        <button 
          className="button info about" 
          id="aboutButton" 
          onClick={onInfoClick}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Download size={24} />
        </button>

        {/* INICIO BLOCO DA MOLDURA E PONTOS (COM TOOLTIP) */}
        <div className="avatar-tooltip-container" style={{ marginRight: '20px', marginLeft: '2vh' }}>
          <div className="avatar-wrapper">
            <img 
              src={usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"} 
              alt="Profile" 
              className="user-avatar-image" 
            />
            <img 
              src={rankInfo.frameUrl} 
              alt="Moldura Ranking" 
              className="rank-frame-image" 
            />
          </div>
          
          {/* O balão (tooltip) escondido que aparece no hover */}
          <div className="avatar-tooltip">
            <span style={{ fontWeight: 'bold', color: '#ffd700', fontSize: '18px' }}>🏆 {score} pts</span>
            <span style={{ fontSize: '12px', color: '#fff', backgroundColor: '#666', padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>
              {rankInfo.title}
            </span>
          </div>
        </div>
        {/* FIM BLOCO DA MOLDURA E PONTOS */}

        <button className="button logout" onClick={onLogoutClick}>
          <LogOut size={28} />
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;