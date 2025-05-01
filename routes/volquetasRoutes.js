const express = require('express');
const router = express.Router();
const volquetasController = require('../controllers/volquetasController');

router.get('/', volquetasController.getAllVolquetas);
router.post('/', volquetasController.addVolqueta);
router.put('/:id', volquetasController.updateVolqueta);
router.delete('/:id', volquetasController.deleteVolqueta);

module.exports = router;
