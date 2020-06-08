'use strict';
//stock_challenge_id, teacher_id   vvv
module.exports = (sequelize, DataTypes) => {
  const Challenges = sequelize.define('Challenges', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, { tableName: 'challenges' });
  Challenges.associate = function (models) {
    // associations can be defined here
    const {
      Answers, Questions,
      StockChallenge, User
    } = models;

    Challenges.hasMany(Answers);
    Challenges.hasMany(Questions);

    Challenges.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

    Challenges.belongsTo(challengeStock, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });


  };
  return Challenges;
};