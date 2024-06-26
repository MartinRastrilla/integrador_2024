const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next){
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado')
    next();
}

module.exports = authenticateToken;