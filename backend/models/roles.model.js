module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING
        }
    });
    return Roles;
};