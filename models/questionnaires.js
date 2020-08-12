'use strict';

module.exports = (sequelize, DataTypes) => {
  const Questionnaires = sequelize.define('Questionnaires', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    tableName: 'questionnaires'
  });

  Questionnaires.associate = function ({ StudentAnswers, User }) {

    Questionnaires.hasMany(StudentAnswers, { foreignKey: 'questionnaireId' });

    Questionnaires.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: {
        name: 'teacherId',
        allowNull: false
      }
    });
  };


  Questionnaires.hello = (req) => {
    return { dats: 'gfgfg' }
  }

  Questionnaires.routes = {
    '/hello': [{
      method: 'hello',
      op: 'get',
      responses: {
        200: {
          description: `default response in class`
        }
      }
    }]
  }


  return Questionnaires;
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
//     ]
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




