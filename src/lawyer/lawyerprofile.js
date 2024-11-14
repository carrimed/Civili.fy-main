import React from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProfileDisplay() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    if (action === 'updateProfile') {
      console.log('Update Profile');
    } else if (action === 'deleteProfile') {
      console.log('Delete Profile');
    } else if (action === 'logout') {
      console.log('Logged Out');
    }
  };

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#D9641E',
      minHeight: '100vh',
      paddingTop: '64px',
    },
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '10px',
      width: '1000px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      color: '#41423A',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backIcon: {
      position: 'absolute',
      top: '15px',
      left: '15px',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#41423A',
    },
    settingsIcon: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#41423A',
    },
    bannerImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px 10px 0 0',
    },
    profilePicContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '-40px',
      width: '100%',
    },
    profilePic: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      border: '3px solid white',
      overflow: 'hidden',
      backgroundColor: '#D9641E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePicImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#41423A',
      marginTop: '10px',
    },
    bio: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#777777',
      marginBottom: '15px',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#41423A',
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box',
    },
    label: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#D9641E',
    },
    infoText: {
      color: '#ED7D27',
      fontSize: '16px',
    },
    bookButton: {
      padding: '10px 20px',
      backgroundColor: '#D9641E',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
      marginTop: '15px', // Add some spacing above the button
    },
    footer: {
      backgroundColor: '#41423A',
      width: '100%',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      color: 'white',
      fontSize: '10px',
      position: 'fixed',
      bottom: '0',
      left: '0',
    },
  };

  return (
    <div style={styles.outerContainer}>
      <AppBar position="fixed" style={{ backgroundColor: 'white', boxShadow: 'none', width: '100%' }}>
        <Toolbar>
          <Typography component="div" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', marginLeft: '10px', marginRight: '10px' }} />
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={styles.container}>
        <FaArrowLeft style={styles.backIcon} onClick={() => window.history.back()} />
        <FaCog style={styles.settingsIcon} onClick={handleClick} />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuItemClick('updateProfile')}>Update Profile</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('deleteProfile')}>Delete Profile</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('logout')}>Log out</MenuItem>
        </Menu>

        <img src="https://rare-gallery.com/uploads/posts/219455-james-bond-2880x1800.jpg" alt="Banner" style={styles.bannerImage} />

        <div style={styles.profilePicContainer}>
          <div style={styles.profilePic}>
            <img
              src="https://images.saymedia-content.com/.image/t_share/MTc0NTE0MDYyNzc0NzczNzA1/daniel-craigs-james-bond-films-ranked-from-worst-to-best.jpg"
              alt="Profile"
              style={styles.profilePicImage}
            />
          </div>
        </div>

        <div style={styles.name}>James Bond</div>
        <div style={styles.bio}>Criminal Lawyer</div>

        <div style={styles.infoContainer}>
          <div>
            <span style={styles.label}>Username:</span> <span style={styles.infoText}>@JamesBond</span>
          </div>
          <div>
            <span style={styles.label}>Email:</span> <span style={styles.infoText}>JamesBond@example.com</span>
          </div>
          <div>
            <span style={styles.label}>Contact:</span> <span style={styles.infoText}>+123 456 7890</span>
          </div>
          <div>
            <span style={styles.label}>Birthday:</span> <span style={styles.infoText}>November 11, 1920</span>
          </div>
          <div>
            <span style={styles.label}>Age:</span> <span style={styles.infoText}>67</span>
          </div>
          <div>
            <span style={styles.label}>Sex:</span> <span style={styles.infoText}>Male</span>
          </div>
          <div>
            <span style={styles.label}>Address:</span> <span style={styles.infoText}>Capitol Hills Cebu City</span>
          </div>

          {/* Book Appointment Button */}
          <Button style={styles.bookButton} onClick={() => console.log('Book Appointment')}>
            Book Appointment
          </Button>
        </div>
      </div>
      
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default ProfileDisplay;
