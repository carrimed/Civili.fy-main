import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function ClientReview() {
  const [reviews, setReviews] = useState([]); // Store submitted reviews
  const [reviewId, setReviewId] = useState(generateReviewId()); // Generate Review ID
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing a review
  const [currentReviewId, setCurrentReviewId] = useState(''); // Track the current review being edited

  // Function to generate a random 5-character Review ID
  function generateReviewId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Handle star rating
  const handleMouseEnter = (index) => {
    setRating(index + 1); // Show hover rating
  };

  const handleMouseLeave = () => {
    // Do not reset the rating if it has been clicked
    setRating(rating);
  };

  const handleClick = (index) => {
    setRating(index + 1); // Set the rating permanently when clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle adding or updating the review
    if (isEditing) {
      setReviews((prevReviews) =>
        prevReviews.map((rev) => (rev.id === currentReviewId ? { ...rev, rating, comment } : rev))
      );
      setIsEditing(false); // Reset editing state
    } else {
      // Add new review
      const newReview = { id: reviewId, rating, comment };
      setReviews((prevReviews) => [...prevReviews, newReview]);
    }

    // Reset fields after submission
    resetForm();
  };

  const resetForm = () => {
    setComment('');
    setRating(0);
    setReviewId(generateReviewId()); // Generate a new ID for the next review
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setCurrentReviewId(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDelete = (idToDelete) => {
    setReviews((prevReviews) => prevReviews.filter((rev) => rev.id !== idToDelete));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column">
      <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Submit Review
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

        <Typography variant="subtitle1" gutterBottom>
          Review ID: {reviewId}
        </Typography>

        <TextField
          label="Comment"
          variant="outlined"
          fullWidth
          margin="normal"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4} // Allow multiple lines
        />

        <Box marginTop={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Paper>

      {/* Display Submitted Reviews */}
      <Grid container spacing={2}>
        {reviews.length === 0 ? (
          <Typography variant="h6" gutterBottom></Typography>
        ) : (
          reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Paper style={{ padding: '20px', margin: '10px' }}>
                <Typography variant="h6">Review ID: {review.id}</Typography>
                <Box display="flex" alignItems="center" marginY={1}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      style={{
                        color: index < review.rating ? 'orange' : 'gray',
                        fontSize: '30px',
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="body1">Comment: {review.comment}</Typography>
                <Box marginTop={2}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(review)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(review.id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default ClientReview;
