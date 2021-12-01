const express = require("express");
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//authentification
Router.post("/register", authController.signUp); 
Router.post("/login", authController.signIn);
//Router.get("/logout", authController.logOut);

//base de données utilisateurs
Router.get("/", userController.getAllUsers);
Router.get("/:id", userController.userInfo);
Router.put("/:id", userController.updateUser);
Router.delete("/:id", userController.deleteUser);

module.exports = Router;