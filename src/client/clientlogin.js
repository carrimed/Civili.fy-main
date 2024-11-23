import React, { useState } from 'react';
import {
  Grid, TextField, Button, Paper, Box, Typography, IconButton, Snackbar, Alert, Container, CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls

function ClientLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);

  // Function to handle Snackbar close
  const handleClose = () => {
    setOpenSnackbar(false);
  };

  // Handle the login click event
  const handleLoginClick = async () => {
    if (!username || !password) {
      setSnackbarMessage('Please fill in both fields.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/Client/login', {
        username,
        password,
      });

      // Assuming the token is returned in the response body
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage

      setLoading(false);
      navigate('/civilify/client-home-page');
    } catch (error) {
      setLoading(false);
      setSnackbarMessage('Invalid username or password.');
      setOpenSnackbar(true);
    }
  };

  // Navigate to signup page
  const handleSignUpClick = () => {
    navigate('/civilify/client-signup-page');
  };

  // Handle back navigation with loading indicator
  const handleBackClick = () => {
    setBackLoading(true);
    setTimeout(() => {
      navigate('/civilify/landing-page');
      setBackLoading(false);
    }, 500);
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: 'url(/images/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100vw',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #D9641E, #A54C17)',
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      <Grid item xs={12} sm={10} md={8} lg={6} style={{ zIndex: 1 }}>
        <Paper elevation={3} style={{ padding: '40px 20px', borderRadius: '15px', backgroundColor: 'white', position: 'relative' }}>
          <IconButton
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'black',
            }}
          >
            {backLoading ? (
              <CircularProgress size={24} style={{ color: 'black' }} />
            ) : (
              <ArrowBackIcon />
            )}
          </IconButton>

          <Box display="flex" width={300} flexDirection="column" alignItems="center" style={{ fontFamily: 'Outfit' }}>
            <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              label="Email / Username"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ style: { fontFamily: 'Outfit', fontWeight: '500' } }}
            />

            <TextField
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { fontFamily: 'Outfit', fontWeight: '500' } }}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px', fontFamily: 'Outfit', fontWeight: '600' }}
              fullWidth
              onClick={handleLoginClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity="error"
          style={{ backgroundColor: 'white', color: '#D32F2F' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ClientLogin;
