'use strict';

//student_id, quest_id, challenge_id  vvvvv
module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define('Answers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.INTEGER
    }
  }, { tableName: 'answers' });
  Answers.associate = function (models) {
    // associations can be defined here
    const { User, Questions, Challenges } = models;
    
    Answers.belongsTo(User, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    });

    Answers.belongsTo(Questions, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    })

    Answers.belongsTo(Challenges, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      foreignKey: { allowNull: false }
    })

  };
  return Answers;
};