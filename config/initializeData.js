const ObraSocial = require('../models/obrasocialModel');
const Plan = require('../models/planModel');
const ObraSocial_Plan = require('../models/obraSocial_Plan_Model');
const Rol = require('../models/rolModel');
const sequelize = require('./database');

async function initializeData() {
    const transaction = await sequelize.transaction();
    try {
        

        const roles = [
            {rol_user:'Admin'},
            {rol_user:'Profesional'}
        ];
        for (const rolData of roles) {
            const [rol, created] = await Rol.findOrCreate({
                where: { rol_user: rolData.rol_user },
                defaults: rolData,
                transaction
            });
            if (created) {
                console.log(`Rol ${rolData.rol_user} creado.`);
            }
        }

        const obrasSociales = [
            { nombre_os: 'DOSEP' },
            { nombre_os: 'FEMESA' },
            { nombre_os: 'OSDE' },
            { nombre_os: 'DOSPU' },
            { nombre_os: 'GALENO' }
        ];
        for (const obraSocialData of obrasSociales) {
            const [obraSocial, created] = await ObraSocial.findOrCreate({
                where: { nombre_os: obraSocialData.nombre_os },
                defaults: obraSocialData,
                transaction
            });
            if (created) {
                console.log(`Obra Social ${obraSocialData.nombre_os} creada.`);
            }
        }

        const planes = [
            { plan: 'Básico', detalle: 'Plan con prestaciones básicas.' },
            { plan: 'Intermedio', detalle: 'Plan con prestaciones intermedias.' },
            { plan: 'Completo', detalle: 'Plan con todas las prestaciones.' },
            { plan: 'TOTAL', detalle: 'A su servicio, Jefe.' }
        ];
        for (const planData of planes) {
            const [plan,created] = await Plan.findOrCreate({
                where: { plan: planData.plan },
                defaults: planData,
                transaction
            });
            if (created) {
                console.log(`Plan ${planData.plan} creado.`);
            }
        }

        const obraSocialPlanRelations = [
            { obraSocial: 'DOSEP', plan: 'Básico' },
            { obraSocial: 'DOSEP', plan: 'Intermedio' },
            { obraSocial: 'DOSEP', plan: 'Completo' },
            { obraSocial: 'OSDE', plan: 'TOTAL' },
            { obraSocial: 'FEMESA', plan: 'Básico' },
            { obraSocial: 'FEMESA', plan: 'Intermedio' },
            { obraSocial: 'GALENO', plan: 'TOTAL' },
            { obraSocial: 'DOSPU', plan: 'Básico' },
            { obraSocial: 'GALENO', plan: 'Intermedio' },
        ];
        for (const relationData of obraSocialPlanRelations) {
            const obraSocial = await ObraSocial.findOne({ where: { nombre_os: relationData.obraSocial }, transaction });
            const plan = await Plan.findOne({ where: { plan: relationData.plan }, transaction });
            
            if (obraSocial && plan) {
                await ObraSocial_Plan.findOrCreate({
                    where: {
                        id_os: obraSocial.id_os,
                        id_plan: plan.id_plan
                    },
                    defaults: {
                        id_os: obraSocial.id_os,
                        id_plan: plan.id_plan
                    },
                    transaction
                });
            }
        }

        await transaction.commit();
        console.log('Datos predeterminados cargados.');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al inicializar datos predeterminados: ', error);
    }
}

module.exports = initializeData;