const ObraSocial = require('../models/obrasocialModel');
const Plan = require('../models/planModel');
const ObraSocial_Plan = require('../models/obraSocial_Plan_Model');

const Rol = require('../models/rolModel');
const Profesion = require('../models/profesionModel');
const Especilidad = require('../models/especialidadModel');
const Prof_Esp = require('../models/profesion_especialidad_Model')

const Categoria = require('../models/categoriaModel');
const Familia = require('../models/familiaModel');
const Forma_farmaceutica = require('../models/forma_farmaceuticaModel');
const Medicamento = require('../models/medicamentoModel');


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
        //VETERINARIO, MÉDICO, ODONTÓLOGO
        const profesiones = [
            {nombre_profesion: 'Médico'},
            {nombre_profesion: 'Veterinario'},
            {nombre_profesion: 'Odontólogo'}
        ];

        for (const profesionData of profesiones) {
            const [profesion, created] = await Profesion.findOrCreate({
                where: {nombre_profesion: profesionData.nombre_profesion},
                defaults: profesionData,
                transaction
            });
            if (created) {
                console.log(`Profesión ${profesionData.nombre_profesion} agregada.`);
            }
        }

        const especialidades = [
            {nombre_especialidad: 'Cardiología'},
            {nombre_especialidad: 'Gastroenterología'},
            {nombre_especialidad: 'Neurología'},
            {nombre_especialidad: 'Ginecología'},
            {nombre_especialidad: 'Psiquiatría'},
            {nombre_especialidad: 'Oncología'},
            {nombre_especialidad: 'Odontología'},
            {nombre_especialidad: 'Veterinaria'}
        ];

        for (const espData of especialidades) {
            const [especialidad, created] = await Especilidad.findOrCreate({
                where: {nombre_especialidad: espData.nombre_especialidad},
                defaults: espData,
                transaction
            });
            if (created) {
                console.log(`Especialidad ${espData.nombre_especialidad} agregada.`);
            }
        }

        const profEspRelations = [
            {profesion:'Médico', especialidad:'Cardiología'},
            {profesion:'Médico', especialidad:'Gastroenterología'},
            {profesion:'Médico', especialidad:'Neurología'},
            {profesion:'Médico', especialidad:'Ginecología'},
            {profesion:'Médico', especialidad:'Psiquiatría'},
            {profesion:'Médico', especialidad:'Oncología'},
            {profesion:'Veterinario', especialidad:'Veterinaria'},
            {profesion:'Odontólogo', especialidad:'Odontología'},
        ];

        for (const relationData of profEspRelations) {
            const profesion = await Profesion.findOne({where: {nombre_profesion: relationData.profesion}, transaction});
            const especialidad = await Especilidad.findOne({where: {nombre_especialidad: relationData.especialidad}, transaction});
            if (profesion && especialidad) {
                await Prof_Esp.findOrCreate({
                    where: {
                        id_profesion: profesion.id_profesion,
                        id_especialidad: especialidad.id_especialidad
                    },
                    transaction
                });
            }
        }

        const categorias = [
            {categoria: 'Aparato Digestivo'},
            {categoria: 'Nutriología'},
            {categoria: 'Cardiovascular'},
            {categoria: 'Sistema Nervioso'},
            {categoria: 'Aparato Respiratorio'},
            {categoria: 'Sistema Endocrino'},
            {categoria: 'Infecciones'},
            {categoria: 'Sistema Inmunológico'}
        ];

        for (const categoriaData of categorias) {
            const [categoria, created] = await Categoria.findOrCreate({
                where: {categoria: categoriaData.categoria},
                defaults: categoriaData,
                transaction
            });
            if (created) {
                console.log(`Categoria ${categoriaData.categoria} agregada.`);
            }
        }

        const familias = [
            //Digestivo
            {familia: 'Antiácido'},
            {familia: 'Antiemético'},
            {familia: 'Laxante'},
            //Nutriología
            {familia: 'Suplemento Vitamínico'},
            {familia: 'Suplemento Nutricional'},
            //Cardiovascular
            {familia: 'Antihipertensivo'},
            {familia: 'Antianginoso'},
            {familia: 'Anticoagulante'},
            //Sistema Nervioso
            {familia: 'Analgésico'},
            {familia: 'Antidepresivo'},
            {familia: 'Antiepiléptico'},
            //Aparato Respiratorio
            {familia: 'Broncodilatador'},
            {familia: 'Antihistamínico'},
            {familia: 'Antitusivo'},
            //Sistema Endocrino
            {familia: 'Antidiabético'},
            {familia: 'Hormona Tiroidea'},
            {familia: 'Corticosteroide'},
            //Infecciones
            {familia: 'Antibiótico'},
            {familia: 'Antiviral'},
            {familia: 'Antifúngico'},
            //Sistema inmunológico
            {familia: 'Inmunosupresor'},
            {familia: 'Inmunoestimulante'}
        ];

        for (const familiaData of familias) {
            const [familia, created] = await Familia.findOrCreate({
                where: {familia: familiaData.familia},
                defaults: familiaData,
                transaction
            });
            if (created) {
                console.log(`Familia ${familiaData.familia} agregada.`);
            }
        }

        const formas_farmaceuticas = [
            {forma_farmaceutica: 'Cápsula'},
            {forma_farmaceutica: 'Inyectable'},
            {forma_farmaceutica: 'Supositorio'},
            {forma_farmaceutica: 'Gotas'},
            {forma_farmaceutica: 'Jarabe'},
            {forma_farmaceutica: 'Parche'},
            {forma_farmaceutica: 'Tableta'},
            {forma_farmaceutica: 'Solución Oral'},
            {forma_farmaceutica: 'Inhalador'},
            {forma_farmaceutica: 'Crema'},
            {forma_farmaceutica: 'Polvo'},
            {forma_farmaceutica: 'Líquido'}
        ];

        for (const formaData of formas_farmaceuticas) {
            const [forma_farmaceutica, created] = await Forma_farmaceutica.findOrCreate({
                where: {forma_farmaceutica: formaData.forma_farmaceutica},
                defaults: formaData,
                transaction
            });
            if (created) {
                console.log(`Forma Farmacéutica ${forma_farmaceutica.forma_farmaceutica} agregada.`);
            }
        }

        const medicamentos = [
            //Antiácido
            {nombre_generico: 'Hidróxido de Magnesio', nombre_comercial: 'Leche de Magnesia'},
            {nombre_generico: 'Hidróxido de aluminio', nombre_comercial: 'Maalox'},
            //Antieméticos
            {nombre_generico: 'Ondasetrón', nombre_comercial: 'Zofran'},
            {nombre_generico: 'Metoclopramida', nombre_comercial: 'Reglan'},
            //Laxante
            {nombre_generico: 'Bisacodilo', nombre_comercial: 'Dulcolax'},
            {nombre_generico: 'Lactulosa', nombre_comercial: 'Duphalac'},
            //Suplementos vitamínicos
            {nombre_generico: 'Vitamina D(colecalciferol)', nombre_comercial: 'Calciferol'},
            {nombre_generico: 'Sulfato de Hierro', nombre_comercial: 'Feosol'},
            //Suplementos nutricionales
            {nombre_generico: 'Fórmula enteral', nombre_comercial: 'Ensure'},
            {nombre_generico: 'Suplemento Proteico', nombre_comercial: 'Whey Protein'},
            //Antihipertensivo
            {nombre_generico: 'Enalapril', nombre_comercial: 'Vasotec'},
            {nombre_generico: 'Losartán', nombre_comercial: 'Cozaar'},
            //Antianginosos
            {nombre_generico: 'Nitroglicerina', nombre_comercial: 'Nitrostat'},
            {nombre_generico: 'Isosorbida dinitrato', nombre_comercial: 'Isordil'},
            //Anticoagulante
            {nombre_generico: 'Warfarina', nombre_comercial: 'Coumadin'},
            {nombre_generico: 'Enoxaparina', nombre_comercial: 'Lovenox'},
            //Analgésico
            {nombre_generico: 'Paracetamol', nombre_comercial: 'Panadol'},
            {nombre_generico: 'Ibuprofeno', nombre_comercial: 'Actron'},
            //Antidepresivo
            {nombre_generico: 'Fluoxetina', nombre_comercial: 'Prozac'},
            {nombre_generico: 'Amitriptilina', nombre_comercial: 'Elavil'},
            //Antiepiléptico
            {nombre_generico: 'Carbamazepina', nombre_comercial: 'Tegretol'},
            {nombre_generico: 'Valproato de sodio', nombre_comercial: 'Depakene'},
            //Broncodilatadores
            {nombre_generico: 'Salbutamol (Albuterol)', nombre_comercial: 'Ventolin'},
            {nombre_generico: 'Ipratropio', nombre_comercial: 'Atrovent'},
            //Antihistamínicos
            {nombre_generico: 'Loratadina', nombre_comercial: 'Claritin'},
            {nombre_generico: 'Cetirizina', nombre_comercial: 'Zyrtec'},
            //Antitusivo
            {nombre_generico: 'Dextrometorfano', nombre_comercial: 'Robitussin'},
            {nombre_generico: 'Codeína', nombre_comercial: 'Cheratussin AC'},
            //Antidiabético
            {nombre_generico: 'Metformina', nombre_comercial: 'Glumetza'},
            {nombre_generico: 'Insulina', nombre_comercial: 'Novolin (regular)'},
            //Hormona Tiroidea
            {nombre_generico: 'Levotiroxina', nombre_comercial: 'Synthroid'},
            //Corticosteroide
            {nombre_generico: 'Prednisona', nombre_comercial: 'Deltasone'},
            {nombre_generico: 'Dexametasona', nombre_comercial: 'Decadron'},
            //Antibiótico
            {nombre_generico: 'Amoxicilina', nombre_comercial: 'Amoxil'},
            {nombre_generico: 'Ciprofloxacino', nombre_comercial: 'Cipro'},
            //Antiviral
            {nombre_generico: 'Aciclovir', nombre_comercial: 'Zovirax'},
            {nombre_generico: 'Oseltamivir', nombre_comercial: 'Tamiflu'},
            //Antifúngico
            {nombre_generico: 'Fluconazol', nombre_comercial: 'Diflucan'},
            {nombre_generico: 'Nistatina', nombre_comercial: 'Mycostatin'},
            //Inmunosupresor
            {nombre_generico: 'Ciclosporina', nombre_comercial: 'Neoral'},
            {nombre_generico: 'Metotrexato', nombre_comercial: 'Trexall'},
            //Inmunoestimulante
            {nombre_generico: 'Interferón alfa', nombre_comercial: 'Intron A'}
        ];

        for (const medicamentoData of medicamentos) {
            const [medicamento, created] = await Medicamento.findOrCreate({
                where: {nombre_generico: medicamentoData.nombre_generico},
                defaults: medicamentoData,
                transaction
            });
            if (created) {
                console.log(`Forma Farmacéutica ${medicamento.nombre_generico} agregada.`);
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