import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Paper, Box, Grid, Snackbar, Alert, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// For the Book Appointment Form
const StyledButton = styled(Button)(({ theme, colorType }) => ({
    backgroundColor: colorType === 'red' ? '#D32F2F' : colorType === 'green' ? '#388E3C' : '#000000',
    color: '#F1F1F1',
    '&:hover': {
        backgroundColor: colorType === 'red' ? '#C62828' : colorType === 'green' ? '#2C6B2F' : '#333333',
    },
    fontSize: '1rem',
    padding: '10px 20px',
    marginTop: '20px',
    fontFamily: 'Outfit, sans-serif',
    width: '45%', // For both buttons to align nicely
    margin: '5px', // Add space between the buttons
}));

function ClientAppointmentForm() {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({ date: '', time: '', message: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false); // Track checkbox state

    const handleInputChange = (e) => {
        setAppointmentDetails({ ...appointmentDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!appointmentDetails.date || !appointmentDetails.time || !appointmentDetails.message || !termsAccepted) {
            setMessage('Please fill in all fields and accept the terms');
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

    const handleDiscard = () => {
        setAppointmentDetails({ date: '', time: '', message: '' }); // Clear form fields
        setTermsAccepted(false); // Reset checkbox
        setOpen(false); // Close the modal
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked); // Update checkbox state
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
                        padding: '30px', width: '450px', minHeight: '400px', textAlign: 'center', backgroundColor: '#F1F1F1',
                        fontFamily: 'Outfit, sans-serif', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ color: '#41423A', fontWeight: 600 }}>
                                Booking appointment for: James Bond
                            </Typography>
                            <Button onClick={() => setOpen(false)} sx={{ minWidth: 0, padding: 0 }}>
                                <CloseIcon sx={{ color: '#D9641E' }} />
                            </Button>
                        </Box>
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            <Grid item xs={12}>
                                <TextField
                                    name="date"
                                    label="Select Date"
                                    type="date"
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="time"
                                    label="Select Time"
                                    type="time"
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    label="Message or Concern"
                                    multiline
                                    rows={6}  // Adjusted height for the message field
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}

                                />
                            </Grid>
                        </Grid>

                        {/* Checkbox for Terms and Conditions */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',  // Center the checkbox and text horizontally
                            marginTop: '5px',  // Reduced top margin
                            marginBottom: '5px', // Reduced bottom margin
                        }}>
                            <Checkbox
                                checked={termsAccepted}
                                onChange={handleCheckboxChange}
                                sx={{ color: '#D9641E' }}
                            />
                            <Typography sx={{ fontSize: '14px', marginLeft: '5px' }}>
                                I agree to Civilify's Rules and Regulations
                            </Typography>
                        </Box>

                        {/* Positioning DISCARD and BOOK Buttons at the Bottom */}
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <StyledButton onClick={handleDiscard} colorType="red" sx={{ width: '100%' }}>DISCARD</StyledButton>
                            <StyledButton onClick={handleSubmit} colorType="green" sx={{ width: '100%' }} disabled={!termsAccepted}>BOOK</StyledButton>
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
