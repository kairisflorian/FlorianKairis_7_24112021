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
    username: req.body.username,
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
      username: req.body.username
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
      var token = jwt.sign({ id: users.id }, config.secret, {
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
          username: users.username,
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









/*
//liaison avec la base de données.
const db = require("../models/connectionDb");
//validator permet de vérifier les champs renseignés.
const validator = require('validator');
//bcrypt permet de hasher le mot de passe de l'utilisateur.
const bcrypt = require('bcrypt');
//jwt permet de générer un token afin d'authentifier les requêtes des utilisateurs.
const jwt = require('jsonwebtoken');


//inscription (le corps de la requete contient le pseudo, l'email et le mot de passe. En réponse, on reçoit l'id unique généré).
module.exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userDatas = [req.body.pseudo, req.body.email, hash];
            if(validator.isEmail(req.body.email)) {
                db.query('INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)', userDatas, (err, results, fields) => {
                    if(!err) {
                        res.status(201).json({ userId: results.insertId, pseudo: req.body.pseudo });
                        console.log("utilisateur crée.")
                    } else {
                        res.status(200).json({ err });
                    }
                });
            } else {
                console.log('Adresse email invalide.');
                res.status(500).send({ erreur: "l'adresse email n'est pas conforme aux conditions." })
            };
        })
        .catch(error => res.status(500).json({ error }));
};

//connexion.
module.exports.signIn = (req, res) => {
    db.query('SELECT * FROM users WHERE pseudo = ?', req.body.pseudo, (err, results, fields) => {
        if(!err) {
            bcrypt.compare(req.body.password, results[0].password, (error, response) => {
                if(response) {
                    res.status(200).json({
                        id: results[0].id,
                        pseudo: results[0].pseudo,
                        email: results[0].email,
                        token: jwt.sign(
                            { id: results[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        message: `L'utilisateur ${req.body.pseudo} est bien connecté.`
                    });
                    console.log("Utilisateur connecté.");
                } else {
                    res.json({
                        err: "Mauvaise combinaison pseudo/mdp."
                    });
                    console.log("Mauvaise combinaison pseudo/mdp.");
                }
            })
        } else {
            res.send({ message: "L'utilisateur n'existe pas dans la base de données." })
        }
    });
}
*/