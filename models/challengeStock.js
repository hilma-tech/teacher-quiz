'use strict';
//creatorId=>teacher  vvv

let CustomModel = require('../modelBase');

module.exports = (sequelize, DataTypes) => {
  // const ChallengeStock = sequelize.define('ChallengeStock', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false
  //   },
  //   name: {
  //     type: DataTypes.STRING(512),
  //     allowNull: false
  //   }
  // }, { tableName: 'challengeStock' });



  class ChallengeStock extends CustomModel {}

ChallengeStock.init({
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
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'ChallengeStock', // We need to choose the model name
  tableName: 'challengeStock'
});



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