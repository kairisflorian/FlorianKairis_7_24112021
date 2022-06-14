const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

//////////// Controlleurs pour tester l'authentification /////////////////////

exports.allAccess = (req, res) => {
    res.status(200).send("Contenu publique.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Contenu de l'utilisateur.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Contenu de l'admin.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Contenu du modérateur.");
};


////////////// Modification des informations des utilisateurs ////////////////////////


// Récupérer les infos d'un utilisateur
exports.getUser = (req, res) => {
    const id = req.auth.id;
    Users.findByPk(id)
      .then((data) => {
        if (data) {
          console.log(data);
          res.status(200).send({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName
          });
        } else {
          res.status(404).send({
            message: `Impossible de récupérer les infos de l'utilisateur id=${id}.`
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Erreur lors de la récupérations des infos de l'user avec l' id=" + id
        });
    });
};

// Update infos utilisateur
exports.updateUser = (req, res) => {
    const id = req.auth.id;
    Users.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }, { where: { id: id } })
    .then((data) => {
        if (data) {
            res.status(200).send({
                message: "Informations mises à jour"
            });
            console.log(data);;
        } else {
            res.send({
                message: "Impossible de modifier les informations de l'utilisateur"
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Erreur lors de la modification."
        });
    });
};













/*
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

//mettre à jour le pseudo et l'email d'un utilisateur.
module.exports.updateUser = (req, res) => {
    db.query('UPDATE users SET pseudo = ?, email = ? WHERE id = ?', [req.body.pseudo, req.body.email, req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Pseudo et email mis à jour.");
            res.status(200).json({ id: req.params.id, pseudo: req.body.pseudo, email: req.body.email });
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
*/