import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function LawyerHome() {
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

      {/* Content Area */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: '20px' }}>
        {/* Round-edged containers */}
        <Box onClick={() => navigate('/lawyer-messages-page')} style={{ cursor: 'pointer' }}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: 'white', textAlign: 'center', width: '150px' }}>
            <Typography variant="h6" style={{ color: '#D95F0E' }}>Messages</Typography>
          </Paper>
        </Box>
        
        <Box onClick={() => navigate('/lawyer-clients-page')} style={{ cursor: 'pointer' }}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: 'white', textAlign: 'center', width: '150px' }}>
            <Typography variant="h6" style={{ color: '#D95F0E' }}>Current Clients</Typography>
          </Paper>
        </Box>
        
        <Box onClick={() => navigate('/lawyer-ratings-page')} style={{ cursor: 'pointer' }}>
          <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px', backgroundColor: 'white', textAlign: 'center', width: '150px' }}>
            <Typography variant="h6" style={{ color: '#D95F0E' }}>Ratings</Typography>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default LawyerHome;
