import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Menu, MenuItem, IconButton, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Optional icon for "Change Password"
import LogoutIcon from '@mui/icons-material/Logout'; // Optional icon for "Logout"
import axios from 'axios';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Mauve for buttons
    },
    secondary: {
      main: '#4B0082', // Dark red for logout button
    },
    background: {
      default: '#FFFFFF', // White background
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
  },
});

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch bookings on page load
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/auth/my-bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data); // Store bookings data in state
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); // Stop the loading spinner once the call is done
      }
    };

    fetchBookings();
  }, [navigate]);

  // Menu controls
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
          position: 'relative', // Relative to position the Avatar icon
        }}
      >
        {/* Avatar IconButton in the top-right corner */}
        <Box sx={{ position: 'absolute', top: '16px', right: '16px' }}>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar> {/* Placeholder for user avatar */}
          </IconButton>
        </Box>

        {/* Menu for Avatar */}
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
          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Dashboard content */}
        <Typography variant="h5" gutterBottom>
          My Bookings
        </Typography>

        {/* Loading spinner or bookings content */}
        {loading ? (
          <CircularProgress />
        ) : bookings.length > 0 ? (
          <Box>
            {bookings.map((booking) => (
              <Card key={booking.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Class ID: {booking.classId}
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
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body1">You have no bookings yet.</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
