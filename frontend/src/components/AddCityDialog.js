import { useState } from "react";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const AddCityDialog = ({ isOpen, onClose, handleAdd }) => {
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

    const handleSubmit = () => {
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
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Search for place</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
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
                    sx={{ width: "100%", paddingY: 2 }}
                    onInput={(e) => updateSearchOptions(e)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCityDialog;
