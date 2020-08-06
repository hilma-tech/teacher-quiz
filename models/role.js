'use strict';

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  }, {
    tableName: 'Role',
    timestamps: false
  });


  // class Role extends CustomModel { }

  // Role.init({
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   },
  //   name: {
  //     type: DataTypes.STRING(11),
  //     allowNull: false
  //   }
  // }, {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'Role', // We need to choose the model name
  //   tableName: 'Role',
  //   timestamps: false
  // });

  Role.associate = function (models) { };

  return Role;
};