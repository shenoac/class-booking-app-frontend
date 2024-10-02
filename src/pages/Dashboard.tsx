import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.clear();
    navigate('/login');
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
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Bookings
        </Typography>

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

        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ marginTop: 2 }} // Add space between cards and button
        >
          Logout
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
