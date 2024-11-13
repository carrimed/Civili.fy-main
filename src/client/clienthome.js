import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, Paper, Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function ClientHome() {
  const navigate = useNavigate();
  const carouselItems = [
    { image: '/images/bgg.png' },
    { image: '/images/bgg.png' },
    { image: '/images/bgg.png' }
  ];

  return (
    <div
      style={{
        backgroundColor: '#F1F1F1',
        minHeight: '100vh',
        paddingBottom: '40px',
        background: 'linear-gradient(to bottom, #F1F1F1, #F1F1F1, #F1F1F1, #F1F1F1, #F1F1F1, #D9641E)', // Adding gradient
      }}
    >
      {/* App Bar with Search Bar beside the Logo */}
      <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none' }}>
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
          {/* Search Bar next to the logo */}
          <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search for practitioners..."
              style={{
                width: '300px', // Adjust the width as needed
                marginLeft: '30px', // Add some margin left to separate it from the logo
                backgroundColor: '#F5F5F5',
              }}
              InputProps={{
                startAdornment: <SearchIcon style={{ color: 'grey' }} />,
              }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {['Requests', 'Profile'].map((text, idx) => (
              <Typography
                key={idx}
                variant="body1"
                onClick={() => navigate(`/${text.toLowerCase()}`)}
                style={{
                  cursor: 'pointer',
                  marginLeft: '50px',
                  color: '#41423A',
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

      {/* Main Content in White Container with Rounded Edges */}
      <Box
        component={Paper}
        style={{
          backgroundColor: 'white',
          marginTop: '20px',
          marginBottom: '20px',
          padding: '30px',
          borderRadius: '12px',
          maxWidth: '1350px',
          margin: 'auto',
          textAlign: 'center',
          minHeight: 'calc(100vh - 70px)', // Adjust to leave space for AppBar
        }}
      >
        {/* Carousel */}
        <Carousel
          indicators={true}
          navButtonsAlwaysVisible={true}
          style={{
            marginTop: '40px', // Adjust the top margin to push the carousel down
            margin: 'auto', // Center the carousel
            maxWidth: '1200px', // Match width of search bar container
            borderRadius: '12px',
            height: '200px', // Set height to 200px
            overflow: 'hidden',
          }}
          navButtonsProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: adds background color to nav buttons
              borderRadius: '50%', // Makes nav buttons circular
              padding: '8px', // Adjusts the size of the nav buttons
              marginTop: '-50px', // Moves nav buttons closer to carousel
            }
          }}
        >
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{
                height: '100%', // Ensure the carousel content fills the container height
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={`Carousel ${index + 1}`}
                style={{
                  width: '1350px', // Ensure image doesn’t exceed container width
                  height: '50%', // Ensure image fills the container's height
                  borderRadius: '12px',
                  objectFit: 'contain', // Center the image and keep it within bounds without cropping
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Footer Section (moved below the content) */}
      <Box style={{ marginTop: '20px' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" style={{ fontFamily: 'Faculty Glyphic', fontSize: '10px', color: 'white' }}>
            © The Civilify Company, Cebu City
          </Typography>
        </Box>
      </Box>

    </div>
  );
}

export default ClientHome;
