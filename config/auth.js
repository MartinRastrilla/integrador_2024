const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next){
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    const accessToken = req.headers['authorization'];
    console.log('Authorization Header:', accessToken);
    const token = accessToken && accessToken.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
    
}

module.exports = authenticateToken;