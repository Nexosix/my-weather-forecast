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
        <Grid item xs={12}>
            <Paper elevation={16} sx={{ paddingX: 3, paddingY: 0 }}>
                <Grid container sx={{ minHeight: 270 }}>
                    <Grid item xs={12} lg={4}>
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
                            <Grid
                                item
                                xs={12}
                                sx={{ display: "flex", flexDirection: "row" }}
                            >
                                <Box>
                                    <Box
                                        component="img"
                                        src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}
                                        alt=""
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        component="p"
                                        variant="subtitle1"
                                    >
                                        Temperature: {temperature}°
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="subtitle1"
                                    >
                                        Feels like: {feelsLike}°
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="subtitle1"
                                    >
                                        Wind: {currentData.wind_speed} m/s
                                    </Typography>
                                    <Typography
                                        component="p"
                                        variant="subtitle1"
                                    >
                                        Humidity: {currentData.humidity} %
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        lg={8}
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

                    <Grid
                        item
                        xs={12}
                        alignItems="end"
                        justifyContent="center"
                        sx={{ display: "flex", marginBottom: 0 }}
                    >
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
        </Grid>
    );
}

export default DetailedInfo;
