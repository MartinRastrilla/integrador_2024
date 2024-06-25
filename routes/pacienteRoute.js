const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');
const authenticateToken = require('../config/auth');

//CRUD PACIENTE
router.post('/crear',pacienteControl.createPaciente);
router.post('/:id_paciente', pacienteControl.borrarPaciente);

//MOSTRAR VISTAS
router.get('/crear', pacienteControl.mostrarCrearPaciente);
router.get('/editar/:id_paciente', pacienteControl.mostrarEditarPaciente);
router.get('/prescripcionPaciente/:id_paciente', pacienteControl.mostrarRecetasPaciente);

//FUNCIONES DE CONTROL
router.get('/planes/:id_os', pacienteControl.obtenerPlanesPorOS);
router.get('/todos', pacienteControl.obtenerTodosPacientes);
router.get('/', pacienteControl.obtenerPacientes);
router.get('/buscar', pacienteControl.buscarPacientePorDNI);
router.get('/descargarPrescripcion/:id_prescripcion', pacienteControl.descargarPrescripcion);
router.get('/verificarDocumento/:documento', pacienteControl.verificarDocumento);
router.post('/editar/:id_paciente', pacienteControl.actualizarPaciente);







module.exports = router;