import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  SnackbarContent, 
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const specializationOptions = [
  "Environmental law", "Intellectual Property Law", "Family law", "International law", "Corporate law", "Health law",
  "Property law", "Tax law", "Constitutional law", "Immigration law", "Business law", "Administrative law", "Education law",
  "Animal law", "Bankruptcy", "Civil procedure", "Alternative dispute resolution", "Civil and political rights", "Media law",
  "Municipal law", "Criminal law", "Employment law", "Banking laws", "Criminal litigation",
];

function LawyerSignupForm() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Snackbar states
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const handleBirthdateChange = (e) => {
    const value = e.target.value;
    setBirthdate(value);
  };

  const handleRegisterClick = async () => {
    // Log form data to check if all values are being updated
    console.log({
        name,
        username,
        email,
        specialization,
        contactNumber,
        officeAddress,
        birthdate,
        yearsOfExperience,
        zipcode,
        consultationFee,
        hourlyRate,
        password,
        profilePicture,
        agreeToTerms,
    });

    // Check if any required field is empty
    if (
      !name ||
      !username ||
      !email ||
      !specialization ||
      !contactNumber ||
      !officeAddress ||
      !birthdate ||
      !yearsOfExperience ||
      !zipcode ||
      !password ||
      !consultationFee ||
      !hourlyRate ||
      !profilePicture ||
      !agreeToTerms
    ) {
      setSnackbarMessage("Please fill in all required fields.");
      setIsSuccess(false);
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    try {
      let profilePicturePath = null;
      let lawyerId = null;  // Declare lawyerId here

      // Prepare the payload for lawyer creation
      const payload = {
        name,
        username,
        email,
        specialization,
        contactNumber,
        officeAddress,
        birthdate,
        yearsOfExperience,
        zipcode,
        consultationFee,
        hourlyRate,
        password,
        agreeToTerms,
      };

      // Create the lawyer and get lawyerId from the response
      const response = await axios.post("http://localhost:8080/api/lawyer/create", payload);
      const { lawyerId: responseLawyerId, message } = response.data;
      lawyerId = responseLawyerId;  // Assign the lawyerId from the response
      console.log(message);  // Log the success message

      // Now, proceed with uploading the profile picture if provided
      if (profilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture); // 'profilePicture' is the selected image file
        formData.append('lawyerId', lawyerId);  // Now lawyerId is properly initialized

        // Perform the file upload via fetch
        await fetch('http://localhost:8080/api/lawyer/uploadProfilePicture', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        // Assuming server returns the path or success message, capture it here
        profilePicturePath = "path_or_data_returned_from_server"; // Adjust based on your response
      }

      // Update the payload with the profile picture path
      const updatedPayload = {
        ...payload,
        profilePicture: profilePicturePath, // Include the profile picture path if uploaded
      };

      // Optionally send the updated payload to update the lawyer (if needed)
      // const updateResponse = await axios.post("http://localhost:8080/api/lawyer/update", updatedPayload);

      localStorage.setItem("lawyerId", lawyerId); // Or store in a session if using session management

      setSnackbarMessage("Successfully registered!");
      setIsSuccess(true);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      setSnackbarMessage(
        "Registration failed: " + (error.response?.data?.message || "Please try again.")
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      navigate("/civilify/login-page");
      setSnackbarMessage("Redirecting to login page...");
      setIsSuccess(true);
      setOpenSnackbar(true);
      setLoading(false);
    }, 1000);
  };


  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",  
        overflow: "hidden", 
      }}
    >
      <Box sx={{ maxWidth: "600px", width: "100%", padding: "20px" }}>
        {/* Back Arrow */}
        <IconButton
          onClick={() => navigate("/civilify/landing-page")} 
          sx={{
            position: "absolute",
            left: "330px", 
            color: "black",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
          <img src="/images/logotextblack.png" alt="Logo" style={{ width: "150px" }} />
        </Box>

        {/* Form Title */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Faculty Graphic",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Lawyer Signup
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
            />
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
            />
            <TextField
              label="Years of Experience"
              type="number"
              fullWidth
              margin="normal"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              size="small"
            />
            <TextField
              label="Specialization"
              select
              fullWidth
              margin="normal"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              size="small"
            >
              {specializationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Birthdate"
              type="date"
              fullWidth
              margin="normal"
              value={birthdate}
              onChange={handleBirthdateChange}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              fullWidth
              margin="normal"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              size="small"
            />
            <TextField
              label="Office Address"
              fullWidth
              margin="normal"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              size="small"
            />
            <TextField
              label="Zipcode"
              fullWidth
              margin="normal"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              size="small"
            />
            <TextField
              label="Consultation Fee (PHP)"
              fullWidth
              margin="normal"
              type="number"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              size="small"
            />
            <TextField
              label="Hourly Rate (PHP)"
              fullWidth
              margin="normal"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              size="small"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="small"
            />
          </Grid>

          {/* Profile Picture Upload */}
          <Grid item xs={12}>
          <TextField
                  label=""
                  type="file"
                  inputProps={{
                    accept: "image/*",
                  }}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
          </Grid>

          {/* Terms and Register Button */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: agreeToTerms ? "#D9641E" : "gray",
                color: "white",
                marginTop: "20px",
                pointerEvents: agreeToTerms ? "auto" : "none",
              }}
              onClick={handleRegisterClick}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <SnackbarContent
            sx={{
              backgroundColor: isSuccess ? "#4caf50" : "#f44336",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                {isSuccess ? (
                  <CheckCircleIcon style={{ marginRight: "8px" }} />
                ) : (
                  <ErrorIcon style={{ marginRight: "8px" }} />
                )}
                {snackbarMessage}
              </span>
            }
          />
        </Snackbar>
      </Box>
    </Box>
  );
}


export default LawyerSignupForm;
