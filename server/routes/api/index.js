const router = require("express").Router();
const currentWeather = require("./currentWeather");
const forecast = require("./forecast");
const searchCity = require("./searchCity");

router.get("/current-weather/:city/:state/:country", currentWeather);
router.get("/forecast/:lat/:lng", forecast);
router.get("/search-city/:query", searchCity);

module.exports = router;
