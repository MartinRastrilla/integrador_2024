const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');

//CRUD PACIENTE
router.get('/buscar', (req,res) => {
    res.render('pages/paciente');
});
router.get('/', pacienteControl.obtenerPacientes);
router.get('/buscar-por-documento', pacienteControl.buscarPacienteByDNI);
router.post('/create', pacienteControl.createPaciente);

module.exports = router;