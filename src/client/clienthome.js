import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ClientHome() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#A54C17', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static" style={{ backgroundColor: '#212121', boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            component="div"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
            <img src="/images/logoiconwhite.png" alt="Logo" style={{ width: '40px', marginLeft: '10px', marginRight: '10px' }} />
          </Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center" flexGrow={1}>
            {['Requests', 'Notifications', 'Profile'].map((text, idx) => (
              <Typography
                key={idx}
                variant="body1"
                onClick={() => navigate(`/${text.toLowerCase()}`)}
                style={{
                  cursor: 'pointer',
                  marginLeft: '50px',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontFamily: 'Faculty Glyphic',
                }}
              >
                {text}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px', paddingBottom: '40px', backgroundColor: '#B65A23' }}>
        
        {/* Centered Search Bar */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          style={{ width: '500px', marginBottom: '40px', backgroundColor: '#F5F5F5' }}
          InputProps={{
            startAdornment: <SearchIcon style={{ color: 'white' }} />, 
          }}
        />

        {/* Tagline Text */}
        <Typography
          variant="h4"
          style={{
            fontFamily: 'Faculty Glyphic',
            color: 'white',
            marginBottom: '80px',
          }}
        >
          The search for justice starts here
        </Typography>

        {/* Icons and Descriptions */}
        <Box display="flex" justifyContent="space-around" width="80%" marginTop="40px">
          {/* Search Section */}
          <Box display="flex" alignItems="center" flexDirection="column" maxWidth="300px">
            <SearchIcon style={{ fontSize: 40, color: 'white' }} /> 
            <Typography
              variant="body1"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                color: 'white', 
                marginTop: '10px',
                textAlign: 'justified', 
              }}
            >
              Search
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: 'white', 
                marginTop: '10px',
                textAlign: 'justified', 
              }}
            >
              In the search bar, type in details of your case or the type of practitioner that you had in mind. The algorithm will search through our list of qualified professionals and suggest ideal people to work with, starting with the best match based on specific criteria. For a more tailored experience, use the filter feature to refine your search, so you get the most suitable talent for your needs.
            </Typography>
          </Box>

          {/* Requests Section */}
          <Box display="flex" alignItems="center" flexDirection="column" maxWidth="300px">
            <NotificationsIcon style={{ fontSize: 40, color: 'white' }} /> {/* White icon */}
            <Typography
              variant="body1"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                color: 'white', // White text
                marginTop: '10px',
                textAlign: 'center',
              }}
            >
              Requests
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: 'white', // White text
                marginTop: '10px',
                textAlign: 'justified', // Justified text
              }}
            >
              Manage recent requests sent to lawyers, view your request history, and track which lawyers you’ve worked with in the past. This feature allows you to monitor the status of each request and keep organized records for future reference.
            </Typography>
          </Box>

          {/* Profile Section */}
          <Box display="flex" alignItems="center" flexDirection="column" maxWidth="300px">
            <AccountCircleIcon style={{ fontSize: 40, color: 'white' }} /> {/* White icon */}
            <Typography
              variant="body1"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                color: 'white',
                marginTop: '10px',
                textAlign: 'center',
              }}
            >
              Profile
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontFamily: 'Outfit',
                fontWeight: 300,
                color: 'white',
                marginTop: '10px',
                textAlign: 'justified', 
              }}
            >
              View and update your profile details to make a great first impression on lawyers. Keeping your profile clean and up-to-date helps lawyers understand your needs better. You can also view your ratings and ensure your profile accurately reflects your experience and requirements.
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ClientHome;
