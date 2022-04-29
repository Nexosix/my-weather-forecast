import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Card, CardContent, CardActions, CardMedia, Box } from '@mui/material'

function QuickInfo(props) {

    const [data, setData] = useState({
        name: "",
        temp: "",
        date: "",
        time: "",
        icon: ""
    });
    const getWeatherData = (city) => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        fetch(`http://127.0.0.1:8080/api/current-weather/${city}/PL-32/PL`, options)
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
        getWeatherData(props.city);
    }, []);

    return(
        <Grid item 
        xs={12} 
        md={6} 
        lg={3} 
        align="center">

                <Card 
                elevation={16} 
                sx={{
                    height: 375
                }}>
                    <CardMedia className="weather-icon" component="img" image={data.icon} title="Weather Icon" />
                    <CardContent>
                        <Typography component="h2" variant="h2">{data.temp}</Typography>
                        <Typography component="h5" variant="h4">{data.name}</Typography>
                        <Typography component="p" variant="body2">Data aktualizacji: {data.time}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => getWeatherData(props.city)}>Odśwież</Button>
                        <Button variant="contained" color="primary" onClick={() => props.toggleMoreInfo(props.city)}>{props.active ? "Pokaż mniej" : "Pokaż więcej"}</Button>
                    </CardActions>
                </Card>
        </Grid>
    )
}

export default QuickInfo;