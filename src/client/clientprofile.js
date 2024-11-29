import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Divider, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function ClientPersonalProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleProfileRedirect = () => {
    navigate('/civilify/client-personal-profile-page'); 
    handleClose();
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
    profileHeaderText: {
      position: 'absolute',
      textAlign: 'right',
      top: '100px',
      right: '200px',
      fontFamily: 'Outfit',
      fontWeight: 'normal',
      fontSize: '22px',
      color: '#632F0F',
    },
    card: {
      width: '40%',
      margin: '100px auto 20px',
      backgroundColor: '#fff',
      borderRadius: '20px',
      overflow: 'hidden',
      padding: '20px',
      marginLeft: '200px',
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
        <MenuItem onClick={handleProfileRedirect}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Profile Header */}
      <Typography style={styles.profileHeaderText}>Your Profile</Typography>

      {/* Profile Card */}
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
              src="/images/pfp1.jpg"
              alt="Profile"
              style={styles.profilePicture}
            />
            <Box>
              <Typography
                variant="h5"
                style={{ fontFamily: 'Outfit', fontWeight: 'bold' }}
              >
                Keith Ruezyl Tagarao
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Outfit',
                  fontStyle: 'italic',
                  color: '#555',
                }}
              >
                I live so high I'm way up in the sky
              </Typography>

              {/* Buttons */}
              <Box style={styles.buttons}>
                <button
                  style={{ ...styles.button, ...styles.editButton }}
                  onClick={() => console.log('Edit Profile clicked!')}
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
        
        </Box>

        <Divider style={{ margin: '20px 0' }} />
        <Box
          style={{
            marginTop: '20px',
            display: 'grid',
            gap: '10px',
            gridTemplateColumns: '150px 1fr',
          }}
        >
          {[
            { label: 'Username', value: '@skrptt' },
            { label: 'Email', value: 'keith@example.com' },
            { label: 'Contact Number', value: '123-456-7890' },
            { label: 'Birthdate', value: 'January 1, 2000' },
            { label: 'Age', value: '24' },
            { label: 'Occupation', value: 'Software Engineer' },
            { label: 'Civil Status', value: 'Single' },
            { label: 'Address', value: '123 Skyhigh St., Cloud City' },
            { label: 'Zipcode', value: '98765' },
          ].map((item) => (
            <React.Fragment key={item.label}>
              <Typography style={{ fontWeight: 'bold', color: '#555' }}>
                {item.label}:
              </Typography>
              <Typography style={{ color: '#632F0F' }}>{item.value}</Typography>
            </React.Fragment>
          ))}
        </Box>
      </Card>

      {/* Footer */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default ClientPersonalProfile;
