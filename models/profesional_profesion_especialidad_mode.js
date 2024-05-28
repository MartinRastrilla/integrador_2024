const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profesional = require('./profesionalModel');
const Profesion = require('./profesionModel');
const Especialidad = require('./especialidadModel');

const Dr_Prof_Esp = sequelize.define('Dr_Prof_Esp', {
    id_profesional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Profesional,
        key: 'id_profesional'
      }
    },
    id_profesion: {
      type: DataTypes.INTEGER,
      references: {
        model: Profesion,
        key: 'id_profesion'
      }
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      references: {
        model: Especialidad,
        key: 'id_especialidad'
      }
    }
  }, {
    tableName: 'Dr_Prof_Esp',
    indexes: [
      {
        unique: true,
        fields: ['id_profesional', 'id_especialidad']
      }
    ]
  });
  
  Profesional.belongsToMany(Especialidad, { through: Dr_Prof_Esp, foreignKey: 'id_profesional', otherKey: 'id_especialidad' });
  Especialidad.belongsToMany(Profesional, { through: Dr_Prof_Esp, foreignKey: 'id_especialidad', otherKey: 'id_profesional' });
  

module.exports = Dr_Prof_Esp;