const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Forma_farmaceutica = sequelize.define('Forma_farmaceutica', {
    id_forma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    forma_farmaceutica: {
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
    tableName:'Formas_farmaceuticas'
});

module.exports = Forma_farmaceutica;