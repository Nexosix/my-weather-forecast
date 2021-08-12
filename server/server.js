const express = require("express");
const routes = require('./routes');
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));
app.use('/api', routes);

const main = () => {
    app.listen(port, () => {
        console.log(`My Forecast Weather App listening at http://localhost:${port}`);
    });
}

main();
