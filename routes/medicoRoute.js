const express = require('express');
const router = express.Router();
const medicoControl = require('../controllers/medicoController');

router.get('/', medicoControl.obtenerMedicos);

router.post('/crear', medicoControl.crearMedico);



module.exports = router;