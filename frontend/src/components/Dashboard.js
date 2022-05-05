import { Box, Container, Dialog, DialogActions, DialogTitle, Grid, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QuickInfo from './QuickInfo';
import DetailedInfo from './DetailedInfo';
import AddCity from './AddCity';

function Dashboard(props) {

  const [detailedInfo, setDetailedInfo] = useState(null);
  const [locations, setLocations] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [locationToRemove, setLocationToRemove] = useState(null);

  useEffect(()=> {
    const getStoredLocations = () => {
      let storedLocations = localStorage.getItem("locations");
      if(storedLocations) {
        setLocations(JSON.parse(storedLocations));
      }
    }

    getStoredLocations();
  }, [])

  const handleToggleDetailedInfo = (city) => {
    if (detailedInfo === city) {
      setDetailedInfo(null);
      return;
    }

    setDetailedInfo(city);
  }

  const handleDialogOpen = (location) => {
    setLocationToRemove(location);
    setOpenDialog(true);
  }

  const handleDialogClose = (event) => {
    if (event.currentTarget.type === "button") {
      if(event.currentTarget.textContent === "Yes") {
        console.log(locationToRemove);
        deleteCard(locationToRemove);
        setLocationToRemove(null);
      }
    }
    setOpenDialog(false);
  }

  const addCard = (location) => {

    for(let loc of locations) {
      if (loc.city === location.city && loc.state === location.state) {
        alert("City already added");
        return;
      }
    }

    const existingLocations = JSON.parse(localStorage.getItem("locations"));
    existingLocations.push(location);

    setLocations(existingLocations);
    localStorage.setItem("locations", JSON.stringify(existingLocations));
    return;
  }

  const deleteCard = (location) => {

    let existingLocations = JSON.parse(localStorage.getItem("locations"));
    let locationId = -1;

    for(let i = 0; i < existingLocations.length; i++) {
      if (existingLocations[i].city === location.city && existingLocations[i].state === location.state) {
        locationId = i;
        break;
      }
    }

    if (locationId === -1) return;

    console.log(locationId);
    existingLocations.splice(locationId, 1);
    setLocations(existingLocations);
    localStorage.setItem("locations", JSON.stringify(existingLocations));
  }

  const renderCityCards = (locations) => {
    const components = []

    locations.forEach((location, index) => {
      components.push(<QuickInfo 
                        key={index} 
                        location={location}
                        onToggle={handleToggleDetailedInfo} 
                        active={detailedInfo === location.city}
                        onDelete={handleDialogOpen}
                        />)
    })

    return components;
  }

  return (
      <Container sx={{ paddingY: 1 }}>
        <Grid container rowSpacing={4} columnSpacing={2} justifyContent='center'>
  
          <Grid item xs={12} marginTop={3} marginBottom={2}>
            <Box sx={{
              textAlign: 'center'
            }}>
            <Typography component="h1" variant="h3">My Weather Forecast</Typography>
            <Typography component="h2" variant="subtitle1">Check the weather in any city in Poland!</Typography>
            </Box>
          </Grid>

          <Grid item xs={8} sm={12} >
            <Grid container rowSpacing={4} columnSpacing={2} justifyContent="center" >
              {renderCityCards(locations)}
              <AddCity handleAdd={addCard} />
            </Grid>
          </Grid>

          {detailedInfo ? <Grid item xs={12}><DetailedInfo city={detailedInfo} /></Grid> : null}

        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
        >
          <DialogTitle>Delete Card Info about {locationToRemove && locationToRemove.city}, {locationToRemove && locationToRemove.state} ?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={handleDialogClose}>Yes</Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
}

export default Dashboard;