const express = require('express');
const router = express.Router();
const choferesController = require('../controllers/choferesController');

router.get('/', choferesController.getAllChoferes);
router.post('/', choferesController.addChofer);
router.put('/:id', choferesController.updateChofer);
router.delete('/:id', choferesController.deleteChofer);

module.exports = router;
