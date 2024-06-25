const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const register = async (req,res) => {
    const {documento_user, password_user} = req.body;

    try {
        const hashedPass = await bcrypt.hash(password_user,10);
        
    } catch (error) {
        
    }
}
