const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/crearPrescripcion', profesionalController.mostrarCrearPrescripcion);
router.post('/crearPrescripcion', profesionalController.crearPrescripcion);

module.exports = router;