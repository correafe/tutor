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
  

  updateJourneyPhase(data) {
    const { journeyphase_id, posX, description, width } = data;
  
    return db.execute("UPDATE journeyphase SET posX = ?, description = ?, length = ? WHERE journeyphase_id = ?", [posX, description, width, journeyphase_id ])
      .then(() => true)
      .catch((error) => {
        console.error("Error updating journeyphase:", error);
        throw error;
      });
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
