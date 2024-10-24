import React from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, AppBar, Toolbar, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();

  const handleSaveClick = () => {
    alert('Account details saved!');
  };

  const handleSignOut = () => {
    navigate('/login-page');
  };

  const handleAccountClick = () => {
    navigate('/account-page');
  };

  const handleLogoClick = () => {
    navigate('/home-page');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* AppBar Section with Clickable Logo */}
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
        <Toolbar>
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

      {/* Profile Picture and Greeting */}
      <Box display="flex" flexDirection="column" alignItems="center" padding="20px">
        <Avatar
          src="/images/pfp1.jpg" 
          alt="Profile Picture"
          style={{ width: '80px', height: '80px', marginTop: '30px' }}
        />
        <Typography variant="h6">Hello, <strong>my idol</strong></Typography>
      </Box>

      {/* Centered Account Settings Content */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom={30}
        flexGrow={1}
        width="100%"
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper elevation={3} style={{ 
            padding: '40px 20px', 
            borderRadius: '15px', 
            backgroundColor: 'white',
          }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" style={{ marginBottom: '20px' }}>Account Settings</Typography>
              <TextField
                label="Name *"
                variant="outlined"
                fullWidth
                margin="normal"
              />
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
                onClick={handleSaveClick}
              >
                Save
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </div>
  );
}

export default Account;
