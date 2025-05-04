const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const volquetasRoutes = require('./routes/volquetasRoutes');
const choferesRoutes = require('./routes/choferesRoutes');
const rutasActivasRoutes = require('./routes/rutasActivasRoutes');
const minasRoutes = require('./routes/minasRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Usamos las rutas
app.use('/api/volquetas', volquetasRoutes);
app.use('/api/choferes', choferesRoutes);
app.use('/api/rutas-activas', rutasActivasRoutes);
app.use('/api/minas', minasRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});
