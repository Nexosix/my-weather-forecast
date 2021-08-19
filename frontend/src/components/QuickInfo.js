import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, CardActions, CardMedia } from "@material-ui/core";

function QuickInfo(props) {

    const [data, setData] = useState({
        name: "",
        temp: "",
        date: "",
        time: "",
        icon: ""
    });


    function getWeatherData(city) {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        fetch(`http://127.0.0.1:8080/api/current-weather/${city}/PL-32/PL`, options)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                setData({
                    name: data.name,
                    temp: data.temp + "°",
                    date: data.date,
                    time: data.time,
                    icon: "https://openweathermap.org/img/wn/" + data.icon + ".png"
                })
            });
    }

    useEffect(() => {
        getWeatherData(props.city);
    }, [props.city]);

    return(
        <Card>
            <CardMedia className="weather-icon" component="img" image={data.icon} title="Weather Icon" />
            <CardContent>
                <Typography component="h2" variant="h2">{data.temp}</Typography>
                <Typography component="h5" variant="h5">{data.name}</Typography>
                <br />
                <Typography component="p" variant="body2">Data aktualizacji: {data.time}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => getWeatherData(props.city)}>Odśwież</Button>
                <Button variant="contained" color="secondary" onClick={() => props.toggleMoreInfo(props.city)}>Pokaż więcej</Button>
            </CardActions>
        </Card>
    )
}

export default QuickInfo;