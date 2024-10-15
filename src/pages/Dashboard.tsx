import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Menu, MenuItem, IconButton, Card, CardContent, CircularProgress, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8',
    },
    secondary: {
      main: '#4B0082',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null); // For holding the booking to delete

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

  const role = getRoleFromToken();  // Get role from token

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/bookings/my-bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

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

  const goToClasses = () => {
    navigate('/classes');  // Navigate to the Classes page
  };

  const goToProfileUpdate = () => {
    navigate('/artist/profile/update');  // Navigate to the Profile Update page
    handleMenuClose();
  };

  const handleDeleteClick = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || !selectedBookingId) return;

    try {
      await axios.delete(`http://localhost:8080/bookings/delete/${selectedBookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Booking deleted successfully!");

      // Remove the deleted booking from the list
      setBookings(bookings.filter((booking) => booking.id !== selectedBookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

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
          textAlign: 'center',
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

          {role === 'artist' && (  // Conditionally render Profile Update for artists only
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

        <Typography variant="h5" gutterBottom>
          My Bookings
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : bookings.length > 0 ? (
          <Box>
            {bookings.map((booking) => (
              <Card key={booking.id} sx={{ marginBottom: 2, position: 'relative' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Class: {booking.className}
                  </Typography>
                  <Typography variant="body1">
                    Date: {new Date(booking.bookingDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {booking.status}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Payment Status: {booking.paymentStatus}
                  </Typography>

                  {/* Add delete button in the bottom right */}
                  <IconButton
                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                    onClick={() => handleDeleteClick(booking.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1">You have no bookings yet.</Typography>
        )}

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={goToClasses}>
            View Available Classes
          </Button>
        </Box>

        {/* Delete confirmation dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Are you sure you want to delete this booking?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              No
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" variant="contained">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
