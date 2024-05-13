const express = require('express');
const router = express.Router();

//prueba render pug
router.get('/', (req,res) => {
    res.render('pages/index', { title: 'Inicio' });
});

module.exports = router;