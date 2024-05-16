const express = require('express');
const router = express.Router();
const medicamentoControl = require('../controllers/medicamentoController');

router.post('/crear', medicamentoControl.crearMedicamento);

module.exports = router;