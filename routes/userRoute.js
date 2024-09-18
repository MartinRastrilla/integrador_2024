const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../config/auth');

router.get('/crear', authenticateToken,userController.mostrarCrearUser);
router.post('/crear', authenticateToken,userController.createUser);

router.get('/', userController.mostrarLoginUser);
router.post('/', userController.loginUser);

router.get('/especialidades/:id_profesion', userController.obtenerEspPorProfesion);
router.get('/verificarUser/:documento', userController.verificarUser);
router.get('/users/details/:id_user', userController.detalleUsuario);
router.get('/users/edit/:id_user', userController.editUsuario);

router.get('/users', userController.mostrarIndex);
router.post('/logout', userController.logout);

router.get('/protected', (req,res) => {
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado')
    res.render('prueba', user);
});
module.exports = router;