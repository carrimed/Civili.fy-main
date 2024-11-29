import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, Box, Typography, Snackbar, CircularProgress, IconButton, Container, SnackbarContent, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';

function ClientSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // Step to track form visibility (1: initial, 2: extended)

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleBirthDateChange = (e) => {
    const birthDateValue = e.target.value;
    setBirthDate(birthDateValue);
    const calculatedAge = calculateAge(birthDateValue);
    setAge(calculatedAge);
  };

  const handleRegisterClick = async () => {
    if (!name || !username || !email || !password || (step === 2 && (!contactNumber || !birthDate || !occupation || !civilStatus || !address || !zipCode))) {
      setSnackbarMessage("Please fill in all required fields.");
      setIsSuccess(false);
      setOpenSnackbar(true);
      return;
    }
  
    setLoading(true);
  
    try {
      // Ensure correct data is being sent to the backend
      const payload = {
        name,
        username,
        email,
        contact_number: contactNumber,
        birth_date: birthDate,
        age,
        occupation,
        civil_status: civilStatus,
        address,
        zip_code: zipCode,
        password,
      };
  
      console.log("Payload being sent:", payload);  // Check what is being sent
  
      const response = await axios.post('http://localhost:8080/api/client/postClientRecord', payload);
      setSnackbarMessage("Successfully registered!");
      setIsSuccess(true);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setSnackbarMessage("Registration failed: " + (error.response?.data?.message || "Please try again."));
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  
    setTimeout(() => {
      navigate('/civilify/login-page');
      setSnackbarMessage("Redirecting to login page...");
      setIsSuccess(true);
      setOpenSnackbar(true);
      setLoading(false);
    }, 1000);
  };

  const handleNextClick = () => {
    if (step === 1) {
      setStep(2); // Move to the second step
    } else {
      handleRegisterClick(); // Register when the user is on the second step
    }
  };

  const handleBackClick = () => {
    if (step === 1) {
      navigate('/civilify/login-page'); // Navigate to login page if in step 1
    } else {
      setStep(1); // Set the step back to 1 if not in step 1
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: 'url(/images/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #D9641E, #A54C17)',
          opacity: 0.7,
          zIndex: 0,
        }}
      />
      
      <Grid item xs={12} sm={10} md={8} lg={6} style={{ zIndex: 1, marginLeft: '20px' }}>
        <Paper
          elevation={3}
          style={{
            padding: '40px',
            borderRadius: '15px',
            backgroundColor: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
            height: '650px', // Set a fixed height
            boxSizing: 'border-box',
            zIndex: 1,
            overflow: 'hidden', // Prevent overflow outside the box
          }}
        >
          <IconButton
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'black',
            }}
          >
            {backLoading ? (
              <CircularProgress size={24} style={{ color: 'black' }} />
            ) : (
              <ArrowBackIcon />
            )}
          </IconButton>

          <Box display="flex" flexDirection="column" alignItems="center" style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Typography
              variant="h4"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                color: '#D95F0E',
                fontSize: '32px',
              }}
            >
              <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', marginBottom: '10px' }} />
            </Typography>

            <Typography
              variant="h5"
              style={{
                marginBottom: '20px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '24px',
              }}
            >
              Sign Up Form
            </Typography>

            {/* Step 1 - Initial Fields */}
            {step === 1 && (
              <>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
              </>
            )}

            {step === 2 && (
              <Box style={{ overflowY: 'auto', maxHeight: 'calc(100% - 100px)' }}> {/* This keeps the form scrollable */}
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <Grid container spacing={2} style={{ maxWidth: '600px' }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Birth Date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={birthDate}
                      onChange={handleBirthDateChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Age"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={age}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    />
                  </Grid>
                </Grid>
                <FormControl fullWidth margin="normal" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <InputLabel>Civil Status</InputLabel>
                  <Select
                    value={civilStatus}
                    onChange={(e) => setCivilStatus(e.target.value)}
                    label="Civil Status"
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Occupation"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  style={{ fontFamily: 'Outfit, sans-serif', maxWidth: '600px' }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                fontFamily: 'Outfit, sans-serif',
                marginTop: '20px',
                backgroundColor: 'black',
                color: 'white',
              }}
              onClick={handleNextClick}
            >
              {step === 1 ? 'Next' : loading ? 'Registering...' : 'Register'}
            </Button>

            {/* Progress Dots */}
            <Box style={{ marginTop: '10px' }}>
              <span style={{ margin: '0 5px', fontSize: 'px', fontWeight: 'bold', color: step === 1 ? '#D95F0E' : '#ccc' }}>•</span>
              <span style={{ margin: '0 5px', fontSize: '16px', fontWeight: 'bold', color: step === 2 ? '#D95F0E' : '#ccc' }}>•</span>
            </Box>

            {/* Already have an account? Login */}
            <Typography
              variant="body1"
              style={{
                marginTop: '20px',
                color: '#D9641E',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
              }}
              onClick={() => navigate('/civilify/login-page')}
            >
              Already have an account? Login
            </Typography>
          </Box>

          {/* Snackbar */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <SnackbarContent
              style={{
                backgroundColor: isSuccess ? '#4caf50' : '#f44336',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontFamily: 'Outfit, sans-serif',
              }}
              message={
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {isSuccess ? (
                    <CheckCircleIcon style={{ marginRight: '8px' }} />
                  ) : (
                    <ErrorIcon style={{ marginRight: '8px' }} />
                  )}
                  {snackbarMessage}
                </span>
              }
            />
          </Snackbar>
        </Paper>
      </Grid>
    </div>
  );
}

export default ClientSignup;
