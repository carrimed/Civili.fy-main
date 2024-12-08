import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New state to track loading
  const [error, setError] = useState(''); // State to track error message

  const handleLogin = async () => {
    // Start loading
    setLoading(true);
    setError(''); // Reset error message

    try {
      // Make API request to backend
      const response = await axios.post('https://localhost:8080/api/admin/login', { username, password });

      // If login is successful, navigate to the admin home page
      if (response.data === "Login successful") {
        navigate('/civilify/admin-home-page');
      }
    } catch (error) {
      // Handle error (invalid credentials, etc.)
      setError('Invalid username or password');
    } finally {
      // Stop loading
      setLoading(false);
    }
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
      {/* Logo Image */}
      <img
        src="/images/logotextblack.png"
        alt="Logo"
        style={{ width: '150px', marginBottom: '20px' }}
      />

      {/* Admin Login Title */}
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

      {/* Login Form */}
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
        {/* Username TextField */}
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

        {/* Password TextField */}
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

        {/* Error Message */}
        {error && (
          <Typography color="error" style={{ marginBottom: '15px' }}>
            {error}
          </Typography>
        )}

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{
            backgroundColor: '#D9641E', // Orange color
            padding: '10px',
            fontSize: '16px',
            fontFamily: 'Outfit',
          }}
        >
          LOGIN
        </Button>
      </Box>

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

export default AdminLogin;
