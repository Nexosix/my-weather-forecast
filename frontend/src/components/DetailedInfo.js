import React, { useState } from "react";
import { Grid, Paper, Typography, Tabs, Tab } from "@mui/material";
import NextDay from "./NextDay";
import NextHour from "./NextHour";
import DetailedCityInfo from "./DetailedCityInfo";
import Carousel from "./Carousel";

function DetailedInfo({ location, currentData, dailyData, hourlyData }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, value) => {
        setActiveTab(value);
    };

    const lastUpdate = new Date(currentData.dt * 1000)
        .toLocaleString()
        .split(" ")[1]
        .slice(0, -3);

    return (
        <Grid item xs={12}>
            <Paper elevation={4} sx={{ paddingX: 3, paddingY: 0 }}>
                <Grid container sx={{ minHeight: 270 }}>
                    <Grid item xs={12} lg={4}>
                        <DetailedCityInfo
                            location={location}
                            currentData={currentData}
                        />
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
                            // <Grid container>
                            //     {dailyData.map((day, index) => (
                            //         <NextDay key={index} data={day} />
                            //     ))}
                            // </Grid>
                            <Carousel
                                elements={dailyData.map((day, index) => (
                                    <NextDay key={index} data={day} />
                                ))}
                            />
                        )}

                        {activeTab === 1 && (
                            <Carousel
                                elements={hourlyData.map((day, index) => (
                                    <NextHour key={index} data={day} />
                                ))}
                            />
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
