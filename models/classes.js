'use strict';

module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define('Classes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(11)
    }
  }, {
    tableName: 'classes',
    timestamps: false
  });

  Classes.associate = function (models) {
  };

  return Classes;
};