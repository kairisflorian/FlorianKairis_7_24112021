const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("api/posts", controller.createPost);
};



















/*const express = require("express");
const Router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth.middleware');

Router.post("/", postController.createPost);
Router.get("/:id", postController.getPost);
Router.put("/:id", postController.updatePost);
Router.delete("/:id", postController.deletePost);

module.exports = Router;*/