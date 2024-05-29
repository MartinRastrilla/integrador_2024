const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('../models/categoriaModel');
const Familia = require('../models/familiaModel');

const Categoria_Familia = sequelize.define('Categoria_Familia', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Categoria,
        key: 'id_categoria'
      }
    },
    id_familia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Familia,
        key: 'id_familia'
      }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
  }, {
    tableName: 'Categoria_Familia',
    indexes: [
        {
            unique: true,
            fields: ['id_categoria', 'id_familia']
        }
    ]
  });

Categoria.belongsToMany(Familia, { through: Categoria_Familia, foreignKey: 'id_categoria' });
Familia.belongsToMany(Categoria, { through: Categoria_Familia, foreignKey: 'id_familia' });

module.exports = Categoria_Familia;