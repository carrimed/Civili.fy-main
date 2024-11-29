import React, { useState } from 'react';
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
  DialogActions,
  Autocomplete,
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon
import { useNavigate } from 'react-router-dom';

const specializationOptions = [
  "Intellectual property", "Criminal law", "Family law", "Bankruptcy",
  "Environmental law", "Health law", "Tax law", "Civil and political rights",
  "Personal injury law", "Immigration", "Immigration law", "Property law",
  "Constitutional law", "International law", "Animal law", "Education",
  "Estate planning", "Financial law", "Commercial law", "Elder Law",
  "Employment law", "Corporate law", "Business Law", "Entertainment law",
];

function LawyerAccount() {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [specializations, setSpecializations] = useState([{ value: '' }]);

  const handleSaveClick = () => {
    // Show save confirmation dialog
    setOpenSaveDialog(true);
  };

  const handleSignOut = () => {
    navigate('/civilify/login-page');
  };

  const handleAccountClick = () => {
    navigate('/civilify/lawyer-profile-page');
  };

  const handleLogoClick = () => {
    navigate('/civilify/lawyer-home-page');
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const handleBackClick = () => {
    navigate('/civilify/lawyer-home-page');
  };

  const handleAddSpecialization = () => {
    // Prevent adding empty specialization
    if (specializations[specializations.length - 1].value !== '') {
      setSpecializations([...specializations, { value: '' }]);
    }
  };

  const handleSpecializationChange = (index, event, newValue) => {
    const updatedSpecializations = [...specializations];
    updatedSpecializations[index].value = newValue || event.target.value;
    setSpecializations(updatedSpecializations);
  };

  const handleDeleteSpecialization = (index) => {
    if (specializations.length > 1) {
      const updatedSpecializations = specializations.filter((_, i) => i !== index);
      setSpecializations(updatedSpecializations);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      {/* AppBar Section with Clickable Logo */}
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black', width: '100%' }}>
        <Toolbar>
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

      {/* Profile Picture and Greeting */}
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" marginTop="50px" marginBottom="20px">
        <Avatar
          src="/images/pfp1.jpg"
          alt="Profile Picture"
          style={{ width: '80px', height: '80px', marginRight: '10px' }}
        />
        <Typography variant="h6">Hello, <strong>Lawyer Bowsing</strong></Typography>
      </Box>

      {/* Centered Account Settings Content */}
      <Box display="flex" justifyContent="center" alignItems="center" paddingBottom={30} flexGrow={1} width="100%">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper elevation={3} style={{ padding: '40px 20px', borderRadius: '15px', backgroundColor: 'white', position: 'relative' }}>
            {/* Back button at the top left of the container */}
            <IconButton
              onClick={handleBackClick}
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                color: 'black',
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* Account Settings Form */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h5" style={{ marginBottom: '20px', marginTop: '20px' }}>Account Settings</Typography>
              <TextField
                label="Name *"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Username *"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password *"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              {/* Specialization Fields with Delete Icon */}
              {specializations.map((specialization, index) => (
                <Autocomplete
                  key={index}
                  options={specializationOptions}
                  freeSolo
                  value={specialization.value}
                  onInputChange={(event, newValue) => handleSpecializationChange(index, event, newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Specialization *"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          index !== 0 && ( // Show delete button for fields except the first
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleDeleteSpecialization(index)}
                                edge="end"
                                style={{ color: 'darkorange', padding: '8px' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        ),
                      }}
                    />
                  )}
                  style={{ width: '100%', marginBottom: '8px' }}
                />
              ))}

              {/* Add Specialization Button */}
              <Button
                variant="outlined"
                style={{ color: 'orange', marginTop: '10px', borderColor: 'orange' }}
                fullWidth
                onClick={handleAddSpecialization}
              >
                Add Specialization
              </Button>

              <Button
                variant="contained"
                style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
                fullWidth
                onClick={handleSaveClick}
              >
                Save
              </Button>

              {/* Delete Account Text Inside the Box */}
              <Typography
                variant="body2"
                style={{ cursor: 'pointer', color: 'darkorange', marginTop: '20px' }}
                onClick={handleDeleteClick}
                onMouseEnter={(e) => (e.target.style.color = 'orange')}
                onMouseLeave={(e) => (e.target.style.color = 'darkorange')}
              >
                Delete account
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Typography>
            Deleting this account will erase all your data. Are you sure?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} style={{ color: 'black' }}>
            YES
          </Button>
          <Button onClick={handleCloseDeleteDialog} style={{ color: 'black' }}>
            NO
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={openSaveDialog} onClose={handleCloseSaveDialog}>
        <DialogContent>
          <Typography>
            Your changes have been saved successfully!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog} style={{ color: 'black' }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LawyerAccount;
