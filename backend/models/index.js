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
db.answers = require("./answers.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.posts = require("./posts.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.roles = require("./roles.model.js")(sequelize, Sequelize);

// Relation One-to-many utilisateur et posts
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// Relation One-to-many utilisateur et commentaires
db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

// Relation One-to-many utilisateur et réponses
db.users.hasMany(db.answers);
db.answers.belongsTo(db.users);

// Relation One-to-many post et commentaires
db.posts.hasMany(db.comments);
db.comments.belongsTo(db.posts);

// Relation One-to-many commentaire et réponses
db.comments.hasMany(db.answers);
db.answers.belongsTo(db.posts);

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
