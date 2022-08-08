const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles.
db.posts = require("./posts.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);
db.likes = require("./likes.model.js")(sequelize, Sequelize);

// Relation One-to-many utilisateur et posts
db.users.hasMany(db.posts, { as: "posts" });
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Relation One-to-many utilisateur et like
db.users.hasMany(db.likes, { as: "likes" });
db.likes.belongsTo(db.users, { foreignKey: "userId", as: "user" });

//Relation One-to-many post et like
db.posts.hasMany(db.likes, { as: "likes" });
db.likes.belongsTo(db.posts, { foreignKey: "postId", as: "post" });


// Relation Many-to-Many utilisateur et role
db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
