const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const Rol = require('./rolModel');

const UserRol = sequelize.define('UserRol', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id_user'
      }
    },
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: Rol,
        key: 'id_rol'
      }
    }
  }, {
    tableName: 'UserRoles'
  });
  
  User.belongsToMany(Rol, { through: UserRol, foreignKey: 'id_user' });
  Rol.belongsToMany(User, { through: UserRol, foreignKey: 'id_rol' });
  
  module.exports = UserRol;
