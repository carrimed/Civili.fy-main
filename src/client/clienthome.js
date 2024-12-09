import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Autocomplete,
  TextField,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState('');
  const [lawyerType, setLawyerType] = useState('');
  const [rateRange, setRateRange] = useState([2000, 75000]);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [showCardsSection, setShowCardsSection] = useState(true); // State to manage visibility of cards section

  
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType'); // Retrieve from localStorage
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate('/civilify/login-page'); // Redirect to login if no user type is found
    }
  }, [navigate]);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setLoading(true);
    // Clear localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userType');
    localStorage.removeItem('token'); // Remove token if implemented later

    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleProfileRedirect = () => {
    if (userType === 'Client') {
      navigate('/civilify/client-profile-page'); // Redirect to client profile
    } else if (userType === 'Lawyer') {
      navigate('/civilify/lawyer-profile-page'); // Redirect to lawyer profile
    }
    handleClose(); // Closes the dropdown menu
  };

  const handleCardRedirect = (lawyerId) => {
    navigate(`/civilify/client-lawyer-page/${lawyerId}`);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShowCardsSection(false); // Hide the cards section

    try {
      console.log('Sending query params:', {
        category,
        lawyerType,
        minRate: rateRange[0],
        maxRate: rateRange[1]
      });

      const response = await axios.get('http://localhost:8080/api/lawyer/search', {
        params: {
          category,
          lawyerType,
          minRate: rateRange[0],
          maxRate: rateRange[1]
        }
      });

      if (Array.isArray(response.data)) {
        setLawyers(response.data);
      } else {
        setError('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setError('Failed to fetch lawyers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: 'Search',
      icon: <SearchIcon fontSize="large" />,
      description: "Utilize Civilify's unique search system. Personalize your search to find exactly what you need.",
      extendedDescription:
        "Utilize Civilify's unique search system. Personalize your search to find exactly what you need. Civilify's algorithm will go through our entire database of practitioners with proven and verified track records, showing you the best of the best for your needs.",
    },
    {
      title: 'Requests',
      icon: <MessageIcon fontSize="large" />,
      description: 'Track your outgoing and previous requests. Monitor the status of lawyer appointments.',
      extendedDescription:
        'Track your outgoing and previous requests. Monitor the status of lawyer appointments. Civilify helps you manage and track requests in real time, ensuring you never miss an update.',
    },
    {
      title: 'Profile',
      icon: <PersonIcon fontSize="large" />,
      description: 'View and update your profile details.',
      extendedDescription:
        'View and update your profile details. Personalize your experience by adding preferences, adjusting privacy settings, and much more.',
    },
  ];

  const categoryOptions = [
    'Environmental law',
    'Intellectual Property Law',
    'Family law',
    'International law',
  ];

  const styles = {
    profileCard: {
      backgroundColor: 'white', // Matches dark theme background
      borderRadius: '8px',
      padding: '16px',
      color: 'black', // Text color for dark mode
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px', // Restricts the card width
      margin: '0',
      textAlign: 'left', // Align content to the left
      cursor: 'pointer', // Make the card clickable
    },
    profilePicContainer: {
      display: 'flex',
      justifyContent: 'flex-start', // Align to the left
      alignItems: 'center',
      marginBottom: '16px',
    },
    profilePic: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #3A3B3C',
    },
    profilePicImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      textAlign: 'left', // Align content to the left
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    infoGroup: {
      marginBottom: '8px',
    },
    infoText: {
      fontSize: '14px',
      color: 'black', // Slightly muted for readability
      textAlign: 'left', // Align content to the left
    },
    divider: {
      margin: '16px 0',
      borderBottom: '1px solid #ddd',
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
    cardsSection: {
      position: 'absolute',
      bottom: '40px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      transition: 'transform 0.5s ease-in-out',
      transform: showCardsSection ? 'translateY(0)' : 'translateY(100%)', // Slide out animation
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#F7F7F7',
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        backgroundPosition: 'center', // Center the background image
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header Section */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          width: '70%',
          height: '60px',
          backgroundColor: 'white',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <img
          src="/images/logoiconblack.png"
          alt="Logo"
          style={{ width: '40px', height: '40px', marginLeft: '30px' }}
        />

        <Box style={{ display: 'flex', marginRight: '30px' }}>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px', // Adding padding to create space around text
              border: '1px solid #8E8E8E', // Border color for outline
              borderRadius: '8px', // Rounded corners
            }}
          >
            Support
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px', // Adding padding to create space around text
              border: '1px solid #8E8E8E', // Border color for outline
              borderRadius: '8px', // Rounded corners
            }}
          >
            Requests
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px', // Adding padding to create space around text
              border: '1px solid #8E8E8E', // Border color for outline
              borderRadius: '8px', // Rounded corners
            }}
            onClick={handleProfileClick}
          >
            Profile
          </Typography>
        </Box>
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfileRedirect}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Main Content */}
      <Typography
        variant="h4"
        style={{
          marginTop: '100px',
          fontFamily: 'Faculty Glyphic',
          color: '#212121',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        The search for justice starts here
      </Typography>

      {/* Search Form */}
      <Box display="flex" justifyContent="center" alignItems="center" gap="20px" marginTop="20px" width="80%">
        {/* Dropdown for Category */}
        <Autocomplete
          options={categoryOptions}
          value={category}
          onChange={(event, newValue) => setCategory(newValue)}
          inputValue={category || ''}
          onInputChange={(event, newInputValue) => setCategory(newInputValue || '')}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              error={!category && Boolean(category)}
            />
          )}
          style={{ width: '30%' }}
        />

        {/* Lawyer Type Selection */}
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Lawyer Type</InputLabel>
          <Select
            value={lawyerType}
            onChange={(e) => setLawyerType(e.target.value)}
          >
            {['Private', 'Exclusive'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Rate Range Slider */}
        <Box style={{ color: 'orange', width: '40%', fontFamily: 'Outfit' }}>
          <Typography color="black">Rate per Hour: {rateRange[0]} - {rateRange[1]} PHP</Typography>
          <Slider
            value={rateRange}
            onChange={(e, newValue) => setRateRange(newValue)}
            valueLabelDisplay="auto"
            min={2000}
            max={100000}
            step={1000}
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: '#D9641E' },
              '& .MuiSlider-rail': { backgroundColor: '#D9641E' },
              '& .MuiSlider-track': { backgroundColor: '#D9641E' },
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{
          backgroundColor: '#D9641E',
          color: 'white',
          marginTop: '30px',
        }}
      >
        Search
      </Button>

      {/* Results Section */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="20px"
      >
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {lawyers.length > 0 ? (
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap="20px">
            {lawyers.map((lawyer, index) => (
              <Box
                key={lawyer.lawyerId}
                style={{
                  ...styles.profileCard,
                  maxWidth: '300px',
                  margin: '10px',
                  flex: index < 3 ? '1 1 calc(33.33% - 20px)' : '1 1 calc(25% - 20px)', // Limit first row to 3 cards
                }}
                onClick={() => handleCardRedirect(`/civilify/client-lawyer-page/${lawyer.lawyerId}`)}
              >
                <Box style={styles.profilePicContainer}>
                  <div style={styles.profilePic}>
                    <img
                      src={`data:image/jpeg;base64,${lawyer.profilePicture}`} // Dynamically set the profile picture URL
                      alt="Profile"
                      style={styles.profilePicImage}
                    />
                  </div>
                </Box>
                <div style={styles.divider}></div>
                <Typography style={styles.name}>{lawyer.name}</Typography>
                <Typography style={styles.infoText}>Specialization: {lawyer.specialization}</Typography>
                <Typography style={styles.infoText}>Hourly Rate: {lawyer.hourlyRate} PHP</Typography>
                <Typography style={styles.infoText}>Address: {lawyer.officeAddress}, {lawyer.zipcode}</Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No results found</Typography>
        )}
      </Box>

      {/* Cards Section */}
      <Box style={styles.cardsSection}>
        {sections.map((section, index) => (
          <Box
            key={section.title}
            style={{
              width: '30%',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#F7F7F7',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              height: expandedCard === index ? '220px' : '200px',
              transition: 'height 0.3s ease, transform 0.3s ease',
              margin: '0 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onMouseEnter={() => setExpandedCard(index)}
            onMouseLeave={() => setExpandedCard(null)}
          >
            {section.icon}
            <Box
              style={{
                backgroundColor: '#FFEEE3',
                borderRadius: '20px',
                padding: '8px 16px',
                marginTop: '10px',
              }}
            >
              <Typography variant="h6" style={{ fontFamily: 'Faculty Glyphic', color: '#212121', fontWeight: '600' }}>
                {section.title}
              </Typography>
            </Box>
            <Typography
              style={{
                color: '#632F0F',
                fontFamily: 'Faculty Glyphic',
                marginTop: '10px',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {expandedCard === index ? section.extendedDescription : section.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer Section */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default ClientHome;