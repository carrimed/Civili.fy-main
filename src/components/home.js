import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login-page'); // Redirect to login page on sign out
  };

  const handleAccountClick = () => {
    navigate('/account-page'); // Redirect to account page
  };

  const handleLogoClick = () => {
    navigate('/home-page'); // Redirect to home page when logo is clicked
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          {/* Clickable Logo */}
          <Typography 
            component="div" 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
            onClick={handleLogoClick}
          >
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton onClick={handleAccountClick} style={{ color: 'black' }}>
              <AccountCircleIcon />
            </IconButton>
            <Typography 
              variant="body1" 
              style={{ cursor: 'pointer', marginLeft: '15px' }} 
              onClick={handleSignOut}
              onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = 'black'}
            >
              Sign out
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <TextField
          label="Enter details of case..."
          variant="outlined"
          fullWidth
          style={{ maxWidth: '400px' }}
        />
      </div>
    </div>
  );
}

export default Home;
