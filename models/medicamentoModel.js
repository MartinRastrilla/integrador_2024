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
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: false,
    },
    nombre_comercial: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },{tableName: 'Medicamentos'});

module.exports = Medicamento;