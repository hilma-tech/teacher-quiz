'use strict';

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {


    const Student_Challenges = sequelize.define('Student_Challenges', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
      }, {
        tableName: 'student_challenges',
        timestamps: false
      });

    // class Student_Challenges extends CustomModel { }

    // Student_Challenges.init({
    //     id: {
    //         type: DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true,
    //         allowNull: false
    //     }
    // }, {
    //     // Other model options go here
    //     sequelize, // We need to pass the connection instance
    //     modelName: 'Student_Challenges', // We need to choose the model name
    //     tableName: 'student_challenges',
    //     timestamps: false
    // });

    Student_Challenges.associate = function (models) {
        // associations can be defined here
        const { Challenges, User } = models;

        User.belongsToMany(Challenges, {
            through: 'Student_Challenges',
            foreignKey: 'studentId'
        });

        Challenges.belongsToMany(User, {
            through: 'Student_Challenges',
            foreignKey: 'challengeId'
        });
    };



    return Student_Challenges;
};