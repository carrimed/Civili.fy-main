import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login functionality here
    console.log('Logging in with', username, password);
    navigate('/admin-dashboard'); // Example redirect after login
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
    </div>
  );
}

export default AdminLogin;
