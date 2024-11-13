import React from 'react';
import { Box} from '@mui/material';
import { FaArrowLeft, FaCog } from 'react-icons/fa';

function ProfileDisplay() {
  const [isHovered, setIsHovered] = React.useState(false);

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F1F1F1',
      flexDirection: 'column',
    },
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      width: '350px',
      padding: '20px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
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
      height: '150px',
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
      width: '80px',
      height: '80px',
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
      color: '#D9641E',
    },
    infoText: {
      color: '#ED7D27',
    },
    editButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#D9641E',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    editButtonHover: {
      backgroundColor: '#ED7D27',
    },
    footer: {
      backgroundColor: '#41423A',
      width: '100%',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      color: 'white',
      fontFamily: 'Faculty Glyphic',
      fontSize: '10px',
      position: 'fixed',
      bottom: '0',
      left: '0',
    },
  };

  return (
    <div style={styles.outerContainer}>
      {/* Profile Section */}
      <div style={styles.container}>
        {/* Back Button */}
        <FaArrowLeft style={styles.backIcon} onClick={() => window.history.back()} />

        {/* Settings Icon */}
        <FaCog style={styles.settingsIcon} onClick={() => alert('Settings clicked!')} />

        {/* Banner Image */}
        <img
          src="https://via.placeholder.com/350x150" // Replace with your banner image URL
          alt="Banner"
          style={styles.bannerImage}
        />

        {/* Profile Picture */}
        <div style={styles.profilePicContainer}>
          <div style={styles.profilePic}>
            <img
              src="https://via.placeholder.com/80" // Replace with your profile picture URL
              alt="Profile"
              style={styles.profilePicImage}
            />
          </div>
        </div>

        {/* User Name and Bio */}
        <div style={styles.name}>Keith Ruezyl</div>
        <div style={styles.bio}>I live my life, I'm so high in the sky</div>

        {/* Additional Info */}
        <div style={styles.infoContainer}>
          <div>
            <span style={styles.label}>Username:</span> <span style={styles.infoText}>@keithruezyl</span>
          </div>
          <div>
            <span style={styles.label}>Email:</span> <span style={styles.infoText}>keith@example.com</span>
          </div>
          <div>
            <span style={styles.label}>Contact:</span> <span style={styles.infoText}>+123 456 7890</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          style={{
            ...styles.editButton,
            ...(isHovered ? styles.editButtonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => alert('Edit Profile clicked!')}
        >
          Edit Profile
        </button>
      </div>

      {/* Footer Section */}
      <Box style={styles.footer}>
        © The Civilify Company, Cebu City
      </Box>
    </div>
  );
}

export default ProfileDisplay;