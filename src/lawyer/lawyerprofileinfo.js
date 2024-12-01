import React, { useState } from 'react';
import { Box, Typography, Button, MenuItem, Menu } from '@mui/material';
import { FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

function LawyerHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const StyledButton = styled(Button)(({ theme, colorType }) => ({
    backgroundColor: colorType === 'red' ? '#D32F2F' : colorType === 'green' ? '#388E3C' : '#D9641E',
    color: '#F1F1F1',
    '&:hover': {
        backgroundColor: colorType === 'red' ? '#C62828' : colorType === 'green' ? '#2C6B2F' : '#B55018',
    },
    fontSize: '0.8rem',
    padding: '8px 16px',
    marginTop: '15px',
    fontFamily: 'Outfit, sans-serif',
    width: '60%', 
    margin: '5px',
}));

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflowX: 'hidden',
      maxWidth: '100%',
      flexDirection: 'column',
      backgroundColor: '#F7F7F7',
      minHeight: '100vh',
      paddingTop: '64px',
    },
    menuItem: {
      fontSize: '16px',
    },
    footer: {
      backgroundColor: '#D9641E',
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
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: 'calc(100vh - 80px)',
      marginTop: '15px',
      padding: '20px',
      gap: '20px',
    },
    profileCard: {
      width: '25%',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    appointmentsCard: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      width: '60%',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    clickableText: {
      cursor: 'pointer',
      color: '#D9641E',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    profilePicContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    profilePic: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #D9641E',
    },
    profilePicImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginTop: '10px',
    },
    bio: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#888',
    },
    infoContainer: {
      marginTop: '20px',
    },
    label: {
      fontWeight: 'bold',
      color: '#555',
    },
    infoText: {
      color: '#777',
    },
    icon: {
      marginRight: '5px',
      color: '#D9641E',
    },
  };

  return (
    <div style={styles.outerContainer}>
      {/* Header */}
      <Box style={{
          position: 'absolute',
          top: 0,
          width: '70%',
          height: '60px',
          backgroundColor: '#FFFFFF ',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}>
       <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
        <Box style={{ display: 'flex', marginRight: '30px' }}>
          <Typography
            variant="body2"
            style={{
              backgroundColor: 'white',
              color: '#D9641E',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '18px',
              padding: '5px 15px',
              border: '2px solid #D9641E',
              borderRadius: '8px',
            }}
          >
            Support
          </Typography>

          <Typography
            variant="body2"
            style={{
              backgroundColor: 'white',
              color: '#D9641E',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '18px',
              padding: '5px 15px',
              border: '2px solid #D9641E',
              borderRadius: '8px',
            }}
            onClick={handleClick}
          >
            Profile
          </Typography>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
              style={styles.menuItem}
              onClick={() => navigate('/civilify/lawyer-profile-page')}
            >
              View Profile
            </MenuItem>
            <MenuItem style={styles.menuItem} onClick={handleClose}>
              Deactivate Account
            </MenuItem>
            <MenuItem style={{ ...styles.menuItem, ...styles.logout }} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

     {/* Main Content */}
<Box style={{ ...styles.container, justifyContent: 'center' }}>
  {/* Profile Section */}
  <Box style={{ ...styles.profileCard, marginLeft: '20px' }}>
    <Box style={styles.profilePicContainer}>
      <div style={styles.profilePic}>
        <img
          src="https://images.saymedia-content.com/.image/t_share/MTc0NTE0MDYyNzc0NzczNzA1/daniel-craigs-james-bond-films-ranked-from-worst-to-best.jpg"
          alt="Profile"
          style={styles.profilePicImage}
        />
      </div>
    </Box>
    <Typography style={styles.name}>James Bond</Typography>
    <Typography style={styles.bio}>Criminal Lawyer</Typography>

    <Box style={styles.infoContainer}>
      <Typography>
        <span style={styles.label}>
          <FaUserTie style={styles.icon} /> Name:
        </span>{' '}
        <span style={styles.infoText}>James Bond</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaUserTie style={styles.icon} /> Username:
        </span>{' '}
        <span style={styles.infoText}>@JamesBond</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaPhoneAlt style={styles.icon} /> Contact Number:
        </span>{' '}
        <span style={styles.infoText}>+123 456 7890</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaMapMarkerAlt style={styles.icon} /> Office Address:
        </span>{' '}
        <span style={styles.infoText}>221B Baker Street</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaEnvelope style={styles.icon} /> Email:
        </span>{' '}
        <span style={styles.infoText}>jamesbond@example.com</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaCalendarAlt style={styles.icon} /> Birthdate:
        </span>{' '}
        <span style={styles.infoText}>November 11, 1920</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaDollarSign style={styles.icon} /> Hourly Rate (PHP):
        </span>{' '}
        <span style={styles.infoText}>1500</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaDollarSign style={styles.icon} /> Consultation Fee (PHP):
        </span>{' '}
        <span style={styles.infoText}>500</span>
      </Typography>
      <StyledButton onClick={() => navigate('/civilify/lawyer-accountsettings-page')}>Edit Profile</StyledButton>
    </Box>
  </Box>

  {/* Appointments Section */}
  <Box
    style={{
      ...styles.appointmentsCard,
      marginRight: '20px',
      width: '50%', // Reduce width to center-align better with ProfileCard
    }}
  >
    <Typography
      variant="h6"
      style={{
        marginBottom: '20px',
        fontWeight: 'bold',
        color: '#333',
      }}
    >
      My Appointments
    </Typography>
    <Box style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <Typography style={styles.clickableText}>Pending</Typography>
      <Typography style={styles.clickableText}>Previous</Typography>
    </Box>
  </Box>
</Box>


      {/* Footer */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default LawyerHome;
