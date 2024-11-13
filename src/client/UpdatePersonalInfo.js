import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdatePersonalInfo() {
  const [personalInfo, setPersonalInfo] = useState({
    username: '@keithruezyl',
    email: 'keith@example.com',
    contact: '+123 456 7890',
    birthday: 'January 1, 1990',
    sex: 'Male',
    address: 'Taga Mingla, Cebu City'
  });

  const navigate = useNavigate();  // Initialize the navigation hook

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle form submission (you can add logic to update the data in the backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Info:', personalInfo);

    // Navigate to the profile page after submitting the form
    navigate('/civilify/profile-page');
  };

  const styles = {
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      padding: '20px',
      width: '1000px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      color: '#41423A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#41423A',
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box',
    },
    label: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#D9641E',
    },
    input: {
      padding: '8px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginBottom: '12px',
      width: '100%',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#D9641E',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#ED7D27',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Update Personal Information</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={styles.infoContainer}>
          <div>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={personalInfo.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Contact:</label>
            <input
              type="text"
              name="contact"
              value={personalInfo.contact}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Birthday:</label>
            <input
              type="text"
              name="birthday"
              value={personalInfo.birthday}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Sex:</label>
            <input
              type="text"
              name="sex"
              value={personalInfo.sex}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Address:</label>
            <input
              type="text"
              name="address"
              value={personalInfo.address}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        </div>

        <button type="submit" style={styles.submitButton}>Update</button>
      </form>
    </div>
  );
}

export default UpdatePersonalInfo;
