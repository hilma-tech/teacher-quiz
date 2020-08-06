'use strict';

let CustomModel = require('./CustomModel');

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

  // class Classes extends CustomModel { }

  // Classes.init({
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   },
  //   name: {
  //     type: DataTypes.STRING(11)
  //   }
  // }, {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'Classes', // We need to choose the model name
  //   tableName: 'classes',
  //   timestamps: false
  // });


  Classes.associate = function (models) {
    // associations can be defined here
  };

  return Classes;
};