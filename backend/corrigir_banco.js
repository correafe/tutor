// backend/corrigir_banco.js
const db = require('./Model/db'); // Importa a sua configuração existente

async function aplicarCorrecoes() {
  console.log("A iniciar a correção das tabelas...");

  const comandos = [
    // 1. ContactPoint
    "ALTER TABLE contactpoint DROP FOREIGN KEY contactpoint_ibfk_1",
    "ALTER TABLE contactpoint ADD CONSTRAINT contactpoint_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE",

    // 2. Emotion
    "ALTER TABLE emotion DROP FOREIGN KEY emotion_ibfk_1",
    "ALTER TABLE emotion ADD CONSTRAINT emotion_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE",

    // 3. JourneyPhase
    "ALTER TABLE journeyphase DROP FOREIGN KEY journeyphase_ibfk_1",
    "ALTER TABLE journeyphase ADD CONSTRAINT journeyphase_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE",

    // 4. Thought
    "ALTER TABLE thought DROP FOREIGN KEY thought_ibfk_1",
    "ALTER TABLE thought ADD CONSTRAINT thought_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE",

    // 5. UserAction
    "ALTER TABLE useraction DROP FOREIGN KEY useraction_ibfk_1",
    "ALTER TABLE useraction ADD CONSTRAINT useraction_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE",

    // 6. Persona (depende de Scenario)
    "ALTER TABLE persona DROP FOREIGN KEY persona_ibfk_1",
    "ALTER TABLE persona ADD CONSTRAINT persona_ibfk_1 FOREIGN KEY (scenario_id) REFERENCES scenario (scenario_id) ON DELETE CASCADE",

    // 7. Scenario
    "ALTER TABLE scenario DROP FOREIGN KEY scenario_ibfk_1",
    "ALTER TABLE scenario ADD CONSTRAINT scenario_ibfk_1 FOREIGN KEY (journeyMap_id) REFERENCES journeymap (journeyMap_id) ON DELETE CASCADE"
  ];

  const connection = await db.getConnection();

  try {
    for (const sql of comandos) {
      try {
        await connection.query(sql);
        console.log(`Sucesso: ${sql.split(' ')[2]} em ${sql.split(' ')[3]}`); // Mostra qual tabela foi alterada
      } catch (erro) {
        // Ignora erro se a chave já não existir (caso corra o script duas vezes)
        if (erro.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
          console.log(`Nota: Chave já removida ou inexistente em comando anterior.`);
        } else {
          console.error(`Erro ao executar: ${sql}`);
          console.error(erro.message);
        }
      }
    }
    console.log("---------------------------------------------------");
    console.log("Correção concluída! Agora pode excluir qualquer mapa.");
  } finally {
    connection.release();
    process.exit();
  }
}

aplicarCorrecoes();