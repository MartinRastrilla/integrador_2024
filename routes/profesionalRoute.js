const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');
const {authenticateToken} = require('../config/auth');

router.get('/crearPrescripcion', authenticateToken,profesionalController.mostrarCrearPrescripcion);
router.post('/crearPrescripcion', authenticateToken,profesionalController.crearPrescripcion);
router.get('/userSession', profesionalController.obtenerUserSession);

module.exports = router;