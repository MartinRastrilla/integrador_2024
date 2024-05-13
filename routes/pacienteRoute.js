const express = require('express');
const router = express.Router();
const pacienteControl = require('../controllers/pacienteController');

//CRUD PACIENTE
router.get('/dni', (req,res) => {
    res.render('pages/paciente');
});
router.get('/', pacienteControl.getPacientes);
router.get('/:dni', pacienteControl.getPacienteByDNI);

module.exports = router;