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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState('');
  const [lawyerType, setLawyerType] = useState('');
  const [rateRange, setRateRange] = useState([2000, 75000]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [showCardsSection, setShowCardsSection] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate('/civilify/login-page');
    }
  }, [navigate]);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setLoading(true);

    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');

    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleProfileRedirect = () => {
    if (userType === 'Client') {
      navigate('/civilify/client-profile-page');
    } else if (userType === 'Lawyer') {
      navigate('/civilify/lawyer-profile-page');
    }
    handleClose();
  };

  const handleCardRedirect = (lawyerId) => {
    navigate(`/civilify/client-lawyer-page/${lawyerId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSearchPerformed(true);
    setShowCardsSection(false);

    try {
      console.log('Sending query params:', {
        category,
        lawyerType,
        minRate: rateRange[0],
        maxRate: rateRange[1],
      });

      const response = await axios.get('http://localhost:8080/api/lawyer/search', {
        params: {
          category,
          lawyerType,
          minRate: rateRange[0],
          maxRate: rateRange[1],
        },
      });

      if (Array.isArray(response.data)) {
        setLawyers(response.data);
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setError('Failed to fetch lawyers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    'Environmental law',
    'Intellectual Property Law',
    'Family law',
    'International law',
  ];

  const styles = {
    profileCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      color: 'black',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0',
      textAlign: 'left',
      cursor: 'pointer',
    },
    searchFormContainer: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    searchResultsContainer: {
      position: 'absolute',
      top: '20px',
      left: '340px', // Adjust this value to control the spacing
      width: 'calc(100% - 360px)', // Adjust this value to control the width
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    profilePicContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
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
      textAlign: 'left',
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    infoGroup: {
      marginBottom: '8px',
    },
    infoText: {
      fontSize: '14px',
      color: 'black',
      textAlign: 'left',
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
      transform: showCardsSection ? 'translateY(0)' : 'translateY(100%)',
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: searchPerformed ? 'white' : '#F7F7F7',
        backgroundImage: searchPerformed ? 'none' : 'url(/images/homepageimg1.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
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
          width: '100%',
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
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
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
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
            }}
            onClick={handleProfileClick}
          >
            Profile
          </Typography>
        </Box>
      </Box>

      {/* Search Form */}
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="150px">
        {!searchPerformed && (
          <Typography
            variant="h4"
            style={{
              fontFamily: 'Faculty Graphic',
              color: 'white',
              fontWeight: 'normal',
              textAlign: 'left',
              maxWidth: '500px',
              fontSize: '90px',
              lineHeight: '1.3',
              marginRight: '300px',
            }}
          >
            The search
            <br />
            for justice
            <br />
            starts here.
          </Typography>
        )}

        {/* Search Form (Arranged Vertically) */}
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          width="300px"
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
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
          />

          {/* Lawyer Type Selection */}
          <FormControl fullWidth>
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
          <Box style={{ color: 'orange' }}>
            <Typography color="black">Rate per Hour: [{rateRange[0]} - {rateRange[1]}] PHP</Typography>
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

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#D9641E',
              '&:hover': { backgroundColor: '#D9641E' },
            }}
          >
            Find Lawyers
          </Button>
        </Box>
      </Box>

      {/* Results Section */}
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {lawyers.length > 0 ? (
          <Box display="flex" flexWrap="nowrap" justifyContent="flex-start" gap="20px" overflow="auto">
          {lawyers.map((lawyer, index) => (
            <Box
              key={lawyer.lawyerId}
              style={{
                ...styles.profileCard,
                maxWidth: '300px',
                margin: '10px',
                flex: 'none', // Ensures that the items don't shrink or grow
              }}
              onClick={() => handleCardRedirect(lawyer.lawyerId)}
            >
              <Box style={styles.profilePicContainer}>
                <div style={styles.profilePic}>
                  <img
                    src={`data:image/jpeg;base64,${lawyer.profilePicture}`}
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
        
        ) : searchPerformed && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography>No results found</Typography>
          </Box>
        )}
      </Box>

      {/* Footer Section */}
      <Box sx={styles.footer}>
        © The Civilify Company, Cebu City 2024. All rights reserved.
      </Box>
    </Box>
  );
}

export default ClientHome;
