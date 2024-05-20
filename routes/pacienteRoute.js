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

router.get('/', pacienteControl.obtenerPacientes);
router.get('/details', pacienteControl.buscarPacienteByDNI);

module.exports = router;