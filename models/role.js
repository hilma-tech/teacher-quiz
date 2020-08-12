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
  }, {
    tableName: 'Role',
    timestamps: false
  });


  Role.associate = function (models) { };

  return Role;
};