const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require("./pacienteModel");
const Profesional = require("./profesionalModel");


const ProfesionalPaciente = sequelize.define('ProfesionalPaciente', {
    id_profesional: {
      type: DataTypes.INTEGER,
      references: {
        model: Profesional,
        key: 'id_profesional'
      }
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      references: {
        model: Paciente,
        key: 'id_paciente'
      }
    }
  }, {
    tableName: 'profesional_paciente',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['id_paciente', 'id_profesional']
      }
    ]
  });

  ProfesionalPaciente.associate = (models) => {
    ProfesionalPaciente.belongsTo(models.Paciente, {
      foreignKey: 'id_paciente',
      targetKey: 'id_paciente'
    });
    ProfesionalPaciente.belongsTo(models.Profesional, {
      foreignKey: 'id_profesional',
      targetKey: 'id_profesional'
    });
  }
  
module.exports = ProfesionalPaciente;