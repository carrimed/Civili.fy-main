import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton, Snackbar, Menu, MenuItem, Divider, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const StyledButton = styled(Button)(() => ({
  color: 'white',
  backgroundColor: '#ED7D27', // Updated orange color
  '&:hover': {
    backgroundColor: '#FF5722',
  },
  padding: '5px 10px', // Slightly smaller button
  fontSize: '14px', // Smaller font size
}));

const StyledCancelButton = styled(IconButton)(() => ({
  border: '2px solid #ED7D27', // Updated orange color
  color: '#ED7D27',
  borderRadius: '5px',
  padding: '5px', // Slightly smaller button
  fontSize: '14px', // Smaller font size
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

function AdminHome() {
  const [isPending, setIsPending] = useState(true);
  const [practitioners, setPractitioners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // For profile menu
  const [loading, setLoading] = useState(false); // Loading state for logout
  const navigate = useNavigate(); // For redirecting to login page

  // Retrieve practitioners data from localStorage if available
  useEffect(() => {
    const storedPractitioners = JSON.parse(localStorage.getItem('practitioners'));
    if (storedPractitioners) {
      setPractitioners(storedPractitioners);
    } else {
      // Default data if no stored data is found
      const defaultPractitioners = [
        { profilePicture: '/images/pfp4.png', name: 'John Doe', specialization: 'Criminal law', email: 'john.doe@email.com', status: 'pending' },
        { profilePicture: '/images/pfp4.png', name: 'Jane Smith', specialization: 'Constitutional law', email: 'jane.smith@email.com', status: 'pending' },
        // ... other default data
      ];
      setPractitioners(defaultPractitioners);
      localStorage.setItem('practitioners', JSON.stringify(defaultPractitioners));
    }
  }, []);

  const handleAction = (index, action) => {
    const updatedPractitioners = practitioners.map((practitioner, i) => {
      if (i === index) {
        return {
          ...practitioner,
          status: action === 'approve' ? 'approved' : 'rejected',
        };
      }
      return practitioner;
    });

    setPractitioners(updatedPractitioners);
    localStorage.setItem('practitioners', JSON.stringify(updatedPractitioners));

    setSnackbarMessage(`${updatedPractitioners[index].name} has been ${action === 'approve' ? 'approved' : 'rejected'}`);
    setOpenSnackbar(true);
  };

  const filteredPractitioners = practitioners.filter((practitioner) =>
    practitioner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRequests = () => {
    setIsPending(!isPending);
  };

  // Profile Menu handling
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoading(true); // Start loading when logout is clicked
    setTimeout(() => {
      // Simulate logout process (replace with actual logout logic if needed)
      setLoading(false); // Stop loading
      navigate('/civilify/admin-login-page'); // Redirect to login page
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F5F5F5', padding: '20px' }}>
      {/* Top Section with Profile Dropdown and Logo */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        {/* Logo */}
        <img src="/images/logotextblack.png" alt="Logo" style={{ width: '150px' }} />
        
        {/* Profile Dropdown */}
        <Typography variant="body1" style={{ fontFamily: 'Faculty Glyphic', fontSize: '14px', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
          Profile ▾
        </Typography>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <Box style={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
            <img
              src="/images/pfp1.jpg"
              alt="Profile"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <Typography variant="body1" style={{ fontSize: '16px', fontFamily: 'Faculty Glyphic' }}>
              Keith Tagarao
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* Search Bar */}
      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: 'transparent',
            borderRadius: '20px',
            marginLeft: '20px',
            fontSize: '14px',
            width: '200px',
          }}
          InputProps={{
            startAdornment: <SearchIcon style={{ color: 'grey' }} />,
            style: { fontSize: '14px' },
          }}
        />
      </Box>

      {/* Pending/Previous Requests */}
      <Box display="flex" alignItems="center" marginBottom="20px">
        <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '14px', cursor: 'pointer' }} onClick={toggleRequests}>
          Pending Requests
        </Typography>
        <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '14px', margin: '0 10px' }}>|</Typography>
        <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '14px', cursor: 'pointer' }} onClick={toggleRequests}>
          Previous Requests
        </Typography>
      </Box>

      {/* Law Practitioner Containers */}
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="20px" style={{ marginTop: '20px' }}>
        {filteredPractitioners
          .filter((item) => (isPending ? item.status === 'pending' : item.status !== 'pending'))
          .map((item, index) => (
            <Box
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                height: '100px',
              }}
            >
              <img src={item.profilePicture} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
              <Box style={{ flexGrow: 1 }}>
                <Typography variant="body1" style={{ fontFamily: 'Outfit', fontSize: '14px' }}>{item.name}</Typography>
                <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '12px' }}>{item.specialization}</Typography>
                <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '12px' }}>{item.email}</Typography>
                <Typography variant="body2" style={{ color: 'grey', fontFamily: 'Outfit', fontSize: '12px' }}>Status: {item.status}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                {item.status === 'pending' ? (
                  <>
                    <StyledButton onClick={() => handleAction(index, 'approve')}>
                      <CheckCircleIcon />
                    </StyledButton>
                    <StyledCancelButton onClick={() => handleAction(index, 'reject')}>
                      <CancelIcon style={{ width: '50px' }}/>
                    </StyledCancelButton>
                  </>
                ) : (
                  <StyledButton disabled>{item.status === 'approved' ? 'Approved' : 'Rejected'}</StyledButton>
                )}
              </Box>
            </Box>
          ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      />

      {/* Loading Spinner (pachuy2) */}
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

export default AdminHome;
