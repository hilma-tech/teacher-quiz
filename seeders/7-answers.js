'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('studentAnswers', [{
      answer: 'blue',
      score: 100,
      studentId: 1,
      questId: 1,
      questionnaireId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      answer: 'yellow',
      score: 0,
      studentId: 1,
      questId: 2,
      questionnaireId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('studentAnswers', null, {});
  }
};
