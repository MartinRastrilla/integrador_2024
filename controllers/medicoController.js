const Medico = require('../models/medicoModel');

exports.crearMedico = async (req,res) => {
    try {
        const { id_refeps,nombre_medico, apellido_medico, documento_medico, profesion, especialidad, domicilio, matricula, caducidad } = req.body;
        const medico = await Medico.create({
            id_refeps,
            nombre_medico,
            apellido_medico,
            documento_medico,
            profesion,
            especialidad,
            domicilio,
            matricula,
            caducidad
        });
        res.status(201).json({medico, message: 'Medico Creado' });
    } catch (error) {
        console.error('Error al Crear Médico:', error);
        res.status(500).json({message: 'Error al crear médico:'});
    }
};

exports.obtenerMedicos = async (req,res) => {
    try {
        const medicos = await Medico.findAll();
        res.status(200).json({medicos});
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        res.status(500).json({ message:"No se pudieron obtener los médicos" });
    }
};