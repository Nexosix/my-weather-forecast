const axios = require("axios");
require("dotenv").config();


module.exports = async (req, res) => {

    let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.state},${req.params.country}&appid=${process.env.API_KEY}&units=metric&lang=pl`);

    res.json({
        msg: response.data
    })

}