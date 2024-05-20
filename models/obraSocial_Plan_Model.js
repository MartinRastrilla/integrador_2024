const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const ObraSocial = require('./obrasocialModel');
const Plan = require('./planModel');


const ObraSocial_Plan = sequelize.define('ObraSocial_Plan', {
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
      primaryKey: true,
      references: {
        model: Plan,
        key: 'id_plan'
      }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  }, {
    tableName: 'ObraSocial_Plan'
  });

ObraSocial.belongsToMany(Plan, { through: ObraSocial_Plan, foreignKey: 'id_os' });
Plan.belongsToMany(ObraSocial, { through: ObraSocial_Plan, foreignKey: 'id_plan' });

module.exports = ObraSocial_Plan;
