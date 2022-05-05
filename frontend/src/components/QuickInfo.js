import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions, CardMedia, CardHeader, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function QuickInfo({ location, onToggle, active, onDelete }) {

    const [data, setData] = useState({
        name: "",
        temp: "",
        date: "",
        time: "",
        icon: ""
    });

    const getWeatherData = (location) => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        fetch(`http://127.0.0.1:8080/api/current-weather/${location.city}/${location.state}/PL`, options)
            .then(response => response.json())
            .then(data => {
                setData({
                    name: data.name,
                    temp: data.temp + "°",
                    date: data.date,
                    time: data.time,
                    icon: "https://openweathermap.org/img/wn/" + data.icon + "@2x.png"
                })
            });
    }

    useEffect(() => {
        getWeatherData(location);
    }, []);

    const handleRemove = () => {
        onDelete(location);
    }

    return(
        <Grid item 
        xs={12} sm={6} md={4} lg={3}
        align="center">

                <Card 
                elevation={16} 
                sx={{
                    height: 375
                }}>
                    <CardHeader action={
                        <IconButton onClick={handleRemove}>
                            <ClearIcon />
                        </IconButton>
                    } />
                    <CardMedia className="weather-icon" component="img" image={data.icon} title="Weather Icon" />
                    <CardContent sx={{ paddingTop: 1 }}>
                        <Typography component="h2" variant="h2">{data.temp}</Typography>
                        <Typography component="h3" variant="h5">{location.city}</Typography>
                        <Typography component="p" variant="body2">Last update: {data.time}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => getWeatherData(location)}>Refresh</Button>
                        <Button variant="contained" color="primary" onClick={() => onToggle(location.city)}>{active ? "Show less" : "Show more"}</Button>
                    </CardActions>
                </Card>
        </Grid>
    )
}

export default QuickInfo;