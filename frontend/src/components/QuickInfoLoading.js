import { Card, CardContent, CircularProgress, Grid } from "@mui/material";

const QuickInfoLoading = () => (
    <Grid item xs={12} sm={6} md={4} lg={3} align="center">
        <Card
            elevation={16}
            sx={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CardContent>
                <CircularProgress />
            </CardContent>
        </Card>
    </Grid>
);

export default QuickInfoLoading;
