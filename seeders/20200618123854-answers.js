'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('answers', [{
        answer: 'what is your fav color?',
        score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        QuestionId: 1,
        ChallengeId: 1
      }], {});
      */

    return queryInterface.bulkInsert('answers', [{
      answer: 'what is your fav color?',
      score: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      QuestionId: 1,
      ChallengeId: 1
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
