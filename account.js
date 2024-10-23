import React from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importing AccountCircleIcon
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();

  const handleSaveClick = () => {
    alert('Account details saved!');
  };

  const handleSignOut = () => {
    navigate('/loginpage'); // Redirect to login page on sign out
  };

  const handleAccountClick = () => {
    navigate('/account'); // Redirect to account page
  };

  const handleLogoClick = () => {
    navigate('/home'); // Redirect to home page when logo is clicked
  };

  return (
    <div>
      {/* AppBar Section with Clickable Logo */}
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
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

      {/* Centered Account Settings Content */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
      </div>
    </div>
  );
}

export default Account;
