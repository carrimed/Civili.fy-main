import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Card,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientUpdateProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    clientId: '',
    name: '',
    username: '',
    email: '',
    contactNumber: '',
    birthdate: '',
    civilStatus: '',
    occupation: '',
    address: '',
    zipcode: '',
    profilePicture: '', // To store profile photo
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null); // To store new profile photo

  // Fetch current profile data
  useEffect(() => {
    const fetchClientData = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (username && password) {
        try {
          const response = await axios.post('http://localhost:8080/api/client/login', {
            loginField: username,
            password: password,
          });
          
          const clientId = response.data.clientId;
          const clientDetailsResponse = await axios.get(`http://localhost:8080/api/client/findById/${clientId}`);
          const profilePictureResponse = await axios.get(`http://localhost:8080/api/client/getProfilePicture/${clientId}`);

          const profilePictureData = profilePictureResponse.data;
          setFormData({
            ...clientDetailsResponse.data,
            profilePicture: `data:image/jpeg;base64,${profilePictureData}`,
          });
        } catch (error) {
          console.error("Error fetching client data:", error);
        }
      }
    };
    fetchClientData();
  }, []);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/civilify/login-page');
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
        setNewProfilePicture(file); // Store the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const clientId = formData.clientId;
  
    // Log the form data to check its contents
    console.log('Form Data:', formData);
  
    // Construct the data object for the request, adding the clientId
    const dataToSend = {
      ...formData, // client details
      clientId: clientId, // Explicitly pass clientId if necessary (for RequestParam usage)
    };
  
    // Update client details
    try {
      const response = await axios.put(
        `http://localhost:8080/api/client/putClientDetails`, // Note that clientId is passed as a part of the body if needed
        dataToSend
      );
      console.log('Client updated successfully:', response.data);
  
      // If there's a new profile picture, update it
      if (newProfilePicture) {
        const formDataForProfilePicture = new FormData();
        formDataForProfilePicture.append('profilePicture', newProfilePicture);
        console.log('Profile Picture Data:', formDataForProfilePicture);
  
        const profilePictureResponse = await axios.put(
          `http://localhost:8080/api/client/updateProfilePicture/${clientId}`, // Assuming clientId is part of the URL for the profile picture update
          formDataForProfilePicture,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Profile picture updated:', profilePictureResponse.data);
      }
  
      // Navigate back to profile page after save
      navigate('/civilify/client-profile-page');
    } catch (error) {
      // Log the detailed error response from the backend
      console.error('Error updating profile:', error.response ? error.response : error);
    }
  };
  
  
  

  const handleDiscard = () => {
    setFormData({ ...formData }); // Reset to original data
    navigate('/civilify/client-profile-page');
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
      <Box style={styles.header}>
        <img
          src="/images/logoiconblack.png"
          alt="Logo"
          style={{ width: '50px', height: '50px' }}
        />
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
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="civilStatus-label">Civil Status</InputLabel>
          <Select
            labelId="civilstatus-label"
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Occupation"
          name="occupation"
          value={formData.occupation}
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

      <Box style={styles.footer}>
        <span>© The Civilify Company, 2024 | All Rights Reserved</span>
      </Box>
    </div>
  );
}

export default ClientUpdateProfile;