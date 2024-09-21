const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const Paciente = require('../models/pacienteModel');
const ObraSocial = require('../models/obrasocialModel');
const Plan = require('../models/planModel');
const Prescripcion = require('../models/prescripcionModel');
const ObraSocial_Plan = require('../models/obraSocial_Plan_Model');
const Paciente_ObraSocial_Plan = require('../models/paciente_obra_plan_Model');
const Profesional = require('../models/profesionalModel');
const Receta = require('../models/recetaModel');
const Presentacion = require('../models/presentacionModel');
const User = require('../models/userModel');
const Medicamento = require('../models/medicamentoModel');
const Forma_farmaceutica = require('../models/forma_farmaceuticaModel');
const Familia = require('../models/familiaModel');
const Categoria = require('../models/categoriaModel');
const sequelize = require('../config/database');
const Prestacion = require('../models/prestacionModel');
const Estudio = require('../models/estudioModel');
const ProfesionalPaciente = require('../models/ProfesionalPacienteModel');

exports.mostrarCrearPaciente = async (req, res) => {
    try {
        const obras_sociales = await ObraSocial.findAll({ where: { activo: true } });
        res.render('pages/pacienteViews/crearPaciente', { obras_sociales, create: true });
    } catch (error) {
        console.error('Error al mostrar la creación de Pacientes: ', error);
        res.status(500).json({ message: "Error al mostrar 'Crear'" });
    }
};

exports.descargarPrescripcion = async (req, res) => {
    try {
        const id_prescripcion = req.params.id_prescripcion;
        const prescripcion = await Prescripcion.findByPk(id_prescripcion, {
            include: [
                {
                    model: Paciente, as: 'Paciente'
                },
                {
                    model: Profesional, as: 'Profesional',
                    include: [
                        {
                            model: User, as: 'User'
                        }
                    ]
                },
                {
                    model: Receta,
                    include: [
                        {
                            model: Presentacion,
                            include: [
                                { model: Medicamento, as: 'Medicamento' },
                                { model: Forma_farmaceutica, as: 'Forma_farmaceutica' },
                                { model: Categoria, as: 'Categoria' },
                                { model: Familia, as: 'Familia' }
                            ]
                        }
                    ]
                },
                {
                    model: Prestacion, as: 'Prestacion',
                    include: [
                        { model: Estudio, as: 'Estudio' }
                    ]
                },
            ]
        });

        if (!prescripcion) {
            return res.status(404).json({ message: 'Prescripción no encontrada' });
        }

        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment;filename=prescripcion_${id_prescripcion}.pdf`,
            }).end(pdfData);
        });

        doc.fontSize(20).text('Prescripción Médica', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Paciente: ${prescripcion.Paciente.nombre_paciente} ${prescripcion.Paciente.apellido_paciente}`);
        doc.fontSize(14).text(`Médico: ${prescripcion.Profesional.User.nombre} ${prescripcion.Profesional.User.apellido}`);
        doc.fontSize(14).text(`Fecha de Prescripción: ${prescripcion.fecha_prescripcion.toISOString().substring(0, 10)}`);
        doc.moveDown();
        doc.fontSize(14).text(`Diagnóstico: ${prescripcion.diagnostico}`);
        doc.moveDown();

        doc.fontSize(16).text('Prestaciones', { underline: true });
        prescripcion.Prestacion.forEach(prestacion => {
            doc.moveDown();
            doc.fontSize(14).text(`Estudio: ${prestacion.Estudio.nombre_estudio}`);
            doc.text(`Lado: ${prestacion.lado || 'N/A'}`);
            doc.text(`Indicación: ${prestacion.indicacion}`);
            doc.text(`Justificación: ${prestacion.justificacion}`);
        });

        doc.moveDown();
        doc.fontSize(16).text('Recetas', { underline: true });
        prescripcion.Receta.forEach(receta => {
            doc.moveDown();
            doc.fontSize(14).text(`Medicamento: ${receta.Presentacion.Medicamento.nombre_generico} ${receta.Presentacion.concentracion}${receta.Presentacion.u_medida} | ${receta.Presentacion.Forma_farmaceutica.forma_farmaceutica}`);
            doc.text(`Dosis: ${receta.dosis}`);
            doc.text(`Duración: ${receta.duracion}`);
        });

        doc.end();

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error' });
    }
}

