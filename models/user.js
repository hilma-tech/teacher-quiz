'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    tableName: 'user'
  });

  User.associate = function ({ StudentAnswers, Questionnaires }) {
    User.hasMany(StudentAnswers, { foreignKey: 'studentId' });
    User.hasMany(Questionnaires, { foreignKey: 'teacherId' });
  };



  User.check = async (req) => {
    let users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    return lala;
  }

  User.routes = {
    '/check': [{
      method: 'check',
      op: 'get'
    }]
  }

  return User;
};