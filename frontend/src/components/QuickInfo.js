import { Grid, Typography, Button, Card, CardContent, CardActions, CardMedia, CardHeader, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function QuickInfo({ location, id, data, active, onToggle, onDelete }) {

    const handleRemove = () => {
        onDelete(id);
    }

    const time = new Date(data.dt * 1000);
    const lastUpdate = time.toLocaleString().split(' ')[1].slice(0, -3);

    return(
        <Grid item 
        xs={12} sm={6} md={4} lg={3}
        align="center">

                <Card 
                elevation={16} 
                sx={{
                    height: 325
                }}>
                    <CardHeader sx={{ paddingTop: 1, paddingBottom: 0 }} action={
                        <IconButton onClick={handleRemove}>
                            <ClearIcon />
                        </IconButton>
                    }/>
                    
                    <CardContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
                        <CardMedia className="weather-icon" component="img" image={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} title="Weather Icon" />
                        <Typography component="h3" variant="h2">{data.temp}</Typography>
                        <Typography component="h2" variant="h5">{location.city}</Typography>
                        <Typography component="p" variant="body2">Last update: {lastUpdate}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" size={'small'}>Refresh</Button>
                        <Button variant="contained" color="primary" onClick={() => onToggle(id)} size={'small'}>{active ? "Show less" : "Show more"}</Button>
                    </CardActions>
                </Card>
        </Grid>
    )
}

export default QuickInfo;