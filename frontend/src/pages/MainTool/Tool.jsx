import React, { useState, useEffect, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { Stage, Layer, Rect, Circle } from "react-konva";
import axios from "axios";
import Popup from "../../components/Popup";
import Navbar from "../../components/Navbar";
import ModalName from "../../components/ModalName";
import Matrix from "../../components/tool/Matrix";
import { toast } from 'sonner';
import Picker from '@emoji-mart/react';
import { Github, LogOut, Download } from 'lucide-react';
import data from '@emoji-mart/data';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { init, getEmojiDataFromNative, SearchIndex } from 'emoji-mart';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { ToolTour } from "../../components/Tour"; 
import { HelpCircle } from 'lucide-react'; 
import TutorialWizard from "../../components/TutorialWizard";
import { PIZZA_SCENARIO, STREAMING_SCENARIO, ADVANCED_SCENARIO } from "../../components/tutorialData";
import TutorialLevelSelector from "../../components/TutorialLevelSelector";
import FAQContent from "../../components/FAQContent";
import RankingModal from "../../components/RankingModal";
import { ScoreContext } from '../../contexts/ScoreContext';

import './tool.css';

const EMOCOES_BOAS = [
  '😊', '😁', '😍', '🥳', '👍', '❤️', '🌟', '😄', '😋', '😎', '🎉', '😀', 
  '😂', '🤣', '😇', '😉', '😌', '🥰', '😘', '😗', '😙', '😚', '😜', '😝', 
  '🤑', '🤗', '🤭', '🤠', '🤩', '💖', '💗', '💓', '💞', '💕', '💘', '💝', 
  '✨', '👏', '🙌', '🫶', '✌️', '🤟', '🤘', '💪', '👌', '🤝', '🔥', '💯',
  '😸', '😹', '😻', '😽', '🙌🏻', '👏🏻', '👍🏻', '😊', '🤩', '😽', '🎈', '🎊'
];

const EMOCOES_RUINS = [
  '😟', '😞', '😠', '😡', '👎', '💔', '😭', '🤢', '😨', '🤔', '😢', '😔', 
  '☹️', '🙁', '😕', '😖', '😣', '😫', '😩', '🥺', '😤', '🤬', '🤯', '😳', 
  '🥵', '🥶', '😱', '😰', '😥', '😓', '🤕', '🤒', '😷', '🤮', '🤧', '😵', 
  '🤐', '🥴', '🥱', '☠️', '👿', '😈', '💀', '💩', '🤡', '👻', '🖕', '💢',
  '😾', '😿', '🙀', '👎🏻', '🤦', '🤦‍♂️', '🤦‍♀️', '🤷', '🤷‍♂️', '🤷‍♀️', '🙄', '🚩'
];
const getLineYForEmoji = (emoji) => {
    if (EMOCOES_BOAS.includes(emoji)) return -60; // Sobe
    if (EMOCOES_RUINS.includes(emoji)) return 35;  // Desce
    return -15; 
};

init({ data })

const showAlert = () => {
  toast.success('Progresso salvo com sucesso!')
};

const sizeUpdated = () => {
  toast.success('Tamanho atualizado com sucesso!')
};


const Tool = ({ }) => {
  
  const [zoomRatio, setZoomRatio] = useState(1);

  useEffect(() => {
    const ajustarZoom = () => {
      // 950px é a altura necessária para as 5 linhas do mapa caberem perfeitamente
      const proporcao = window.innerHeight / 950;
      setZoomRatio(proporcao);
    };
    ajustarZoom();
    window.addEventListener('resize', ajustarZoom);
    return () => window.removeEventListener('resize', ajustarZoom);
  }, []);

  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // 960px é a altura aproximada que a ferramenta precisa para mostrar tudo
      const minHeight = 960; 
      if (window.innerHeight < minHeight) {
         setZoomLevel(window.innerHeight / minHeight); // Aplica o zoom proporcional
      } else {
         setZoomLevel(1); // Tela grande = 100% de zoom
      }
    };
    handleResize(); // Aplica o zoom ao abrir a página
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [showFAQ, setShowFAQ] = useState(false);
  const [showTutorialWizard, setShowTutorialWizard] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [targetScenario, setTargetScenario] = useState('pizza');
  const [runToolTour, setRunToolTour] = useState(false);
  const navigate = useNavigate();
  const { id_mapa } = useParams();
  const { addPoints } = React.useContext(ScoreContext);

  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [pendingLevelToLoad, setPendingLevelToLoad] = useState(null);

  const [dataLoaded, setDataLoaded] = useState(false); 
  const [showExampleMapModal, setShowExampleMapModal] = useState(false);

  const [showRankingModal, setShowRankingModal] = useState(false);

  const [isExporting, setIsExporting] = useState(false);
  const [showTutorialInvite, setShowTutorialInvite] = useState(false); 

  const location = useLocation();
  const isTutorialMode = location.state?.startTour;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const stageRef = React.useRef(null);

  const [loading, setLoading] = useState(false);

  const savePromiseRef = React.useRef(Promise.resolve());

  const handleExport = async () => {
    try {
      // 1. LIGA A TELA DE CARREGAMENTO
      setIsExporting(true);
      
      // 2. Dá um pequeno fôlego (100ms) para o React renderizar a tela de carregamento ANTES de travar o navegador com a exportação
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const node = document.querySelector('.teste-1');
      const parentNode = node.parentElement;
      
      if (!node || !stageRef.current) {
        throw new Error('Elementos não encontrados para exportação');
      }

      const originalZoom = parentNode.style.zoom;
      const scrollContainer = document.querySelector('.scrollable-container');
      const originalScrollLeft = scrollContainer ? scrollContainer.scrollLeft : 0;
      const originalScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

      const stageContainer = document.querySelector('.stage-container');
      if (stageContainer) {
        stageContainer.style.opacity = '0';
      }

      parentNode.style.zoom = '1';
      await new Promise(resolve => setTimeout(resolve, 100));

      const stage = stageRef.current;
      const currentScale = stage.scaleX();
      stage.scale({ x: 1, y: 1 }); 
      
      const contentWidth = calculateTotalWidth(matrix) + 1260;
      const contentHeight = 1000;

      const canvasHTML = await html2canvas(parentNode, {
        backgroundColor: '#E6E6E6',
        scale: 2,
        width: contentWidth,
        height: contentHeight,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false
      });

      parentNode.style.zoom = originalZoom;
      if (scrollContainer) {
        scrollContainer.scrollLeft = originalScrollLeft;
        scrollContainer.scrollTop = originalScrollTop;
      }
      
      if (stageContainer) {
        stageContainer.style.opacity = '1'; 
      }
      stage.scale({ x: currentScale, y: currentScale });

      const dataURLKonva = stage.toDataURL({
        pixelRatio: 2,
        mimeType: 'image/png'
      });

      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
      
      finalCanvas.width = contentWidth * 2;
      finalCanvas.height = contentHeight * 2;

      ctx.fillStyle = '#E6E6E6';
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      ctx.drawImage(canvasHTML, 0, 0, finalCanvas.width, contentHeight * 2);

      const imgKonva = new Image();
      await new Promise((resolve, reject) => {
        imgKonva.onload = resolve;
        imgKonva.onerror = reject;
        imgKonva.src = dataURLKonva;
      });

      const konvaMarginTop = 28 * 2; 
      const konvaMarginLeft = 160 * 2;

      ctx.drawImage(
        imgKonva, 
        konvaMarginLeft, 
        konvaMarginTop, 
        imgKonva.width, 
        imgKonva.height
      );

      ctx.font = 'bold 30px Inter, sans-serif';
      ctx.fillStyle = '#666666';
      ctx.textAlign = 'right';
      ctx.fillText('JEM - JourneyEasyMap', finalCanvas.width - 40, finalCanvas.height - 30);

      const tituloMapa = sceneName && sceneName.trim() !== '' ? sceneName : 'Mapa de Jornada';
      
      const finalDataUrl = finalCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `mapa_${tituloMapa.replace(/\s+/g, '_').toLowerCase()}.png`;
      link.href = finalDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download concluído com sucesso!');
      const user = JSON.parse(localStorage.getItem('user'));
      const downloadKey = `hasDownloadedMap_${user?.uid}`;
      if (!localStorage.getItem(downloadKey) && user) {
        addPoints(30, 'Realizou o primeiro Download de Mapa');
        localStorage.setItem(downloadKey, 'true');
      }
    } catch (error) {
      console.error('Erro detalhado exportação:', error);
      toast.error('Erro ao gerar o arquivo de download. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };
  
  const downloadURI = (uri, name) => {
    // console.log("entrou em downloadURI");
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handlePostClick = async () => {
    try {
      await axios.post(import.meta.env.VITE_BACKEND + '/journeyPhase', {
        journeyMap_id: id_mapa,
        linePos: 285,
        posX: 20,
        length: 230,
        description: 'essa é uma fase de jornada',
        emojiTag: 'emoji feliz',
      });

      await axios.post(import.meta.env.VITE_BACKEND + '/userAction', {
        journeyMap_id: id_mapa,
        linePos: 285,
        posX: 20,
        length: 230,
        description: 'essa é uma ação do usuario',
        emojiTag: 'emoji feliz',
      });

      await axios.post(import.meta.env.VITE_BACKEND + '/thought', {
        journeyMap_id: id_mapa,
        linePos: 285,
        posX: 20,
        length: 230,
        description: 'esse é um pensamento',
        emojiTag: 'emoji pensando',
      });

      await axios.post(import.meta.env.VITE_BACKEND + '/contactPoint', {
        journeyMap_id: id_mapa,
        linePos: 285,
        posX: 20,
        length: 230,
        description: 'esse é um ponto de contato ',
        emojiTag: 'emoji triste',
      });

      await axios.post(import.meta.env.VITE_BACKEND + '/emotion', {
        posX: 20,
        lineY: -15,
        emojiTag: '😀',
        journeyMap_id: id_mapa,
      });

      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar:', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const onMap = async () => {
    navigate('/');
  }

  const fetchData = async () => {
    try {
      const [
        journeyData,
        userActionData,
        emotionData,
        thoughtData,
        contactPointData,
      ] = await Promise.all([
        axios.get(import.meta.env.VITE_BACKEND + "/journeyPhase", { params: { journeyMap_id: id_mapa } }),
        axios.get(import.meta.env.VITE_BACKEND + "/userAction", { params: { journeyMap_id: id_mapa } }),
        axios.get(import.meta.env.VITE_BACKEND + "/emotion", { params: { journeyMap_id: id_mapa } }),
        axios.get(import.meta.env.VITE_BACKEND + "/thought", { params: { journeyMap_id: id_mapa } }),
        axios.get(import.meta.env.VITE_BACKEND + "/contactPoint", { params: { journeyMap_id: id_mapa } }),
      ]);

      // Mapeie os dados da API para o formato desejado na matriz
      const journeyMatrix = journeyData.data.map(item => ({
        type: 'journeyPhase',
        journeyPhase_id: item.journeyPhase_id.toString(),
        x: item.posX,
        y: 61,
        width: item.length,
        height: 135,
        color: "#FFAC81",
        text: item.description,
      }));

      const userActionMatrix = userActionData.data.map(item => ({
        type: 'userAction',
        userAction_id: item.userAction_id.toString(),
        x: item.posX,
        y: 231,
        width: item.length,
        height: 135,
        color: "#FF928B",
        text: item.description,
      }));

      const emotionMatrix = emotionData.data.map(item => ({
        type: 'emotion',
        emotion_id: item.emotion_id.toString(),
        x: item.posX,
        y: 467,
        lineY: item.lineY,
        width: 230,
        height: 135,
        color: "#FEC3A6",
        emojiTag: item.emojiTag
      }));

      const thoughtMatrix = thoughtData.data.map(item => ({
        type: 'thought',
        thought_id: item.thought_id.toString(),
        x: item.posX,
        y: 571,
        width: item.length,
        height: 135,
        color: "#EFE9AE",
        text: item.description,
      }));

      const contactPointMatrix = contactPointData.data.map(item => ({
        type: 'contactPoint',
        contactPoint_id: item.contactPoint_id.toString(),
        x: item.posX,
        y: 741,
        width: item.length,
        height: 135,
        color: "#CDEAC0",
        text: item.description,
      }));

      const newMatrix = [journeyMatrix, userActionMatrix, emotionMatrix, thoughtMatrix, contactPointMatrix];
      setMatrix(newMatrix);
      
      setDataLoaded(true); 

      const convertedEmojis = {};
      for (const item of emotionMatrix) {
        if (item.emojiTag.length > 0) {
          convertedEmojis[item.emotion_id] = item.emojiTag;
        }
      }
      setEmojis(convertedEmojis);
      return (newMatrix);

    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      setDataLoaded(false);
    }
  };


    useEffect(() => {
      const tutorialFlag = localStorage.getItem('startToolTutorial');
      const user = JSON.parse(localStorage.getItem('user'));
      
      // CRIAMOS UMA CHAVE ÚNICA PARA CADA USUÁRIO
      const hasSeenToolTourKey = `hasSeenToolTour_${user?.uid}`;
      const hasSeenToolTour = localStorage.getItem(hasSeenToolTourKey);

      if (tutorialFlag === 'true') {
        setDataLoaded(true); 
        setRunToolTour(true); 
      } 
      else if (!hasSeenToolTour && user) { // Só roda se for um usuário válido e não tiver visto
        setRunToolTour(true);
        localStorage.setItem(hasSeenToolTourKey, 'true');
      }

      fetchData();
    }, []);


  const [matrix, setMatrix] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [emojis, setEmojis] = useState({});
  const [selectedHouses, setSelectedHouses] = useState(1);

  const calculateTotalWidth = (matrix) => {
    let totalWidth = 0;
    matrix.forEach(row => {
      row.forEach(rect => {
        totalWidth = Math.max(totalWidth, rect.x + rect.width);
      });
    });
    return totalWidth;
  };


  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedHouses(value);
  };


  const updateMatrixWithX = (matrix, id, newX, tipo, length, x, closeY, xoriginal) => {
    // console.log("Iniciando updateMatrixWithX");
    // console.log("Parâmetros: id:", id, "newX:", newX, "tipo:", tipo, "length:", length, "x:", x, "closeY:", closeY, "xoriginal:", xoriginal);
  
    let updatedX;
  
    // Verificar quantos intervalos de 270 cabem em newX
    const intervalCount = Math.floor(newX / 270);
    updatedX = intervalCount * 270;
  
    // console.log("intervalCount:", intervalCount);
    // console.log("updatedX:", updatedX);
  
    const newXStart = xoriginal + updatedX;
    const newXEnd = newXStart + length;
  
    // console.log("newXStart:", newXStart);
    // console.log("newXEnd:", newXEnd);
  
    const tamanhoRectMovido = Math.round(length / 270);
    // console.log("length:", length);
    // console.log("tamanhoRectMovido:", tamanhoRectMovido);
  
    return matrix.map((row, rowIndex) => {
      // console.log("Analisando linha:", rowIndex);
  
      // Verificar se há sobreposição apenas na mesma linha
      const rectIndex = row.findIndex(rect => rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString());
      if (rectIndex === -1) {
        // console.log("Rect não encontrado na linha:", rowIndex);
        return row;
      }
  
      // console.log("Rect encontrado na linha:", rowIndex);
  
      // Verificar se há um retângulo no qual o usuário arrastou por cima
      const overlappingRect = row.find(rect => {
        if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() !== id.toString()) {
          const rectStart = rect.x;
          const rectEnd = rect.x + rect.width;
          const isOverlapping = !(newXEnd <= rectStart || newXStart >= rectEnd);
          if (isOverlapping) {
            // console.log("Sobreposição detectada com rect:", rect);
          }
          return isOverlapping;
        }
        return false;
      });
  
      // Se há um retângulo sobreposto, ajustar as posições
      if (overlappingRect) {
        // console.log("Encontrado retângulo sobreposto:", overlappingRect);
  
        return row.map(rect => {
          if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString()) {
            // console.log("Atualizando rect movido:", rect, "Novo X:", newXStart);
            return {
              ...rect,
              x: Math.max(20, newXStart),
            };
          }
          if (updatedX < 0) {
            if (rect.x >= newXStart && rect.x <= xoriginal) {
              // console.log("Movendo rect para frente (esquerda):", rect, "Novo X:", rect.x + 270 * tamanhoRectMovido);
              return {
                ...rect,
                x: rect.x + 270 * tamanhoRectMovido,
              };
            }
          } else {
            if (rect.x >= newXStart) {
              // console.log("Movendo rect para frente (direita):", rect, "Novo X:", rect.x + 270 * tamanhoRectMovido);
              return {
                ...rect,
                x: rect.x + 270 * tamanhoRectMovido,
              };
            }
          }
          return rect;
        });
      }
  
      // Caso contrário, verifique se há sobreposição com tamanho diferente e, se houver, retorne a matriz original
      const isOverlappingWithDifferentSize = row.some(rect => {
        if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() !== id.toString()) {
          const rectStart = rect.x;
          const rectEnd = rect.x + rect.width;
          const isOverlapping = !(newXEnd <= rectStart || newXStart >= rectEnd);
          if (isOverlapping && rect.width !== length) {
            // console.log("Sobreposição detectada com tamanho diferente para rect:", rect);
            return true;
          }
        }
        return false;
      });
  
      if (isOverlappingWithDifferentSize) {
        // console.log("Sobreposição detectada com retângulo de tamanho diferente, operação não permitida.");
        return row;
      }
  
      return row.map((rect) => {
        if (rect.type === 'emotion' && rect.emotion_id.toString() === id.toString()) {
          // Limita o valor de lineY aos valores permitidos
          const allowedValues = [35, -15, -60];
          const newLineY = allowedValues.reduce((prev, curr) => (Math.abs(curr - (rect.lineY + closeY)) < Math.abs(prev - (rect.lineY + closeY)) ? curr : prev));
          // console.log("Atualizando rect de emotion:", rect, "Novo X:", newXStart, "Novo LineY:", newLineY);
          return {
            ...rect,
            x: Math.max(20, newXStart),
            lineY: newLineY,
          };
        } else if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString()) {
          // console.log("Atualizando rect:", rect, "Novo X:", newXStart);
          return {
            ...rect,
            x: Math.max(20, newXStart),
          };
        } else {
          return rect;
        }
      });
    }).map((row) => {
      // Verificar e corrigir as posições duplicadas após a troca
      const positions = new Set();
      return row.map((rect) => {
        if (positions.has(rect.x)) {
          // console.log("Corrigindo posição duplicada para rect:", rect);
          rect.x = newXStart;
        }
        positions.add(rect.x);
        return rect;
      });
    });
  };
  



  const handleDragEnd = (e, id, tipo, length, x, closeY, xoriginal) => {
    const newX = e.target.x();
    // console.log(newX);
    // console.log(x);
    setMatrix((prevMatrix) => {
      const rearrangedMatrix = updateMatrixWithX(prevMatrix, id, newX, tipo, length, x, closeY, xoriginal);
  
      const updatedMatrix = rearrangedMatrix.map((row) => {
        // Ajustar x para o intervalo mais próximo de 270 em 270, começando em 20
        const adjustedRow = row.map((rect) => {
          const intervalCount = Math.round((rect.x - 20) / 270);
          const adjustedX = 20 + intervalCount * 270;
          return {
            ...rect,
            x: adjustedX,
          };
        }).sort((a, b) => {
          return (a.x - 20) / 270 - (b.x - 20) / 270;
        });
  
        // Verificar e corrigir sobreposições na linha
        for (let i = 0; i < adjustedRow.length - 1; i++) {
          const currentRect = adjustedRow[i];
          const nextRect = adjustedRow[i + 1];
  
          while (nextRect.x < currentRect.x + currentRect.width) {
            nextRect.x = currentRect.x + currentRect.width + 40;
          }
        }
  
        return adjustedRow;
      });
  
      // console.log(updatedMatrix);
      return updatedMatrix;
    });
    setEditedRectId(id);
    setForceUpdate((prev) => prev + 1);
    setSaveTriggered(true);
    setShowMessage(false);
  };
  
  

  const handleSaveClick = () => {
    const putConfig = { method: "PUT" };
    
    const dataToPut = matrix.reduce((acc, row) => {
      row.forEach((rect) => {
        if (rect.contactPoint_id !== undefined) {
          acc.push({
            endpoint: "contactPoint",
            data: { contactPoint_id: rect.contactPoint_id, contactpoint_id: rect.contactPoint_id, journeyMap_id: id_mapa, posX: rect.x, description: rect.text || "", length: rect.width || 230, width: rect.width || 230 },
          });
        } else if (rect.userAction_id !== undefined) {
          acc.push({
            endpoint: "userAction",
            data: { userAction_id: rect.userAction_id, useraction_id: rect.userAction_id, journeyMap_id: id_mapa, posX: rect.x, description: rect.text || "", length: rect.width || 230, width: rect.width || 230 },
          });
        } else if (rect.emotion_id !== undefined) {
          acc.push({
            endpoint: "emotion",
            data: { emotion_id: rect.emotion_id, journeyMap_id: id_mapa, posX: rect.x, lineY: rect.lineY !== undefined ? rect.lineY : -15, emojiTag: rect.emojiTag || "😀" },
          });
        } else if (rect.thought_id !== undefined) {
          acc.push({
            endpoint: "thought",
            data: { thought_id: rect.thought_id, journeyMap_id: id_mapa, posX: rect.x, description: rect.text || "", length: rect.width || 230, width: rect.width || 230 },
          });
        } else if (rect.journeyPhase_id !== undefined) {
          acc.push({
            endpoint: "journeyPhase",
            data: { journeyPhase_id: rect.journeyPhase_id, journeyphase_id: rect.journeyPhase_id, journeyMap_id: id_mapa, posX: rect.x, description: rect.text || "", length: rect.width || 230, width: rect.width || 230 },
          });
        }
      });
      return acc;
    }, []);

    const requests = dataToPut.map(({ endpoint, data }) => {
      const url = import.meta.env.VITE_BACKEND + `/${endpoint}`;
      return axios.put(url, data, putConfig);
    });

    Promise.all(requests)
      .then(() => {
        if (!showMessage) {
          setShowMessage(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
      });
  };

  const [buttonPopup, setButtonPopup] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState("0");
  const [editedText, setEditedText] = useState("");
  const [editedRectId, setEditedRectId] = useState("");
  const [textEdit, setTextEdit] = useState(false)

  const handleRectClick = (currentText, id, rectY, tamanho) => {
    const tamanhorect = (tamanho + 40) / 270;
    setSelectedHouses(tamanhorect);
    setEditedText(currentText); // Define o texto atual para edição no popup
    setEditedRectId(id);
    setEditedRowIndex(rectY);
    setButtonPopup(true); // Abre o popup
    setTextEdit(true); // Define a edição de texto como verdadeira


    setMatrix((prevMatrix) => {
      const updatedMatrix = prevMatrix.map((row) =>
        row.map((rect) => {
          const type = rect.y === 61 ? 'journeyPhase' : rect.y === 231 ? 'userAction' : rect.y === 467 ? 'emotion' : rect.y === 571 ? 'thought' : rect.y === 741 ? 'contactPoint' : null;

          return (
            rect[`${type}_id`] === editedRectId && type === rect.type && rect.y === editedRowIndex
              ? { ...rect, x: Math.max(20, Math.min(1620, rect.x)) }
              : rect
          );
        })
      );

      return updatedMatrix;
    });


  };

  const [tempWidth, setTempWidth] = useState()

  const handleSaveHouse = async () => {
    let tempMatrix = [];
    let foundExtendedRect = null;
  
    // Function to adjust the X position of rectangles
    const adjustRowXPositions = (row) => {
      return row.map((rect) => {
        const intervalCount = Math.round((rect.x - 20) / 270);
        const adjustedX = 20 + intervalCount * 270;
        return {
          ...rect,
          x: adjustedX,
        };
      });
    };
  
    setMatrix((prevMatrix) => {
      tempMatrix = prevMatrix.map((row) => {
        let rowUpdated = false;
        let extendedRect; 
        let extendedIndex = -1; 
  
        const updatedRow = row.map((rect, index) => {
          const type = rect.y === 61 ? 'journeyPhase' : rect.y === 231 ? 'userAction' : rect.y === 467 ? 'emotion' : rect.y === 571 ? 'thought' : rect.y === 741 ? 'contactPoint' : null;
          if (!type) return rect; 
  
          if (rect[`${type}_id`] === editedRectId && type === rect.type && rect.y === editedRowIndex) {
            rowUpdated = true;
            const originalX = rect.x;
            extendedRect = { ...rect, width: selectedHouses * 270 - 40, x: originalX };
            extendedIndex = index;
            return extendedRect;
          }
          return rect;
        });
  
        if (rowUpdated) {
          let adjustedXrect = extendedRect.x + extendedRect.width + 40; 
          updatedRow.forEach((rect) => {
            if (rect.x > extendedRect.x) {
                rect.x = adjustedXrect; 
                adjustedXrect += rect.width + 40; 
            }
          });
          foundExtendedRect = extendedRect; 
        }
  
        return updatedRow;
      });
  
      tempMatrix = tempMatrix.map(adjustRowXPositions);
      return tempMatrix;
    });
  
    setSaveTriggered(true);
    setShowMessage(false);
  };
  

  const [saveTriggered, setSaveTriggered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (saveTriggered) {
      handleSaveClick();
      setSaveTriggered(false);
    }
  }, [saveTriggered, matrix]); // Run when saveTriggered or matrix changes




  const handleTextChange = (rowIndex, colIndex, newText) => {
    const newMatrix = [...matrix];

    // Se o novo texto tiver mais de 30 caracteres, abrevie com reticências
    // console.log(newText);
    // console.log(newText.length);
    const abbreviatedText = newText.length > 30 ? newText.slice(0, 27) + '...' : newText;

    // Crie uma nova constante que guarde o valor do texto original
    const newTextOriginal = newText;
    setEditedText(newTextOriginal); // Atualize a constante do texto original
    setEditedRowIndex(rowIndex);

    // Atualize o texto na matriz
    newMatrix[rowIndex][colIndex].text = abbreviatedText;
    setMatrix(newMatrix); // Atualiza a matriz

  };

  const handleTextSubmit = () => {
    // console.log("rectid:", editedRectId);
    // console.log("editedRowIndex:", editedRowIndex);

    // Salvar o texto editado quando o usuário confirmar
    const updatedMatrix = matrix.map((row) =>
      row.map((rect) => {
        const type = rect.y === 61 ? 'journeyPhase' : rect.y === 231 ? 'userAction' : rect.y === 467 ? 'emotion' : rect.y === 571 ? 'thought' : rect.y === 741 ? 'contactPoint' : null;

        return (
          rect[`${type}_id`] === editedRectId && type === rect.type && rect.y === editedRowIndex
            ? { ...rect, text: editedText }
            : rect
        );
      })
    );

    // console.log("editedText:", editedText);
    setMatrix(updatedMatrix);
    setEditedText("");
    setSaveTriggered(true);
    setEditedRectId("");
  };

  const [newSquareId, setNewSquareId] = useState(null);

  const handleAddSquare = async (rowIndex, colIndex, squarewidth) => {
    try {
      const rowIndexToType = {
        0: 'journeyPhase',
        1: 'userAction',
        2: 'emotion',
        3: 'thought',
        4: 'contactPoint'
      };

      const type = rowIndexToType[rowIndex];
      let novoX;
      
      if (colIndex !== undefined) {
        novoX = 290 + colIndex * 270;
      } else {
        return;
      }

      if (!type) return;

      const isOverlapping = matrix[rowIndex].some(rect => rect.type === type && rect.x === novoX);

      if (isOverlapping) {
        setMatrix(prevMatrix => {
          const novaMatriz = [...prevMatrix];
          novaMatriz[rowIndex] = novaMatriz[rowIndex].map(card => {
            if (card.x >= novoX) {
              return { ...card, x: card.x + 270 };
            }
            return card;
          });
          return novaMatriz;
        });

        for (let i = 0; i < matrix[rowIndex].length; i++) {
          const card = matrix[rowIndex][i];
          if (card.x >= novoX) {
            const putData = {
              [`${type}_id`]: card[`${type}_id`] || card.id,
              [`${type.toLowerCase()}_id`]: card[`${type}_id`] || card.id, 
              journeyMap_id: id_mapa,
              posX: card.x + 270, 
              length: card.width || 230,
              width: card.width || 230
            };

            if (type === 'emotion') {
              putData.lineY = card.lineY !== undefined ? card.lineY : -15;
              putData.emojiTag = card.emojiTag || '😀';
            } else {
              putData.description = card.text || card.description || "";
              putData.linePos = 285;
            }
            
            try {
              await axios.put(import.meta.env.VITE_BACKEND + `/${type}`, putData);
            } catch (err) {
              console.error("Erro ao atualizar posição de bloco empurrado", err);
            }
          }
        }
      }

      if (type === 'emotion') {
        setCurrentCellId('new');
        setPickerVisible(true);
        setPendingPostData({ novoX, rowIndex, colIndex, squarewidth });
      } else {
        await postNewCard({ novoX, rowIndex, colIndex, squarewidth }, type);
      }

    } catch (error) {
      console.error("Erro ao adicionar quadrado:", error);
    }
  };

  const [pendingPostData, setPendingPostData] = useState(null);

  const postNewCard = async ({ novoX, rowIndex, colIndex, squarewidth }, type, emojiTag = "😀") => {
    const postData = {
      "journeyMap_id": id_mapa,
      "linePos": 285,
      "posX": novoX,
      "length": 230,
      "description": "",
      "emojiTag": emojiTag
    };

    if (type === 'emotion') {
      postData.posX = novoX;
      postData.journeyMap_id = id_mapa;
      postData.lineY = getLineYForEmoji(emojiTag); 
    }

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND + `/${type}`, postData);
      
      const newId = response.data.id;
      // Isolamos o ID gerado para poder usá-lo tanto na matriz quanto no dicionário de emojis
      const generatedId = newId ? newId.toString() : Date.now().toString(); 

      setMatrix(prevMatrix => {
        const newMatrix = [...prevMatrix];
        const newCard = {
          type: type,
          [`${type}_id`]: generatedId,
          x: novoX,
          y: rowIndex === 0 ? 61 : rowIndex === 1 ? 231 : rowIndex === 2 ? 467 : rowIndex === 3 ? 571 : 741,
          width: 230,
          height: 135,
          color: rowIndex === 0 ? "#FFAC81" : rowIndex === 1 ? "#FF928B" : rowIndex === 2 ? "#FEC3A6" : rowIndex === 3 ? "#EFE9AE" : "#CDEAC0",
        };

        if (type === 'emotion') {
          newCard.lineY = getLineYForEmoji(emojiTag);
          newCard.emojiTag = emojiTag;
        } else {
          newCard.text = "";
        }

        newMatrix[rowIndex] = [...newMatrix[rowIndex], newCard];
        return newMatrix;
      });

      if (type === 'emotion') {
        setEmojis(prevEmojis => ({
          ...prevEmojis,
          [generatedId]: emojiTag
        }));
      }

    } catch (err) {
      console.error("Falha ao criar o novo card:", err);
    }
  };

  useEffect(() => {
    if (newSquareId && matrix) {
      const [journeyPhase, userAction, emotions] = matrix;
      // console.log("[emotions]: ", emotions);
      const emotionIds = emotions.map(emotion => emotion.emotion_id);
      // console.log("emotion ids: ", emotionIds);
      // console.log("newSquareID: ", newSquareId);

      if (emotionIds.includes(newSquareId)) {
        // console.log("ID DO EMOJI", newSquareId);
        handleCircleClick(newSquareId);
        // console.log("handleCircleClick chamado");
      } else {
        // console.log("ID DO EMOJI não encontrado na lista de emoções");
      }
    } else {
      // console.log("newSquareId ou matrix estão ausentes");
    }
  }, [newSquareId, matrix]);


  const handleDeleteSquare = async (rowIndex, colIndex) => {
    try {
      const square = matrix[rowIndex][colIndex];
      const squareType = square.type;
      const squareId = square[`${squareType}_id`];

      setMatrix(prevMatrix => {
        const novaMatriz = [...prevMatrix];
        novaMatriz[rowIndex] = novaMatriz[rowIndex].filter((_, index) => index !== colIndex);
        return novaMatriz;
      });


      await axios.delete(import.meta.env.VITE_BACKEND + `/${squareType}/${squareId}`);

    } catch (error) {
      console.error("Erro ao excluir quadrado:", error);
    }
  };

  const [currentCellId, setCurrentCellId] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);


  const handleCircleClick = (cellId) => {
    // console.log("Clicked on circle with ID: ", cellId);
    // console.log("Matrix state: ", matrix); // Verifique se matrix está atualizada
    // console.log("cellId: ", cellId);
    setCurrentCellId(cellId);
  };

  useEffect(() => {
    if (currentCellId !== "") {
      // console.log("CurrentCellId: ", currentCellId);
      setPickerVisible(true);
    }
  }, [currentCellId]);


  const handlePickerClose = (selectedEmoji) => {
    if (selectedEmoji) {
      getEmojiDataFromNative(selectedEmoji).then((emojiData) => {
        const newEmoji = emojiData.native;
        // ✅ ALTERADO: Pega a nova altura correta
        const newLineY = getLineYForEmoji(newEmoji); 

        if (currentCellId === 'new' && pendingPostData) {
          const { novoX, rowIndex, colIndex, squarewidth } = pendingPostData;
          postNewCard({ novoX, rowIndex, colIndex, squarewidth }, 'emotion', newEmoji);
        } else {
          setMatrix((prevMatrix) => {
            const updatedMatrix = prevMatrix.map((row) =>
              row.map((rect) => {
                if (rect.emotion_id === currentCellId) {
                  const updatedRect = {
                    ...rect,
                    emojiTag: newEmoji,
                    lineY: newLineY // ✅ ALTERADO: Atualiza a altura visualmente
                  };

                  axios.put(`${import.meta.env.VITE_BACKEND}/emotion`, {
                    emotion_id: rect.emotion_id,
                    posX: rect.x,
                    lineY: newLineY, // ✅ ALTERADO: Salva a nova altura no banco
                    emojiTag: newEmoji
                  }).then(() => {
                    // console.log('Emoji atualizado no backend:', updatedRect);
                  }).catch((error) => {
                    console.error('Erro ao atualizar emoji no backend:', error);
                  });

                  return updatedRect;
                }
                return rect;
              })
            );

            return updatedMatrix;
          });

          setEmojis((prevEmojis) => ({
            ...prevEmojis,
            [currentCellId]: newEmoji,
          }));
        }
      });
    }
    setPickerVisible(false);
    setPendingPostData(null);
  };


  const [scenario, setScenario] = useState(false)
  const [sceneName, setSceneName] = useState("")
  const [sceneDesc, setSceneDesc] = useState("")
  const [scenarioExists, setScenarioExists] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchScenarioData = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND + `/scenario/${id_mapa}`);
    const scenario = response.data;
    if (scenario) {
      setSceneName(scenario.name || "");
      setSceneDesc(scenario.description || "");
      setScenarioExists(true);
    }
  } catch (error) {
    // Se for 404, apenas definimos que não existe, sem disparar erro no console
    if (error.response && error.response.status === 404) {
      setScenarioExists(false);
      setSceneName("");
      setSceneDesc("");
    } else {
      console.error("Erro ao buscar os dados do cenário:", error);
    }
  }
};

  useEffect(() => {
    if (scenario) {
      fetchScenarioData();
    }
  }, [scenario]);

  const handleSaveScenario = async () => {
    try {
      if (scenarioExists) {
        await axios.put(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          newName: sceneName,
          newDescription: sceneDesc
        });
      } else {
        await axios.post(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          name: sceneName,
          description: sceneDesc
        });
      }
      
      setScenarioExists(true); 
      setRefreshTrigger(prev => prev + 1); 
      
    } catch (error) {
      console.error("Erro ao salvar o cenário:", error);
    }
  };

  const startTour = () => {
    setRunToolTour(true);
  };


  const handleOpenLevelSelector = () => {
    setShowLevelSelector(true);
  };

