import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, Snackbar, CircularProgress, IconButton, Container, SnackbarContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function ClientSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegisterClick = async () => {
    if (!name || !email || !contactNumber || !password) {
      setSnackbarMessage("Please fill in all required fields.");
      setIsSuccess(false);
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    // Commenting out the API call for registration
    /* 
    try {
      await axios.post('http://localhost:8080/api/Client/postClientRecord', {
        name,
        email,
        contact_number: contactNumber,
        password,
      });
      setSnackbarMessage("Successfully registered!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setSnackbarMessage("Registration failed: " + (error.response?.data?.message || "Please try again."));
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
    */

    // Direct navigation to login page after a simulated delay
    setTimeout(() => {
      navigate('/civilify/client-login-page');
      setSnackbarMessage("Redirecting to login page...");
      setIsSuccess(true);
      setOpenSnackbar(true);
      setLoading(false);
    }, 1000);
  };

  const handleBackClick = () => {
    setBackLoading(true);
    setTimeout(() => {
      navigate('/civilify/client-login-page');
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
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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

      <Grid item xs={12} sm={10} md={8} lg={6} style={{ zIndex: 1, marginLeft: '20px' }}>
        <Paper
          elevation={3}
          style={{
            padding: '40px',
            borderRadius: '15px',
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
            height: 'auto',
            boxSizing: 'border-box',
            zIndex: 1,
          }}
        >
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

          <Box display="flex" flexDirection="column" alignItems="center" style={{ width: '100%' }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                color: '#D95F0E',
                fontSize: '32px',
              }}
            >
              <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', marginBottom: '10px' }} />
            </Typography>

            <Typography
              variant="h5"
              style={{
                marginBottom: '20px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
              }}
            >
              Sign Up Form
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
            />

            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px', maxWidth: '600px' }}
              fullWidth
              onClick={handleRegisterClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Sign Up'}
            </Button>

            <Typography
              variant="body2"
              style={{
                color: '#D95F0E',
                marginTop: '20px',
                cursor: 'pointer',
                transition: 'color 0.3s',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 400,
              }}
              onClick={() => navigate('/civilify/client-login-page')}
              onMouseEnter={(e) => (e.target.style.color = 'orange')}
              onMouseLeave={(e) => (e.target.style.color = '#D95F0E')}
              onMouseDown={(e) => (e.target.style.color = 'orange')}
              onMouseUp={(e) => (e.target.style.color = '#D95F0E')}
            >
              Already have an account? Login
            </Typography>
          </Box>
        </Paper>
      </Grid>

      <Box
        style={{
          color: '#FFFFFF',
          padding: '10px 20px',
          position: 'absolute',
          bottom: '0',
          left: '0',
          zIndex: 1,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Container style={{ paddingLeft: 0 }}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography variant="body2" style={{ fontFamily: 'Faculty Glyphic', fontSize: '10px' }}>
              © The Civilify Company, Cebu City
            </Typography>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          style={{
            backgroundColor: 'white',
            color: isSuccess ? '#4CAF50' : '#F44336',
            display: 'flex',
            alignItems: 'center',
          }}
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {isSuccess ? <CheckCircleIcon style={{ marginRight: 8, color: '#4CAF50' }} /> : <ErrorIcon style={{ marginRight: 8, color: '#F44336' }} />}
              {snackbarMessage}
            </span>
          }
        />
      </Snackbar>
    </div>
  );
}

export default ClientSignup;
