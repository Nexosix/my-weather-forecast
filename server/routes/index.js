const router = require('express').Router();
const currentWeather = require("./currentWeather");
const forecast = require('./forecast');

router.get('/current-weather/:city/:state/:country', currentWeather);
router.get('/forecast/:lat/:lng', forecast);
module.exports = router;