import { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  Box,
  Typography,
  CircularProgress,
  Alert 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getClients, createClient } from '../api';
import { Collapse } from '@mui/material';

// Clients Page Component
export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    contactNumber: '',
    email: ''
  });
  const [loadingClients, setLoadingClients] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch clients when component mounts
  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true);
      setError(null);
      try {
        const { data } = await getClients('');
        setClients(data);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to load clients. Please try again.');
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!newClient.firstName.trim() || !newClient.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }
    setSubmitting(true);
    try {
      await createClient({
        firstName: newClient.firstName.trim(),
        lastName: newClient.lastName.trim(),
        dateOfBirth: newClient.dateOfBirth,
        contactNumber: newClient.contactNumber,
        email: newClient.email
      });

        // Reset form and reload clients
      setNewClient({ firstName: '', lastName: '', dateOfBirth: '', contactNumber: '', email: '' });
      const { data } = await getClients('');
      setClients(data);
      setSuccess('Client registered successfully!');
    } catch (err) {
      console.error('Error creating client:', err);
      setError(err.response?.data?.message || 'Failed to register client. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

    // Filter clients based on search query
  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Container>
      <Box sx={{ my: 4 }}>
         {/* Page Title */}
        <Typography variant="h4" gutterBottom>Client Management</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Search Clients"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button 
          variant="contained" 
          onClick={() => setShowForm(prev => !prev)}
          sx={{ mb: 2 }}
        >
          {showForm ? 'Hide Registration Form' : 'Register New Client'}
        </Button>

        <Collapse in={showForm}>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            mb: 4, 
            p: 2, 
            border: '1px solid #ddd', 
            borderRadius: 1,
            opacity: submitting ? 0.7 : 1
          }}
        >
          <Typography variant="h6" gutterBottom>Register New Client</Typography>
          <TextField
            label="First Name"
            required
            fullWidth
            margin="normal"
            value={newClient.firstName}
            onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
            disabled={submitting}
          />
          <TextField
            label="Last Name"
            required
            fullWidth
            margin="normal"
            value={newClient.lastName}
            onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
            disabled={submitting}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newClient.dateOfBirth}
            onChange={(e) => setNewClient({...newClient, dateOfBirth: e.target.value})}
            disabled={submitting}
          />
          <TextField
            label="Contact Number"
            fullWidth
            margin="normal"
            value={newClient.contactNumber}
            onChange={(e) => setNewClient({...newClient, contactNumber: e.target.value})}
            disabled={submitting}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={newClient.email}
            onChange={(e) => setNewClient({...newClient, email: e.target.value})}
            disabled={submitting}
          />
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ mt: 2 }}
            disabled={submitting}
          >
            {submitting ? 'Registering...' : 'Register Client'}
          </Button>
        </Box>
        </Collapse>

        {/* Clients List */}
        {loadingClients ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredClients.length > 0 ? (
            <List>
              {filteredClients.map((client) => (
                <ListItem 
                  key={client._id} 
                  component={Link} 
                  to={`/clients/${client._id}`}
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    mb: 1,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    padding: 2,
                    transition: '0.3s',
                    '&:hover': { 
                      backgroundColor: '#f5f5f5', 
                      transform: 'scale(1.02)', 
                      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' 
                    } 
                  }}
                >
                  <ListItemText 
                    primary={`${client.firstName} ${client.lastName}`} 
                    secondary={`DOB: ${client.dateOfBirth ? new Date(client.dateOfBirth).toLocaleDateString() : 'N/A'}`} 
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              No clients found.
            </Typography>
          )
        )}
      </Box>
    </Container>
  );
}
