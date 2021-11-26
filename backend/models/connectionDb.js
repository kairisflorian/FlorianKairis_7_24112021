//connexion à mysql
const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "groupomania",
    multipleStatements: true
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL Groupomania !");
});

module.exports = db;