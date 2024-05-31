const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Prestacion = sequelize.define('Prestacion', {
    id_prestacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estudio: {
        type: DataTypes.STRING(60),
        unique: true,
        allowNull: false
    },
    lado: {
        type: DataTypes.STRING(60),
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
    tableName: 'Prestaciones',
    timestamps: false
});

module.exports = Prestacion;