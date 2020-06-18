'use strict';
let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {

  class Classes_ChallengeStock extends CustomModel { }

  Classes_ChallengeStock.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Classes_ChallengeStock', // We need to choose the model name
    tableName: 'classes_challengeStock',
    timestamps: false
  });

  Classes_ChallengeStock.associate = function (models) {
    // associations can be defined here
    const { Classes, ChallengeStock } = models;

    Classes.belongsToMany(ChallengeStock, {
      through: 'Classes_ChallengeStock',
      foreignKey: 'classId'
    });

    ChallengeStock.belongsToMany(Classes, {
      through: 'Classes_ChallengeStock',
      foreignKey: 'csId'
    });
  };

  return Classes_ChallengeStock;
};