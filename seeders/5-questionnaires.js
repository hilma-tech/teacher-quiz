'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('questionnaires', [{
      name: 'colors',
      teacherId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('questionnaires', null, {});
  }
};
