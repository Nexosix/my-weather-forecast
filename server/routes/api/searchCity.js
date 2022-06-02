const axios = require("axios");
require("dotenv").config();

module.exports = async (req, res) => {
    if (req.params.query === undefined) {
        res.sendStatus(400);
        return;
    }

    const query = req.params.query.replace(" ", ",");
    const limit = 5;

    try {
        if (process.env.API_KEY === undefined) {
            throw new Error("No API KEY found in .env file");
        }

        const { data } = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${process.env.API_KEY}`
        );

        res.json(data);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
};
