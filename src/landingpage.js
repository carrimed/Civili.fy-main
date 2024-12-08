import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container, Grid, Typography, TextField, Button, Toolbar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType'); // Retrieve from localStorage
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate('/civilify/login-page'); // Redirect to login if no user type is found
    }
  }, [navigate]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    handleSectionChange(id);
  };

  const handleLoginSignupRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000); 
  };

  const handleSignUpRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/civilify/client-signup-page');
    }, 2000); 
  };

  const handleLawyerSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/civilify/lawyer-sign-up-form');
    }, 2000);
  }; 

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/lawyer/getLawyerByName/${encodeURIComponent(searchInput)}`);
      setLawyers(response.data);
    } catch (error) {
      setError('Failed to fetch lawyers.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileRedirect = (lawyerId) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/civilify/lawyer-profile/${lawyerId}`);
    } else {
      navigate('/civilify/login-page');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

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
  };

  return (
    <div style={{ backgroundColor: '#F1F1F1', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

      {/* AppBar */}
      <AppBar position="fixed" style={{ backgroundColor: 'white', boxShadow: 'none', padding: '0px 0', height: '0px 0' }}>
        <Toolbar>
          <img
            src="/images/logoiconblack.png"
            alt="Civilify Logo"
            style={{ width: '40px', marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
            onClick={() => scrollToSection('hero')}
          />
          <Box style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            {['What is Civilify', 'About Us', 'Login/Signup'].map((text, idx) => (
              <a
                href={`#${text.replace(/\s/g, '')}`}
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  if (text === 'Login/Signup') {
                    handleLoginSignupRedirect();
                  } else {
                    scrollToSection(text.replace(/\s/g, ''));
                  }
                }}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  style={{
                    marginLeft: '50px',
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'Faculty Glyphic',
                    cursor: 'pointer',
                    color: activeSection === text.replace(/\s/g, '') ? '#D9641E' : '#4A4A4A',
                  }}
                >
                  {text}
                </Typography>
              </a>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="hero"
        style={{
          backgroundImage: 'url(/images/bg2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, #D9641E, #A54C17)',
            opacity: 0.7,
          }}
        ></div>
        
        <Container style={{ maxWidth: '800px', margin: '0 auto', zIndex: 2 }}>
          <img src="/images/logotextwhite.png" alt="Civilify" style={{ width: '300px', marginBottom: '30px' }} />
          <Typography variant="h1" style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px' }}>
            Sign up for our newsletter
          </Typography>
          <Typography variant="subtitle1" style={{ fontSize: '12px', marginBottom: '30px' }}>
            to receive daily updates on Civilify's journey to becoming the go-to resource for legal support
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search lawyer by name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', width: '350px', marginBottom: '20px' }}
          />

      {/* Results */}
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {lawyers.map((lawyer) => (
          <Box
            key={lawyer.id}
            style={{ ...styles.profileCard, margin: '10px', width: '80%' }}
            onClick={() => handleProfileRedirect(lawyer.id)}
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
            <Typography style={styles.bio}>{lawyer.specialization}</Typography>
            <Typography>
              <span style={styles.label}>Hourly Rate (PHP): </span>
              <span style={styles.infoText}>{lawyer.hourlyRate}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Office Address: </span>
              <span style={styles.infoText}>{lawyer.officeAddress}, {lawyer.zipcode}</span>
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
      </Box>

      {/* What is Civilify Section */}
      <Container
        id="WhatisCivilify"
        style={{
          paddingTop: '150px',
          paddingBottom: '80px',
          scrollMarginTop: '64px',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#D9641E',
                marginBottom: '40px',
              }}
            >
              <span style={{ color: 'black' }}>What is </span>Civilify?
            </Typography>
            <Typography variant="body1" paragraph>
              Civilify is a platform built to empower everyday individuals by connecting them with trusted, highly qualified legal professionals. We believe that everyone deserves convenient access to justice and the fundamental right to defend themselves in court.
            </Typography>
            <Typography variant="body1" paragraph>
              Our network of practitioners has been carefully curated through strict regulations and thorough background checks, ensuring only the highest quality service for our users. Whether you’re seeking guidance or preparing for legal action, Civilify helps you find reliable support to uphold your rights, with diverse options to meet everyone’s unique needs.
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#D9641E',
                color: '#FFFFFF',
                padding: '10px 30px',
                fontSize: '18px',
                marginTop: '20px',
              }}
              onClick={() => handleLawyerSignUp()}
            >
              Sign up as a practitioner
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="/images/bg1.png" alt="none" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>
      </Container>

      {/* About Us Section */}
      <Box
        id="AboutUs"
        style={{
          backgroundColor: '#D9641E',
          color: '#FFFFFF',
          padding: '250px 0',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px' }}>
            About Us
          </Typography>
          <Grid container spacing={4}>
            {[ 
              { name: 'Keith Ruezyl Tagarao', role: 'CFO and Founder' },
              { name: 'Franco Magno', role: 'Co-Founder' },
              { name: 'Arnel Paden', role: 'Founder' },
              { name: 'Kent Delos Cientos', role: 'Co-Founder' },
            ].map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} style={{ textAlign: 'center', marginBottom: '30px' }}>
                <img
                  src={`/images/team-member-${index + 1}.jpg`}
                  alt={member.name}
                  style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '15px' }}
                />
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2">{member.role}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Get Started Section */}
      <Box style={{ padding: '80px 0', textAlign: 'center', color: '#41423A' }}>
        <Container>
          <Typography
            variant="h2"
            style={{ fontSize: '32px', fontWeight: 500, marginBottom: '20px', fontFamily: 'Outfit', color: '#D9641E' }}
          >
            Get Started
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              fontSize: '18px',
              marginBottom: '30px',
              fontFamily: 'Outfit',
              fontWeight: 400,
              color: '#41423A',
            }}
          >
            and get the legal support that you need today!
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#D9641E',
              color: '#FFFFFF',
              padding: '12px 40px',
              fontSize: '18px',
            }}
            onClick={() => handleSignUpRedirect()}
          >
            Sign up
          </Button>
        </Container>
      </Box>

      {/* Footer Section */}
    <Box style={{ backgroundColor: '#4A4A4A', color: '#FFFFFF', padding: '40px 0' }}>
      <Container>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

      {/* Left: Logo and QR Code */}
      <Box style={{ flex: 1 }}>
        <img src="/images/logotextwhite.png" alt="Civilify Logo" style={{ width: '150px', marginBottom: '10px' }} />
        
        {/* The Civilify Company Text Footer */}
        <Typography 
          style={{
            fontSize: '12px',
            fontFamily: 'Faculty Glyphic',
            color: '#D9641E',
            marginBottom: '10px',
            textAlign: 'left'
          }}
        >
          The Civilify Company, Cebu City
        </Typography>

        {/* QR Code Image (bwahahha suwayig scan) */}
        <Box style={{ textAlign: 'left', marginBottom: '20px' }}>
          <img src="/images/qr.png" alt="QR Code" style={{ width: '50px', height: '50px' }} />
        </Box>
      </Box>

      {/* Center: Horizontal Sections (Site, Products, Help) */}
      <Box style={{ flex: 2, display: 'flex', justifyContent: 'space-between' }}>

        {/* Site Links (non functional) */}
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Site</Typography>
          <a href="#about-us" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>About Us</a>
          <a href="#our-goals" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Our Goals</a>
          <a href="#contact" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Contact</a>
        </Box>

        {/* Products Links (non functional) */}
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Products</Typography>
          <a href="#how-our-system-works" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>How our system works</a>
          <a href="#practitioner-qualifications" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Practitioner Qualifications</a>
          <a href="#customer-protection" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Customer Protection</a>
        </Box>

        {/* Help Links (non functional) */}
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Help</Typography>
          <a href="#getting-started" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Getting Started</a>
          <a href="#faq" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>FAQ</a>
          <a href="#customer-support" style={{ color: '#FFFFFF', textDecoration: 'none', fontSize: '16px', marginBottom: '10px' }}>Customer Support</a>
        </Box>
      </Box>
    </Box>
  </Container>
</Box>

      {/* Loading Spinner (pachuy2) */}
      {loading && (
        <Box
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default LandingPage;
