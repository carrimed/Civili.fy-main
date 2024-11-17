import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker, TimePicker } from '@mui/x-date-pickers';
import AppointmentForm from '../client/appointmentform';

function ProfileDisplay() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: null,
    time: null,
    message: '',
  });

  // Menu Handlers
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (action) => {
    handleClose();
    switch (action) {
      case 'updateProfile':
        console.log('Update Profile');
        break;
      case 'deleteProfile':
        console.log('Delete Profile');
        break;
      case 'logout':
        console.log('Logged Out');
        break;
      default:
        break;
    }
  };

  // Appointment Modal Handlers
  const handleBookAppointment = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleSubmit = () => {
    console.log('Appointment Data:', appointmentData);
    setOpenModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (newDate) => setAppointmentData((prevState) => ({ ...prevState, date: newDate }));
  const handleTimeChange = (newTime) => setAppointmentData((prevState) => ({ ...prevState, time: newTime }));

  // Styles
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
      marginTop: '15px',
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
      {/* AppBar */}
      <AppBar position="fixed" style={{ backgroundColor: 'white', boxShadow: 'none', width: '100%' }}>
        <Toolbar>
          <Typography component="div" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', marginLeft: '10px', marginRight: '10px' }} />
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Profile Display */}
      <div style={styles.container}>
        {/* Back and Settings Icons */}
        <FaArrowLeft style={styles.backIcon} onClick={() => window.history.back()} />
        <FaCog style={styles.settingsIcon} onClick={handleClick} />
        
        {/* Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuItemClick('updateProfile')}>Update Profile</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('deleteProfile')}>Delete Profile</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('logout')}>Log out</MenuItem>
        </Menu>

        {/* Banner and Profile Picture */}
        <img src="https://rare-gallery.com/uploads/posts/219455-james-bond-2880x1800.jpg" alt="Banner" style={styles.bannerImage} />
        <div style={styles.profilePicContainer}>
          <div style={styles.profilePic}>
            <img src="https://images.saymedia-content.com/.image/t_share/MTc0NTE0MDYyNzc0NzczNzA1/daniel-craigs-james-bond-films-ranked-from-worst-to-best.jpg" alt="Profile" style={styles.profilePicImage} />
          </div>
        </div>

        {/* Profile Name and Bio */}
        <div style={styles.name}>James Bond</div>
        <div style={styles.bio}>Criminal Lawyer</div>

        {/* Profile Info */}
        <div style={styles.infoContainer}>
          <div><span style={styles.label}>Username:</span> <span style={styles.infoText}>@JamesBond</span></div>
          <div><span style={styles.label}>Email:</span> <span style={styles.infoText}>JamesBond@example.com</span></div>
          <div><span style={styles.label}>Contact:</span> <span style={styles.infoText}>+123 456 7890</span></div>
          <div><span style={styles.label}>Birthday:</span> <span style={styles.infoText}>November 11, 1920</span></div>
          <div><span style={styles.label}>Age:</span> <span style={styles.infoText}>67</span></div>
          <div><span style={styles.label}>Sex:</span> <span style={styles.infoText}>Male</span></div>
        </div>

        {/* Book Appointment Button */}
        {!openModal && (
          <Button style={styles.bookButton} onClick={handleBookAppointment}>Book Appointment</Button>
        )}

        {/* Appointment Form Modal */}
        {openModal && (
          <AppointmentForm
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            appointmentData={appointmentData}
          />
        )}
      </div>
     
      {/* Footer */}
      <div style={styles.footer}>
        <span>All rights reserved.</span>
      </div>
    </div>
  );
}

export default ProfileDisplay;
