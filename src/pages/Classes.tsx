import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ArtistProfile from './ArtistProfile';  // Assuming this is defined
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  palette: {
    primary: { main: '#D8BFD8' },
    secondary: { main: '#FFFFFF' },
    background: { default: '#F5F5F5' },
    grey: { 300: '#F0F0F0' },
  },
  typography: { fontFamily: 'Arial, sans-serif' },
});

interface ClassData {
  id: string;
  className: string;
  description: string;
  schedule: string;
  maxCapacity: number;
  bookedSlots: number;
  imageUrl: string; 
  price: number;
  artistProfile: ArtistProfile;
}



const getClassImage = (className: string) => {
  if (className.toLowerCase().includes("oil painting")) {
    return "/images/oil_painting.jpg";
  } else if (className.toLowerCase().includes("watercolor")) {
    return "/images/watercolor.jpg";
  } else if (className.toLowerCase().includes("sketch")) {
    return "/images/sketches.jpg";
  }
  return "/images/default.jpg";
};

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken');

  const getRoleFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  // Decode JWT token payload
      return payload.role;
    } catch (error) {
      console.error("Error parsing token", error);
      return null;
    }
  };

  const role = getRoleFromToken();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/classes`);
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    navigate('/login');
    handleMenuClose();
  };

  const handleChangePasswordClick = () => {
    navigate('/reset-password');
    handleMenuClose();
  };

  const goToProfileUpdate = () => {
    navigate('/artist/profile/update');  // Navigate to Profile Update page
    handleMenuClose();
  };

  const handleBookNowClick = (classData: ClassData) => {
    setSelectedClass(classData);
    setDialogOpen(true);
    setErrorMessage('');
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setErrorMessage("Please log in to make a booking.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/bookings/create`,
        new URLSearchParams({
          classId: selectedClass?.id || '',
        }),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      alert("Booking successful!");
      setDialogOpen(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking class:", error);
      setErrorMessage("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return <Typography>Loading classes...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: 3,
          borderRadius: '8px',
          border: '1px solid white',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '50px auto',
          position: 'relative', 
        }}
      >
        <Box sx={{ position: 'absolute', top: '16px', right: '16px' }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleChangePasswordClick}>
            <VpnKeyIcon fontSize="small" sx={{ mr: 1 }} />
            Change Password
          </MenuItem>

           {/* Conditionally render Update Profile for artists */}
           {role === 'ARTIST' && (
            <MenuItem onClick={goToProfileUpdate}>
              <VpnKeyIcon fontSize="small" sx={{ mr: 1 }} />
              Update Profile
            </MenuItem>
          )}

          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>

        <Typography variant="h5" gutterBottom align="center">
          Available Classes
        </Typography>
        
        {classes.length > 0 ? (
        <Grid container spacing={3}>
        {classes.map((classData) => {
          const availableSpots = classData.maxCapacity - classData.bookedSlots;
          
          return (
            <Grid item xs={12} sm={6} md={4} key={classData.id}>
              <Card
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {classData.className}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {new Date(classData.schedule).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {classData.description}
                  </Typography>
      
                  {/* Show available spots */}
                  <Typography variant="body1" color="textPrimary">
                    Available Spots: {availableSpots}
                  </Typography>
      
                  <Box mt={2}>
                    {availableSpots === 0 ? (
                      // Display 'Fully Booked' message when no spots are available
                      <Typography variant="body2" color="error">
                        Fully Booked
                      </Typography>
                    ) : (
                      // Display 'Book Now' button if spots are available
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookNowClick(classData)}
                      >
                        Book Now
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
        ) : (
          <Typography>No classes available.</Typography>
        )}

<Dialog open={dialogOpen} onClose={handleClose}>
  <DialogTitle>{selectedClass?.className}</DialogTitle>
  <DialogContent>
    <img 
      src={getClassImage(selectedClass?.className || '')} 
      alt={selectedClass?.className} 
      style={{ width: '100%', height: 'auto', marginBottom: '10px' }} 
    />
    
    {/* Make Artist's Name Clickable */}
    <Typography 
      variant="body2" 
      color="primary" 
      sx={{ cursor: 'pointer' }} 
      onClick={() => navigate(`/artist/${selectedClass?.artistProfile.artistName}`)}
    >
      Artist: {selectedClass?.artistProfile?.artistName || 'Unknown'}
    </Typography>

    <Typography variant="body2" color="textSecondary">
      Date: {new Date(selectedClass?.schedule || '').toLocaleDateString()}
    </Typography>
    <Typography variant="body1" color="textPrimary">
      Available Spots: {selectedClass ? selectedClass.maxCapacity - selectedClass.bookedSlots : 0}
    </Typography>
    <Typography variant="body1" color="textPrimary">
      Price: ${selectedClass?.price}
    </Typography>
    {errorMessage && (
      <Typography color="error" variant="body2">
        {errorMessage}
      </Typography>
    )}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Close
    </Button>
    <Button onClick={handleConfirmBooking} color="primary" variant="contained">
      Confirm Booking
    </Button>
  </DialogActions>
</Dialog>

      </Box>
    </ThemeProvider>
  );
};

export default Classes;