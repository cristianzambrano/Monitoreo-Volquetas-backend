const db = require('../config/db');

exports.getAllVolquetas = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM volquetas');
  res.json(rows);
};

exports.addVolqueta = async (req, res) => {
  const { placa, dispositivo_id, estado } = req.body;
  try {
    await db.query('INSERT INTO volquetas (placa, dispositivo_id, estado) VALUES (?, ?, ?)', [placa, dispositivo_id, estado]);
    res.json({ success: true, message: 'Volqueta agregada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al agregar la volqueta' });
  }
};

exports.updateVolqueta = async (req, res) => {
  const { id } = req.params;
  const { placa, dispositivo_id, estado } = req.body;
  try {
    await db.query('UPDATE volquetas SET placa = ?, dispositivo_id = ?, estado = ? WHERE id = ?', [placa, dispositivo_id, estado, id]);
    res.json({ success: true, message: 'Volqueta actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar la volqueta' });
  }
};


exports.deleteVolqueta = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM volquetas WHERE id = ?', [id]);
    res.json({ success: true, message: 'Volqueta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar la volqueta' });
  }
};

