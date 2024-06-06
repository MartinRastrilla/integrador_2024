const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

const Profesional = sequelize.define('Profesional', {
  id_profesional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

Profesional.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Profesional; 

