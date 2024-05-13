const db = require('../config/database');

exports.getPacientes = (req, res) => {
    db.query('SELECT * FROM paciente', (error, result) => {
        if (error) {
            console.error('Error al obtener pacientes', error);
            res.status(500).json({ message: 'Hubo un error al obtener los pacientes' });
            return;
        }
        res.json(result);
    });
};

exports.getPacienteByDNI = (req,res) => {
    const documento_paciente = req.params.dni;
    console.log(req);
    db.query('SELECT* FROM paciente WHERE documento_paciente = ?', [documento_paciente], (error, result) => {
        if (error) {
            console.error('Error al obtener al paciente', error);
            res.status(500).json({ message: 'Hubo un error al obtener al paciente' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ message: 'Paciente no encontrado' });
            return;
        }
        res.json(result[0]);
    });
};

exports.postPaciente = (req,res) => {

};