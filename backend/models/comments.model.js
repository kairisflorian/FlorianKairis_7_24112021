module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        content: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    });
    return Comments;
}