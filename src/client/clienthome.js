import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function ClientHome() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending'); // Default status

  const handleSignOut = () => {
    navigate('/client-login-page');
  };

  const handleAccountClick = () => {
    navigate('/client-account-page');
  };

  const handleLogoClick = () => {
    navigate('/client-home-page');
  };

  const handleShowForm = () => {
    setShowForm(true);
    setCaseId(generateCaseId()); // Generate a random case ID
  };

  const generateCaseId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., send data to API)
    console.log('Case ID:', caseId);
    console.log('Description:', description);
    console.log('Status:', status);
    // Reset the form fields
    setShowForm(false);
    setCaseId('');
    setDescription('');
    setStatus('Pending');
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
              onMouseEnter={(e) => (e.target.style.color = 'orange')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Sign out
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        {showForm ? (
          <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Case Form
              </Typography>
              <TextField
                label="Case ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={caseId}
                InputProps={{
                  readOnly: true, // Make Case ID read-only
                }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowForm(false)}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowForm}
            style={{ width: '200px' }}
          >
            Enter Case Details
          </Button>
        )}
      </div>
    </div>
  );
}

export default ClientHome;
