'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

    return queryInterface.bulkInsert('answers', [{
      answer: 'blue',
      score: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: 1,
      questId: 1,
      challengeId: 1
    },
    {
      answer: 'yellow',
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: 1,
      questId: 2,
      challengeId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
