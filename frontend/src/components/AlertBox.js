import { Alert, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

function AlertBox({ type, message, active, onClose }) {
    const [open, setOpen] = useState(true);

    console.log(type, message, open);
    let timeout;

    useEffect(() => {
        const setup = () => {
            setOpen(true);
            timeout = setTimeout(() => {
                setOpen(false);
                onClose(null);
            }, 6000);
        };

        setup();

        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setOpen(false);
        timeout && clearTimeout(timeout);
    };

    return (
        <Collapse in={open}>
            <Alert severity={type} onClose={() => handleClose}>
                {message}
            </Alert>
        </Collapse>
    );
}

export default AlertBox;
