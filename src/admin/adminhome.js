import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled components
const ToggleContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
}));

const ToggleItem = styled(Typography)(({ isActive }) => ({
  cursor: 'pointer',
  marginRight: '20px',
  paddingBottom: '5px',
  borderBottom: isActive ? '2px solid #333333' : 'none',
  color: isActive ? '#333333' : '#888888',
}));

function AdminHome() {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState('lawyers');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // ID of the selected item for deletion
  const [openDialog, setOpenDialog] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate('/civilify/landing-page');
  };

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint =
        activeView === 'lawyers'
          ? 'http://localhost:8080/api/lawyer/getAllLawyers'
          : 'http://localhost:8080/api/client/getAllClients';
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Error fetching ${activeView}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Fetch error:', error);
      setSnackbarMessage(`Failed to fetch ${activeView}. Please try again.`);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete request
  const handleDelete = async () => {
    console.log('Attempting to delete item with ID:', selectedId); // Log selectedId

    if (!selectedId) {
      setSnackbarMessage('No item selected for deletion.');
      setOpenSnackbar(true);
      return;
    }

    const endpoint =
      activeView === 'lawyers'
        ? `http://localhost:8080/api/lawyer/deleteById/${selectedId}`
        : `http://localhost:8080/api/client/deleteById/${selectedId}`;

    console.log('Calling delete API with endpoint:', endpoint); // Log API endpoint

    try {
      const response = await fetch(endpoint, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Error deleting item: ${response.statusText}`);
      }
      console.log('Delete successful'); // Log success
      setSnackbarMessage(`Successfully deleted ${activeView.slice(0, -1)}.`);
      setOpenSnackbar(true);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Delete error:', error); // Log error
      setSnackbarMessage(`Failed to delete ${activeView.slice(0, -1)}. Please try again.`);
      setOpenSnackbar(true);
    } finally {
      setOpenDialog(false); // Close the dialog after attempting delete
    }
  };

  // Filtered data based on the search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch data when the component mounts or activeView changes
  useEffect(() => {
    console.log('Fetching data for:', activeView); // Log active view when data is fetched
    fetchData();
  }, [activeView]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#F5F5F5',
        padding: '20px',
      }}
    >
      {/* Top Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <img
          src="/images/logotextblack.png"
          alt="Logo"
          style={{ width: '150px', marginTop: '7px', marginBottom: '10px' }}
        />
        <Typography
          variant="body1"
          sx={{ cursor: 'pointer' }}
          onClick={handleLogout}
        >
          Logout
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px', marginRight: '10px' }}
        />
      </Box>

      {/* Lawyers/Clients Toggle */}
      <ToggleContainer>
        <ToggleItem
          isActive={activeView === 'lawyers'}
          onClick={() => setActiveView('lawyers')}
        >
          Lawyers
        </ToggleItem>
        <ToggleItem
          isActive={activeView === 'clients'}
          onClick={() => setActiveView('clients')}
        >
          Clients
        </ToggleItem>
      </ToggleContainer>

      {/* Data List */}
      <Box flex={1} overflow="auto">
        {loading ? (
          <CircularProgress />
        ) : filteredData.length > 0 ? (
          <List>
  {filteredData.map((item) => {
    // Dynamically choose the correct ID based on activeView
    const idKey = activeView === 'lawyers' ? 'lawyerId' : 'clientId'; // lawyerId for lawyers, clientId for clients
    const itemId = item[idKey]; // Get the correct ID for the item

    console.log('Item:', item);  // Log the item to ensure you're getting the right data

    return (
      <ListItem
        key={itemId} // Use the dynamic ID as the unique key for each ListItem
        secondaryAction={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              console.log('Selected Item ID:', itemId); // Log the selected ID for debugging
              setSelectedId(itemId); // Set the selected item's ID for deletion
              setOpenDialog(true); // Open the confirmation dialog
            }}
          >
            Delete
          </Button>
        }
      >
        <ListItemText
          primary={item.name}
          secondary={`Email: ${item.email} | ${activeView === 'lawyers' ? `Lawyer ID: ${item.lawyerId}` : `Client ID: ${item.clientId}`}`} 
          // Show either Lawyer ID or Client ID based on activeView
        />
      </ListItem>
    );
  })}
</List>
        ) : (
          <Typography variant="body2">No {activeView} found.</Typography>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
          setSnackbarMessage('');
        }}
        message={snackbarMessage}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to delete this {activeView.slice(0, -1)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminHome;
