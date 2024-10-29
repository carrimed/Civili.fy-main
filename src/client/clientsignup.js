import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // Change here
  const [password, setPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleRegisterClick = async () => {
    if (!name || !username || !contactNumber || !password) {
      setSnackbarMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/Client/postClientRecord', {
        name,
        username,
        contact_number: contactNumber, // Change here to match database field
        password,
      });
      setSnackbarMessage("Successfully registered!");
      setOpenSnackbar(true);
      navigate('/client-login-page');
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setSnackbarMessage("Registration failed: " + (error.response?.data?.message || "Please try again."));
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{
      position: 'relative',
      backgroundImage: 'url(/images/loginpagebg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }} />
      <Grid item xs={12} sm={10} md={8} lg={6} style={{ margin: '0 auto', position: 'relative' }}>
        <Paper elevation={3} style={{
          padding: '40px 20px',
          borderRadius: '15px',
          backgroundColor: 'white',
        }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" style={{ marginBottom: '20px' }}>Register</Typography>
            <TextField label="Name *" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Username *" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Contact Number *" variant="outlined" fullWidth margin="normal" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            <TextField label="Password *" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }} fullWidth onClick={handleRegisterClick}>
              Register
            </Button>
            <Typography variant="body2" style={{
              color: '#D95F0E',
              marginTop: '20px',
              cursor: 'pointer',
              transition: 'color 0.3s',
              position: 'relative',
              zIndex: 1
            }} onClick={() => navigate('/client-login-page')} onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = '#D95F0E'}
              onMouseDown={(e) => e.target.style.color = 'orange'}
              onMouseUp={(e) => e.target.style.color = '#D95F0E'}>
              Already have an account? Login
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
    </div>
  );
}

export default ClientSignup;
