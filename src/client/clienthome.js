import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  CircularProgress,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

function ClientHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState('');
  const [lawyerType, setLawyerType] = useState('');
  const [rateRange, setRateRange] = useState([3000, 75000]);
  const [loading, setLoading] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/civilify/client-login-page');
    }, 2000);
    handleClose();
  };

  const handleSearchSubmit = () => {
    navigate(
      `/civilify/browse-page?category=${encodeURIComponent(
        category
      )}&lawyerType=${encodeURIComponent(
        lawyerType
      )}&rateMin=${rateRange[0]}&rateMax=${rateRange[1]}`
    );
  };

  const sections = [
    {
      title: 'Search',
      icon: <SearchIcon fontSize="large" />,
      description:
        'Utilize Civilify\'s unique search system. Personalize your search to find exactly what you need.',
    },
    {
      title: 'Requests',
      icon: <MessageIcon fontSize="large" />,
      description:
        'Track your outgoing and previous requests. Monitor the status of lawyer appointments.',
    },
    {
      title: 'Profile',
      icon: <PersonIcon fontSize="large" />,
      description:
        'View and update your profile details to keep everything accurate and professional.',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* App Bar */}
      <AppBar
        position="static"
        style={{
          background: 'linear-gradient(to right, #FFF4ED, #D76826, #E26012)', // Gradient colors
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Faculty Graphic', // Font for App Bar text
          width: '100%',
        }}
      >
        <Toolbar>
          <Typography
            component="div"
            style={{ cursor: 'pointer', fontFamily: 'Faculty Graphic' }} // Font for App Bar text
            onClick={() => navigate('/')}
          >
            <img
              src="/images/logoiconblack.png"
              alt="Logo"
              style={{ width: '40px', margin: '10px' }}
            />
          </Typography>
          <Box display="flex" justifyContent="flex-end" style={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              onClick={() => navigate('/requests')}
              style={{
                cursor: 'pointer',
                marginLeft: '20px',
                color: 'white',
                fontFamily: 'Faculty Graphic', // Font for App Bar text
              }}
            >
              Requests
            </Typography>
            <Typography
              variant="body1"
              onClick={handleProfileClick}
              style={{
                cursor: 'pointer',
                marginLeft: '75px',
                color: 'white',
                fontFamily: 'Faculty Graphic', // Font for App Bar text
              }}
            >
              Profile ▾
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: { marginTop: '40px' },
              }}
            >
              <MenuItem onClick={() => navigate('/civilify/client-profile-page')}>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Title */}
      <Typography
        variant="h4"
        style={{
          marginTop: '50px',
          fontFamily: 'Faculty Glyphic',
          color: '#41423A',
          textAlign: 'center',
        }}
      >
        The search for justice starts here
      </Typography>

      {/* Filters Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        marginTop="20px"
        width="80%"
      >
        {/* Category Dropdown */}
        <FormControl style={{ width: '30%' }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {['Civil law', 'Criminal law', 'Corporate law', 'Family law'].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Lawyer Type Dropdown */}
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Lawyer Type</InputLabel>
          <Select
            value={lawyerType}
            onChange={(e) => setLawyerType(e.target.value)}
          >
            {['Public', 'Private', 'Exclusive'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rate Slider */}
        <Box style={{ color: 'orange', width: '40%' }}>
          <Typography color='black'>
            Rate per Hour: {rateRange[0]} - {rateRange[1]} PHP
          </Typography>
          <Slider
            value={rateRange}
            onChange={(e, newValue) => setRateRange(newValue)}
            valueLabelDisplay="auto"
            min={3000}
            max={100000}
            step={1000}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: '#D9641E', // Orange thumb color
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#D9641E', // Orange rail color
              },
              '& .MuiSlider-track': {
                backgroundColor: '#D9641E', // Orange track color
              },
            }}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSearchSubmit}
        style={{
          backgroundColor: '#D9641E',
          color: 'white',
          marginTop: '30px',
        }}
      >
        SUBMIT
      </Button>

      {/* Descriptions Section */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        marginTop="250px"
        marginBottom="30px"
      >
        {sections.map((section) => (
          <Box
            key={section.title}
            style={{
              width: '30%',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '12px',
            }}
          >
            {section.icon}
            <Typography variant="h6" style={{ fontFamily: 'Outfit', marginTop: '10px' }}>
              {section.title}
            </Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit' }}>
              {section.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer Section */}
      <Box
        style={{
          backgroundColor: '#41423A',
          width: '100%',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'Faculty Glyphic',
          fontSize: '10px',
          position: 'absolute',
          bottom: 0,
        }}
      >
        © The Civilify Company, Cebu City
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <CircularProgress size={50} style={{ color: '#D9641E' }} />
        </Box>
      )}
    </div>
  );
}

export default ClientHome;
