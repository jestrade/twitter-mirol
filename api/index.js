const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const users = require("./routers/users");
const tweets = require("./routers/tweets");
const weather = require("./routers/weather");

const file = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), {flags: "a"});

router.use(morgan("combined", {stream: file}));
router.use("/users", users);
router.use("/tweets", tweets);
router.use("/weather", weather);

module.exports = router;