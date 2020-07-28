'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('user', [{
      // id:-1,
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('user', null, {});
  }
};
