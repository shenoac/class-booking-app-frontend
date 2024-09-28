import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
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
  title: string;
  description: string;
  schedule: string;
  max_capacity: number;
  booked_slots: number;
}

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_CLASS_MGMT_API_URL}/api/classes`);
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <Typography>Loading classes...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* Box component to add padding and white border */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,  // White background
          padding: 3,  // Padding around the entire page content
          borderRadius: '8px',  // Rounded corners
          border: '1px solid white',  // White border around the content
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',  // Optional: light shadow for effect
          maxWidth: '1200px',  // Restrict width if needed
          margin: 'auto',  // Center the content
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Available Classes
        </Typography>
        {classes.length > 0 ? (
          <Grid container spacing={3}>
            {classes.map((classData) => (
              <Grid item xs={12} sm={6} md={4} key={classData.id}>
                <Card style={{ backgroundColor: theme.palette.grey[300] }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {classData.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Date: {new Date(classData.schedule).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {classData.description}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      Available Spots: {classData.max_capacity - classData.booked_slots}
                    </Typography>
                    <Box mt={2}>
                      <Button variant="contained" color="primary">
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
      </Box>
    </ThemeProvider>
  );
};

export default Classes;
