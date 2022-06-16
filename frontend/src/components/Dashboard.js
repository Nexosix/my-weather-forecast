import {
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    Button,
    Box,
    Fab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuickInfo from "./QuickInfo";
import DetailedInfo from "./DetailedInfo";
import AddCityDialog from "./AddCityDialog";
import QuickInfoLoading from "./QuickInfoLoading";
import AddIcon from "@mui/icons-material/Add";
import DeleteCityDialog from "./DeleteCityDialog";

function Dashboard({ onAlert }) {
    const [detailedInfo, setDetailedInfo] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    const [locations, setLocations] = useState([]);
    const [locationsCurrentData, setLocationsCurrentData] = useState([]);
    const [locationsDetailedData, setLocationsDetailedData] = useState([]);

    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
    const [locationToRemove, setLocationToRemove] = useState(null);

    const getForecastData = async (location) => {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(
            `http://localhost:8080/api/forecast/${location.lat}/${location.lng}`,
            options
        );

        if (!response.ok) {
            throw new Error("Could not retrieve data from server");
        }

        const data = await response.json();
        return data;
    };

    useEffect(() => {
        const getStoredLocations = async () => {
            let storedLocations = localStorage.getItem("locations");

            if (storedLocations) {
                storedLocations = JSON.parse(storedLocations);
                setLocations(storedLocations);

                let weatherData = [];
                for (let i = 0; i < storedLocations.length; i++) {
                    let data = getForecastData(storedLocations[i]);
                    weatherData.push(data);
                }

                try {
                    weatherData = await Promise.all(weatherData);
                } catch (e) {
                    onAlert({
                        type: "error",
                        message: "Could not retrieve data from server",
                    });
                    return;
                }
                const currentWeatherData = weatherData.map(
                    (data) => data.current
                );
                const detailedWeatherData = weatherData.map((data) => {
                    return {
                        daily: data.daily,
                        hourly: data.hourly,
                    };
                });

                setLocationsCurrentData(currentWeatherData);
                setLocationsDetailedData(detailedWeatherData);
            }
        };

        setIsLoading(true);
        getStoredLocations().then(() => setIsLoading(false));
    }, []);

    const handleToggleDetailedInfo = (id) => {
        if (detailedInfo === id) {
            setDetailedInfo(-1);
            return;
        }

        setDetailedInfo(id);
    };

    const handleDialogOpen = (id) => {
        setLocationToRemove(id);
        setIsOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = (event) => {
        if (event.currentTarget.type === "button") {
            if (event.currentTarget.textContent === "Delete") {
                deleteCard(locationToRemove);
                setLocationToRemove(null);
            }
        }
        setIsOpenDeleteDialog(false);
    };

    const handleAddCard = async (location) => {
        for (let loc of locations) {
            if (loc.city === location.city && loc.state === location.state) {
                alert("City already added");
                return;
            }
        }

        let existingLocations = localStorage.getItem("locations");
        if (existingLocations === null) {
            existingLocations = [];
        } else {
            existingLocations = JSON.parse(existingLocations);
        }

        existingLocations.push(location);
        setLocations(existingLocations);
        localStorage.setItem("locations", JSON.stringify(existingLocations));

        let weatherData;

        try {
            weatherData = await getForecastData(location);
        } catch (e) {
            onAlert({
                type: "error",
                message: "Could not retrieve data from server",
            });
            return;
        }

        setLocationsCurrentData((prevState) => [
            ...prevState,
            weatherData.current,
        ]);

        const detailedWeatherData = {
            daily: weatherData.daily,
            hourly: weatherData.hourly,
        };

        setLocationsDetailedData((prevState) => [
            ...prevState,
            detailedWeatherData,
        ]);

        onAlert({ type: "success", message: "Added new city successfully!" });
    };

    const deleteCard = (id) => {
        if (locations.length === 0 || locations[id] === undefined) {
            return;
        }

        const updatedLocations = [...locations];
        const updatedCurrentData = [...locationsCurrentData];
        const updatedDetailedData = [...locationsDetailedData];
        updatedLocations.splice(id, 1);
        updatedCurrentData.splice(id, 1);
        updatedDetailedData.splice(id, 1);

        setLocationsCurrentData(updatedCurrentData);
        setLocationsDetailedData(updatedDetailedData);

        setLocations(updatedLocations);
        localStorage.setItem("locations", JSON.stringify(updatedLocations));

        onAlert({ type: "success", message: "Deleted city succesfully!" });
    };

    const refreshLocationData = async (id) => {
        const location = locations[id];

        if (location === undefined) return;

        let data;

        try {
            data = await getForecastData(location);
        } catch (e) {
            onAlert({
                type: "error",
                message: "Could not retrieve data from server",
            });
            return;
        }

        setLocationsCurrentData((prevState) => {
            prevState[id] = data.current;
            return [...prevState];
        });

        setLocationsDetailedData((prevState) => {
            prevState[id] = {
                daily: data.daily,
                hourly: data.hourly,
            };
            return [...prevState];
        });
    };

    return (
        <>
            <Grid item xs={10} sm={12}>
                <Grid container rowSpacing={2} columnSpacing={2} paddingTop={0}>
                    {isLoading &&
                        locations.map((loc, idx) => (
                            <QuickInfoLoading key={idx} />
                        ))}

                    {!isLoading &&
                        locationsCurrentData.length > 0 &&
                        locationsCurrentData.map((data, index) => {
                            if (locations[index] === undefined) return null;
                            return (
                                <QuickInfo
                                    key={index}
                                    id={index}
                                    location={locations[index]}
                                    data={data}
                                    active={detailedInfo === index}
                                    onToggle={handleToggleDetailedInfo}
                                    onDelete={handleDialogOpen}
                                    onRefresh={refreshLocationData}
                                />
                            );
                        })}

                    {/* <AddCity handleAdd={handleAddCard} /> */}

                    {detailedInfo >= 0 &&
                        locationsDetailedData[detailedInfo] && (
                            <DetailedInfo
                                location={locations[detailedInfo]}
                                currentData={locationsCurrentData[detailedInfo]}
                                dailyData={
                                    locationsDetailedData[detailedInfo].daily
                                }
                                hourlyData={
                                    locationsDetailedData[detailedInfo].hourly
                                }
                            />
                        )}

                    {/* Modals */}

                    {locationToRemove && (
                        <DeleteCityDialog
                            location={locations[locationToRemove]}
                            isOpen={isOpenDeleteDialog}
                            onClose={handleDeleteDialogClose}
                        />
                    )}

                    <AddCityDialog
                        isOpen={isOpenAddDialog}
                        onClose={() => setIsOpenAddDialog(false)}
                        handleAdd={handleAddCard}
                    />
                </Grid>
            </Grid>

            <Box
                sx={{
                    width: "100%",
                    position: "fixed",
                    bottom: 0,
                    textAlign: "end",
                }}
            >
                <Fab
                    size="large"
                    sx={{ marginRight: "30px", marginBottom: "30px" }}
                    onClick={() => setIsOpenAddDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </>
    );
}

export default Dashboard;
