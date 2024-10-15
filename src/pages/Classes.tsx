import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';  
import ArtistProfile from './ArtistProfile';


const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
    },
    grey: {
      300: '#F0F0F0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
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

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('authToken'); 

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
      const response = await axios.post(
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
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Available Classes
        </Typography>
        {classes.length > 0 ? (
          <Grid container spacing={3}>
            {classes.map((classData) => (
              <Grid item xs={12} sm={6} md={4} key={classData.id}>
                <Card
                  style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {classData.className}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {new Date(classData.schedule).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {classData.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      Available Spots: {classData.maxCapacity - classData.bookedSlots}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookNowClick(classData)}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No classes available.</Typography>
        )}

        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>{selectedClass?.className}</DialogTitle>
          <DialogContent>
            {selectedClass && (
              <Box
                sx={{
                  backgroundImage: `url(${getClassImage(selectedClass.className)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                }}
              />
            )}
            <Typography variant="body2" color="textSecondary">
              Date: {new Date(selectedClass?.schedule || '').toLocaleDateString()}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Available Spots: {selectedClass ? selectedClass.maxCapacity - selectedClass.bookedSlots : 0}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Price: ${selectedClass?.price}
            </Typography>
            <Typography variant="body2" color="primary">
              Artist: 
                <Button 
                  onClick={() => navigate(`/artist/${selectedClass?.artistProfile.artistName}`)}
                  color="primary"
                >
                {selectedClass?.artistProfile.artistName}
                </Button>
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
function setDrawerOpen(open: boolean) {
  throw new Error('Function not implemented.');
}

