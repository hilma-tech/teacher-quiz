'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      userName: 'admin',
      code: '546656',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'lala',
      code: '9876545',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'baz',
      code: '34665',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
