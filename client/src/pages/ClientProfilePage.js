// Import necessary dependencies and components
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { getClient, getPrograms, enrollClient } from '../api';

export default function ClientProfilePage() {
  // Extract client ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');

  // Fetch client data and available programs when component mounts
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const clientRes = await getClient(id);
        setClient(clientRes.data);

        const programsRes = await getPrograms();
        setPrograms(programsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load client data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Handle enrolling the client into a selected program
  const handleEnroll = async () => {
    if (!selectedProgram) return;
    setEnrolling(true);
    setError('');
    try {
      await enrollClient({ client: id, program: selectedProgram });
      // Refresh client data after successful enrollment
      const clientRes = await getClient(id);
      setClient(clientRes.data);
      setSelectedProgram('');
    } catch (err) {
      console.error('Error enrolling client:', err);
      setError(err.response?.data?.error || 'Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  // Display loading indicator while data is being fetched
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  // Display error message if an error occurred
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          {error}
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/')}>Home</Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
          </Box>
        </Alert>
      </Container>
    );
  }

  // Main UI rendering
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Home button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button variant="text" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
          Home
        </Button>
      </Box>

      {/* Client Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar
          src={client.profilePicUrl || ''}
          alt={`${client.firstName} ${client.lastName}`}
          sx={{ width: 80, height: 80, fontSize: 32 }}
        >
          {client.firstName?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom>
            {client.firstName} {client.lastName}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Date of Birth: {client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Contact: {client.contactNumber || 'N/A'}{client.email && ` | ${client.email}`}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Enrolled Programs Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Enrolled Programs
        </Typography>
        {client.programs.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {client.programs.map((prog) => (
              <Chip key={prog._id} label={prog.name} />
            ))}
          </Box>
        ) : (
          <Typography color="textSecondary">No programs enrolled</Typography>
        )}
      </Box>

      {/* Enrollment Form */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl sx={{ minWidth: 240 }} disabled={enrolling}>
          <InputLabel id="program-select-label">Select Program</InputLabel>
          <Select
            labelId="program-select-label"
            value={selectedProgram}
            label="Select Program"
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {programs.map((prog) => (
              <MenuItem key={prog._id} value={prog._id}>
                {prog.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleEnroll}
          disabled={!selectedProgram || enrolling}
        >
          {enrolling ? 'Enrolling...' : 'Enroll'}
        </Button>
      </Box>
    </Container>
  );
}
