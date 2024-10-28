import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests

function ClientLogin() {
  const [username, setUsername] = useState(''); // Updated to use username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username, 
        password,
      });

      if (response.data.success) {
        // If login is successful, redirect to the client home page
        navigate('/client-home-page');
      } else {
        // If login fails, display error message
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignUpClick = () => {
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
            <ArrowBackIcon />
          </IconButton>

          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
              Logging in as client
            </Typography>

            {/* Show error message */}
            {error && (
              <Typography variant="body2" color="error" style={{ marginBottom: '20px' }}>
                {error}
              </Typography>
            )}

            <TextField
              label="Username *" // Updated label
              variant="outlined"
              fullWidth
              margin="normal"
              value={username} // Changed to username
              onChange={(e) => setUsername(e.target.value)} // Changed to setUsername
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
            >
              No account? Sign up
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
}

export default ClientLogin;
