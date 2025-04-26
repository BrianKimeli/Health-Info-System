import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button, Container, CircularProgress, Grid } from '@mui/material';
import { getPrograms, createProgram } from '../api';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Fetch programs from the API
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data } = await getPrograms();
      setPrograms(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load programs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to create a new program
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProgram.name.trim()) {
      setError('Program name is required');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await createProgram({
        name: newProgram.name.trim(),
        description: newProgram.description.trim()
      });
      setNewProgram({ name: '', description: '' });
      await fetchPrograms();
      setError(`Program "${response.data.name}" created successfully!`);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to create program. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Health Programs
        </Typography>

        {error && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            backgroundColor: error.includes('success') ? '#4caf50' : '#f44336',
            color: 'white',
            borderRadius: 1
          }}>
            {error}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
          {/* Form Section */}
          <Box sx={{ flex: '1', p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Create New Program</Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Program Name"
                required
                fullWidth
                margin="normal"
                value={newProgram.name}
                onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                disabled={loading}
              />
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={newProgram.description}
                onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                    Creating...
                  </>
                ) : 'Create Program'}
              </Button>
            </Box>
          </Box>

          {/* Programs List Section */}
          <Box sx={{ flex: '2', p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            {loading && programs.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {programs.map((program) => (
                  <ListItem key={program._id} divider>
                    <ListItemText 
                      primary={program.name} 
                      secondary={program.description} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
