import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

function ClientCase({ caseId }) {
  const [caseDetails, setCaseDetails] = useState({
    id: caseId,
    description: '',
    status: 'Pending', // Default status
    lawyerId: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Mock function to simulate fetching case details from an API
  const fetchCaseDetails = (id) => {
    // Simulating fetching data based on the case ID
    // Replace with actual API call as needed
    return {
      id,
      description: 'Sample case description.',
      status: 'Pending',
      lawyerId: 'LAW123'
    };
  };

  useEffect(() => {
    if (caseId) {
      const details = fetchCaseDetails(caseId);
      setCaseDetails(details);
    }
  }, [caseId]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit updated case details
    console.log('Updated Case Details:', caseDetails);
    setIsEditing(false); // Optionally close editing mode
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>
        Case Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Case Form ID: {caseDetails.id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={caseDetails.description}
          onChange={handleChange}
          required
          multiline // Allow for multiline input
          rows={4} // Minimum rows for the description field
          disabled={!isEditing}
        />
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
          name="status"
          value={caseDetails.status}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Lawyer ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lawyerId"
          value={caseDetails.lawyerId}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Box marginTop={2}>
          <Button variant="contained" color="primary" type="submit" disabled={!isEditing}>
            Save Changes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEditToggle}
            style={{ marginLeft: '10px' }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default ClientCase;
