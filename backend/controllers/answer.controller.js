//liaison avec la base de données.
const db = require('../models/connectionDb');

//Création d'une réponse
module.exports.createAnswer = (req, res) => {
    const answerDatas = [req.body.content, req.body.user_id, req.body.comment_id, req.params.id];
    db.query('INSERT INTO answers (content, user_id, comment_id) VALUES (?, ?, ?) WHERE id = ?',answerDatas, (err, results, fields) => {
        if(!err) {
            console.log('Réponse créee.');
            res.status(201).send(results);
        }
        else {
            console.log('Erreur lors de la création de la réponse');
            res.status(500).send({ erreur: "La réponse n'a pas pu être crée." })
        }
    })
}
//Récupération d'une réponse
module.exports.getAnswer = (req, res) => {
    db.query('SELECT answers.id, answers.content, users.pseudo, users.id FROM answers JOIN comments ON comments.id = answers.comment_id JOIN users ON users.id = posts.user_id WHERE id = ?',
    [req.params.id]),
    (err, results, fields) => {
        if(!err) {
            console.log("Récupération d'une réponse");
            res.status(200).send(results);
        }    
        else {
            console.log("Erreur lors de la récupération d'une réponse");
            res.status(500).json({ err });
        }
    }
}
//Modification d'une réponse
module.exports.updateAnswer = (req, res) => {
    db.query('UPDATE answers SET content = ? WHERE id = ?', [req.body.content, req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Réponse mise à jour");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la mise à jour d'une réponse");
            res.status(400).json({ erreur: "Erreur lors de la modification de la réponse" });
        }
    })
}
//Suppression d'un commentaire
module.exports.deleteAnswer = (req, res) => {
    db.query('DELETE FROM answers where id = ?', [req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Réponse supprimée");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la suppression de la réponse");
            res.status(400).json({ erreur: "Erreur lors de la suppression de la réponse" });
        }
    })
}