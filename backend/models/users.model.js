module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Adresse email non valide."
                },
                notEmpty: true
            },
            unique: true
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        isAdmin: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Users;
};