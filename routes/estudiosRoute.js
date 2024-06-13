const express = require('express');
const router = express.Router();
const estudioControl = require('../controllers/estudioController');

router.get('/', estudioControl.mostrarEstudio);
router.post('/crearEstudio', estudioControl.crearEstudio);


module.exports = router;
