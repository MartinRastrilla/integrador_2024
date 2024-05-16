const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento',{
    id_medicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre_generico: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    concentracion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    forma_farmaceutica: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    cant_u: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    familia: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['nombre_generico', 'concentracion', 'forma_farmaceutica'],
      },
    ],
  }
);

module.exports = Medicamento;