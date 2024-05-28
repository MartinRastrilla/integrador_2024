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
    id_concentracion: {
      type: DataTypes.INTEGER,
      references: {
        model: Concentracion,
        key: 'id_concentracion'
      }
    },
    u_medida: {
      type: DataTypes.STRING(10),
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
    tableName: 'Presentaciones'
  });
  
  Medicamento.belongsToMany(Categoria, { through: Presentacion, foreignKey: 'id_medicamento' });
  Categoria.belongsToMany(Medicamento, { through: Presentacion, foreignKey: 'id_categoria' });
  
  Medicamento.belongsToMany(Familia, { through: Presentacion, foreignKey: 'id_medicamento' });
  Familia.belongsToMany(Medicamento, { through: Presentacion, foreignKey: 'id_familia' });
  
  Medicamento.belongsToMany(Forma_farmaceutica, { through: Presentacion, foreignKey: 'id_medicamento' });
  Forma_farmaceutica.belongsToMany(Medicamento, { through: Presentacion, foreignKey: 'id_forma' });
  
  Medicamento.belongsToMany(Concentracion, { through: Presentacion, foreignKey: 'id_medicamento' });
  Concentracion.belongsToMany(Medicamento, { through: Presentacion, foreignKey: 'id_concentracion' });
  
  module.exports = Presentacion;