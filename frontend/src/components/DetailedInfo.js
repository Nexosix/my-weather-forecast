import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Tabs, Tab } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NextDay from "./NextDay";
import NextHour from "./NextHour";

function DetailedInfo({ id, location, currentData, dailyData, hourlyData }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, value) => {
        setActiveTab(value);
    };

    const temperature = Math.round(currentData.temp);
    const feelsLike = Math.round(currentData.feels_like);

    const lastUpdate = new Date(currentData.dt * 1000)
        .toLocaleString()
        .split(" ")[1]
        .slice(0, -3);

    return (
        <Paper elevation={16} sx={{ padding: 3, paddingY: 0 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} lg={3}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginX: 0,
                            marginTop: 2,
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

                <Grid
                    item
                    xs={12}
                    lg={9}
                    sx={{ paddingLeft: 1, paddingTop: 1 }}
                >
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        <Tab label="Daily" />
                        <Tab label="Hourly" />
                    </Tabs>

                    {activeTab === 0 && (
                        <Grid container>
                            {dailyData.map((day, index) => (
                                <NextDay key={index} data={day} />
                            ))}
                        </Grid>
                    )}

                    {activeTab === 1 && (
                        <Grid container>
                            {hourlyData.map((day, index) => (
                                <NextHour key={index} data={day} />
                            ))}
                        </Grid>
                    )}
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
