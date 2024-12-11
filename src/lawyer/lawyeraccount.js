import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';

function LawyerAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    specialization: '',
    contactNumber: '',
    officeAddress: '',
    birthdate: '',
    yearsOfExperience: '',
    zipcode: '',
    consultationFee: '',
    hourlyRate: '',
    password: '',
    profilePicture: '', // To store profile photo
    lawyerType: '', // Added field for lawyer type
  });

  useEffect(() => {
    const fetchLawyerData = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
  
      if (username && password) {
        try {
          const response = await axios.post('http://localhost:8080/api/lawyer/login', {
            loginField: username,
            password: password,
          });
  
          const lawyerId = response.data.lawyerId;
          const lawyerDetailsResponse = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
          const profilePictureResponse = await axios.get(`http://localhost:8080/api/lawyer/getProfilePicture/${lawyerId}`);
  
          const profilePictureData = profilePictureResponse.data;
          setFormData({
            ...lawyerDetailsResponse.data,
            profilePicture: `data:image/jpeg;base64,${profilePictureData}`,
          });
        } catch (error) {
          console.error("Error fetching lawyer data:", error);
        }
      }
    };
    fetchLawyerData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/lawyer/updateProfile`, // Endpoint to update lawyer profile
        formData
      );
      console.log('Lawyer profile updated successfully:', response.data);
      navigate('/civilify/lawyer-profile-page'); // Navigate back after save
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response : error);
    }
  };

  const handleDiscard = () => {
    setFormData({ ...formData }); // Reset to original data
    navigate('/civilify/lawyer-profile-page');
  };

  const handleProfileClick = () => navigate('/civilify/lawyer-profile-page');
  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/civilify/login-page');
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
        <Box display="flex" alignItems="center" marginLeft="auto">
          <IconButton onClick={handleProfileClick} style={{ color: 'black' }}>
            <AccountCircle />
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
      </Box>

      <Card style={styles.card}>
        <Box>
          <img
            src={formData.profilePicture || '/images/default-profile.png'}
            alt="Profile"
            style={styles.profilePicture}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Office Address"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Years of Experience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Consultation Fee"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hourly Rate"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="lawyerType-label">Lawyer Type</InputLabel>
              <Select
                labelId="lawyerType-label"
                name="lawyerType"
                value={formData.lawyerType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Corporate">Corporate</MenuItem>
                <MenuItem value="Public">Public</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

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

export default LawyerAccount;