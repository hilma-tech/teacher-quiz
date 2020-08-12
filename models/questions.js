'use strict';

module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
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
    tableName: 'questions',
    validate: {
      bothCoordsOrNone: function () {
        if ((this.aText === null) && (this.record === null)) {
          throw new Error('Require aText or record')
        }
      }
    }
  });


  Questions.associate = function ({ Questionnaires }) {

    Questions.belongsTo(Questionnaires, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'questionnaireId',
        allowNull: false
      }
    });
  };


  return Questions;
};