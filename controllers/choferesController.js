const db = require('../config/db');

// Obtener todos los choferes
exports.getAllChoferes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM choferes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener los choferes' });
  }
};

// Agregar un nuevo chofer
exports.addChofer = async (req, res) => {
  const { nombre, cedula, telefono } = req.body;
  try {
    await db.query('INSERT INTO choferes (nombre, cedula, telefono) VALUES (?, ?, ?)', [nombre, cedula, telefono]);
    res.json({ success: true, message: 'Chofer agregado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al agregar el chofer' });
  }
};

// Actualizar un chofer
exports.updateChofer = async (req, res) => {
  const { id } = req.params;
  const { nombre, cedula, telefono } = req.body;
  try {
    await db.query(
      'UPDATE choferes SET nombre = ?, cedula = ?, telefono = ? WHERE id = ?',
      [nombre, cedula, telefono, id]
    );
    res.json({ success: true, message: 'Chofer actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar el chofer' });
  }
};

// Eliminar un chofer
exports.deleteChofer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM choferes WHERE id = ?', [id]);
    res.json({ success: true, message: 'Chofer eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el chofer' });
  }
};
