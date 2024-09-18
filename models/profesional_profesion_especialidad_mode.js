const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Profesional = require('./profesionalModel');
const Profesion = require('./profesionModel');
const Especialidad = require('./especialidadModel');

const Dr_Prof_Esp = sequelize.define('Dr_Prof_Esp', {
    id_profesional: {
      type: DataTypes.INTEGER,
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
        fields: ['id_profesional', 'id_profesion','id_especialidad']
      }
    ]
  });
  
  Profesion.hasMany(Dr_Prof_Esp, { foreignKey: 'id_profesion' });
  Profesional.hasMany(Dr_Prof_Esp, { foreignKey: 'id_profesional' });
  Especialidad.hasMany(Dr_Prof_Esp, { foreignKey: 'id_especialidad' });
  Dr_Prof_Esp.belongsTo(Profesion, { foreignKey: 'id_profesion' });
  Dr_Prof_Esp.belongsTo(Profesional, { foreignKey: 'id_profesional' });
  Dr_Prof_Esp.belongsTo(Especialidad, { foreignKey: 'id_especialidad' });
  Profesion.belongsToMany(Profesional, { through: Dr_Prof_Esp, foreignKey: 'id_profesion', otherKey: 'id_profesional' });
  Profesional.belongsToMany(Profesion, { through: Dr_Prof_Esp, foreignKey: 'id_profesional', otherKey: 'id_profesion' });
  Profesional.belongsToMany(Especialidad, { through: Dr_Prof_Esp, foreignKey: 'id_profesional', otherKey: 'id_especialidad' });
  Especialidad.belongsToMany(Profesional, { through: Dr_Prof_Esp, foreignKey: 'id_especialidad', otherKey: 'id_profesional' });
  

module.exports = Dr_Prof_Esp;