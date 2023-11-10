import * as React from "react";
import { Button } from "@mui/material"
import { useState } from "react";
import PaymentDialog from "../components/PaymentComponent/PaymentDialog"

export const Payment = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="App">
            <Button 
                data-testid="payment-btn" 
                variant="contained" 
                onClick={handleClickOpen}
            >
                Make Payment
            </Button>
            <PaymentDialog 
                open={open} 
                handleClose={handleClose} 
            />
        </div>
    )
}