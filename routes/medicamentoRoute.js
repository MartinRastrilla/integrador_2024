const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

router.get('/crear', medicamentoController.mostrarCrearMedicamento);
router.get('/familias/:id_categoria', medicamentoController.obtenerFamiliasPorCat);
router.get('/', medicamentoController.mostrarMedicamentos);

router.post('/crearMedicamento', medicamentoController.crearMedicamento);


module.exports = router;