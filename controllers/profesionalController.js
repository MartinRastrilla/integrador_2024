const Profesional = require('../models/profesionalModel');
const Paciente = require('../models/pacienteModel');
const Presentacion = require('../models/presentacionModel');
const Prestacion = require('../models/prestacionModel');
const Prescripcion = require('../models/prescripcionModel');
const Receta = require('../models/recetaModel');
const Medicamento = require('../models/medicamentoModel');
const Forma_farmaceutica = require('../models/forma_farmaceuticaModel');
const Categoria = require('../models/categoriaModel');
const Familia = require('../models/familiaModel');
const sequelize = require('../config/database');

exports.mostrarCrearPrescripcion = async (req,res) => {
    try {
        const pacientes = await Paciente.findAll();
        const presentaciones = await Presentacion.findAll({
          include: [
            { model: Medicamento, as: 'Medicamento' },
            { model: Forma_farmaceutica, as: 'Forma_farmaceutica' },
            { model: Categoria, as: 'Categoria' },
            { model: Familia, as: 'Familia' }
          ]
        });

        res.render('pages/profesionalViews/crearPrescripcion', {pacientes, presentaciones});
    } catch (error) {
        console.error('Error al obtener pacientes y presentaciones:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.crearPrescripcion = async (req,res) => {
    const transaction = await sequelize.transaction();
    try {
      const {id_paciente, nombrePrestacion, lado, indicacion, justificacion, presentaciones} = req.body;
      const pacienteSelect = await Paciente.findByPk(id_paciente);

      const prescripción = await Prescripcion.create({
        id_profesional: 1,
        id_paciente,
        diagnostico: justificacion
      },{transaction});

      const prestacion = await Prestacion.create({
        estudio: nombrePrestacion,
        lado,
        indicacion,
        justificacion
      },{transaction});


      for(const medicamento in presentaciones) {
        const receta = await Receta.create({
          id_prescripcion: prescripción.id_prescripcion,
          id_presentacion: presentaciones[medicamento],
          id_prestacion: prestacion.id_prestacion
        },{transaction});
      }
      await transaction.commit();
      res.redirect('/profesional/crearPrescripcion');
    } catch (error) {
      await transaction.rollback();
      console.error('Error al obtener prescripción:', error);
      res.status(500).send('Error interno del servidor');
    }
}