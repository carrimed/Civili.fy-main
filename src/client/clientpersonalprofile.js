import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Divider, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import MaritalStatusIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';

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

  const handleEditProfileRedirect = () => {
    navigate('/civilify/client-update-profile-page'); 
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
      top: '95px',
      right: '200px',
      fontFamily: 'Outfit',
      fontWeight: 'normal',
      fontSize: '22px',
      color: '#40170A',
      zIndex: 1, // Ensure the profile text stays on top
    },
    line: {
      marginTop: '0px',
      width: '1085px',  // Adjust width as needed
      height: '1px',
      backgroundColor: '#1F0C06',
      opacity: '20%',
      position: 'absolute',  // Absolute positioning for the right alignment
      top: '680px',  // Position the line below the text
      right: '200px',  // Align the line 40px from the right edge
      zIndex: 0,  // Ensure the line is behind other content
    },
    lineprofile: {
      marginTop: '0px',
      width: '1085px',  // Adjust width as needed
      height: '1px',
      backgroundColor: '#1F0C06',
      opacity: '20%',
      position: 'absolute',  // Absolute positioning for the right alignment
      top: '130px',  // Position the line below the text
      right: '200px',  // Align the line 40px from the right edge
      zIndex: 0,  // Ensure the line is behind other content
    },
    card: {
      width: '40%',
      margin: '100px auto 20px',
      backgroundColor: '#fff',
      borderRadius: '10px',  // Increased border radius
      overflow: 'hidden',
      padding: '20px',
      marginLeft: '200px',
      position: 'relative',
      outline: '1px solid #CFCFCF'
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

      {/* Profile Header */}
      <Typography style={styles.profileHeaderText}>Quick Actions</Typography>
      <Typography
      style={{
        position: 'absolute',
        textAlign: 'right',
        top: '135px',
        right: '200px',
        fontFamily: 'Outfit',
        fontWeight: 'light',
        fontSize: '16px',
        color: '#40170A',
        zIndex: 1,
        opacity: 0.5,
      }}>
      Change my password
    </Typography>
    <Typography
      style={{
        position: 'absolute',
        textAlign: 'right',
        top: '160px',
        right: '200px',
        fontFamily: 'Outfit',
        fontWeight: 'light',
        fontSize: '16px',
        color: '#40170A',
        zIndex: 1,
        opacity: 0.5,
      }}>
      Set language preferences
    </Typography>
    <Typography
      style={{
        position: 'absolute',
        textAlign: 'right',
        top: '185px',
        right: '200px',
        fontFamily: 'Outfit',
        fontWeight: 'light',
        fontSize: '16px',
        color: '#40170A',
        zIndex: 1,
        opacity: 0.5,
      }}>
      Account Privacy settings
    </Typography>
    <Typography
      style={{
        position: 'absolute',
        textAlign: 'right',
        top: '210px',
        right: '200px',
        fontFamily: 'Outfit',
        fontWeight: 'light',
        fontSize: '16px',
        color: '#40170A',
        zIndex: 1,
        opacity: 0.5,
      }}>
      Edit my profile details
    </Typography>
    <Typography
      style={{
        position: 'absolute',
        textAlign: 'right',
        top: '235px',
        right: '200px',
        fontFamily: 'Outfit',
        fontWeight: 'light',
        fontSize: '16px',
        color: '#40170A',
        zIndex: 1,
        opacity: 0.5,
      }}>
      Deactivate my account
    </Typography>

      {/* Line */}
      <div style={styles.line}></div>
      <div
        style={{
          position: 'fixed',    // Positioned relative to the viewport
          left: '195px',         // Adjust as needed for exact alignment
          bottom: '68px',       // Distance from the bottom of the screen
          fontSize: '14px',
          color: '#40170A',
          zIndex: 1000,         // Keeps it above other elements
          fontFamily: 'Faculty Graphic',
          opacity: 0.4
        }}
      >
        Civilify's Terms and Conditions
      </div>
      <div
        style={{
          position: 'fixed',    // Positioned relative to the viewport
          left: '1133px',         // Adjust as needed for exact alignment
          bottom: '68px',       // Distance from the bottom of the screen
          fontSize: '14px',
          color: '#40170A',
          zIndex: 1000,         // Keeps it above other elements
          fontFamily: 'Faculty Graphic',
          opacity: 0.4
        }}
      >
        Security and Safety Terms
      </div>

      {/* Line */}
      <div style={styles.lineprofile}></div>

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
        </Box>

        <Divider style={{ margin: '20px 0' }} />
        <Box
          style={{
            marginTop: '20px',
            display: 'grid',
            gap: '10px',
            gridTemplateColumns: '1fr',
          }}
        >
          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PersonIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>@skrptt</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <EmailIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>keithtagarao@gmail.com</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PhoneIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>123-456-7890 | +63 999-760-1161</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <CakeIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>Born on December 31, 1999</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <MaritalStatusIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>Single</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <WorkIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>Software Engineer</span>
          </Typography>

          <Typography style={{ display: 'flex', alignItems: 'center', color: '#632F0F' }}>
            <PlaceIcon style={{ marginRight: '10px', color: '#40170A' }} />
            <span style={{ fontFamily: 'Outfit' }}>Metro Manila, 6064</span>
          </Typography>
        </Box>
      </Card>

      {/* Footer Section */}
      <Box style={styles.footer}>
        <span>© The Civilify Company, 2024 | All Rights Reserved</span>
      </Box>
    </div>
  );
}

export default ClientPersonalProfile;
