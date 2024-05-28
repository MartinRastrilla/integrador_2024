const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Familia = sequelize.define('Familia', {
    id_Familia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    familia: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    tableName:'Familias'
});

module.exports = Familia;