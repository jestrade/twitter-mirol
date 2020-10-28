const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/users");
const authentication = require("./../../middlewares/authentication");
const authorization = require("./../../middlewares/authorization");
const audits = require("./../../middlewares/audits");
const validator = require("./../../middlewares/validator");

router.route("/")
    .post(validator.validateNewUser, controller.create)
    .get(authentication, audits, controller.read);

router.route("/login")
    .post(controller.login);

router.route("/:username")
    .get(authentication, controller.readOne)
    .put(authentication, authorization, audits, controller.update)
    .delete(authentication, authorization, audits, controller.remove);

module.exports = router;