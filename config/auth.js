const jwt = require('jsonwebtoken');
const UserRol = require('../models/userRolModel');
const Rol = require('../models/rolModel');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next){
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado')
    next();
}

async function authenticateAdmin(req, res, next){
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado');

    const roles = await UserRol.findAll({where: {id_user: user.id}});

    for (let rol of roles) {
        const rolU = await Rol.findByPk(rol.id_rol);
        if (rolU.rol_user === 'Admin') return next();
    }

    return res.status(403).send('Acceso no autorizado');
}

module.exports = {authenticateAdmin,authenticateToken};