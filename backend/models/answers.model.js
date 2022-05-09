module.exports = (sequelize, Sequelize) => {
    const Answers = sequelize.define("answers", {
        content: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    });
    return Answers;
}