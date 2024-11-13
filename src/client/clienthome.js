import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

function ClientHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('search'); // Default to 'search'

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  const descriptions = {
    search: (
      <>
        <Typography
          variant="h6"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '20px',
            marginBottom: '10px',
          }}
        >
          Search
        </Typography>
        <hr
          style={{
            width: '100%',
            borderTop: '1px solid #white', // Dark line below the title
            margin: '10px 0', // Margin for spacing
          }}
        />
        <Typography
          variant="body1"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '16px',
          }}
        >
          Enter the details of your case into the search bar, and our intelligent algorithm will match you with the most suitable lawyers from our extensive database. To fine-tune your results and find exactly what you're looking for, use our advanced filter feature to personalize your search based on your specific needs and preferences.
        </Typography>
      </>
    ),
    requests: (
      <>
        <Typography
          variant="h6"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '20px',
            marginBottom: '10px',
          }}
        >
          Requests
        </Typography>
        <hr
          style={{
            width: '100%',
            borderTop: '1px solid white', // Dark line below the title
            margin: '10px 0', // Margin for spacing
          }}
        />
        <Typography
          variant="body1"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '16px',
          }}
        >
          Keep track of all your appointment requests, including the ones you've sent to potential legal practitioners. Monitor the status of your requests, see if a practitioner has been assigned to your case, and stay updated on the progress of each request in real-time.
        </Typography>
      </>
    ),
    profile: (
      <>
        <Typography
          variant="h6"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '20px',
            marginBottom: '10px',
          }}
        >
          Profile
        </Typography>
        <hr
          style={{
            width: '100%',
            borderTop: '1px solid white', // Dark line below the title
            margin: '10px 0', // Margin for spacing
          }}
        />
        <Typography
          variant="body1"
          style={{
            color: 'white',
            fontFamily: 'Outfit',
            fontSize: '16px',
          }}
        >
          View and update your personal profile to ensure it's optimized for potential legal practitioners. Customize your profile to highlight key information, make your case stand out, and tailor your settings to suit your preferences for a more seamless experience with the platform.
        </Typography>
      </>
    ),
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden', // Prevent scrolling
        backgroundColor: 'transparent',
        height: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images/bg2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1,
          zIndex: -1, // Places it behind content
        }}
      />

      {/* Orange Gradient Overlay with 0.7 opacity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #D9641E, #A54C17)', // Gradient applied here
          opacity: 0.7, // 70% opacity
          zIndex: -1, // Places it behind content
        }}
      />

      {/* App Bar with Logo, Search Bar, and Right-Aligned "Requests" and "Profile" */}
      <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none', width: '100%' }}>
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
          <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              onClick={() => navigate('/requests')}
              style={{
                cursor: 'pointer',
                marginLeft: '20px',
                color: '#41423A',
                fontSize: '16px',
                fontFamily: 'Faculty Glyphic',
              }}
            >
              Requests
            </Typography>
            <Typography
              variant="body1"
              onClick={handleProfileClick}
              style={{
                cursor: 'pointer',
                marginLeft: '20px',
                color: '#41423A',
                fontSize: '16px',
                fontFamily: 'Faculty Glyphic',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Profile ▾
            </Typography>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>My Profile</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/logout'); }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Title */}
      <Typography
        variant="h4"
        style={{
          color: 'white',
          fontFamily: 'Faculty Glyphic',
          fontSize: '28px',
          marginTop: '40px',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        The search for justice starts here
      </Typography>

      {/* Search Bar with Rounded Edges */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5px',
          marginBottom: '5px',
          padding: '0 20px',
          width: '100%',
        }}
      >
        <TextField
          variant="standard"
          size="medium"
          placeholder="Search for practitioners..."
          style={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#F5F5F5',
            borderRadius: '30px',
            padding: '10px 15px',
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: <SearchIcon style={{ color: 'grey', marginLeft: '10px' }} />,
            style: {
              fontSize: '18px',
              height: '40px',
            },
          }}
        />
      </Box>

      {/* Icons Row */}
      <Box display="flex" justifyContent="center" gap="20px" marginTop="10px">
        <IconButton
          style={{
            backgroundColor: 'white',
            width: '35px',
            height: '35px',
            color: 'black',
            borderRadius: '50%',
          }}
          onClick={() => handleIconClick('search')}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: 'white',
            width: '35px',
            height: '35px',
            color: 'black',
            borderRadius: '50%',
          }}
          onClick={() => handleIconClick('requests')}
        >
          <MessageIcon />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: 'white',
            width: '35px',
            height: '35px',
            color: 'black',
            borderRadius: '50%',
          }}
          onClick={() => handleIconClick('profile')}
        >
          <PersonIcon />
        </IconButton>
      </Box>

      {/* White Rounded Square Box */}
      <Box
        style={{
          width: '500px', // Ensuring the width is correct
          height: '200px', // The height you specified
          borderRadius: '12px',
          marginTop: '20px',
          marginBottom: '70px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {descriptions[selectedOption]}
      </Box>

      {/* Footer Section */}
      <Box
        style={{
          backgroundColor: '#41423A',
          width: '100%',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
          color: 'white',
          fontFamily: 'Faculty Glyphic',
          fontSize: '10px',
        }}
      >
        © The Civilify Company, Cebu City
      </Box>
    </div>
  );
}

export default ClientHome;
