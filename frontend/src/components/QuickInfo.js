import { Grid, Typography, Button, Card, CardContent, CardActions, CardMedia, CardHeader, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function QuickInfo({ location, id, data, active, onToggle, onDelete }) {

    const handleRemove = () => {
        onDelete(id);
    }

    let temperature = Math.round(data.temp);

    return(
        <Grid item 
        xs={12} sm={6} md={4} lg={3}
        align="center"
        sx={{ height: 200 }} >

                <Card 
                elevation={16} 
                >
                    <CardHeader sx={{ paddingTop: 1, paddingBottom: 0 }} action={
                        <CardActions>
                            <IconButton onClick={() => onToggle(id)}>
                                {active ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton onClick={() => alert('refresh')}>
                                <RefreshIcon />
                            </IconButton>
                            <IconButton onClick={handleRemove}>
                                <ClearIcon />
                            </IconButton>
                        </CardActions>
 
                    }/>
                    
                    <CardContent>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography component="h3" variant="h2">{temperature}°</Typography>
                                <Typography component="h2" variant="h5">{location.city}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <CardMedia className="weather-icon" component="img" image={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" title="Weather Icon" />
                            </Grid>
                        </Grid>
                    </CardContent>
                    {/* <CardActions>
                        <Button color="primary" size={'small'}>Refresh</Button>
                        <Button variant="contained" color="primary" onClick={() => onToggle(id)} size={'small'}>{active ? "Show less" : "Show more"}</Button>
                    </CardActions> */}
                </Card>
        </Grid>
    )
}

export default QuickInfo;