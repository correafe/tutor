import React, { useContext } from 'react';
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

  // Função para pegar os dados do rank
  const getRankInfo = (currentScore) => {
    if (currentScore < 100) return { title: "Aprendiz", icon: "🥉", frameUrl: teste1 };
    if (currentScore < 300) return { title: "Explorador", icon: "🥈", frameUrl: teste2 };
    if (currentScore < 500) return { title: "Mapeador", icon: "🥇", frameUrl: teste3 };
    if (currentScore < 700) return { title: "Especialista", icon: "🔮", frameUrl: teste4 };
    return { title: "Mestre", icon: "👑", frameUrl: teste5 };
  };

  // Usuários falsos para demonstração + Usuário atual real
  const mockUsers = [
    { name: "Maria Silva", score: 850, photo: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    { name: "João Pedro", score: 420, photo: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    { name: "Ana Souza", score: 210, photo: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    { name: "Carlos Edu", score: 50, photo: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    { 
      name: usuario?.displayName || "Você", 
      score: score, 
      photo: usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png", 
      isCurrentUser: true 
    },
  ];

  // Ordena do maior pro menor
  const sortedUsers = mockUsers.sort((a, b) => b.score - a.score);

  return (
    <div className="ranking-overlay">
      <div className="ranking-box">
        <div className="ranking-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={32} color="#FFD700" />
            <h2>Ranking Global</h2>
          </div>
          <button className="close-btn-icon" onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        <p className="ranking-subtitle">Veja quem são os melhores mapeadores do JEM!</p>

        <div className="ranking-list">
          {sortedUsers.map((user, index) => {
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
      </div>
    </div>
  );
};

export default RankingModal;