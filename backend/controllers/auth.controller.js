//liaison avec la base de données.
const db = require("../models/connectionDb");
//validator permet de vérifier les champs renseignés.
const validator = require('validator');
//bcrypt permet de hasher le mot de passe de l'utilisateur.
const bcrypt = require('bcrypt');
//jwt permet de générer un token afin d'authentifier les requêtes des utilisateurs.
const jwt = require('jsonwebtoken');







//inscription (le corps de la requete contient le pseudo, l'email et le mot de passe. En réponse, on reçoit l'id unique généré).
module.exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userDatas = [req.body.pseudo, req.body.email, hash];
            if(validator.isEmail(req.body.email)) {
                db.query('INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)', userDatas, (err, results, fields) => {
                    if(!err) {
                        res.status(201).json({ userId: results.insertId, pseudo: req.body.pseudo });
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

//connexion.
module.exports.signIn = (req, res) => {
    db.query('SELECT * FROM users WHERE pseudo = ?', req.body.pseudo, (err, results, fields) => {
        if(!err) {
            bcrypt.compare(req.body.password, results[0].password, (error, response) => {
                if(response) {
                    res.status(200).json({
                        id: results[0].id,
                        pseudo: results[0].pseudo,
                        email: results[0].email,
                        token: jwt.sign(
                            { id: results[0].id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        message: `L'utilisateur ${req.body.pseudo} est bien connecté.`
                    });
                    console.log("Utilisateur connecté.");
                } else {
                    res.json({
                        err: "Mauvaise combinaison pseudo/mdp."
                    });
                    console.log("Mauvaise combinaison pseudo/mdp.");
                }
            })
        } else {
            res.send({ message: "L'utilisateur n'existe pas dans la base de données." })
        }
    });
}