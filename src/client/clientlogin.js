import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, IconButton, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLoginClick = async () => {
    if (!username || !password) {
      setSnackbarMessage("Please fill in both fields.");
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/Client/login', {
        username,
        password,
      });
  
      // Assuming the backend returns a success message or token upon successful login
      if (response.data.success) {
        // Store username in localStorage
        localStorage.setItem('username', username);
        navigate('/client-home-page'); // Redirect to the client home page
      } else {
        setSnackbarMessage("Invalid username or password.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setSnackbarMessage("Login failed: " + (error.response?.data?.message || "Please try again."));
      setOpenSnackbar(true);
    }
  };
  

  const handleSignUpClick = (event) => {
    navigate('/client-signup-page');
  };

  const handleBackClick = () => {
    navigate('/landing-page');
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: 'url(/images/loginpagebg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />

      <Grid item xs={12} sm={10} md={8} lg={6} style={{ margin: '0 auto', position: 'relative' }}>
        <Paper elevation={3} style={{ 
          padding: '40px 20px', 
          borderRadius: '15px', 
          backgroundColor: 'white', 
          position: 'relative',
        }}>
          {/* Back arrow at the top left */}
          <IconButton
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'black',
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
              Logging in as client
            </Typography>
            <TextField
              label="Username *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password *"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
              fullWidth
              onClick={handleLoginClick}
            >
              Login
            </Button>
            <Typography 
              variant="body2" 
              style={{ 
                color: '#D95F0E', 
                marginTop: '20px', 
                cursor: 'pointer',
                transition: 'color 0.3s',
                position: 'relative',
                zIndex: 1 
              }} 
              onClick={handleSignUpClick}
              onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = '#D95F0E'}
              onMouseDown={(e) => e.target.style.color = 'orange'}
              onMouseUp={(e) => e.target.style.color = '#D95F0E'}
            >
              No account? Sign up
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)} 
        message={snackbarMessage} 
      />
    </div>
  );
}

export default ClientLogin;
