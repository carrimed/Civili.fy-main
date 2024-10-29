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

  const handleSignOut = () => {
    navigate('/client-login-page');
  };

  const handleAccountClick = () => {
    navigate('/client-account-page');
  };

  const handleLogoClick = () => {
    navigate('/client-home-page');
  };

  const exitEditingMode = () => {
    setIsEditing(false);
    resetForm();
  };

  // Function to render star rating
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
    <div style={{ backgroundColor: '#292929', minHeight: '100vh', color: 'white' }}>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography
            component="div"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={handleLogoClick}
          >
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton onClick={handleAccountClick} style={{ color: 'black' }}>
              <AccountCircleIcon />
            </IconButton>
            <Typography
              variant="body1"
              style={{ cursor: 'pointer', marginLeft: '15px' }}
              onClick={handleSignOut}
              onMouseEnter={(e) => (e.target.style.color = 'orange')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
              Sign out
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

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
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
                style={{
                  cursor: 'pointer',
                  color: index < rating ? 'orange' : 'gray',
                  fontSize: '40px',
                }}
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

          <Box marginTop={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </Paper>

        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start" width="100%" p={2}>
          <Typography variant="h6" gutterBottom style={{ width: '100%', textAlign: 'center' }}>
            Submitted Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography variant="h6" gutterBottom>No reviews available.</Typography>
          ) : (
            reviews.map((review) => (
              <Box key={review.reviewId} display="flex" flexDirection="column" alignItems="center" m={1}>
                <Paper style={{ padding: '20px', width: '200px' }}>
                  <Typography variant="subtitle1">Review ID: #{review.reviewId}</Typography>
                  <Typography variant="subtitle1">Client ID: {review.clientId}</Typography>
                  <Typography variant="subtitle1">Lawyer ID: {review.lawyerId}</Typography>
                  <Typography variant="subtitle1">Rating: {review.lawyerId}</Typography>
                  {renderStars(review.rating)}
                  <Typography variant="subtitle1">Comment: {review.lawyerId}</Typography>
                  <Typography variant="body1">{review.comment}</Typography>
                  <Box display="flex" justifyContent="space-between" marginTop={1}>
                    <Button onClick={() => handleEdit(review)} color="primary">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(review.reviewId)} color="secondary">
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Box>
            ))
          )}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </div>
  );
}

export default ClientReview;
