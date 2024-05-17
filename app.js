const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const PORT = 3000;
const app = express();
const Medico = require('./models/medicoModel');
const Paciente = require('./models/pacienteModel');
const Medicamento = require('./models/medicamentoModel');
const ObraSocial = require('./models/pacienteobrasocialModel');
const Plan = require('./models/pacientePlanModel');

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
const medicoRouter = require('./routes/medicoRoute');
const medicamentoRouter = require('./routes/medicamentoRoute');

//RUTAS
app.use('/paciente', pacienteRouter);
app.use('/medico', medicoRouter);
app.use('/medicamento', medicamentoRouter);
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