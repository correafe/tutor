import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext'; // <-- Importe o Contexto

const ProtectedRoute = ({ children }) => {
  const { id_mapa } = useParams();
  
  // Pegamos o user e o loading diretamente do Contexto
  const { user, loading: authLoading } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      // Só faz a verificação se o Firebase já terminou de carregar (authLoading === false)
      if (authLoading) return; 

      if (user && user.uid) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/journeyMap/${id_mapa}/owner`);
          const owner = response.data;
          if (owner.uid === user.uid) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } catch (error) {
          console.error('Error verifying map ownership:', error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    };

    checkPermission();
  }, [id_mapa, user, authLoading]); // Adicionamos o authLoading como dependência

  // Se o Firebase está pensando OU se nossa API está checando permissão, mostra Loading
  if (authLoading || isAuthorized === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Verificando permissões...</h2>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;