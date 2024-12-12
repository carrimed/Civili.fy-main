import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box, Menu, MenuItem, Card, CardContent, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function BrowsePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState([]);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const lawyerProfiles = [
    {
      name: 'James Bond',
      specialization: 'Criminal Lawyer',
      email: 'James@example.com',
      contact: '123-456-7890',
      imageUrl: 'https://images.saymedia-content.com/.image/t_share/MTc0NTE0MDYyNzc0NzczNzA1/daniel-craigs-james-bond-films-ranked-from-worst-to-best.jpg'
    }
  ];

  useEffect(() => {
   
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
    
    const results = lawyerProfiles.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLawyers(results);
  }, [location.search]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = lawyerProfiles.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(query) ||
        lawyer.specialization.toLowerCase().includes(query)
    );
    setFilteredLawyers(results);
    navigate(`/browse?search=${query}`);
  };

  const handleLawyerClick = () => {
    navigate('/civilify/lawyer-profile');
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

      {filteredLawyers.map((lawyer, index) => (
  <Card
    key={lawyer.name}
    style={{
      position: 'fixed',
      left: '35%',
      top: `${150 + index * 150}px`, 
      width: '500px',
      margin: '10px auto',
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
    }}
    onClick={handleLawyerClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.03)';
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    }}
  >
    <Avatar
      src={lawyer.imageUrl}
      alt={lawyer.name}
      style={{
        width: 70,
        height: 70,
        marginRight: '15px',
        border: '2px solid #D9641E',
      }}
    />
    <CardContent>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Outfit',
          fontWeight: 'bold',
          color: '#D9641E',
        }}
      >
        {lawyer.name}
      </Typography>
      <Typography
        variant="body2"
        style={{
          fontFamily: 'Outfit',
          color: '#555',
        }}
      >
        {lawyer.specialization}
      </Typography>
      <Typography
        variant="body2"
        style={{
          fontFamily: 'Outfit',
          marginTop: '5px',
          color: '#777',
        }}
      >
        📧 {lawyer.email}
      </Typography>
      <Typography
        variant="body2"
        style={{
          fontFamily: 'Outfit',
          color: '#777',
        }}
      >
        📞 {lawyer.contact}
      </Typography>
    </CardContent>
  </Card>
))}


      <Box style={{ backgroundColor: '#41423A', width: '100%', height: '20px', display: 'flex', alignItems: 'center', paddingLeft: '10px', color: 'white', fontFamily: 'Faculty Glyphic', fontSize: '10px' }}>
        © The Civilify Company, Cebu Philippines
      </Box>
    </div>
  );
}

export default BrowsePage;
