const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medico = sequelize.define('Medico', {
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_refeps: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  nombre_medico: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  apellido_medico: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  documento_medico: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  profesion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  domicilio: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  matricula: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: true
  },
  caducidad: {
    type: DataTypes.DATE,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Medico; 