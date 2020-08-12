'use strict';

module.exports = (sequelize, DataTypes) => {
  const StudentAnswers = sequelize.define('StudentAnswers', {
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
    tableName: 'studentAnswers'
  });

  StudentAnswers.associate = function ({ User, Questions, Questionnaires }) {

    StudentAnswers.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'studentId',
        allowNull: false
      }
    });

    StudentAnswers.belongsTo(Questions, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'questId',
        allowNull: false
      }
    })

    StudentAnswers.belongsTo(Questionnaires, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'questionnaireId',
        allowNull: false
      }
    })
  };


  StudentAnswers.helloAyelet = () => {
    return 'hello ayelet!!!'

  }
  StudentAnswers.nice = (req) => {
    return 'nice'
  }


  StudentAnswers.routes = {
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


  return StudentAnswers;
};