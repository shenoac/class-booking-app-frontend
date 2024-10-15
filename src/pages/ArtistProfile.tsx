import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

interface ArtistProfile {
  artistName: string;
  bio: string;
  exhibitions: string;
  education: string;
}

const ArtistProfile: React.FC = () => {
  const { artistName } = useParams<{ artistName: string }>();  // Get artist name from the URL
  const [profile, setProfile] = useState<ArtistProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);  // Track loading state
  const [error, setError] = useState<string | null>(null);  // Track errors

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artist-profile/view/${artistName}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching artist profile:', error);
        setError('Error fetching artist profile.');  // Set error message
      } finally {
        setLoading(false);  // Stop loading state
      }
    };

    fetchProfile();
  }, [artistName]);

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!profile) {
    return <Typography>No profile found.</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          backgroundImage: `url('/path/to/default/artist-banner.jpg')`,  // Add default banner or dynamic banner later
          height: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      />

      {/* Transparent artist name with thin grey outline */}
      <Box
        sx={{
          position: 'absolute',
          top: '250px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#FFFFFF',
            bottom: 20,
            left: 20,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          }}
        >
          {profile.artistName}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ marginTop: 5 }}>
        <Grid item xs={12} md={3}>
          {/* Sidebar for education and exhibitions */}
          <Card>
            <CardContent>
              <Typography variant="h6">Education</Typography>
              <Typography>{profile.education}</Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>Exhibitions</Typography>
              <Typography>{profile.exhibitions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          {/* Main content for bio */}
          <Card>
            <CardContent>
              <Typography variant="h6">Biography</Typography>
              <Typography>{profile.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistProfile;
