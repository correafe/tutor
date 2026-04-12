const db = require('./db');

class JourneyPhaseModel {
  async getAllItemsByJourneyMapId(journeyMapId) {
    try {
      const [rows] = await db.query("SELECT * FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId]);
      return rows;
    } catch (error) {
      console.error("Error fetching journeyphases by journeyMapId:", error);
      throw error;
    }
  }

  async getAllItems() {
    try {
      const [rows] = await db.query("SELECT * FROM journeyphase");
      return rows;
    } catch (error) {
      console.error("Error fetching journeyphases:", error);
      throw error;
    }
  }

  async insertJourneyPhase(data) {
    if (data.posX === undefined) {
      return false;
    }

    const { posX, journeyMap_id, linePos, length, description, emojiTag } = data;
    
    try {
      const [result] = await db.execute(
        "INSERT INTO journeyphase (posX, journeyMap_id, linePos, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
        [posX, journeyMap_id, linePos, length, description, emojiTag]
      );
      // Retorna true se a inserção ocorreu com sucesso
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error inserting journeyphase:", error);
      throw error;
    }
  }
  
  async updateJourneyPhase(data) {
    // Correção: Aceita os dois formatos para evitar undefined
    const journeyphase_id = data.journeyPhase_id !== undefined ? data.journeyPhase_id : data.journeyphase_id;
    const length = data.length !== undefined ? data.length : data.width;
    const posX = data.posX;
    const description = data.description;
  
    // Proteção: se faltar algo, aborta a requisição em vez de derrubar (crashar) o servidor
    if (journeyphase_id === undefined || posX === undefined || description === undefined || length === undefined) {
      console.error("Erro: Dados incompletos para o update:", data);
      throw new Error("Dados incompletos para updateJourneyPhase");
    }

    try {
      const [result] = await db.execute(
        "UPDATE journeyphase SET posX = ?, description = ?, length = ? WHERE journeyphase_id = ?", 
        [posX, description, length, journeyphase_id]
      );
      // Aqui usamos a mesma correção do Scenario: valida se realmente atualizou a linha!
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating journeyphase:", error);
      throw error;
    }
  }

  async deleteJourneyPhase(journeyphase_id) {
    try {
      const [result] = await db.execute("DELETE FROM journeyphase WHERE journeyphase_id = ?", [journeyphase_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting journeyphase:", error);
      throw error;
    }
  }

  async getLastInsertedId() {
    try {
      const [rows] = await db.query("SELECT LAST_INSERT_ID() as last_inserted_id");
      return rows[0].last_inserted_id;
    } catch (error) {
      console.error("Error getting last inserted ID:", error);
      throw error;
    }
  }

  async deleteByJourneyMapId(journeyMapId) {
    try {
      const [result] = await db.execute("DELETE FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting journeyphase:", error);
      throw error;
    }
  }
}

module.exports = JourneyPhaseModel;