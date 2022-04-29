import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function DetailedInfo(props) {

    
    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    <Typography>{props.city}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default DetailedInfo;