const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Profesional = sequelize.define('Profesional', {
  id_user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  id_refeps: {
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
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  caducidad: {
    type: DataTypes.DATE,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
});

module.exports = Profesional; 