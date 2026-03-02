import React, { createContext, useState, useEffect } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  // Inicia pegando do localStorage ou zero
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('userScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // Função para adicionar pontos
  const addPoints = (points, actionName) => {
    setScore((prevScore) => {
      const newScore = prevScore + points;
      localStorage.setItem('userScore', newScore);
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