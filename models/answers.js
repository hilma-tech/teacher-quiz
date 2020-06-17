'use strict';

let CustomModel = require('../modelBase');

//student_id, quest_id, challenge_id  vvvvv
module.exports = (sequelize, DataTypes) => {
  // const Answers = sequelize.define('Answers', {
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
  //     type: DataTypes.INTEGER
  //   }
  // }, { tableName: 'answers' });


  class Answers extends CustomModel { }
  Answers.utiles.createDefCrudRoutes();
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
      type: DataTypes.INTEGER
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
      foreignKey: { allowNull: false }
    });

    Answers.belongsTo(Questions, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    })

    Answers.belongsTo(Challenges, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    })
  };





  return Answers;
};