const { authJwt } = require("../middleware");
const multer = require('../middleware/multer-config');
const controller = require("../controllers/post.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept, Authorization"
      );
      next();
    });
    app.post("/api/posts", [authJwt.verifyToken], multer, controller.createPost);
    app.put("/api/posts/:id", [authJwt.verifyToken], multer, controller.updatePost);
    app.get("/api/posts", [authJwt.verifyToken], controller.getAllPosts);
    app.delete("/api/posts/:id", [authJwt.verifyToken], controller.deletePost);
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