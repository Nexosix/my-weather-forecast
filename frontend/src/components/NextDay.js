import { Grid, Typography, Box } from "@mui/material";

const NextDay = ({ data }) => {
    const dayOfWeek = new Date(data.dt * 1000).toLocaleString("en", {
        weekday: "long",
    });
    const temperatureDay = Math.round(data.temp.day);
    const temperatureNight = Math.round(data.temp.night);

    return (
        <>
            <Box
                component="img"
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt=""
                sx={{
                    marginX: "auto",
                }}
            />
            <Typography component="p" variant="h6" textAlign="center">
                {temperatureDay}°/{temperatureNight}°
            </Typography>
            <Typography component="p" variant="subtitle1" textAlign="center">
                {dayOfWeek}
            </Typography>
        </>
    );
};

export default NextDay;
