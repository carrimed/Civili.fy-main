import React from 'react';
import { Box, Typography, Button, Avatar, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url('/images/loginpagebg.jpg')`, // Same background as login.js
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box 
        sx={{
          width: '80%',
          height: '80%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Left Column - Client Section */}
        <Box 
          sx={{
            width: '50%',
            paddingRight: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '30px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              backgroundColor: 'white', 
              borderRadius: '10px',
            }}
          >
            <Avatar sx={{ bgcolor: 'black', width: 80, height: 80, marginBottom: '20px' }}>
              <PersonIcon style={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                marginBottom: '10px',
              }}
              onClick={() => navigate('/client-login-page')}
            >
              Continue as User
            </Button>
            <Typography 
              variant="body2" 
              style={{ 
                color: 'darkorange', 
                cursor: 'pointer',
              }}
              onClick={() => navigate('/client-signup-page')}
              onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = 'darkorange'}
            >
              Sign up for a client account
            </Typography>
          </Paper>
        </Box>

        {/* Vertical Line */}
        <Box
          sx={{
            height: '100%',
            width: '1px',
            backgroundColor: 'white',
            position: 'absolute',
            left: '50%',
            top: '0',
            bottom: '0',
          }}
        />

        {/* Right Column - Lawyer Section */}
        <Box 
          sx={{
            width: '50%',
            paddingLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              padding: '30px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              backgroundColor: 'white', 
              borderRadius: '10px',
            }}
          >
            <Avatar sx={{ bgcolor: 'black', width: 80, height: 80, marginBottom: '20px' }}>
              <GavelIcon style={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px 20px',
                marginBottom: '10px',
              }}
              onClick={() => navigate('/lawyer-login-page')}
            >
              Continue as Lawyer
            </Button>
            <Typography 
              variant="body2" 
              style={{ 
                color: 'darkorange', 
                cursor: 'pointer',
              }}
              onClick={() => navigate('/lawyer-signup-page')}
              onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = 'darkorange'}
            >
              Sign up for a lawyer account
            </Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default Landing;
