import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Carousel({ elements }) {
    const visibleItems = 5;
    const [counter, setCounter] = useState(0);

    return (
        <Grid container>
            <Grid
                item
                xs={2}
                sm={2}
                md={1}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={() => setCounter((prevState) => prevState - 1)}
                    disabled={counter === 0}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Grid>

            {elements
                .slice(counter, counter + visibleItems)
                .map((element, index) => {
                    return (
                        <Grid
                            item
                            key={index}
                            xs={4}
                            sm={4}
                            md={2}
                            align="center"
                        >
                            {element}
                        </Grid>
                    );
                })}

            <Grid
                item
                xs={2}
                sm={2}
                md={1}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    onClick={() => setCounter((prevState) => prevState + 1)}
                    disabled={counter === elements.length - visibleItems}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default Carousel;
