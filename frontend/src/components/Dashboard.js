import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import QuickInfo from './QuickInfo';
import DetailedInfo from './DetailedInfo';

function Dashboard(props) {

  const [detailedInfo, setDetailedInfo] = useState(null);

  function toggleMoreInfo(city) {
    if (detailedInfo === city) {
      setDetailedInfo(null);
      return;
    }

    setDetailedInfo(city);
  }

  return (
      <div>
        <Grid container align="center" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
  
          <Grid item xs={12}>
            <Typography component="h3" variant="h3">My Weather Forecast</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Grid container spacing={2} align="center" alignItems="center" style={{ maxWidth: '50vw' }}>
              <Grid item xs={12} md={4}>
                <QuickInfo city="Szczecin" toggleMoreInfo={toggleMoreInfo} ></QuickInfo>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <QuickInfo city="Police" toggleMoreInfo={toggleMoreInfo}></QuickInfo>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <QuickInfo city="Koszalin" toggleMoreInfo={toggleMoreInfo}></QuickInfo>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {detailedInfo ? <DetailedInfo city={detailedInfo} /> : ""}
          </Grid>
        </Grid>
      </div>
  );
}

export default Dashboard;