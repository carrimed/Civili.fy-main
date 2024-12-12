import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientAccount() {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    username: '',
    contactNumber: '',
    password: ''
  });
  const [originalUsername, setOriginalUsername] = useState('');


  const fetchUserData = async () => {
    const username = localStorage.getItem('username');
    if (!username) return; 
    try {
      const response = await axios.get(`http://localhost:8080/api/Client/getCurrentAccount?username=${username}`);
      if (response.data) {
        setUserData(response.data);
        setOriginalUsername(response.data.username);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to fetch user data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUserData(); 
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    if (!userData.id) {
      alert('User ID is missing. Please ensure you are logged in.');
      return; 
    }

    const updatedData = { ...userData };

    try {
      
      const response = await axios.put(`http://localhost:8080/api/Client/putClientDetails/${userData.id}`, updatedData);
      if (response.status === 200) {
        setSuccess(true);
       
        if (userData.username !== originalUsername) {
          localStorage.setItem('username', userData.username);
        }
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      setSuccess(false);
    } finally {
      setOpenSaveDialog(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('username'); 
    navigate('/client-login-page');
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/Client/deleteClient/${userData.id}`);
      localStorage.removeItem('username'); 
      navigate('/client-login-page'); 
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting the account. Please try again.');
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleBackClick = () => {
    navigate('/client-home-page');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
        <Toolbar>
          <Typography component="div" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/client-home-page')}>
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton onClick={() => navigate('/client-account-page')} style={{ color: 'black' }}>
              <AccountCircleIcon />
            </IconButton>
            <Typography variant="body1" style={{ cursor: 'pointer', marginLeft: '15px' }} onClick={handleSignOut} onMouseEnter={(e) => e.target.style.color = 'orange'} onMouseLeave={(e) => e.target.style.color = 'black'}>
              Sign out
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" marginTop="50px" marginBottom="20px">
        <Avatar src="/images/pfp1.jpg" alt="Profile Picture" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
        <Typography variant="h6">Hello, <strong>{userData.username || 'User'}</strong></Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={30} flexGrow={1} width="100%">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper elevation={3} style={{ padding: '40px 20px', borderRadius: '15px', backgroundColor: 'white', position: 'relative' }}>
            <IconButton onClick={handleBackClick} style={{ position: 'absolute', top: '10px', left: '10px', color: 'black' }}>
              <ArrowBackIcon />
            </IconButton>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" style={{ marginBottom: '20px', marginTop: '20px' }}>Account Settings</Typography>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" name="name" value={userData.name} onChange={handleInputChange} placeholder={userData.name || 'Enter your name'} required />
              <TextField label="Username" variant="outlined" fullWidth margin="normal" name="username" value={userData.username} onChange={handleInputChange} placeholder={userData.username || 'Enter your username'} required />
              <TextField label="Contact Number" variant="outlined" fullWidth margin="normal" name="contactNumber" value={userData.contactNumber} onChange={handleInputChange} placeholder={userData.contactNumber || 'Enter your contact number'} required />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" name="password" value={userData.password} onChange={handleInputChange} placeholder="Enter your password" required />
              <Button variant="contained" style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }} fullWidth onClick={handleSaveClick}>
                Save
              </Button>

              <Typography variant="body2" style={{ cursor: 'pointer', color: 'darkorange', marginTop: '20px' }} onClick={handleDeleteClick} onMouseEnter={(e) => e.target.style.color = 'orange'} onMouseLeave={(e) => e.target.style.color = 'darkorange'}>
                Delete account
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Box>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Typography variant="h6">Are you sure you want to delete your account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogContent>
          {success ? (
            <Typography variant="h6">Account details saved successfully!</Typography>
          ) : (
            <Typography variant="h6">Failed to save account details. Please try again.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientAccount;
