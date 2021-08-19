const express = require("express");
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 8080;

let corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use('/api', routes);

const main = () => {
    app.listen(port, () => {
        console.log(`My Forecast Weather App listening at http://localhost:${port}`);
    });
}

main();
