import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem, Menu, CircularProgress } from '@mui/material';
import { FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { FaClock, FaStar } from 'react-icons/fa';

function lawyerclientpov() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [lawyerDetails, setLawyerDetails] = useState(null);
  const [userType, setUserType] = useState(null)
  const { lawyerId } = useParams();
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const StyledButton = styled(Button)(({ theme, colorType }) => ({
    backgroundColor: colorType === 'red' ? '#D32F2F' : colorType === 'green' ? '#388E3C' : '#D9641E',
    color: '#F1F1F1',
    '&:hover': {
      backgroundColor: colorType === 'red' ? '#C62828' : colorType === 'green' ? '#2C6B2F' : '#B55018',
    },
    fontSize: '0.8rem',
    padding: '8px 16px',
    marginTop: '15px',
    fontFamily: 'Outfit, sans-serif',
    width: '60%',
    margin: '5px',
  }));

  const fetchLawyerDetailsById = async (lawyerId) => {
    setLoading(true);
    setError(null); // Reset error
    try {
      console.log('Fetching lawyer details for lawyerId:', lawyerId);
      const response = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
      console.log('Fetched Lawyer Details:', response.data);  // Debugging
  
      // Fetch profile picture
      const profilePictureResponse = await axios.get(`http://localhost:8080/api/lawyer/getProfilePicture/${lawyerId}`);
      console.log('Profile Picture Response:', profilePictureResponse.data);  // Debugging
  
      const profilePictureData = profilePictureResponse.data;
      setLawyerDetails(response.data);
  
      // Assuming profile picture is Base64-encoded, set the image
      setProfilePicture(`data:image/jpeg;base64,${profilePictureData}`);
    } catch (error) {
      console.error('Error fetching lawyer details:', error.response ? error.response.data : error.message);
      setError('Failed to fetch lawyer details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch lawyer details using username and password stored in localStorage
  const fetchLawyerDetails = async (username, password) => {
    setLoading(true);
    setError(null); // Reset error
    try {
      console.log('Fetching lawyer details for username:', username);
  
      // Fetch lawyer details based on stored username and password
      const lawyerDetailsResponse = await axios.post('http://localhost:8080/api/lawyer/login', {
        loginField: username,
        password: password,
      });
  
      // Check if lawyerId exists in the response
      const lawyerId = lawyerDetailsResponse.data.lawyerId;
  
      if (lawyerId) {
        console.log('Lawyer ID:', lawyerId);  // Debugging
  
        // Fetch the actual profile details using the lawyerId
        const lawyerDetails = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
        console.log('Fetched Lawyer Details:', lawyerDetails.data);  // Debugging
  
        // Fetch profile picture
        const profilePictureResponse = await axios.get(`http://localhost:8080/api/lawyer/getProfilePicture/${lawyerId}`);
        console.log('Profile Picture Response:', profilePictureResponse.data);  // Debugging
  
        const profilePictureData = profilePictureResponse.data;
        setLawyerDetails(lawyerDetails.data);
  
        // Assuming profile picture is Base64-encoded, set the image
        setProfilePicture(`data:image/jpeg;base64,${profilePictureData}`);
      } else {
        // Handle the case where the lawyerId is not found
        setError('Failed to fetch lawyer details. Invalid credentials or no data returned.');
      }
    } catch (error) {
      console.error('Error fetching lawyer details:', error.response ? error.response.data : error.message);
      // Displaying a more descriptive error message
      setError('Failed to load lawyer details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch details when component loads
  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const storedUserType = localStorage.getItem('userType'); 
    setUserType(storedUserType);

    if (lawyerId) {
      fetchLawyerDetailsById(lawyerId);
    } else if (username && password) {
      fetchLawyerDetails(username, password);
    } else {
      setError('No lawyer ID or credentials available to fetch details.');
      setLoading(false);
    }
  }, [lawyerId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  // Handle profile edit redirect
  const handleEditProfileRedirect = () => {
    navigate('/civilify/lawyer-update-profile-page');
    handleClose();
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!lawyerDetails) return <Typography>No user data available. Please try logging in again.</Typography>;

  const styles = {
    outerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflowX: 'hidden',
      maxWidth: '100%',
      flexDirection: 'column',
      backgroundColor: '#F7F7F7',
      minHeight: '100vh',
      paddingTop: '64px',
    },
    menuItem: {
      fontSize: '16px',
    },
    footer: {
      backgroundColor: '#D9641E',
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
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: 'calc(100vh - 80px)',
      marginTop: '15px',
      padding: '20px',
      gap: '20px',
    },
    profileCard: {
      width: '25%',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    appointmentsCard: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      width: '60%',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    clickableText: {
      cursor: 'pointer',
      color: '#D9641E',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    profilePicContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    profilePic: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #D9641E',
    },
    profilePicImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginTop: '10px',
    },
    bio: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#888',
    },
    infoContainer: {
      marginTop: '20px',
    },
    label: {
      fontWeight: 'bold',
      color: '#555',
    },
    infoText: {
      color: '#777',
    },
    icon: {
      marginRight: '5px',
      color: '#D9641E',
    },
    clickableText: {
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '5px 10px',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.outerContainer}>
      {/* Header */}
      <Box style={{
          position: 'absolute',
          top: 0,
          width: '70%',
          height: '60px',
          backgroundColor: '#FFFFFF ',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}>
       <img src="/images/logoiconblack.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
        <Box style={{ display: 'flex', marginRight: '30px' }}>
          <Typography
            variant="body2"
            style={{
              backgroundColor: 'white',
              color: '#D9641E',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '18px',
              padding: '5px 15px',
              border: '2px solid #D9641E',
              borderRadius: '8px',
            }}
          >
            Support
          </Typography>

          <Typography
            variant="body2"
            style={{
              backgroundColor: 'white',
              color: '#D9641E',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '18px',
              padding: '5px 15px',
              border: '2px solid #D9641E',
              borderRadius: '8px',
            }}
            onClick={handleClick}
          >
            Profile
          </Typography>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
              style={styles.menuItem}
              onClick={() => navigate('/civilify/lawyer-profile-page')}
            >
              View Profile
            </MenuItem>
            <MenuItem style={styles.menuItem} onClick={handleClose}>
              Deactivate Account
            </MenuItem>
            <MenuItem style={{ ...styles.menuItem, ...styles.logout }} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

     {/* Main Content */}
<Box style={{ ...styles.container, justifyContent: 'center' }}>
  {/* Profile Section */}
  <Box style={{ ...styles.profileCard, marginLeft: '20px', marginRight: '10px' }}>
    <Box style={styles.profilePicContainer}>
      <div style={styles.profilePic}>
        <img
          src={profilePicture} // Dynamically set the profile picture URL
          alt="Profile"
          style={styles.profilePicImage}
        />
      </div>
    </Box>
    <Typography style={styles.name}>{lawyerDetails.name}</Typography>
    <Typography style={styles.bio}>{lawyerDetails.specialization}</Typography>

    <Box style={styles.infoContainer}>
      <Typography>
        <span style={styles.label}>
          <FaUserTie style={styles.icon} /> Name:
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.name}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaUserTie style={styles.icon} /> Username:
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.username}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaPhoneAlt style={styles.icon} /> Contact Number:
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.contactNumber}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaMapMarkerAlt style={styles.icon} /> Address:
        </span>{' '}
        <span style={styles.infoText}>
          {lawyerDetails.officeAddress}, {lawyerDetails.zipcode}
        </span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaEnvelope style={styles.icon} /> Email:
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.email}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaCalendarAlt style={styles.icon} /> Birthdate:
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.birthdate}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaDollarSign style={styles.icon} /> Hourly Rate (PHP):
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.hourlyRate}</span>
      </Typography>
      <Typography>
        <span style={styles.label}>
          <FaDollarSign style={styles.icon} /> Consultation Fee (PHP):
        </span>{' '}
        <span style={styles.infoText}>{lawyerDetails.consultationFee}</span>
      </Typography>
      {userType === 'Lawyer' ? (
        <StyledButton onClick={() => navigate('/civilify/lawyer-accountsettings-page')}>Edit Profile</StyledButton>
      ) : (
        <StyledButton onClick={() => navigate('/civilify/appointment')}>Book Appointment</StyledButton>
      )}
    </Box>
  </Box>


 {/* Appointments Section */}
<Box
  style={{
    ...styles.appointmentsCard,
    marginRight: '10px',
    width: '50%',
    background: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px',
    padding: '20px',
  }}
>
  {/* Section Heading */}
  <Typography
    variant="h5"
    style={{
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#444',
      textAlign: 'center', // Center-align for elegance
    }}
  >
    My Appointments
  </Typography>

  {/* Tabs: Pending / Previous */}
  <Box
    style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '20px',
      borderBottom: '2px solid #eee', // Divider for tabs
      paddingBottom: '10px',
    }}
  >
    <Typography
      style={{
        ...styles.clickableText,
        color: '#FF5722',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#d84315')}
      onMouseLeave={(e) => (e.target.style.color = '#FF5722')}
    >
      Pending
    </Typography>
    <Typography
      style={{
        ...styles.clickableText,
        color: '#757575',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#424242')}
      onMouseLeave={(e) => (e.target.style.color = '#757575')}
    >
      Previous
    </Typography>
  </Box>

  {/* Appointment List */}
  <Box style={{ display: 'grid', gap: '15px', textAlign: 'left' }}>
    {/* Example Appointment Item */}
    {[1, 2, 3].map((item) => (
      <Box
        key={item}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 15px',
          background: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => (e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)')}
        onMouseLeave={(e) => (e.target.style.boxShadow = 'none')}
      >
        <Box>
          <Typography
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
            }}
          >
            Consultation with John Doe
          </Typography>
          <Typography
  style={{
    fontSize: '14px',
    color: '#757575',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  }}
>
  <FaCalendarAlt /> Dec 6, 2024 &nbsp; | &nbsp; <FaClock /> 3:00 PM
</Typography>

        </Box>
        <Typography
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#2196F3',
            cursor: 'pointer',
          }}
          onClick={() => console.log('View details clicked')}
        >
          View Details
        </Typography>
      </Box>
    ))}
  </Box>
