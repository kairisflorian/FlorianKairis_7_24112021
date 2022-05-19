module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        firstName: {
            type:Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 25],
            }
        },
        lastName: {
            type:Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 25],
            }
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    });
    return Users;
};