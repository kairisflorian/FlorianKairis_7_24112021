//liaison avec la base de données.
const db = require('../models/connectionDb');

//récupérer tous les utilisateurs.
module.exports.getAllUsers = (req, res) => {
    db.query('SELECT id, pseudo, email FROM users', (err, results, fields) => {
        if(!err) {
            console.log('Tous les utilisateurs récupérés.');
            res.status(200).send(results);
        } else {
            res.status(500).json({ err });
        }
    });
};

//récupérer les informations d'un seul utilisateur.
module.exports.userInfo = (req, res) => {
    db.query('SELECT id, pseudo, email FROM users WHERE id = ?', [req.params.id], (err, results, fields) => {
        if(!err && results != "") {
            console.log(`utilisateur ${req.params.id} récupéré.`);
            res.status(200).send(results);
        } else {
            console.log("L'id de cet utilisateur n'existe pas dans la base de données.")
            res.status(400).json({ message: `Id inconnu: ${req.params.id}`});
        }
    });
};