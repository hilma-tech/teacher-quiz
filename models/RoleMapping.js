'use strict';


module.exports = (sequelize, DataTypes) => {

    const RoleMapping = sequelize.define('RoleMapping', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        }
      }, {
        tableName: 'RoleMapping',
        timestamps: false
      });

    RoleMapping.associate = function ({ Role, User }) {

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