const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const PORT = 3000;
const app = express();
const Paciente = require('./models/pacienteModel');

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

//SINCRONIZACIÓN DE TABLAS
sequelize.sync({ force: false })
  .then(() => {
    console.log('Modelos sincronizados correctamente con la base de datos.');
  })
  .catch(err => {
    console.error('Error al sincronizar modelos con la base de datos:', err);
  });

//CONEXIÓN A BASE DE DATOS CON SEQUELIZE
sequelize.authenticate()
    .then(() => {
        console.log("Conexión a la Base de Datos establecida");
    })
    .catch(err => {
        console.error('No se pudo establecer conexión', err);
    })

app.listen(PORT, () => {
    console.log(`Servidor Ejecutándose en Puerto ${PORT}`);
})