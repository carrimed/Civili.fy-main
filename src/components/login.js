import React from 'react';
import { Grid, TextField, Button, Paper, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/home-page');
  };

  const handleSignUpClick = (event) => {
    navigate('/signup-page'); 
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
        <Paper elevation={3} style={{ 
          padding: '40px 20px', 
          borderRadius: '15px', 
          backgroundColor: 'white', 
        }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
            <TextField
              label="Username *"
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
    </div>
  );
}

export default Login;
