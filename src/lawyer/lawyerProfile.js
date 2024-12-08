import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LawyerProfile = () => {
  const { lawyerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lawyerDetails, setLawyerDetails] = useState(null);

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/api/lawyer/findById/${lawyerId}`);
        setLawyerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch lawyer details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLawyerDetails();
  }, [lawyerId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!lawyerDetails) return <Typography>No lawyer details available.</Typography>;

  return (
    <Box>
      <Typography variant="h4">{lawyerDetails.name}</Typography>
      <Typography variant="body1">{lawyerDetails.specialization}</Typography>
      <Typography variant="body1">Hourly Rate: {lawyerDetails.hourlyRate} PHP</Typography>
      <Typography variant="body1">Office Address: {lawyerDetails.officeAddress}, {lawyerDetails.zipcode}</Typography>
      <img src={`data:image/jpeg;base64,${lawyerDetails.profilePicture}`} alt="Profile" />
    </Box>
  );
};

export default LawyerProfile;