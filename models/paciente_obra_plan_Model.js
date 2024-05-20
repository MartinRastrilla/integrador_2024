const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./pacienteModel');
const Plan = require('./planModel');
const ObraSocial = require('./obrasocialModel');
const ObraSocial_Plan = require('./obraSocial_Plan_Model');

const Paciente_ObraSocial_Plan = sequelize.define('Paciente_ObraSocial_Plan', {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Paciente,
        key: 'id_paciente'
      }
    },
    id_os: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: ObraSocial,
        key: 'id_os'
      }
    },
    id_plan: {
      type: DataTypes.INTEGER,
      references: {
        model: Plan,
        key: 'id_plan'
      }
    }
  }, {
    tableName: 'Paciente_ObraSocial_Plan',
    indexes: [
      {
        unique: true,
        fields: ['id_paciente', 'id_os']
      }
    ]
  });

Paciente.belongsToMany(ObraSocial, { through: Paciente_ObraSocial_Plan, foreignKey: 'id_paciente' });
ObraSocial.belongsToMany(Paciente, { through: Paciente_ObraSocial_Plan, foreignKey: 'id_os' });

ObraSocial.belongsToMany(Plan, { through: ObraSocial_Plan, foreignKey: 'id_os' });
Plan.belongsToMany(ObraSocial, { through: ObraSocial_Plan, foreignKey: 'id_plan' });

module.exports = Paciente_ObraSocial_Plan;