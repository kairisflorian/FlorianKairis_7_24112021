//liaison avec la base de données.
const db = require('../models/connectionDb');

//Création d'un post
module.exports.createPost = (req, res) => {
    db.query('INSERT INTO post (content, user) VALUES (?, ?)')
}