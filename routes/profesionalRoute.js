const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/crearPrescripcion', profesionalController.mostrarCrearPrescripcion);

module.exports = router;