const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');

//CRUD PACIENTE
router.get('/crear', async(req,res)=>{
    res.render('pages/pacienteViews/crearPaciente', {create:true});
});
router.post('/crear', pacienteControl.createPaciente);

router.post('/editar/:id_paciente', pacienteControl.actualizarPaciente);
router.get('/editar/:id_paciente', pacienteControl.mostrarEditarPaciente);

router.delete('/:id_paciente', pacienteControl.borrarPaciente);

router.get('/', pacienteControl.obtenerPacientes);
router.get('/details', pacienteControl.buscarPacienteByDNI);

module.exports = router;