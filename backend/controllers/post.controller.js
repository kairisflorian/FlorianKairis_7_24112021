const db = require("../models");
const User = db.users;
const Post = db.posts;
const Op = db.sequelize.Op;

//Créer un nouveau post.
module.exports.createPost = (req,res) => {

}

//Récupérer tous les posts
module.exports.findAllPosts = (res,res) => {

}

//Trouver un post d'après son id
module.exports.findOnePost = (req, res) => {

}

//Mettre à jour un post avec un id
module.exports.updatePost = (req, res) => {

}

//Supprimer un post d'après son id
module.exports.deletePost = (req, res) => {

}







/*
//liaison avec la base de données.
const db = require('../models/connectionDb');

//Création d'un post
module.exports.createPost = (req, res) => {
    const postDatas = [req.body.title, req.body.gif, req.body.user_id];
    db.query('INSERT INTO posts (title, gif, user_id) VALUES (?, ?, ?)',postDatas, (err, results, fields) => {
        if(!err) {
            console.log('Post crée.');
            res.status(201).json({ id: results.insertId, title: req.body.title, gif: req.body.gif, user_id: req.body.user_id });
        }
        else {
            console.log('Erreur');
            res.status(500).send({ erreur: "Le post n'a pas pu être crée." })
        }
    })
}
//Récupérer un post
module.exports.getPost = (req, res) => {
    db.query('SELECT posts.id, posts.title, posts.gif, users.pseudo, users.id FROM posts JOIN users ON users.id = posts.user_id WHERE id = ?',
    [req.params.id]),
    (err, results, fields) => {
        if(!err) {
            console.log('Récupération du post');
            res.status(200).send(results);
        }    
        else {
            console.log('Erreur lors de la récupération du post');
            res.status(500).json({ err });
        }
    }
}

//Modification d'un post
module.exports.updatePost = (req, res) => {
    db.query('UPDATE posts SET title = ?, gif = ? WHERE id = ?', [req.body.title, req.body.gif, req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Post mis à jour");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la mise à jour du post");
            res.status(400).json({ erreur: "Erreur lors de la modification du post" });
        }
    })
}
//Suppression d'un post
module.exports.deletePost = (req, res) => {
    db.query('DELETE FROM posts where id = ?', [req.params.id], (err, results, fields) => {
        if(!err) {
            console.log(results);
            console.log("Post supprimé");
            res.status(200).send(results);
        } else {
            console.log("Erreur lors de la suppresion du post");
            res.status(400).json({ erreur: "Erreur lors de la suppression du post" });
        }
    })
}*/