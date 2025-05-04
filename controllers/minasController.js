const db = require('../config/db');

exports.getAllMinas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        nombre,
        ST_AsGeoJSON(ubicacion) AS ubicacion,
        poligono_geojson,
        imagen
      FROM minas
    `);

    const minas = rows.map(row => {
      const ubicacion = row.ubicacion;
      const [lon, lat] = ubicacion.coordinates;

      return {
        id: row.id,
        nombre: row.nombre,
        ubicacion: {
          type: 'Point',
          coordinates: [lat, lon]  
        },
        poligono: row.poligono_geojson,
        imagen: row.imagen
      };
    });

    res.json(minas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener las minas' });
  }
};
