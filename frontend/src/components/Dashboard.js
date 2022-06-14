import {
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuickInfo from "./QuickInfo";
import DetailedInfo from "./DetailedInfo";
import AddCity from "./AddCity";
import QuickInfoLoading from "./QuickInfoLoading";

function Dashboard({ onAlert }) {
    const [detailedInfo, setDetailedInfo] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    const [locations, setLocations] = useState([]);
    const [locationsCurrentData, setLocationsCurrentData] = useState([]);
    const [locationsDetailedData, setLocationsDetailedData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
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
                }
                const currentWeatherData = weatherData.map(
                    (data) => data.current
                );
                const detailedWeatherData = weatherData.map((data) => {
                    return {
                        daily: data.daily.slice(0, 6),
                        hourly: data.hourly.slice(0, 6),
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
        setOpenDialog(true);
    };

    const handleDialogClose = (event) => {
        if (event.currentTarget.type === "button") {
            if (event.currentTarget.textContent === "Delete") {
                deleteCard(locationToRemove);
                setLocationToRemove(null);
            }
        }
        setOpenDialog(false);
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
            existingLocations.push(location);
        }

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
            daily: weatherData.daily.slice(0, 6),
            hourly: weatherData.hourly.slice(0, 6),
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
        <Grid item xs={10} sm={12}>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                sx={{
                    paddingTop: 0,
                }}
            >
                {isLoading &&
                    locations.map((loc, idx) => <QuickInfoLoading key={idx} />)}

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

                <AddCity handleAdd={handleAddCard} />

                {detailedInfo >= 0 && locationsDetailedData[detailedInfo] && (
                    <DetailedInfo
                        id={detailedInfo}
                        location={locations[detailedInfo]}
                        currentData={locationsCurrentData[detailedInfo]}
                        dailyData={locationsDetailedData[detailedInfo].daily}
                        hourlyData={locationsDetailedData[detailedInfo].hourly}
                    />
                )}

                {/* Modal */}
                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>
                        Delete
                        {locations[locationToRemove] &&
                            ` ${locations[locationToRemove].city}, ${locations[locationToRemove].state}?`}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button onClick={handleDialogClose}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
