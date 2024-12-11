import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem, Menu, CircularProgress, TextField, Rating } from '@mui/material';
import { FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import { FaClock, FaStar } from 'react-icons/fa';
import ClientAppointmentForm from './clientappointmentform';


function ClientLawyerPov() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [lawyerDetails, setLawyerDetails] = useState(null);
  const [userType, setUserType] = useState(null)
  const { lawyerId } = useParams();
  const [rating, setRating] = useState(0); // Store the selected rating
  const [reviewText, setReviewText] = useState(''); // Store the review text
  const [reviews, setReviews] = useState([]); // Store submitted 
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState('');
  
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [formOpen, setFormOpen] = useState(false); 

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

  useEffect(() => {
    const fetchClientDetails = async () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            setMessage('Username or password not found. Please log in again.');
            setSnackbarOpen(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/client/login', {
                loginField: username,
                password: password,
            });

            const { clientId } = response.data;
            setClientId(clientId);
        } catch (error) {
            setMessage('Failed to fetch client details. Please log in again.');
            setSnackbarOpen(true);
        }
    };

    fetchClientDetails();
}, []);

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

  const handleRatingClick = (rating) => {
    setRating(rating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  //REVIEW SUBMISSION
  const handleReviewSubmit = async () => {
    if (rating === 0 || !reviewText) {
      setMessage('Please provide a rating and review text.');
      setSnackbarOpen(true);
      return;
    }

    const username = localStorage.getItem('username');  // Get the logged-in username

    if (!username) {
      setMessage('Username not found. Please log in again.');
      setSnackbarOpen(true);
      return;
    }

    const reviewData = {
      comment: reviewText,  // Review text
      rating: rating,       // Rating
      reviewerName: username, // Add the username to the review
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/review/postReview?clientId=${clientId}&lawyerId=${lawyerId}`,  // Query params in URL
        reviewData, // Send review data in the request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Update reviews list after successful submission
      setReviews([...reviews, response.data]);  // Assuming the server returns the new review
      setMessage('Review submitted successfully!');
      setSnackbarOpen(true);
      setReviewText('');  // Clear review text after submission
      setRating(0);  // Reset rating after submission
    } catch (error) {
      setMessage('Error submitting review: ' + (error.response ? error.response.data.message : error.message));
      setSnackbarOpen(true);
    }
};

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

  console.log(reviews);

  return (
    <div style={styles.outerContainer}>
      {/* Header */}
      <Box style={{
        position: 'absolute',
        top: 0,
        width: '70%',
        height: '60px',
        backgroundColor: '#FFFFFF',
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
              <span style={styles.label}>Name:</span> <span style={styles.infoText}>{lawyerDetails.name}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Username:</span> <span style={styles.infoText}>{lawyerDetails.username}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Contact Number:</span> <span style={styles.infoText}>{lawyerDetails.contactNumber}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Address:</span> <span style={styles.infoText}>{lawyerDetails.officeAddress}, {lawyerDetails.zipcode}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Email:</span> <span style={styles.infoText}>{lawyerDetails.email}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Birthdate:</span> <span style={styles.infoText}>{lawyerDetails.birthdate}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Hourly Rate (PHP):</span> <span style={styles.infoText}>{lawyerDetails.hourlyRate}</span>
            </Typography>
            <Typography>
              <span style={styles.label}>Consultation Fee (PHP):</span> <span style={styles.infoText}>{lawyerDetails.consultationFee}</span>
            </Typography>
            <ClientAppointmentForm lawyerId={lawyerId} />
          </Box>
        </Box>

        {/* Client Reviews Section */}
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
            Submit a Review
          </Typography>

          {/* Review Form */}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {/* Rating */}
            <Box style={{ display: 'flex', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  color={star <= rating ? '#FFD700' : '#ccc'}
                  size={24}
                  onClick={() => handleRatingClick(star)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Box>

            {/* Review Text */}
            <TextField
              value={reviewText}
              onChange={handleReviewTextChange}
              label="Write your review"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#D9641E',
                color: '#fff',
              }}
            >
              Submit Review
            </Button>
          </Box>

          {/* Submitted Reviews */}
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              marginTop: '30px',
            }}
          >
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
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
                    {review.client.username}
                  </Typography>

                  {/* Comment */}
                  <Typography
                    style={{
                      fontSize: '14px',
                      color: '#757575',
                      marginBottom: '10px',
                    }}
                  >
                    "{review.comment}"
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
                    <Typography style={{ fontWeight: 'bold', color: '#333' }}>Rating:</Typography>
                    <Box style={{ display: 'flex', gap: '5px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          color={star <= review.rating ? '#FFD700' : '#ccc'}
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
              ))
            ) : (
              <Typography>No reviews yet. Be the first to submit a review!</Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box style={styles.footer}>© The Civilify Company, Cebu City</Box>
    </div>
  );
}

export default ClientLawyerPov;
