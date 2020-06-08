'use strict';
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
  }, {});
  Role.associate = function (models) {
    // associations can be defined here
    const { RoleMapping } = models;

    RoleMapping.hasMany(RoleMapping);
  };
  return Role;
};