
const express = require('express');
const {authenticateToken} = require('../config/auth');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/', authenticateToken, homeController.mostrarHomePage);

module.exports = router;