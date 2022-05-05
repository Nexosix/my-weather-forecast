import { Autocomplete, Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import cities from '../data/polandCities.json';

const AddCity = ({ handleAdd }) => {

    const handleClick = () => {
      const val = document.querySelector("#select-city").value;
      if(!val) return;

      const city = val.split(",")[0].trim();
      const state = val.split(",")[1].trim();
      handleAdd({ city, state });
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} align="center">
            <Card sx={{ height: 375 }}>
                <CardContent>
                  <Typography component="h4" variant="h6" sx={{ marginY: 4 }}>Choose city</Typography>
                  <Autocomplete
                    id="select-city"
                    options={cities}
                    getOptionLabel={(option) => `${option.city}, ${option.admin_name}`}
                    renderInput={(params) => <TextField {...params} label="City" />}
                  />
                  
                  <IconButton size="large" sx={{ marginTop: 2 }} onClick={handleClick} >
                    <AddCircleIcon color="primary" sx={{ height: 50, width: 50 }}/>
                  </IconButton>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default AddCity;