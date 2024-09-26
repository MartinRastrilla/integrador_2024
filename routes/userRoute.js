const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateToken, authenticateAdmin } = require('../config/auth');

router.get('/crear', authenticateToken,authenticateAdmin,userController.mostrarCrearUser);
router.post('/crear', authenticateToken,authenticateAdmin,userController.createUser);

router.get('/', userController.mostrarLoginUser);
router.post('/', userController.loginUser);

router.get('/users/edit/:id_user', authenticateToken,userController.editUsuario);
router.get('/especialidades/:id_profesion', userController.obtenerEspPorProfesion);
router.get('/especialidad/:nombre_profesion', userController.obtenerEspPorProfesion);
router.post('/users/addEspecialidad/:id_user/:profesion/:especialidadId', authenticateToken,userController.addEspecialidad);
router.post('/users/deleteProfesion/:id_user/:especialidad', authenticateToken,userController.deleteEspecialidad);
router.post('/users/edit/:id_user', authenticateToken,userController.guardarEdicion);
router.post('/users/delete/:id_user', authenticateToken,userController.deleteUser);
router.post('/users/activar/:id_user', authenticateToken,userController.activarUser);

router.get('/verificarUser/:documento', userController.verificarUser);
router.get('/users/details/:id_user', authenticateToken,userController.detalleUsuario);
router.get('/users', authenticateToken, authenticateAdmin,userController.mostrarIndex);

router.post('/logout', userController.logout);

router.get('/protected', (req,res) => {
    const {user} = req.session
    if (!user) return res.status(403).send('Acceso no autorizado')
    res.render('prueba', user);
});
module.exports = router;