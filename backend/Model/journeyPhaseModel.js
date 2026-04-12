const db = require('./db');

class JourneyPhaseModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => {
        return rows;
      })
      .catch((error) => {
        console.error("Error fetching journeyphases by journeyMapId:", error);
        throw error;
      });
  }

  getAllItems() {
    return db.query("SELECT * FROM journeyphase")
      .then(([rows]) => {
        return rows;
      })
      .catch((error) => {
        console.error("Error fetching journeyphases:", error);
        throw error;
      });
  }

  insertJourneyPhase(data) {
    if (data.posX !== undefined) {
      const { posX, journeyMap_id, linePos, length, description, emojiTag } = data;
      return db.execute("INSERT INTO journeyphase (posX, journeyMap_id, linePos, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [posX, journeyMap_id, linePos, length, description, emojiTag])
        .then(() => true)
        .catch((error) => {
          console.error("Error inserting journeyphase:", error);
          throw error;
        });
    } else {
      return Promise.resolve(false);
    }
  }
  
  // updateJourneyPhase(data) {
  //   // Correção: Aceita os dois formatos para evitar undefined
  //   const journeyphase_id = data.journeyPhase_id !== undefined ? data.journeyPhase_id : data.journeyphase_id;
  //   const length = data.length !== undefined ? data.length : data.width;
  //   const posX = data.posX;
  //   const description = data.description;
  
  //   // Proteção: se faltar algo, aborta a requisição em vez de derrubar (crashar) o servidor
  //   if (journeyphase_id === undefined || posX === undefined || description === undefined || length === undefined) {
  //     console.error("Erro: Dados incompletos para o update:", data);
  //     return Promise.reject(new Error("Dados incompletos para updateJourneyPhase"));
  //   }

  //   return db.execute("UPDATE journeyphase SET posX = ?, description = ?, length = ? WHERE journeyphase_id = ?", [posX, description, length, journeyphase_id ])
  //     .then(() => true)
  //     .catch((error) => {
  //       console.error("Error updating journeyphase:", error);
  //       throw error;
  //     });
  // }

  updateJourneyPhase(data) {
  const journeyphase_id = data.journeyPhase_id || data.journeyphase_id;
  const length = data.length || data.width || 230;
  const posX = data.posX;
  const description = data.description || ""; // Fallback para string vazia se for undefined

  if (journeyphase_id === undefined || posX === undefined) {
    return Promise.reject(new Error("ID ou Posição ausentes"));
  }

  return db.execute(
    "UPDATE journeyphase SET posX = ?, description = ?, length = ? WHERE journeyphase_id = ?", 
    [posX, description, length, journeyphase_id]
  );
}

  deleteJourneyPhase(journeyphase_id) {
    return db.execute("DELETE FROM journeyphase WHERE journeyphase_id = ?", [journeyphase_id])
      .then(() => true)
      .catch((error) => {
        console.error("Error deleting journeyphase:", error);
        throw error;
      });
  }

  getLastInsertedId() {
    return db.query("SELECT LAST_INSERT_ID() as last_inserted_id")
      .then(([rows]) => {
        return rows[0].last_inserted_id;
      })
      .catch((error) => {
        console.error("Error getting last inserted ID:", error);
        throw error;
      });
  }

  deleteByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM journeyphase WHERE journeyMap_id = ?", [journeyMapId])
    .then(() => true)
    .catch((error) => {
      console.error("Error deleting journeyphase:", error);
      throw error;
    });
  }
}

module.exports = JourneyPhaseModel;
