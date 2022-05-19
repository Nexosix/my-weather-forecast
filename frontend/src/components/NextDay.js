import { Grid, Typography, Box } from "@mui/material";

const NextDay = ({ data }) => {
    const dayOfWeek = new Date(data.dt * 1000).toLocaleString("en", {
        weekday: "long",
    });
    const temperature = Math.round(data.temp.day);

    return (
        <Grid item xs={6} sm={4} md={2} align="center">
            <Box
                component="img"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
                sx={{
                    marginX: "auto",
                }}
            />
            <Typography component="p" variant="h5" textAlign="center">
                {temperature}°
            </Typography>
            <Typography component="p" variant="subtitle1" textAlign="center">
                {dayOfWeek}
            </Typography>
        </Grid>
    );
};

export default NextDay;
