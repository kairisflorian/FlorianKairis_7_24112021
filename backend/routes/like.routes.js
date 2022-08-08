const { authJwt } = require("../middleware");
const controller = require("../controllers/like.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept, Authorization"
      );
      next();
    });
    app.post("/api/likes/:id", [authJwt.verifyToken], controller.addOrRemoveLike);
    app.get("/api/likes/:id", [authJwt.verifyToken], controller.getLikes);
};