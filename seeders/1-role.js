'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role',
      [{
        name: 'ADMIN'
      },
      {
        name: 'TEACHER'
      },
      {
        name: 'STUDENT'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Role', null, {});
  }
};
