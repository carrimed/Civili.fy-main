import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, Paper, Box, Grid, Snackbar, Alert, Checkbox } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';


const StyledButton = styled(Button)(({ theme, colorType }) => ({
    backgroundColor: colorType === 'red' ? '#D32F2F' : colorType === 'green' ? '#388E3C' : colorType === 'orange' ? '#FFA500' : '#000000',
    color: '#F1F1F1',
    '&:hover': {
        backgroundColor: colorType === 'red' ? '#C62828' : colorType === 'green' ? '#2C6B2F' : colorType === 'orange' ? '#FF8C00' : '#333333',
    },
    fontSize: '1rem',
    padding: '10px 20px',
    fontFamily: 'Outfit, sans-serif',
    width: '100%', 
}));

function ClientAppointmentForm({ lawyerId }) {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({ date: '', time: ''});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false); 
    const [clientId, setClientId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    useEffect(() => {
        const fetchClientDetails = async () => {
            const username = localStorage.getItem('username');
            const password = localStorage.getItem('password');

            if (!username || !password) {
                setMessage('Username or password not found. Please log in again.');
                setSnackbarOpen(true);
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/api/client/login', {
                    loginField: username,
                    password: password,
                });

                const { clientId } = response.data;
                setClientId(clientId);
            } catch (error) {
                setMessage('Failed to fetch client details. Please log in again.');
                setSnackbarOpen(true);
            }
        };

        fetchClientDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            setAppointmentDate(value);
        } else if (name === 'time') {
            setAppointmentTime(value);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = appointmentDate;
        const formattedTime = `${appointmentTime}:00`; 

        const appointmentData = {
            date: formattedDate,  
            time: formattedTime,  
        };

        if (!clientId || !lawyerId) {
            setMessage('Client or lawyer ID not found.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/appointment/postAppointmentRecord',
                appointmentData,
                {
                    params: {
                        clientId: clientId,
                        lawyerId: lawyerId,
                    },
                }
            );

            console.log(response.data);
            setMessage('Appointment successfully created!');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error posting appointment:', error.response.data);
            setMessage('Error posting appointment');
            setSnackbarOpen(true);
        }
    };

    const handleDiscard = () => {
        setAppointmentDetails({ date: '', time: ''});
        setTermsAccepted(false);
        setOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    return (
        <>
            <StyledButton colorType="orange" onClick={() => setOpen(true)}>Book Appointment</StyledButton>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}>
                    <Paper elevation={3} sx={{
                        padding: '30px', width: '450px', minHeight: '400px', textAlign: 'center', backgroundColor: '#F1F1F1',
                        fontFamily: 'Outfit, sans-serif', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ color: '#41423A', fontWeight: 600 }}>
                                Booking appointment:
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
                                    value={appointmentDate}
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
                                    value={appointmentTime}
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
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>

                        {/* Checkbox for Terms and Conditions */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',  
                            marginTop: '5px',  
                            marginBottom: '5px',
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
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <StyledButton onClick={handleDiscard} colorType="red" sx={{ width: '100%' }}>DISCARD</StyledButton>
                            <StyledButton onClick={handleSubmit} colorType="green" sx={{ width: '100%' }} disabled={!termsAccepted}>
                                BOOK
                            </StyledButton>
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
};

export default ClientAppointmentForm;