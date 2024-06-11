const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudio = sequelize.define('Estudio', {
    id_estudio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_estudio: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue:true,
        allowNull: false
    }
}, {
    tableName: 'Estudios'
});

module.exports = Estudio;