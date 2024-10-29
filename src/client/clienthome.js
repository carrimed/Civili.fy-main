import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, Button, Paper, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function ClientHome() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [cases, setCases] = useState([]);
  const username = localStorage.getItem('username');

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/client-login-page');
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCase = { id: Date.now(), description, status };
    setCases([...cases, newCase]);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setStatus('Pending');
    setShowForm(false);
  };

  const handleEdit = (caseDetail) => {
    setDescription(caseDetail.description);
    setStatus(caseDetail.status);
    setShowForm(true);
    setCaseId(caseDetail.id);
  };

  const handleDelete = (id) => {
    setCases(cases.filter(caseDetail => caseDetail.id !== id));
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography
            component="div"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => navigate('/')}
          >
            <img src="/images/civilifyicon.png" alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
          </Typography>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
            Hello, {username}
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="auto">
            <IconButton onClick={() => navigate('/client-account-page', { state: { username } })} style={{ color: 'black' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowForm}
          style={{ width: '200px', marginBottom: '20px' }}
        >
          Enter Case Details
        </Button>

        {showForm && (
          <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%', marginBottom: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Case Form
              </Typography>
              <TextField
                label="Case ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={caseId}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={resetForm}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        )}

        <Grid container spacing={2} justifyContent="center">
          {cases.length === 0 ? (
            <Typography variant="h6" gutterBottom>No cases submitted yet.</Typography>
          ) : (
            cases.map((caseDetail) => (
              <Grid item xs={12} sm={6} md={4} key={caseDetail.id}>
                <Paper style={{ padding: '20px', margin: '10px' }}>
                  <Typography variant="h6">Case ID: {caseDetail.id}</Typography>
                  <Typography variant="body1">Description: {caseDetail.description}</Typography>
                  <Typography variant="body1">Status: {caseDetail.status}</Typography>
                  <Box marginTop={2}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(caseDetail)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(caseDetail.id)} style={{ marginLeft: '10px' }}>
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </div>
  );
}

export default ClientHome;
