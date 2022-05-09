const express = require("express");
const Router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');

Router.post("/", commentController.createComment);
Router.get("/:id", commentController.getComment);
Router.put("/:id", commentController.updateComment);
Router.delete("/:id", commentController.deleteComment);


module.exports = Router;