module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("posts", {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 120]
            }
        },
        gif: {
            type: Sequelize.DataTypes.STRING
        }
    });
    return Posts;
}