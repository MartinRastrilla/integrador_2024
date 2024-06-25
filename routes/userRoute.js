const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../config/auth');

router.get('/crear', userController.mostrarCrearUser);
router.post('/crear', userController.createUser);

router.get('/', userController.mostrarLoginUser);
router.post('/', userController.loginUser);

router.get('/especialidades/:id_profesion', userController.obtenerEspPorProfesion);

router.get('/users', userController.mostrarIndex);
router.post('/logout', userController.logout);

router.get('/protected', (req,res) => {
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado')
    res.render('prueba', user);
});
module.exports = router;