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
      ChallengeStock, User
    } = models;

    Challenges.hasMany(Answers);
    Challenges.hasMany(Questions);

    Challenges.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

    Challenges.belongsTo(ChallengeStock, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });
  };


  Challenge.remoteMethod = {
    path: '',
    op: '',
    params: {
      in: '',
      name: '',
      schema: {

      },
      required: true
    }
  }

  Challenge.schema = {
    challenge:{
      type:
    }

  }





  return Challenges;
};





Groups.remoteMethod('updateExistGroupInfo', {
  http: {
    path: '/updateExistGroupInfo',
    verb: 'post'
  },
  accepts: [
    {
      arg: 'info', type: 'object', 'http': {
        'source': 'body'
      }
    }
  ],
  returns: { type: 'object', root: true }
});