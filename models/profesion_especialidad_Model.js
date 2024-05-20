const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profesion = require('./profesionModel');
const Especialidad = require('./especialidadModel');

const Profesion_especialidad = sequelize.define('Profesion_especialidad', {
    id_profesion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Profesion,
        key: 'id_profesion'
      }
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Especialidad,
        key: 'id_especialidad'
      }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  }, {
    tableName: 'Profesion_especialidad'
  });

Profesion.belongsToMany(Especialidad, { through: Profesion_especialidad, foreignKey: 'id_profesion' });
Especialidad.belongsToMany(Profesion, { through: Profesion_especialidad, foreignKey: 'id_especialidad' });

module.exports = Profesion_especialidad;