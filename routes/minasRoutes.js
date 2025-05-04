
const express = require('express');
const router = express.Router();
const minasController = require('../controllers/minasController');

router.get('/', minasController.getAllMinas);

module.exports = router;

