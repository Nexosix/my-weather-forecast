const axios = require("axios");
require("dotenv").config();


module.exports = async (req, res) => {

    try {
        let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city},${req.params.state},${req.params.country}&appid=${process.env.API_KEY}&units=metric&lang=pl`);

        let name = data.data.name;
        let temp = parseInt(Math.round(parseFloat(data.data.main.temp), 0));
        let desc = data.data.weather[0].description;

        let datetime = new Date(data.data.dt * 1000).toLocaleString().split(' ');
        let date = datetime[0].slice(0, -1);
        let time = datetime[1].slice(0, -3);

        res.json({
            name: name,
            temp: temp,
            desc: desc,
            date: date,
            time: time
        });
        
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}