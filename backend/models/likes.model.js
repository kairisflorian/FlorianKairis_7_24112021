module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", { 
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    });
    return Likes;
};