'use strict';

let CustomModel = require('./CustomModel');
let { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class User extends CustomModel { }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: 'user'
  });

  User.associate = function (models) {
    // associations can be defined here
    const { Answers, Challenges, ChallengeStock } = models

    User.hasMany(Answers, { foreignKey: 'studentId' });
    User.hasMany(Challenges, { foreignKey: 'teacherId' });
    User.hasMany(ChallengeStock, { foreignKey: 'creatorId' });
  };



  return User;
};