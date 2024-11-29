import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientReview() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/review/findAll');
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

    const reviewData = { rating, comment };

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
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setCurrentReviewId(review.reviewId);
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

  const exitEditingMode = () => {
    setIsEditing(false);
    resetForm();
  };

  const renderStars = (rating) => {
    return (
      <Box display="flex" marginTop={1} marginBottom={2}>
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
    );
  };

  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#F7F7F7',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Outfit, sans-serif' // Applying Outfit globally
    }}>
      {/* Review Form */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column">
        <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" gutterBottom align="center" style={{ fontWeight: 700, fontFamily: 'Outfit' }}>
              {isEditing ? `Edit Review ID: #${currentReviewId}` : 'Submitting a review for: James Bond'}
            </Typography>
            {isEditing && (
              <IconButton onClick={exitEditingMode} style={{ color: 'black' }}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          {/* Rating Label and Stars */}
          <Typography variant="subtitle1" gutterBottom style={{ marginBottom: '4px', fontWeight: 400, fontFamily: 'Outfit' }}>
            Rating
          </Typography>
          {renderStars(rating)}

          {/* Comment Label and TextField */}
          <Typography variant="subtitle1" gutterBottom style={{ marginBottom: '4px', fontWeight: 400, fontFamily: 'Outfit' }}>
            Comment
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Write your comment here"
            style={{ marginBottom: '15px', fontFamily: 'Outfit' }}
          />

          {/* Submit and Discard Buttons */}
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="error" // Red button
              onClick={resetForm}
              fullWidth
              style={{
                padding: '10px',
                marginTop: '15px',
                backgroundColor: 'red',
                color: 'white',
                marginRight: '8px',
                fontFamily: 'Outfit'
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              color="success" // Green button
              onClick={handleSubmit}
              fullWidth
              style={{
                padding: '10px',
                marginTop: '15px',
                backgroundColor: 'green',
                color: 'white',
                fontFamily: 'Outfit'
              }}
            >
              {isEditing ? 'Update Review' : 'Submit Review'}
            </Button>
          </Box>
        </Paper>

        {/* Review List */}
        <Box>
          {reviews.map((review) => (
            <Paper key={review.reviewId} style={{ padding: '20px', marginBottom: '10px' }}>
              <Typography variant="body1" style={{ fontWeight: 400 }}>
                Client ID: {review.clientId} | Lawyer ID: {review.lawyerId}
              </Typography>
              {renderStars(review.rating)}
              <Typography variant="body2" style={{ marginTop: '10px', fontWeight: 400 }}>
                {review.comment}
              </Typography>
              <Box display="flex" justifyContent="flex-end" style={{ marginTop: '10px' }}>
                <Button onClick={() => handleEdit(review)} color="primary">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(review.reviewId)} color="secondary" style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
}

export default ClientReview;
