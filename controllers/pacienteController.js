const Paciente = require('../models/pacienteModel');

exports.createPaciente = async (req, res) => {
    try {
      const { nombre_paciente, apellido_paciente, documento_paciente, fecha_nac, sexo_paciente, obra_social, plan, activo } = req.body;
      const paciente = await Paciente.create({
        nombre_paciente,
        apellido_paciente,
        documento_paciente,
        fecha_nac,
        sexo_paciente,
        obra_social,
        plan,
        activo
      });
      res.status(201).json({ paciente, message: "Paciente creado exitosamente" });
    } catch (error) {
      console.error('Error al crear paciente:', error);
      res.status(500).json({ message: "Error al crear paciente" });
    }
};

exports.obtenerPacientes = async (req,res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.status(200).json(pacientes);
    } catch (error) {
        console.error('Error al buscar pacientes.', error);
        res.status(500).json({message:'Error al buscar pacientes.'});
    }
};

exports.buscarPacienteByDNI = async (req,res) => {
    try {
        const { documento_paciente }= req.query;
        const paciente = await Paciente.findOne({ where: { documento_paciente } });
        if (!paciente) {
            const message = "Paciente no Encontrado."
            return res.render('pages/paciente', {message});
        }
        res.render('pages/paciente', {paciente});
    } catch (error) {
        console.error('Error al obtener paciente por ID:', error);
        res.status(500).json({ message: "Error al obtener paciente por ID" });
    }
};

exports.actualizarPaciente = async (req, res) => {
    try {
        const { documento_paciente } = req.query.documento_paciente;
        const { nombre_paciente, apellido_paciente, fecha_nac, sexo_paciente, obra_social, plan } = req.body;
        const paciente = await Paciente.findOne({ where: { documento_paciente } });
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await Paciente.update({
            nombre_paciente,
            apellido_paciente,
            fecha_nac,
            sexo_paciente,
            obra_social,
            plan
        });
        res.status(200).json({paciente, message: "Paciente Actualizado Exitosamente"});
    } catch (error) {
        console.error('Error al Actualizar Paciente:', error);
        res.status(500).json({message: "Error al actualizar paciente"});
    }
};