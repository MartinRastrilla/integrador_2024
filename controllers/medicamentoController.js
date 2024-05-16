const Medicamento = require('../models/medicamentoModel');

exports.crearMedicamento = async (req,res) => {
    try {
        const { nombre_generico, concentracion, forma_farmaceutica, cant_u, categoria, familia } = req.body;
        const medicamento = await Medicamento.create({
            nombre_generico,
            concentracion,
            forma_farmaceutica,
            cant_u,
            categoria,
            familia
        });
        res.status(201).json({message:"Medicamento Agregado", medicamento});
    } catch (error) {
        console.error("Error al agregar medicamento: ", error);
        res.status(500).json({message:"Error al agregar medicamento."})
    }
};