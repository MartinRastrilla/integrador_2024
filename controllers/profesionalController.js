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
const Estudio = require('../models/estudioModel');
const User = require('../models/userModel');
const ProfesionalPaciente = require('../models/ProfesionalPacienteModel');

exports.mostrarCrearPrescripcion = async (req,res) => {
    try {
        const {user} = req.session;
        if (!user) return res.status(403).send('Acceso no autorizado');

        const [pacientes, metadata] = await sequelize.query(`
          SELECT p.id_paciente, p.nombre_paciente, p.apellido_paciente, p.documento_paciente, p.fecha_nac, p.sexo_paciente
          FROM pacientes p
          INNER JOIN profesional_paciente pp ON p.id_paciente = pp.id_paciente
          WHERE p.activo = true AND pp.id_profesional = :id_profesional
        `, {
            replacements: { id_profesional: user.id }
        });
      
        const estudios = await Estudio.findAll({where: {activo:true}});
        const presentaciones = await Presentacion.findAll({
          include: [
            { model: Medicamento, as: 'Medicamento' },
            { model: Forma_farmaceutica, as: 'Forma_farmaceutica' },
            { model: Categoria, as: 'Categoria' },
            { model: Familia, as: 'Familia' }
          ]
        });

        res.render('pages/profesionalViews/crearPrescripcion', {pacientes, presentaciones, estudios});
    } catch (error) {
        console.error('Error al obtener pacientes y presentaciones:', error);
        res.status(500).send('Error interno del servidor');
    }
}

exports.crearPrescripcion = async (req,res) => {
    const transaction = await sequelize.transaction();
    const {user} = req.session;
    try {
      const profesional = await User.findOne({where: {documento: user.documento}});
      const {id_paciente, estudios, presentaciones, diagnostico} = req.body;
      const pacienteSelect = await Paciente.findByPk(id_paciente);

     const prescripcion = await Prescripcion.create({
       id_profesional: profesional.id_user,
       id_paciente,
       diagnostico
     },{transaction});

     if (Array.isArray(estudios)) {
      for (const estudio in estudios) {
        const lado = req.body[`lado_${estudios[estudio]}`];
        const indicacion = req.body[`indicacion_${estudios[estudio]}`];
        const justificacion = req.body[`justificacion_${estudios[estudio]}`];

        const prestacion = await Prestacion.create({
          id_estudio: estudios[estudio],
          id_prescripcion: prescripcion.id_prescripcion,
          lado,
          indicacion,
          justificacion
        },{transaction});
      }
     } else {
        const lado = req.body[`lado_${estudios}`];
        const indicacion = req.body[`indicacion_${estudios}`];
        const justificacion = req.body[`justificacion_${estudios}`];
        const prestacion = await Prestacion.create({
        id_estudio: estudios,
        id_prescripcion: prescripcion.id_prescripcion,
        lado,
        indicacion,
        justificacion
      },{transaction});
     }

     if (Array.isArray(presentaciones)) {
      for(const med in presentaciones) {
        const dosis = req.body[`dosis_${presentaciones[med]}`];
        const duracion = req.body[`duracion_${presentaciones[med]}`];
        const receta = await Receta.create({
          id_prescripcion: prescripcion.id_prescripcion,
          id_presentacion: presentaciones[med],
          dosis,
          duracion
          
        },{transaction});
        }
     }else{
        const dosis = req.body[`dosis_${presentaciones}`];
        const duracion = req.body[`duracion_${presentaciones}`];
        const receta = await Receta.create({
          id_prescripcion: prescripcion.id_prescripcion,
          id_presentacion: presentaciones,
          dosis,
          duracion
          
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

exports.obtenerUserSession = async (req,res) => {
  const {user} = req.session;
  if (!user) return res.status(403).send('Acceso no autorizado')
  try {
      const profesional = await User.findOne({where: {documento: user.documento}});

      res.json({ nombre: profesional.nombre, apellido: profesional.apellido });
  } catch (error) {
      res.status(500).json({message: 'Error al obtener usuario: ', error});
  }
  
}