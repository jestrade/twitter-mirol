const express = require("express");
const router = express.Router();
const controller = require("./../../controllers/weather");

router.route("/:city")
    .get(controller.getWeather);

module.exports = router;