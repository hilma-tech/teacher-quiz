'use strict';

let CustomModel = require('../modelBase');

module.exports = (sequelize, DataTypes) => {
  // const Role = sequelize.define('Role', {
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
  // }, {});


  class Role extends CustomModel { }

  Role.init({
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
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Role', // We need to choose the model name
    tableName: 'Role'
  });



  Role.associate = function (models) {
    // associations can be defined here
    const { RoleMapping } = models;

    RoleMapping.hasMany(RoleMapping);
  };


  return Role;
};