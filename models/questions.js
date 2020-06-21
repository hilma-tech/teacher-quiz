'use strict';

//challenge_id

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {

  class Questions extends CustomModel { }

  Questions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    quest: {
      type: DataTypes.TEXT
    },
    answer: {
      type: DataTypes.TEXT
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Questions', // We need to choose the model name
    tableName: 'questions',
    validate: {
      bothCoordsOrNone: function () {
        if ((this.aText === null) && (this.record === null)) {
          throw new Error('Require aText or record')
        }
      }
    }
  });

  Questions.associate = function (models) {
    // associations can be defined here
    const { ChallengeStock } = models;

    Questions.belongsTo(ChallengeStock, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'csId',
        allowNull: false
      }
    });
  };


  return Questions;
};