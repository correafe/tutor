import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [userUid, setUserUid] = useState(null);

  // Monitora qual usuário está logado e puxa a pontuação inicial
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        // Busca se o usuário já tem pontuação salva no navegador
        const savedScore = localStorage.getItem(`userScore_${user.uid}`);
        if (savedScore) {
          setScore(Number(savedScore));
        }
      } else {
        setUserUid(null);
        setScore(0);
      }
    });
    return () => unsubscribe();
  }, []);

  // Toda vez que a pontuação mudar, avisa o backend na nuvem
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && score > 0) {
      // URL ATUALIZADA PARA O SEU DOMÍNIO SEGURO
      fetch('https://tutor-api-jem.duckdns.org/ranking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebase_uid: user.uid,
          display_name: user.displayName || 'Mapeador',
          photo_url: user.providerData?.[0]?.photoURL || '',
          score: score
        })
      }).catch(err => console.error("Erro ao salvar pontuação", err));
    }
  }, [score]);

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