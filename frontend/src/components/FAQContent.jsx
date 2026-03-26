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

  return (
    <div style={{ textAlign: "left", padding: "10px" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
        Perguntas Frequentes (FAQ)
      </h2>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>O que é um Mapa de Jornada?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          É uma representação visual que conta a história da experiência do cliente com seu produto ou serviço, desde o primeiro contato até o pós-venda. Ele ajuda a identificar pontos de atrito, oportunidades de melhoria e a entender as emoções do usuário ao longo do caminho.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Como adiciono novos cards no mapa?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          Passe o mouse sobre as faixas cinzas vazias do seu mapa e clique no botão verde <strong>"+"</strong> que aparecerá para criar um novo card naquela posição. Para a linha de "Emoções", ao clicar no botão, um menu se abrirá para você escolher o emoji que melhor representa o momento.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>O salvamento do meu mapa é automático?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          <strong>Não.</strong> Para garantir que você tenha controle total sobre as edições e não perca informações por engano, o salvamento é manual. Recomendamos clicar no botão <strong>Salvar</strong> (verde, no menu superior) sempre que fizer alterações importantes no seu cenário ou nos cards.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Como exportar ou baixar meu mapa?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
          É muito simples! No menu superior direito da ferramenta de edição, clique no botão de <strong>Download</strong> (ícone de uma seta apontando para baixo). A plataforma irá processar seu mapa e baixar automaticamente uma imagem PNG em alta qualidade para você usar em apresentações ou relatórios.
        </p>
      </details>

      <details style={{ marginBottom: "15px", cursor: "pointer" }}>
        <summary style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>Como funciona o sistema de pontos e ranking?</summary>
        <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5", color: "#555" }}>
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

    </div>
  );
};

export default FAQContent;