require('dotenv').config();
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN;

router.post('/', async (req, res) => {
  const data = req.body;

  if (data.message){

    const chat = data.message.chat;
    const chat_id = chat.id;
    const nombre = chat.first_name;
    const username = chat.username || null;
    const tipo_chat = chat.type;

    if (data.message.text === '/iniciar') {
        try {
          const [rows] = await pool.query(
            `INSERT INTO suscriptores_bot (chat_id, nombre, username, tipo_chat)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE activo = TRUE, fecha_suscripcion = CURRENT_TIMESTAMP`,
            [chat_id, nombre, username, tipo_chat]
          );

          await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id,
            text: `✅ ¡Hola ${nombre}! Te has suscrito correctamente a las alertas de ControlDeVolquetaSD_AlertBot.`,
          });

          res.status(200).send('Suscriptor agregado');
        } catch (error) {
          console.error('Error al insertar en la base:', error.message);
          res.status(500).send('Error en servidor');
        }
   }else if (data.message.text === '/salir') {
      try {
          await pool.query(`UPDATE suscriptores_bot SET activo = FALSE WHERE chat_id = ?`, [chat_id]);

          await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id,
            text: `🛑 Te has desuscrito de las alertas de ControlDeVolquetaSD_AlertBot.`,
          });

          return res.status(200).send('Suscriptor desactivado');

      } catch (error) {
          console.error('Error al insertar en la base:', error.message);
          res.status(500).send('Error en servidor');
      }
  } else {
      res.status(200).send('OK');
  }
}else{
    res.status(200).send('OK');
  }
});

module.exports = router;
