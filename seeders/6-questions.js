'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('questions', [{
      quest: 'what is the color of the sky?',
      answer: "blue",
      csId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quest: "what is the color of tree?",
      answer: "brown",
      csId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
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
