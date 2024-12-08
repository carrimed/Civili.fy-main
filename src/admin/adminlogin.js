import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setSnackbarMessage(''); // Reset message
    setSnackbarOpen(false); // Close any open snackbars

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', { username, password });

      if (response.data === 'Login successful') {
        navigate('/civilify/admin-home-page');
      } else {
        setSnackbarMessage(response.data); // Display error message from backend
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage('Unable to connect to server. Please try again later.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src="/images/logotextblack.png"
        alt="Logo"
        style={{ width: '150px', marginBottom: '20px' }}
      />

      <Typography
        variant="h4"
        style={{
          fontFamily: 'Faculty Glyphic',
          color: 'black',
          marginBottom: '30px',
        }}
      >
        Admin Login
      </Typography>

      <Box
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginBottom: '15px',
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '20px',
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{
            backgroundColor: '#D9641E',
            padding: '10px',
            fontSize: '16px',
            fontFamily: 'Outfit',
          }}
        >
          LOGIN
        </Button>
      </Box>

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default AdminLogin;
