const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');

//CRUD PACIENTE
router.get('/crear', async(req,res)=>{
    res.render('pages/pacienteViews/crearPaciente', {create:true});
});
router.post('/crear', pacienteControl.createPaciente);

router.get('/editar/:id_paciente', pacienteControl.mostrarEditarPaciente);

router.get('/', pacienteControl.obtenerPacientes);
router.get('/details', pacienteControl.buscarPacienteByDNI);
router.put('/details/actualizar/:documento_paciente', pacienteControl.actualizarPaciente);

module.exports = router;