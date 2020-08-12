'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes',
      [{ name: '4th' },
      { name: '5th' },
      { name: '6th' }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};
