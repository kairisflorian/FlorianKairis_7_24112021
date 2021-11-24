//connexion à mysql
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "A7*fc00a7",
    database: "groupomania",
    multipleStatements: true
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL !");
});

module.exports = db;