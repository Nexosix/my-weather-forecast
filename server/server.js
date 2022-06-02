const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 8080;

let corsOptions = {
    origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/", routes);

const main = () => {
    app.listen(port, () => {
        console.log(
            `My Forecast Weather App listening at http://localhost:${port}`
        );
    });
};

main();
