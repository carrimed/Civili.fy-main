  import React, { useState, useEffect } from 'react';
  import { Box, Typography, Button, MenuItem, Menu, CircularProgress } from '@mui/material';
  import { FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
  import { useNavigate, useParams } from 'react-router-dom';
  import axios from 'axios';
  import { styled } from '@mui/system';
  import { FaClock, FaStar } from 'react-icons/fa';

  function LawyerPersonalProfile() {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [lawyerDetails, setLawyerDetails] = useState(null);
    const [userType, setUserType] = useState(null)
    const { lawyerId } = useParams();
    const [appointments, setAppointments] = useState([]); 

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

    const fetchAppointments = async () => {
      if (!lawyerDetails?.lawyerId) return; 
    
      try {
        const response = await axios.get(
          `http://localhost:8080/api/appointment/getAll?lawyerId=${lawyerDetails.lawyerId}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
          }
        );
    
        setAppointments(response.data); 
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Failed to fetch appointments.');
      }
    };
    
    
    useEffect(() => {
      if (lawyerDetails?.lawyerId) {
        fetchAppointments();
      }
    }, [lawyerDetails]);    

    useEffect(() => {
      if (lawyerDetails?.lawyerId) {
        fetchClientReviews(); 
      }
    }, [lawyerDetails]);    

    useEffect(() => {
      if (lawyerId) {
        fetchAppointments();
      }
    }, [lawyerId]);

    const fetchClientReviews = async () => {
      if (!lawyerDetails?.lawyerId) return;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/review/getReviewsByLawyerId/${lawyerDetails.lawyerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchLawyerDetailsById = async (lawyerId) => {
      setLoading(true);
      setError(null); 
      try {
        console.log('Fetching lawyer details for lawyerId:', lawyerId);
        const response = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
        console.log('Fetched Lawyer Details:', response.data);  
    
        
        const profilePictureResponse = await axios.get(`http://localhost:8080/api/lawyer/getProfilePicture/${lawyerId}`);
        console.log('Profile Picture Response:', profilePictureResponse.data); 
    
        const profilePictureData = profilePictureResponse.data;
        setLawyerDetails(response.data);
    
        
        setProfilePicture(`data:image/jpeg;base64,${profilePictureData}`);
      } catch (error) {
        console.error('Error fetching lawyer details:', error.response ? error.response.data : error.message);
        setError('Failed to fetch lawyer details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    
    const fetchLawyerDetails = async (username, password) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('http://localhost:8080/api/lawyer/login', {
          loginField: username,
          password: password,
        });
  
        const lawyerId = response.data.lawyerId;
  
        if (lawyerId) {
          const lawyerDetailsResponse = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
          const profilePictureResponse = await axios.get(`http://localhost:8080/api/lawyer/getProfilePicture/${lawyerId}`);
  
          const profilePictureData = profilePictureResponse.data;
          setLawyerDetails(lawyerDetailsResponse.data);
          setProfilePicture(`data:image/jpeg;base64,${profilePictureData}`);
        } else {
          setError('Failed to fetch lawyer details.');
        }
      } catch (error) {
        console.error('Error fetching lawyer details:', error);
        setError('Failed to load lawyer details.');
      } finally {
        setLoading(false);
      }
    };

   
    useEffect(() => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
  
      if (username && password) {
        fetchLawyerDetails(username, password);
      } else {
        setError('No login details found.');
        setLoading(false);
      }
    }, []);

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    
    const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      setTimeout(() => {
        navigate('/civilify/login-page');
      }, 2000);
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
      appointmentsSection: {
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      },
      appointmentHeading: {
        marginBottom: '15px',
        fontWeight: 'bold',
        fontSize: '16px',
      },
      appointmentList: {
        display: 'grid',
        gap: '15px',
      },
      appointmentItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
      },
      appointmentItemHover: {
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      },
      appointmentDetails: {
        display: 'flex',
        flexDirection: 'column',
      },
      appointmentClientName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
      },
      appointmentDateTime: {
        fontSize: '14px',
        color: '#757575',
      },
      appointmentViewDetails: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#2196F3',
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
            src={profilePicture} 
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
          <StyledButton onClick={() => navigate('/civilify/lawyer-accountsettings-page')}>Edit Profile</StyledButton> 
      </Box>
    </Box>


  {/* Appointments Section */}
  <Box
    style={{
      ...styles.appointmentsCard,
      marginRight: '10px',
      width: '50%',
      background: '#fff',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '20px',
    }}
  >
    {/* Section Heading */}
    {/* My Appointments Section */}
    <Box style={styles.appointmentsSection}>
          <Typography style={styles.appointmentHeading}>My Appointments</Typography>

          {appointments.length > 0 ? (
            <Box style={styles.appointmentList}>
              {appointments.map((appointment) => (
                <Box key={appointment.id} style={styles.appointmentItem} onMouseEnter={(e) => e.currentTarget.style = styles.appointmentItemHover} onMouseLeave={(e) => e.currentTarget.style = styles.appointmentItem}>
                  <Box style={styles.appointmentDetails}>
                    <Typography style={styles.appointmentClientName}>{appointment.clientName}</Typography>
                    <Typography style={styles.appointmentDateTime}>
                      <FaCalendarAlt /> {appointment.date} &nbsp; | &nbsp; <FaClock /> {appointment.time}
                    </Typography>
                  </Box>
                  <Typography style={styles.appointmentViewDetails} onClick={() => console.log('View details clicked')}>
                
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No appointments found.</Typography>
          )}
        </Box>

    {/* Tabs: Pending / Previous */}
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px',
        borderBottom: '2px solid #eee', 
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

  </Box>
  <Box 
  sx={{
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '16px'
  }}
>
      {/* Client Reviews Section */}
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>Client Reviews</Typography>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Box key={review.id} sx={{ marginBottom: '16px' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{review.clientName}</Typography>
            <Typography>{review.comment}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaStar style={{ color: '#FFD700', marginRight: '4px' }} />
              <Typography>{review.rating} / 5</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>No reviews yet.</Typography>
      )}
    </Box>

  </Box>


        {/* Footer */}
        <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
      </div>
    );
  }

  export default LawyerPersonalProfile;
