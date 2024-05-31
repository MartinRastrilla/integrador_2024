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

exports.mostrarCrearPrescripcion = async (req,res) => {
    try {
        const pacientes = await Paciente.findAll();
        const presentaciones = await Presentacion.findAll({
            include: [
              { model: Medicamento },
              { model: Forma_farmaceutica },
              { model: Categoria },
              { model: Familia }
            ]
          });

        res.render('pages/profesionalViews/crearPrescripcion', {pacientes, presentaciones});
    } catch (error) {
        console.error('Error al obtener pacientes y presentaciones:', error);
        res.status(500).send('Error interno del servidor');
    }
}