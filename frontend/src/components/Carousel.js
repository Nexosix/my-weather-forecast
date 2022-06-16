import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useWindowSize from "../hooks/useWindowSize";

function Carousel({ elements }) {
    const windowSize = useWindowSize();
    const [counter, setCounter] = useState(0);

    let visibleItems = windowSize.width > 640 ? 5 : 3;

    return (
        <Grid container justifyContent="center">
            <Grid
                item
                xs={1}
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
                        <Grid item key={index} xs={3} sm={2} align="center">
                            {element}
                        </Grid>
                    );
                })}

            <Grid
                item
                xs={1}
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
