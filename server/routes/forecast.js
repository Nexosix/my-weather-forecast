const axios = require("axios");
require("dotenv").config();

module.exports = async (req, res) => {

    const lat = encodeURIComponent(req.params.lat);
    const lng = encodeURIComponent(req.params.lng);

    if(lat === undefined || lng === undefined) {
        res.sendStatus(400);
        return;
    }

    try {
        const { data: { current, daily, hourly } } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${process.env.API_KEY}&units=metric&lang=pl`);

        current.temp = Math.round(current.temp);

        res.json({ current, daily, hourly });

    } catch(e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
}