const express = require("express");
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//authentification
Router.post("/register", authController.signUp); 

//base de données utilisateurs
Router.get("/", userController.getAllUsers);
Router.get("/:id", userController.userInfo);

module.exports = Router;