const handleLevelSelect = async (level) => {
    // 1. Verifica se existem cards em qualquer uma das 5 linhas da matriz
    const hasCards = matrix.some(row => row.length > 0);

    if (hasCards) {
      // 2. Salva o nível que o usuário tentou abrir e exibe o modal
      setPendingLevelToLoad(level);
      setShowClearConfirmModal(true);
      setShowLevelSelector(false); // Fecha o seletor de nível para não ficar um em cima do outro
      return; 
    }

    // 3. Se não tem cards, carrega o tutorial direto
    startTutorialByLevel(level);
  };

  const startTutorialByLevel = (level) => {
    if (level === 1) {
      setTargetScenario('pizza');
    } else if (level === 2) {
      setTargetScenario('streaming');
    } else if (level === 3) {
      setTargetScenario('viagem');
    }
    
    setShowLevelSelector(false);
    setShowTutorialWizard(true);
  };

  const handleConfirmClearAndStart = async () => {
    setShowClearConfirmModal(false);
    setLoading(true); 
    
    try {
      const deletePromises = [];
      
      matrix.forEach((row) => {
        row.forEach((rect) => {
          const squareType = rect.type;
          const squareId = rect[`${squareType}_id`];
          
          if (squareType && squareId) {
            deletePromises.push(
              axios.delete(import.meta.env.VITE_BACKEND + `/${squareType}/${squareId}`)
            );
          }
        });
      });
      
      await Promise.all(deletePromises);
      setMatrix([[], [], [], [], []]); 
      
      // Carrega o tutorial que estava pendente
      if (pendingLevelToLoad) {
        startTutorialByLevel(pendingLevelToLoad);
      }
      
    } catch (error) {
      console.error("Erro ao limpar o mapa:", error);
      toast.error("Ocorreu um erro ao tentar limpar o mapa.");
    } finally {
      setLoading(false);
      setPendingLevelToLoad(null);
    }
  };

  const stopTour = () => {
    setRunToolTour(false);
    
    const tutorialFlag = localStorage.getItem('startToolTutorial');
    const user = JSON.parse(localStorage.getItem('user'));
    const hasCompletedAnyPractice = localStorage.getItem(`maxPoints_pizza_${user?.uid}`);
    
    // PEGANDO A CHAVE ÚNICA DO USUÁRIO DE NOVO
    const hasSeenToolTourKey = `hasSeenToolTour_${user?.uid}`;

    if (tutorialFlag === 'true') {
      localStorage.removeItem('startToolTutorial');
      localStorage.setItem(hasSeenToolTourKey, 'true'); // SALVA A CHAVE COM O UID AQUI
      
      if (!hasCompletedAnyPractice) {
        setShowTutorialInvite(true);
      }
    }
  };

  const handleTutorialComplete = async () => {
    setShowTutorialWizard(false);
    setLoading(true);

    let currentScenarioData;
    if (targetScenario === 'streaming') currentScenarioData = STREAMING_SCENARIO;
    else if (targetScenario === 'viagem') currentScenarioData = ADVANCED_SCENARIO;
    else currentScenarioData = PIZZA_SCENARIO;

    try {
      const meta = currentScenarioData.scenarioMeta; 

      // 🔍 CORREÇÃO: Checar direto no banco se o cenário já existe, 
      // ignorando a variável de estado que pode estar desatualizada
      let cenarioJaExiste = false;
      try {
        const checkRes = await axios.get(import.meta.env.VITE_BACKEND + `/scenario/${id_mapa}`);
        // Se a API retornou dados válidos, o cenário já existe!
        if (checkRes.data && (checkRes.data.name || checkRes.data.description)) {
          cenarioJaExiste = true;
        }
      } catch (err) {
        // Se der erro (ex: 404 Not Found), assumimos que não existe
        cenarioJaExiste = false;
      }

      if (cenarioJaExiste) {
        // Já tem cenário preso nesse mapa! Fazemos a atualização (PUT)
        await axios.put(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          newName: meta.name,
          newDescription: meta.description
        });
      } else {
        // Mapa novinho em folha! Criamos o cenário (POST)
        await axios.post(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          name: meta.name,
          description: meta.description
        });
      }

    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUnlocked = parseInt(localStorage.getItem(`unlockedTutorialLevel_${currentUser.uid}`)) || 1;

      // Se completou o nível 1 (pizza), libera o 2
      if (targetScenario === 'pizza' && currentUnlocked < 2) {
        localStorage.setItem(`unlockedTutorialLevel_${currentUser.uid}`, '2');
      }
      // Se completou o nível 2 (streaming), libera o 3 ✅
      else if (targetScenario === 'streaming' && currentUnlocked < 3) {
        localStorage.setItem(`unlockedTutorialLevel_${currentUser.uid}`, '3');
      }
    }

      toast.success('Tutorial concluído! Mapa e Cenário salvos.');
      window.location.reload();

    } catch (error) {
      console.error("Erro ao completar tutorial:", error);
      toast.error("Erro ao salvar o mapa.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartTutorial = async () => {
    let currentScenarioData;
    if (targetScenario === 'streaming') currentScenarioData = STREAMING_SCENARIO;
    else if (targetScenario === 'viagem') currentScenarioData = ADVANCED_SCENARIO;
    else currentScenarioData = PIZZA_SCENARIO;

    const meta = currentScenarioData.scenarioMeta; 

    const scenarioElement = document.querySelector('.scenario-name');
    if (scenarioElement) {
      scenarioElement.innerText = `Cenário - ${meta.name}`;
    }
    
    // Atualiza as variáveis do seu modal de edição
    setSceneName(meta.name);
    setSceneDesc(meta.description);
    setScenarioExists(true);

    // 2. Salva o nome correto no banco de dados antes da prática começar
    try {
      let cenarioJaExiste = false;
      try {
        const checkRes = await axios.get(import.meta.env.VITE_BACKEND + `/scenario/${id_mapa}`);
        if (checkRes.data && (checkRes.data.name || checkRes.data.description)) {
          cenarioJaExiste = true;
        }
      } catch (err) {
        cenarioJaExiste = false;
      }

      if (cenarioJaExiste) {
        await axios.put(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          newName: meta.name,
          newDescription: meta.description
        });
      } else {
        await axios.post(import.meta.env.VITE_BACKEND + '/scenario', {
          journeyMapId: id_mapa,
          name: meta.name,
          description: meta.description
        });
      }
    } catch (error) {
      console.error("Erro ao salvar cenário inicial:", error);
    }
  };

  const addTutorialCardToMap = async (step, currentStepIndex) => {
    const positions = [20, 290, 560, 830, 1100];
    const phaseIndex = Math.floor(currentStepIndex / 5);
    const currentX = positions[phaseIndex];
    const answer = step.correctAnswer;

    // Leitura inteligente da linha (não depende mais de formatação exata)
    const sectionStr = step.section.toLowerCase();
    let endpoint = 'journeyPhase'; // Padrão
    if (sectionStr.includes('ação') || sectionStr.includes('acoes') || sectionStr.includes('ações')) endpoint = 'userAction';
    else if (sectionStr.includes('emoç') || sectionStr.includes('emoc')) endpoint = 'emotion';
    else if (sectionStr.includes('pensamento')) endpoint = 'thought';
    else if (sectionStr.includes('contato')) endpoint = 'contactPoint';

    try {
      const payload = {
        journeyMap_id: id_mapa,
        posX: currentX,
        emojiTag: answer.emojiTag || "😀",
      };

      if (endpoint === 'emotion') {
        // ✅ ALTERADO: Define a altura baseada na emoção automaticamente pro tutorial também!
        payload.lineY = getLineYForEmoji(payload.emojiTag);
      } else {
        payload.linePos = 285;
        payload.length = 230;
        payload.description = answer.description || step.options?.find(opt => opt.correct)?.text || "Descrição";
      }

      await axios.post(`${import.meta.env.VITE_BACKEND}/${endpoint}`, payload);
      
      // Atualiza o mapa visualmente
      fetchData(); 
    } catch (error) {
      console.error("Erro ao adicionar card em tempo real:", error);
    }
  };

  return (
    <div className="scrollable-container">

      {isExporting && (
        <div data-html2canvas-ignore="true" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: '#E6E6E6', zIndex: 99999, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="loading-spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: '#4CAF50', width: '80px', height: '80px', borderWidth: '8px' }}></div>
          <h2 style={{ marginTop: '30px', color: '#333', fontFamily: 'Inter' }}>Baixando seu mapa...</h2>
        </div>
      )}

      <div style={{ zoom: zoomRatio }}>
      <ToolTour run={runToolTour} onTourEnd={stopTour} />

      {showLevelSelector && (
        <TutorialLevelSelector 
          onClose={() => setShowLevelSelector(false)}
          onSelectLevel={handleLevelSelect}
        />
      )}

      {showTutorialWizard && (
        <TutorialWizard 
          onClose={() => setShowTutorialWizard(false)} 
          onComplete={handleTutorialComplete} 
          onCorrectAnswer={addTutorialCardToMap}
          onStartTutorial={handleStartTutorial}
          scenarioType={targetScenario}
        />
      )}
      {showExampleMapModal && (
      <ModalName trigger={showExampleMapModal} setTrigger={setShowExampleMapModal}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ fontSize: "40px", marginTop: "30px", marginBottom: "30px" }}>
              {dataLoaded ? "Tour Concluído!" : "Carregando Exemplo!"}
            </h1>
            <p style={{ fontSize: "24px", marginBottom: "40px" }}>
              {dataLoaded ? 
                "Você completou o tour!" : 
                "Vamos carregar um mapa de exemplo para você. A página será recarregada."
              }
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>     
            <button 
              className="botaosavename" 
              onClick={() => { 
                setShowExampleMapModal(false); // Fecha o modal visualmente
                if (!dataLoaded) {
                   handlePostClick(); // Cria o exemplo e recarrega a página
                }
              }}
            >
              {dataLoaded ? "Fechar" : "Gerar Exemplo e Finalizar"}
            </button>
          </div>
        </ModalName>
      )}

      {showFAQ && (
        <ModalName trigger={showFAQ} setTrigger={setShowFAQ}>
          <FAQContent />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button className="botaocancelname" onClick={() => setShowFAQ(false)}>Fechar</button>
          </div>
        </ModalName>
      )}

      </div>

      <div style={{ zoom: zoomRatio, minWidth: "100vw", width: calculateTotalWidth(matrix) + 2400, height: "1000px", position: "relative" }}>
        <>
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div style={{ pointerEvents: (runToolTour || showTutorialWizard) ? 'none' : 'auto' }}>
            <Navbar
              onSaveClick={() => { handleSaveClick(); showAlert() }}
              onInfoClick={handleExport}
              onFAQClick={() => setShowFAQ(true)}
              onScenarioClick={() => { setButtonPopup(true); setScenario(true) }}
              onRankingClick={() => setShowRankingModal(true)}
              onLogoutClick={handleLogout}
              onMap={onMap}
              onDownload={handleExport}
              onStartTour={() => setRunToolTour(true)}
              handlePostClick={handlePostClick}
              dataLoaded={dataLoaded}
              currentJourneyMap={id_mapa}
              onTutorialClick={handleOpenLevelSelector}
              refreshTrigger={refreshTrigger}
            />
          </div>

