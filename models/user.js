'use strict';

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {


  const User = sequelize.define('User', {
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
    tableName: 'user'
  });

  // class User extends CustomModel { }

  // User.init({
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
  //   code: {
  //     type: DataTypes.STRING(512),
  //     allowNull: false
  //   }
  // }, {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'User', // We need to choose the model name
  //   tableName: 'user'
  // });

  User.associate = function (models) {
    // associations can be defined here
    const { Answers, Challenges, ChallengeStock } = models

    User.hasMany(Answers, { foreignKey: 'studentId' });
    User.hasMany(Challenges, { foreignKey: 'teacherId' });
    User.hasMany(ChallengeStock, { foreignKey: 'creatorId' });
  };



  User.check = async (req) => {
    let users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    return lala;
  }

  User.routes = {
    '/check': [{
      method: 'check',
      op: 'get'
    }]
  }

  return User;
};