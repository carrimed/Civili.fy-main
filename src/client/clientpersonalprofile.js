import React, { useState, useEffect } from 'react';
import { Box, Select, Typography, Menu, MenuItem, Divider, Card, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import MaritalStatusIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';


const ClientPersonalProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null); // State for new profile picture
  const navigate = useNavigate();

  const fetchClientDetails = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const clientDetailsResponse = await axios.post('http://localhost:8080/api/client/login', {
        loginField: username,
        password: password,
      });

      const clientId = clientDetailsResponse.data.clientId;

      if (clientId) {
        const clientDetailsResponse = await axios.get(`http://localhost:8080/api/client/findById/${clientId}`);
        const profilePictureResponse = await axios.get(`http://localhost:8080/api/client/getProfilePicture/${clientId}`);

        const profilePictureData = profilePictureResponse.data;
        setClientDetails(clientDetailsResponse.data);
        setProfilePicture(`data:image/jpeg;base64,${profilePictureData}`);
      } else {
        setError("Failed to fetch client details.");
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      setError("Failed to load client details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      fetchClientDetails(username, password);
    } else {
      setError("No login details found.");
    }
  }, []);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleEditProfileRedirect = () => {

    navigate('/civilify/client-update-profile-page'); // Navigate to the desired route
  };

  const handleDateChange = (date) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      birthdate: date,
    }));
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const clientId = clientDetails.clientId;
      const updateResponse = await axios.put(`http://localhost:8080/api/client/putClientDetails/${clientId}`, updatedDetails);

      if (newProfilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', newProfilePicture);
        await axios.put(`http://localhost:8080/api/client/updateProfilePicture/${clientId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (updateResponse.status === 200) {
        setClientDetails(updateResponse.data);
        setError("Profile updated successfully.");
        setEditMode(false);
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      console.error('Error updating client details:', error);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!clientDetails) return <Typography>No user data available. Please try logging in again.</Typography>;

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
    profileHeaderText: {
      position: 'absolute',
      textAlign: 'right',
      top: '95px',
      right: '200px',
      fontFamily: 'Outfit',
      fontWeight: 'normal',
      fontSize: '22px',
      color: '#40170A',
      zIndex: 1,
    },
    line: {
      marginTop: '0px',
      width: '1085px',
      height: '1px',
      backgroundColor: '#1F0C06',
      opacity: '20%',
      position: 'absolute',
      top: '680px',
      right: '200px',
      zIndex: 0,
    },
    card: {
      width: '40%',
      margin: '100px auto 20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      padding: '20px',
      marginLeft: '200px',
      position: 'relative',
      outline: '1px solid #CFCFCF',
    },
    profilePicture: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      marginRight: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    button: {
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    editButton: {
      backgroundColor: '#B84916',
      color: '#fff',
    },
    logoutButton: {
      backgroundColor: '#f44336',
      color: '#fff',
    },
    profileDetails: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
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

      <Typography style={styles.profileHeaderText}>Quick Actions</Typography>

  
      <Card style={styles.card}>
        <Box
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '20px 20px 0 0',
          }}
        >
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={profilePicture}
              alt="Profile"
              style={styles.profilePicture}
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ marginLeft: '20px' }}
              />
            )}
          </Box>

          <Box>
            <Typography variant="h5" style={{ fontFamily: 'Outfit', fontWeight: 'bold' }}>
              {clientDetails.fullName}
            </Typography>
            <Typography style={{ fontFamily: 'Outfit', fontStyle: 'italic', color: '#555' }}>
              {clientDetails.bio}
            </Typography>

            <Box style={styles.buttons}>
              <button
                style={{ ...styles.button, ...styles.editButton }}
                onClick={handleEditProfileRedirect}
              >
                Edit Profile
              </button>
              <button
                style={{ ...styles.button, ...styles.logoutButton }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </Box>
          </Box>
        </Box>

        <Divider style={{ margin: '20px 0' }} />
        <Box style={{ marginTop: '20px' }}>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PersonIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.username}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <EmailIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.email}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PhoneIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.contactNumber}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <CakeIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.birthdate}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <MaritalStatusIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.civilStatus}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <WorkIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.occupation}
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PlaceIcon style={{ marginRight: '10px', color: '#40170A' }} />
            {clientDetails.address}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default ClientPersonalProfile;