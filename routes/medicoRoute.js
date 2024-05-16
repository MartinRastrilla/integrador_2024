const express = require('express');
const router = express.Router();
const medicoControl = require('../controllers/medicoController');

router.get('/', medicoControl.crearMedico);
