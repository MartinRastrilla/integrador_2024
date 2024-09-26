const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');
const {authenticateToken} = require('../config/auth');

router.get('/crear', authenticateToken,medicamentoController.mostrarCrearMedicamento);
router.get('/familias/:id_categoria', authenticateToken,medicamentoController.obtenerFamiliasPorCat);
router.get('/', authenticateToken,medicamentoController.mostrarMedicamentos);
router.post('/crearMedicamento', authenticateToken,medicamentoController.crearMedicamento);


module.exports = router;