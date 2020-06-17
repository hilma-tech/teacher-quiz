'use strict';
//stock_challenge_id, teacher_id   vvv

let CustomModel = require('../modelBase');

module.exports = (sequelize, DataTypes) => {
  // const Challenges = sequelize.define('Challenges', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   }
  // }, { tableName: 'challenges' });



  class Challenges extends CustomModel { }

  Challenges.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Challenges', // We need to choose the model name
    tableName: 'challenges'
  });




  Challenges.associate = function (models) {
    // associations can be defined here
    const {
      Answers, Questions,
      ChallengeStock, User
    } = models;

    Challenges.hasMany(Answers);
    Challenges.hasMany(Questions);

    Challenges.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

    Challenges.belongsTo(ChallengeStock, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };




  return Challenges;
};









// Challenges.hello = (num) => {
//   return `hello, do you like the number ${num}?`;
// }

// Challenges.greet = (name) => {
//   return `hello ${name}`;
// }

// Challenges.tags = ['challenge']

// Challenges.routes = {
//   '/hello': [{
//     method: "hello",
//     op: 'get',
//     parameters: [
//       {
//         name: 'num',
//         in: "query",
//         required: true,
//         schema: {
//           type: 'string'
//         }
//       }
//     ],
//   }],

//   '/greet': {
//     method: 'greet',
//     op: 'post',
//     requestBody: {
//       schema: {
//         type: "string"
//       }
//     }
//   }
// }