<div style={{ height: "61.9px", width: "100%" }}></div>
          <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup} setTextEdit={setTextEdit} setScenario={setScenario} style={{ borderRadius: "25px", padding: "20px", backgroundColor: "#f9f9f9", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            {textEdit ? (
              <>
                <div style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
                  <h1 style={{ fontSize: "36px", marginTop: "20px", marginBottom: "20px", color: "#333" }}>Editar card</h1>
                </div>
                <div className="areatexto">
                  <textarea
                    type="text"
                    value={editedText}
                    placeholder="Texto vazio"
                    className="textolegal"
                    onChange={(e) => setEditedText(e.target.value)}
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  />
                  <div className="separarbotoes" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <input
                        type="number"
                        id="houseCount"
                        value={selectedHouses}
                        onChange={handleSelectChange}
                        min={1}
                        step={1}
                        className="houseInput"
                        style={{
                          width: '80px',
                          height: '50px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          marginRight: '10px',
                          padding: '5px',
                          fontSize: '24px',
                          textAlign: 'center'
                        }}
                      />
                      <p style={{ margin: '0', fontSize: '20px', color: '#333', marginRight: '15px' }}>Card(s)</p>
                      <button
                        className="buttonconf"
                        onClick={handleSaveHouse}
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '12px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.3s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#388e3c'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                      >
                        Salvar Tamanho
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, justifyContent: 'flex-end' }}>
                      <button
                        className="buttonconf2"
                        onClick={() => setEditedText('')}
                        style={{ backgroundColor: '#f44336', color: 'white', padding: '12px 30px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.3s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
                      >
                        Limpar Texto
                      </button>
                      <button
                        className="buttonconf"
                        onClick={() => { handleTextSubmit(); setButtonPopup(false); setTextEdit(false) }}
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '12px 40px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: '0.3s' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#388e3c'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4caf50'}
                      >
                        Salvar
                      </button>
                    </div>

                  </div>
                </div>
              </>

            ) : scenario === true ? (
              <>
                <div style={{ textAlign: "left", display: "flex", alignItems: "center" }}>
                  <h1 style={{ fontSize: "50px" }}>Cenário</h1>
                </div>
                <br />
                <h2>Nome do cenário</h2>
                <input
                  type="text"
                  className="input-texto"
                  value={sceneName}
                  onChange={(e) => setSceneName(e.target.value)}
                  placeholder="Escreva o título..."
                />
                <h2 style={{ marginBottom: "-20px" }}>Descreva o cenário</h2>
                <div className="areatexto">
                  <textarea
                    type="text"
                    className="textolegal"
                    value={sceneDesc}
                    onChange={(e) => setSceneDesc(e.target.value)}
                    placeholder="Escreva o cenário..."
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  />
                  <div className="separarbotoes">
                    <button className="buttonconf2" onClick={() => { setSceneName(''); setSceneDesc('') }}>
                      Limpar texto
                    </button>
                    <button className="buttonconf" onClick={() => { setButtonPopup(false); setScenario(false); handleSaveScenario() }}>
                      Salvar cenário
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </Popup>
          {isPickerVisible && (
            <Popup trigger={isPickerVisible} setTrigger={setPickerVisible}>
              <div className="PickerContainer">
                <Picker
                  className="Picker"
                  data={data}
                  emojiSize={30}
                  emojiButtonSize={60}
                  perLine={20}
                  maxFrequentRows={10}
                  previewPosition="none"
                  navPosition="bottom"
                  emojiButtonRadius="100%"
                  theme="light"
                  locale="pt"
                  onEmojiSelect={(e) => handlePickerClose(e.native)}
                />
              </div>
            </Popup>
          )}
          {dataLoaded && (
            <div className="stage-container">
              <Stage width={calculateTotalWidth(matrix) + 1260} height={1000} ref={stageRef}>
                <Layer listening={!showTutorialWizard}>
                  <Matrix
                    key={forceUpdate}
                    matrix={matrix}
                    handleTextSubmit={handleTextSubmit}
                    handleTextChange={handleTextChange}
                    handleAddSquare={handleAddSquare}
                    handleDeleteSquare={handleDeleteSquare}
                    handleDragEnd={handleDragEnd}
                    handleCircleClick={handleCircleClick}
                    emojis={emojis}
                    handleRectClick={handleRectClick}
                    setMatrix={setMatrix}
                  />
                </Layer>
              </Stage>
            </div>
          )}

      {showRankingModal && <RankingModal onClose={() => setShowRankingModal(false)} />}

      {showClearConfirmModal && (
        <ModalName trigger={showClearConfirmModal} setTrigger={setShowClearConfirmModal}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ fontSize: "36px", marginTop: "30px", marginBottom: "20px", color: "#f44336" }}>
              ⚠️ Limpar Mapa
            </h1>
            <p style={{ fontSize: "22px", marginBottom: "10px" }}>
              Para iniciar a Prática Guiada, precisamos de um mapa em branco.
            </p>
            <p style={{ fontSize: "20px", marginBottom: "40px", color: "#666" }}>
              Todos os cards atuais deste mapa serão <b>excluídos permanentemente</b>. Deseja continuar?
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button 
              className="botaocancelname" 
              onClick={handleConfirmClearAndStart}
            >
              Sim, Apagar
            </button>
            <button 
              className="botaosavename" 
              onClick={() => {
                setShowClearConfirmModal(false);
                setPendingLevelToLoad(null);
                setShowLevelSelector(true); 
              }}
            >
              Cancelar
            </button>
          </div>
        </ModalName>
      )}

      {showTutorialInvite && (
        <ModalName trigger={showTutorialInvite} setTrigger={setShowTutorialInvite}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ fontSize: "36px", marginTop: "30px", marginBottom: "20px", color: "#333" }}>
              Tour Concluído!
            </h1>
            <p style={{ fontSize: "22px", marginBottom: "10px" }}>
              Agora você já conhece a interface da nossa ferramenta.
            </p>
            <p style={{ fontSize: "20px", marginBottom: "40px", color: "#666" }}>
              Gostaria de iniciar a <b>Prática Guiada</b> para aprender na prática como preencher as informações de um mapa e ganhar pontos?
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button 
              className="botaocancelname" 
              onClick={() => setShowTutorialInvite(false)}
            >
              Não, obrigado
            </button>
                        <button 
              className="botaosavename" 
              onClick={() => {
                setShowTutorialInvite(false);
                handleOpenLevelSelector();
              }}
            >
              Sim, começar!
            </button>
          </div>
        </ModalName>
      )}

          <div className="teste-1" style={{ width: calculateTotalWidth(matrix) + 200 }}>
            <div className="fases-container" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
              <div className="barra1" />
              <div className="fases-content" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
                <div className="fases-text">Fases da Jornada</div>
              </div>
            </div>
            <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
            <div className="fases-container" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
              <div className="barra2" />
              <div className="fases-content" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
                <div className="fases-text">Ações do Usuário</div>
              </div>
            </div>
            <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
            <div className="fases-container" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
              <div className="barra3" />
              <div className="fases-content" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
                <div className="fases-text">Emoções</div>
              </div>
            </div>
            <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
            <div className="fases-container" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
              <div className="barra4" />
              <div className="fases-content" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
                <div className="fases-text">Pensamentos</div>
              </div>
            </div>
            <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
            <div className="fases-container" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
              <div className="barra5" />
              <div className="fases-content" style={{ width: calculateTotalWidth(matrix) + 2400 }}>
                <div className="fases-text">Pontos de Contato</div>
              </div>
            </div>
            <div className="separator1" style={{ width: calculateTotalWidth(matrix) + 2400 }}></div>
          </div>
        </>
      </div>
    </div>
  );

};

export default Tool;
