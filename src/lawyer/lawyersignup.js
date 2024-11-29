import React from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const specializations = [
  'Intellectual property',
  'Criminal law',
  'Family law',
  'Bankruptcy',
  'Environmental law',
  'Health law',
  'Tax law',
  'Civil and political rights',
  'Personal injury law',
  'Immigration law',
  'Property law',
  'Constitutional law',
  'International law',
  'Animal law',
  'Education',
  'Estate planning',
  'Financial law',
  'Commercial law',
  'Elder Law',
  'Employment law',
  'Corporate law',
  'Business Law',
  'Entertainment law'
];

function LawyerSignup() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/lawyer-login-page');
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: 'url(/images/loginpagebg.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, 
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        }}
      />
      <Grid item xs={12} sm={10} md={8} lg={6} style={{ margin: '0 auto', position: 'relative' }}>
        <Paper elevation={3} style={{ 
          padding: '40px 20px', 
          borderRadius: '15px', 
          backgroundColor: 'white', 
        }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" style={{ marginBottom: '20px' }}>Register</Typography>
            
            {/* Name Field */}
            <TextField
              label="Name *"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            {/* Email Field */}
            <TextField
              label="Email *"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            {/* Password Field */}
            <TextField
              label="Password *"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            {/* Specialization Field with Autocomplete */}
            <Autocomplete
              options={specializations}
              freeSolo
              disablePortal  // Ensures the dropdown opens downwards
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Specialization *"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    style: { fontSize: 16 }  // Customize font size to match
                  }}
                />
              )}
              style={{ width: '100%', marginBottom: '8px' }}
            />

            {/* Register Button */}
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
              fullWidth
              onClick={handleRegisterClick}
            >
              Register
            </Button>

            {/* Login Redirect Link */}
            <Typography 
              variant="body2" 
              style={{ 
                color: '#D95F0E', 
                marginTop: '20px', 
                cursor: 'pointer',
                transition: 'color 0.3s',
                position: 'relative',
                zIndex: 1
              }} 
              onClick={() => navigate('/lawyer-login-page')} 
              onMouseEnter={(e) => e.target.style.color = 'orange'}
              onMouseLeave={(e) => e.target.style.color = '#D95F0E'}
              onMouseDown={(e) => e.target.style.color = 'orange'}
              onMouseUp={(e) => e.target.style.color = '#D95F0E'}
            >
              Already have an account? Login
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </div>
  );
}

export default LawyerSignup;
