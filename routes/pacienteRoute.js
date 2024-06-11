const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');

//CRUD PACIENTE
router.get('/crear', pacienteControl.mostrarCrearPaciente);
router.post('/crear', pacienteControl.createPaciente);

router.get('/planes/:id_os', pacienteControl.obtenerPlanesPorOS);

router.post('/editar/:id_paciente', pacienteControl.actualizarPaciente);
router.get('/editar/:id_paciente', pacienteControl.mostrarEditarPaciente);

router.post('/:id_paciente', pacienteControl.borrarPaciente);

router.get('/prescripcionPaciente/:id_paciente', pacienteControl.mostrarRecetasPaciente);

router.get('/todos', pacienteControl.obtenerTodosPacientes);
router.get('/', pacienteControl.obtenerPacientes);
router.get('/buscar', pacienteControl.buscarPacientePorDNI);
router.get('/descargarPrescripcion/:id_prescripcion', pacienteControl.descargarPrescripcion);

module.exports = router;