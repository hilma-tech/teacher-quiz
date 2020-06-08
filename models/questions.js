'use strict';

//challenge_id
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    quest: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    aText: {
      type: DataTypes.TEXT
    },
    record: {
      type: DataTypes.STRING
    }

  }, {
    tableName: 'questions',
    validate: {
      bothCoordsOrNone: function () {
        if ((this.aText === null) && (this.record === null)) {
          throw new Error('Require aText or record')
        }
      }
    }

  });
  Questions.associate = function (models) {
    // associations can be defined here
    const { Answers, Challenges } = models;

    // Questions.hasMany(Answers);?????
    Questions.belongsTo(Challenges, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

  };
  return Questions;
};