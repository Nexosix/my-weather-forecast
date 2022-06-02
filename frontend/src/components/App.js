import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Dashboard from "./Dashboard";

function App() {
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
                        <Typography component="h2" variant="subtitle1">
                            Check the weather in any city in Poland!
                        </Typography>
                    </Box>
                </Grid>

                <Dashboard />
            </Grid>
        </Container>
    );
}

export default App;
