import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function ClientReview() {
  const [reviewId] = useState(generateReviewId()); // Generate Review ID
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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
    setRating(index + 1);
  };

  const handleMouseLeave = () => {
    setRating(0); // Reset to the original rating if not clicked
  };

  const handleClick = (index) => {
    setRating(index + 1); // Set the rating permanently when clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API)
    console.log('Review ID:', reviewId);
    console.log('Rating:', rating);
    console.log('Comment:', comment);
    // Reset the fields after submission
    setComment('');
    setRating(0);
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>
        Submit Review
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Review ID: {reviewId}
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
        rows={4} // Allow multiple lines
      />

      <Box marginTop={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
}

export default ClientReview;
