const express = require("express");
const Router = express.Router();
const authController = require('../controllers/auth.controller');


Router.post("/register", authController.signUp); 


module.exports = Router;