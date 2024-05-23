const Rol = require('../models/rolModel');
const UserRol = require('../models/userRolModel');
const User = require('../models/userModel');

exports.mostrarCrearUser = async (req,res) =>{
    try {
        const roles = await Rol.findAll();
        res.render('pages/userViews/crearUser');
    } catch (error) {
        console.error('Error al mostrar la creación de Usuarios: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear Usuarios'"});
    }
};

exports.mostrarIndex = async (req,res) =>{
    try {
        
        res.render('/pages/userViews/user');
    } catch (error) {
        
    }
};