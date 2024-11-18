import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Paper, Box, Grid2, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';


//for the BookAppointment Form 
const StyledButton = styled(Button)({
    backgroundColor: '#D9641E',
    color: '#F1F1F1',
    '&:hover': {
        backgroundColor: '#ED7D27',
    },
    fontSize: '1rem',
    padding: '10px 20px',
    marginTop: '20px'
});

function ClientAppointmentForm() {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({ date: '', time: '', message: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAppointmentDetails({ ...appointmentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.message) {
            setMessage('Please fill in all fields');
            setSnackbarOpen(true);
            return;
        }
        setSubmitted(true);
        setMessage('Appointment Request Sent!');
        setSnackbarOpen(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false); // Close the form after a brief confirmation
        }, 3000);  // Show success message briefly
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <StyledButton onClick={() => setOpen(true)}>Book Appointment</StyledButton>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}>
                    <Paper elevation={3} sx={{
                        padding: '40px', width: '500px', height: '600px', textAlign: 'center', backgroundColor: '#F1F1F1'
                    }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ color: '#41423A' }}>
                                Book an Appointment
                            </Typography>
                            <Button onClick={() => setOpen(false)} sx={{ minWidth: 0, padding: 0 }}>
                                <CloseIcon sx={{ color: '#D9641E' }} />
                            </Button>
                        </Box>
                        <Grid2 container spacing={2} sx={{ marginTop: '20px' }}>
                            <Grid2 item xs={12}>
                                <TextField
                                    name="date"
                                    label="Select Date"
                                    type="date"
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>
                            <Grid2 item xs={12}>
                                <TextField
                                    name="time"
                                    label="Select Time"
                                    type="time"
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>
                            <Grid2 item xs={12}>
                                <TextField
                                    name="message"
                                    label="Message or Concern"
                                    multiline
                                    rows={8}  // Increased rows for larger message box (vertical size)
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        marginBottom: '20px', 
                                        // Adjust width if needed (set to fullWidth or a fixed width)
                                    }}
                                />
                            </Grid2>
                        </Grid2>
                        {/* Positioning Submit Button at the Bottom */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <StyledButton onClick={handleSubmit}>Submit</StyledButton>
                        </Box>

                        {submitted && (
                            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', color: '#D9641E' }}>
                                <CheckCircleOutlineIcon />
                                <Typography sx={{ ml: 1 }}>Appointment Request Sent!</Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Modal>

            {/* Snackbar for displaying messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={message === 'Appointment Request Sent!' ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ClientAppointmentForm;