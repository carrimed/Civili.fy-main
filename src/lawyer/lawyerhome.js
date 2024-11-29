import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Snackbar,
  Menu,
  MenuItem,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientReview() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [clientId, setClientId] = useState('');
  const [lawyerId, setLawyerId] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // For profile menu

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/review/findAll`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    setAnchorEl(null);
    alert('Logged out');
  };

  const handleMouseEnter = (index) => {
    setRating(index + 1);
  };

  const handleMouseLeave = () => {
    setRating(rating);
  };

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { clientId, lawyerId, rating, comment };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/review/putReviewDetails/${currentReviewId}`, reviewData);
        setReviews((prevReviews) =>
          prevReviews.map((rev) => (rev.reviewId === currentReviewId ? { ...rev, ...reviewData } : rev))
        );
        setIsEditing(false);
      } else {
        const response = await axios.post('http://localhost:8080/api/review/postReview', reviewData);
        const newReview = { ...reviewData, reviewId: response.data.reviewId };
        setReviews((prevReviews) => [...prevReviews, newReview]);
      }

      resetForm();
      setSnackbarMessage(isEditing ? 'Review updated successfully!' : 'Review submitted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSnackbarMessage('Error submitting review!');
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setComment('');
    setRating(0);
    setClientId('');
    setLawyerId('');
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setCurrentReviewId(review.reviewId);
    setClientId(review.clientId);
    setLawyerId(review.lawyerId);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = async (idToDelete) => {
    try {
      await axios.delete(`http://localhost:8080/api/review/deleteReview/${idToDelete}`);
      setReviews((prevReviews) => prevReviews.filter((rev) => rev.reviewId !== idToDelete));
      setSnackbarMessage('Review deleted successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting review:', error);
      setSnackbarMessage('Error deleting review!');
      setSnackbarOpen(true);
    }
  };

  const handleLogoClick = () => {
    navigate('/client-home-page');
  };

  const exitEditingMode = () => {
    setIsEditing(false);
    resetForm();
  };

  const renderStars = (rating) => {
    return (
      <Box display="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon
            key={index}
            style={{
              color: index < rating ? 'orange' : 'gray',
              fontSize: '20px',
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <div style={{ backgroundColor: '#D9641E', minHeight: '100vh', color: 'white' }}>
      {/* Header Section (Notch) */}
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
          style={{ width: '40px', height: '40px', cursor: 'pointer' }}
          onClick={handleLogoClick}
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
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
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
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Main Content */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column">
        <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%', marginBottom: '20px', marginTop: '40px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom align="center">
              {isEditing ? `Edit Review ID: #${currentReviewId}` : 'Submit Review'}
            </Typography>
            {isEditing && (
              <IconButton onClick={exitEditingMode} style={{ color: 'black' }}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          <TextField
            label="Client ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            type="number"
          />

          <TextField
            label="Lawyer ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lawyerId}
            onChange={(e) => setLawyerId(e.target.value)}
            type="number"
          />

          <Typography variant="subtitle1" gutterBottom>
            Rating
          </Typography>

          <Box display="flex" alignItems="center" marginY={2}>
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                key={index}
                style={{
                  color: index < rating ? 'orange' : 'gray',
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </Box>

          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px', backgroundColor: '#FF5733' }}
          >
            {isEditing ? 'Update Review' : 'Submit Review'}
          </Button>
        </Paper>

        <Box display="flex" flexDirection="column" alignItems="center" width="80%">
          {reviews.map((review) => (
            <Paper key={review.reviewId} style={{ padding: '20px', marginBottom: '10px', width: '100%' }}>
              <Typography variant="body1" gutterBottom>
                Client ID: {review.clientId} | Lawyer ID: {review.lawyerId}
              </Typography>
              {renderStars(review.rating)}
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                {review.comment}
              </Typography>
              <Box display="flex" justifyContent="flex-end" marginTop="10px">
                <Button
                  onClick={() => handleEdit(review)}
                  variant="outlined"
                  size="small"
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(review.reviewId)}
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

export default ClientReview;
