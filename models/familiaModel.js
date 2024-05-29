const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Familia = sequelize.define('Familia', {
    id_familia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    familia: {
        type: DataTypes.STRING(50),
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