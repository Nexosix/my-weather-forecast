import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import QuickInfo from './QuickInfo';

function App() {
  return (
    <div>
      <Grid container align="center" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>

        <Grid item xs={12}>
          <Typography component="h3" variant="h3">My Weather Forecast</Typography>
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={2} align="center" alignItems="center" style={{ width: '75vw' }}>
            <Grid item xs={12} md={4}>
              <QuickInfo city="Szczecin"></QuickInfo>
            </Grid>

            <Grid item xs={12} md={4}>
              <QuickInfo city="Police"></QuickInfo>
            </Grid>

            <Grid item xs={12} md={4}>
              <QuickInfo city="Koszalin"></QuickInfo>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
