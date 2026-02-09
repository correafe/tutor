import React, { useState, useEffect } from 'react';
import { LogOut, GraduationCap } from 'lucide-react'; 
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ 
  onSaveClick, 
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

      {/* Direita: Botões */}
      <div className="botoes">
        <button className="button save" id="saveButton" onClick={onSaveClick}>
          Salvar
        </button>

        <button className="button map" id="mapsButton" onClick={onMap}>
          Mapas
        </button>

        <button 
          className="button info faq" 
          onClick={onFAQClick} 
          title="Perguntas Frequentes"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
           <HelpCircle size={24} />
        </button>

        {onStartTour && (
          <button 
            className="button info tour" 
            id="tourButton" 
            onClick={onStartTour}
          >
            ?
          </button>
        )}

        <button 
          className="button info learn" 
          onClick={onTutorialClick} 
          title="Prática Guiada"
        >
           <GraduationCap size={24} />
        </button>

        <button className="button info about" id="aboutButton" onClick={onInfoClick}>
          i
        </button>

        <button className="button logout" onClick={onLogoutClick}>
          <LogOut size={28} />
        </button>
        
        <img 
          src={usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"} 
          alt="Profile" 
          className="profile-pic" 
        />
      </div>
    </div>
  );
};

export default Navbar;