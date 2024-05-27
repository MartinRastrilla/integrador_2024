const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Concentracion = sequelize.define('Cocentracion', {
    id_concentracion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    concentracion: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    tableName:'Concentraciones'
});

module.exports = Concentracion;