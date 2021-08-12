const router = require('express').Router();

router.use('/current-weather/:city/:state/:country', require('./current_weather'));

module.exports = router;