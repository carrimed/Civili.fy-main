import React, { useState } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

function LawyerSearch() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState('');
  const [lawyerType, setLawyerType] = useState('');
  const [rateRange, setRateRange] = useState([3000, 75000]);
  const [searchResults, setSearchResults] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSearchSubmit = () => {
    // Mock data for lawyers (you can replace this with an API call)
    const mockLawyers = [
      {
        name: 'Atty. John Doe',
        category: 'Corporate law',
        type: 'Private',
        rate: 5000,
        profilePicture: '/images/lawyer1.jpg',
      },
      {
        name: 'Atty. Jane Smith',
        category: 'Corporate law',
        type: 'Private',
        rate: 7000,
        profilePicture: '/images/lawyer2.jpg',
      },
      {
        name: 'Atty. Richard Roe',
        category: 'Corporate law',
        type: 'Private',
        rate: 6000,
        profilePicture: '/images/lawyer3.jpg',
      },
    ];

    // Filter mock data based on user input
    const filteredLawyers = mockLawyers.filter(
      (lawyer) =>
        lawyer.category === category &&
        lawyer.type === lawyerType &&
        lawyer.rate >= rateRange[0] &&
        lawyer.rate <= rateRange[1]
    );

    setSearchResults(filteredLawyers);
  };

  const categoryOptions = [
    'Environmental law',
    'Intellectual Property Law',
    'Family law',
    'International law',
    'Corporate law',
    'Health law',
    'Property law',
    'Tax law',
    'Constitutional law',
    'Immigration law',
    'Business law',
    'Administrative law',
    'Education law',
    'Animal law',
    'Bankruptcy',
    'Civil procedure',
    'Alternative dispute resolution',
    'Civil and political rights',
    'Media law',
    'Municipal law',
    'Criminal law',
    'Employment law',
    'Banking laws',
    'Criminal litigation',
    'Labor law',
    'Mergers and acquisitions',
    'Real estate law',
    'Litigation law',
    'Legal ethics',
    'Sports law',
    'Environmental justice',
    'Cybersecurity law',
    'Privacy law',
    'Regulatory law',
    'Maritime law',
    'Intellectual property litigation',
    'Patent law',
    'Trademark law',
    'Copyright law',
    'Trade secrets law',
    'Franchise law',
    'Investment law',
    'Financial services law',
    'Energy law',
    'Utilities law',
    'Competition law',
    'Consumer protection law',
    'Food and drug law',
    'Health insurance law',
    'Medical malpractice law',
    'Personal injury law',
    'Workers compensation law',
    'Bankruptcy law',
    'Estate planning law',
    'Trust and estates law',
    'Family business law',
    'Child custody law',
    'Divorce law',
    'Adoption law',
    'Guardianship law',
    'Elder law',
    'Wills and probate',
    'Civil rights law',
    'Homeland security law',
    'Disability law',
    'Public health law',
    'Indigenous law',
    'International trade law',
    'Arbitration law',
    'Securities law',
    'Financial crimes law',
    'Criminal defense law',
    'White collar crime law',
    'Defamation law',
    'Taxation law',
    'International human rights law',
    'Military law',
    'Health care fraud law',
    'Public policy law',
    'Pension law',
    'Insurance law',
    'Antitrust law',
    'Immigration and nationality law',
    'Patent litigation',
    'Trademark litigation',
    'Class action law',
    'Debt collection law',
    'Consumer finance law',
    'Antitrust litigation',
    'Environmental litigation',
    'Securities litigation',
    'Legal malpractice law',
    'Real estate litigation',
    'Construction law',
    'Insurance litigation',
    'Nonprofit law',
    'Corporate governance law',
    'Financial planning law',
    'Cross-border legal issues',
    'Bankruptcy litigation',
    'Civil liberties law',
    'Public international law',
    'Tax fraud law',
    'Alternative energy law',
    'Humanitarian law',
    'International investment law',
    'Space law',
    'Telecommunications law',
    'Transportation law',
    'Cyber law',
    'Internet law',
    'Data protection law',
    'Smart contracts law',
    'Legal technology law',
    'Artificial intelligence law',
    'Blockchain law',
    'Social justice law',
    'Non-compete agreements law',
    'Real property law',
    'Judicial review law',
    'Land use law',
    'Local government law',
    'Zoning law',
    'Public utility law',
    'Cultural property law',
    'International environmental law',
    'Climate change law',
    'Sustainable development law',
  ];

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#F7F7F7',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header Section */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          width: '70%',
          height: '60px',
          backgroundColor: 'white',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <img
          src="/images/logoiconblack.png"
          alt="Logo"
          style={{ width: '40px', height: '40px', marginLeft: '30px' }}
        />
        <Box style={{ display: 'flex', marginRight: '30px' }}>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
            }}
          >
            Support
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
            }}
          >
            Requests
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: '#212121',
              fontFamily: 'Faculty Glyphic',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              marginLeft: '50px',
              padding: '5px 15px',
              border: '1px solid #8E8E8E',
              borderRadius: '8px',
            }}
            onClick={handleProfileClick}
          >
            Profile
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Typography
        variant="h4"
        style={{
          marginTop: '100px',
          fontFamily: 'Faculty Glyphic',
          color: '#212121',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        Find Your Ideal Lawyer
      </Typography>

      {/* Search Form */}
      <Box display="flex" justifyContent="center" alignItems="center" gap="20px" marginTop="20px" width="80%">
        <Autocomplete
          options={categoryOptions}
          value={category}
          onChange={(event, newValue) => setCategory(newValue)}
          renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
          style={{ width: '30%' }}
        />

        <FormControl style={{ width: '20%' }}>
          <InputLabel>Lawyer Type</InputLabel>
          <Select value={lawyerType} onChange={(e) => setLawyerType(e.target.value)}>
            {['Private', 'Exclusive'].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box style={{ width: '40%' }}>
          <Typography color="black">Rate per Hour: {rateRange[0]} - {rateRange[1]} PHP</Typography>
          <Slider
            value={rateRange}
            onChange={(e, newValue) => setRateRange(newValue)}
            valueLabelDisplay="auto"
            min={3000}
            max={100000}
            step={1000}
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: '#D9641E' },
              '& .MuiSlider-rail': { backgroundColor: '#D9641E' },
              '& .MuiSlider-track': { backgroundColor: '#D9641E' },
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleSearchSubmit}
        style={{
          backgroundColor: '#D9641E',
          color: 'white',
          marginTop: '30px',
        }}
      >
        SUBMIT
      </Button>

      {/* Search Results */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        gap="20px"
        flexWrap="wrap"
        marginTop="40px"
        width="80%"
      >
        {searchResults.length > 0 ? (
          searchResults.map((lawyer, index) => (
            <Box
              key={index}
              style={{
                width: '250px',
                backgroundColor: '#FFF',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <img
                src={lawyer.profilePicture}
                alt={lawyer.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                {lawyer.name}
              </Typography>
              <Typography>{lawyer.category}</Typography>
              <Typography>{lawyer.type}</Typography>
              <Typography>{lawyer.rate} PHP/hour</Typography>
            </Box>
          ))
        ) : (
          <Typography>No results found. Try adjusting your search criteria.</Typography>
        )}
      </Box>
    </div>
  );
}

export default LawyerSearch;