</Box>
<Box
  style={{
    ...styles.appointmentsCard,
    marginTop: '0px',
    marginRight: '20px',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  }}
>
  <Typography
    variant="h6"
    style={{
      marginBottom: '15px',
      fontWeight: 'bold',
      color: '#333',
    }}
  >
    Client Reviews
  </Typography>

  {/* Review List */}
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
  >
    {/* Example Review */}
    {[1, 2, 3].map((review, index) => (
      <Box
        key={index}
        style={{
          padding: '15px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Client Name */}
        <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Jane Doe
        </Typography>

        {/* Comment */}
        <Typography
          style={{
            fontSize: '14px',
            color: '#757575',
            marginBottom: '10px',
          }}
        >
          "The lawyer provided excellent advice and handled my case
          professionally. Highly recommended!"
        </Typography>

        {/* Rating */}
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <Typography style={{ fontWeight: 'bold', color: '#333' }}>
            Rating:
          </Typography>
          <Box style={{ display: 'flex', gap: '5px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                color={star <= 4 ? '#FFD700' : '#ccc'} // Example: 4/5 rating
                size={16}
              />
            ))}
          </Box>
        </Box>

        {/* Recommendation */}
        <Typography
          style={{
            fontStyle: 'italic',
            color: '#4caf50',
          }}
        >
          Would recommend
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

</Box>


      {/* Footer */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default lawyerclientpov;
