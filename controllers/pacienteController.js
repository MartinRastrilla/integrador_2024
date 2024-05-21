const Paciente = require('../models/pacienteModel');
const ObraSocial = require ('../models/obrasocialModel');
const Plan = require('../models/planModel');
const ObraSocial_Plan = require('../models/obraSocial_Plan_Model');
const Paciente_ObraSocial_Plan = require('../models/paciente_obra_plan_Model');
const sequelize = require('../config/database');

exports.mostrarCrearPaciente = async (req,res) => {
    try {
        const obras_sociales = await ObraSocial.findAll( { where: {activo:true} } );
        res.render('pages/pacienteViews/crearPaciente', {obras_sociales, create:true});
    } catch (error) {
        console.error('Error al mostrar la creación de Pacientes: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear'"});
    }
};

exports.obtenerPlanesPorOS = async (req,res) => {
    try {
        const {id_os} = req.params;
        const obraSocial = await ObraSocial.findByPk(id_os, {
            include: {
               model: Plan,
                through: { attributes: [] }
            }
        });
        const planes = obraSocial ? obraSocial.Plans : [];
        res.json(planes);
    } catch (error) {
        console.error('Error al obtener planes: ', error);
        res.status(500).json({message: 'Error al obtener planes'});
    }
};

exports.createPaciente = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { nombre_paciente, apellido_paciente, documento_paciente, fecha_nac, sexo_paciente, id_os, id_plan } = req.body;
      const paciente = await Paciente.create({
        nombre_paciente,
        apellido_paciente,
        documento_paciente,
        fecha_nac,
        sexo_paciente
      },{transaction});
      const paciente_os_plan = await Paciente_ObraSocial_Plan.create({
        id_paciente: paciente.id_paciente,
        id_os,
        id_plan
      }, {transaction});
      await transaction.commit();
      res.redirect('/paciente');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear paciente:', error);
        res.status(500).json({ message: "Error al crear paciente" });
    }
};

exports.obtenerPacientes = async (req,res) => {
    try {
        const pacientes = await Paciente.findAll();
        const paciente_os_plan = await Paciente_ObraSocial_Plan.findAll({
            include:[
            {model: ObraSocial},
            {model: Plan}
            ]
        });
        res.render('pages/pacienteViews/paciente', {pacientes, paciente_os_plan});
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
            return res.render('pages/pacienteViews/paciente', {message});
        }
        res.render('pages/pacienteViews/paciente', {paciente});
    } catch (error) {
        console.error('Error al obtener paciente por ID:', error);
        res.status(500).json({ message: "Error al obtener paciente por ID" });
    }
};

exports.mostrarEditarPaciente = async (req,res) => {
    try {
        const { id_paciente }= req.params;
        const paciente = await Paciente.findByPk(id_paciente);
        res.render('pages/pacienteViews/actualizarPaciente', {paciente,create:false});
    } catch (error) {
        console.error('Error al obtener paciente por ID:', error);
        res.status(500).json({ message: "Error al obtener paciente por ID" });
    }
};

exports.actualizarPaciente = async (req, res) => {
    try {
        const { id_paciente } = req.params;
        const { nombre_paciente, apellido_paciente, documento_paciente, fecha_nac, sexo_paciente, obra_social, plan } = req.body;
        const paciente = await Paciente.findByPk(id_paciente);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await paciente.update({
            nombre_paciente,
            apellido_paciente,
            documento_paciente,
            fecha_nac,
            sexo_paciente,
            obra_social,
            plan
        });
        res.redirect('/paciente');
    } catch (error) {
        console.error('Error al Actualizar Paciente:', error);
        res.status(500).json({message: "Error al actualizar paciente"});
    }
};

exports.borrarPaciente = async (req,res) =>{
    try {
        const { id_paciente } = req.params;
        const paciente = await Paciente.findByPk(id_paciente);
        if (!paciente) {
            res.status(404).json({message:'no se encontró paciente.'});
        }
        await Paciente.update({activo:false}, {where: {id_paciente}});
        res.redirect('/paciente');
    } catch (error) {
        console.error('Error al borrar paciente: ', error);
        res.status(500).json({message:'Error al borrar paciente'});
    }
};