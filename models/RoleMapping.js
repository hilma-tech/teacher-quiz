'use strict';

let CustomModel = require('./CustomModel');

module.exports = (sequelize, DataTypes) => {

    class RoleMapping extends CustomModel { }

    RoleMapping.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'RoleMapping', // We need to choose the model name
        tableName: 'RoleMapping',
        timestamps: false
    });

    RoleMapping.associate = function (models) {
        // associations can be defined here
        const { Role, User } = models;

        User.belongsToMany(Role, {
            through: 'RoleMapping',
            foreignKey: 'userId'
        });

        Role.belongsToMany(User, {
            through: 'RoleMapping',
            foreignKey: 'roleId'
        });
    };



    return RoleMapping;
};