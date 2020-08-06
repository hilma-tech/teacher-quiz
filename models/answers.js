'use strict';

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {

  const Answers = sequelize.define('Answers', {
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
    modelName: 'Answers',
    tableName: 'answers'
    // Other model options go here
  });

  // class Answers extends CustomModel { }
  // Answers.init({
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   },
  //   answer: {
  //     type: DataTypes.TEXT
  //   },
  //   score: {
  //     type: DataTypes.INTEGER,
  //     defaultValue: 0
  //   }
  // }, {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'Answers',
  //   tableName: 'answers'
  // });

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


  Answers.helloAyelet = () => {
    return 'hello ayelet!!!'

  }
  Answers.nice = (req) => {
    return 'nice'
  }


  Answers.routes = {
    '/hello_ayelet': [{
      method: 'helloAyelet',
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