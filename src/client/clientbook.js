import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import { styled } from '@mui/system';
import ClientAppointmentForm from './clientappointmentform';

function ClientViewLawyerProfile() {
  const [formOpen, setFormOpen] = useState(false); // State to toggle the form modal

  const StyledButton = styled(Button)(({ theme, colorType }) => ({
    backgroundColor: colorType === 'red' ? '#D32F2F' : colorType === 'green' ? '#388E3C' : '#000000',
    color: '#F1F1F1',
    '&:hover': {
        backgroundColor: colorType === 'red' ? '#C62828' : colorType === 'green' ? '#2C6B2F' : '#333333',
    },
    fontSize: '1rem',
    padding: '10px 20px',
    marginTop: '20px',
    fontFamily: 'Outfit, sans-serif',
    width: '45%', // For both buttons to align nicely
    margin: '5px', // Add space between the buttons
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
  };

  // Mock lawyer details for UI
  const lawyerDetails = {
    name: 'John Doe',
    specialization: 'Corporate Law',
    contactNumber: '123-456-7890',
    officeAddress: '123 Main St, City, Country',
    zipcode: '12345',
    email: 'johndoe@example.com',
    consultationFee: '2000',
    profilePicture: 'https://via.placeholder.com/100', // Placeholder image
  };

  return (
    <div style={styles.outerContainer}>
      {/* Header */}
      <Box style={{
        position: 'absolute',
        top: 0,
        width: '70%',
        height: '60px',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: '30px',
        borderBottomRightRadius: '30px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}>
        <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
      </Box>

      {/* Main Content */}
      <Box style={styles.container}>
        <Box style={styles.profileCard}>
          <Box style={styles.profilePicContainer}>
            <div style={styles.profilePic}>
              <img src={lawyerDetails.profilePicture} alt="Profile" style={styles.profilePicImage} />
            </div>
          </Box>
          <Typography style={styles.name}>{lawyerDetails.name}</Typography>
          <Typography style={styles.bio}>{lawyerDetails.specialization}</Typography>

          <Box style={styles.infoContainer}>
            <Typography>
              <span style={styles.label}>
                <FaUserTie style={styles.icon} /> Name:
              </span>{' '}
              <span style={styles.infoText}>{lawyerDetails.name}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>
                <FaPhoneAlt style={styles.icon} /> Contact Number:
              </span>{' '}
              <span style={styles.infoText}>{lawyerDetails.contactNumber}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>
                <FaMapMarkerAlt style={styles.icon} /> Address:
              </span>{' '}
              <span style={styles.infoText}>
                {lawyerDetails.officeAddress}, {lawyerDetails.zipcode}
              </span>
            </Typography>
            <Typography>
              <span style={styles.label}>
                <FaEnvelope style={styles.icon} /> Email:
              </span>{' '}
              <span style={styles.infoText}>{lawyerDetails.email}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>
                <FaDollarSign style={styles.icon} /> Consultation Fee (PHP):
              </span>{' '}
              <span style={styles.infoText}>{lawyerDetails.consultationFee}</span>
            </Typography>
            {/* Render Appointment Form Modal when `formOpen` is true */}
            <ClientAppointmentForm open={formOpen} setOpen={setFormOpen} />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default ClientViewLawyerProfile;
