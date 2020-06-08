'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.createTable('classes_challengeStock',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },

        classId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'classes',
            key: 'id'
          }
        },

        challengeStockId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'challengeStock',
            key: 'id'
          }
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.dropTable('classes_challengeStock');
  }
};
