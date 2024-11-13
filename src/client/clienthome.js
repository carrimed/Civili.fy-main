import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, IconButton, Menu, MenuItem, Card, CardContent, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function ClientHome() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleIconClick = (option) => setSelectedOption(option);

  const descriptions = {
    search: (
      <>
        <Typography variant="h6" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '20px', marginBottom: '10px' }}>Search</Typography>
        <hr style={{ width: '100%', borderTop: '1px solid white', margin: '10px 0' }} />
        <Typography variant="body1" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '16px' }}>
          Enter the details of your case into the search bar, and our intelligent algorithm will match you with the most suitable lawyers.
        </Typography>
      </>
    ),
    requests: (
      <>
        <Typography variant="h6" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '20px', marginBottom: '10px' }}>Requests</Typography>
        <hr style={{ width: '100%', borderTop: '1px solid white', margin: '10px 0' }} />
        <Typography variant="body1" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '16px' }}>
          Keep track of all your appointment requests and stay updated on each request in real-time.
        </Typography>
      </>
    ),
    profile: (
      <>
        <Typography variant="h6" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '20px', marginBottom: '10px' }}>Profile</Typography>
        <hr style={{ width: '100%', borderTop: '1px solid white', margin: '10px 0' }} />
        <Typography variant="body1" style={{ color: 'white', fontFamily: 'Outfit', fontSize: '16px' }}>
          View and update your profile to ensure it's optimized for potential legal practitioners.
        </Typography>
      </>
    ),
  };

  //Manipulated since, not connected yet to backened
  const lawyerProfiles = [
    { name: 'Kent M. Delos Cientos', specialization: 'Criminal Lawyer', email: 'kent@example.com', contact: '123-456-7890', imageUrl: '/images/kent.jpg' },
    { name: 'Keith Ruezyl Tagarao', specialization: 'Family Lawyer', email: 'keith@example.com', contact: '234-567-8901', imageUrl: '/images/keith.jpg' },
    { name: 'Arnel P. Paden', specialization: 'Corporate Lawyer', email: 'arnel@example.com', contact: '345-678-9012', imageUrl: '/images/arnel.jpg' },
    { name: 'Franco C. Magno', specialization: 'Immigration Lawyer', email: 'franco@example.com', contact: '456-789-0123', imageUrl: '/images/franco.jpg' },
  ];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = lawyerProfiles.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(query) ||
        lawyer.specialization.toLowerCase().includes(query)
    );
    setFilteredLawyers(results);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'transparent', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("/images/bg2.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1, zIndex: -1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, #D9641E, #A54C17)', opacity: 0.7, zIndex: -1 }} />
      
      <AppBar position="static" style={{ backgroundColor: 'white', boxShadow: 'none', width: '100%' }}>
        <Toolbar>
          <Typography component="div" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
            <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', marginLeft: '10px', marginRight: '10px' }} />
          </Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ flexGrow: 1 }}>
            <Typography variant="body1" onClick={() => navigate('/requests')} style={{ cursor: 'pointer', marginLeft: '20px', color: '#41423A', fontSize: '16px', fontFamily: 'Faculty Glyphic' }}>Requests</Typography>
            <Typography variant="body1" onClick={handleProfileClick} style={{ cursor: 'pointer', marginLeft: '20px', color: '#41423A', fontSize: '16px', fontFamily: 'Faculty Glyphic', display: 'flex', alignItems: 'center' }}>Profile ▾</Typography>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>My Profile</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>Settings</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/logout'); }}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '5px', padding: '0 20px', width: '100%' }}>
        <TextField
          variant="standard"
          size="medium"
          placeholder="Search for practitioners..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            backgroundColor: 'white',
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

            {filteredLawyers.map((lawyer) => (
        <Card key={lawyer.name} style={{ width: '500px', margin: '10px', display: 'flex', alignItems: 'center', padding: '10px' }}>
          <Avatar src={lawyer.imageUrl} alt={lawyer.name} style={{ width: 60, height: 60, marginRight: '15px' }} />
          <CardContent>
            <Typography variant="h6" style={{ fontFamily: 'Outfit' }}>{lawyer.name}</Typography>
            <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Outfit' }}>{lawyer.specialization}</Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit' }}>Email: {lawyer.email}</Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit' }}>Contact: {lawyer.contact}</Typography>
          </CardContent>
        </Card>
      ))}

      <Box style={{ backgroundColor: '#41423A', width: '100%', height: '20px', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontFamily: 'Faculty Glyphic', fontSize: '10px' }}>
        © The Civilify Company, Cebu City
      </Box>
    </div>
  );
}

export default ClientHome;
