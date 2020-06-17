'use strict';

let CustomModel = require('../modelBase');

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   },
  //   userName: {
  //     type: DataTypes.STRING(512),
  //     allowNull: false
  //   },
  //   IDcode: {
  //     type: DataTypes.STRING(512),
  //     allowNull: false
  //   }
  // },
  //   { tableName: 'user' });


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
    IDcode: {
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
    const { Answers, Challenges, ChallengeStock, User } = models

    User.hasMany(Answers);
    User.hasMany(Challenges);
    User.hasMany(ChallengeStock);
    User.hasMany(User);

  };



  return User;
};