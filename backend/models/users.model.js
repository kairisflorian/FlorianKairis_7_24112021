module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        firstName: {
            type:Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 25],
                    msg: "Le prénom doit être composé d'au moins 2 et d'au plus 25 caractères."
                },
                notEmpty: true
            }
        },
        lastName: {
            type:Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 25],
                    msg: "Le nom de famille doit être composé d'au moins 2 et d'au plus 25 caractères."
                },
                notEmpty: true
            }
        },
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
        }
    });
    return Users;
};