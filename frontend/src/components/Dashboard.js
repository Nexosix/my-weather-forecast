import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import QuickInfo from './QuickInfo';
import DetailedInfo from './DetailedInfo';
import AddCity from './AddCity';

function Dashboard(props) {

  const [detailedInfo, setDetailedInfo] = useState(null);

  const toggleMoreInfo = (city) => {
    if (detailedInfo === city) {
      setDetailedInfo(null);
      return;
    }

    setDetailedInfo(city);
  }

  return (
      <Container sx={{ paddingY: 1 }}>
        <Grid container rowSpacing={4} columnSpacing={2}>
  
          <Grid item xs={12} marginTop={3} marginBottom={2}>
            <Box sx={{
              textAlign: 'center'
            }}>
            <Typography component="h1" variant="h3">My Weather Forecast</Typography>
            <Typography component="h2" variant="subtitle1">Check the weather in any city in Poland!</Typography>
            </Box>
          </Grid>

          <QuickInfo city="Szczecin" toggleMoreInfo={toggleMoreInfo} active={detailedInfo === "Szczecin"}/>
          <QuickInfo city="Police" toggleMoreInfo={toggleMoreInfo} active={detailedInfo === "Police"}/>
          <QuickInfo city="Koszalin" toggleMoreInfo={toggleMoreInfo} active={detailedInfo === "Koszalin"}/>
          <AddCity />

          {detailedInfo ? <Grid item xs={12}><DetailedInfo city={detailedInfo} /></Grid> : null}

        </Grid>
      </Container>
  );
}

export default Dashboard;