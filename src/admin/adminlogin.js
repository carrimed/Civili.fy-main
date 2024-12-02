import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New state to track loading
  const [error, setError] = useState(''); // Error state to handle invalid login attempts

  const handleLogin = async () => {
    // Start loading
    setLoading(true);
    setError(''); // Reset error before each attempt

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        username,
        password,
      });

      // Assuming the response returns a success status or token
      if (response.data.success) {
        console.log('Login successful');
        navigate('/civilify/admin-home-page'); // Redirect after successful login
      } else {
        setError('Invalid credentials'); // Handle invalid login
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
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
          <Typography color="error" style={{ marginBottom: '10px' }}>
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