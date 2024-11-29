import React, { useState } from 'react';
import { Box, Typography, Menu, MenuItem, Divider, Card, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClientUpdateProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [formData, setFormData] = useState({
    name: 'Keith Ruezyl Tagarao',
    bio: 'bio bio bio bio bio',
    username: '@skrptt',
    email: 'keithtagarao@gmail.com',
    phone: '123-456-7890 | +63 999-760-1161',
    birthdate: '1999-12-31',
    civilstatus: 'single',
    job: 'Software Engineer',
    address: 'Metro Manila',
    zipcode: '6064'
  });

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setTimeout(() => {
      navigate('/civilify/login-page');
    }, 2000);
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Profile saved:', formData);
  };

  const handleDiscard = () => {
    // Reset form data to initial values (could also be done with useEffect)
    setFormData({
      username: '@skrptt',
      email: 'keithtagarao@gmail.com',
      phone: '123-456-7890 | +63 999-760-1161',
      birthdate: '1999-12-31',
      civilstatus: 'single',
      job: 'Software Engineer',
      address: 'Metro Manila',
      zipcode: '6064'
    });
  };

  const styles = {
    header: {
      position: 'absolute',
      top: 0,
      width: '70%',
      height: '70px',
      backgroundColor: '#f9f9f9',
      borderBottomLeftRadius: '30px',
      borderBottomRightRadius: '30px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    footer: {
      backgroundColor: '#41423A',
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
    profileHeaderText: {
      position: 'absolute',
      textAlign: 'right',
      top: '95px',
      right: '200px',
      fontFamily: 'Outfit',
      fontWeight: 'normal',
      fontSize: '22px',
      color: '#40170A',
      zIndex: 1, // Ensure the profile text stays on top
    },
    line: {
      marginTop: '0px',
      width: '1085px',  // Adjust width as needed
      height: '1px',
      backgroundColor: '#1F0C06',
      opacity: '20%',
      position: 'absolute',  // Absolute positioning for the right alignment
      top: '680px',  // Position the line below the text
      right: '200px',  // Align the line 40px from the right edge
      zIndex: 0,  // Ensure the line is behind other content
    },
    lineprofile: {
      marginTop: '0px',
      width: '1085px',  // Adjust width as needed
      height: '1px',
      backgroundColor: '#1F0C06',
      opacity: '20%',
      position: 'absolute',  // Absolute positioning for the right alignment
      top: '130px',  // Position the line below the text
      right: '200px',  // Align the line 40px from the right edge
      zIndex: 0,  // Ensure the line is behind other content
    },
    card: {
      width: '50%',
      margin: '100px auto', // Use 'auto' for horizontal centering
      backgroundColor: '#fff',
      borderRadius: '10px', // Increased border radius
      overflow: 'hidden',
      padding: '20px',
      position: 'relative',
      outline: '1px solid #CFCFCF',
    },
    profilePicture: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      marginRight: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    profileDetails: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  };

  return (
    <div>
      {/* Header Section */}
      <Box style={styles.header}>
        <img
          src="/images/logoiconblack.png"
          alt="Logo"
          style={{ width: '50px', height: '50px' }}
        />
        <Box style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {['Support', 'Requests', 'Profile'].map((item) => (
            <Typography
              key={item}
              variant="body2"
              style={{
                color: '#632F0F',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 15px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#fff',
                fontWeight: '500',
              }}
              onClick={item === 'Profile' ? handleProfileClick : undefined}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Line */}
      <div style={styles.line}></div>

      {/* Profile Card */}
      <Card style={styles.card}>
  <Box
    style={{
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '20px 20px 0 0',
    }}
  >
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/images/pfp1.jpg"
        alt="Profile"
        style={styles.profilePicture}
      />
      <Box>
        <TextField
          label="Name"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '10px' }}
          placeholder="Keith Ruezyl Tagarao"  // Placeholder for the name
        />
        <TextField
          label="Bio"
          variant="outlined"
          name="bio"
          value={formData.bio || ''} // Add a bio property in formData state if needed
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
          placeholder="I live so high I'm way up in the sky"  // Placeholder for the bio
        />
      </Box>
    </Box>
  </Box>

  <Divider style={{ margin: '20px 0' }} />
  <Box
    style={{
      marginTop: '20px',
      display: 'grid',
      gap: '10px',
      gridTemplateColumns: '1fr',
    }}
  >
    <TextField
      label="Username"
      variant="outlined"
      name="username"
      value={formData.username}
      onChange={handleChange}
      fullWidth
    />
    <TextField
      label="Email"
      variant="outlined"
      name="email"
      value={formData.email}
      onChange={handleChange}
      fullWidth
    />
    <TextField
      label="Phone"
      variant="outlined"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      fullWidth
    />
    <TextField
      label="Date of Birth"
      variant="outlined"
      name="birthdate"
      value={formData.birthdate}
      onChange={handleChange}
      fullWidth
    />
    
    <TextField
      label="Civil Status"
      variant="outlined"
      name="civilstatus"
      value={formData.civilstatus}
      onChange={handleChange}
      select
      fullWidth
    >
      {/* Placeholder Option */}
      <MenuItem value="" disabled>
        {formData.civilstatus ? formData.civilstatus : "Select Civil Status"}
      </MenuItem>

      {/* Civil Status Options */}
      <MenuItem value="single">Single</MenuItem>
      <MenuItem value="married">Married</MenuItem>
      <MenuItem value="divorced">Divorced</MenuItem>
      <MenuItem value="widowed">Widowed</MenuItem>
    </TextField>

    <TextField
      label="Job"
      variant="outlined"
      name="job"
      value={formData.job}
      onChange={handleChange}
      fullWidth
    />

    {/* Address - Ensure proper multiline text input */}
    <TextField
      label="Address"
      variant="outlined"
      name="address"
      value={formData.address}
      onChange={handleChange}
      multiline
      rows={1}  // Set the number of lines for multiline text
      fullWidth
    />

    <TextField
      label="Zipcode"
      variant="outlined"
      name="zipcode"
      value={formData.zipcode}
      onChange={handleChange}
      fullWidth
    />
  </Box>

  {/* Action Buttons */}
  <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
    <Button
      variant="outlined" // Use outlined variant for hollow effect
      onClick={handleDiscard}
      style={{
        marginLeft: '5px',
        border: '1px solid #D32F2F', // Red border
        color: '#D32F2F', // Red text color
        backgroundColor: 'transparent', // Transparent background
        padding: '8px 20px',
      }}
    >
      DISCARD
    </Button>

    <Button
      variant="contained"
      onClick={handleSave}
      style={{
        backgroundColor: '#388E3C',
        color: 'white',
        padding: '8px 20px',
      }}
    >
      SAVE
    </Button>
  </Box>
</Card>


      {/* Footer Section */}
      <Box style={styles.footer}>
        <span>© The Civilify Company, 2024 | All Rights Reserved</span>
      </Box>
    </div>
  );
}

export default ClientUpdateProfile;
