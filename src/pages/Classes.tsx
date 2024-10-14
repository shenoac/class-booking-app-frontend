import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme with your color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#D8BFD8', // Mauve for buttons
    },
    background: {
      default: '#FFFFFF', // White background
    },
    grey: {
      300: '#F0F0F0', // Light grey for cards
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Font customization
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
}

// Helper function to get the background image based on the class name
const getClassImage = (className: string) => {
  if (className.toLowerCase().includes("oil painting")) {
    return "/images/oil_painting.jpg";
  } else if (className.toLowerCase().includes("watercolor")) {
    return "/images/watercolor.jpg";
  } else if (className.toLowerCase().includes("sketch")) {
    return "/images/sketches.jpg";
  }
  return "/images/default.jpg";  // Fallback image
};

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setSelectedClass(classData);  // Set the selected class data
    setDialogOpen(true);  // Open the dialog
  };

  const handleClose = () => {
    setDialogOpen(false);  // Close the dialog
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
                        onClick={() => handleBookNowClick(classData)}  // Open dialog with selected class
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

        {/* Dialog for displaying class details */}
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>{selectedClass?.className}</DialogTitle>
          <DialogContent>
            {selectedClass && (
              <Box
                sx={{
                  backgroundImage: `url(${getClassImage(selectedClass.className)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',  // Adjust height if needed
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
      Price: ${selectedClass?.price}  {/* Display price here */}
    </Typography>
            <Typography variant="body2" paragraph>
              {selectedClass?.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Classes;
