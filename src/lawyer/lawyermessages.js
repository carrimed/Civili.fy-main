import React from 'react';
import { Box, AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useNavigate } from 'react-router-dom';

function LawyerMessages() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/lawyer-login-page'); 
  };

  const handleAccountClick = () => {
    navigate('/lawyer-account-page'); 
  };

  const handleLogoClick = () => {
    navigate('/lawyer-home-page'); 
  };

  return (
    <>
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

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
      >
        <ConstructionIcon style={{ fontSize: 100, color: '#D95F0E' }} />
        <Typography variant="h6" style={{ marginTop: '20px', color: 'black' }}>
          Currently developing...
        </Typography>
      </Box>
    </>
  );
}

export default LawyerMessages;
