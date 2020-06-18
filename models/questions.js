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
    name: {
      type: DataTypes.STRING(11)
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
    const { Answers, Challenges } = models;

    // Questions.hasMany(Answers);?????
    Questions.belongsTo(Challenges, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };


  return Questions;
};