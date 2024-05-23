const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/crear', userController.mostrarCrearUser);

router.get('/', userController.mostrarIndex);

module.exports = router