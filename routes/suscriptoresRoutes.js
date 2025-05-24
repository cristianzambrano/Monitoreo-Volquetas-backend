const express = require('express');
const router = express.Router();
const suscriptoresController = require('../controllers/suscriptoresController');

// Definición de rutas
router.get('/', suscriptoresController.listarSuscriptores);
router.post('/', suscriptoresController.agregarSuscriptor);
router.patch('/desactivar/:chat_id', suscriptoresController.desactivarSuscriptor);
router.patch('/activar/:chat_id', suscriptoresController.activarSuscriptor);
router.post('/alertas', suscriptoresController.enviarMensajeATodos);


module.exports = router;
