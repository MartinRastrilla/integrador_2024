const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');
const {authenticateToken} = require('../config/auth');

//CRUD PACIENTE
router.post('/crear', authenticateToken,pacienteControl.createPaciente);
router.post('/:id_paciente', authenticateToken, pacienteControl.borrarPaciente);

//MOSTRAR VISTAS
router.get('/crear', authenticateToken, pacienteControl.mostrarCrearPaciente);
router.get('/editar/:id_paciente', authenticateToken, pacienteControl.mostrarEditarPaciente);
router.get('/prescripcionPaciente/:id_paciente', authenticateToken, pacienteControl.mostrarRecetasPaciente);
router.get('/', authenticateToken, pacienteControl.obtenerPacientes);

//FUNCIONES DE CONTROL
router.get('/planes/:id_os', authenticateToken, pacienteControl.obtenerPlanesPorOS);
router.get('/todos', authenticateToken, pacienteControl.obtenerTodosPacientes);
router.get('/buscar', authenticateToken, pacienteControl.buscarPacientePorDNI);
router.get('/descargarPrescripcion/:id_prescripcion', authenticateToken, pacienteControl.descargarPrescripcion);
router.get('/verificarDocumento/:documento', authenticateToken, pacienteControl.verificarDocumento);
router.post('/editar/:id_paciente', authenticateToken, pacienteControl.actualizarPaciente);




module.exports = router;