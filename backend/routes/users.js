const express = require("express");
const Router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

//authentification
Router.post("/register", authController.signUp); 
Router.post("/login", authController.signIn);

//base de données utilisateurs
Router.get("/", userController.getAllUsers);
Router.get("/:id", auth, userController.userInfo);
Router.put("/:id", auth, userController.updateUser);
Router.delete("/:id", userController.deleteUser);

module.exports = Router;