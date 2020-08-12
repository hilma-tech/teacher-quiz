'use strict';

module.exports = (sequelize, DataTypes) => {
  const Questionnaires_Classes = sequelize.define('Questionnaires_Classes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'questionnaires_classes',
    timestamps: false
  });

  Questionnaires_Classes.associate = function ({
    Classes, Questionnaires
  }) {
    Classes.belongsToMany(Questionnaires, {
      through: 'Questionnaires_Classes',
      foreignKey: 'classId'
    });

    Questionnaires.belongsToMany(Classes, {
      through: 'Questionnaires_Classes',
      foreignKey: 'questionnaireId'
    });
  };

  return Questionnaires_Classes;
};