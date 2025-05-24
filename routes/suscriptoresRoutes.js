const express = require('express');
const router = express.Router();
const suscriptoresController = require('../controllers/suscriptoresController');

// Definición de rutas
router.get('/', suscriptoresController.listarSuscriptores);
router.post('/', suscriptoresController.agregarSuscriptor);
router.patch('/desactivar/:chat_id', suscriptoresController.desactivarSuscriptor);

module.exports = router;
