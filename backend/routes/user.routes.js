const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  // Récupération des infos de l'user
  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.getUser
  );
  // Modification des infos de l'user
  app.put(
    "/api/user/",
    [authJwt.verifyToken],
    controller.updateUser
  );
};