exports.mostrarRecetasPaciente = async (req, res) => {
    try {
        const id_paciente = req.params.id_paciente;
        const paciente = await Paciente.findByPk(id_paciente);
        const prescripciones = await Prescripcion.findAll({
            where: { id_paciente: id_paciente },
            include: [
                {
                    model: Profesional, as: 'Profesional',
                    include: [
                        {
                            model: User, as: 'User'
                        }
                    ]
                },
                {
                    model: Receta,
                    include: [
                        {
                            model: Presentacion,
                            include: [
                                { model: Medicamento, as: 'Medicamento' },
                                { model: Forma_farmaceutica, as: 'Forma_farmaceutica' },
                                { model: Categoria, as: 'Categoria' },
                                { model: Familia, as: 'Familia' }
                            ]
                        }
                    ]
                },
                {
                    model: Prestacion, as: 'Prestacion',
                    include: [
                        { model: Estudio, as: 'Estudio' }
                    ]
                },
            ]
        });
        res.render('pages/pacienteViews/prescripcionPaciente', { paciente, prescripciones });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Error' });
    }
}

exports.obtenerPlanesPorOS = async (req, res) => {
    try {
        const { id_os } = req.params;
        const obraSocial = await ObraSocial.findByPk(id_os, {
            include: {
                model: Plan,
                through: { attributes: [] }
            }
        });
        const planes = obraSocial ? obraSocial.Plans : [];
        res.json(planes);
    } catch (error) {
        console.error('Error al obtener planes: ', error);
        res.status(500).json({ message: 'Error al obtener planes' });
    }
};

exports.createPaciente = async (req, res) => {
    const transaction = await sequelize.transaction();
    const { user } = req.session;
    try {
        const { nombre_paciente, apellido_paciente, documento_paciente, fecha_nac, sexo_paciente, id_os, id_plan } = req.body;

        const pacienteX = await Paciente.findOne({ where: { documento_paciente } });
        if (pacienteX) {
            await ProfesionalPaciente.create({ id_paciente: pacienteX.id_paciente, id_profesional: user.id }, { transaction });
            await transaction.commit();
            return res.redirect('/paciente');
        }

        const paciente = await Paciente.create({
            nombre_paciente,
            apellido_paciente,
            documento_paciente,
            fecha_nac,
            sexo_paciente
        }, { transaction });
        const paciente_os_plan = await Paciente_ObraSocial_Plan.create({
            id_paciente: paciente.id_paciente,
            id_os,
            id_plan
        }, { transaction });

        await ProfesionalPaciente.create({ id_paciente: paciente.id_paciente, id_profesional: user.id }, { transaction });
        await transaction.commit();
        res.redirect('/paciente');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear paciente:', error);
        res.status(500).json({ message: "Error al crear paciente" });
    }
};

