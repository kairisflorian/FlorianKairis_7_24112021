const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Users = db.users;

// Vérification de l'existence du token et de sa validité


verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    const id = decodedToken.id;
    req.auth = { id };
    if (req.body.id && req.body.id == id) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


// Vérification du rôle administrateur
isAdmin = (req, res, next) => {
  Users.findByPk(req.userId).then((users) => {
    users.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Rôle d'administrateur requis !"
      });
      return;
    });
  });
};

// Vérification du rôle modérateur
isModerator = (req, res, next) => {
  Users.findByPk(req.userId).then((users) => {
    users.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Rôle de modérateur requis !"
      });
    });
  });
};

// Vérification du rôle modérateur ou administrateur 
isModeratorOrAdmin = (req, res, next) => {
  Users.findByPk(req.userId).then((users) => {
    users.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Rôle modérateur ou administrateur requis !"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;