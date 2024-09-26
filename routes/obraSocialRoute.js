const express = require('express');
const router = express.Router();
const obraSocialControl = require('../controllers/obraSocialController');
const authenticateToken = require('../config/auth');

router.get('/', authenticateToken,obraSocialControl.mostrarObraSocial);
router.get('/crear', authenticateToken,obraSocialControl.mostrarCrearOS);
router.get('/editar/:id_os', authenticateToken,obraSocialControl.mostrarActualizarOS);
router.get('/verificar/:nombre_os', authenticateToken,obraSocialControl.verificarNombreOS);

router.post('/activar/:id_os', authenticateToken,obraSocialControl.activarOS);
router.post('/desactivar/:id_os', authenticateToken,obraSocialControl.desactivarOS);
router.post('/crear', authenticateToken,obraSocialControl.crearOS);
router.post('/editar/:id_os', authenticateToken,obraSocialControl.actualizarOS);


module.exports = router