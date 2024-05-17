const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener tu configuración de Sequelize correctamente

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
});

module.exports = ObraSocial;