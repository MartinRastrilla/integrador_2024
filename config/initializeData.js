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
const Categoria_Familia = require('../models/categoria_familiaModel');

const sequelize = require('./database');
const Presentacion = require('../models/presentacionModel');

const initializeData = async () => {
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
            //Aparato Digestivo
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

        const catFamRelations = [
            //Aparato Aparato Digestivo
            {categoria:'Aparato Digestivo', familia:'Antiácido'},
            {categoria:'Aparato Digestivo', familia:'Antiemético'},
            {categoria:'Aparato Digestivo', familia:'Laxante'},
            //Nutriología
            {categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {categoria:'Nutriología', familia:'Suplemento Nutricional'},
            //Cardiovascular
            {categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {categoria:'Cardiovascular', familia:'Antianginoso'},
            {categoria:'Cardiovascular', familia:'Anticoagulante'},
            //Sistema Nervioso
            {categoria:'Sistema Nervioso', familia:'Analgésico'},
            {categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            //Aparato Respiratorio
            {categoria:'Aparato Respiratorio', familia:'Broncodilatador'},
            {categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            //Sistema Endocrino
            {categoria:'Sistema Endocrino', familia:'Antidiabético'},
            {categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            //Infecciones
            {categoria:'Infecciones', familia:'Antibiótico'},
            {categoria:'Infecciones', familia:'Antiviral'},
            {categoria:'Infecciones', familia:'Antifúngico'},
            //Sistema Inmunológico
            {categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {categoria:'Sistema Inmunológico', familia:'Inmunoestimulante'}
        ];

        for (const relation of catFamRelations) {
            const categoria = await Categoria.findOne({where: {categoria: relation.categoria}, transaction});
            const familia = await Familia.findOne({where: {familia: relation.familia}, transaction});
            if (categoria && familia) {
                await Categoria_Familia.findOrCreate({
                    where: {
                        id_categoria: categoria.id_categoria,
                        id_familia: familia.id_familia
                    },
                    transaction
                });
            }else{
                console.error(`No se encontró la categoría o familia para: ${relation.categoria} - ${relation.familia}`);
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
            {forma_farmaceutica: 'Líquido'},
            {forma_farmaceutica: 'Suspensión Oral'}
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
            {nombre_generico: 'Ondansetrón', nombre_comercial: 'Zofran'},
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

        const presentaciones = [
            {medicamento:'Hidróxido de Magnesio',forma_farmaceutica:'Suspensión Oral', concentracion:'400',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antiácidos'},
            {medicamento:'Hidróxido de Magnesio',forma_farmaceutica:'Suspensión Oral', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Digestivo', familia:'Antiácidos'},
            {medicamento:'Hidróxido de aluminio',forma_farmaceutica:'Tableta', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antiácidos'},
            {medicamento:'Hidróxido de aluminio',forma_farmaceutica:'Suspensión Oral', concentracion:'320',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antiácidos'},
            {medicamento:'Hidróxido de aluminio',forma_farmaceutica:'Suspensión Oral', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Digestivo', familia:'Antiácidos'},
            {medicamento:'Ondansetrón',forma_farmaceutica:'Tableta', concentracion:'4',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antieméticos'},
            {medicamento:'Ondansetrón',forma_farmaceutica:'Tableta', concentracion:'8',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antieméticos'},
            {medicamento:'Ondansetrón',forma_farmaceutica:'Inyectable', concentracion:'8',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antieméticos'},
            {medicamento:'Metoclopramida',forma_farmaceutica:'Inyectable', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antieméticos'},
            {medicamento:'Metoclopramida',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Antieméticos'},
            {medicamento:'Bisacodilo',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Laxante'},
            {medicamento:'Bisacodilo',forma_farmaceutica:'Supositorio', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Digestivo', familia:'Laxante'},
            {medicamento:'Lactulosa',forma_farmaceutica:'Solución Oral', concentracion:'10',u_medida:'g', cant_u:'', categoria:'Aparato Digestivo', familia:'Laxante'},
            {medicamento:'Lactulosa',forma_farmaceutica:'Solución Oral', concentracion:'15',u_medida:'ml', cant_u:'', categoria:'Aparato Digestivo', familia:'Laxante'},
            {medicamento:'Vitamina D(colecalciferol)',forma_farmaceutica:'Cápsula', concentracion:'1000',u_medida:'IU', cant_u:'', categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {medicamento:'Vitamina D(colecalciferol)',forma_farmaceutica:'Cápsula', concentracion:'400',u_medida:'IU', cant_u:'', categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {medicamento:'Vitamina D(colecalciferol)',forma_farmaceutica:'Cápsula', concentracion:'50000',u_medida:'IU', cant_u:'', categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {medicamento:'Sulfato de Hierro',forma_farmaceutica:'Tableta', concentracion:'325',u_medida:'mg', cant_u:'', categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {medicamento:'Sulfato de Hierro',forma_farmaceutica:'Jarabe', concentracion:'325',u_medida:'mg', cant_u:'', categoria:'Nutriología', familia:'Suplemento Vitamínico'},
            {medicamento:'Fórmula enteral',forma_farmaceutica:'Líquido', concentracion:'0',u_medida:'Varía', cant_u:'', categoria:'Nutriología', familia:'Suplemento Nutricional'},
            {medicamento:'Suplemento Proteico',forma_farmaceutica:'Polvo', concentracion:'30',u_medida:'g', cant_u:'', categoria:'Nutriología', familia:'Suplemento Nutricional'},
            {medicamento:'Enalapril',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Enalapril',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Enalapril',forma_farmaceutica:'Tableta', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Losartán',forma_farmaceutica:'Tableta', concentracion:'25',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Losartán',forma_farmaceutica:'Tableta', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Losartán',forma_farmaceutica:'Tableta', concentracion:'100',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antihipertensivo'},
            {medicamento:'Nitroglicerina',forma_farmaceutica:'Tableta', concentracion:'0.3',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Nitroglicerina',forma_farmaceutica:'Tableta', concentracion:'0.4',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Nitroglicerina',forma_farmaceutica:'Tableta', concentracion:'0.6',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Nitroglicerina',forma_farmaceutica:'Parche', concentracion:'0.2',u_medida:'mg/h', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Nitroglicerina',forma_farmaceutica:'Parche', concentracion:'0.4',u_medida:'mg/h', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Tableta', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Tableta', concentracion:'40',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Cápsula', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Cápsula', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Cápsula', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Isosorbida dinitrato',forma_farmaceutica:'Cápsula', concentracion:'40',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Antianginoso'},
            {medicamento:'Warfarina',forma_farmaceutica:'Tableta', concentracion:'1',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Warfarina',forma_farmaceutica:'Tableta', concentracion:'2',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Warfarina',forma_farmaceutica:'Tableta', concentracion:'2.5',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Warfarina',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Warfarina',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'30',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'40',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'60',u_medida:'mg', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'0.3',u_medida:'ml', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'0.4',u_medida:'ml', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Enoxaparina',forma_farmaceutica:'Inyectable', concentracion:'0.6',u_medida:'ml', cant_u:'', categoria:'Cardiovascular', familia:'Anticoagulante'},
            {medicamento:'Paracetamol',forma_farmaceutica:'Tableta', concentracion:'325',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Paracetamol',forma_farmaceutica:'Tableta', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Paracetamol',forma_farmaceutica:'Tableta', concentracion:'650',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Paracetamol',forma_farmaceutica:'Jarabe', concentracion:'160',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Paracetamol',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Tableta', concentracion:'200',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Tableta', concentracion:'400',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Tableta', concentracion:'600',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Tableta', concentracion:'800',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Cápsula', concentracion:'200',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Cápsula', concentracion:'400',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Cápsula', concentracion:'600',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Ibuprofeno',forma_farmaceutica:'Cápsula', concentracion:'800',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Analgésico'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Cápsula', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Cápsula', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Cápsula', concentracion:'40',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Tableta', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Fluoxetina',forma_farmaceutica:'Tableta', concentracion:'40',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'25',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'75',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'100',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'125',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Amitriptilina',forma_farmaceutica:'Tableta', concentracion:'150',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antidepresivo'},
            {medicamento:'Carbamazepina',forma_farmaceutica:'Tableta', concentracion:'200',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Carbamazepina',forma_farmaceutica:'Tableta', concentracion:'100',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Carbamazepina',forma_farmaceutica:'Suspensión Oral', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Valproato de sodio',forma_farmaceutica:'Cápsula', concentracion:'250',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Valproato de sodio',forma_farmaceutica:'Cápsula', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Valproato de sodio',forma_farmaceutica:'Inyectable', concentracion:'250',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Valproato de sodio',forma_farmaceutica:'Inyectable', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Sistema Nervioso', familia:'Antiepiléptico'},
            {medicamento:'Salbutamol (Albuterol)',forma_farmaceutica:'Inhalador', concentracion:'90',u_medida:'mcg/inhalación', cant_u:'', categoria:'Aparato Respiratorio', familia:'Broncodilatador'},
            {medicamento:'Ipratropio',forma_farmaceutica:'Inhalador', concentracion:'17',u_medida:'mcg/inhalación', cant_u:'', categoria:'Aparato Respiratorio', familia:'Broncodilatador'},
            {medicamento:'Loratadina',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Loratadina',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Loratadina',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Cetirizina',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Cetirizina',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Cetirizina',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antihistamínicos'},
            {medicamento:'Codeína',forma_farmaceutica:'Jarabe', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Codeína',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Codeína',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Codeína',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Dextrometorfano',forma_farmaceutica:'Jarabe', concentracion:'15',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Dextrometorfano',forma_farmaceutica:'Jarabe', concentracion:'5',u_medida:'ml', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Dextrometorfano',forma_farmaceutica:'Cápsula', concentracion:'30',u_medida:'mg', cant_u:'', categoria:'Aparato Respiratorio', familia:'Antitusivo'},
            {medicamento:'Metformina',forma_farmaceutica:'Tableta', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Antidiabético'},
            {medicamento:'Metformina',forma_farmaceutica:'Tableta', concentracion:'850',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Antidiabético'},
            {medicamento:'Metformina',forma_farmaceutica:'Tableta', concentracion:'1000',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Antidiabético'},
            {medicamento:'Insulina',forma_farmaceutica:'Inyectable', concentracion:'0',u_medida:'U/ml', cant_u:'', categoria:'Sistema Endocrino', familia:'Antidiabético'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'25',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'50',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'75',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'100',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'125',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Levotiroxina',forma_farmaceutica:'Tableta', concentracion:'150',u_medida:'mcg', cant_u:'', categoria:'Sistema Endocrino', familia:'Hormona Tiroidea'},
            {medicamento:'Prednisona',forma_farmaceutica:'Tableta', concentracion:'1',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Prednisona',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Prednisona',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Prednisona',forma_farmaceutica:'Tableta', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Prednisona',forma_farmaceutica:'Tableta', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Tableta', concentracion:'1',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Tableta', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Tableta', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Tableta', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Tableta', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Inyectable', concentracion:'1',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Inyectable', concentracion:'5',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Inyectable', concentracion:'10',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Inyectable', concentracion:'20',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Dexametasona',forma_farmaceutica:'Inyectable', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Sistema Endocrino', familia:'Corticosteroide'},
            {medicamento:'Amoxicilina',forma_farmaceutica:'Tableta', concentracion:'250',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Amoxicilina',forma_farmaceutica:'Tableta', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Amoxicilina',forma_farmaceutica:'Cápsula', concentracion:'250',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Amoxicilina',forma_farmaceutica:'Cápsula', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Ciprofloxacino',forma_farmaceutica:'Tableta', concentracion:'250',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Ciprofloxacino',forma_farmaceutica:'Tableta', concentracion:'500',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Ciprofloxacino',forma_farmaceutica:'Tableta', concentracion:'750',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antibiótico'},
            {medicamento:'Aciclovir',forma_farmaceutica:'Tableta', concentracion:'200',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Aciclovir',forma_farmaceutica:'Tableta', concentracion:'400',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Aciclovir',forma_farmaceutica:'Tableta', concentracion:'800',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Oseltamivir',forma_farmaceutica:'Cápsula', concentracion:'30',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Oseltamivir',forma_farmaceutica:'Cápsula', concentracion:'45',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Oseltamivir',forma_farmaceutica:'Cápsula', concentracion:'75',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antiviral'},
            {medicamento:'Fluconazol',forma_farmaceutica:'Cápsula', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antifúngico'},
            {medicamento:'Fluconazol',forma_farmaceutica:'Cápsula', concentracion:'100',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antifúngico'},
            {medicamento:'Fluconazol',forma_farmaceutica:'Cápsula', concentracion:'200',u_medida:'mg', cant_u:'', categoria:'Infecciones', familia:'Antifúngico'},
            {medicamento:'Nistatina',forma_farmaceutica:'Suspensión Oral', concentracion:'100000',u_medida:'U/ml', cant_u:'', categoria:'Infecciones', familia:'Antifúngico'},
            {medicamento:'Ciclosporina',forma_farmaceutica:'Cápsula', concentracion:'25',u_medida:'mg', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {medicamento:'Ciclosporina',forma_farmaceutica:'Cápsula', concentracion:'50',u_medida:'mg', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {medicamento:'Ciclosporina',forma_farmaceutica:'Cápsula', concentracion:'100',u_medida:'mg', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {medicamento:'Metotrexato',forma_farmaceutica:'Tableta', concentracion:'25',u_medida:'mg', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {medicamento:'Metotrexato',forma_farmaceutica:'Inyectable', concentracion:'2.5',u_medida:'mg', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunosupresor'},
            {medicamento:'Interferón alfa',forma_farmaceutica:'Inyectable', concentracion:'3',u_medida:'MIU', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunoestimulante'},
            {medicamento:'Interferón alfa',forma_farmaceutica:'Inyectable', concentracion:'6',u_medida:'MIU', cant_u:'', categoria:'Sistema Inmunológico', familia:'Inmunoestimulante'}
        ];
        for (const presentacionData of presentaciones) {
            try {
              const medicamento = await Medicamento.findOne({ where: { nombre_generico: presentacionData.medicamento }, transaction });
              const forma_farmaceutica = await Forma_farmaceutica.findOne({ where: { forma_farmaceutica: presentacionData.forma_farmaceutica }, transaction });
              const categoria = await Categoria.findOne({ where: { categoria: presentacionData.categoria }, transaction });
              const familia = await Familia.findOne({ where: { familia: presentacionData.familia }, transaction });
      
              if (medicamento && forma_farmaceutica && categoria && familia) {
                const existingPresentacion = await Presentacion.findOne({
                  where: {
                    id_medicamento: medicamento.id_medicamento,
                    id_forma: forma_farmaceutica.id_forma,
                    concentracion: presentacionData.concentracion,
                    u_medida: presentacionData.u_medida,
                    cantidad_u: presentacionData.cant_u,
                    id_categoria: categoria.id_categoria,
                    id_familia: familia.id_familia
                  },
                  transaction
                });
      
                if (!existingPresentacion) {
                  await Presentacion.create({
                    id_medicamento: medicamento.id_medicamento,
                    id_forma: forma_farmaceutica.id_forma,
                    concentracion: presentacionData.concentracion,
                    u_medida: presentacionData.u_medida,
                    cantidad_u: presentacionData.cant_u,
                    id_categoria: categoria.id_categoria,
                    id_familia: familia.id_familia,
                    activo: presentacionData.activo
                  }, { transaction });
                } else {
                  console.log(`Presentacion ya existe: ${JSON.stringify(presentacionData)}`);
                }
              } else {
                console.error(`No se encontró el medicamento, forma farmacéutica, categoría o familia para: ${JSON.stringify(presentacionData)}`);
              }
            } catch (error) {
              console.error(`Error al cargar presentacion: ${JSON.stringify(presentacionData)} - ${error.message}`);
              throw error;
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