exports.obtenerTodosPacientes = async (req, res) => {
    const { user } = req.session;
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT
                p.id_paciente,
                p.nombre_paciente,
                p.apellido_paciente,
                p.documento_paciente,
                p.fecha_nac,
                p.sexo_paciente,
                os.nombre_os,
                pl.plan
            FROM
                pacientes p
            LEFT JOIN
                paciente_obraSocial_plan posp ON p.id_paciente = posp.id_paciente
            LEFT JOIN
                obrassociales os ON posp.id_os = os.id_os
            LEFT JOIN
                planes pl ON posp.id_plan = pl.id_plan
            INNER JOIN
                profesional_paciente pp ON pp.id_paciente = p.id_paciente
            WHERE
                pp.id_profesional = :id_profesional
                AND p.activo = true;
        `, {
            replacements: {
                id_profesional: user.id
            }
        });
        res.json({ pacientes: results });
    } catch (error) {
        console.error('Error al buscar pacientes.', error);
        res.status(500).json({ message: 'Error al buscar pacientes.' });
    }
};

exports.obtenerPacientes = async (req, res) => {
    const { user } = req.session;

    try {
        const [results, metadata] = await sequelize.query(`
            SELECT
                p.id_paciente,
                p.nombre_paciente,
                p.apellido_paciente,
                p.documento_paciente,
                p.fecha_nac,
                p.sexo_paciente,
                os.nombre_os,
                pl.plan
            FROM
                pacientes p
            LEFT JOIN
                paciente_obraSocial_plan posp ON p.id_paciente = posp.id_paciente
            LEFT JOIN
                obrassociales os ON posp.id_os = os.id_os
            LEFT JOIN
                planes pl ON posp.id_plan = pl.id_plan
            INNER JOIN
                profesional_paciente pp ON pp.id_paciente = p.id_paciente
            WHERE
                pp.id_profesional = :id_profesional
                AND p.activo = true;
        `, {
            replacements: {
                id_profesional: user.id
            }
        });
        res.render('pages/pacienteViews/paciente', { pacientes: results });
    } catch (error) {
        console.error('Error al buscar pacientes.', error);
        res.status(500).json({ message: 'Error al buscar pacientes.' });
    }
};

exports.buscarPacientePorDNI = async (req, res) => {
    try {
        const { documento_paciente } = req.query;
        if (!documento_paciente) {
            return res.status(400).json({ message: 'El documento es requerido.' });
        }

        const { user } = req.session;



        const [results, metadata] = await sequelize.query(`
            SELECT
                p.id_paciente,
                p.nombre_paciente,
                p.apellido_paciente,
                p.documento_paciente,
                p.fecha_nac,
                p.sexo_paciente,
                os.nombre_os,
                pl.plan
            FROM
                pacientes p
            LEFT JOIN
                paciente_obraSocial_plan posp ON p.id_paciente = posp.id_paciente
            LEFT JOIN
                obrassociales os ON posp.id_os = os.id_os
            LEFT JOIN
                planes pl ON posp.id_plan = pl.id_plan
            INNER JOIN
                profesional_paciente pp ON pp.id_paciente = p.id_paciente
            WHERE
                pp.id_profesional = :id_profesional
                AND p.activo = true
                AND p.documento_paciente = :documento_paciente
        `, {
            replacements: { id_profesional: user.id, documento_paciente }
        });

        if (results.length === 0) {
            return res.json({ pacientes: [], message: 'Paciente no encontrado.' });
        }

        res.json({ pacientes: results });
    } catch (error) {
        console.error('Error al buscar paciente por DNI.', error);
        res.status(500).json({ message: 'Error al buscar paciente por DNI.' });
    }
};

exports.mostrarEditarPaciente = async (req, res) => {
    try {
        const id_paciente = req.params.id_paciente;
        const [results, metadata] = await sequelize.query(`
            SELECT
                p.id_paciente,
                p.nombre_paciente,
                p.apellido_paciente,
                p.documento_paciente,
                p.fecha_nac,
                p.sexo_paciente,
                os.nombre_os,
                pl.plan
            FROM
                pacientes p
            LEFT JOIN
                paciente_obraSocial_plan posp ON p.id_paciente = posp.id_paciente
            LEFT JOIN
                obrassociales os ON posp.id_os = os.id_os
            LEFT JOIN
                planes pl ON posp.id_plan = pl.id_plan
            WHERE
                p.id_paciente = ${id_paciente};
        `);
        const obras_sociales = await ObraSocial.findAll({ where: { activo: true } });
        const pacienteU = await Paciente.findByPk(id_paciente);
        if (!pacienteU) {
            res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        res.render('pages/pacienteViews/actualizarPaciente', { paciente: results, obras_sociales, create: false });
    } catch (error) {
        console.error('Error al obtener paciente por ID:', error);
        res.status(500).json({ message: "Error al obtener paciente por ID" });
    }
};

exports.actualizarPaciente = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id_paciente } = req.params;
        const { nombre_paciente, apellido_paciente, documento_paciente, fecha_nac, sexo_paciente, id_os, id_plan } = req.body;
        const paciente = await Paciente.findByPk(id_paciente);
        if (!paciente) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }
        await paciente.update({
            nombre_paciente,
            apellido_paciente,
            documento_paciente,
            fecha_nac,
            sexo_paciente
        }, { transaction });
        console.log('PRUEBA 1 PLAN: ', id_plan);
        if (id_plan) {
            console.log('PRUEBA 2 PLAN: ', id_plan);
            const paciente_os_plan = await Paciente_ObraSocial_Plan.update(
                { id_os: id_os, id_plan: id_plan },
                { where: { id_paciente }, transaction }
            );
            await transaction.commit()
            return res.redirect('/paciente');
        }
        await transaction.commit()
        res.redirect('/paciente');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al Actualizar Paciente:', error);
        res.status(500).json({ message: "Error al actualizar paciente" });
    }
};

exports.borrarPaciente = async (req, res) => {
    try {
        const { user } = req.session;
        const { id_paciente } = req.params;
        const paciente = await Paciente.findByPk(id_paciente);
        if (!paciente) {
            res.status(404).json({ message: 'no se encontró paciente.' });
        }
        await ProfesionalPaciente.destroy({ where: { id_paciente, id_profesional: user.id } });
        res.redirect('/paciente');
    } catch (error) {
        console.error('Error al borrar paciente: ', error);
        res.status(500).json({ message: 'Error al borrar paciente' });
    }
};

exports.verificarDocumento = async (req, res) => {
    try {
        const { user } = req.session;
        const { documento } = req.params;
        const paciente = await Paciente.findOne({ where: { documento_paciente: documento } });
        if (paciente) {
            const profesionalXpaciente = await ProfesionalPaciente.findOne({ where: { id_paciente: paciente.id_paciente, id_profesional: user.id } });
            if (profesionalXpaciente) {
                return res.json({ exists: true });
            }
        }
        res.json({ exists: false });
    } catch (error) {
        console.error('Error al verificar documento: ', error);
        res.status(500).json({ message: 'Error al verificar documento' });
    }
}
