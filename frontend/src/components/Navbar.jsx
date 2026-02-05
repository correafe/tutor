import React, { useState, useEffect } from 'react';
import { Github, LogOut, HelpCircle, GraduationCap } from 'lucide-react'; 
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ 
  onSaveClick, 
  onDownload, 
  onTutorialClick, 
  onMap, 
  onInfoClick, 
  onScenarioClick, 
  onLogoutClick, 
  dataLoaded, 
  currentJourneyMap, 
  handlePostClick, 
  onStartTour 
}) => {   
  const [journeyMapName, setJourneyMapName] = useState("Clique aqui");
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
    <div className="scenario" style={{ textAlign: "left", padding: "31px", fontSize: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      
      {/* Esquerda: Logo */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img src="https://github.com/luca-ferro/imagestest/blob/main/mascote.png?raw=true" style={{ width: "50px", textAlign: "left", marginRight: "20px" }} alt="Mascote"></img>
        <p>JEM</p>
      </div>
      
      {/* Centro: Nome/Botão */}
      {!dataLoaded ? (
        <button className="button-novo-mapa" onClick={handlePostClick}>
          <p>Novo Mapa de Jornada</p>
        </button>
      ) : (
        <span onClick={onScenarioClick} style={{ cursor: 'pointer' }}>Cenário - {scenarioName}</span>
      )}

      {/* Direita: Botões */}
      <div className="botoes">
        <button className="button save" id="saveButton" onClick={onSaveClick}>
          Salvar
        </button>

        {onStartTour && (
          <button 
            className="button info" 
            id="tourButton" 
            style={{ 
              marginLeft: "3vh", 
              backgroundColor: '#6a7dfe', 
              fontSize: '30px',    
              fontWeight: 'bold',
            }} 
            onClick={onStartTour}
          >
            ?
          </button>
        )}

        {/* Botão APRENDER Corrigido */}
        <button 
          className="button info" 
          onClick={onTutorialClick} 
          title="Prática Guiada"
          style={{ 
            marginLeft: "2vh", 
            backgroundColor: '#FF9800', // Laranja
            fontSize: '30px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '10px' // Ajuste para centralizar o ícone
          }}
        >
           <GraduationCap size={30} strokeWidth={2.5} />
        </button>

        <button className="button info" id="aboutButton" style={{ marginLeft: "2vh", marginRight: "3vh" }} onClick={onInfoClick}>
          i
        </button>
          
        <button className="button map" id="mapsButton" style={{ marginLeft: "1vh", marginRight: "3vh" }} onClick={onMap}>
          Mapas
        </button>

        <button className="button logout" onClick={onLogoutClick}>
          <LogOut />
        </button>
        
        <img src={usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"} alt="Profile" style={{ marginLeft: "20px", width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }} />
      </div>
    </div>
  );
};

export default Navbar;