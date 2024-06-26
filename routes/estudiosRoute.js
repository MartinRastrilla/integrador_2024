const express = require('express');
const router = express.Router();
const estudioControl = require('../controllers/estudioController');
const authenticateToken = require('../config/auth');

router.get('/', authenticateToken,estudioControl.mostrarEstudio);
router.post('/crearEstudio', authenticateToken,estudioControl.crearEstudio);


module.exports = router;
