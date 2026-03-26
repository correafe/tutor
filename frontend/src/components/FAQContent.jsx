import React, { useEffect, useContext } from 'react';
import { ScoreContext } from '../contexts/ScoreContext';

const FAQContent = () => {
  const { addPoints } = useContext(ScoreContext);

  useEffect(() => {
    // Pegar usuário atual para gerar uma chave única
    const user = JSON.parse(localStorage.getItem('user'));
    const faqKey = `hasReadFaq_${user?.uid}`;
    const hasReadFaq = localStorage.getItem(faqKey);
    
    if (!hasReadFaq && user) {
      addPoints(20, 'Leu as Perguntas Frequentes');
      localStorage.setItem(faqKey, 'true');
    }
  }, [addPoints]); 

  // Estilo padrão para os blocos de detalhes para manter o código limpo
  const detailsStyle = { 
    marginBottom: "15px", 
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0"
  };

  const summaryStyle = { 
    fontSize: "18px", 
    fontWeight: "bold", 
    color: "#2c3e50",
    outline: "none"
  };

  const textStyle = { 
    marginTop: "12px", 
    fontSize: "16px", 
    lineHeight: "1.6", 
    color: "#555" 
  };

  return (
    <div style={{ textAlign: "left", padding: "10px", maxHeight: "60vh", overflowY: "auto" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "25px", borderBottom: "2px solid #4CAF50", paddingBottom: "10px", color: "#333" }}>
        Perguntas Frequentes (FAQ)
      </h2>
      
      <details style={detailsStyle}>
        <summary style={summaryStyle}>🏆 Como funciona o sistema de pontos e ranking?</summary>
        <p style={textStyle}>
          O JEM possui um sistema de gamificação para tornar sua experiência mais divertida! Você ganha pontos de experiência (XP) ao interagir com a plataforma e aprender a usar a ferramenta. 
          <br /><br />
          <strong>Como ganhar pontos:</strong>
          <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
            <li>Completar a <strong>Prática Guiada</strong> (Tutorial de cenários).</li>
            <li>Finalizar os <strong>Tours</strong> de navegação do painel e da ferramenta.</li>
            <li>Descobrir áreas novas da plataforma (inclusive, você acabou de ganhar pontos por abrir este FAQ!).</li>
          </ul>
          Acumulando pontos, você sobe no <strong>Ranking</strong>, muda seu título de especialista e ganha novas molduras para o seu avatar!
        </p>
      </details>

      <details style={detailsStyle}>
        <summary style={summaryStyle}>🗺️ O que é um Mapa de Jornada?</summary>
        <p style={textStyle}>
          É uma representação visual que conta a história da experiência do cliente com seu produto ou serviço, desde o primeiro contato até o pós-venda. Ele ajuda a identificar pontos de atrito, oportunidades de melhoria e a entender as emoções do usuário ao longo do caminho.
        </p>
      </details>

      <details style={detailsStyle}>
        <summary style={summaryStyle}>➕ Como adiciono novos cards no mapa?</summary>
        <p style={textStyle}>
          Passe o mouse sobre as faixas cinzas vazias do seu mapa e clique no botão verde <strong>"+"</strong> que aparecerá para criar um novo card naquela posição. Para a linha de "Emoções", ao clicar no botão, um menu se abrirá para você escolher o emoji que melhor representa o momento.
        </p>
      </details>

      <details style={detailsStyle}>
        <summary style={summaryStyle}>💾 O salvamento do meu mapa é automático?</summary>
        <p style={textStyle}>
          <strong>Não.</strong> Para garantir que você tenha controle total sobre as edições e não perca informações por engano, o salvamento é manual. Recomendamos clicar no botão <strong>Salvar</strong> (verde, no menu superior) sempre que fizer alterações importantes no seu cenário ou nos cards.
        </p>
      </details>

      <details style={detailsStyle}>
        <summary style={summaryStyle}>📥 Como exportar ou baixar meu mapa?</summary>
        <p style={textStyle}>
          É muito simples! No menu superior direito da ferramenta de edição, clique no botão de <strong>Download</strong> (ícone de uma seta apontando para baixo). A plataforma irá processar seu mapa e baixar automaticamente uma imagem PNG em alta qualidade para você usar em apresentações ou relatórios.
        </p>
      </details>

    </div>
  );
};

export default FAQContent;