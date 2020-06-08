'use strict';
//roleId, userId
module.exports = (sequelize, DataTypes) => {
  const RoleMapping = sequelize.define('RoleMapping', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {});
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