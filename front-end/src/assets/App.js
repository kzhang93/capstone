import React, { useState } from 'react';
import { Button, Dialog, List, ListItem, DialogTitle, DialogActions } from '@mui/material';
import { DatePicker } from '@mui/lab';

function NewAppointment() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const timeSlots = [
        '00:00-02:00', '02:00-04:00', '04:00-06:00', '06:00-08:00',
        '08:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00',
        '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-00:00'
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Here, you can make an API call to get available time slots for the selected date
        setOpenDialog(true);
    };

    const handleSlotSelection = (slot) => {
        setSelectedTimeSlot(slot);
        // Notify the backend of the selected appointment time, await confirmation
        setOpenDialog(false);
        // Show some notification to user about the confirmation or proposed alternate time
    };

    return (
        <div>
            <h2>Select a date for appointment</h2>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Select a time slot</DialogTitle>
                <List>
                    {timeSlots.map(slot => (
                        <ListItem button key={slot} onClick={() => handleSlotSelection(slot)}>
                            {slot}
                        </ListItem>
                    ))}
                </List>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewAppointment;
