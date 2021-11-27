const db = require("../models/connectionDb");
//validator permet de vérifier l'adresse email renseignée.
const validator = require('validator');

//inscription
module.exports.signUp = (req, res) => {
    let userDatas = [req.body.pseudo, req.body.email, req.body.password];
    if(validator.isEmail(req.body.email)) {
        db.query('INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)', userDatas, (err, results, fields) => {
            if(!err) {
                res.status(201).json({ userId: results.insertId });
            } else {
                res.status(200).send({ err });
            }
        });
    } else {
        console.log('Adresse email invalide');
        res.status(200).send({ erreur: "l'adresse email ne respecte pas les conditions" })
    };
};

