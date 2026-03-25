const rankingModel = require('../Model/rankingModel');

const getGlobalRanking = async (req, res) => {
  try {
    const ranking = await rankingModel.getTopScores();
    res.status(200).json(ranking);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res.status(500).json({ error: 'Erro ao buscar ranking' });
  }
};

const updateUserScore = async (req, res) => {
  const { firebase_uid, display_name, photo_url, score } = req.body;

  if (!firebase_uid) {
    return res.status(400).json({ error: 'firebase_uid é obrigatório' });
  }

  try {
    await rankingModel.upsertUserScore(firebase_uid, display_name, photo_url, score);
    res.status(200).json({ message: 'Pontuação atualizada com sucesso' });
  } catch (error) {
    console.error("Erro ao atualizar pontuação:", error);
    res.status(500).json({ error: 'Erro ao atualizar pontuação do usuário' });
  }
};

module.exports = {
  getGlobalRanking,
  updateUserScore
};