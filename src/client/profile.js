import React from 'react';
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem } from '@mui/material';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ProfileDisplay() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null); // State to manage the menu anchor

    // Open the menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle menu item click
    const handleMenuItemClick = (action) => {
        handleClose();
        if (action === 'updateProfile') {
            // Navigate to the UpdatePersonalInfo page
            navigate('/civilify/client-update-personal-info-page');  // Change '/updatePersonalInfo' to the actual route path
        } else if (action === 'deleteProfile') {
            // Add your delete profile logic here
            console.log('Delete Profile');
        } else if (action === 'logout') {
            // Add your logout logic here
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
            paddingTop: '64px', // Adding padding to avoid overlap with fixed AppBar
        },
        container: {
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            padding: '10px',
            width: '1000px',  // Increased width for more spacious layout
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
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0',
        },
        profilePicContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center   ',
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
            {/* App Bar */}
            <AppBar position="fixed" style={{ backgroundColor: 'white', boxShadow: 'none', width: '100%' }}>
                <Toolbar>
                    <Typography
                        component="div"
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => navigate('/')}
                    >
                        <img
                            src="/images/logoiconblack.png"
                            alt="Logo"
                            style={{ width: '40px', marginLeft: '10px', marginRight: '10px' }}
                        />
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ flexGrow: 1 }}></Box>
                </Toolbar>
            </AppBar>

            {/* Profile Section */}
            <div style={styles.container}>
                {/* Back Button */}
                <FaArrowLeft style={styles.backIcon} onClick={() => navigate('/civilify/client-home-page')} />

                {/* Settings Icon with Menu */}
                <FaCog
                    style={styles.settingsIcon}
                    onClick={handleClick} // Open menu on click
                />
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => handleMenuItemClick('updateProfile')}>Update Profile</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('deleteProfile')}>Delete Profile</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('logout')}>Log out</MenuItem>
                </Menu>

                {/* Banner Image */}
                <img
                    src="/images/team-member-1.jpg" // Replace with your banner image URL
                    alt="Banner"
                    style={styles.bannerImage}
                />

                {/* Profile Picture */}
                <div style={styles.profilePicContainer}>
                    <div style={styles.profilePic}>
                        <img
                            src="/images/pfp4.png" // Replace with your profile picture URL
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
                    <div>
                        <span style={styles.label}>Birthday:</span> <span style={styles.infoText}>January 1, 1990</span>
                    </div>
                    <div>
                        <span style={styles.label}>Sex:</span> <span style={styles.infoText}>Male</span>
                    </div>
                    <div>
                        <span style={styles.label}>Address:</span> <span style={styles.infoText}>Taga Mingla, Cebu City</span>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
        </div>
    );
}

export default ProfileDisplay;
