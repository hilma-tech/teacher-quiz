'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('questionnaires_classes', [{
      classId: 1,
      questionnaireId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('questionnaires_classes', null, {});
  }
};
