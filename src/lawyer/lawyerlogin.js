import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function LawyerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    setLoading(true); // Show loading spinner
    setTimeout(() => {
      navigate('/civilify/client-home-page'); // Redirect to client home page
      setLoading(false); // Hide loading spinner after navigation
    }, 2000);
  };

  const handleSignUpClick = () => {
    navigate('/lawyer-signup-page'); 
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
        <Paper elevation={3} style={{ padding: '40px 20px', borderRadius: '15px', backgroundColor: 'white', position: 'relative' }}>
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
            <Typography variant="h9" style={{ marginBottom: '20px' }}>
              Logging in as LAWYER
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password *"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
              fullWidth
              onClick={handleLoginClick}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
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

      {/* Loading Spinner */}
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

export default LawyerLogin;
