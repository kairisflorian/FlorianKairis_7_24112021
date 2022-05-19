const db = require("../models");
const config = require("../config/auth.config");

const Users = db.users;
const Roles = db.roles;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// Inscription
exports.signup = (req, res) => {
  // Enregistrement des utilisateurs dans la base de données (Users.create).
  Users.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // hachage du mdp
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(users => {
      if (req.body.roles) {
        Roles.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          users.setRoles(roles).then(() => {
            res.send({ message: "L'utilisateur a été crée avec succès !" });
          });
        });
      } else {
        // users roles = 1
        users.setRoles([1]).then(() => {
          res.send({ message: "L'utilisateur a été crée avec succès !" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Connexion
exports.signin = (req, res) => {
  // Recherche d'un utilisateur (Users.findOne)  
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: "L'utilisateur n'a pas été trouvé" });
      }
      // Comparaison du mot de passe entré avec celui haché dans la BDD.
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        users.password
      );
      // Si les mots de passe ne correspondent pas.... => pas de token attribué et message d'erreur
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide !"
        });
      }
      // création de la variable token
      var token = jwt.sign({ id: users.id, username: users.username, email: users.email }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      // Récupération du rôle (getRoles) 
      users.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        // La réponse envoyée : id, username, email, role et le token d'accès
        res.status(200).send({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};







