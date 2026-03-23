import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase'; // Verifica se o caminho para o firebase.js está correto
import { onAuthStateChanged } from 'firebase/auth';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [userUid, setUserUid] = useState(null);

  // Monitora qual usuário está logado atualmente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        // Busca a pontuação específica deste usuário
        const savedScore = localStorage.getItem(`userScore_${user.uid}`);
        setScore(savedScore ? parseInt(savedScore, 10) : 0);
      } else {
        // Se ninguém estiver logado ou se o usuário deslogar, a pontuação na tela zera
        setUserUid(null);
        setScore(0);
      }
    });
    
    // Limpa o observador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função para adicionar pontos
  const addPoints = (points, actionName) => {
    setScore((prevScore) => {
      const newScore = prevScore + points;
      // Salva no localStorage atrelado ao UID do usuário
      if (userUid) {
        localStorage.setItem(`userScore_${userUid}`, newScore);
      }
      console.log(`🎉 +${points} pontos por: ${actionName}. Total: ${newScore}`);
      return newScore;
    });
  };

  return (
    <ScoreContext.Provider value={{ score, addPoints }}>
      {children}
    </ScoreContext.Provider>
  );
};