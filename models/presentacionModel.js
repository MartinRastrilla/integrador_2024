const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Medicamento = require('../models/medicamentoModel');
const Forma_farmaceutica = require('../models/forma_farmaceuticaModel');
const Concentracion = require('../models/concentracionModel');
const Categoria = require('../models/categoriaModel');
const Familia = require('../models/familiaModel');

const Presentacion = sequelize.define('Presentacion', {
  id_presentacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_medicamento: {
    type: DataTypes.INTEGER,
    references: {
      model: Medicamento,
      key: 'id_medicamento'
    }
  },
  id_forma: {
    type: DataTypes.INTEGER,
    references: {
      model: Forma_farmaceutica,
      key: 'id_forma'
    }
  },
  concentracion: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  u_medida: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  cantidad_u: {
    type: DataTypes.INTEGER
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  id_familia: {
    type: DataTypes.INTEGER,
    references: {
      model: Familia,
      key: 'id_familia'
    }
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Presentaciones',
  indexes: [
    {
      unique: true,
      fields: [
        'id_medicamento', 'id_forma', 'concentracion', 'u_medida', 'cantidad_u', 'id_categoria', 'id_familia'
      ],
      name: 'unique_presentacion'
    }
  ]
});

module.exports = Presentacion;