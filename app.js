const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
const PORT = 3000;
const app = express();
const initializeData = require('./config/initializeData');

const User = require('./models/userModel');
const Rol = require('./models/rolModel');
const UserRol = require('./models/userRolModel');

const Profesional = require('./models/profesionalModel');
const Profesion = require('./models/profesionModel');
const Especialidad = require('./models/especialidadModel');
const Profesion_especialidad = require('./models/profesion_especialidad_Model');
const Profesional_profesion_especilidad = require('./models/profesional_profesion_especialidad_mode');

const Paciente = require('./models/pacienteModel');
const ObraSocial = require('./models/obrasocialModel');
const Plan = require('./models/planModel');
const ObraSocial_Plan = require('./models/obraSocial_Plan_Model');
const Paciente_ObraSocial_Plan = require('./models/paciente_obra_plan_Model');

const Medicamento = require('./models/medicamentoModel');
const Forma_farmaceutica = require('./models/forma_farmaceuticaModel');
const Familia = require('./models/familiaModel');
const Categoria = require('./models/categoriaModel');
const Presentacion = require('./models/presentacionModel');
const Categoria_Familia = require('./models/categoria_familiaModel');

const Prestacion = require('./models/prestacionModel');

const Prescripcion = require('./models/prescripcionModel');
const Receta = require('./models/recetaModel');

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
const userRouter = require('./routes/userRoute');
const profesionalRouter = require('./routes/profesionalRoute');

//RUTAS
app.use('/paciente', pacienteRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/profesional', profesionalRouter);

//SINCRONIZACIÓN DE TABLAS
sequelize.sync({ force: false })
  .then(async() => {
    console.log('Modelos sincronizados correctamente con la base de datos.');
    await initializeData();
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