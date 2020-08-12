'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student_Questionnaires = sequelize.define('Student_Questionnaires', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: 'student_questionnaires',
    timestamps: false
  });

  Student_Questionnaires.associate = function ({ User, Questionnaires }) {
    User.belongsToMany(Questionnaires, {
      through: 'student_questionnaires',
      foreignKey: 'studentId'
    });

    Questionnaires.belongsToMany(User, {
      through: 'student_questionnaires',
      foreignKey: 'questionnaireId'
    });
  };

  return Student_Questionnaires;
};