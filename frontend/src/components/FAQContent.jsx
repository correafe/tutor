// 1. Importe useEffect e useContext
import React, { useEffect, useContext } from 'react';
import { ScoreContext } from '../contexts/ScoreContext';

const FAQContent = () => {
  // 2. Puxe a função do contexto
  const { addPoints } = useContext(ScoreContext);

  // 3. Adicione o useEffect para rodar assim que o componente abrir
  useEffect(() => {
    // Verifica se já leu o FAQ antes
    const hasReadFaq = localStorage.getItem('hasReadFaq');
    
    if (!hasReadFaq) {
      // Dá 20 pontos e marca como lido no localStorage
      addPoints(20, 'Leu as Perguntas Frequentes');
      localStorage.setItem('hasReadFaq', 'true');
    }
  }, []); // O array vazio [] garante que rode apenas uma vez ao abrir

  return (
    <div style={{ textAlign: "left", padding: "10px" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
        Perguntas Frequentes (FAQ)
      </h2>
      
      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>O que é um Mapa de Jornada?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          É uma representação visual que conta a história da experiência do cliente com seu produto ou serviço, desde o primeiro contato até o pós-venda.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Como adiciono novos cards?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          Passe o mouse sobre o mapa e clique no botão <strong>"+"</strong> que aparece nas linhas da jornada. Para emoções, você pode escolher um emoji.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Como exportar meu mapa?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          No menu superior, clique no botão de <strong>Download</strong> (ícone de seta para baixo) para salvar seu mapa como uma imagem PNG.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>O salvamento é automático?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          Não. Recomendamos clicar no botão <strong>Salvar</strong> no menu superior sempre que fizer alterações importantes.
        </p>
      </details>
    </div>
  );
};

export default FAQContent;