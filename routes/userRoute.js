const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/crear', userController.mostrarCrearUser);
router.post('/crear', userController.createUser);

router.get('/login', userController.mostrarLoginUser);

router.get('/especialidades/:id_profesion', userController.obtenerEspPorProfesion);

router.get('/', userController.mostrarIndex);

module.exports = router