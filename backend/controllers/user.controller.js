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
              id: data.id,
              isAdmin: data.isAdmin
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










