const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profesion = sequelize.define('Profesion', {
    id_profesion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_profesion: {
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
    tableName:'Profesiones'
});

module.exports = Profesion;