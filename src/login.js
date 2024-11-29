import React, { useState } from 'react';
import {
  Grid, TextField, Button, Paper, Box, Typography, IconButton, Snackbar, Alert, CircularProgress, Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [loginMode, setLoginMode] = useState('Client'); // Track whether it's Client or Lawyer login

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  const handleLoginClick = async () => {
    if (!username || !password) {
      setSnackbarMessage('Please fill in both fields.');
      setOpenSnackbar(true);
      return;
    }
  
    setLoading(true);
  
    try {
      // Use full URL with backend port (8080)
      const endpoint = loginMode === 'Client'
        ? 'http://localhost:8080/api/client/login' // Updated to backend URL
        : 'http://localhost:8080/api/lawyer/login'; // Update this for lawyer login if needed
  
      // Send login request to the backend
      const response = await axios.post(endpoint, { username, password });
  
      // Extract token from the response
      const { token } = response.data;
  
      // Save the token in local storage
      localStorage.setItem('token', token);
  
      setLoading(false);
  
      // Redirect to the respective home page
      const redirectURL = `/civilify/${loginMode.toLowerCase()}-home-page`;
      navigate(redirectURL);
    } catch (error) {
      setLoading(false);
  
      // Display error message from the backend or a generic one
      const errorMessage = error.response?.data?.message || 'Invalid username or password.';
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
  };

  const handleSignUpClick = () => {
    const signUpRoute = loginMode === 'Client' 
      ? '/civilify/client-signup-page' 
      : '/civilify/lawyer-sign-up-form'; // Correct route for Lawyer signup
  
    navigate(signUpRoute);
  };

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

          <Box display="flex" width={300} flexDirection="column" alignItems="center" style={{ fontFamily: 'Faculty Graphic' }}>
            <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />

            <Box display="flex" justifyContent="center" alignItems="center" gap={2} marginBottom="20px">
              <Typography
                onClick={() => setLoginMode('Client')}
                style={{
                  fontFamily: 'Faculty Graphic',
                  fontWeight: loginMode === 'Client' ? 'bold' : 'normal',
                  color: loginMode === 'Client' ? '#000' : '#A9A9A9',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                Client
              </Typography>
              <Typography>|</Typography>
              <Typography
                onClick={() => setLoginMode('Lawyer')}
                style={{
                  fontFamily: 'Faculty Graphic',
                  fontWeight: loginMode === 'Lawyer' ? 'bold' : 'normal',
                  color: loginMode === 'Lawyer' ? '#000' : '#A9A9A9',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                Lawyer
              </Typography>
            </Box>

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
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : `Login as ${loginMode}`}
            </Button>

            <Box display="flex" alignItems="center" justifyContent="center" width="100%" marginTop="20px">
              <Divider style={{ flexGrow: 1 }} />
              <Typography style={{ margin: '0 10px', fontFamily: 'Outfit', fontWeight: '500', fontSize: '14px' }}>
                or login with
              </Typography>
              <Divider style={{ flexGrow: 1 }} />
            </Box>

            <Box display="flex" justifyContent="center" gap={2} marginTop="15px">
              <IconButton>
                <FacebookIcon style={{ color: '#3b5998' }} />
              </IconButton>
              <IconButton>
                <GoogleIcon style={{ color: '#DB4437' }} />
              </IconButton>
            </Box>

            <Typography
              style={{
                marginTop: '20px',
                fontFamily: 'Outfit',
                fontWeight: '500',
                color: '#D9641E',
                cursor: 'pointer',
              }}
              onClick={handleSignUpClick}
            >
              No account? Sign up
            </Typography>
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

export default Login;
