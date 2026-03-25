import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [userUid, setUserUid] = useState(null);

  // Monitora qual usuário está logado e puxa a pontuação inicial
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
        
        try {
          // 1. Busca a pontuação OFICIAL do backend na nuvem
          const response = await fetch('https://tutor-api-jem.duckdns.org/ranking');
          const rankingData = await response.json();
          
          // 2. Procura o usuário logado na lista do ranking
          const userInDb = rankingData.find(r => r.firebase_uid === user.uid);
          
          if (userInDb) {
            // Se achou no banco, essa é a pontuação verdadeira (Sincroniza entre PCs)
            setScore(Number(userInDb.score));
            localStorage.setItem(`userScore_${user.uid}`, userInDb.score);
          } else {
            // Se não achou no banco (conta novinha), tenta ver se tem algo salvo localmente
            const savedScore = localStorage.getItem(`userScore_${user.uid}`);
            if (savedScore) {
              setScore(Number(savedScore));
            }
          }
        } catch (error) {
          console.error("Erro ao buscar pontuação da nuvem:", error);
          // Fallback de segurança: se a API estiver fora do ar, tenta usar o local
          const savedScore = localStorage.getItem(`userScore_${user.uid}`);
          if (savedScore) setScore(Number(savedScore));
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
      // Salva no localStorage atrelado ao UID do usuário para cache rápido
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