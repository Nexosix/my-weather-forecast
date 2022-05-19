import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NextDay from "./NextDay";

function DetailedInfo({ id, location, currentData, dailyData }) {
    console.log(currentData.rain);
    const temperature = Math.round(currentData.temp);
    const feelsLike = Math.round(currentData.feels_like);

    const lastUpdate = new Date(currentData.dt * 1000)
        .toLocaleString()
        .split(" ")[1]
        .slice(0, -3);

    return (
        <Paper elevation={16} sx={{ padding: 3, paddingBottom: 0 }}>
            <Grid container justifyContent="center">
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginX: 0,
                        }}
                    >
                        <LocationOnIcon sx={{ fontSize: "32px" }} />
                        <Typography
                            component="h5"
                            variant="h5"
                            sx={{ display: "inline-block" }}
                        >
                            {location.city}, {location.state}
                        </Typography>
                    </Box>

                    <Box sx={{ marginLeft: 1, marginTop: 2 }}>
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

                <Grid item xs={8}>
                    <Grid container justifyContent="center">
                        {dailyData.map((day, index) => (
                            <NextDay key={index} data={day} />
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Typography
                        component="p"
                        variant="body2"
                        sx={{ fontSize: "11px", textAlign: "center" }}
                    >
                        Updated at: {lastUpdate}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default DetailedInfo;
