const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener tu configuración de Sequelize correctamente

const Plan = sequelize.define('Plan', {
    id_plan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    detalle: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    tableName: 'Planes'
});

module.exports = Plan;