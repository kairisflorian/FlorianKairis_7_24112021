const db = require("../models");
const ROLES = db.ROLES;
const Users = db.users;

/*
// Vérification de l'unicité du nom d'utilisateur et de l'adresse email 
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Users.findOne({
    where: {
      username: req.body.username
    }
  }).then((users) => {
    // Si le nom d'utilisateur est déjà pris, on renvoie un message d'erreur   
    if (users) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then((users) => {
      // Si l'adresse email est déja utilisée, on renvoie un message d'erreur   
      if (users) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
};
*/

// Vérification de l'existence du rôle
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Echec: Le rôle n'existe pas = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  //checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;