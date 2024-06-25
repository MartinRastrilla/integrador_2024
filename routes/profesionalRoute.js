const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/crearPrescripcion', profesionalController.mostrarCrearPrescripcion);
router.post('/crearPrescripcion', profesionalController.crearPrescripcion);

router.get('/userSession', profesionalController.obtenerUserSession);

module.exports = router;