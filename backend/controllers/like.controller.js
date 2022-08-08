const db = require("../models");
const Like = db.likes;


// Ajouter ou supprimer un like à un post
module.exports.addOrRemoveLike = (req, res) => {
    Like.findOne({ where: { userId: req.auth.id, postId: req.params.id } })
        .then((data) => {
            if(data == null){
                Like.create({
                    userId: req.auth.id,
                    postId: req.params.id
                })
                    .then(() => {
                        res.status(201).send({
                            message: "Like ajouté"
                        })
                    })
                    .catch(() => {
                        res.status(500).send({
                            message: "Erreur lors de l'ajout du like"
                        })
                    })
            }
            else{
                Like.destroy({ where: { userId: req.auth.id, postId: req.params.id } })
                    .then(() => {
                        res.status(200).send({
                            message: "Like supprimé"
                        })
                    })
                    .catch(() => {
                        res.status(500).send({
                            message: "Erreur lors de la suppression du like"
                        })
                    })
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Erreur lors du like ou dislike"
            })
        })
}    

// Récupérer le nombre de likes d'un post
module.exports.getLikes = (req, res) => {
    Like.findAndCountAll({ where:{ postId: req.params.id } })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(() => {
            res.status(500).send({
                message: "Impossible de compter le nombre de likes d'un post"
            })
        })
}
