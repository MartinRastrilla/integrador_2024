const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Estudio = require('./estudioModel');
const Prescripcion = require('./prescripcionModel');

const Prestacion = sequelize.define('Prestacion', {
    id_prestacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_estudio: {
        type: DataTypes.INTEGER,
        references: {
            model: Estudio,
            key: 'id_estudio'
        },
        allowNull:false
    },
    id_prescripcion: {
        type: DataTypes.INTEGER,
        references: {
            model: Prescripcion,
            key: 'id_prescripcion'
        },
        allowNull:false
    },
    lado: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    indicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    justificacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Prestaciones'
});

Prestacion.belongsTo(Estudio, { foreignKey: 'id_estudio', as:'Estudio' });
Estudio.hasMany(Prestacion,{ foreignKey: 'id_estudio', as:'Prestaciones' });


Prescripcion.hasMany(Prestacion,{ foreignKey: 'id_prescripcion', as:'Prestacion' });
Prestacion.belongsTo(Prescripcion, { foreignKey: 'id_prescripcion' });


module.exports = Prestacion;