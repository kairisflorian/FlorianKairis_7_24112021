const express = require("express");
const Router = express.Router();
const answerController = require('../controllers/answer.controller');
const auth = require('../middleware/auth.middleware');

Router.post("/", answerController.createAnswer);
Router.get("/:id", answerController.getAnswer);
Router.put("/:id", answerController.updateAnswer);
Router.delete("/:id", answerController.deleteAnswer);

module.exports = Router;