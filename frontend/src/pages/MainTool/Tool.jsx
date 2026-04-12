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
      const minHeight = 960; 
      if (window.innerHeight < minHeight) {
         setZoomLevel(window.innerHeight / minHeight);
      } else {
         setZoomLevel(1);
      }
    };
    handleResize(); 
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

  const location = useLocation();
  const isTutorialMode = location.state?.startTour;

  const width = window.innerWidth;
  const height = window.innerHeight;

  const stageRef = React.useRef(null);

  const [loading, setLoading] = useState(false);

  const savePromiseRef = React.useRef(Promise.resolve());

  const handleExport = async () => {
    try {
      setIsExporting(true);
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
      const hasSeenToolTour = localStorage.getItem('hasSeenToolTour');

      if (tutorialFlag === 'true') {
        setDataLoaded(true);
        setRunToolTour(true); 
      } 
      else if (!hasSeenToolTour) {
        setRunToolTour(true);
        localStorage.setItem('hasSeenToolTour', 'true');
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
    let updatedX;
    const intervalCount = Math.floor(newX / 270);
    updatedX = intervalCount * 270;
    const newXStart = xoriginal + updatedX;
    const newXEnd = newXStart + length;
    const tamanhoRectMovido = Math.round(length / 270);
  
    return matrix.map((row, rowIndex) => {
      const rectIndex = row.findIndex(rect => rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString());
      if (rectIndex === -1) {
        return row;
      }
  
      const overlappingRect = row.find(rect => {
        if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() !== id.toString()) {
          const rectStart = rect.x;
          const rectEnd = rect.x + rect.width;
          const isOverlapping = !(newXEnd <= rectStart || newXStart >= rectEnd);
          return isOverlapping;
        }
        return false;
      });
  
      if (overlappingRect) {
        return row.map(rect => {
          if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString()) {
            return {
              ...rect,
              x: Math.max(20, newXStart),
            };
          }
          if (updatedX < 0) {
            if (rect.x >= newXStart && rect.x <= xoriginal) {
              return {
                ...rect,
                x: rect.x + 270 * tamanhoRectMovido,
              };
            }
          } else {
            if (rect.x >= newXStart) {
              return {
                ...rect,
                x: rect.x + 270 * tamanhoRectMovido,
              };
            }
          }
          return rect;
        });
      }
  
      const isOverlappingWithDifferentSize = row.some(rect => {
        if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() !== id.toString()) {
          const rectStart = rect.x;
          const rectEnd = rect.x + rect.width;
          const isOverlapping = !(newXEnd <= rectStart || newXStart >= rectEnd);
          if (isOverlapping && rect.width !== length) {
            return true;
          }
        }
        return false;
      });
  
      if (isOverlappingWithDifferentSize) {
        return row;
      }
  
      return row.map((rect) => {
        if (rect.type === 'emotion' && rect.emotion_id.toString() === id.toString()) {
          const allowedValues = [35, -15, -60];
          const newLineY = allowedValues.reduce((prev, curr) => (Math.abs(curr - (rect.lineY + closeY)) < Math.abs(prev - (rect.lineY + closeY)) ? curr : prev));
          return {
            ...rect,
            x: Math.max(20, newXStart),
            lineY: newLineY,
          };
        } else if (rect[tipo + "_id"] !== undefined && rect[tipo + "_id"].toString() === id.toString()) {
          return {
            ...rect,
            x: Math.max(20, newXStart),
          };
        } else {
          return rect;
        }
      });
    }).map((row) => {
      const positions = new Set();
      return row.map((rect) => {
        if (positions.has(rect.x)) {
          rect.x = newXStart;
        }
        positions.add(rect.x);
        return rect;
      });
    });
  };
  
  const handleDragEnd = (e, id, tipo, length, x, closeY, xoriginal) => {
    const newX = e.target.x();
    setMatrix((prevMatrix) => {
      const rearrangedMatrix = updateMatrixWithX(prevMatrix, id, newX, tipo, length, x, closeY, xoriginal);
  
      const updatedMatrix = rearrangedMatrix.map((row) => {
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
  
        for (let i = 0; i < adjustedRow.length - 1; i++) {
          const currentRect = adjustedRow[i];
          const nextRect = adjustedRow[i + 1];
  
          while (nextRect.x < currentRect.x + currentRect.width) {
            nextRect.x = currentRect.x + currentRect.width + 40;
          }
        }
  
        return adjustedRow;
      });
      return updatedMatrix;
    });
    setEditedRectId(id);
    setForceUpdate((prev) => prev + 1);
    setSaveTriggered(true);
    setShowMessage(false);
  };
  
  const handleSaveClick = () => {
    const dataToPut = matrix.reduce((acc, row) => {
      row.forEach((rect) => {
        // Base Data limpa para evitar undefined em rotas críticas
        const baseData = {
          journeyMap_id: id_mapa,
          posX: rect.x !== undefined ? rect.x : 20,
          length: rect.width || 230,
          description: rect.text || rect.description || " " 
        };

        if (rect.contactPoint_id !== undefined) {
          acc.push({
            endpoint: "contactPoint",
            data: { ...baseData, contactPoint_id: rect.contactPoint_id },
          });
        } else if (rect.userAction_id !== undefined) {
          acc.push({
            endpoint: "userAction",
            data: { ...baseData, userAction_id: rect.userAction_id },
          });
        } else if (rect.emotion_id !== undefined) {
          acc.push({
            endpoint: "emotion",
            data: { 
              emotion_id: rect.emotion_id, 
              journeyMap_id: id_mapa, 
              posX: rect.x, 
              lineY: rect.lineY !== undefined ? rect.lineY : -15, 
              emojiTag: rect.emojiTag || "😀" 
            },
          });
        } else if (rect.thought_id !== undefined) {
          acc.push({
            endpoint: "thought",
            data: { ...baseData, thought_id: rect.thought_id },
          });
        } else if (rect.journeyPhase_id !== undefined) {
          acc.push({
            endpoint: "journeyPhase",
            data: { ...baseData, journeyPhase_id: rect.journeyPhase_id },
          });
        }
      });
      return acc;
    }, []);

    savePromiseRef.current = savePromiseRef.current.then(async () => {
      for (const req of dataToPut) {
        try {
          const url = import.meta.env.VITE_BACKEND + `/${req.endpoint}`;
          await axios.put(url, req.data);
        } catch (err) {
          console.error(`Erro ao salvar ${req.endpoint}:`, err);
        }
      }
      if (!showMessage) setShowMessage(true);
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
    setEditedText(currentText); 
    setEditedRectId(id);
    setEditedRowIndex(rectY);
    setButtonPopup(true); 
    setTextEdit(true); 

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
  }, [saveTriggered, matrix]); 

  const handleTextChange = (rowIndex, colIndex, newText) => {
    const newMatrix = [...matrix];
    const abbreviatedText = newText.length > 30 ? newText.slice(0, 27) + '...' : newText;

    const newTextOriginal = newText;
    setEditedText(newTextOriginal); 
    setEditedRowIndex(rowIndex);

    newMatrix[rowIndex][colIndex].text = abbreviatedText;
    setMatrix(newMatrix); 
  };

  const handleTextSubmit = () => {
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

    setMatrix(updatedMatrix);
    setEditedText("");
    setSaveTriggered(true);
    setEditedRectId("");
  };

  const [newSquareId, setNewSquareId] = useState(null);

  const handleAddSquare = async (rowIndex, colIndex, squarewidth) => {
    try {
      const rowIndexToType = {
        0: 'journeyPhase', 1: 'userAction', 2: 'emotion', 3: 'thought', 4: 'contactPoint'
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
        // 1. Atualizar visualmente ANTES para impedir bug visual do React sobrescrevendo cards
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

        // 2. Persistir no BD com valores 100% seguros (evita falha 500 silenciosa que cancelava os blocos da UI)
        savePromiseRef.current = savePromiseRef.current.then(async () => {
          const cardsToPush = matrix[rowIndex].filter(c => c.x >= novoX);
          for (const card of cardsToPush) {
            const putData = {
              [`${type}_id`]: card[`${type}_id`] || card.id,
              journeyMap_id: id_mapa,
              posX: card.x + 270, 
              length: card.width || 230,
              lineY: card.lineY !== undefined ? card.lineY : -15,
              description: card.text || " " 
            };
            
            if (!putData[`${type}_id`]) continue;

            try {
              await axios.put(import.meta.env.VITE_BACKEND + `/${type}`, putData);
            } catch (err) {
              console.error("Erro ao atualizar posição", err);
            }
          }
        });
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
    await savePromiseRef.current; 

    const postData = {
      "journeyMap_id": id_mapa,
      "linePos": 285,
      "posX": novoX,
      "length": 230,
      "description": " ",
      "emojiTag": emojiTag
    };

    if (type === 'emotion') {
      postData.posX = novoX;
      postData.journeyMap_id = id_mapa;
      postData.lineY = getLineYForEmoji(emojiTag); 
    }

    try {
      await axios.post(import.meta.env.VITE_BACKEND + `/${type}`, postData);
      fetchData(); 
    } catch (err) {
      console.error("Falha ao criar o novo card:", err);
    }
  };

  useEffect(() => {
    if (newSquareId && matrix) {
      const [journeyPhase, userAction, emotions] = matrix;
      const emotionIds = emotions.map(emotion => emotion.emotion_id);
      if (emotionIds.includes(newSquareId)) {
        handleCircleClick(newSquareId);
      }
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
    setCurrentCellId(cellId);
  };

  useEffect(() => {
    if (currentCellId !== "") {
      setPickerVisible(true);
    }
  }, [currentCellId]);


  const handlePickerClose = (selectedEmoji) => {
    if (selectedEmoji) {
      getEmojiDataFromNative(selectedEmoji).then((emojiData) => {
        const newEmoji = emojiData.native;
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
                    lineY: newLineY 
                  };

                  axios.put(`${import.meta.env.VITE_BACKEND}/emotion`, {
                    emotion_id: rect.emotion_id,
                    posX: rect.x,
                    lineY: newLineY, 
                    emojiTag: newEmoji
                  }).then(() => {
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
    const hasCards = matrix.some(row => row.length > 0);

    if (hasCards) {
      setPendingLevelToLoad(level);
      setShowClearConfirmModal(true);
      setShowLevelSelector(false); 
      return; 
    }

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

    if (tutorialFlag === 'true') {
      localStorage.removeItem('startToolTutorial');
      localStorage.setItem('hasSeenToolTour', 'true');
      
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

    const currentUser = auth.currentUser;
    if (currentUser) {
      const currentUnlocked = parseInt(localStorage.getItem(`unlockedTutorialLevel_${currentUser.uid}`)) || 1;

      if (targetScenario === 'pizza' && currentUnlocked < 2) {
        localStorage.setItem(`unlockedTutorialLevel_${currentUser.uid}`, '2');
      }
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
    
    setSceneName(meta.name);
    setSceneDesc(meta.description);
    setScenarioExists(true);

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

    const sectionStr = step.section.toLowerCase();
    let endpoint = 'journeyPhase'; 
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
        payload.lineY = getLineYForEmoji(payload.emojiTag);
      } else {
        payload.linePos = 285;
        payload.length = 230;
        payload.description = answer.description || step.options?.find(opt => opt.correct)?.text || "Descrição";
      }

      await axios.post(`${import.meta.env.VITE_BACKEND}/${endpoint}`, payload);
      
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
          <h2 style={{ marginTop: '30px', color: '#333', fontFamily: 'Inter' }}>Preparando seu mapa em alta qualidade...</h2>
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
                setShowExampleMapModal(false); 
                if (!dataLoaded) {
                   handlePostClick(); 
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
                  <div className="separarbotoes" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="number"
                        id="houseCount"
                        value={selectedHouses}
                        onChange={handleSelectChange}
                        min={1}
                        step={1}
                        className="houseInput"
                        style={{
                          width: '100px',
                          height: '60px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          marginRight: '10px',
                          padding: '5px',
                          fontSize: '28px',
                          textAlign: 'center',
                          position: 'relative'
                        }}
                      />
                      <p style={{ margin: '0', fontSize: '22px', color: '#333' }}>Card(s)</p>
                      <button
                        className="botaosavetamanho"
                        onClick={handleSaveHouse}
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '18px', marginLeft: '10px', width: '100px', height: "60px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        Salvar Tamanho
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                      <button
                        className="buttonconf2"
                        onClick={() => setEditedText('')}
                        style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 40px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '22px', marginRight: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        Limpar texto
                      </button>
                      <button
                        className="buttonconf"
                        onClick={() => { handleTextSubmit(); setButtonPopup(false); setTextEdit(false) }}
                        style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 40px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
          <div style={{ display: "flex", justifyContent: "space-between", gap: "15px" }}>
            <button 
              className="buttonconf2" 
              onClick={() => {
                setShowClearConfirmModal(false);
                setPendingLevelToLoad(null);
                setShowLevelSelector(true); 
              }}
              style={{ backgroundColor: '#ccc', color: '#333', flex: 1, border: "none", borderRadius: "5px", padding: "15px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
            >
              Cancelar
            </button>
            <button 
              className="buttonconf" 
              onClick={handleConfirmClearAndStart}
              style={{ backgroundColor: '#f44336', color: 'white', flex: 1, border: "none", borderRadius: "5px", padding: "15px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
            >
              Sim, Apagar e Iniciar
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