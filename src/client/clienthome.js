import React, { useState } from 'react';
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
  TextField
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
  const [expandedCard, setExpandedCard] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const styles = {
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
  };  

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleProfileRedirect = () => {
    navigate('/civilify/client-profile-page'); // Redirects to the profile page
    handleClose(); // Closes the dropdown menu
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
    'Corporate law',
    'Health law',
    'Property law',
    'Tax law',
    'Constitutional law',
    'Immigration law',
    'Business law',
    'Administrative law',
    'Education law',
    'Animal law',
    'Bankruptcy',
    'Civil procedure',
    'Alternative dispute resolution',
    'Civil and political rights',
    'Media law',
    'Municipal law',
    'Criminal law',
    'Employment law',
    'Banking laws',
    'Criminal litigation',
    'Labor law',
    'Mergers and acquisitions',
    'Real estate law',
    'Litigation law',
    'Legal ethics',
    'Sports law',
    'Environmental justice',
    'Cybersecurity law',
    'Privacy law',
    'Regulatory law',
    'Maritime law',
    'Intellectual property litigation',
    'Patent law',
    'Trademark law',
    'Copyright law',
    'Trade secrets law',
    'Franchise law',
    'Investment law',
    'Financial services law',
    'Energy law',
    'Utilities law',
    'Competition law',
    'Consumer protection law',
    'Food and drug law',
    'Health insurance law',
    'Medical malpractice law',
    'Personal injury law',
    'Workers compensation law',
    'Bankruptcy law',
    'Estate planning law',
    'Trust and estates law',
    'Family business law',
    'Child custody law',
    'Divorce law',
    'Adoption law',
    'Guardianship law',
    'Elder law',
    'Wills and probate',
    'Civil rights law',
    'Homeland security law',
    'Disability law',
    'Public health law',
    'Indigenous law',
    'International trade law',
    'Arbitration law',
    'Securities law',
    'Financial crimes law',
    'Criminal defense law',
    'White collar crime law',
    'Defamation law',
    'Taxation law',
    'International human rights law',
    'Military law',
    'Health care fraud law',
    'Public policy law',
    'Pension law',
    'Insurance law',
    'Antitrust law',
    'Immigration and nationality law',
    'Patent litigation',
    'Trademark litigation',
    'Class action law',
    'Debt collection law',
    'Consumer finance law',
    'Antitrust litigation',
    'Environmental litigation',
    'Securities litigation',
    'Legal malpractice law',
    'Real estate litigation',
    'Construction law',
    'Insurance litigation',
    'Nonprofit law',
    'Corporate governance law',
    'Financial planning law',
    'Cross-border legal issues',
    'Bankruptcy litigation',
    'Civil liberties law',
    'Public international law',
    'Tax fraud law',
    'Alternative energy law',
    'Humanitarian law',
    'International investment law',
    'Space law',
    'Telecommunications law',
    'Transportation law',
    'Cyber law',
    'Internet law',
    'Data protection law',
    'Smart contracts law',
    'Legal technology law',
    'Artificial intelligence law',
    'Blockchain law',
    'Social justice law',
    'Non-compete agreements law',
    'Real property law',
    'Judicial review law',
    'Land use law',
    'Local government law',
    'Zoning law',
    'Public utility law',
    'Cultural property law',
    'International environmental law',
    'Climate change law',
    'Sustainable development law',
  ];

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
        {/* Hybrid Search and Dropdown for Category */}
        <Autocomplete
          options={categoryOptions}
          value={category}
          onChange={(event, newValue) => setCategory(newValue)}
          inputValue={category || ''} // Make sure inputValue is never null
          onInputChange={(event, newInputValue) => setCategory(newInputValue || '')} // Ensure it's a valid string
          freeSolo // Allow free input, meaning users can type anything or leave it empty
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              error={!category && Boolean(category)} // Show error if the category is empty
            />
          )}
          style={{ width: '30%' }}
        />

        {/* Lawyer Type Selection */}
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Lawyer Type</InputLabel>
          <Select value={lawyerType} onChange={(e) => setLawyerType(e.target.value)}>
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
            min={3000}
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
        onClick={handleSearchSubmit}
        style={{
          backgroundColor: '#D9641E',
          color: 'white',
          marginTop: '30px',
        }}
      >
        SUBMIT
      </Button>

      {/* Cards Section */}
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        style={{
          position: 'absolute',
          bottom: '40px',
        }}
      >
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
