import React, { useContext, useEffect, useState } from 'react';
import { Trophy, Medal } from 'lucide-react'; // Removi o import do X
import { ScoreContext } from '../contexts/ScoreContext';
import './RankingModal.css';
import Popup from './Popup';

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
        const response = await fetch('https://tutor-api-jem.duckdns.org/ranking');
        const data = await response.json();
        
        const formattedRanking = data.map(user => ({
          name: user.display_name,
          score: user.score,
          photo: user.photo_url,
          isCurrentUser: usuario?.uid === user.firebase_uid 
        }));

        const userInRanking = formattedRanking.find(u => u.isCurrentUser);
        if (!userInRanking && usuario) {
            formattedRanking.push({
                name: usuario?.displayName || "Você",
                score: score,
                photo: usuario?.providerData?.[0]?.photoURL || "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
                isCurrentUser: true
            });
        }

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
    // Colocamos o Popup na raiz. Ele já fará a tela escura e a janela central!
    <Popup trigger={true} setTrigger={onClose}>
      <div className="ranking-content" style={{ padding: '10px 20px', width: '100%', maxWidth: '500px' }}>
        
        <div className="ranking-header" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={32} color="#FFD700" />
            <h2 style={{ margin: 0 }}>Ranking</h2>
          </div>
          {/* O Botão de fechar customizado foi REMOVIDO daqui! */}
        </div>

        <p className="ranking-subtitle" style={{ textAlign: 'center', marginBottom: '20px' }}>
          Veja quem são os melhores mapeadores do JEM!
        </p>

        {loading ? (
          <p style={{textAlign: 'center', padding: '20px'}}>Carregando ranking...</p>
        ) : (
          <div className="ranking-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
    </Popup>
  );
};

export default RankingModal;