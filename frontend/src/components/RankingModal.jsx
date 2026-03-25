import React, { useContext, useEffect, useState } from 'react';
import { X, Trophy, Medal } from 'lucide-react';
import { ScoreContext } from '../contexts/ScoreContext';
import './RankingModal.css';

import teste1 from '../assets/teste1.png';
import teste2 from '../assets/teste2.png';
import teste3 from '../assets/teste3.png';
import teste4 from '../assets/teste4.png';
import teste5 from '../assets/teste5.png';

const RankingModal = ({ onClose }) => {
  const { score } = useContext(ScoreContext);
  const usuario = JSON.parse(localStorage.getItem('user'));
  const [rankingList, setRankingList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para pegar os dados do rank
  const getRankInfo = (currentScore) => {
    if (currentScore < 100) return { title: "Aprendiz", icon: "🥉", frameUrl: teste1 };
    if (currentScore < 300) return { title: "Explorador", icon: "🥈", frameUrl: teste2 };
    if (currentScore < 500) return { title: "Mapeador", icon: "🥇", frameUrl: teste3 };
    if (currentScore < 700) return { title: "Especialista", icon: "🔮", frameUrl: teste4 };
    return { title: "Mestre", icon: "👑", frameUrl: teste5 };
  };

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Substitua a URL base pela da sua API na Vercel, se necessário
        // ex: const apiUrl = import.meta.env.VITE_API_URL + '/ranking';
        const response = await fetch('https://tutor-api-jem.duckdns.org/ranking');
        const data = await response.json();
        
        // Formata os dados vindos do banco para o padrão do componente
        const formattedRanking = data.map(user => ({
          name: user.display_name,
          score: user.score,
          photo: user.photo_url,
          isCurrentUser: usuario?.uid === user.firebase_uid // Verifica se é o usuário logado
        }));

        // Adiciona o usuário logado caso ele ainda não esteja no ranking (com pontuação 0)
        const userInRanking = formattedRanking.find(u => u.isCurrentUser);
        if (!userInRanking && usuario) {
            formattedRanking.push({
                name: usuario?.displayName || "Você",
                score: score, // Pontuação local atual
                photo: usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
                isCurrentUser: true
            });
        }

        // Garante que a lista fique ordenada do maior para o menor
        const sortedUsers = formattedRanking.sort((a, b) => b.score - a.score);
        setRankingList(sortedUsers);
      } catch (error) {
        console.error("Erro ao carregar o ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [score, usuario]);

  return (
    <div className="ranking-overlay">
      <div className="ranking-box">
        <div className="ranking-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={32} color="#FFD700" />
            <h2>Ranking</h2>
          </div>
          <button className="close-btn-icon" onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        <p className="ranking-subtitle">Veja quem são os melhores mapeadores do JEM!</p>

        {loading ? (
          <p style={{textAlign: 'center', padding: '20px'}}>Carregando ranking...</p>
        ) : (
          <div className="ranking-list">
            {rankingList.map((user, index) => {
              const userRank = getRankInfo(user.score);
              return (
                <div key={index} className={`ranking-item ${user.isCurrentUser ? 'current-user-highlight' : ''}`}>
                  <div className="ranking-position">
                    {index === 0 ? <Medal size={28} color="#FFD700" /> : 
                     index === 1 ? <Medal size={28} color="#C0C0C0" /> : 
                     index === 2 ? <Medal size={28} color="#CD7F32" /> : 
                     `#${index + 1}`}
                  </div>
                  
                  <div className="ranking-avatar-wrapper">
                    <img src={user.photo} alt="Avatar" className="ranking-avatar" />
                    <img src={userRank.frameUrl} alt="Moldura" className="ranking-frame" />
                  </div>

                  <div className="ranking-info">
                    <h3 className="ranking-name">{user.name} {user.isCurrentUser && "(Você)"}</h3>
                    <span className="ranking-badge">{userRank.icon} {userRank.title}</span>
                  </div>

                  <div className="ranking-score">
                    <span>{user.score}</span> pts
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingModal;