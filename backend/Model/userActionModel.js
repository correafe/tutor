const db = require('./db');

class UserActionModel {
  getAllItemsByJourneyMapId(journeyMapId) {
    return db.query("SELECT * FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
      .then(([rows]) => {
        return rows;
      })
      .catch((error) => {
        console.error("Error fetching useractions by journeyMapId:", error);
        throw error;
      });
  }

  getAllItems() {
    return db.query("SELECT * FROM useraction")
      .then(([rows]) => {
        return rows;
      })
      .catch((error) => {
        console.error("Error fetching useraction:", error);
        throw error;
      });
  }

  insertUserAction(data) {
    if (data.posX !== undefined) {
      const { posX, journeyMap_id, linePos, length, description, emojiTag } = data;
      return db.execute("INSERT INTO useraction (posX, journeyMap_id, linePos, length, description, emojiTag) VALUES (?, ?, ?, ?, ?, ?)",
      [posX, journeyMap_id, linePos, length, description, emojiTag])
        .then(() => true)
        .catch((error) => {
          console.error("Error inserting useraction:", error);
          throw error;
        });
    } else {
      return Promise.resolve(false);
    }
  }
  

  updateUserAction(data) {
    const { useraction_id, posX, description, width } = data;
  
    return db.execute("UPDATE useraction SET posX = ?, description = ?, length = ? WHERE useraction_id = ?", [posX, description, width, useraction_id])
      .then(() => true)
      .catch((error) => {
        console.error("Error updating useraction:", error);
        throw error;
      });
  }
  
  deleteUserAction(useraction_id) {
    return db.execute("DELETE FROM useraction WHERE useraction_id = ?", [useraction_id])
      .then(() => true)
      .catch((error) => {
        console.error("Error deleting useraction:", error);
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

  deleteUserActionsByJourneyMapId(journeyMapId) {
    return db.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeyMapId])
    .then(() => true)
    .catch((error) => {
      console.error("Error deleting useraction:", error);
      throw error;
    });
  }
  
}

module.exports = UserActionModel;
