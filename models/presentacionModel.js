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
    },
    allowNull:false
  },
  id_forma: {
    type: DataTypes.INTEGER,
    references: {
      model: Forma_farmaceutica,
      key: 'id_forma'
    },
    allowNull:false
  },
  concentracion: {
    type: DataTypes.DECIMAL(8,2),
    allowNull: false
  },
  u_medida: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  cantidad_u: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria'
    },
    allowNull:false
  },
  id_familia: {
    type: DataTypes.INTEGER,
    references: {
      model: Familia,
      key: 'id_familia'
    },
    allowNull:false
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

Presentacion.belongsTo(Medicamento, { foreignKey: 'id_medicamento' });
Presentacion.belongsTo(Forma_farmaceutica, { foreignKey: 'id_forma' });
Presentacion.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Presentacion.belongsTo(Familia, { foreignKey: 'id_familia' });

module.exports = Presentacion;