import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, Button, Paper, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function ClientAppointment() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]); // Store submitted appointments
  const [appointmentId, setAppointmentId] = useState(generateAppointmentId()); // Generate Appointment ID
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing an appointment
  const [currentAppointmentId, setCurrentAppointmentId] = useState(''); // Track the current appointment being edited

  // Function to generate a random 5-character Appointment ID
  function generateAppointmentId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const handleSignOut = () => {
    navigate('/client-login-page');
  };

  const handleAccountClick = () => {
    navigate('/client-account-page');
  };

  const handleLogoClick = () => {
    navigate('/client-home-page');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle adding or updating the appointment
    if (isEditing) {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === currentAppointmentId ? { ...appt, date, time } : appt
        )
      );
      setIsEditing(false); // Reset editing state
    } else {
      // Add new appointment
      const newAppointment = { id: appointmentId, date, time };
      setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    }

    // Reset fields after submission
    resetForm();
  };

  const resetForm = () => {
    setAppointmentId(generateAppointmentId()); // Generate a new ID for the next appointment
    setDate('');
    setTime('');
  };

  const handleEdit = (appointment) => {
    setIsEditing(true);
    setCurrentAppointmentId(appointment.id);
    setDate(appointment.date);
    setTime(appointment.time);
  };

  const handleDelete = (idToDelete) => {
    setAppointments((prevAppointments) => prevAppointments.filter((appt) => appt.id !== idToDelete));
  };

  return (
    <div>
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
        <Paper style={{ padding: '20px', maxWidth: '400px', width: '100%', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Schedule Appointment
          </Typography>

          {/* Conditionally render the Appointment ID field */}
          {!isEditing && (
            <TextField
              label="Appointment ID"
              variant="outlined"
              fullWidth
              margin="normal"
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
              disabled={isEditing} // Disable ID field during editing
            />
          )}

          <TextField
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            type="time"
            variant="outlined"
            fullWidth
            margin="normal"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </Paper>

        {/* Display Submitted Appointments */}
        <Grid container spacing={2}>
          {appointments.length === 0 ? (
            <Typography variant="h6" gutterBottom></Typography>
          ) : (
            appointments.map((appointment) => (
              <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                <Paper style={{ padding: '20px', margin: '10px' }}>
                  <Typography variant="h6">Appointment ID: {appointment.id}</Typography>
                  <Typography variant="body1">Date: {appointment.date}</Typography>
                  <Typography variant="body1">Time: {appointment.time}</Typography>
                  <Box marginTop={2}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(appointment)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(appointment.id)} style={{ marginLeft: '10px' }}>
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default ClientAppointment;
