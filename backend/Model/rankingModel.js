const pool = require('./db');

const getTopScores = async () => {
  // Retorna os 50 melhores usuários ordenados pela pontuação
  const [rows] = await pool.query(
    'SELECT firebase_uid, display_name, photo_url, score FROM user_scores ORDER BY score DESC LIMIT 50'
  );
  return rows;
};

const upsertUserScore = async (firebase_uid, display_name, photo_url, score) => {
  // Insere o usuário ou atualiza a pontuação e os dados caso ele já exista
  const query = `
    INSERT INTO user_scores (firebase_uid, display_name, photo_url, score)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      display_name = VALUES(display_name),
      photo_url = VALUES(photo_url),
      score = VALUES(score)
  `;
  const [result] = await pool.query(query, [firebase_uid, display_name, photo_url, score]);
  return result;
};

module.exports = {
  getTopScores,
  upsertUserScore
};