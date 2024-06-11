const Categoria = require('../models/categoriaModel');
const Familia = require('../models/familiaModel');
const Forma_farmaceutica = require('../models/forma_farmaceuticaModel');
const Medicamento = require('../models/medicamentoModel');
const sequelize = require('../config/database');
const Presentacion = require('../models/presentacionModel');

exports.mostrarCrearMedicamento = async (req,res) => {
    try {
        const formas_farmaceuticas = await Forma_farmaceutica.findAll({where: {activo:true}});
        const categorias = await Categoria.findAll({where:{activo:true}});
        res.render('pages/medicamentoViews/medicamentoCrear', {formas_farmaceuticas,categorias});
    } catch (error) {
        console.error('Error al mostrar la creación de Medicamentos: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear'"});
    }
}

exports.obtenerFamiliasPorCat = async (req,res) => {
    try {
        const {id_categoria} = req.params;
        const categoria = await Categoria.findByPk(id_categoria,{
            include:{
                model: Familia,
                through: { attributes: [] } 
            }
        });
        const familias = categoria ? categoria.Familia : [];
        res.json(familias);
    } catch (error) {
        console.error('Error al obtener familias: ', error);
        res.status(500).json({message: 'Error al obtener familias'});
    }
}

exports.crearMedicamento = async (req,res) => {
    const transaction = await sequelize.transaction();
    try {
        const { nombre_generico, nombre_comercial, id_forma, concentracion, u_medida, id_categoria, id_familia } = req.body;
        const medicamento = await Medicamento.create({
            nombre_generico,
            nombre_comercial
        },{transaction});
        const presentacion = await Presentacion.create({
            id_medicamento: medicamento.id_medicamento,
            id_forma,
            concentracion,
            u_medida,
            cantidad_u: 0,
            id_categoria,
            id_familia
        },{transaction});
        await transaction.commit();
        res.redirect('/medicamentos');
    } catch (error) {
        await transaction.rollback();
        console.error('Error al crear medicamento:', error);
        res.status(500).json({ message: "Error al crear medicamento" });
    }
}