const fetch = require("node-fetch");
const config = require("./../../../config");
const response = require("./../../lib/response");

const getWeather = (req, res) => {
    const city = req.params.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherApiKey}&units=metric`;
    fetch(url)
    .then(res => res.json())
    .then(json => res.json(response(true, [{weather: json.main.temp}])));
};

module.exports = {getWeather};