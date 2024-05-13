const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const PORT = 3000;
const app = express();

dotenv.config();
//MIDDLEWARE PARA PARSEAR DATOS JSON
app.use(express.json());
//MIDDLEWARE PARA PARSEAR DATOS DE FORMULARIOS
app.use(express.urlencoded({ extended: false }));
//MIDDLEWARE PARA ACCEDER A ARCHIVOS 'PUBLIC'
app.use(express.static(path.join(__dirname, 'public')));
//CONFIGURACIÓN PARA RENDERIZADO PLANTILLAS PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//REQUIRES ROUTES
const indexRouter = require('./routes/index');
const pacienteRouter = require('./routes/pacienteRoute');

//RUTAS
app.use('/paciente', pacienteRouter);
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Servidor Ejecutándose en Puerto ${PORT}`);
})