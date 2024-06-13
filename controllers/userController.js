const Rol = require('../models/rolModel');
const UserRol = require('../models/userRolModel');
const User = require('../models/userModel');
const Profesion = require('../models/profesionModel');
const Especialidad = require('../models/especialidadModel');
const Profesional = require('../models/profesionalModel');
const Dr_Prof_Esp = require('../models/profesional_profesion_especialidad_mode');
const sequelize = require('../config/database');

exports.mostrarCrearUser = async (req,res) =>{
    try {
        const roles = await Rol.findAll();
        const profesiones = await Profesion.findAll();
        res.render('pages/userViews/crearUser', {roles, profesiones});
    } catch (error) {
        console.error('Error al mostrar la creación de Usuarios: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear Usuarios'"});
    }
};

exports.mostrarLoginUser = async (req,res) =>{
    try {
        res.render('pages/userViews/userLogin');
    } catch (error) {
        console.error('Error al mostrar la Login de Usuarios: ', error);
        res.status(500).json({message: "Error al mostrar 'Login Usuarios'"});
    }
}

exports.obtenerEspPorProfesion = async (req,res) => {
    try {
        const {id_profesion} = req.params;
        const profesion = await Profesion.findByPk(id_profesion,{
            include: {
                model: Especialidad,
                through: {attributes: []}
            }
        });
        const especialidades = profesion ? profesion.Especialidads : [];
        res.json(especialidades);
    } catch (error) {
        console.error('Error al obtener especialidades: ', error);
        res.status(500).json({message: 'Error al obtener especialidades'});
    }
}

exports.createUser = async (req,res) => {
    const transaction = await sequelize.transaction();
    try {
        const {nombre_user, apellido_user, documento_user, password_user, roles, id_refeps, domicilio, matricula, caducidad, id_profesion, id_especialidad} = req.body;
        const user = await User.create({
            nombre:nombre_user,
            apellido:apellido_user,
            documento:documento_user,
            password:password_user
        },{transaction});
        if (roles && roles.length > 0) {
            const rolesArray = Array.isArray(roles) ? roles : [roles];
            for (const rolID of rolesArray) {
            await UserRol.create({
                id_user: user.id_user,
                id_rol: rolID
            }, {transaction});
            }
        }
        
        const profesional = await Profesional.create({
            id_profesional: user.id_user,
            id_refeps: id_refeps,
            domicilio: domicilio,
            matricula: matricula,
            caducidad: caducidad
        }, {transaction});

        const dr_Prof_Esp = await Dr_Prof_Esp.create({
            id_profesional: profesional.id_profesional,
            id_profesion,
            id_especialidad
        }, {transaction});
        res.redirect('/paciente');
        (await transaction).commit();
    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
}

exports.mostrarIndex = async (req,res) =>{
    try {
        
        res.render('/pages/userViews/user');
    } catch (error) {
        
    }
};