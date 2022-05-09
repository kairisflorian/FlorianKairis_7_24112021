//liaison avec la base de données.
const db = require('../models/connectionDb');

//Création d'un commentaire
module.exports.createComment = (req, res) => {
    const commentDatas = [req.body.content, req.body.user_id, req.body.post_id, req.params.id];
    db.query('INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?) WHERE id = ?',commentDatas, (err, results, fields) => {
        if(!err) {
            console.log('Commentaire crée.');
            res.status(201).send(results);
        }
        else {
            console.log('Erreur');
            res.status(500).send({ erreur: "Le commentaire n'a pas pu être crée." })
        }
    })
}
//Récupération d'un commentaire
module.exports.getComment = (req, res) => {
    db.query('SELECT comments.id, comments.content, users.pseudo, users.id FROM posts JOIN posts ON posts.id = comments.post_id JOIN users ON users.id = posts.user_id WHERE id = ?',
    [req.params.id]),
    (err, results, fields) => {
        if(!err) {
            console.log("Récupération d'un commentaire");
            res.status(200).send(results);
        }    
        else {
            console.log('Erreur lors de la récupération du commentaire');
            res.status(500).json({ err });
        }
    }
}
//Modification d'un commentaire
module.exports.updateComment = (req, res) => {
    db.query('UPDATE comments SET content = ? WHERE id = ?', [req.body.content, req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Commentaire mis à jour");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la mise à jour du commentaire");
            res.status(400).json({ erreur: "Erreur lors de la modification du commentaire" });
        }
    })
}
//Suppression d'un commentaire
module.exports.deleteComment = (req, res) => {
    db.query('DELETE FROM comments where id = ?', [req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Commentaire supprimé");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la suppresion du commentaire");
            res.status(400).json({ erreur: "Erreur lors de la suppression du commentaire" });
        }
    })
}