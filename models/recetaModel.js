const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Prescripcion = require('./prescripcionModel');
const Presentacion = require('./presentacionModel');
const Prestacion = require('./prestacionModel');

const Receta = sequelize.define('Receta', {
    id_receta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_prescripcion: {
        type: DataTypes.INTEGER,
        references: {
            model: Prescripcion,
            key: 'id_prescripcion'
        },
        allowNull: false
    },
    id_presentacion: {
        type: DataTypes.INTEGER,
        references: {
            model: Presentacion,
            key: 'id_presentacion'
        },
        allowNull: false
    },
    id_prestacion: {
        type: DataTypes.INTEGER,
        references: {
            model: Prestacion,
            key: 'id_prestacion'
        },
        allowNull: false
    }
}, {
    tableName: 'Recetas',
    timestamps: false
});

Prescripcion.hasMany(Receta, { foreignKey: 'id_prescripcion' });
Receta.belongsTo(Prescripcion, { foreignKey: 'id_prescripcion' });

Presentacion.hasMany(Receta, { foreignKey: 'id_presentacion' });
Receta.belongsTo(Presentacion, { foreignKey: 'id_presentacion' });

Prestacion.hasMany(Receta, { foreignKey: 'id_prestacion' });
Receta.belongsTo(Prestacion, { foreignKey: 'id_prestacion' });

module.exports = Receta;