import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, IconButton, Menu, MenuItem, Card, CardContent, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

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

  // Example lawyer profiles for demonstration purposes
  const lawyerProfiles = [
    { name: 'James Bond', specialization: 'Criminal Lawyer', email: 'James@example.com', contact: '123-456-7890', imageUrl: 'https://images.saymedia-content.com/.image/t_share/MTc0NTE0MDYyNzc0NzczNzA1/daniel-craigs-james-bond-films-ranked-from-worst-to-best.jpg' },
    { name: 'Jessica Pearson', specialization: 'Corporate Lawyer', email: 'jessica@example.com', contact: '098-765-4321', imageUrl: 'https://images.example.com/jessica.jpg' },
    // Add more mock profiles here if needed
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
            <Typography variant="body1" onClick={() => navigate('/requests')} style={{ cursor: 'pointer', marginLeft: '20px', color: '#41423A', fontSize: '16px', fontFamily: 'Faculty Glyphic' }}>
              Requests
            </Typography>
            <Typography variant="body1" onClick={handleProfileClick} style={{ cursor: 'pointer', marginLeft: '20px', color: '#41423A', fontSize: '16px', fontFamily: 'Faculty Glyphic', display: 'flex', alignItems: 'center' }}>
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

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '5px', padding: '0 20px', width: '100%' }}>
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
            style: { fontSize: '18px', height: '40px' },
          }}
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      {/* Filtered Lawyers Display */}
{filteredLawyers.length > 0 && (
  <Box style={{ width: '100%', maxWidth: '500px', marginTop: '10px', overflowY: 'auto', position: 'absolute', zIndex: 1, backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
    {filteredLawyers.map((lawyer, index) => (
      <Card key={index} style={{ marginBottom: '10px', backgroundColor: 'white' }}>
        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={lawyer.imageUrl} alt={lawyer.name} style={{ marginRight: '10px' }} />
          <Box>
            <Typography variant="h6" style={{ fontFamily: 'Outfit' }}>{lawyer.name}</Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit', color: 'grey' }}>{lawyer.specialization}</Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit', color: 'grey' }}>Email: {lawyer.email}</Typography>
            <Typography variant="body2" style={{ fontFamily: 'Outfit', color: 'grey' }}>Contact: {lawyer.contact}</Typography>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
)}


      {/* Icons Row */}
      <Box display="flex" justifyContent="center" gap="20px" marginTop="10px">
        <IconButton style={{ backgroundColor: 'white', width: '35px', height: '35px', color: 'black', borderRadius: '50%' }} onClick={() => handleIconClick('search')}>
          <SearchIcon />
        </IconButton>
        <IconButton style={{ backgroundColor: 'white', width: '35px', height: '35px', color: 'black', borderRadius: '50%' }} onClick={() => handleIconClick('requests')}>
          <MessageIcon />
        </IconButton>
        <IconButton style={{ backgroundColor: 'white', width: '35px', height: '35px', color: 'black', borderRadius: '50%' }} onClick={() => handleIconClick('profile')}>
          <PersonIcon />
        </IconButton>
      </Box>

      {/* Descriptions */}
      <Box style={{ width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: 'transparent' }}>
        {descriptions[selectedOption]}
      </Box>
    </div>
  );
}

export default ClientHome;
