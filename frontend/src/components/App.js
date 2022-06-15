import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AlertBox from "./AlertBox";
import Dashboard from "./Dashboard";

function App() {
    const [alertInfo, setAlertInfo] = useState(null);

    return (
        <Container sx={{ paddingTop: 5 }}>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={2}
                justifyContent="center"
            >
                <Grid
                    item
                    xs={12}
                    marginTop={3}
                    marginBottom={2}
                    justifyContent="center"
                >
                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <Typography component="h1" variant="h3">
                            My Weather Forecast
                        </Typography>
                    </Box>
                </Grid>

                {alertInfo && (
                    <Grid item xs={12} md={6}>
                        <AlertBox
                            type={alertInfo.type}
                            message={alertInfo.message}
                            active={true}
                            onClose={setAlertInfo}
                        />
                    </Grid>
                )}
                <Dashboard onAlert={setAlertInfo} />
            </Grid>
        </Container>
    );
}

export default App;
