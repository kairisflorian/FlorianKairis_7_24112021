const express = require("express");
const Router = express.Router();
const bd = require("../connection");

Router.get("/", (req, res) => {
    bd.query("SELECT * FROM users", (err, rows, fields) => {
        if(!err) {
            res.send(rows);
        } 
        else {
            console.log(err);
        }
    })
})

module.exports = Router;