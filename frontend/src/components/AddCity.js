import { Autocomplete, Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import cities from '../data/polandCities.json';

const AddCity = ({ handleAdd }) => {

    const handleClick = () => {
      const val = document.querySelector("#select-city").value;
      if(!val) return;

      const city = val.split(",")[0].trim();
      const state = val.split(",")[1].trim();
      const {lat, lng} = cities.find(location => location.city === city && location.admin_name === state)
      handleAdd({ city, state, lat, lng });
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} align="center">
            <Card elevation={16} sx={{ height: 325 }}>
                <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                  <Typography component="h4" variant="h5" sx={{ marginY: 4 }}>Choose city</Typography>
                  <Autocomplete
                    id="select-city"
                    options={cities}
                    getOptionLabel={(option) => `${option.city}, ${option.admin_name}`}
                    renderInput={(params) => <TextField {...params} label="City" />}
                    sx={{ width: 250 }}
                  />
                  
                  <IconButton size="large" sx={{ marginTop: 2, width: 60, height: 60 }} onClick={handleClick} >
                    <AddCircleIcon color="primary" sx={{ height: 50, width: 50 }}/>
                  </IconButton>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AddCity;