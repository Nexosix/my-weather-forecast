import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import React from "react";

function DeleteCityDialog({ location, isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent sx={{ padding: 5 }}>
                <Typography variant="h6" component="p">
                    {`Delete ${location.city}, ${location.state}?`}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onClose}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteCityDialog;
