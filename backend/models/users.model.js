module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 20]
            },
            unique: true
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