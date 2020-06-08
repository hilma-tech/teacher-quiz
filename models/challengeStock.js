'use strict';
//creatorId=>teacher  vvv
module.exports = (sequelize, DataTypes) => {
  const ChallengeStock = sequelize.define('ChallengeStock', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, { tableName: 'challengeStock' });
  ChallengeStock.associate = function (models) {
    // associations can be defined here
    const { User, 
      Challenges } = models;

      ChallengeStock.hasMany(Challenges);

      ChallengeStock.belongsTo(User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: { allowNull: false }
      });
  };
  return ChallengeStock;
};