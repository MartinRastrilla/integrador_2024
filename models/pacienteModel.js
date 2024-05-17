const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente',{
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      apellido_paciente: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      documento_paciente: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      fecha_nac: {
        type: DataTypes.DATE,
        allowNull: false
      },
      sexo_paciente: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
});

module.exports = Paciente;