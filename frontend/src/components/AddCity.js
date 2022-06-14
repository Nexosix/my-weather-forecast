import { useState } from "react";
import {
    Autocomplete,
    Card,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddCity = ({ handleAdd }) => {
    const [searchLocations, setSearchLocations] = useState([]);

    const debounce = (cb, delay = 800) => {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    };

    const updateSearchOptions = debounce((e) => getSearchOptions(e));

    const getSearchOptions = async (e) => {
        console.log(e.target.value);
        const query = e.target.value;

        if (query === "" || query === undefined) {
            setSearchLocations([]);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/search-city/${query}`
            );

            if (!response.ok) {
                throw new Error(
                    `Could not get response due to status: ${response.status} ${response.statusText}`
                );
            }

            const locations = await response.json();
            console.log(locations);
            setSearchLocations(locations);
        } catch (e) {
            console.error(e);
            return;
        }
    };

    const handleClick = () => {
        let inputValue = document.querySelector("#select-city").value;

        if (inputValue === "") {
            return;
        }

        inputValue = inputValue.split(", ");
        const name = inputValue[0];
        const state = inputValue[1];
        const country = inputValue[2];

        console.log(`${name}-${state}-${country}`);

        const location = searchLocations.find(
            (location) =>
                location.name === name &&
                location.state === state &&
                location.country === country
        );

        if (location === undefined) {
            console.log("TEST");
            return;
        }

        const { lat, lon } = location;
        handleAdd({ city: name, state, lat, lng: lon });
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} align="center">
            <Card elevation={4} sx={{ height: 200 }}>
                <CardContent
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h4" variant="h5" sx={{ marginY: 4 }}>
                        Search for places
                    </Typography>
                    <Autocomplete
                        id="select-city"
                        options={searchLocations}
                        getOptionLabel={(option) =>
                            `${option.name}, ${option.state}, ${option.country}`
                        }
                        renderOption={(props, option) => (
                            <li {...props} key={Math.random()}>
                                {`${option.name}, ${option.state}, ${option.country}`}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                key={params.inputProps.key}
                                {...params}
                                label="Search"
                            />
                        )}
                        sx={{ width: "100%" }}
                        onInput={(e) => updateSearchOptions(e)}
                    />

                    <IconButton
                        size="large"
                        sx={{ width: 60, height: 60 }}
                        onClick={handleClick}
                    >
                        <AddCircleIcon
                            color="primary"
                            sx={{ height: 50, width: 50 }}
                        />
                    </IconButton>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default AddCity;
