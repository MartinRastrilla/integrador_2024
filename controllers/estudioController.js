const Estudio = require('../models/estudioModel');

exports.mostrarEstudio = async (req,res) => {
    try {
        const estudios = await Estudio.findAll({where:{activo:true}});
        res.render('pages/estudioViews/estudio', {estudios});
    } catch (error) {
        console.error('Error al mostrar la creación de Estudios: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear'"});
    }
}

exports.crearEstudio = async (req,res) => {
    try {
        const {nombre_estudio} = req.body;
        await Estudio.create({nombre_estudio});
        res.redirect('/estudios');
    } catch (error) {
        console.error('Error al mostrar la creación de Estudios: ', error);
        res.status(500).json({message: "Error al mostrar 'Crear'"});
    }
}