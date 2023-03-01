const { posts } = require("../models");
const db = require("../models");
const User = db.users;
const Post = db.posts;
const Op = db.sequelize.Op;

//Créer un nouveau post.
module.exports.createPost = (req,res) => {
    Post.create({
        title: req.body.title,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId: req.auth.id
    }).then((data) => {
        console.log(data);
        res.status(201).send({
            message: "Le post a bien été crée."
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: "Erreur lors de la création du post."
        });
    });
};


//Récupérer les posts
module.exports.getAllPosts = (req, res) => {
    Post.findAll({ order: [['createdAt', 'DESC']] } )
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Erreur lors de la récupération des posts"
            });
        })
}

//Mettre à jour un post
module.exports.updatePost = (req, res) => {
    const object = req.file ? 
        {
            title: req.body.title,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : 
        {
            title: req.body.title
        };
    Post.update(object, { where: { id: req.params.id } })
        .then((data) => {
            console.log(data);
            res.status(200).send({
                message: "Post modifié"
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Impossible de modifier le post"
            });
        })    
}

//Supprimer un post 
module.exports.deletePost = (req, res) => {
    Post.destroy({ where: { id: req.params.id } })
        .then((data) => {
            console.log(data);
            res.status(200).send({
                message: "Le post a bien été supprimé"
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Erreur lors de la suppression du post"
            })
        })
}






