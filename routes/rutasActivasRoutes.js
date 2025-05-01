const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasActivasController');

router.get('/', rutasController.getAllRutasActivas);
router.post('/', rutasController.addRutaActiva);
router.put('/:id', rutasController.updateRutaActiva);
router.delete('/:id', rutasController.deleteRutaActiva);

module.exports = router;
