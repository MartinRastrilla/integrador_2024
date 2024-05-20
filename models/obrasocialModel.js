const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ObraSocial = sequelize.define('obras_sociale', {
    id_os: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_os: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    tableName:'ObrasSociales'
});

module.exports = ObraSocial;