import React, { useState } from "react";
import { Button } from "@mui/material";
import PaymentDialog from "../components/PaymentComponent/PaymentDialog";

const Payment: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

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
    );
};

export default Payment;
