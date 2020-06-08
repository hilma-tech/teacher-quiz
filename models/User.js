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
    IDcode: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  },
    { tableName: 'user' });
  User.associate = function (models) {
    // associations can be defined here
    const { Answers, Challenges, ChallengeStock, User } = models

    User.hasMany(Answers);
    User.hasMany(Challenges);
    User.hasMany(ChallengeStock);
    User.hasMany(User);

  };
  return User;
};