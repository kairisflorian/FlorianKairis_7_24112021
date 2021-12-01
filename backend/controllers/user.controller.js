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

//récupérer les informations d'un utilisateur.
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

//mettre à jour le pseudo d'un utilisateur.
module.exports.updateUser = (req, res) => {
    db.query('UPDATE users SET pseudo = ? WHERE id = ?', [req.body.pseudo, req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Pseudo mis à jour.");
            res.status(200).json({ id: req.params.id, pseudo: req.body.pseudo });
        } else {
            console.log("Vous n'avez pas le droit de modifier ce pseudo");
            res.status(400).json({ message: "Vous n'avez pas le droit de modifier ce pseudo" });
        }
    })
};

//supprimer un utilisateur
module.exports.deleteUser = (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results, fields) => {
        if(!err) {
            console.log('Utilisateur supprimé');
            res.status(200).json({ message :"Utilisateur supprimé de la base de données." });
        } else {
            res.status(400).json({ err });
        }
    })
};