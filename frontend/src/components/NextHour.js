import { Grid, Typography, Box } from "@mui/material";

const NextHour = ({ data }) => {
    const hour = new Date(data.dt * 1000).toLocaleTimeString().slice(0, -3);
    const temperature = Math.round(data.temp);

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
            <Typography component="p" variant="h5" textAlign="center">
                {temperature}°
            </Typography>
            <Typography component="p" variant="subtitle2" textAlign="center">
                {data.weather[0].description}
            </Typography>
            <Typography component="p" variant="subtitle1" textAlign="center">
                {hour}
            </Typography>
        </>
    );
};

export default NextHour;
