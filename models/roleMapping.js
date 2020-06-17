'use strict';
//roleId, userId

let CustomModel = require('../modelBase');

module.exports = (sequelize, DataTypes) => {
  // const RoleMapping = sequelize.define('RoleMapping', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   }
  // }, {});





  class RoleMapping extends CustomModel { }

  RoleMapping.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'RoleMapping' // We need to choose the model name
  });






  RoleMapping.associate = function (models) {
    // associations can be defined here
    const { Role, User } = models;

    RoleMapping.belongsTo(Role, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

    RoleMapping.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };



  return RoleMapping;
};