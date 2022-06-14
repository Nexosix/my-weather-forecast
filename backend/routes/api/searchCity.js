const axios = require("axios");
require("dotenv").config();

module.exports = async (req, res) => {
    if (req.params.query === undefined) {
        res.sendStatus(400);
        return;
    }

    const query = encodeURIComponent(
        req.params.query.replace(", ", " ").replace(" ", ",")
    );
    const limit = 5;

    try {
        if (process.env.API_KEY === undefined) {
            throw new Error("No API KEY found in .env file");
        }

        let { data } = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${process.env.API_KEY}`
        );

        data.forEach((location, idx, dataCopy) => {
            //check if any other location is near enough to be skipped
            //and keep earlier location as it better fits query
            dataCopy.forEach((other, otherIdx) => {
                if (otherIdx === idx) return;

                if (
                    Math.abs(location.lat - other.lat) < 0.5 &&
                    Math.abs(location.lon - other.lon) < 0.5
                ) {
                    data.splice(otherIdx, 1);
                    dataCopy.splice(otherIdx, 1);
                }
            });
        });

        res.json(data);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
};
