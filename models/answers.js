'use strict';

let CustomModel = require('./CustomModel');
200
//student_id, quest_id, challenge_id  vvvvv
module.exports = (sequelize, DataTypes) => {

  class Answers extends CustomModel { }
  Answers.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Answers',// We need to choose the model name
    tableName: 'answers'
  });


  Answers.associate = function (models) {
    // associations can be defined here
    const { User, Questions, Challenges } = models;

    Answers.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'studentId',
        allowNull: false
      }
    });

    Answers.belongsTo(Questions, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'questId',
        allowNull: false
      }
    })

    Answers.belongsTo(Challenges, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'challengeId',
        allowNull: false
      }
    })
  };


  Answers.nice = (req) => {
    return 'nice'
  }


  Answers.routes = {
    '/nice': [{
      method: 'nice',
      op: 'get',
      responses: {
        200: {
          description: `default response in class `
        }
      }
    }]
  }



  return Answers;
};