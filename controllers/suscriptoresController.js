const pool = require('../config/db');

exports.listarSuscriptores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM suscriptores_bot ORDER BY fecha_suscripcion DESC');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al listar:', error.message);
    res.status(500).json({ error: 'Error al listar suscriptores' });
  }
};

// POST: agregar o actualizar suscriptor
exports.agregarSuscriptor = async (req, res) => {
  const { chat_id, nombre, username, tipo_chat } = req.body;

  if (!chat_id || !nombre || !tipo_chat) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    await pool.query(
      `INSERT INTO suscriptores_bot (chat_id, nombre, username, tipo_chat)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE activo = TRUE, fecha_suscripcion = CURRENT_TIMESTAMP`,
      [chat_id, nombre, username || null, tipo_chat]
    );
    res.status(201).json({ mensaje: '✅ Suscriptor guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al insertar:', error.message);
    res.status(500).json({ error: 'Error al guardar suscriptor' });
  }
};

// PATCH: desactivar suscriptor
exports.desactivarSuscriptor = async (req, res) => {
  const { chat_id } = req.params;

  try {
    await pool.query(
      `UPDATE suscriptores_bot SET activo = FALSE WHERE chat_id = ?`,
      [chat_id]
    );
    res.json({ mensaje: '🔕 Suscriptor desactivado' });
  } catch (error) {
    console.error('❌ Error al desactivar:', error.message);
    res.status(500).json({ error: 'Error al desactivar suscriptor' });
  }
};
