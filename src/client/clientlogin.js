import React, { useState } from 'react';
import {
  Grid, TextField, Button, Paper, Box, Typography, IconButton, Snackbar, Alert, Container, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

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
  const handleLoginClick = () => {
    if (!username || !password) {
      setSnackbarMessage("Please fill in both fields.");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Redirects to client home page regardless of input
      navigate('/civilify/client-home-page');
      setLoading(false);
    }, 2000); // Simulating a delay to show the spinner
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
              label="Email"
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

            <Typography
              variant="body2"
              style={{
                color: '#D95F0E',
                cursor: 'pointer',
                fontSize: '12px',
                textAlign: 'center',
                marginTop: '10px',
              }}
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Typography>

            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px', fontFamily: 'Outfit', fontWeight: '600' }}
              fullWidth
              onClick={handleLoginClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
            </Button>

            <Box style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>
              <Typography variant="body2" style={{ color: 'black', fontSize: '12px', textShadow: '0 0 5px white', marginTop: '15px' }}>
                or sign in with
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" style={{ marginTop: '10px' }}>
              <IconButton
                style={{
                  backgroundColor: '#3b5998',
                  color: 'white',
                  marginRight: '10px',
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                style={{
                  backgroundColor: '#db4437',
                  color: 'white',
                }}
              >
                <GoogleIcon />
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              style={{
                color: '#D95F0E',
                marginTop: '20px',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onClick={handleSignUpClick}
              onMouseEnter={(e) => (e.target.style.color = 'orange')}
              onMouseLeave={(e) => (e.target.style.color = '#D95F0E')}
            >
              No account? Sign up
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
          textAlign: 'left',
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

      {/* Loading Spinner (pachuy2) */}
      {loading && (
        <Box
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <CircularProgress size={50} style={{ color: '#D9641E' }} />
        </Box>
      )}
    </div>
  );
}

export default ClientLogin;
