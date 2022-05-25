import { Grid, Typography, Box } from "@mui/material";

const NextHour = ({ data }) => {
    const hour = new Date(data.dt * 1000).toLocaleTimeString().slice(0, -3);
    const temperature = Math.round(data.temp);

    return (
        <Grid item xs={4} sm={4} md={2} align="center">
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
                {hour}
            </Typography>
        </Grid>
    );
};

export default NextHour;
