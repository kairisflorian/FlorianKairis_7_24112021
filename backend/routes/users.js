const bodyParser = require("body-parser");
const express = require("express");
const Router = express.Router();
const db = require("../models/connectionDb");

Router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, results, fields) => {
        if(!err) {
            res.send(results);
        } 
        else {
            console.log(err);
        }
    })
})

//Création d'un nouvel utilisateur
Router.post("/", (req, res) => {
    let userDatas = [req.body.pseudo, req.body.email, req.body.password];
    db.query('INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)', userDatas, (err, results, fields) => {
        if(!err) {
            res.send('Utilisateur crée');
        } else {
            res.json(err);
        }
    });
});



module.exports = Router;