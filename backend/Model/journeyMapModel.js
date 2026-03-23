// journeyMapModel.js
const db = require('./db');

class JourneyMapModel {
  createNewMap(userId, mapName) {
    return db.execute("INSERT INTO journeymap (map_name, user_id) VALUES (?, ?)", [mapName, userId])
      .then(() => {
        return this.getLastInsertedMap(userId);
      })
      .catch((error) => {
        console.error("Error creating new journey map:", error);
        throw error;
      });
  }

  getLastInsertedMap(userId) {
    return db.query("SELECT journeymap_id, map_name FROM journeymap WHERE user_id = ? ORDER BY journeymap_id DESC LIMIT 1", [userId])
      .then(([rows]) => {
        if (rows.length > 0) {
          return { id: rows[0].journeymap_id, name: rows[0].map_name };
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting last inserted map:", error);
        throw error;
      });
  }

  getUserMaps(userId) {
    return db.query("SELECT journeymap_id, map_name FROM journeymap WHERE user_id = ?", [userId])
      .then(([rows]) => {
        const maps = rows.map(row => ({ id: row.journeymap_id, name: row.map_name }));
        return maps;
      })
      .catch((error) => {
        console.error("Error getting user maps:", error);
        throw error;
      });
  }

  async updateMapName(journeymapId, newName) {
    try {
      const result = await db.execute("UPDATE journeymap SET map_name = ? WHERE journeymap_id = ?", [newName, journeymapId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating map name:", error);
      throw error;
    }
  }

    async deleteMap(journeymapId) {
      // Obtemos uma conexão específica para garantir que tudo ocorra numa transação
      const connection = await db.getConnection(); 
      try {
        // Inicia a transação (tudo ou nada)
        await connection.beginTransaction();

        // 1. Apaga os cartões/elementos vinculados ao mapa
        await connection.execute("DELETE FROM contactpoint WHERE journeyMap_id = ?", [journeymapId]);
        await connection.execute("DELETE FROM emotion WHERE journeyMap_id = ?", [journeymapId]);
        await connection.execute("DELETE FROM thought WHERE journeyMap_id = ?", [journeymapId]);
        await connection.execute("DELETE FROM useraction WHERE journeyMap_id = ?", [journeymapId]);
        
        // 2. Apaga o Cenário vinculado a este mapa
        await connection.execute("DELETE FROM scenario WHERE journeymap_id = ?", [journeymapId]);

        // 3. Apaga as Fases vinculadas a este mapa
        await connection.execute("DELETE FROM journeyPhase WHERE journeymap_id = ?", [journeymapId]);

        // 4. Finalmente, apaga o Mapa
        const [result] = await connection.execute("DELETE FROM journeymap WHERE journeymap_id = ?", [journeymapId]);

        // Confirma as alterações
        await connection.commit();
        
        return result.affectedRows > 0;
      } catch (error) {
        // Se der erro, desfaz tudo o que tentou apagar
        await connection.rollback();
        console.error("Error deleting user maps:", error);
        throw error;
      } finally {
        // Libera a conexão de volta para o pool
        connection.release();
      }
    }

  getMapOwner(journeymapId) {
    return db.query("SELECT user_id as uid FROM journeymap WHERE journeymap_id = ?", [journeymapId])
      .then(([rows]) => {
        if (rows.length > 0) {
          return { uid: rows[0].uid };
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error getting map owner:", error);
        throw error;
      });
  }
}

module.exports = JourneyMapModel;
