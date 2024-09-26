const e = require("express");
const ObraSocial = require("../models/obrasocialModel");
const Plan = require("../models/planModel");
const obraSocial_plan = require("../models/obraSocial_Plan_Model");
const sequelize = require("../config/database");
const ObraSocial_Plan = require("../models/obraSocial_Plan_Model");


exports.mostrarObraSocial = async (req, res) => {
    try {
        const obras_sociales = await ObraSocial.findAll();
        res.render('pages/obraSocialViews/obraSocial', { obras_sociales });
    } catch (error) {
        console.error('Error al mostrar la creación de Obra Social: ', error);
        res.status(500).json({ message: "Error al mostrar 'Crear'" });
    }
}

exports.activarOS = async (req, res) => {
    try {
        const { id_os } = req.params;
        const obraSocial = await ObraSocial.findByPk(id_os);
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }
        obraSocial.activo = true;
        await obraSocial.save();
        res.json({ message: 'Obra Social activada correctamente' });
    } catch (error) {
        console.error('Error al activar Obra Social: ', error);
        res.status(500).json({ message: 'Error al activar Obra Social' });
    }
}

exports.desactivarOS = async (req, res) => {
    try {
        const { id_os } = req.params;
        const obraSocial = await ObraSocial.findByPk(id_os);
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }
        obraSocial.activo = false;
        await obraSocial.save();
        res.json({ message: 'Obra Social desactivada correctamente' });
    } catch (error) {
        console.error('Error al desactivar Obra Social: ', error);
        res.status(500).json({ message: 'Error al desactivar Obra Social' });
    }
}

exports.mostrarCrearOS = async (req, res) => {
    try {
        res.render('pages/obraSocialViews/crearObraSocial');
    } catch (error) {
        console.error('Error al mostrar la creación de Obra Social: ', error);
        res.status(500).json({ message: "Error al mostrar 'Crear'" });
    }
}

exports.crearOS = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { nombre_os, planes } = req.body;

        // Parsear 'planes' en caso de que esté en formato JSON
        const planesArray = JSON.parse(planes); // Esto convierte la cadena JSON en un arreglo.

        const obraSocial = await ObraSocial.create({ nombre_os }, { transaction });
        
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }

        // Verificar si los planes son un arreglo y agregar cada uno
        if (Array.isArray(planesArray)) {
            for (const plan of planesArray) {
                let planExistente = await Plan.findOne({ where: { plan: plan }, transaction });

                if (!planExistente) {
                    const nuevoPlan = await Plan.create({ plan: plan }, { transaction });
                    await obraSocial_plan.create({ id_os: obraSocial.id_os, id_plan: nuevoPlan.id_plan }, { transaction });
                } else {
                    await obraSocial_plan.create({ id_os: obraSocial.id_os, id_plan: planExistente.id_plan }, { transaction });
                }
            }
        }

        // Commit de la transacción
        await transaction.commit();
        res.redirect('/obraSocial');
    } catch (error) {
        // Rollback en caso de error
        await transaction.rollback();
        console.error('Error al crear Obra Social: ', error);
        res.status(500).json({ message: 'Error al crear Obra Social' });
    }
};

exports.mostrarActualizarOS = async (req, res) => {
    try {
        const { id_os } = req.params;

        const obraSocial_plans = await ObraSocial_Plan.findAll({ where: { id_os: id_os } });
        
        let planes = [];

        for (const plan of obraSocial_plans) {
            const planActual = await Plan.findByPk(plan.id_plan);
            planes.push(planActual.plan);
        }


        const obraSocial = await ObraSocial.findByPk(id_os);
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }
        res.render('pages/obraSocialViews/editarObraSocial', { obraSocial, planes });
    } catch (error) {
        console.error('Error al mostrar la actualización de Obra Social: ', error);
        res.status(500).json({ message: 'Error al mostrar la actualización de Obra Social' });
    }
};

exports.actualizarOS = async (req, res) => {
    try {
        const { id_os, planes } = req.params;
        const { nombre_os } = req.body;
        const obraSocial = await ObraSocial.findByPk(id_os);
        if (!obraSocial) {
            return res.status(404).json({ message: 'Obra Social no encontrada' });
        }
        const planesArray = planes;

        await obraSocial_plan.destroy({ where: { id_os: id_os } });
        if (Array.isArray(planesArray)) {
            for (const plan of planesArray) {
                let planExistente = await Plan.findOne({ where: { plan: plan } });
                if (!planExistente) {
                    const nuevoPlan = await Plan.create({ plan: plan });
                    await obraSocial_plan.create({ id_os: id_os, id_plan: nuevoPlan.id_plan });
                } else {
                    await obraSocial_plan.create({ id_os: id_os, id_plan: planExistente.id_plan });
                }
            }
        }
        obraSocial.nombre_os = nombre_os;
        await obraSocial.save();
        res.redirect('/obraSocial');
    } catch (error) {
        console.error('Error al actualizar Obra Social: ', error);
        res.status(500).json({ message: 'Error al actualizar Obra Social' });
    }
};
