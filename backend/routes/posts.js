const express = require("express");
const Router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

Router.post("/", postController.createPost);
Router.get("/:id", postController.getPost);
Router.put("/:id", postController.updatePost);
Router.delete("/:id", postController.deletePost);

module.exports = Router;