import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Card,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClientUpdateProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    birthdate: '',
    civilstatus: '',
    job: '',
    address: '',
    zipcode: '',
    profilePicture: '', // To store profile photo
  });

  // Fetch profile data from localStorage when component loads
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
    setFormData(storedData);
  }, []);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(formData));
    console.log('Profile saved:', formData);
    navigate('/civilify/client-profile-page');
  };

  const handleDiscard = () => {
    const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
    setFormData(storedData); // Reset to the stored profile data
  };

  const styles = {
    header: {
      position: 'absolute',
      top: 0,
      width: '70%',
      height: '70px',
      backgroundColor: '#f9f9f9',
      borderBottomLeftRadius: '30px',
      borderBottomRightRadius: '30px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    footer: {
      backgroundColor: '#41423A',
      width: '100%',
      height: '20px',
      display: 'flex',
      alignItems: 'left',
      justifyContent: 'left',
      paddingLeft: '10px',
      color: 'white',
      fontFamily: 'Faculty Glyphic',
      fontSize: '10px',
      position: 'fixed',
      bottom: '0',
      left: '0',
    },
    card: {
      width: '50%',
      margin: '100px auto',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    profilePicture: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      marginBottom: '20px',
    },
  };

  return (
    <div>
      {/* Header Section */}
      <Box style={styles.header}>
        <img
          src="/images/logoiconblack.png"
          alt="Logo"
          style={{ width: '50px', height: '50px' }}
        />
        <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {['Support', 'Requests', 'Profile'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              style={{
                color: '#632F0F',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                fontWeight: '500',
              }}
              onClick={item === 'Profile' ? handleProfileClick : undefined}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Profile Form */}
      <Box style={{ padding: '20px', backgroundColor: '#f4f4f4', marginTop: '100px' }}>
        <Typography variant="h5">Update Profile</Typography>
      </Box>

      <Card style={styles.card}>
        <Box>
          <img
            src={formData.profilePicture || '/images/default-profile.png'}
            alt="Profile"
            style={styles.profilePicture}
          />
          <label htmlFor="profilePhoto">
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handlePhotoChange}
            />
            <Button variant="outlined" component="span">
              Upload Photo
            </Button>
          </label>
        </Box>

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Civil Status"
          name="civilstatus"
          value={formData.civilstatus}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Job"
          name="job"
          value={formData.job}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box mt={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Card>

      {/* Footer Section */}
      <Box style={styles.footer}>
        <span>© The Civilify Company, 2024 | All Rights Reserved</span>
      </Box>
    </div>
  );
}

export default ClientUpdateProfile;
