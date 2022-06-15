import { Box, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from "react";

function DetailedCityInfo({ location, currentData }) {
    const temperature = Math.round(currentData.temp);
    const feelsLike = Math.round(currentData.feels_like);

    return (
        <Grid
            container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "start",
            }}
        >
            <Grid item xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginX: 0,
                        paddingY: 2,
                    }}
                >
                    <LocationOnIcon sx={{ fontSize: "32px" }} />
                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{
                            display: "inline-block",
                            paddingLeft: 2,
                        }}
                    >
                        {location.city}, {location.state}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
                <Box>
                    <Box
                        component="img"
                        src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
                        alt=""
                    />
                </Box>
                <Box>
                    <Typography component="p" variant="subtitle1">
                        Temperature: {temperature}°
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Feels like: {feelsLike}°
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Wind: {currentData.wind_speed} m/s
                    </Typography>
                    <Typography component="p" variant="subtitle1">
                        Humidity: {currentData.humidity} %
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default DetailedCityInfo;
