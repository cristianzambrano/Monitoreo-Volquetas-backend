const db = require('../config/db');

// Obtener todas las rutas activas con placa, chofer, nombre de ruta y fechas
exports.getAllRutasActivas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ra.id,
        v.placa AS volqueta_placa,
        c.nombre AS chofer_nombre,
        ra.nombre AS ruta_nombre,
        v.dispositivo_id,
        ra.fecha_inicio,
        ra.fecha_fin,
        ra.id_volqueta,
        ra.id_chofer,
        ST_AsText(ra.origen) AS origen,
        ST_AsText(ra.destino) AS destino,
        ST_AsText(ra.trayecto) AS trayecto,
        ra.estado,
        ra.fecha_asignacion
      FROM rutas_activas ra
      INNER JOIN volquetas v ON ra.id_volqueta = v.id
      INNER JOIN choferes c ON ra.id_chofer = c.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener rutas activas:', error);
    res.status(500).json({ success: false, message: 'Error al obtener las rutas activas: ' + error.message });
  }
};

// Agregar nueva ruta activa
exports.addRutaActiva = async (req, res) => {
  const { id_volqueta, id_chofer, nombre, fecha_inicio, fecha_fin, origen_lat, origen_lon, destino_lat, destino_lon, trayecto } = req.body;
  try {
    const query = `
      INSERT INTO rutas_activas 
      (id_volqueta, id_chofer, nombre, fecha_inicio, fecha_fin, origen, destino, trayecto, estado)
      VALUES (?, ?, ?, ?, ?, ST_GeomFromText(?), ST_GeomFromText(?), ST_GeomFromText(?), 'activo')
    `;
    const values = [
      id_volqueta,
      id_chofer,
      nombre,
      fecha_inicio,
      fecha_fin,
      `POINT(${origen_lon} ${origen_lat})`,
      `POINT(${destino_lon} ${destino_lat})`,
      `LINESTRING(${trayecto})`
    ];
    await db.query(query, values);
    res.json({ success: true, message: 'Ruta activa registrada correctamente' });
  } catch (error) {
    console.error('Error al agregar ruta activa:', error);
    res.status(500).json({ success: false, message: 'Error al registrar la ruta activa: ' + error.message });
  }
};

exports.updateRutaActiva = async (req, res) => {
  const { id } = req.params;
  const {
    id_volqueta,
    id_chofer,
    nombre,
    fecha_inicio,
    fecha_fin,
    origen_lat,
    origen_lon,
    destino_lat,
    destino_lon,
    trayecto,
    estado
  } = req.body;

  try {
    let fields = [];
    let values = [];

    if (id_volqueta !== undefined) {
      fields.push('id_volqueta = ?');
      values.push(id_volqueta);
    }
    if (id_chofer !== undefined) {
      fields.push('id_chofer = ?');
      values.push(id_chofer);
    }
    if (nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(nombre);
    }
    if (fecha_inicio !== undefined) {
      fields.push('fecha_inicio = ?');
      values.push(fecha_inicio);
    }
    if (fecha_fin !== undefined) {
      fields.push('fecha_fin = ?');
      values.push(fecha_fin);
    }
    if (origen_lat !== undefined && origen_lon !== undefined) {
      fields.push('origen = ST_GeomFromText(?)');
      values.push(`POINT(${origen_lon} ${origen_lat})`);
    }
    if (destino_lat !== undefined && destino_lon !== undefined) {
      fields.push('destino = ST_GeomFromText(?)');
      values.push(`POINT(${destino_lon} ${destino_lat})`);
    }
    if (trayecto !== undefined) {
      fields.push('trayecto = ST_GeomFromText(?)');
      values.push(`LINESTRING(${trayecto})`);
    }
    if (estado !== undefined) {
      fields.push('estado = ?');
      values.push(estado);
    }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'No se enviaron campos para actualizar' });
    }

    const query = `
      UPDATE rutas_activas
      SET ${fields.join(', ')}
      WHERE id = ?
    `;

    values.push(id); 

    await db.query(query, values);

    res.json({ success: true, message: 'Ruta activa actualizada correctamente' });

  } catch (error) {
    console.error('Error al actualizar ruta activa:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar la ruta activa: ' + error.message });
  }
};


// Eliminar ruta activa
exports.deleteRutaActiva = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM rutas_activas WHERE id = ?', [id]);
    res.json({ success: true, message: 'Ruta activa eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar ruta activa:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar la ruta activa: ' + error.message });
  }
};
