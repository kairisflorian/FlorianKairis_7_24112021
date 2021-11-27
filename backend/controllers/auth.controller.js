//liaison avec la base de données.
const db = require("../models/connectionDb");
//validator permet de vérifier les champs renseignés.
const validator = require('validator');
//bcrypt permet de hasher le mot de passe renseigné.
const bcrypt = require('bcrypt');



//inscription (le corps de la requete contient le pseudo, l'email et le mot de passe. En réponse, on reçoit l'id unique généré).
module.exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userDatas = [req.body.pseudo, req.body.email, hash];
            if(validator.isEmail(req.body.email)) {
                db.query('INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)', userDatas, (err, results, fields) => {
                    if(!err) {
                        res.status(201).json({ userId: results.insertId });
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

