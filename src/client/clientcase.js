import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

function ClientCase({ caseDetail, onUpdate, onDelete }) {
  const [caseData, setCaseData] = useState(caseDetail);
  const [isEditing, setIsEditing] = useState(false);
  const [setSubmitted] = useState(false);

  useEffect(() => {
    setCaseData(caseDetail);
  }, [caseDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(caseData); 
    setSubmitted(true);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(caseData.id); // Call the delete function passed from the parent
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <Typography variant="h6" gutterBottom>
        Case Details
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Case ID: {caseData.id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={caseData.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          disabled={!isEditing}
        />
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
          name="status"
          value={caseData.status}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <TextField
          label="Lawyer ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lawyerId"
          value={caseData.lawyerId}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <Box marginTop={2}>
          {isEditing ? (
            <>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </form>
    </Paper>
  );
}

export default ClientCase;
